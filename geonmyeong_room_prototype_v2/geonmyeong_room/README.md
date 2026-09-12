# 沈錚 : WITH YOU — 건명 프로토타입

GitHub Pages에 그대로 올릴 수 있는 정적 HTML/CSS/JS 프로토타입입니다.

## 실행
- `index.html`을 브라우저에서 열거나 VS Code Live Server로 실행합니다.
- GitHub Pages에서는 저장소 루트에 이 파일들을 업로드한 뒤 Pages를 켜면 됩니다.

## 이번 버전 UI
- 모바일 앱 형태의 세로형 인터페이스
- 방 안에서 작은 건명이 자동 이동하고 랜덤 대사를 출력
- 오른쪽 `LISTEN / MESSAGE / WITH ME / MOMENT` 위젯
- 캐릭터 터치 시 클로즈업 → 머리 쓰다듬기
- 이름, 메시지 해금, 체크리스트, 접속 기록을 localStorage에 저장
- 데스크톱에서는 휴대폰 프레임처럼 중앙 표시, 모바일에서는 풀스크린

## 건명 설정 반영
건명은 **29세 여성 기계정비공**입니다. 현재 포함된 SVG는 최종 일러스트가 아니라 자리/비율 확인용 여성 캐릭터 플레이스홀더입니다.
- 갈색 장발
- 반묶음, 앞머리 없음
- 카고 점프수트
- 졸린 인상

## 실제 이미지 교체 경로
`assets/geonmyeong/`
- `profile.svg` — 메시지/선택 화면 프로필
- `idle.svg` — 방 기본
- `walk.svg` — 이동
- `sit.svg` — 앉기
- `close_normal.svg` — 클로즈업 기본
- `close_soft.svg` — 쓰다듬기 반응 1
- `close_happy.svg` — 쓰다듬기 반응 2

동일 파일명으로 PNG/WebP를 쓰고 싶다면 HTML/JS의 경로 확장자를 함께 변경하세요. 투명 배경 WebP/PNG 권장.

## 테마곡
`assets/audio/theme.mp3`를 넣으면 LISTEN에서 재생됩니다.

## 데모 URL
`index.html?demo=1`을 열면 이름 입력 없이 바로 방 화면을 볼 수 있습니다.
`index.html?demo=1&panel=message`처럼 패널 이름(listen/message/todo/moment)을 붙여 테스트할 수 있습니다.
