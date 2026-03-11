export type Language = "en" | "ko";

const en = {
  nav: {
    pricing: "Pricing",
    dashboard: "Dashboard",
    tools: "AI Tools",
    openApp: "Open app",
    logIn: "Log in",
    startFree: "Start free",
    language: "Language"
  },
  common: {
    light: "Light",
    dark: "Dark",
    copyResult: "Copy Result",
    exportTxt: "Export as .txt",
    copied: "Copied!",
    exported: "Exported!",
    generating: "Generating...",
    output: "Output",
    promptTemplates: "Prompt templates",
    select: "Select...",
    resultPlaceholder: "Your AI-generated result will appear here.",
    resultHint: "Markdown rendering, copy, export, and a scrollable result area for long responses.",
    buildingResponse: "Building a structured AI response for your game workflow.",
    generate: "Generate",
    tryTool: "Try the tool",
    exampleOutput: "Example output",
    explanation: "How it works",
    cached: "Cached result loaded",
    proBadge: "Pro",
    studioBadge: "Studio",
    tryGenerator: "Try the Generator",
    exportResult: "Export Result",
    unlimited: "Unlimited"
  },
  seo: {
    problem: "Problem",
    solution: "Solution",
    benefits: "Benefits",
    premium: "Premium features",
    relatedPages: "Related pages",
    explore: "Explore page",
    coreTools: "Core generators"
  },
  landing: {
    toolsLabel: "Tools",
    toolsTitle: "Pick a generator tuned to the way you build",
    pricingLabel: "Pricing",
    pricingTitle: "Start free, upgrade when your workflow expands"
  },
  hero: {
    badge: "AI Toolkit for Indie Studios",
    title: "Generate game ideas, UI systems, and starter code in one workspace.",
    description:
      "GameDev AI Toolkit helps solo developers move from concept to playable MVP with structured AI workflows, prompt templates, streaming responses, and generation history.",
    viewPricing: "View pricing",
    highlights: [
      {
        title: "Idea generation",
        description: "Turn a genre, platform, and theme into a game concept with loops and monetization."
      },
      {
        title: "UI direction",
        description: "Get game-ready interface structures and design systems tuned to your art style."
      },
      {
        title: "Starter code",
        description: "Generate practical starter architecture and gameplay snippets for Unity or Flutter."
      }
    ]
  },
  features: {
    label: "Features",
    title: "Built for shipping, not just brainstorming",
    items: [
      {
        title: "AI game ideation",
        body: "Shape hooks, loops, audience, and monetization in a single structured response."
      },
      {
        title: "Game UI planning",
        body: "Define screens, hierarchy, art direction, and UX principles before implementation."
      },
      {
        title: "Engine-aware code",
        body: "Generate startup scaffolds for Unity and Flutter with focused gameplay examples."
      },
      {
        title: "Premium planning docs",
        body: "Generate GDD, UI/UX plans, system design, and MVP roadmap documents for paid teams."
      }
    ]
  },
  pricing: {
    free: "Free",
    pro: "Pro",
    studio: "Studio",
    pageTitle: "Simple plans for indie teams",
    pageDescription:
      "Free includes 5 generations per day. Pro unlocks premium generators and Studio adds deeper planning workflows.",
    freeDetails: "5 generations per day",
    proDetails: "Unlimited generations + premium planning tools",
    studioDetails: "Full planning suite + advanced production guidance",
    freeFeatures: ["5 generations per day", "Basic generators", "Limited result length"],
    proFeatures: [
      "Unlimited generations",
      "Game Design Document Generator",
      "UI/UX Planning Generator",
      "System Design Generator",
      "Unity Script Generator Pro",
      "Save and export results"
    ],
    studioFeatures: [
      "Everything in Pro",
      "Full Game Planning Documents",
      "Monetization Strategy Generator",
      "MVP Roadmap Generator",
      "Production Risk Analysis"
    ],
    upgradeToPro: "Upgrade to Pro",
    upgradeToStudio: "Upgrade to Studio",
    currentPlan: "Current plan",
    switchPlan: "Choose plan",
    managingPlan: "Updating plan...",
    saveExportNotice: "Saving history and export are available on Pro and Studio."
  },
  premium: {
    title: "Premium planning tool",
    description: "This generator is available on a paid plan and is designed for deeper production planning documents.",
    cta: "View pricing",
    badge: "Pro access required",
    studioBadge: "Studio access required",
    modalTitle: "Upgrade required",
    modalBody: "Upgrade your plan to unlock this generator.",
    close: "Close",
    gddMessage: "Upgrade to Pro to generate full Game Design Documents.",
    uiUxMessage: "Upgrade to Pro to generate full UI/UX planning documents.",
    systemDesignMessage: "Upgrade to Pro to generate full System Design documents.",
    mvpRoadmapMessage: "Upgrade to Studio to generate full MVP Roadmaps."
  },
  footer: {
    builtWith: ""
  },
  toolCards: {
    openTool: "Open tool",
    items: [
      {
        title: "Game Idea Generator",
        description: "Shape genre, platform, and theme into a market-aware concept."
      },
      {
        title: "Game UI Generator",
        description: "Generate interface layouts, screen hierarchy, and visual direction."
      },
      {
        title: "Unity Script Generator",
        description: "Create focused Unity C# scripts with comments and integration notes."
      },
      {
        title: "Game Code Generator",
        description: "Produce starter architecture and gameplay code for Unity or Flutter."
      },
      {
        title: "Game Design Document Generator",
        description: "Build a premium GDD with gameplay loop, scope, progression, and risks."
      },
      {
        title: "UI/UX Planning Generator",
        description: "Create lobby, HUD, screen flow, and UX planning docs for your game."
      },
      {
        title: "System Design Generator",
        description: "Document economy, progression, rankings, rewards, and live-ops systems."
      },
      {
        title: "MVP Roadmap Generator",
        description: "Map a four-week MVP plan with priorities, risks, and must-have features."
      }
    ]
  },
  dashboard: {
    overview: "Overview",
    history: "My Generations",
    pricing: "Pricing",
    account: "Account",
    generators: "Generators",
    idea: "Idea Generator",
    ui: "UI Generator",
    pixelPrompt: "Pixel Prompt Generator",
    code: "Code Generator",
    unity: "Unity Scripts",
    gdd: "GDD Generator",
    uiUxPlanning: "UI/UX Planning",
    systemDesign: "System Design",
    mvpRoadmap: "MVP Roadmap",
    signOut: "Sign out",
    label: "Dashboard",
    title: "Welcome back",
    description: "Generate concepts, interfaces, code, and planning docs. Your current plan is",
    today: "Today",
    todayHint: "Generations used today",
    remaining: "Remaining",
    remainingHint: "Daily generations left",
    plan: "Plan",
    unlimitedUsage: "Unlimited usage",
    dailyHint: "5 daily generations",
    workspace: "Workspace",
    fastAccess: "Fast access",
    browseHistory: "Browse generation history",
    generateUnity: "Generate a Unity gameplay script",
    toolSelection: "Tool selection",
    recent: "Recent generations",
    recentHint: "Latest prompts across all tools",
    noGenerations: "No generations yet.",
    workflowNotes: "Workflow notes",
    note1: "Prompt templates speed up ideation for common game types.",
    note2: "Markdown rendering keeps code blocks and planning structures readable.",
    note3: "Use copy and export actions to move results into Unity, docs, or tickets.",
    sidebarTitle: "Studio workspace",
    accountHint: "Signed in as",
    pricingHint: "Upgrade when you need unlimited generations",
    accountTitle: "Account overview",
    accountDescription: "Review your email, current plan, and the fastest route to more planning capacity.",
    usage: "Usage",
    settings: "Settings"
  },
  history: {
    label: "History",
    title: "My Generations",
    description: "Review previous prompts, filter by tool, and copy or export past results back into your workflow.",
    all: "All",
    idea: "Idea",
    ui: "UI",
    code: "Code",
    unity: "Unity Script",
    gdd: "GDD",
    uiUxPlan: "UI/UX Plan",
    systemDesign: "System Design",
    mvpRoadmap: "MVP Roadmap",
    prompt: "Prompt",
    result: "Result",
    empty: "No generations found for this filter."
  },
  auth: {
    label: "Authentication",
    title: "Sign in to your workspace",
    signupTitle: "Create your workspace account",
    login_title: "GameDev AI Toolkit",
    description: "Continue with Google, GitHub, or email and password.",
    signupDescription: "Create your account with Google, GitHub, or email and password.",
    continue_google: "Continue with Google",
    continue_github: "Continue with GitHub",
    or: "OR",
    login: "Login",
    signup: "Create account",
    no_account: "Don't have an account?",
    have_account: "Already have an account?",
    email: "Email",
    emailPlaceholder: "founder@studio.com",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    confirmPassword: "Confirm password",
    confirmPasswordPlaceholder: "Confirm your password",
    continueWithEmail: "Continue with Email",
    continueWithGoogle: "Continue with Google",
    continueWithGithub: "Continue with GitHub",
    loginButton: "Login",
    signupButton: "Create account",
    divider: "Or",
    createAccountLabel: "Create account with email",
    createPasswordPlaceholder: "Create a password",
    createAccount: "Create account",
    noAccount: "Don't have an account?",
    createAccountLink: "Create account",
    haveAccount: "Already have an account?",
    loginLink: "Login",
    passwordMismatch: "Passwords do not match.",
    googleLoginFailed: "Google login failed",
    githubLoginFailed: "GitHub login failed",
    checkEmailSuccess: "Check your email to confirm your account, then sign in.",
    signOutFallbackError: "Signed out locally, but the remote session could not be fully cleared.",
    callbackFailed: "Authentication callback failed. Please try signing in again.",
    missingCallbackCode: "Authentication callback is missing a code."
  },
  languageSelector: {
    english: "English",
    korean: "Korean"
  },
  tools: {
    ideaTitle: "Game Idea Generator",
    ideaDescription: "Generate a high-level concept, gameplay loop, monetization model, and UI layout for your next game.",
    uiTitle: "Game UI Generator",
    uiDescription: "Generate interface structure, visual system recommendations, and UX guidance for your game.",
    codeTitle: "Game Code Generator",
    codeDescription: "Generate starter structure and core gameplay code for Unity or Flutter-based game projects.",
    unityTitle: "Unity Script Generator",
    unityDescription: "Generate a clean Unity C# gameplay script with comments, variable explanations, and integration notes.",
    gddTitle: "Game Design Document Generator",
    gddDescription: "Generate a premium GDD covering overview, loop, mechanics, progression, MVP scope, and production risks.",
    uiUxPlanningTitle: "UI/UX Planning Generator",
    uiUxPlanningDescription: "Generate a premium UI/UX planning document with screens, flows, HUD structure, and usability recommendations.",
    systemDesignTitle: "System Design Generator",
    systemDesignDescription: "Generate a premium system design document covering progression, economy, rewards, rankings, and recurring systems.",
    mvpRoadmapTitle: "MVP Roadmap Generator",
    mvpRoadmapDescription: "Generate a premium MVP roadmap with must-have scope, four-week milestones, technical priorities, and risks.",
    genre: "Genre",
    platform: "Platform",
    theme: "Theme",
    gameType: "Game type",
    style: "Style",
    engine: "Engine",
    language: "Language",
    scriptType: "Script type",
    gameGenre: "Game genre",
    extraFeatures: "Extra features",
    targetAudience: "Target audience",
    monetizationModel: "Monetization model",
    coreDifferentiation: "Core differentiation",
    playerMode: "Multiplayer or single player",
    sessionLength: "Session length",
    artStyle: "Art style",
    coreMode: "Core mode",
    coreMechanic: "Core mechanic",
    metaProgression: "Meta progression",
    currencyTypes: "Currency types",
    eventSystem: "Event system",
    leaderboardNeeds: "Ranking or leaderboard needs",
    teamSize: "Team size",
    targetLaunchPeriod: "Target launch period",
    priorityFeatures: "Priority features",
    revenueModel: "Revenue model",
    templatePuzzle: "Puzzle Game",
    templateIdle: "Idle Game",
    templateRpg: "RPG",
    templateTowerDefense: "Tower Defense",
    placeholders: {
      ideaGenre: "Roguelike deckbuilder",
      ideaPlatform: "PC + Steam Deck",
      ideaTheme: "Neo-noir cyberpunk",
      uiGameType: "Top-down action RPG",
      uiStyle: "Clean sci-fi HUD",
      uiTheme: "Ancient tech ruins",
      codeGameType: "Endless runner",
      unityScriptType: "Select a script type...",
      unityGameGenre: "Action platformer",
      unityExtraFeatures: "Double jump, dash cooldown, animation hooks, slope handling",
      gddGameGenre: "Action RPG",
      gddPlatform: "PC + Console",
      gddTheme: "Post-apocalyptic sky islands",
      gddTargetAudience: "Midcore strategy players aged 18-34",
      gddMonetizationModel: "Premium + cosmetic DLC",
      gddCoreDifferentiation: "Tactical runs with persistent city rebuilding",
      gddPlayerMode: "Single player",
      gddSessionLength: "15-20 minutes",
      uiUxGameGenre: "Tower Defense",
      uiUxPlatform: "Mobile",
      uiUxArtStyle: "Minimal sci-fi HUD",
      uiUxCoreMode: "Session-based co-op raids",
      uiUxMonetizationModel: "Battle pass + cosmetics",
      systemDesignGameGenre: "Idle strategy",
      systemDesignCoreMechanic: "Automated resource chains",
      systemDesignMetaProgression: "Prestige loop with permanent tech upgrades",
      systemDesignCurrencyTypes: "Gold, gems, guild tokens",
      systemDesignEventSystem: "Weekly boss event with rotating modifiers",
      systemDesignLeaderboardNeeds: "Yes, weekly leaderboard by score and clear speed",
      mvpTeamSize: "4",
      mvpEngine: "Unity",
      mvpTargetLaunchPeriod: "12 weeks",
      mvpPriorityFeatures: "Core loop, tutorial, progression, one polished vertical slice",
      mvpRevenueModel: "Premium + cosmetic DLC"
    },
    options: {
      unity: "Unity",
      flutter: "Flutter",
      csharp: "C#",
      dart: "Dart",
      playerMovement: "Player Movement",
      enemyAi: "Enemy AI",
      cameraController: "Camera Controller",
      inventorySystem: "Inventory System"
    }
  }
};

