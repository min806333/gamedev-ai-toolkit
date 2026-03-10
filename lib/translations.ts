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
    exportResult: "Export Result"
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
    close: "Close"
  },
  footer: {
    builtWith: "Built with Next.js, Supabase, OpenAI, and Vercel."
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
    accountDescription: "Review your email, current plan, and the fastest route to more planning capacity."
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
    templateTowerDefense: "Tower Defense"
  }
} as const;

export const translations = {
  en,
  ko: en
} as const;
