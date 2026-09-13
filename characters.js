const CHAR_ORDER = ['gukgyeom', 'geonmyeong', 'ryeoseon', 'heedong', 'haerim', 'cheongso'];

const CHARACTERS = {
  gukgyeom: {
    id: 'gukgyeom',
    name: '이국겸',
    originalName: '黎國謙',
    romanizedName: 'Lai Gwok-im',
    age: 35,
    gender: 'female',
    occupation: '정육점 주인',
    personalitySummary: '과묵하고 싸늘한 정육점 주인. 남들이 말하는 선악이나 인륜보다 자신이 정한 규칙을 철저하게 지키며, 가까워진 사람에게는 말보다 행동으로 보호욕을 드러낸다.',
    appearanceSummary: '회색 머리, 흐트러진 단발, 앞머리 없음, 검은 눈, 고양이상. 팔뚝에 타투가 있으며 걷어 올린 셔츠와 검은 PVC 앞치마를 입는다. 177cm, 넓고 근육질인 체형.',
    likes: ['연약한 모습', '새우튀김'],
    dislikes: ['가공식품', '높은 곳'],
    characterTraits: ['과묵함', '싸늘한 반말', '자기혐오', '보호욕', '무뚝뚝한 다정함', '철저한 자기 규칙'],
    behavior: {
      moveInterval: 'slow',
      movementFrequency: 0.45,
      idleWeight: 0.45,
      sitWeight: 0.25,
      windowWeight: 0.20,
      sleepWeight: 0.10
    },
    theme: { primary: '#38483F', secondary: '#281D1C', accent: '#A94A3F', warm: '#C6A36A' },
    roomMood: '정돈된 작은 방. 회색과 짙은 녹색을 기반으로 붉은 포인트 조명이 들어오며, 냉장고와 금속 선반이 놓인 실용적이고 단정한 생활 공간.',
    namePlateEffect: null,
    assets: {
      roomBackground: 'assets/backgrounds/gukgyeom_room_bg.webp',
      idle: 'assets/characters/gukgyeom/chibi_idle.png',
      walk1: 'assets/characters/gukgyeom/chibi_walk_1.png',
      walk2: 'assets/characters/gukgyeom/chibi_walk_2.png',
      sit: 'assets/characters/gukgyeom/chibi_sit.png',
      sleep: 'assets/characters/gukgyeom/chibi_sleep.png',
      window: 'assets/characters/gukgyeom/chibi_window.png',
      closeNormal: 'assets/characters/gukgyeom/close_normal.png',
      closeSoft: 'assets/characters/gukgyeom/close_soft.png',
      closeHappy: 'assets/characters/gukgyeom/close_happy.png'
    },
    zones: {
      center: { left: 50, top: 64, weight: 2.2, pose: 'idle', state: '가만히 서 있는 중' },
      window: { left: 30, top: 54, weight: 1.4, pose: 'window', state: '창밖을 오래 보는 중' },
      desk: { left: 54, top: 58, weight: 0.7, pose: 'sit', state: '책상 앞에 앉아 있는 중' },
      floor: { left: 48, top: 70, weight: 0.8, pose: 'sit', state: '바닥에 내려앉아 쉬는 중' },
      bed: { left: 22, top: 72, weight: 0.9, pose: 'sleep', state: '잠깐 눈을 감은 중' }
    },
    dialogue: {
      greeting: [
        '…왔냐. 거기 서 있지 말고 들어와.',
        '또 왔네. ……하기야. 네가 외박이나 할 성격은 아니지.',
        '신발 젖었으면 닦고 들어와. 바닥 더러워지는 거 싫으니까.',
        '{player}. …또 늦으면 문 걸어잠근다. 외박 생각 마.'
      ],
      idle: [
        '냉장고 또 맛 갔네. ……아니, 너 말고.',
        '배고프면 말해. 대충이라도 뭐 해줄 테니까.',
        '아무거나 만지지 마. 손 베이면 또 내가 치워야 하잖아.',
        '…왜 이렇게 조용하지? 사고 칠 거면 소리 좀 내.'
      ],
      lateNight: [
        '안 자냐. ……나도 아직.',
        '이 시간엔 조용해서 차라리 낫네. 사람 냄새도 덜 나고.',
        '졸리면 자. 괜히 버티다가 비틀거리지 말고.',
        '{player}. 왜 안 자. ……됐어. 그냥 확인한 거야.'
      ],
      returning: [
        '오래 걸렸네. ……어디 있었는지는 안 물을게.',
        '살아는 있었네? 됐어. 그거면.',
        '왔으면 됐어, 멍청아. 설명하려고 하지 마. 피곤하니까.',
        '……다음엔 너무 늦지 마. 신경 쓰는 거, 할 짓 아니야.'
      ],
      petNormal: [
        '…뭐 해.',
        '손 치워. ……됐어. 그냥 둬. 네가 언제 내 말을 들었다고.',
        '머리는 왜 만져. 할 짓 없냐?',
        '……한 번이면 됐지?'
      ],
      petSoft: [
        '이제 그만. 정신 사나우니까.',
        '……손 차갑네. 좀 데우고 해.',
        '그래. 거기. ……아니, 뭐, 별거 아니야.',
        '뭐가 그렇게 좋냐, 넌. 사람 머리 만지는 게.'
      ],
      petHappy: [
        '……끝났어? 하는 김에 조금 더 하지?',
        '{player}. 손 떼지 마. ……잠시만.',
        '이런 거 좋아한다고 생각하지 마. 네가 하니까 가만있는 거다.',
        '……웃지 마. 다음엔 네 차례야.'
      ],
      todoComplete: [
        '끝났네. 잘했어. ……왜? 칭찬했잖아.',
        '하나 끝냈으면 잠깐 쉬어. 다음 거 바로 붙잡지 말고.',
        '그래. 그렇게 하나씩 하면 돼. 괜히 한꺼번에 다 하려 하지 마.',
        '끝났어? 그럼 이거 먹어. 일하다 남은 거 아니고, 너 주려고 한 거야.'
      ],
      musicReaction: [
        '이건 괜찮네. 시끄럽지도 않고.',
        '끄지 마. ……그냥 작업하면서 듣게.',
        '너도 이런 거 좋아하냐? 의외네.',
        '넘기지 마. 끝까지 듣자.'
      ]
    },
    messages: [
      { id: 'welcome', time: '오늘 · 20:14', text: n => `${n}. 오늘도 왔네요.` },
      { id: 'food', time: '오늘 · 17:02', text: () => `밥은 먹었죠.` },
      { id: 'quiet', time: '어제 · 23:40', text: () => `말 없어도 여기 있을게요.` },
      { id: 'cat', time: '04.08 · 19:11', text: () => `창밖이 조금 덜 추워졌어요.` },
      { id: 'sleep', time: '04.07 · 02:02', text: () => `잘 자요.` },
      { id: 'pet', time: '방금', text: () => `아까 그거. 괜찮았어요.` }
    ],
    moments: ['창가에서 한참 서 있었다.', '아무 말도 하지 않았다.', '불빛만 보고 있었다.'],
    momentQuote: '“말은 적어도,<br>자리는 비우지 않아요.”',
    music: [
      { title: 'In the Woods Somewhere', artist: 'Hozier', cover: 'assets/music_covers/gukgyeom/gukgyeom_track_01.png', src: 'bgm/gukgyeom/Hozier - In The Woods Somewhere.mp3' },
      { title: 'The Golden Age', artist: 'Woodkid', cover: 'assets/music_covers/gukgyeom/gukgyeom_track_02.png', src: 'bgm/gukgyeom/Woodkid - The Golden Age.mp3' },
      { title: 'Oats in the Water', artist: 'Ben Howard', cover: 'assets/music_covers/gukgyeom/gukgyeom_track_03.png', src: 'bgm/gukgyeom/Ben Howard - Oats in the Water.mp3' },
      { title: 'Woodlands', artist: 'Chelsea Wolfe', cover: 'assets/music_covers/gukgyeom/gukgyeom_track_04.png', src: 'bgm/gukgyeom/Chelsea Wolfe - Flatlands.mp3' }
    ]
  },

  geonmyeong: {
    id: 'geonmyeong',
    name: '구건명',
    originalName: '邱建明',
    romanizedName: 'Yau Kin Ming',
    age: 29,
    gender: 'female',
    occupation: '기계 정비공',
    personalitySummary: '속을 쉽게 알 수 없는 능청스럽고 나른한 정비공. 사교적이고 농담을 잘하며 대체로 풀어진 듯 행동하지만, 자신의 삶과 직업에 관해 스스로 정한 선만큼은 좀처럼 넘기지 않는다.',
    appearanceSummary: '갈색 장발을 반묶음으로 올리고 앞머리는 없다. 검은 눈에 졸린 듯한 인상. 카고 점프수트를 입고 목에 타투가 있다. 167cm, 생활근육 체형.',
    likes: ['새로운 기계의 조합', '사소한 대화'],
    dislikes: ['폐쇄적인 태도', '완벽한 기계'],
    characterTraits: ['능청', '나른함', '사교적', '반사회적 농담', '존댓말과 반말 혼용', '강단 있음', '명확한 자기 선', '매우 강한 멘탈'],
    behavior: {
      moveInterval: 'medium',
      movementFrequency: 0.60,
      idleWeight: 0.25,
      sitWeight: 0.40,
      windowWeight: 0.15,
      deskWeight: 0.20
    },
    theme: { primary: '#59634A', secondary: '#49362C', accent: '#A54E43', warm: '#C18A52' },
    roomMood: '작업실과 개인실이 자연스럽게 섞인 작은 정비공의 방. 올리브·브라운을 기본으로 초록과 붉은 조명이 들어오며, 작업대와 공구, 기계 부품, 카세트 플레이어 등이 놓인 느슨하고 생활감 있는 공간.',
    namePlateEffect: null,
    assets: {
      roomBackground: 'assets/backgrounds/geonmyeong_room_bg.webp',
      idle: 'assets/characters/geonmyeong/chibi_idle.png',
      walk1: 'assets/characters/geonmyeong/chibi_walk_1.png',
      walk2: 'assets/characters/geonmyeong/chibi_walk_2.png',
      sit: 'assets/characters/geonmyeong/chibi_sit.png',
      sleep: 'assets/characters/geonmyeong/chibi_sleep.png',
      window: 'assets/characters/geonmyeong/chibi_window.png',
      closeNormal: 'assets/characters/geonmyeong/close_normal.png',
      closeSoft: 'assets/characters/geonmyeong/close_soft.png',
      closeHappy: 'assets/characters/geonmyeong/close_happy.png'
    },
    zones: {
      desk: { left: 52, top: 60, weight: 1.8, pose: 'sit', state: '작업대에서 부품을 만지는 중' },
      window: { left: 31, top: 55, weight: 1.0, pose: 'window', state: '창밖을 잠깐 보는 중' },
      floor: { left: 53, top: 68, weight: 1.6, pose: 'sit', state: '바닥에 주저앉아 쉬는 중' },
      center: { left: 50, top: 64, weight: 1.0, pose: 'idle', state: '별일 없이 빈둥거리는 중' },
      bed: { left: 24, top: 72, weight: 0.6, pose: 'sleep', state: '침대 모서리에 앉은 중' }
    },
    dialogue: {
      greeting: [
        '어, 왔어요? 오늘도 방 청소 까먹었는데.',
        '{player} 씨네. 어서 와요. 입장료는… 음, 나중에 받을게.',
        '아, 잠깐만요, 여기 밟으면 뭐 하나 터질 수도 있어서. 아마도.',
        '왜 이렇게 조용히 와요. 나 놀라면 비싼 거 떨어뜨리는데.'
      ],
      idle: [
        '심심해요? 나도. 뭐라도 부숴볼까요. 고치는 건 나중에 하고.',
        '저거 어제부터 고장 나 있었는데, 이상하게 정이 들어서 안 고치는 중.',
        '{player} 씨는 가만히 있을 때 더 수상한 거 알아요?',
        '아, 일하기 싫다. ……에이, 마음으로 일하고 있어요.'
      ],
      lateNight: [
        '안 자요? 나야 뭐, 원래 이 시간에 살지.',
        '이 시간 되면 기계 소리가 잘 들려요. 놈팽이들 입 닥쳐서 그런가.',
        '{player} 씨도 잠 안 와요? 그럼 좀 놀다 가요. 나도 안 자니까.',
        '졸리면 여기서 자도 돼요. 근데 코 골면 수리해 준다?'
      ],
      returning: [
        '어라, 살아 계셨네. 실종 신고할 뻔했어요.',
        '오랜만. 어디서 놀다 왔어요? 재밌었으면 됐고.',
        '{player} 씨 없으니까 조용해서 좋던데. ……내가 거짓말을 좀 잘 하죠.',
        '이제 와요? 기다렸다고 하면 너무 없어 보이나.'
      ],
      petNormal: [
        '뭐예요. 갑자기 서비스 타임?',
        '응, 손님. 거긴 정비 항목에 없는데.',
        '머리 만지면 뭐 나오나 봐요? 동전 같은 거?',
        '하하, 왜요. 내가 고양이처럼 보여?'
      ],
      petSoft: [
        '……생각보다 괜찮네. 아, 기분 이상하다.',
        '거기 조금 오른쪽. 아, 그래요.',
        '이거 습관 들면 책임져야 하는 거 알죠?',
        '{player} 씨 손, 꽤 편하네.'
      ],
      petHappy: [
        '왜 벌써 멈춰요. 시작한 사람이 끝까지 해야지.',
        '응. 더 해요. 내가 언제 이렇게 얌전히 있겠어요.',
        '……좋아하냐고요? 뭐, 싫으면 진작 도망갔지.',
        '{player} 씨. 다음에도 이거 해줘요. 예약 걸어둘게.'
      ],
      todoComplete: [
        '오. 진짜 했네? 축하할까요?',
        '하나 끝. 생각보다 성실하시네~.',
        '잘했어요. 이제 잠깐 딴짓할 자격 생겼다.',
        '완료? 좋아요. 그럼 보상으로… 내가 아무것도 안 시킬게.'
      ],
      musicReaction: [
        '이거 좋네. 작업할 때 틀어놓기 딱인데.',
        '이 노래 아세요? 생각보다 취향 괜찮으시네.',
        '넘기지 마요. 지금 좋은 부분 나오잖아.',
        '음악은 이 정도로 헐렁한 게 좋아요. 사람 숨 쉴 틈도 있고.'
      ]
    },
    messages: [
      { id: 'welcome', time: '오늘 · 21:03', text: n => `${n}. 오늘은 뭐 했어요?` },
      { id: 'food', time: '오늘 · 18:21', text: () => `밥은 먹었죠?` },
      { id: 'quiet', time: '어제 · 23:17', text: () => `…생각보다 조용하네. 바쁜가 보네요.` },
      { id: 'cat', time: '04.10 · 20:05', text: () => `그 아줌마네 고양이 일곱 마리 다 있더라고요. 쓸데없이 보고함.` },
      { id: 'sleep', time: '04.09 · 02:14', text: () => `잘 자요. …안 자려나.` },
      { id: 'pet', time: '방금', text: () => `아까 그거. 머리 만진 거요. 싫었다는 뜻은 아니고.` }
    ],
    moments: ['뭔가를 조립하고 있었다.', '창가에서 한참 바깥을 봤다.', '바닥에 앉아 렌치를 굴리고 있었다.', '잠깐, 아무것도 하지 않았다.'],
    momentQuote: '“별 거 아닌 순간들이,<br>조금은 특별해지는 곳.”',
    music: [
      { title: 'Chillax (Feat. 蛋堡)', artist: '24Herbs', cover: 'assets/music_covers/geonmyeong/geonmyeong_track_01.png', src: 'bgm/geonmyeong/24Herbs - Chillax (Feat. 蛋堡).mp3' },
      { title: '香港九龍', artist: '24Herbs', cover: 'assets/music_covers/geonmyeong/geonmyeong_track_02.png', src: 'bgm/geonmyeong/24Herbs - 香港九龍.mp3' },
      { title: 'Выдыхай', artist: 'Noize MC', cover: 'assets/music_covers/geonmyeong/geonmyeong_track_03.png', src: 'bgm/geonmyeong/Noize MC - Выдыхай.mp3' },
      { title: 'Loser', artist: 'Beck', cover: 'assets/music_covers/geonmyeong/geonmyeong_track_04.png', src: 'bgm/geonmyeong/Beck - Loser.mp3' }
    ]
  },

  ryeoseon: {
    id: 'ryeoseon',
    name: '장려선',
    originalName: '張麗善',
    romanizedName: 'Cheung Lai Sin',
    age: 28,
    gender: 'female',
    occupation: '불법 의사',
    personalitySummary: '늘 무표정하고 행동이 느리며 일상에서는 어딘가 서툴지만, 치료에 들어가면 놀랄 만큼 확고하다. 사람을 낫게 하는 데 헌신적이면서도 치료라는 행위 자체에 강하게 집착하는 기묘한 의사.',
    appearanceSummary: '백발의 너덜너덜하고 흐트러진 장발, 앞머리 없음, 검은 눈, 나른한 고양이상. 얼굴과 몸에는 많은 흉터가 있다. 루즈한 셔츠와 검은 앞치마를 입고 주머니에는 주사기와 의료용품이 가득하다. 169cm, 마른 체형.',
    likes: ['건강한 사람', '인간의 체온'],
    dislikes: ['도박', '거짓말'],
    characterTraits: ['무표정', '느린 존댓말', '실수투성이', '반사회적 태도', '치료 집착', '조용한 보호욕', '늘 쪼그린 자세'],
    defaultPlayerTitle: '선생님',
    behavior: {
      moveInterval: 'slow',
      movementFrequency: 0.35,
      idleWeight: 0.20,
      sitWeight: 0.50,
      windowWeight: 0.15,
      sleepWeight: 0.15
    },
    theme: { primary: '#B9CCC4', secondary: '#D8D8D2', accent: '#A96D70', dark: '#34413F' },
    roomMood: '작은 진료 벙커에 딸린 포근한 개인 공간. 흰색·민트·회색을 중심으로 희미한 붉은 조명이 섞이며, 낮은 침대와 의료용 수납장이 놓여 있다.',
    namePlateEffect: null,
    assets: {
      roomBackground: 'assets/backgrounds/ryeoseon_room_bg.webp',
      idle: 'assets/characters/ryeoseon/chibi_idle.png',
      walk1: 'assets/characters/ryeoseon/chibi_walk_1.png',
      walk2: 'assets/characters/ryeoseon/chibi_walk_2.png',
      sit: 'assets/characters/ryeoseon/chibi_sit.png',
      sleep: 'assets/characters/ryeoseon/chibi_sleep.png',
      window: 'assets/characters/ryeoseon/chibi_window.png',
      closeNormal: 'assets/characters/ryeoseon/close_normal.png',
      closeSoft: 'assets/characters/ryeoseon/close_soft.png',
      closeHappy: 'assets/characters/ryeoseon/close_happy.png'
    },
    zones: {
      floor: { left: 48, top: 70, weight: 2.2, pose: 'sit', state: '바닥에 앉아 있는 중' },
      center: { left: 50, top: 66, weight: 1.2, pose: 'sit', state: '자리를 잘 안 뜨는 중' },
      desk: { left: 58, top: 58, weight: 0.8, pose: 'sit', state: '책상 모서리에 기대 있는 중' },
      window: { left: 28, top: 56, weight: 0.9, pose: 'window', state: '창가에 앉아 있는 중' },
      bed: { left: 22, top: 72, weight: 1.3, pose: 'sleep', state: '이불 위에 엎드린 중' }
    },
    dialogue: {
      greeting: [
        '……왔네요. 선생님. 제가요, 기다리고 있었어요.',
        '{player} 씨. 오늘은요, 어디 아픈 데 없죠? 없어요?',
        '들어와요. 밖에 서 있으면요, 몸 차가워져요.',
        '선생님이 있어서요. ……좋아요. 이제 됐어요.'
      ],
      idle: [
        '선생님은요, 가만히 있어도 미열이 있네요. 신기하게.',
        '저요, 할 일 없으면요. 그냥 이렇게 있어요. 별거 없어요.',
        '붕대 금방 정리했어요. ……또 흐트러질 거지만요.',
        '선생님. 저 보고 있었어요? 저도요. 언제나요.'
      ],
      lateNight: [
        '안 자요? 저는요, 원래 잘 못 자요.',
        '이 시간은요, 조용해서 좋아요. 숨 쉬는 소리도 잘 들리고.',
        '졸리면요, 누워요. 제가 만든 건데요, 수면제 처방해 드릴게요.',
        '선생님. 가지 말아요. ……조금만요.'
      ],
      returning: [
        '……오래 안 왔어요. 저요, 몇 번이나 확인했는데. 정말 몇 번이나.',
        '왔네요. 다친 데부터 보여줘요. ……안 다쳤으면, 더 좋고요.',
        '선생님 없을 때요, 조용했어요. 너무 조용해서요, 조용해서.',
        '다시 왔으니까요. 됐어요. 어디 있었는지는, 안 물어볼게요.'
      ],
      petNormal: [
        '……왜 부르셨어요?',
        '왜요. 뭐 묻었어요?',
        '선생님 손이요. 따뜻하네요.',
        '계속 만지는 거예요? ……그래도 돼요.'
      ],
      petSoft: [
        '조금만요. 조금만 더 해줘요.',
        '……이렇게 하면요, 이상하게 잠이 와요.',
        '선생님 손, 기억해도 돼요?',
        '좋아요. 가만히 있을게요. 안 움직일게요.'
      ],
      petHappy: [
        '멈추지 말아요. 저요, 아직 머리 엉망이에요.',
        '선생님. 저한테만 이렇게 해주면 안 돼요?',
        '……좋아요. 진짜로요. 많이.',
        '저요, 지금은 아무것도 안 해도 될 것 같아요. 그냥 있어도.'
      ],
      todoComplete: [
        '했어요? 잘했어요. 이제요, 쉬어도 돼요. 저랑요.',
        '선생님은요, 자꾸 많을 걸 하려고 해요. 오늘은 이걸로 됐어요.',
        '하나 끝났네요. ……제 몸에 표시해 둘까요?',
        '잘했어요. 손 줘봐요. 아픈 데 없는지 볼게요.'
      ],
      musicReaction: [
        '이 소리요, 계속 들어도 괜찮네요.',
        '조금 이상한데요. ……그래서 좋아요.',
        '끄지 말아요. 이대로 두면요, 방이 덜 조용해서.',
        '이런 음악 들으면요, 맥박이 조금 달라져요. 신기하죠.'
      ]
    },
    messages: [
      { id: 'welcome', time: '오늘 · 21:40', text: n => `${n}. 오늘은 안 나갈 거죠?` },
      { id: 'food', time: '오늘 · 19:05', text: () => `배고프면 말해요.` },
      { id: 'quiet', time: '어제 · 22:50', text: () => `나 여기 있었어요.` },
      { id: 'cat', time: '04.06 · 16:20', text: () => `바닥이 차가워서 양말 신었어요.` },
      { id: 'sleep', time: '04.05 · 01:48', text: () => `불은 켜 둘게요.` },
      { id: 'pet', time: '방금', text: () => `머리 만진 거. 싫진 않았어요.` }
    ],
    moments: ['바닥에 앉아 오래 있었다.', '이불 끝을 만지고 있었다.', '창가에 붙어 앉아 있었다.'],
    momentQuote: '“나가기보다,<br>남는 쪽이 편해요.”',
    music: [
      { title: '30 Minutes', artist: 't.A.T.u.', cover: 'assets/music_covers/ryeoseon/ryeoseon_track_01.png', src: 'bgm/ryeoseon/t.A.T.u. - 30 Minutes.mp3' },
      { title: '6 Underground', artist: 'Sneaker Pimps', cover: 'assets/music_covers/ryeoseon/ryeoseon_track_02.png', src: 'bgm/ryeoseon/Sneaker Pimps - 6 Underground.mp3' },
      { title: 'Hide U', artist: 'Kosheen', cover: 'assets/music_covers/ryeoseon/ryeoseon_track_03.png', src: 'bgm/ryeoseon/Kosheen - Hide U.mp3' },
      { title: 'If I Had A Heart', artist: 'Fever Ray', cover: 'assets/music_covers/ryeoseon/ryeoseon_track_04.png', src: 'bgm/ryeoseon/Fever Ray - If I Had A Heart.mp3' }
    ]
  },

  heedong: {
    id: 'heedong',
    name: '임희동',
    originalName: '林希彤',
    romanizedName: 'Lam Hei Tung',
    age: 38,
    gender: 'female',
    occupation: '타짜',
    personalitySummary: '대부분의 일에는 무심하고 시큰둥하지만, 한번 흥미가 생긴 대상은 오래 관찰하고 집요하게 파고든다. 성숙하고 여유로우며 좀처럼 표정을 읽히지 않는 여자.',
    appearanceSummary: '흑발 로우 포니테일, 앞머리 없음, 검은 눈, 뱀상. 가죽 반장갑과 순금 액세서리를 착용하며 민소매 트렌치코트를 입는다. 165cm, 굴곡 있는 체형.',
    likes: ['LP바', '흥미로운 플레이어', '쇼핑'],
    dislikes: ['말 많은 사람', '멘탈 약한 사람'],
    characterTraits: ['흥미 본위', '성숙한 연상미', '반존대', '포커페이스', '강한 집중력', '집요한 관찰', '소시오패스'],
    defaultPlayerTitle: '아가씨',
    behavior: {
      moveInterval: 'medium',
      movementFrequency: 0.40,
      idleWeight: 0.30,
      sitWeight: 0.45,
      windowWeight: 0.15,
      sleepWeight: 0.10
    },
    theme: { primary: '#243B34', secondary: '#481F2A', accent: '#C9A75D', cream: '#D8C9AE' },
    roomMood: '도박장과 LP바의 분위기가 섞인 세련된 개인실. 딥그린·와인·금색 중심으로 작은 소파와 LP 플레이어, 카드와 액세서리가 놓여 있다.',
    namePlateEffect: null,
    assets: {
      roomBackground: 'assets/backgrounds/heedong_room_bg.webp',
      idle: 'assets/characters/heedong/chibi_idle.png',
      walk1: 'assets/characters/heedong/chibi_walk_1.png',
      walk2: 'assets/characters/heedong/chibi_walk_2.png',
      sit: 'assets/characters/heedong/chibi_sit.png',
      sleep: 'assets/characters/heedong/chibi_sleep.png',
      window: 'assets/characters/heedong/chibi_window.png',
      closeNormal: 'assets/characters/heedong/close_normal.png',
      closeSoft: 'assets/characters/heedong/close_soft.png',
      closeHappy: 'assets/characters/heedong/close_happy.png'
    },
    zones: {
      sofa: { left: 36, top: 66, weight: 2.4, pose: 'sit', state: '소파에 기대 앉은 중' },
      desk: { left: 58, top: 58, weight: 1.1, pose: 'sit', state: '테이블에 앉아 있는 중' },
      center: { left: 50, top: 64, weight: 0.8, pose: 'idle', state: '천천히 서성이는 중' },
      window: { left: 72, top: 54, weight: 0.9, pose: 'window', state: '창가 소파에 앉은 중' },
      bed: { left: 20, top: 72, weight: 0.7, pose: 'sleep', state: '소파에 누운 중' }
    },
    dialogue: {
      greeting: [
        '왔어요, 아가씨? 오늘은 좀 늦었네.',
        '응? 우리 아가씨네. 들어와요. 서 있지 말고.',
        '왔네. 오늘은 뭐 하고 놀려고?',
        '어서 와요. 내가 먼저 부를까 고민하던 참이었는데.'
      ],
      idle: [
        '그렇게 쳐다보면 재미있는 거라도 보여줘야 하나.',
        '아가씨, 심심하면 카드라도 한 장 뽑아봐요. 돈은 안 받을게. 오늘만.',
        '사람 구경하는 게 제일 재밌어. 특히 표정 숨기는 데 소질 없는 사람.',
        '왜. 할 말 있어요? 얼굴에 반쯤 써 있는데.'
      ],
      lateNight: [
        '이 시간까지 안 자고 뭐 해요, 아가씨.',
        '밤이 훨씬 낫지. 그때 판이 제일 시끄럽거든. 돈도 많이 구르고.',
        '졸리면 자요. 어차피 나도 조금 있으면 나가.',
        '늦었네. ……그래도 가지 마. 지금은 좀 재밌거든.'
      ],
      returning: [
        '이제야 왔네. 사람 기다리게 하는 취미도 있었어요?',
        '오랜만이에요, 아가씨. 잊은 줄 알았잖아.',
        '안 보이니까 조금 심심하긴 하더라. 패는 여전히 잘 잡히길래, 안 불렀어요.',
        '왔으면 됐어요. 변명은 안 해도 돼. 재미없으니까.'
      ],
      petNormal: [
        '응? 지금 내 머리 만지는 거예요?',
        '겁도 없네, 우리 아가씨.',
        '이건 뭘 걸고 하는 도박인데? 설명부터 해봐요.',
        '내가 가만히 있으니까 더 신났어?'
      ],
      petSoft: [
        '……나쁘진 않네. 계속해 봐요.',
        '손길이 꽤 능숙하네. 어디서 배웠어요?',
        '조금 더 천천히.',
        '아가씨가 이렇게 친절히 구는 건 또 처음 보네.'
      ],
      petHappy: [
        '왜 멈춰. 내가 그만하라고 했어요?',
        '응, 거기 좋아. 계속.',
        '다른 데 가서도 이러고 다니는 건 아니지, 아가씨?',
        '잘하네. 상 줄까? ……뭘 기대하는 얼굴이야.'
      ],
      todoComplete: [
        '끝냈어요? 생각보다 성실하네, {player}.',
        '잘했어. 그럼 이제 놀아도 되겠네.',
        '하나 처리했으면 됐지. 완벽하려고 들면 재미없어요.',
        '응, 합격. 오늘은 내가 점수 후하게 줄게.'
      ],
      musicReaction: [
        '이 노래는 좀 좋네. 밤에 들으면 더 좋겠어.',
        '아가씨 취향, 생각보다 재미있는데.',
        '넘기지 마요. 지금 분위기 괜찮아.',
        '이런 건 술 한 잔 놓고 들어야 하는데. 그건 다음에.'
      ]
    },
    messages: [
      { id: 'welcome', time: '오늘 · 20:48', text: n => `${n}. 자리 있어요.` },
      { id: 'food', time: '오늘 · 18:40', text: () => `저녁은 먹었나요.` },
      { id: 'quiet', time: '어제 · 23:05', text: () => `오늘은 손님이 적어서 좋았어요.` },
      { id: 'cat', time: '04.11 · 21:12', text: () => `소파 쿠션을 하나 바꿨어요.` },
      { id: 'sleep', time: '04.10 · 01:30', text: () => `불은 꺼 둘게요. 잘 자요.` },
      { id: 'pet', time: '방금', text: () => `머리요. 갑자기여도 싫진 않았어요.` }
    ],
    moments: ['소파에 기대 오래 앉아 있었다.', '잔을 만지작거렸다.', '조명을 한 단계 낮췄다.'],
    momentQuote: '“앉을 자리만 있으면,<br>밤은 생각보다 길지 않아요.”',
    music: [
      { title: '事後', artist: 'Prudence Liew', cover: 'assets/music_covers/heedong/heedong_track_01.png', src: 'bgm/heedong/Prudence Liew - 事後.mp3' },
      { title: '你朝我的方向走來', artist: '馬念先 & 9m88', cover: 'assets/music_covers/heedong/heedong_track_02.png', src: 'bgm/heedong/馬念先 & 9m88 - 你朝我的方向走來.mp3' },
      { title: '繾綣星光下', artist: 'Shirley Kwan', cover: 'assets/music_covers/heedong/heedong_track_03.png', src: 'bgm/heedong/Shirley Kwan - 繾綣星光下.mp3' },
      { title: '一接觸', artist: 'Sandy Lam', cover: 'assets/music_covers/heedong/heedong_track_04.png', src: 'bgm/heedong/Sandy Lam  - 一接觸.mp3' }
    ]
  },

  haerim: {
    id: 'haerim',
    name: '장해림',
    originalName: '张海霖',
    romanizedName: 'Cheung Hoi Lam',
    age: 41,
    gender: 'female',
    occupation: '부패 경찰',
    personalitySummary: '세상사 대부분을 한 걸음 떨어져 구경하는 천하태평한 부패 경찰. 늘 풀어지고 장난스러워 보이지만, 실제 위협 앞에서는 한때 뛰어난 관리관이었던 무력과 판단력이 아무렇지 않게 튀어나온다.',
    appearanceSummary: '황토색 머리, 깔끔한 중단발, 앞머리 없음, 검은 눈, 나른한 인상. 경찰 제복을 대충 걸치고 있으며 양팔에는 타투가 있다. 174cm, 근육질 체형.',
    likes: ['평안', '똑똑한 사람', '술'],
    dislikes: ['경찰'],
    characterTraits: ['천하태평', '시금털털', '나른한 성숙함', '능글맞음', '장난기', '친근한 반말', '미련 없는 태도', '위기 시 즉각적인 판단력'],
    behavior: {
      moveInterval: 'slow',
      movementFrequency: 0.25,
      idleWeight: 0.20,
      sitWeight: 0.45,
      windowWeight: 0.10,
      sleepWeight: 0.25
    },
    theme: { primary: '#45513F', secondary: '#2D3441', accent: '#9E5148', bronze: '#A77C55' },
    roomMood: '편안하게 늘어진 경찰의 개인실. 베이지·네이비·올리브 중심에 붉은 도시빛이 들어오며, 정리되지 않은 침대와 제복, 술병과 라디오가 놓여 있다.',
    namePlateEffect: null,
    assets: {
      roomBackground: 'assets/backgrounds/haerim_room_bg.webp',
      idle: 'assets/characters/haerim/chibi_idle.png',
      walk1: 'assets/characters/haerim/chibi_walk_1.png',
      walk2: 'assets/characters/haerim/chibi_walk_2.png',
      sit: 'assets/characters/haerim/chibi_sit.png',
      sleep: 'assets/characters/haerim/chibi_sleep.png',
      window: 'assets/characters/haerim/chibi_window.png',
      closeNormal: 'assets/characters/haerim/close_normal.png',
      closeSoft: 'assets/characters/haerim/close_soft.png',
      closeHappy: 'assets/characters/haerim/close_happy.png'
    },
    zones: {
      bed: { left: 28, top: 70, weight: 2.8, pose: 'sleep', state: '이불 속에서 쉬는 중' },
      floor: { left: 50, top: 68, weight: 1.8, pose: 'sit', state: '침대 옆에 앉아 있는 중' },
      center: { left: 48, top: 64, weight: 0.5, pose: 'idle', state: '겨우 일어난 중' },
      window: { left: 70, top: 56, weight: 0.6, pose: 'window', state: '커튼 사이로 밖을 보는 중' },
      desk: { left: 60, top: 58, weight: 0.5, pose: 'sit', state: '책상에 팔베개한 중' }
    },
    dialogue: {
      greeting: [
        '왔네, 꼬마야. 오늘은 사고 안 쳤고?',
        '이게 누구야. 아줌마네 귀한 손님 오셨네~.',
        '{player}. 들어와. 밖에 서 있으면 내가 나가야 하잖아. 귀찮게.',
        '앉아. 잘됐네. 나 지금 심심했거든.'
      ],
      idle: [
        '할 일 없으면 그냥 있어. 꼭 뭘 해야 되나.',
        '경찰은 원래 이렇게 한가해. ……뭐, 보통 그렇지.',
        '술은 있는데 안 줄 거야. 너 취하면 귀찮잖아.',
        '뭘 그렇게 열심히 봐. 경찰 아줌마 얼굴에 사건번호라도 써 있어?'
      ],
      lateNight: [
        '아직도 안 자? 젊어서 좋네.',
        '새벽엔 조용해서 좋아. 신고도 덜 들어오고. 안 받지만.',
        '졸리면 그냥 자. 내가 깨우진 않을게.',
        '이 시간에 경찰서를 들어온 거면 취향 독특한데.'
      ],
      returning: [
        '이야, 이제 오셨네~. 아주 바쁘셨나 봐.',
        '안 보이길래 어느 새끼 유치장에 처박혀 있나 했지.',
        '왔으면 앉아. 취조할 생각 없어.',
        '오랜만이네, {player}. ……좀 더 빨리 와도 됐는데.'
      ],
      petNormal: [
        '어라. 지금 나 쓰다듬는 거야?',
        '하하, 이것 봐라. 사람을 아주 개 취급하네.',
        '계속할 거야? 뭐, 난 상관없는데.',
        '얼굴이랑 다르게 손이 제법 과감하시네.'
      ],
      petSoft: [
        '음. 이거 생각보다 괜찮다.',
        '거기 조금만 더. 그래, 딱 거기.',
        '왜 멈춰. 귀찮게 굴었으면 끝까지 해야지.',
        '아, 졸려지네. 책임져.'
      ],
      petHappy: [
        '좋다. 계속해. 나 안 움직일 테니까.',
        '아예 여기 눌러앉을까. 손 떼지 말고.',
        '{player}, 너 이거 꽤 잘하네. 자주 해.',
        '끝났어? ……에이, 너무 짧잖아.'
      ],
      todoComplete: [
        '다 했어? 어이구, 기특해라. 엉덩이라도 쳐 줘?',
        '잘했네. 이제 좀 놀아. 일만 하면 늙어.',
        '하나 해치웠으면 됐지. 오늘 세상이 무너지진 않아.',
        '끝? 좋아. 그럼 한잔…은 안 되고, 물이라도 마셔.'
      ],
      musicReaction: [
        '이건 좀 좋네. 소리 키워봐.',
        '이런 거 들을 줄도 알아? 다시 보이는데.',
        '그대로 둬. 분위기 괜찮잖아.',
        '음악 들으니까 더 일하기 싫네. 아주 훌륭해.'
      ]
    },
    messages: [
      { id: 'welcome', time: '오늘 · 22:10', text: n => `${n}. 이불 따뜻해요.` },
      { id: 'food', time: '오늘 · 16:30', text: () => `밥은… 나중에.` },
      { id: 'quiet', time: '어제 · 00:12', text: () => `깨우지 마요. 옆에만 있어요.` },
      { id: 'cat', time: '04.09 · 14:05', text: () => `커튼을 반만 쳤어요.` },
      { id: 'sleep', time: '04.08 · 03:20', text: () => `잘 자요. 나도요.` },
      { id: 'pet', time: '방금', text: () => `머리요. 더 졸려졌어요.` }
    ],
    moments: ['이불 속에서 숨만 쉬고 있었다.', '베개 옆을 한 손으로 잡고 있었다.', '겨우 일어나 창을 봤다.'],
    momentQuote: '“오늘은 멀리 가지 않아요.<br>이불이 더 가까우니까.”',
    music: [
      { title: 'Mesmerize (feat. Ashanti)', artist: 'Ja Rule', cover: 'assets/music_covers/haerim/haerim_track_01.png', src: 'bgm/haerim/Ja Rule - Mesmerize (feat. Ashanti).mp3' },
      { title: "Gangsta Lovin' (feat. Alicia Keys)", artist: 'Eve', cover: 'assets/music_covers/haerim/haerim_track_02.png', src: "bgm/haerim/Eve - Gangsta Lovin' (feat. Alicia Keys).mp3" },
      { title: "How's It Goin' Down", artist: 'DMX', cover: 'assets/music_covers/haerim/haerim_track_03.png', src: "bgm/haerim/DMX - How's It Goin' Down.mp3" },
      { title: 'I Know What You Want', artist: 'Busta Rhymes, Mariah Carey', cover: 'assets/music_covers/haerim/haerim_track_04.png', src: 'bgm/haerim/Busta Rhymes, Mariah Carey - I Know What You Want (ft. Flipmode Squad).mp3' }
    ]
  },

  cheongso: {
    id: 'cheongso',
    name: '청소',
    originalName: '清巢',
    romanizedName: 'Ching Chau',
    age: 23,
    gender: 'female',
    occupation: '청소부',
    personalitySummary: '광기와 순종이 아무 예고 없이 뒤섞이는 청소부. 경박하고 괴이한 존댓말을 쓰며 감정이 크게 움직일 때는 특정 단어를 강박적으로 반복한다. 다음 행동을 쉽게 읽을 수 없는 긴장이 특징.',
    appearanceSummary: '푸른 염색모, 곱슬거리며 이리저리 뻗친 장발, 검은 눈, 상어 같은 인상, 흰 피부. 민소매 점프수트와 체스트 하네스를 착용하고 기묘한 청소용구함을 들고 다닌다. 170cm, 근육질 체형.',
    likes: ['만두', '퀴즈 풀이'],
    dislikes: ['통제', '마약'],
    characterTraits: ['광기와 순종의 급격한 전환', '폭력성 급류', '경박함', '괴이한 존댓말', '강박적 반복어', '예측불가', '근무태만', '연애 시 어리광'],
    behavior: {
      moveInterval: 'fast',
      movementFrequency: 0.85,
      idleWeight: 0.10,
      sitWeight: 0.20,
      windowWeight: 0.20,
      sleepWeight: 0.05,
      randomActionWeight: 0.45
    },
    theme: { primary: '#197F7A', secondary: '#315EA8', accent: '#D84845', lime: '#A4D65E' },
    roomMood: '컬러풀하고 기묘한 물건이 가득한 귀여운 방. 청록·코발트·빨강·라임을 포인트로 사용하며, 청소도구와 이상한 수집품이 장난감처럼 뒤섞여 있다.',
    namePlateEffect: {
      enabled: true,
      variant: 'overpainted',
      revealPreviousName: false,
      ghostText: '▒▒▒',
      ghostOpacity: 0.22,
      ghostBlur: 1.5,
      scratchLines: true,
      paintStroke: true,
      splash: true,
      splashPrimary: '#D84845',
      splashSecondary: '#197F7A',
      rotation: -3,
      intensity: 0.85
    },
    assets: {
      roomBackground: 'assets/backgrounds/cheongso_room_bg.webp',
      idle: 'assets/characters/cheongso/chibi_idle.png',
      walk1: 'assets/characters/cheongso/chibi_walk_1.png',
      walk2: 'assets/characters/cheongso/chibi_walk_2.png',
      sit: 'assets/characters/cheongso/chibi_sit.png',
      sleep: 'assets/characters/cheongso/chibi_sleep.png',
      window: 'assets/characters/cheongso/chibi_window.png',
      closeNormal: 'assets/characters/cheongso/close_normal.png',
      closeSoft: 'assets/characters/cheongso/close_soft.png',
      closeHappy: 'assets/characters/cheongso/close_happy.png'
    },
    zones: {
      center: { left: 50, top: 64, weight: 1.4, pose: 'idle', state: '또 뭔가 만지는 중' },
      desk: { left: 56, top: 58, weight: 1.2, pose: 'sit', state: '작업대에 붙었다가 일어나는 중' },
      window: { left: 30, top: 54, weight: 1.1, pose: 'window', state: '창가까지 다녀오는 중' },
      floor: { left: 46, top: 70, weight: 0.8, pose: 'sit', state: '바닥에 앉았다가 일어나는 중' },
      bed: { left: 22, top: 72, weight: 0.5, pose: 'sleep', state: '침대에 잠깐 누운 중' }
    },
    dialogue: {
      greeting: [
        '아, 예. 오셨습니까. 오늘도 멀쩡하시네. 재미없게.',
        '{player}. 왔습니까? 왔네왔네왔네. 좋아. 좋습니다.',
        '어서 옵쇼! 바닥은 깨끗합니다. 제가 방금 좀 치웠거든요. 근데 냄새 아직 나죠?',
        '댁이네. 반갑습니다. 반가워반가워. 좀 심하게.'
      ],
      idle: [
        '심심합니다. 심심심심심심. 뭐라도 부술까요?',
        '저기 먼지 보입니까? 안 보이죠? 제가 이겼습니다.',
        '만두 먹고 싶네요. 갑자기. 지금. 당장. 만두만두만두.',
        '{player}, 댁은 조용히 있어도 시끄럽습니다. 이상하죠? 나도 모르겠습니다.'
      ],
      lateNight: [
        '안 잡니까? 야행성이십니까? 저도 모릅니다. 수면수면수면, 그거 망했습니다.',
        '이 시간 좋네요. 조용조용조용. 아까울 정도로.',
        '{player}. 눈 감지 마십쇼. 놀아요. ……아, 자는 거면 감아도 됩니다.',
        '새벽엔 다들 얌전합니다. 그게 재미없어서 내가 돌아다닙니다.'
      ],
      returning: [
        '왔네! 어디어디어디 갔었습니까. 아니, 됐습니다. 살아왔으면.',
        '오랜만입니다. 저 기다렸냐고요? 아닙니다. 조금.',
        '{player}. 없어졌길래 버린 줄 알았습니다. 안 버렸네. 좋네.',
        '다시 왔습니까? 그럼 됐습니다. 좋습니다.'
      ],
      petNormal: [
        '……뭡니까.',
        '머리요? 왜요. 먼지 묻었습니까?',
        '손 치우라고 할까요. 말까요. 아니면 내가 치워드릴까요?',
        '이거, 그, 쓰다듬기입니까? 개한테 하는 거?'
      ],
      petSoft: [
        '……계속해도 됩니다. 내 머리를 치워주십쇼.',
        '조용하네요. 이상하게. 머릿속이 따뜻하고.',
        '거기 좋습니다. 좋네좋네좋네.',
        '댁 손은 안 시끄럽습니다. 마음에 듭니다.'
      ],
      petHappy: [
        '멈추지 마십쇼. 명령입니다. 부탁 아닙니다.',
        '{player}. 더. 더더더. 아, 머리는 아직 그대로 있습니다.',
        '나 지금 얌전하죠? 대단하죠? 얌전하죠? 그러니까 계속.',
        '손 떼면 물 겁니다. 농담입니다. 아마.'
      ],
      todoComplete: [
        '완료완료완료. 좋습니다. 도장 찍어드릴깝쇼?',
        '했습니까? 훌륭합니다. 안 했으면 제가 했을 겁니다. 일단 아세톤으로.',
        '하나 지웠네요. 체크리스트도 청소군요. 청소청소가하는청소. 마음에 듭니다.',
        '끝! 이제 {player}, 놀아도 됩니다. 내가 허락했습니다.'
      ],
      musicReaction: [
        '좋네요! 이게 무슨 장릅니까? 화―팝? 몰라도 됩니다. 좋습니다.',
        '소리 키워도 됩니까? 안 된다고 해도 엄청 키울 겁니다.',
        '이 곡 웃깁니다. 왜 좋은지는 모르겠다. 아주 좋습니다.',
        '다음 거 틀어보, 아니, 잠깐. 이것도 끝까지 들어야 합니다.'
      ]
    },
    messages: [
      { id: 'welcome', time: '오늘 · 19:55', text: n => `${n}! 오늘 뭐 할 거예요?` },
      { id: 'food', time: '오늘 · 18:10', text: () => `밥 먹고 와요. 기다릴게요. 조금만요.` },
      { id: 'quiet', time: '어제 · 22:33', text: () => `혼자 있어도 심심하진 않은데, 있는 게 낫죠.` },
      { id: 'cat', time: '04.12 · 15:44', text: () => `선 정리하다가 더 꼬았어요.` },
      { id: 'sleep', time: '04.11 · 02:40', text: () => `아직 안 자요. 자요, 당신은.` },
      { id: 'pet', time: '방금', text: () => `머리요. 갑자기여도 좋아요.` }
    ],
    moments: ['방을 한 바퀴 돌고 있었다.', '선 하나를 만지작거렸다.', '창과 책상을 오가고 있었다.'],
    momentQuote: '“가만히 있으면<br>뭔가 놓치는 기분이에요.”',
    music: [
      { title: 'Pump Up', artist: 'Akini Jing', cover: 'assets/music_covers/cheongso/cheongso_track_01.png', src: 'bgm/cheongso/Akini Jing - Pump Up.mp3' },
      { title: "Don't light my fire", artist: 'Otoboke Beaver', cover: 'assets/music_covers/cheongso/cheongso_track_02.png', src: "bgm/cheongso/Otoboke Beaver - Don't light my fire.mp3" },
      { title: 'Butterfly', artist: 'Swingrowers', cover: 'assets/music_covers/cheongso/cheongso_track_03.png', src: 'bgm/cheongso/Swingrowers - Butterfly.mp3' },
      { title: 'Shook', artist: 'Tkay Maidza', cover: 'assets/music_covers/cheongso/cheongso_track_04.png', src: 'bgm/cheongso/Tkay Maidza - Shook.mp3' }
    ]
  }
};
