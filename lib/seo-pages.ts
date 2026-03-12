import type { Language } from "@/lib/translations";

type LocalizedText = Record<Language, string>;
type LocalizedList = Record<Language, string[]>;

export type SeoPageKey =
  | "unityScript"
  | "gameIdea"
  | "gameUi"
  | "gameDesignDocument"
  | "tools"
  | "gameMechanics"
  | "indieGamePlanning"
  | "uiUxPlanning"
  | "mobileGameUi"
  | "mvpRoadmap"
  | "puzzleGameIdea"
  | "gameSystemDesign"
  | "gameMonetization"
  | "pixelArtGenerator";

export type SeoPageContent = {
  slug: string;
  metadataTitle: LocalizedText;
  metadataDescription: LocalizedText;
  heroTitle: LocalizedText;
  heroDescription: LocalizedText;
  problemTitle: LocalizedText;
  problemBody: LocalizedText;
  solutionTitle: LocalizedText;
  solutionBody: LocalizedText;
  exampleTitle: LocalizedText;
  exampleBody: LocalizedText;
  benefitsTitle: LocalizedText;
  benefits: LocalizedList;
  premiumTitle: LocalizedText;
  premiumBody: LocalizedText;
  premiumToolHref?: string;
  cta: LocalizedText;
  toolHref: string;
  related: SeoPageKey[];
};

const l = (en: string, ko: string): LocalizedText => ({ en, ko });
const list = (en: string[], ko: string[]): LocalizedList => ({ en, ko });

