const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const FALLBACK_IMG = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="#171b22" width="100%" height="100%"/><text x="50%" y="50%" fill="#6a6e75" text-anchor="middle" font-size="16" font-family="Georgia,serif">이미지 준비 중</text></svg>');

const store = {
  get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

function migrateLegacyStorage() {
  const map = [
    ['gm_persona', 'wy_persona'],
    ['gm_character', 'wy_character'],
    ['gm_todos', 'wy_todos'],
    ['gm_todos_seeded', 'wy_todos_seeded']
  ];
  map.forEach(([from, to]) => {
    if (localStorage.getItem(to) == null && localStorage.getItem(from) != null) {
      localStorage.setItem(to, localStorage.getItem(from));
    }
  });
  ['visits', 'pet_count', 'last_visit', 'messages', 'message_seen'].forEach((key) => {
    const from = `gm_${key}`;
    const to = `wy_geonmyeong_${key}`;
    if (localStorage.getItem(to) == null && localStorage.getItem(from) != null) {
      localStorage.setItem(to, localStorage.getItem(from));
    }
  });
}
migrateLegacyStorage();

const onboarding = $('#onboarding');
const roomScreen = $('#roomScreen');
const closeScreen = $('#closeScreen');
const panel = $('#panel');
const personaInput = $('#personaName');
const SELECT_ORDER = ['geonmyeong', 'gukgyeom', 'ryeoseon', 'heedong', 'haerim', 'cheongso'];
const CARD_MARK = { geonmyeong: 'gear', gukgyeom: 'tag', ryeoseon: 'tape', heedong: 'gold', haerim: 'stamp', cheongso: 'paint' };
const speech = $('#speech');
const character = $('#character');
const characterImg = $('#characterImg');
const closeImg = $('#closeImg');
const closeLine = $('#closeLine');
const toast = $('#toast');
const audio = $('#audio');
const play = $('#playBtn');
const progress = $('#progressBar');

let currentId = store.get('wy_character', 'geonmyeong');
if (!CHARACTERS[currentId]) currentId = 'geonmyeong';
let char = CHARACTERS[currentId];
let persona = store.get('wy_persona', '');
let currentTrack = 0;
let currentZone = 'center';
let panelName = null;
let speechTimer = null;
let moveTimer = null;
let moveEndTimer = null;
let talkTimer = null;
let visitCount = 0;
let petCount = 0;
let lastVisit = null;
let lastSpoken = '';
let lastTalkAt = 0;
let lastWalkSrc = '';
let closeSessionPets = 0;
let lastPetLineAt = 0;
let closeStage = 0;
let petIdleTimer = null;
let pettingMs = 0;
let petClockAt = 0;
let isPetting = false;
let petRaf = 0;
let pendingId = currentId;
let onboardMode = 'first';
const TALK_MIN = 8000;
const TALK_MAX = 20000;
const PET_LINE_GAP = 4000;
const PET_STAGE_MS = 4000;
const PET_REVERT_MS = 2000;
const PET_DX = 44;
const PET_STROKES_PER_TICK = 6;
const MSG_INTERVAL_MS = 12 * 60 * 60 * 1000;
const MOMENT_INTERVAL_MS = 3 * 60 * 60 * 1000;

function ck(key) { return `wy_${currentId}_${key}`; }
function inboxElapsedOverride() {
  const raw = new URLSearchParams(location.search).get('elapsedHours');
  const hours = raw == null ? NaN : Number(raw);
  return Number.isFinite(hours) && hours >= 0 ? hours * 60 * 60 * 1000 : null;
}
function ensureInboxClock() {
  if (store.get(ck('inbox_v'), 0) < 2) {
    store.set(ck('inbox_v'), 2);
    localStorage.removeItem(ck('messages'));
    localStorage.removeItem(ck('album'));
    store.set(ck('message_seen_count'), 0);
    store.set(ck('message_seen'), false);
    store.set(ck('known_since'), Date.now());
  }
  if (store.get(ck('known_since'), null) == null) store.set(ck('known_since'), Date.now());
  const forced = inboxElapsedOverride();
  if (forced != null) store.set(ck('known_since'), Date.now() - forced);
}
function knownMs() {
  const forced = inboxElapsedOverride();
  if (forced != null) return forced;
  return Math.max(0, Date.now() - (store.get(ck('known_since'), Date.now()) || Date.now()));
}
function unlockedCount(intervalMs, initial, max) {
  return Math.min(max, initial + Math.floor(knownMs() / intervalMs));
}
function loadCharState() {
  visitCount = store.get(ck('visits'), 0);
  petCount = store.get(ck('pet_count'), 0);
  lastVisit = store.get(ck('last_visit'), null);
  ensureInboxClock();
}
loadCharState();

function rand(a) { return a[Math.floor(Math.random() * a.length)]; }
function hour() { return new Date().getHours(); }
function playerName() { return String(persona || store.get('wy_persona', '') || '').trim(); }
function fillPlayer(text) {
  const name = playerName();
  return String(text ?? '').replaceAll('{player}', name).replaceAll('{user}', name);
}
function pickLine(key) {
  const pool = Array.isArray(char.dialogue?.[key]) ? char.dialogue[key] : [];
  if (!pool.length) return '';
  const choices = pool.length > 1 ? pool.filter(line => line !== lastSpoken) : pool;
  const chosen = rand(choices);
  lastSpoken = chosen;
  return fillPlayer(chosen);
}
function escapeHtml(s) { return String(s).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
function showToast(text) {
  toast.textContent = text;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 1800);
}
function formatTime(v) {
  const m = Math.floor(v / 60);
  const s = Math.floor(v % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function bindImg(el, src, alt) {
  if (!el) return;
  el.onerror = () => { if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG; };
  el.alt = alt || '';
  el.src = src || FALLBACK_IMG;
}

function applyTheme(c) {
  const t = c.theme || {};
  const primary = t.primary || '#59634A';
  const secondary = t.secondary || '#49362C';
  const accent = t.accent || '#A54E43';
  const warm = t.warm || t.cream || t.bronze || t.lime || accent;
  const root = document.documentElement;
  root.style.setProperty('--char-primary', primary);
  root.style.setProperty('--char-secondary', secondary);
  root.style.setProperty('--char-accent', accent);
  root.style.setProperty('--char-warm', warm);
  root.style.setProperty('--theme-primary', primary);
  root.style.setProperty('--theme-secondary', secondary);
  root.style.setProperty('--theme-accent', accent);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', secondary);
}

function applyNamePlate(c) {
  const plate = $('#namePlate');
  const ghost = $('#namePlateGhost');
  const fx = c.namePlateEffect;
  $('#roomName').textContent = c.name;
  $('#roomTitle').textContent = c.originalName;
  $('#roomSub').textContent = `${c.age} · ${c.occupation}`;
  plate.classList.remove('name-plate--overpainted', 'name-plate--scratch', 'name-plate--stroke', 'name-plate--splash');
  plate.removeAttribute('style');
  ghost.textContent = '';
  if (fx && fx.enabled) {
    plate.classList.add('name-plate--overpainted');
    if (fx.scratchLines) plate.classList.add('name-plate--scratch');
    if (fx.paintStroke) plate.classList.add('name-plate--stroke');
    if (fx.splash) plate.classList.add('name-plate--splash');
    ghost.textContent = fx.ghostText || '▒▒▒';
    plate.style.setProperty('--ghost-opacity', String(fx.ghostOpacity ?? 0.22));
    plate.style.setProperty('--ghost-blur', `${fx.ghostBlur ?? 1.5}px`);
    plate.style.setProperty('--splash-primary', fx.splashPrimary || '#D84845');
    plate.style.setProperty('--splash-secondary', fx.splashSecondary || '#197F7A');
    plate.style.setProperty('--plate-rot', `${fx.rotation ?? -3}deg`);
    plate.style.setProperty('--plate-intensity', String(fx.intensity ?? 0.85));
  }
}

function movementTiming() {
  const b = char.behavior || {};
  if (b.moveMin != null && b.moveMax != null) {
    return { moveMin: b.moveMin, moveMax: b.moveMax, talkChance: b.talkChance ?? b.movementFrequency ?? 0.28 };
  }
  const ranges = { slow: [16000, 28000], medium: [12000, 22000], fast: [9000, 16000] };
  const [moveMin, moveMax] = ranges[b.moveInterval] || ranges.medium;
  return { moveMin, moveMax, talkChance: b.movementFrequency ?? 0.28 };
}

function isSpecialZone(z) {
  return z && (z.pose === 'sit' || z.pose === 'sleep' || z.pose === 'window' || z.pose === 'special');
}

function zonePickWeight(name, z) {
  const b = char.behavior || {};
  if (z.pose === 'special' && b.randomActionWeight != null) return b.randomActionWeight;
  if (name === 'window' && b.windowWeight != null) return b.windowWeight;
  if (name === 'desk' && b.deskWeight != null) return b.deskWeight;
  if ((name === 'bed' || z.pose === 'sleep') && b.sleepWeight != null) return b.sleepWeight;
  if (z.pose === 'sit' && b.sitWeight != null) return b.sitWeight;
  if (z.pose === 'idle') return z.weight || b.idleWeight || 1;
  return z.weight || 1;
}

function poseSrc(pose) {
  const a = char.assets;
  return ({ idle: a.idle, sit: a.sit, sleep: a.sleep || a.sit, window: a.window || a.idle, special: a.special || a.idle }[pose]) || a.idle;
}

function pickWeighted(entries) {
  const total = entries.reduce((sum, [name, z]) => sum + zonePickWeight(name, z), 0);
  let roll = Math.random() * Math.max(total, 0.0001);
  for (const [name, z] of entries) {
    roll -= zonePickWeight(name, z);
    if (roll <= 0) return name;
  }
  return entries[0][0];
}

function pickZone(except) {
  const entries = Object.entries(char.zones).filter(([name]) => name !== except);
  if (!entries.length) return except;
  const idle = entries.filter(([, z]) => !isSpecialZone(z));
  const specials = entries.filter(([, z]) => isSpecialZone(z));
  const chance = char.behavior?.specialChance ?? 0.14;
  const useSpecial = specials.length && Math.random() < chance;
  const pool = useSpecial ? specials : (idle.length ? idle : entries);
  return pickWeighted(pool);
}

function applyCharacter(id, { resetTrack = true } = {}) {
  if (!CHARACTERS[id]) return;
  currentId = id;
  char = CHARACTERS[id];
  store.set('wy_character', id);
  if (resetTrack) currentTrack = 0;
  currentZone = Object.keys(char.zones)[0];
  loadCharState();
  lastSpoken = '';
  applyTheme(char);
  applyNamePlate(char);
  document.title = `沈錚 : WITH YOU — ${char.name}`;
  $('#room').setAttribute('aria-label', `${char.name}의 방`);
  $('#callBtn').textContent = `${char.name} 부르기`;
  character.setAttribute('aria-label', `${char.name} 터치하기`);
  closeScreen.setAttribute('aria-label', `${char.name} 가까이 보기`);
  $('#messageHeading').textContent = `${char.name}이 남긴 메시지`;
  const hint = $('#messageHint');
  if (hint) hint.textContent = '처음엔 한 통이에요. 12시간마다 하나씩 더 와요.';
  $('#todoReaction').textContent = `“${fillPlayer(char.todoHint || '다 하면 알려줘요.')}”`;
  bindImg($('#roomBg'), char.assets.roomBackground, '');
  bindImg(characterImg, poseSrc(char.zones[currentZone]?.pose || 'idle'), char.name);
  bindImg(closeImg, char.assets.closeNormal, char.name);
  bindImg($('#todoCharacterImg'), char.assets.idle, char.name);
  seedTodos();
  renderTodos();
  character.style.left = (char.zones[currentZone]?.left ?? 50) + '%';
  character.style.top = (char.zones[currentZone]?.top ?? 64) + '%';
  $('#statusText').textContent = char.zones[currentZone]?.state || '방에 있는 중';
  renderListen();
  renderMessages();
}

function contextualTalk() {
  return pickLine((hour() >= 0 && hour() < 5) ? 'lateNight' : 'idle');
}

function canAutoTalk() {
  return Date.now() - lastTalkAt >= TALK_MIN;
}

function say(text, duration = 3300, { force = false } = {}) {
  const spoken = fillPlayer(text);
  if (!spoken) return;
  if (!force && !canAutoTalk()) return;
  lastTalkAt = Date.now();
  clearTimeout(speechTimer);
  speech.textContent = spoken;
  const room = $('#room');
  const cr = character.getBoundingClientRect();
  const rr = room.getBoundingClientRect();
  const left = cr.left - rr.left + cr.width * 0.17;
  const top = cr.top - rr.top - 46;
  speech.style.left = `${Math.max(15, Math.min(left, rr.width - 245))}px`;
  speech.style.top = `${Math.max(110, top)}px`;
  speech.classList.remove('hidden');
  speechTimer = setTimeout(() => speech.classList.add('hidden'), duration);
}

function currentCharPos() {
  return {
    left: parseFloat(character.style.left) || (char.zones[currentZone]?.left ?? 50),
    top: parseFloat(character.style.top) || (char.zones[currentZone]?.top ?? 64)
  };
}

function walkSrcForDelta(dx) {
  const leftSrc = (char.walkLeft === 2) ? char.assets.walk2 : char.assets.walk1;
  const rightSrc = (char.walkLeft === 2) ? char.assets.walk1 : char.assets.walk2;
  if (dx < -0.8) return leftSrc;
  if (dx > 0.8) return rightSrc;
  return lastWalkSrc || rightSrc;
}

function startWalk(dx) {
  const src = walkSrcForDelta(dx);
  lastWalkSrc = src;
  bindImg(characterImg, src, char.name);
}

function moveTo(name) {
  const z = char.zones[name];
  if (!z) return;
  const from = currentCharPos();
  currentZone = name;
  character.classList.add('walking');
  startWalk(z.left - from.left);
  character.style.left = z.left + '%';
  character.style.top = z.top + '%';
  $('#statusText').textContent = '이동 중';
  clearTimeout(moveEndTimer);
  moveEndTimer = setTimeout(() => {
    character.classList.remove('walking');
    bindImg(characterImg, poseSrc(z.pose), char.name);
    $('#statusText').textContent = z.state;
  }, 2100);
}

function scheduleTalk() {
  clearTimeout(talkTimer);
  const wait = TALK_MIN + Math.random() * (TALK_MAX - TALK_MIN);
  talkTimer = setTimeout(() => {
    const chance = movementTiming().talkChance;
    if (canAutoTalk() && Math.random() < chance) say(contextualTalk());
    scheduleTalk();
  }, wait);
}

function scheduleMovement() {
  clearTimeout(moveTimer);
  const { moveMin, moveMax } = movementTiming();
  moveTimer = setTimeout(() => {
    moveTo(pickZone(currentZone));
    scheduleMovement();
  }, moveMin + Math.random() * (moveMax - moveMin));
}

function updateTime() {
  const d = new Date();
  $('#clock').textContent = d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
  $('#dateLabel').textContent = d.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' }).replaceAll('.', '').trim();
  $('#momentDate').textContent = d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replaceAll('.', '.');
}

function getMessages() {
  const all = char.messages || [];
  return all.slice(0, unlockedCount(MSG_INTERVAL_MS, 1, all.length));
}

function messageLines(m) {
  if (Array.isArray(m.lines)) return m.lines.map(fillPlayer);
  if (typeof m.text === 'function') return [m.text(persona)];
  return [fillPlayer(m.text || '')];
}

function renderMessages() {
  const list = $('#messageList');
  list.innerHTML = '';
  bindImg($('#messageHeadImg'), char.assets.idle, char.name);
  getMessages().forEach((m) => {
    const lines = messageLines(m);
    const div = document.createElement('article');
    div.className = 'chat-group';
    div.innerHTML = `<div class="chat-row"><img class="chat-avatar" alt="${escapeHtml(char.name)}"><div class="chat-col"><div class="chat-meta"><strong>${escapeHtml(char.name)}</strong><time>${escapeHtml(m.time)}</time></div>${lines.map((line) => `<p class="chat-bubble">${escapeHtml(line)}</p>`).join('')}</div></div>`;
    bindImg(div.querySelector('img'), char.assets.idle, char.name);
    list.appendChild(div);
  });
  const unlocked = getMessages().length;
  const seen = store.get(ck('message_seen_count'), 0);
  $('#messageBadge').classList.toggle('hidden', unlocked <= seen);
}

function loadTodos() { return store.get('wy_todos', []); }
function saveTodos(v) { store.set('wy_todos', v); renderTodos(); }
function allTodoSeeds() {
  return [
    '목표를 추가한 뒤, 체크해서 지우기!',
    ...Object.values(CHARACTERS).map((c) => c.todoSeed).filter(Boolean)
  ];
}
function isTutorialTodos(list) {
  const oldSeed = ['물 마시기', '작업 1시간', '원고 500자', '방 정리하기'];
  if (!list.length) return true;
  if (list.length === 4 && list.every((t, i) => t.text === oldSeed[i])) return true;
  return list.length === 1 && allTodoSeeds().includes(list[0].text);
}
function seedTodos() {
  const current = loadTodos();
  if (!store.get('wy_todos_seeded', false) || isTutorialTodos(current)) {
    store.set('wy_todos', [{ text: fillPlayer(char.todoSeed || '할 일을 적어 보세요.'), done: false }]);
    store.set('wy_todos_seeded', true);
  }
}
function renderTodos() {
  const wrap = $('#todoList');
  wrap.innerHTML = '';
  loadTodos().forEach((t, i) => {
    const row = document.createElement('div');
    row.className = 'todo-item' + (t.done ? ' done' : '');
    row.innerHTML = `<label class="ios-check"><input type="checkbox" ${t.done ? 'checked' : ''} aria-label="완료"><i></i></label><span>${escapeHtml(t.text)}</span><button class="delete-todo" aria-label="삭제">×</button>`;
    row.querySelector('input').addEventListener('change', (e) => {
      const ts = loadTodos();
      const became = !ts[i].done;
      ts[i].done = e.target.checked;
      saveTodos(ts);
      if (became) {
        $('#todoReaction').textContent = `“${pickLine('todoComplete')}”`;
      }
    });
    row.querySelector('.delete-todo').addEventListener('click', () => {
      const ts = loadTodos();
      ts.splice(i, 1);
      saveTodos(ts);
    });
    wrap.appendChild(row);
  });
}

function tracksOf() { return char.music || []; }
function resetSeek() {
  progress.style.width = '0%';
  $('#currentTime').textContent = '0:00';
  $('#duration').textContent = audio.duration && isFinite(audio.duration) ? formatTime(audio.duration) : '0:00';
}
function renderListen() {
  const tracks = tracksOf();
  const t = tracks[currentTrack] || tracks[0];
  if (!t) return;
  bindImg($('#albumArt'), t.cover, t.title);
  $('#trackTitle').textContent = t.title;
  $('#trackArtist').textContent = t.artist;
  $('#trackIndex').textContent = `${currentTrack + 1}/${tracks.length}`;
  const list = $('#trackList');
  list.innerHTML = '';
  tracks.forEach((item, i) => {
    const row = document.createElement('div');
    if (i === currentTrack) row.className = 'active';
    row.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b><span>${escapeHtml(item.title)}</span>`;
    row.addEventListener('click', () => setTrack(i));
    list.appendChild(row);
  });
  if (t.src && audio.getAttribute('src') !== t.src) {
    audio.src = t.src;
    audio.load();
  }
}
function maybeMusicReaction() {
  if (Math.random() > 0.42) return;
  const line = pickLine('musicReaction');
  if (line) say(line);
}
function setTrack(i) {
  const tracks = tracksOf();
  if (!tracks.length) return;
  const next = ((i % tracks.length) + tracks.length) % tracks.length;
  const changed = next !== currentTrack;
  currentTrack = next;
  const wasPlaying = !audio.paused && !audio.ended;
  audio.pause();
  play.textContent = '▶';
  resetSeek();
  renderListen();
  if (wasPlaying) {
    audio.play().then(() => {
      play.textContent = 'Ⅱ';
      $('#musicState').textContent = '재생 중';
    }).catch(() => { $('#musicState').textContent = '음원 파일 대기 중'; });
  }
  if (changed) maybeMusicReaction();
}

function pickMomentQuote() {
  const pool = Array.isArray(char.momentQuotes) && char.momentQuotes.length
    ? char.momentQuotes
    : [char.momentQuote];
  return fillPlayer(rand(pool.filter(Boolean)) || '');
}

function formatMomentStamp(ts) {
  return new Date(ts).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function syncAlbum() {
  const pool = char.moments || [];
  const want = unlockedCount(MOMENT_INTERVAL_MS, 0, pool.length);
  let saved = store.get(ck('album'), []);
  const used = new Set(saved.map((item) => item.source || item.text));
  while (saved.length < want && pool.length) {
    const unused = pool.filter((line) => !used.has(line));
    const source = unused.length ? rand(unused) : rand(pool);
    used.add(source);
    saved.push({
      time: Date.now(),
      source,
      text: fillPlayer(source),
      pose: rand(['sit', 'idle', 'window', 'sleep']),
      quote: pickMomentQuote()
    });
  }
  if (saved.length > want) saved = saved.slice(0, want);
  store.set(ck('album'), saved);
  return saved;
}

function renderMoment() {
  const items = syncAlbum();
  const list = $('#momentList');
  const empty = $('#momentEmpty');
  const quote = $('#momentQuote');
  if (list) list.innerHTML = '';
  if (!items.length) {
    if (empty) empty.classList.remove('hidden');
    if (quote) quote.classList.add('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');
  if (quote) {
    quote.classList.remove('hidden');
    quote.innerHTML = items[items.length - 1].quote || pickMomentQuote();
  }
  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'polaroid';
    card.style.transform = `rotate(${i % 2 ? 1.1 : -1.1}deg)`;
    card.innerHTML = `<div class="polaroid-scene"><div class="mini-room"></div><img alt=""></div><p>${escapeHtml(formatMomentStamp(item.time))}<br>${escapeHtml(item.text)}</p>`;
    bindImg(card.querySelector('img'), poseSrc(item.pose || 'sit'), `방 안의 ${char.name}`);
    list.appendChild(card);
  });
}

function hideOnboardSteps() {
  ['splashStep', 'nameStep', 'characterStep'].forEach((id) => $(`#${id}`).classList.add('hidden'));
}
function applyNeutralTheme() {
  const root = document.documentElement;
  root.style.setProperty('--char-primary', '#59634A');
  root.style.setProperty('--char-secondary', '#314034');
  root.style.setProperty('--char-accent', '#A54E43');
  root.style.setProperty('--char-warm', '#C18A52');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F7EFE2');
  onboarding.classList.remove('is-themed');
}
function showSplash() {
  onboardMode = 'first';
  document.documentElement.classList.remove('skip-onboard');
  hideOnboardSteps();
  applyNeutralTheme();
  onboarding.classList.remove('hidden');
  $('#splashStep').classList.remove('hidden');
}
function showNameStep() {
  hideOnboardSteps();
  onboarding.classList.remove('hidden');
  $('#nameStep').classList.remove('hidden');
  personaInput.value = persona;
  updateNamePreview();
  setTimeout(() => personaInput.focus(), 80);
}
function showCharacterStep() {
  hideOnboardSteps();
  onboarding.classList.remove('hidden');
  $('#characterStep').classList.remove('hidden');
  $('#switcherBack').classList.toggle('hidden', onboardMode !== 'switch');
  renderChoiceGrid();
  if (pendingId && CHARACTERS[pendingId]) selectCharacter(pendingId);
}
function updateNamePreview() {
  const value = personaInput.value.trim();
  $('#nameNextBtn').disabled = !value;
  $('#namePreview').textContent = value ? `누군가가 당신을 ‘${value}’이라고 부르게 됩니다.` : '';
}
function renderChoiceGrid() {
  const wrap = $('#characterChoice');
  wrap.innerHTML = '';
  SELECT_ORDER.forEach((id) => {
    const c = CHARACTERS[id];
    const fx = c.namePlateEffect;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'home-card' + (id === pendingId ? ' selected' : '') + (fx && fx.enabled ? ' home-card--paint' : '');
    btn.dataset.character = id;
    btn.dataset.mark = CARD_MARK[id] || '';
    btn.style.setProperty('--card-tint', (c.theme && c.theme.primary) || '#efe8d8');
    btn.setAttribute('aria-label', `${c.name} 선택`);
    btn.innerHTML = `<span class="home-card-check" aria-hidden="true">✓</span><span class="home-card-mark" aria-hidden="true"></span><img alt="${escapeHtml(c.name)}"><div class="home-card-name"><span class="home-card-ghost" aria-hidden="true">${fx && fx.enabled ? escapeHtml(fx.ghostText || '▒▒▒') : ''}</span><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.originalName)}</small><em>${c.age} · ${escapeHtml(c.occupation)}</em></div>`;
    bindImg(btn.querySelector('img'), c.assets.idle, c.name);
    btn.addEventListener('click', () => selectCharacter(id));
    wrap.appendChild(btn);
  });
}
function selectCharacter(id) {
  if (!CHARACTERS[id]) return;
  pendingId = id;
  applyTheme(CHARACTERS[id]);
  onboarding.classList.add('is-themed');
  $$('.home-card').forEach((card) => card.classList.toggle('selected', card.dataset.character === id));
  const c = CHARACTERS[id];
  $('#confirmName').textContent = c.name;
  $('#confirmHan').textContent = c.originalName;
  $('#confirmLine').textContent = `${playerName() || '당신'}, 같이 갈까요?`;
  $('#confirmPanel').classList.remove('hidden');
}
function playEnterTransition(done) {
  const overlay = $('#enterTransition');
  overlay.classList.remove('hidden');
  overlay.classList.add('is-on');
  onboarding.classList.add('is-leaving');
  setTimeout(() => {
    done();
    overlay.classList.add('is-out');
    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.classList.remove('is-on', 'is-out');
      onboarding.classList.remove('is-leaving');
    }, 380);
  }, 880);
}
function completeOnboarding() {
  const name = (persona || personaInput.value).trim();
  if (!name) { showToast('부를 이름을 먼저 적어 주세요.'); return; }
  if (!pendingId || !CHARACTERS[pendingId]) { showToast('같이 있을 사람을 골라 주세요.'); return; }
  persona = name;
  currentId = pendingId;
  store.set('wy_persona', persona);
  store.set('wy_character', currentId);
  store.set('wy_onboarding', true);
  playEnterTransition(() => {
    hideOnboarding();
    enterRoom({ greetDelay: 280 });
  });
}
function hideOnboarding() {
  onboarding.classList.add('hidden');
  document.documentElement.classList.add('skip-onboard');
}
function openCharacterSwitcher() {
  onboardMode = 'switch';
  pendingId = currentId;
  clearTimeout(moveTimer);
  clearTimeout(moveEndTimer);
  clearTimeout(talkTimer);
  audio.pause();
  play.textContent = '▶';
  panel.classList.add('hidden');
  closeScreen.classList.add('hidden');
  $('#settingsSheet').classList.add('hidden');
  roomScreen.classList.add('hidden');
  document.documentElement.classList.remove('skip-onboard');
  showCharacterStep();
}
function returnToRoomFromSwitcher() {
  hideOnboarding();
  roomScreen.classList.remove('hidden');
  scheduleMovement();
  scheduleTalk();
}
function openSettings() {
  $('#settingsSheet').classList.remove('hidden');
}
function closeSettings() {
  $('#settingsSheet').classList.add('hidden');
  $('#renameSheet').classList.add('hidden');
}
function savePlayerName(next) {
  const name = String(next || '').trim();
  if (!name) { showToast('이름을 입력해 주세요.'); return false; }
  persona = name;
  store.set('wy_persona', persona);
  $('#playerName').textContent = persona;
  return true;
}
function hasCompletedOnboarding() {
  const savedName = playerName();
  const savedChar = store.get('wy_character', '');
  if (savedName && CHARACTERS[savedChar]) {
    if (!store.get('wy_onboarding', false)) store.set('wy_onboarding', true);
    return true;
  }
  return false;
}

function enterRoom({ greetDelay = 700 } = {}) {
  hideOnboarding();
  roomScreen.classList.remove('hidden');
  $('#playerName').textContent = persona;
  const prevVisit = lastVisit;
  visitCount += 1;
  store.set(ck('visits'), visitCount);
  store.set(ck('last_visit'), Date.now());
  seedTodos();
  applyCharacter(currentId, { resetTrack: false });
  renderTodos();
  updateTime();
  scheduleMovement();
  scheduleTalk();
  const away = prevVisit && (Date.now() - prevVisit) > 1000 * 60 * 60 * 24 * 2;
  setTimeout(() => say(away ? pickLine('returning') : pickLine('greeting'), 3300, { force: true }), greetDelay);
}

function closeSprite(stage) {
  return [char.assets.closeNormal, char.assets.closeSoft, char.assets.closeHappy][stage] || char.assets.closeNormal;
}
function applyCloseStage(stage, { speak = false } = {}) {
  closeStage = Math.max(0, Math.min(2, stage));
  bindImg(closeImg, closeSprite(closeStage), char.name);
  if (speak) {
    const key = ['petNormal', 'petSoft', 'petHappy'][closeStage];
    closeLine.textContent = `“${pickLine(key)}”`;
  }
}
function flushPetClock() {
  if (!isPetting || !petClockAt) return;
  const now = Date.now();
  pettingMs += now - petClockAt;
  petClockAt = now;
  const cap = (closeStage + 1) * PET_STAGE_MS;
  if (closeStage < 2 && pettingMs > cap) pettingMs = cap;
}
function startPetClock() {
  if (isPetting) return;
  isPetting = true;
  petClockAt = Date.now();
  if (!petRaf) petRaf = requestAnimationFrame(tickPetClock);
}
function stopPetClock() {
  flushPetClock();
  isPetting = false;
  petClockAt = 0;
  if (petRaf) {
    cancelAnimationFrame(petRaf);
    petRaf = 0;
  }
}
function tickPetClock() {
  if (!isPetting) { petRaf = 0; return; }
  syncPetStage();
  petRaf = requestAnimationFrame(tickPetClock);
}
function syncPetStage() {
  flushPetClock();
  if (closeStage < 2 && pettingMs >= (closeStage + 1) * PET_STAGE_MS) {
    applyCloseStage(closeStage + 1, { speak: true });
    lastPetLineAt = Date.now();
  } else if (closeStage === 2 && Date.now() - lastPetLineAt >= PET_LINE_GAP) {
    applyCloseStage(2, { speak: true });
    lastPetLineAt = Date.now();
  }
}
function holdPetRevert() { clearTimeout(petIdleTimer); }
function armPetRevert() {
  clearTimeout(petIdleTimer);
  petIdleTimer = setTimeout(() => {
    if (closeStage > 0) {
      applyCloseStage(closeStage - 1);
      pettingMs = closeStage * PET_STAGE_MS;
      armPetRevert();
    }
  }, PET_REVERT_MS);
}
function openClose() {
  closeSessionPets = 0;
  lastPetLineAt = 0;
  pettingMs = 0;
  petClockAt = 0;
  isPetting = false;
  if (petRaf) { cancelAnimationFrame(petRaf); petRaf = 0; }
  lastX = null;
  stroke = 0;
  holdPetRevert();
  closeScreen.classList.remove('hidden');
  applyCloseStage(0, { speak: true });
}
function petFeedback(x, y) {
  petCount += 1;
  closeSessionPets += 1;
  store.set(ck('pet_count'), petCount);
  startPetClock();
  syncPetStage();
  const h = document.createElement('span');
  h.className = 'heart';
  h.textContent = '♥';
  const rect = $('#hearts').getBoundingClientRect();
  h.style.left = (x - rect.left) + 'px';
  h.style.top = (y - rect.top) + 'px';
  $('#hearts').appendChild(h);
  setTimeout(() => h.remove(), 1200);
}

function openPanel(name) {
  panelName = name;
  $('#panelTitle').textContent = { listen: '앨범', message: '메시지', todo: '할 일', moment: '순간' }[name];
  ['listen', 'message', 'todo', 'moment'].forEach(n => $(`#${n}Panel`).classList.toggle('hidden', n !== name));
  panel.classList.remove('hidden');
  if (name === 'listen') renderListen();
  if (name === 'message') {
    store.set(ck('message_seen_count'), getMessages().length);
    store.set(ck('message_seen'), true);
    $('#messageBadge').classList.add('hidden');
    renderMessages();
  }
  if (name === 'moment') renderMoment();
}

$('#startBtn').addEventListener('click', showNameStep);
personaInput.addEventListener('input', updateNamePreview);
$('#nameNextBtn').addEventListener('click', () => {
  const n = personaInput.value.trim();
  if (!n) { showToast('부를 이름을 먼저 적어 주세요.'); return; }
  persona = n;
  store.set('wy_persona', persona);
  showCharacterStep();
});
personaInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#nameNextBtn').click(); });
$('#confirmBtn').addEventListener('click', completeOnboarding);
$('#switcherBack').addEventListener('click', returnToRoomFromSwitcher);
$('#switchCharBtn').addEventListener('click', openCharacterSwitcher);
$('#resetBtn').addEventListener('click', openSettings);
$('#settingsClose').addEventListener('click', closeSettings);
$('#switchPeopleBtn').addEventListener('click', openCharacterSwitcher);
$('#renameOpenBtn').addEventListener('click', () => {
  $('#renameInput').value = persona;
  $('#renameSheet').classList.remove('hidden');
});
$('#renameCancel').addEventListener('click', () => $('#renameSheet').classList.add('hidden'));
$('#renameSave').addEventListener('click', () => {
  if (savePlayerName($('#renameInput').value)) {
    $('#renameSheet').classList.add('hidden');
    closeSettings();
    showToast('이름을 바꿔 두었어요.');
  }
});
$('#resetDataBtn').addEventListener('click', () => {
  if (confirm('이 기기에 저장된 이름·메시지·체크리스트 기록을 초기화할까요?')) {
    Object.keys(localStorage).filter(k => k.startsWith('wy_') || k.startsWith('gm_')).forEach(k => localStorage.removeItem(k));
    location.reload();
  }
});
character.addEventListener('click', openClose);
$('#closeBack').addEventListener('click', () => {
  stopPetClock();
  holdPetRevert();
  closeScreen.classList.add('hidden');
});
$('#callBtn').addEventListener('click', () => {
  const dest = char.zones.center ? 'center' : Object.keys(char.zones)[0];
  moveTo(dest);
  setTimeout(() => say(pickLine('idle'), 3300, { force: true }), 2250);
});
$('#randomTalkBtn').addEventListener('click', () => say(contextualTalk(), 3300, { force: true }));
$$('.rail-btn').forEach(b => b.addEventListener('click', () => openPanel(b.dataset.panel)));
$('#panelBack').addEventListener('click', () => panel.classList.add('hidden'));
$('#todoForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $('#todoInput');
  const text = input.value.trim();
  if (!text) return;
  const ts = loadTodos();
  ts.unshift({ text, done: false });
  saveTodos(ts);
  input.value = '';
});
$('#prevBtn').addEventListener('click', () => setTrack(currentTrack - 1));
$('#nextBtn').addEventListener('click', () => setTrack(currentTrack + 1));
play.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
      play.textContent = 'Ⅱ';
      $('#musicState').textContent = '재생 중';
      maybeMusicReaction();
    } else {
      audio.pause();
      play.textContent = '▶';
      $('#musicState').textContent = '일시정지';
    }
  } catch {
    showToast('음원을 재생할 수 없습니다.');
    $('#musicState').textContent = '음원 파일 대기 중';
  }
});
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.style.width = (audio.currentTime / audio.duration * 100) + '%';
    $('#currentTime').textContent = formatTime(audio.currentTime);
    $('#duration').textContent = formatTime(audio.duration);
  }
});
audio.addEventListener('error', () => { $('#musicState').textContent = '음원 파일 대기 중'; });
audio.addEventListener('ended', () => setTrack(currentTrack + 1));