const ko = {
  ...en,
  nav: {
    pricing: "요금제",
    dashboard: "대시보드",
    tools: "AI 도구",
    openApp: "앱 열기",
    logIn: "로그인",
    startFree: "무료 시작",
    language: "언어"
  },
  common: {
    light: "라이트",
    dark: "다크",
    copyResult: "결과 복사",
    exportTxt: ".txt로 내보내기",
    copied: "복사됨!",
    exported: "내보냄!",
    generating: "생성 중...",
    output: "출력",
    promptTemplates: "프롬프트 템플릿",
    select: "선택...",
    resultPlaceholder: "AI 생성 결과가 여기에 표시됩니다.",
    resultHint: "마크다운 렌더링, 복사, 내보내기, 긴 응답용 스크롤 결과 영역을 지원합니다.",
    buildingResponse: "게임 제작 워크플로우에 맞는 구조화된 AI 응답을 생성하고 있습니다.",
    generate: "생성하기",
    tryTool: "도구 사용",
    exampleOutput: "예시 출력",
    explanation: "작동 방식",
    cached: "캐시된 결과를 불러왔습니다",
    proBadge: "프로",
    studioBadge: "스튜디오",
    tryGenerator: "생성기 사용",
    exportResult: "결과 내보내기",
    unlimited: "무제한"
  },
  seo: {
    problem: "문제",
    solution: "해결책",
    benefits: "장점",
    premium: "프리미엄 기능",
    relatedPages: "관련 페이지",
    explore: "페이지 보기",
    coreTools: "핵심 생성기"
  },
  landing: {
    toolsLabel: "도구",
    toolsTitle: "작업 방식에 맞는 생성기를 선택하세요",
    pricingLabel: "요금제",
    pricingTitle: "무료로 시작하고 워크플로우가 확장되면 업그레이드하세요"
  },
  hero: {
    badge: "인디 스튜디오를 위한 AI 툴킷",
    title: "하나의 워크스페이스에서 게임 아이디어, UI 시스템, 시작 코드를 생성하세요.",
    description:
      "GameDev AI Toolkit은 솔로 개발자가 구조화된 AI 워크플로우, 프롬프트 템플릿, 스트리밍 응답, 생성 기록을 통해 컨셉에서 플레이 가능한 MVP까지 빠르게 이동하도록 돕습니다.",
    viewPricing: "요금제 보기",
    highlights: [
      {
        title: "아이디어 생성",
        description: "장르, 플랫폼, 테마를 루프와 수익화가 포함된 게임 컨셉으로 전환합니다."
      },
      {
        title: "UI 방향성",
        description: "아트 스타일에 맞춘 게임용 인터페이스 구조와 디자인 시스템을 제공합니다."
      },
      {
        title: "시작 코드",
        description: "Unity 또는 Flutter용 실용적인 시작 아키텍처와 게임플레이 스니펫을 생성합니다."
      }
    ]
  },
  features: {
    label: "기능",
    title: "브레인스토밍이 아니라 출시를 위한 설계",
    items: [
      {
        title: "AI 게임 기획",
        body: "훅, 루프, 타깃 유저, 수익화를 하나의 구조화된 응답으로 정리합니다."
      },
      {
        title: "게임 UI 기획",
        body: "구현 전에 화면 구조, 계층, 아트 방향, UX 원칙을 정의합니다."
      },
      {
        title: "엔진 맞춤 코드",
        body: "Unity와 Flutter용 시작 구조와 집중된 게임플레이 예제를 생성합니다."
      },
      {
        title: "프리미엄 기획 문서",
        body: "유료 팀을 위한 GDD, UI/UX, 시스템 설계, MVP 로드맵 문서를 생성합니다."
      }
    ]
  },
  pricing: {
    free: "무료",
    pro: "프로",
    studio: "스튜디오",
    pageTitle: "인디 팀을 위한 간단한 요금제",
    pageDescription:
      "무료 플랜은 하루 5회 생성을 제공합니다. 프로는 프리미엄 생성기를 열고, 스튜디오는 더 깊은 기획 워크플로우를 제공합니다.",
    freeDetails: "하루 5회 생성",
    proDetails: "무제한 생성 + 프리미엄 기획 도구",
    studioDetails: "전체 기획 도구 모음 + 고급 프로덕션 가이드",
    freeFeatures: ["하루 5회 생성", "기본 생성기", "제한된 결과 길이"],
    proFeatures: ["무제한 생성", "게임 기획서 생성기", "UI/UX 기획 생성기", "시스템 설계 생성기", "Unity 스크립트 생성기 Pro", "결과 저장 및 내보내기"],
    studioFeatures: ["프로의 모든 기능", "전체 게임 기획 문서", "수익화 전략 생성기", "MVP 로드맵 생성기", "프로덕션 리스크 분석"],
    upgradeToPro: "프로로 업그레이드",
    upgradeToStudio: "스튜디오로 업그레이드",
    currentPlan: "현재 플랜",
    switchPlan: "플랜 선택",
    managingPlan: "플랜 업데이트 중...",
    saveExportNotice: "기록 저장과 내보내기는 프로 및 스튜디오 플랜에서 사용할 수 있습니다."
  },
  premium: {
    title: "프리미엄 기획 도구",
    description: "이 생성기는 유료 플랜에서 사용할 수 있으며 더 깊은 프로덕션 기획 문서를 위해 설계되었습니다.",
    cta: "요금제 보기",
    badge: "프로 이용 필요",
    studioBadge: "스튜디오 이용 필요",
    modalTitle: "업그레이드 필요",
    modalBody: "이 생성기를 사용하려면 플랜을 업그레이드하세요.",
    close: "닫기",
    gddMessage: "전체 게임 기획서를 생성하려면 프로로 업그레이드하세요.",
    uiUxMessage: "전체 UI/UX 기획 문서를 생성하려면 프로로 업그레이드하세요.",
    systemDesignMessage: "전체 시스템 설계 문서를 생성하려면 프로로 업그레이드하세요.",
    mvpRoadmapMessage: "전체 MVP 로드맵을 생성하려면 스튜디오로 업그레이드하세요."
  },
  footer: {
    builtWith: ""
  },
  toolCards: {
    openTool: "도구 열기",
    items: [
      {
        title: "게임 아이디어 생성기",
        description: "장르, 플랫폼, 테마를 시장성 있는 컨셉으로 구체화합니다."
      },
      {
        title: "게임 UI 생성기",
        description: "인터페이스 레이아웃, 화면 계층, 시각 방향을 생성합니다."
      },
      {
        title: "Unity 스크립트 생성기",
        description: "주석과 통합 노트가 포함된 Unity C# 스크립트를 생성합니다."
      },
      {
        title: "게임 코드 생성기",
        description: "Unity 또는 Flutter용 시작 아키텍처와 게임플레이 코드를 제공합니다."
      },
      {
        title: "게임 기획서 생성기",
        description: "게임플레이 루프, 범위, 진행, 리스크가 포함된 프리미엄 GDD를 만듭니다."
      },
      {
        title: "UI/UX 기획 생성기",
        description: "게임용 로비, HUD, 화면 흐름, UX 기획 문서를 만듭니다."
      },
      {
        title: "시스템 설계 생성기",
        description: "경제, 진행, 랭킹, 보상, 라이브옵스 시스템을 문서화합니다."
      },
      {
        title: "MVP 로드맵 생성기",
        description: "우선순위, 리스크, 핵심 기능이 포함된 4주 MVP 계획을 만듭니다."
      }
    ]
  },
  dashboard: {
    overview: "개요",
    history: "내 생성 기록",
    pricing: "요금제",
    account: "계정",
    generators: "생성기",
    idea: "아이디어 생성기",
    ui: "UI 생성기",
    pixelPrompt: "픽셀 프롬프트 생성기",
    code: "코드 생성기",
    unity: "Unity 스크립트",
    gdd: "GDD 생성기",
    uiUxPlanning: "UI/UX 기획",
    systemDesign: "시스템 설계",
    mvpRoadmap: "MVP 로드맵",
    signOut: "로그아웃",
    label: "대시보드",
    title: "다시 오신 것을 환영합니다",
    description: "컨셉, 인터페이스, 코드, 기획 문서를 생성하세요. 현재 플랜은",
    today: "오늘",
    todayHint: "오늘 사용한 생성 횟수",
    remaining: "남은 횟수",
    remainingHint: "오늘 남은 생성 횟수",
    plan: "플랜",
    unlimitedUsage: "무제한 사용",
    dailyHint: "하루 5회 생성",
    workspace: "워크스페이스",
    fastAccess: "빠른 접근",
    browseHistory: "생성 기록 보기",
    generateUnity: "Unity 게임플레이 스크립트 생성",
    toolSelection: "도구 선택",
    recent: "최근 생성 기록",
    recentHint: "모든 도구의 최신 프롬프트",
    noGenerations: "아직 생성 기록이 없습니다.",
    workflowNotes: "워크플로우 노트",
    note1: "프롬프트 템플릿은 일반적인 게임 유형의 기획 속도를 높입니다.",
    note2: "마크다운 렌더링은 코드 블록과 기획 구조를 읽기 쉽게 유지합니다.",
    note3: "복사 및 내보내기 기능으로 결과를 Unity, 문서, 티켓으로 옮길 수 있습니다.",
    sidebarTitle: "스튜디오 워크스페이스",
    accountHint: "로그인한 계정",
    pricingHint: "무제한 생성을 원하면 업그레이드하세요",
    accountTitle: "계정 개요",
    accountDescription: "이메일, 현재 플랜, 더 많은 기획 용량으로 가는 가장 빠른 경로를 확인하세요.",
    usage: "사용량",
    settings: "설정"
  },
  history: {
    label: "기록",
    title: "내 생성 기록",
    description: "이전 프롬프트를 검토하고, 도구별로 필터링하고, 지난 결과를 다시 복사하거나 내보내세요.",
    all: "전체",
    idea: "아이디어",
    ui: "UI",
    code: "코드",
    unity: "Unity 스크립트",
    gdd: "GDD",
    uiUxPlan: "UI/UX 계획",
    systemDesign: "시스템 설계",
    mvpRoadmap: "MVP 로드맵",
    prompt: "프롬프트",
    result: "결과",
    empty: "이 필터에 해당하는 생성 기록이 없습니다."
  },
  auth: {
    label: "인증",
    title: "워크스페이스에 로그인",
    signupTitle: "워크스페이스 계정 만들기",
    login_title: "GameDev AI Toolkit",
    description: "Google, GitHub 또는 이메일과 비밀번호로 로그인하세요.",
    signupDescription: "Google, GitHub 또는 이메일과 비밀번호로 계정을 만드세요.",
    continue_google: "Google로 계속하기",
    continue_github: "GitHub로 계속하기",
    or: "또는",
    login: "로그인",
    signup: "회원가입",
    no_account: "계정이 없으신가요?",
    have_account: "이미 계정이 있으신가요?",
    email: "이메일",
    emailPlaceholder: "founder@studio.com",
    password: "비밀번호",
    passwordPlaceholder: "비밀번호를 입력하세요",
    confirmPassword: "비밀번호 확인",
    confirmPasswordPlaceholder: "비밀번호를 다시 입력하세요",
    continueWithEmail: "이메일로 계속",
    continueWithGoogle: "Google로 계속",
    continueWithGithub: "GitHub로 계속",
    loginButton: "로그인",
    signupButton: "계정 만들기",
    divider: "또는",
    createAccountLabel: "이메일로 계정 만들기",
    createPasswordPlaceholder: "비밀번호 만들기",
    createAccount: "계정 만들기",
    noAccount: "계정이 없으신가요?",
    createAccountLink: "계정 만들기",
    haveAccount: "이미 계정이 있으신가요?",
    loginLink: "로그인",
    passwordMismatch: "비밀번호가 일치하지 않습니다.",
    googleLoginFailed: "Google 로그인에 실패했습니다",
    githubLoginFailed: "GitHub 로그인에 실패했습니다",
    checkEmailSuccess: "이메일을 확인해 계정을 인증한 뒤 로그인하세요."
  },
  languageSelector: {
    english: "English",
    korean: "한국어"
  },
  tools: {
    ideaTitle: "게임 아이디어 생성기",
    ideaDescription: "다음 게임을 위한 상위 수준의 컨셉, 게임플레이 루프, 수익화 모델, UI 레이아웃을 생성합니다.",
    uiTitle: "게임 UI 생성기",
    uiDescription: "게임용 인터페이스 구조, 시각 시스템 제안, UX 가이드를 생성합니다.",
    codeTitle: "게임 코드 생성기",
    codeDescription: "Unity 또는 Flutter 기반 게임 프로젝트를 위한 시작 구조와 핵심 게임플레이 코드를 생성합니다.",
    unityTitle: "Unity 스크립트 생성기",
    unityDescription: "주석, 변수 설명, 통합 노트가 포함된 깔끔한 Unity C# 게임플레이 스크립트를 생성합니다.",
    gddTitle: "게임 기획서 생성기",
    gddDescription: "개요, 루프, 메커닉, 진행, MVP 범위, 프로덕션 리스크를 다루는 프리미엄 GDD를 생성합니다.",
    uiUxPlanningTitle: "UI/UX 기획 생성기",
    uiUxPlanningDescription: "화면, 플로우, HUD 구조, 사용성 제안을 포함한 프리미엄 UI/UX 기획 문서를 생성합니다.",
    systemDesignTitle: "시스템 설계 생성기",
    systemDesignDescription: "진행, 경제, 보상, 랭킹, 반복 시스템을 다루는 프리미엄 시스템 설계 문서를 생성합니다.",
    mvpRoadmapTitle: "MVP 로드맵 생성기",
    mvpRoadmapDescription: "필수 범위, 4주 마일스톤, 기술 우선순위, 리스크가 포함된 프리미엄 MVP 로드맵을 생성합니다.",
    genre: "장르",
    platform: "플랫폼",
    theme: "테마",
    gameType: "게임 유형",
    style: "스타일",
    engine: "엔진",
    language: "언어",
    scriptType: "스크립트 유형",
    gameGenre: "게임 장르",
    extraFeatures: "추가 기능",
    targetAudience: "타깃 유저",
    monetizationModel: "수익화 모델",
    coreDifferentiation: "핵심 차별점",
    playerMode: "멀티플레이 또는 싱글플레이",
    sessionLength: "세션 길이",
    artStyle: "아트 스타일",
    coreMode: "핵심 모드",
    coreMechanic: "핵심 메커닉",
    metaProgression: "메타 성장",
    currencyTypes: "재화 유형",
    eventSystem: "이벤트 시스템",
    leaderboardNeeds: "랭킹 또는 리더보드 필요 여부",
    teamSize: "팀 규모",
    targetLaunchPeriod: "목표 출시 기간",
    priorityFeatures: "우선 기능",
    revenueModel: "수익 모델",
    templatePuzzle: "퍼즐 게임",
    templateIdle: "방치형 게임",
    templateRpg: "RPG",
    templateTowerDefense: "타워 디펜스",
    placeholders: {
      ideaGenre: "로그라이크 덱빌더",
      ideaPlatform: "PC + 스팀 덱",
      ideaTheme: "네오 느와르 사이버펑크",
      uiGameType: "탑다운 액션 RPG",
      uiStyle: "깔끔한 SF HUD",
      uiTheme: "고대 기술 유적",
      codeGameType: "엔들리스 러너",
      unityScriptType: "스크립트 유형을 선택하세요...",
      unityGameGenre: "액션 플랫포머",
      unityExtraFeatures: "더블 점프, 대시 쿨다운, 애니메이션 훅, 경사 처리",
      gddGameGenre: "액션 RPG",
      gddPlatform: "PC + 콘솔",
      gddTheme: "포스트 아포칼립스 하늘 섬",
      gddTargetAudience: "18-34세 미드코어 전략 플레이어",
      gddMonetizationModel: "프리미엄 + 코스메틱 DLC",
      gddCoreDifferentiation: "도시 재건이 유지되는 전술형 런",
      gddPlayerMode: "싱글플레이",
      gddSessionLength: "15-20분",
      uiUxGameGenre: "타워 디펜스",
      uiUxPlatform: "모바일",
      uiUxArtStyle: "미니멀 SF HUD",
      uiUxCoreMode: "세션 기반 협동 레이드",
      uiUxMonetizationModel: "배틀 패스 + 코스메틱",
      systemDesignGameGenre: "방치형 전략",
      systemDesignCoreMechanic: "자동 자원 체인",
      systemDesignMetaProgression: "영구 기술 업그레이드가 있는 프레스티지 루프",
      systemDesignCurrencyTypes: "골드, 젬, 길드 토큰",
      systemDesignEventSystem: "회전형 보스가 있는 주간 이벤트",
      systemDesignLeaderboardNeeds: "예, 점수와 클리어 속도 기준 주간 리더보드",
      mvpTeamSize: "4",
      mvpEngine: "Unity",
      mvpTargetLaunchPeriod: "12주",
      mvpPriorityFeatures: "핵심 루프, 튜토리얼, 진행, 완성도 높은 버티컬 슬라이스 1개",
      mvpRevenueModel: "프리미엄 + 코스메틱 DLC"
    },
    options: {
      unity: "Unity",
      flutter: "Flutter",
      csharp: "C#",
      dart: "Dart",
      playerMovement: "플레이어 이동",
      enemyAi: "적 AI",
      cameraController: "카메라 컨트롤러",
      inventorySystem: "인벤토리 시스템"
    }
  }
};

export const translations = {
  en,
  ko
} as const;