export const seoPages: Record<SeoPageKey, SeoPageContent> = {
  unityScript: {
    slug: "/unity-script-generator",
    metadataTitle: l("Unity Script Generator - VertikerAI", "Unity 스크립트 생성기 - VertikerAI"),
    metadataDescription: l("Generate Unity C# scripts instantly with AI.", "AI로 Unity C# 스크립트를 빠르게 생성하세요."),
    heroTitle: l("Generate Unity gameplay scripts with context", "맥락까지 포함한 Unity 게임플레이 스크립트 생성"),
    heroDescription: l("Create Unity-ready scripts with comments, variable explanations, and integration notes.", "주석, 변수 설명, 통합 노트가 포함된 Unity용 스크립트를 생성합니다."),
    problemTitle: l("Writing boilerplate slows prototyping", "보일러플레이트 작성이 프로토타이핑 속도를 늦춥니다"),
    problemBody: l("Gameplay experiments stall when every controller, state machine, and helper script starts from zero.", "컨트롤러, 상태 머신, 보조 스크립트를 매번 처음부터 작성하면 실험 속도가 느려집니다."),
    solutionTitle: l("Generate focused scripts with production notes", "프로덕션 노트가 포함된 집중형 스크립트 생성"),
    solutionBody: l("VertikerAI creates targeted Unity scripts for movement, AI, cameras, and systems so teams can iterate faster.", "VertikerAI는 이동, AI, 카메라, 시스템용 Unity 스크립트를 생성해 팀의 반복 속도를 높입니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("## Player Dash\n- Dash force\n- Cooldown handling\n- Animation hook\n- Grounded checks", "## 플레이어 대시\n- 대시 힘\n- 쿨다운 처리\n- 애니메이션 훅\n- 착지 판정"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(
      ["Faster gameplay prototyping", "Cleaner handoff to engineers", "Better script structure from the first draft"],
      ["게임플레이 프로토타입 속도 향상", "엔지니어에게 더 깔끔한 전달", "첫 초안부터 더 나은 스크립트 구조"]
    ),
    premiumTitle: l("Pair code generation with planning", "코드 생성과 기획을 함께 연결"),
    premiumBody: l("Upgrade for GDD, system design, and roadmap tools when scripts need production context.", "스크립트에 프로덕션 맥락이 필요할 때 GDD, 시스템 설계, 로드맵 도구로 확장하세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the Unity Script Generator", "Unity 스크립트 생성기 열기"),
    toolHref: "/unity-script-generator",
    related: ["gameIdea", "gameUi", "gameDesignDocument"]
  },
  gameIdea: {
    slug: "/game-idea-generator",
    metadataTitle: l("Game Idea Generator - VertikerAI", "게임 아이디어 생성기 - VertikerAI"),
    metadataDescription: l("Generate game concepts, loops, and monetization ideas with AI.", "AI로 게임 콘셉트, 루프, 수익화 아이디어를 생성하세요."),
    heroTitle: l("Turn a rough premise into a shippable concept", "막연한 아이디어를 출시 가능한 콘셉트로 전환"),
    heroDescription: l("Generate genre, platform, gameplay loop, audience, and monetization direction in one response.", "장르, 플랫폼, 게임플레이 루프, 타깃 유저, 수익화 방향을 한 번에 정리합니다."),
    problemTitle: l("Ideas often stay too vague", "아이디어는 종종 너무 막연한 상태에 머뭅니다"),
    problemBody: l("Without structure, strong hooks and market positioning are hard to compare or test.", "구조가 없으면 강한 훅과 시장 포지셔닝을 비교하거나 테스트하기 어렵습니다."),
    solutionTitle: l("Structured ideation for real product decisions", "실제 제품 결정을 위한 구조화된 아이데이션"),
    solutionBody: l("VertikerAI shapes concepts into practical outputs that teams can evaluate, prototype, and pitch.", "VertikerAI는 콘셉트를 팀이 평가하고 프로토타입으로 만들고 피치할 수 있는 결과물로 정리합니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("## Cozy Merge Adventure\n- Core loop: restore relics\n- Audience: relaxed mobile players\n- Monetization: cosmetics + season pass", "## 포근한 머지 어드벤처\n- 핵심 루프: 유물 복원\n- 타깃: 가벼운 모바일 플레이어\n- 수익화: 코스메틱 + 시즌 패스"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(
      ["Sharper concept direction", "Better audience and monetization framing", "Faster iteration during discovery"],
      ["더 선명한 콘셉트 방향", "더 나은 타깃 유저 및 수익화 설계", "탐색 단계 반복 속도 향상"]
    ),
    premiumTitle: l("Extend ideas into planning docs", "아이디어를 기획 문서로 확장"),
    premiumBody: l("Move from concept generation into GDD, system design, and MVP roadmap workflows.", "콘셉트 생성에서 GDD, 시스템 설계, MVP 로드맵 워크플로까지 이어질 수 있습니다."),
    premiumToolHref: "/pricing",
    cta: l("Open the Game Idea Generator", "게임 아이디어 생성기 열기"),
    toolHref: "/game-idea-generator",
    related: ["puzzleGameIdea", "gameUi", "tools"]
  },
  gameUi: {
    slug: "/game-ui-generator",
    metadataTitle: l("Game UI Generator - VertikerAI", "게임 UI 생성기 - VertikerAI"),
    metadataDescription: l("Generate HUD ideas, screen flows, and UX direction with AI.", "AI로 HUD 아이디어, 화면 흐름, UX 방향을 생성하세요."),
    heroTitle: l("Plan game UI before production starts", "프로덕션 전에 게임 UI를 설계하세요"),
    heroDescription: l("Create HUD structure, screen hierarchy, and visual direction that fits your game loop.", "게임 루프에 맞는 HUD 구조, 화면 계층, 비주얼 방향을 생성합니다."),
    problemTitle: l("UI planning is usually delayed", "UI 기획은 보통 뒤로 밀립니다"),
    problemBody: l("Teams often start implementation before defining screens, states, and priority information.", "많은 팀이 화면, 상태, 우선 정보 구조를 정하기 전에 구현부터 시작합니다."),
    solutionTitle: l("Create readable, game-ready interface structures", "읽기 쉽고 게임에 맞는 인터페이스 구조 생성"),
    solutionBody: l("VertikerAI helps teams sketch HUDs, menus, and UX principles before production begins.", "VertikerAI는 팀이 프로덕션 전에 HUD, 메뉴, UX 원칙을 설계하도록 돕습니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("## HUD Plan\n- Top bar currencies\n- Center combat focus\n- Bottom skill rail\n- Expandable mission panel", "## HUD 계획\n- 상단 재화 바\n- 중앙 전투 집중 영역\n- 하단 스킬 바\n- 확장형 미션 패널"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(
      ["Earlier UX decisions", "Clearer screen flow planning", "Less rework during implementation"],
      ["더 이른 UX 의사결정", "명확한 화면 흐름 설계", "구현 단계 재작업 감소"]
    ),
    premiumTitle: l("Expand into UI/UX planning docs", "UI/UX 기획 문서로 확장"),
    premiumBody: l("Upgrade when you need deeper planning for screen flows, HUD structure, and usability reviews.", "화면 흐름, HUD 구조, 사용성 검토가 더 필요할 때 UI/UX 기획 도구로 확장하세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the Game UI Generator", "게임 UI 생성기 열기"),
    toolHref: "/game-ui-generator",
    related: ["mobileGameUi", "uiUxPlanning", "tools"]
  },
  gameDesignDocument: {
    slug: "/game-design-document-generator",
    metadataTitle: l("Game Design Document Generator - VertikerAI", "게임 기획서 생성기 - VertikerAI"),
    metadataDescription: l("Generate GDDs with loops, mechanics, scope, and risks.", "루프, 메커닉, 범위, 리스크가 포함된 GDD를 생성하세요."),
    heroTitle: l("Draft a structured GDD in minutes", "몇 분 안에 구조화된 GDD 초안 작성"),
    heroDescription: l("Build a game design document covering overview, mechanics, progression, scope, and production risks.", "개요, 메커닉, 진행, 범위, 프로덕션 리스크를 담은 게임 기획 문서를 작성합니다."),
    problemTitle: l("Planning docs take too long to start", "기획 문서는 시작 자체가 오래 걸립니다"),
    problemBody: l("Teams lose momentum when core systems and scope need to be documented from scratch.", "핵심 시스템과 범위를 처음부터 정리해야 하면 팀의 속도가 떨어집니다."),
    solutionTitle: l("Generate a usable first draft", "바로 활용 가능한 첫 초안 생성"),
    solutionBody: l("VertikerAI structures gameplay loop, progression, scope, and risk analysis into a practical GDD outline.", "VertikerAI는 게임플레이 루프, 진행, 범위, 리스크 분석을 실용적인 GDD 구조로 정리합니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("## Vertical Slice\n- 1 biome\n- 3 enemy types\n- 1 hub\n- Key risk: onboarding friction", "## 버티컬 슬라이스\n- 바이옴 1개\n- 적 유형 3종\n- 허브 1개\n- 핵심 리스크: 초반 진입 장벽"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(
      ["Faster planning alignment", "Clearer scope boundaries", "Better production risk visibility"],
      ["더 빠른 기획 정렬", "더 선명한 범위 정의", "더 나은 프로덕션 리스크 가시성"]
    ),
    premiumTitle: l("Designed for premium planning workflows", "프리미엄 기획 워크플로를 위한 설계"),
    premiumBody: l("Pair GDD output with UI/UX, system design, and roadmap generators for deeper planning.", "GDD를 UI/UX, 시스템 설계, 로드맵 생성기와 연결해 더 깊은 기획으로 확장하세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the GDD Generator", "GDD 생성기 열기"),
    toolHref: "/game-design-document-generator",
    related: ["uiUxPlanning", "gameSystemDesign", "mvpRoadmap"]
  },
  tools: {
    slug: "/ai-game-development-tools",
    metadataTitle: l("AI Game Development Tools - VertikerAI", "AI 게임 개발 도구 - VertikerAI"),
    metadataDescription: l("Explore AI tools for ideas, UI, code, docs, and planning.", "아이디어, UI, 코드, 문서, 기획을 위한 AI 도구를 확인하세요."),
    heroTitle: l("Every AI workflow from concept to roadmap", "콘셉트에서 로드맵까지 이어지는 AI 워크플로"),
    heroDescription: l("Use VertikerAI to generate ideas, UI direction, code starters, and planning documents in one stack.", "VertikerAI로 아이디어, UI 방향, 코드 스타터, 기획 문서를 하나의 스택에서 생성하세요."),
    problemTitle: l("Indie teams juggle too many disconnected tools", "인디 팀은 너무 많은 분리된 도구를 오갑니다"),
    problemBody: l("Ideation, UI, code, and planning often live in separate documents and inconsistent workflows.", "아이디어, UI, 코드, 기획이 서로 다른 문서와 흐름에 흩어져 있는 경우가 많습니다."),
    solutionTitle: l("One workspace for practical AI outputs", "실무형 AI 결과를 위한 하나의 워크스페이스"),
    solutionBody: l("VertikerAI connects lightweight generators with premium planning tools, history, export actions, and streaming output.", "VertikerAI는 가벼운 생성기와 프리미엄 기획 도구, 기록, 내보내기, 스트리밍 출력을 하나로 연결합니다."),
    exampleTitle: l("What you can generate", "생성 가능한 결과"),
    exampleBody: l("- Game ideas\n- HUD and screen plans\n- Unity scripts\n- GDD and system docs\n- MVP roadmaps", "- 게임 아이디어\n- HUD 및 화면 계획\n- Unity 스크립트\n- GDD 및 시스템 문서\n- MVP 로드맵"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(
      ["Fewer context switches", "Faster prototyping", "Better planning continuity"],
      ["컨텍스트 전환 감소", "더 빠른 프로토타이핑", "더 나은 기획 연속성"]
    ),
    premiumTitle: l("Scale up when planning gets deeper", "기획이 깊어질수록 자연스럽게 확장"),
    premiumBody: l("Free workflows cover discovery. Paid workflows add deeper docs and roadmap planning for growing teams.", "무료 워크플로는 탐색 단계에 적합하고, 유료 워크플로는 더 깊은 문서와 로드맵 기획을 제공합니다."),
    premiumToolHref: "/pricing",
    cta: l("Open the toolkit", "툴킷 열기"),
    toolHref: "/dashboard",
    related: ["gameIdea", "gameUi", "unityScript"]
  },
  gameMechanics: {
    slug: "/game-mechanics-generator",
    metadataTitle: l("Game Mechanics Generator - VertikerAI", "게임 메커닉 생성기 - VertikerAI"),
    metadataDescription: l("Create mechanics and loop ideas for your next game.", "다음 게임을 위한 메커닉과 루프 아이디어를 생성하세요."),
    heroTitle: l("Shape mechanics that support the core loop", "핵심 루프를 강화하는 메커닉 설계"),
    heroDescription: l("Generate mechanic ideas that fit genre, platform, and player progression goals.", "장르, 플랫폼, 성장 목표에 맞는 메커닉 아이디어를 생성합니다."),
    problemTitle: l("Mechanics often feel disconnected", "메커닉은 종종 루프와 따로 놀게 됩니다"),
    problemBody: l("Without structure, systems become features instead of meaningful player decisions.", "구조 없이 설계하면 시스템이 의미 있는 선택이 아니라 단순 기능이 됩니다."),
    solutionTitle: l("Generate systems that reinforce the loop", "루프를 강화하는 시스템 생성"),
    solutionBody: l("VertikerAI helps turn broad mechanic ideas into usable loop, progression, and retention structures.", "VertikerAI는 넓은 메커닉 아이디어를 루프, 성장, 유지 구조로 구체화합니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("- Core mechanic: chain reactions\n- Meta: city rebuild upgrades\n- Retention: weekly modifiers", "- 핵심 메커닉: 연쇄 반응\n- 메타: 도시 재건 업그레이드\n- 유지 요소: 주간 변형 모드"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["Stronger system cohesion", "Clearer progression hooks", "More testable prototypes"], ["더 강한 시스템 결속", "더 명확한 성장 훅", "더 테스트하기 쉬운 프로토타입"]),
    premiumTitle: l("Bring mechanics into larger planning", "메커닉을 더 큰 기획으로 연결"),
    premiumBody: l("Use GDD and system design tools when mechanics need economy, progression, and live-ops framing.", "메커닉에 경제, 성장, 라이브옵스 프레이밍이 필요할 때 GDD와 시스템 설계 도구를 활용하세요."),
    premiumToolHref: "/pricing",
    cta: l("Explore planning tools", "기획 도구 살펴보기"),
    toolHref: "/dashboard",
    related: ["gameIdea", "gameSystemDesign", "tools"]
  },
  indieGamePlanning: {
    slug: "/indie-game-planning-tool",
    metadataTitle: l("Indie Game Planning Tool - VertikerAI", "인디 게임 기획 도구 - VertikerAI"),
    metadataDescription: l("Plan indie game production with AI-generated docs and workflows.", "AI 문서와 워크플로로 인디 게임 프로덕션을 기획하세요."),
    heroTitle: l("A planning stack for indie teams", "인디 팀을 위한 기획 스택"),
    heroDescription: l("Move from concept to roadmap with structured AI outputs for design, UI, systems, and launch planning.", "디자인, UI, 시스템, 출시 기획을 위한 구조화된 AI 결과로 콘셉트에서 로드맵까지 이동하세요."),
    problemTitle: l("Indie planning is often fragmented", "인디 기획은 자주 파편화됩니다"),
    problemBody: l("Design notes, UI plans, and scope decisions get scattered across docs and chats.", "디자인 노트, UI 계획, 범위 결정이 여러 문서와 채팅에 흩어지기 쉽습니다."),
    solutionTitle: l("Use structured AI planning outputs", "구조화된 AI 기획 결과 활용"),
    solutionBody: l("VertikerAI gives indie teams a faster way to create structured planning outputs for design, UX, systems, and roadmap decisions.", "VertikerAI는 인디 팀이 디자인, UX, 시스템, 로드맵 결정을 위한 구조화된 기획 결과를 더 빠르게 만들 수 있도록 돕습니다."),
    exampleTitle: l("What planning can cover", "기획 범위 예시"),
    exampleBody: l("- MVP scope\n- Risk analysis\n- Feature priorities\n- UX structure", "- MVP 범위\n- 리스크 분석\n- 기능 우선순위\n- UX 구조"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["Clearer scope decisions", "Better team alignment", "Faster early planning"], ["더 명확한 범위 결정", "더 나은 팀 정렬", "더 빠른 초기 기획"]),
    premiumTitle: l("Premium workflows deepen planning", "프리미엄 워크플로로 더 깊은 기획"),
    premiumBody: l("Upgrade for GDD, UI/UX planning, system design, and MVP roadmap generation.", "GDD, UI/UX 기획, 시스템 설계, MVP 로드맵 생성을 위해 업그레이드하세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the planning toolkit", "기획 툴킷 열기"),
    toolHref: "/dashboard",
    related: ["tools", "uiUxPlanning", "mvpRoadmap"]
  },
  uiUxPlanning: {
    slug: "/ui-ux-planning-generator",
    metadataTitle: l("UI/UX Planning Generator - VertikerAI", "UI/UX 기획 생성기 - VertikerAI"),
    metadataDescription: l("Generate UI/UX planning docs for screens, flows, and HUD structure.", "화면, 흐름, HUD 구조를 위한 UI/UX 기획 문서를 생성하세요."),
    heroTitle: l("Create a UI/UX planning doc for your game", "게임용 UI/UX 기획 문서 생성"),
    heroDescription: l("Generate screen maps, HUD priorities, flows, and usability considerations in one response.", "화면 맵, HUD 우선순위, 흐름, 사용성 고려 사항을 한 번에 정리합니다."),
    problemTitle: l("Screen flow issues show up too late", "화면 흐름 문제는 너무 늦게 드러납니다"),
    problemBody: l("Without early UX planning, teams discover navigation and usability issues during implementation.", "초기 UX 기획이 없으면 구현 단계에서 내비게이션과 사용성 문제가 드러납니다."),
    solutionTitle: l("Plan before building", "구현 전에 먼저 설계"),
    solutionBody: l("VertikerAI structures screens, flows, HUD rules, and UX notes into a planning document teams can act on.", "VertikerAI는 화면, 흐름, HUD 규칙, UX 노트를 팀이 바로 활용할 수 있는 문서로 정리합니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("## Screen Flow\n- Lobby\n- Match load\n- HUD\n- Results\n- Progression", "## 화면 흐름\n- 로비\n- 매치 진입\n- HUD\n- 결과\n- 성장 화면"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["Fewer UX surprises", "Clearer handoff to UI teams", "Better HUD prioritization"], ["UX 이슈 감소", "UI 팀에 더 명확한 전달", "더 나은 HUD 우선순위 설정"]),
    premiumTitle: l("Built for deeper planning", "더 깊은 기획을 위한 도구"),
    premiumBody: l("Combine UI/UX planning with system design and MVP roadmap outputs for production planning.", "UI/UX 기획을 시스템 설계와 MVP 로드맵 결과와 결합해 프로덕션 기획으로 확장하세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the UI/UX Planning Generator", "UI/UX 기획 생성기 열기"),
    toolHref: "/ui-ux-planning-generator",
    related: ["gameUi", "mobileGameUi", "mvpRoadmap"]
  },
  mobileGameUi: {
    slug: "/mobile-game-ui-generator",
    metadataTitle: l("Mobile Game UI Generator - VertikerAI", "모바일 게임 UI 생성기 - VertikerAI"),
    metadataDescription: l("Generate mobile HUD, menu, and flow ideas with AI.", "AI로 모바일 HUD, 메뉴, 흐름 아이디어를 생성하세요."),
    heroTitle: l("Design clearer mobile game interfaces", "더 읽기 쉬운 모바일 게임 인터페이스 설계"),
    heroDescription: l("Generate mobile-first HUD structure, monetization placements, and screen hierarchy for your game.", "모바일 중심 HUD 구조, 수익화 위치, 화면 계층을 생성합니다."),
    problemTitle: l("Mobile screens punish clutter", "모바일 화면은 과한 정보에 취약합니다"),
    problemBody: l("Small screens make hierarchy and readability mistakes especially expensive.", "작은 화면에서는 계층과 가독성 실수가 더 큰 비용으로 돌아옵니다."),
    solutionTitle: l("Generate mobile-first structure", "모바일 우선 구조 생성"),
    solutionBody: l("VertikerAI helps mobile teams plan HUD, menus, progression surfaces, and monetization touchpoints.", "VertikerAI는 모바일 팀이 HUD, 메뉴, 성장 화면, 수익화 접점을 계획하도록 돕습니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("- Top bar currencies\n- One-thumb primary actions\n- Compact event banner\n- Expandable shop panel", "- 상단 재화 바\n- 한 손 조작 중심 액션\n- 축약형 이벤트 배너\n- 확장형 상점 패널"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["Better small-screen hierarchy", "Stronger monetization placement planning", "Faster mobile UI iteration"], ["더 나은 소형 화면 계층", "더 나은 수익화 배치 설계", "더 빠른 모바일 UI 반복"]),
    premiumTitle: l("Use premium docs for deeper UX", "프리미엄 문서로 더 깊은 UX 기획"),
    premiumBody: l("Upgrade for full UI/UX planning documents when mobile UX needs more detail.", "모바일 UX에 더 깊은 설계가 필요할 때 전체 UI/UX 기획 문서로 확장하세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the Game UI Generator", "게임 UI 생성기 열기"),
    toolHref: "/game-ui-generator",
    related: ["gameUi", "uiUxPlanning", "tools"]
  },
  mvpRoadmap: {
    slug: "/mvp-roadmap-generator",
    metadataTitle: l("MVP Roadmap Generator - VertikerAI", "MVP 로드맵 생성기 - VertikerAI"),
    metadataDescription: l("Generate milestone-based MVP roadmaps for indie teams.", "인디 팀을 위한 마일스톤 기반 MVP 로드맵을 생성하세요."),
    heroTitle: l("Map a realistic MVP plan", "현실적인 MVP 계획 수립"),
    heroDescription: l("Break feature scope into weekly milestones, technical priorities, and delivery risks.", "기능 범위를 주간 마일스톤, 기술 우선순위, 전달 리스크로 나눕니다."),
    problemTitle: l("Roadmaps are often too optimistic", "로드맵은 종종 지나치게 낙관적입니다"),
    problemBody: l("Teams overcommit when milestone planning lacks scope boundaries and explicit risks.", "범위 경계와 리스크가 없으면 팀은 과도하게 약속하게 됩니다."),
    solutionTitle: l("Turn scope into a usable delivery plan", "범위를 실행 가능한 전달 계획으로 전환"),
    solutionBody: l("VertikerAI structures feature priorities, milestones, and risks into a roadmap teams can actually ship against.", "VertikerAI는 기능 우선순위, 마일스톤, 리스크를 팀이 실제로 출시 기준으로 활용할 수 있는 로드맵으로 정리합니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("## Week 1\n- Core loop\n## Week 2\n- Tutorial\n## Week 3\n- Progression\n## Week 4\n- Vertical slice polish", "## 1주차\n- 핵심 루프\n## 2주차\n- 튜토리얼\n## 3주차\n- 성장 시스템\n## 4주차\n- 버티컬 슬라이스 폴리시"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["Clearer milestone ownership", "More realistic delivery scope", "Early risk visibility"], ["더 명확한 마일스톤 책임", "더 현실적인 전달 범위", "초기 리스크 가시성"]),
    premiumTitle: l("Studio planning workflow", "스튜디오 기획 워크플로"),
    premiumBody: l("The MVP roadmap generator is built for teams that need deeper planning and production sequencing.", "MVP 로드맵 생성기는 더 깊은 기획과 프로덕션 시퀀싱이 필요한 팀을 위해 설계되었습니다."),
    premiumToolHref: "/pricing",
    cta: l("Open the MVP Roadmap Generator", "MVP 로드맵 생성기 열기"),
    toolHref: "/mvp-roadmap-generator",
    related: ["gameDesignDocument", "uiUxPlanning", "indieGamePlanning"]
  },
  puzzleGameIdea: {
    slug: "/puzzle-game-idea-generator",
    metadataTitle: l("Puzzle Game Idea Generator - VertikerAI", "퍼즐 게임 아이디어 생성기 - VertikerAI"),
    metadataDescription: l("Generate puzzle game ideas, progression hooks, and monetization directions.", "퍼즐 게임 아이디어, 성장 훅, 수익화 방향을 생성하세요."),
    heroTitle: l("Generate puzzle concepts with stronger hooks", "더 강한 훅을 가진 퍼즐 콘셉트 생성"),
    heroDescription: l("Explore puzzle mechanics, progression loops, and marketable twists for new concepts.", "퍼즐 메커닉, 성장 루프, 시장성 있는 차별점을 탐색하세요."),
    problemTitle: l("Puzzle ideas can blur together", "퍼즐 아이디어는 서로 비슷해지기 쉽습니다"),
    problemBody: l("Without clear hooks, puzzle concepts struggle to stand out in crowded categories.", "명확한 훅이 없으면 퍼즐 콘셉트는 경쟁이 치열한 시장에서 눈에 띄기 어렵습니다."),
    solutionTitle: l("Generate puzzle-specific concept framing", "퍼즐 장르에 맞는 콘셉트 구조 생성"),
    solutionBody: l("VertikerAI helps teams combine mechanic novelty, meta progression, and audience fit in one draft.", "VertikerAI는 메커닉 차별화, 메타 성장, 타깃 적합성을 한 번에 정리하도록 돕습니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("- Mechanic: relic merge chains\n- Meta: museum restoration\n- Monetization: cosmetics + pass", "- 메커닉: 유물 머지 연쇄\n- 메타: 박물관 복원\n- 수익화: 코스메틱 + 패스"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["Better concept hooks", "Stronger casual progression framing", "Faster puzzle ideation"], ["더 강한 콘셉트 훅", "더 나은 캐주얼 성장 설계", "더 빠른 퍼즐 아이데이션"]),
    premiumTitle: l("Expand into production planning", "프로덕션 기획으로 확장"),
    premiumBody: l("Once a concept lands, connect it to UI, GDD, and roadmap workflows.", "콘셉트가 정리되면 UI, GDD, 로드맵 워크플로로 연결하세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the Game Idea Generator", "게임 아이디어 생성기 열기"),
    toolHref: "/game-idea-generator",
    related: ["gameIdea", "mobileGameUi", "tools"]
  },
  gameSystemDesign: {
    slug: "/game-system-design-generator",
    metadataTitle: l("Game System Design Generator - VertikerAI", "게임 시스템 설계 생성기 - VertikerAI"),
    metadataDescription: l("Generate progression, economy, ranking, and reward system plans.", "성장, 경제, 랭킹, 보상 시스템 계획을 생성하세요."),
    heroTitle: l("Document the systems behind retention", "유지율을 만드는 시스템을 문서화하세요"),
    heroDescription: l("Generate progression, economy, currencies, rewards, and event systems for your game.", "게임의 성장, 경제, 재화, 보상, 이벤트 시스템을 설계합니다."),
    problemTitle: l("Live systems need more than feature lists", "라이브 시스템은 기능 목록만으로 부족합니다"),
    problemBody: l("Economy and progression decisions need structure or balancing becomes chaotic later.", "경제와 성장 설계는 구조가 없으면 이후 밸런싱이 혼란스러워집니다."),
    solutionTitle: l("Create a system design first draft", "시스템 설계 초안 생성"),
    solutionBody: l("VertikerAI structures economy, progression, rewards, and live systems into a usable planning doc.", "VertikerAI는 경제, 성장, 보상, 라이브 시스템을 실용적인 기획 문서로 정리합니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("- Soft and premium currencies\n- Weekly event ladder\n- Prestige progression\n- Reward pacing notes", "- 소프트/프리미엄 재화\n- 주간 이벤트 래더\n- 프레스티지 성장\n- 보상 페이싱 노트"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["Earlier economy framing", "Clearer retention loops", "Better live-ops planning"], ["더 이른 경제 설계", "더 명확한 유지 루프", "더 나은 라이브옵스 기획"]),
    premiumTitle: l("Pair with GDD and roadmap planning", "GDD 및 로드맵 기획과 결합"),
    premiumBody: l("Use system design with GDD and roadmap workflows for deeper production alignment.", "시스템 설계를 GDD와 로드맵 워크플로와 결합해 프로덕션 정렬을 높이세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the System Design Generator", "시스템 설계 생성기 열기"),
    toolHref: "/game-system-design-generator",
    related: ["gameDesignDocument", "gameMonetization", "mvpRoadmap"]
  },
  gameMonetization: {
    slug: "/game-monetization-generator",
    metadataTitle: l("Game Monetization Generator - VertikerAI", "게임 수익화 생성기 - VertikerAI"),
    metadataDescription: l("Generate monetization models and revenue design ideas for your game.", "게임을 위한 수익화 모델과 매출 설계 아이디어를 생성하세요."),
    heroTitle: l("Explore monetization without losing player fit", "플레이어 적합성을 해치지 않는 수익화 탐색"),
    heroDescription: l("Generate monetization options that match audience, platform, and session design.", "타깃 유저, 플랫폼, 세션 구조에 맞는 수익화 옵션을 생성합니다."),
    problemTitle: l("Revenue plans often arrive too late", "매출 설계는 종종 너무 늦게 정리됩니다"),
    problemBody: l("Teams bolt monetization onto the design instead of shaping it alongside progression and UX.", "많은 팀이 성장과 UX와 함께 설계하지 않고 나중에 수익화를 붙입니다."),
    solutionTitle: l("Frame monetization with the rest of the design", "전체 설계와 함께 수익화를 정리"),
    solutionBody: l("VertikerAI helps teams evaluate monetization models against audience fit, retention, and production scope.", "VertikerAI는 수익화 모델을 타깃 적합성, 유지율, 프로덕션 범위 기준으로 평가하도록 돕습니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("- Model: premium + cosmetics\n- Session fit: midcore 15 min\n- Risk: early churn from over-monetization", "- 모델: 프리미엄 + 코스메틱\n- 세션 적합성: 15분 미드코어\n- 리스크: 과도한 수익화로 인한 이탈"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["Stronger revenue framing", "Better audience fit", "Less late-stage monetization rework"], ["더 강한 수익 구조 설계", "더 나은 타깃 적합성", "후반 수익화 재작업 감소"]),
    premiumTitle: l("Connect monetization to system planning", "수익화를 시스템 기획과 연결"),
    premiumBody: l("Use system design and roadmap workflows when monetization needs economy and production planning context.", "수익화에 경제와 프로덕션 기획 맥락이 필요할 때 시스템 설계와 로드맵 워크플로를 활용하세요."),
    premiumToolHref: "/pricing",
    cta: l("Explore planning tools", "기획 도구 살펴보기"),
    toolHref: "/dashboard",
    related: ["gameSystemDesign", "indieGamePlanning", "tools"]
  },
  pixelArtGenerator: {
    slug: "/pixel-art-generator",
    metadataTitle: l("Pixel Art Generator - VertikerAI", "픽셀 아트 생성기 - VertikerAI"),
    metadataDescription: l("Generate pixel art prompts, scene direction, and visual references with AI.", "AI로 픽셀 아트 프롬프트, 장면 방향, 비주얼 레퍼런스를 생성하세요."),
    heroTitle: l("Create pixel art prompt packs for indie games", "인디 게임용 픽셀 아트 프롬프트 팩 생성"),
    heroDescription: l("Generate scene prompts, palette direction, and production notes for pixel art workflows.", "픽셀 아트 워크플로를 위한 장면 프롬프트, 팔레트 방향, 제작 노트를 생성합니다."),
    problemTitle: l("Visual prompting needs more structure", "비주얼 프롬프트에는 더 많은 구조가 필요합니다"),
    problemBody: l("Loose prompts lead to inconsistent scenes, unclear palettes, and mismatched references.", "느슨한 프롬프트는 일관성 없는 장면, 불분명한 팔레트, 맞지 않는 레퍼런스를 낳습니다."),
    solutionTitle: l("Generate clearer art direction", "더 선명한 아트 방향 생성"),
    solutionBody: l("VertikerAI organizes theme, palette, resolution, and style direction into usable pixel art prompts.", "VertikerAI는 테마, 팔레트, 해상도, 스타일 방향을 실용적인 픽셀 아트 프롬프트로 정리합니다."),
    exampleTitle: l("Sample output", "예시 출력"),
    exampleBody: l("- Theme: rainy cyber alley\n- Palette: teal, magenta, violet\n- Resolution: 32x32 sprite set", "- 테마: 비 내리는 사이버 골목\n- 팔레트: 청록, 마젠타, 보라\n- 해상도: 32x32 스프라이트 세트"),
    benefitsTitle: l("Why teams use it", "이 도구를 쓰는 이유"),
    benefits: list(["More consistent prompts", "Clearer visual direction", "Faster asset exploration"], ["더 일관된 프롬프트", "더 선명한 비주얼 방향", "더 빠른 아트 탐색"]),
    premiumTitle: l("Connect art direction to broader planning", "아트 방향을 더 큰 기획과 연결"),
    premiumBody: l("Pair visual exploration with UI, GDD, and roadmap planning when production starts expanding.", "프로덕션이 확장되면 비주얼 탐색을 UI, GDD, 로드맵 기획과 연결하세요."),
    premiumToolHref: "/pricing",
    cta: l("Open the Pixel Art Generator", "픽셀 아트 생성기 열기"),
    toolHref: "/tools/pixel-art",
    related: ["gameUi", "mobileGameUi", "tools"]
  }
};