let lastX = null, stroke = 0;
const petZone = $('#petZone');
petZone.addEventListener('pointerdown', (e) => {
  petZone.setPointerCapture(e.pointerId);
  lastX = e.clientX;
  stroke = 0;
  holdPetRevert();
  startPetClock();
});
petZone.addEventListener('pointermove', (e) => {
  if (lastX === null) return;
  holdPetRevert();
  startPetClock();
  syncPetStage();
  const dx = Math.abs(e.clientX - lastX);
  if (dx > PET_DX) {
    stroke += 1;
    lastX = e.clientX;
    if (stroke % PET_STROKES_PER_TICK === 0) petFeedback(e.clientX, e.clientY);
  }
});
['pointerup', 'pointercancel'].forEach((ev) => petZone.addEventListener(ev, () => {
  lastX = null;
  stroke = 0;
  stopPetClock();
  armPetRevert();
}));

if (window.visualViewport) {
  const syncKeyboard = () => {
    const offset = Math.max(0, window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop);
    onboarding.style.paddingBottom = offset ? `${offset}px` : '';
  };
  window.visualViewport.addEventListener('resize', syncKeyboard);
  window.visualViewport.addEventListener('scroll', syncKeyboard);
}

setInterval(updateTime, 30000);
updateTime();

const params = new URLSearchParams(location.search);
if (params.get('character') && CHARACTERS[params.get('character')]) {
  applyCharacter(params.get('character'));
  pendingId = params.get('character');
}
if (params.get('demo') === '1') {
  enterRoom();
  if (params.get('panel')) setTimeout(() => openPanel(params.get('panel')), 300);
} else if (params.get('onboard') === '1') {
  showSplash();
} else if (hasCompletedOnboarding()) {
  enterRoom();
} else {
  showSplash();
}
