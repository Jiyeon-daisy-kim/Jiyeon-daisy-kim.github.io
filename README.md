# Jiyeon Kim's Website
영화감독 지연의 작업을 기록하는 개인 블로그입니다. `Jiyeon-daisy-kim.github.io` 저장소에는 GitHub Pages로 바로 배포 가능한 정적 HTML·CSS·JS 파일이 포함되어 있습니다.

## 프로젝트 개요
- **목적**: 작품 설명, 시사회 소식, 개인 에세이 등 영화 관련 콘텐츠를 한곳에 소개
- **기술 스택**: 순수 HTML, CSS, JavaScript (Jekyll 미사용)
- **배포 방식**: GitHub Pages (main 브랜치 루트 기준)

## 디렉터리 구조
- `index.html`: 메인 홈 화면
- `introduction`, `film`, `art`, `suddenly-home` 등: 프로젝트별 섹션 폴더
  - 각 폴더에 `index.html`, 전용 `css`, `img` 하위 폴더 포함
- `assets`: 공통 스타일, 폰트, 스크립트, 이미지, 오디오 리소스
- `CNAME`: 커스텀 도메인 설정

## 작업 규칙
- **HTML 파일명**: `camelCase.html`
- **폴더 및 기타 파일명**: `kebab-case`
- **이미지 파일명**: `snake_case.ext`
- **이미지 자산 관리**: 프로젝트별 `img` 폴더에 보관, 불필요한 중복은 제거
- **스타일 추가**: 공통 스타일은 `assets/css`, 페이지 전용 스타일은 각 섹션의 `css` 폴더에 추가

## 로컬 미리보기
1. 저장소를 클론 후, 루트 디렉터리를 로컬 서버(예: VS Code `Live Server`, `python -m http.server`)로 띄웁니다.
2. `http://localhost:포트번호`에서 페이지를 확인합니다.
3. 이미지·폰트 경로가 상대경로이므로 루트에서 띄웠는지 확인합니다.

## 콘텐츠 추가 가이드
- 새 프로젝트를 추가할 때는 `폴더/파일 → CSS → 이미지` 순으로 구조를 맞추고, 공통 네비게이션 스크립트(`assets/js/nav-bar.js`)에 링크를 추가합니다.
- 섹션별 소개 문구는 한국어/영어 병기와 톤을 맞춰 작성합니다.
- 대용량 미디어는 용량을 줄여 WebP 등 경량 포맷을 우선 사용합니다.

## 협업 팁
- 브랜치 전략이 없다면 `feature/<설명>` 형태로 분기 후 PR을 만드세요.
- 커밋 메시지는 한글 요약 + 변경 이유를 간단히 남기면 이후 추적에 도움이 됩니다.
- 변경 후 GitHub Pages 반영까지 수 분 정도 소요될 수 있습니다.

필요한 개선 아이디어나 이슈는 자유롭게 추가해 주세요. 😊


## Color 포트폴리오

- 새 페이지: `/color/`
- 스타일: `color/css/color-style.css`
- 작품 정보와 Vimeo 임베드: `color/index.html`
- 공통 메뉴 두 파일에 Color 링크가 추가되어 있습니다.

첫 작품은 사용자가 제공한 《Diario de una mano》(2025)입니다. Jiyeon Kim의 Colorist 크레딧, Al Este 2026 Best Experimental Short Film 수상과 The Downtown Festival 2025 “Night Cap” 상영 이력을 표시합니다. 수상 표시는 영화의 수상 이력이며 별도의 색보정상으로 표현하지 않습니다. Vimeo의 16초 영상은 전체 영화나 릴이 아닌 색보정 발췌 영상으로 표시합니다.

기존 임시 감독 작품과 시안 안내는 제거했습니다. Vimeo 플레이어에는 직접 열기 링크를 함께 제공하며, 자동 재생은 사용하지 않습니다. 새 작품은 이 페이지에 추가할 수 있습니다. 기존 프로젝트 페이지, 도메인 및 배포 설정은 변경하지 않습니다.
