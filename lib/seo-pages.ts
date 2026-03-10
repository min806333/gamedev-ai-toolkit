export type SeoPageKey =
  | "unityScript"
  | "gameIdea"
  | "gameUi"
  | "gameDesignDocument"
  | "uiUxPlanning"
  | "mvpRoadmap"
  | "tools"
  | "puzzleGameIdea"
  | "mobileGameUi"
  | "indieGamePlanning"
  | "pixelArtGenerator"
  | "gameSystemDesign"
  | "gameMechanics"
  | "gameMonetization";

type LocalizedText = {
  en: string;
  ko: string;
};

type LocalizedList = {
  en: string[];
  ko: string[];
};

export type SeoPageContent = {
  slug: string;
  metadataTitle: LocalizedText;
  metadataDescription: LocalizedText;
  toolHref: string;
  premiumToolHref?: string;
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
  cta: LocalizedText;
  premiumTitle: LocalizedText;
  premiumBody: LocalizedText;
  related: SeoPageKey[];
};

const t = (value: string): LocalizedText => ({ en: value, ko: value });
const list = (...values: string[]): LocalizedList => ({ en: values, ko: values });

function page(config: Omit<SeoPageContent, "benefitsTitle" | "benefits"> & { benefits?: string[] }): SeoPageContent {
  return {
    ...config,
    benefitsTitle: t("Benefits"),
    benefits: list(
      ...(config.benefits ?? [
        "Speed up development",
        "Improve creativity",
        "Save development time"
      ])
    )
  };
}

export const seoPages: Record<SeoPageKey, SeoPageContent> = {
  unityScript: page({
    slug: "/unity-script-generator",
    metadataTitle: {
      en: "Unity Script Generator - AI Tool",
      ko: "AI Unity 스크립트 생성기"
    },
    metadataDescription: {
      en: "Generate Unity C# scripts instantly using AI for indie game development.",
      ko: "인디 게임 개발을 위한 Unity C# 스크립트를 AI로 즉시 생성하세요."
    },
    toolHref: "/tools/unity-script",
    premiumToolHref: "/pricing",
    heroTitle: t("Unity Script Generator for faster gameplay scripting"),
    heroDescription: t("Create Unity C# gameplay scripts with comments, structure, and implementation notes in seconds."),
    problemTitle: t("Writing prototype scripts slows iteration"),
    problemBody: t("Indie teams lose time rebuilding movement, combat, camera, and system scripts from scratch whenever a new idea needs validation."),
    solutionTitle: t("Generate practical Unity code instantly"),
    solutionBody: t("The Unity Script Generator turns a mechanic idea into a reusable script skeleton your team can adapt inside a real project."),
    exampleTitle: t("Example Unity Script"),
    exampleBody: t(`## Player Movement Controller

### Unity Script
\`\`\`csharp
public class PlayerMovement : MonoBehaviour {
  public float moveSpeed = 6f;
  public float jumpForce = 8f;
}
\`\`\`

### Integration Notes
- Attach to the player prefab
- Hook up Rigidbody and Animator references`),
    cta: t("Open Unity Script Generator"),
    premiumTitle: t("Need deeper planning too?"),
    premiumBody: t("Upgrade for premium planning tools when you want system design, GDD, and roadmap generation."),
    related: ["gameIdea", "gameUi", "tools"]
  }),
  gameIdea: page({
    slug: "/game-idea-generator",
    metadataTitle: {
      en: "Game Idea Generator - AI Tool",
      ko: "AI 게임 아이디어 생성기"
    },
    metadataDescription: {
      en: "Generate game concepts, gameplay loops, monetization ideas, and UI direction instantly using AI.",
      ko: "게임 컨셉, 게임플레이 루프, 수익화 아이디어, UI 방향성을 AI로 즉시 생성하세요."
    },
    toolHref: "/tools/idea",
    premiumToolHref: "/pricing",
    heroTitle: t("Game Idea Generator for indie concept development"),
    heroDescription: t("Turn a genre, platform, and theme into a structured game concept with loop, monetization, and UI direction."),
    problemTitle: t("Good ideas are hard to structure"),
    problemBody: t("Many developers have fragments of ideas but not a concept they can evaluate, prototype, or pitch with confidence."),
    solutionTitle: t("Generate a production-ready concept outline"),
    solutionBody: t("The Game Idea Generator produces a concept, gameplay loop, monetization strategy, and UI direction in one pass."),
    exampleTitle: t("Example Game Idea"),
    exampleBody: t(`## Puzzle Merge Adventure

### Gameplay Loop
- Merge relics
- Clear short expedition maps
- Upgrade your museum hub

### Monetization
- Cosmetic themes
- Seasonal pass

### UI Layout
- Top bar for energy and currency
- Center board for merging
- Bottom tray for boosters`),
    cta: t("Open Game Idea Generator"),
    premiumTitle: t("Want to turn the concept into a full plan?"),
    premiumBody: t("Use premium planning generators to expand an idea into a GDD, system design, or roadmap."),
    related: ["puzzleGameIdea", "gameUi", "tools"]
  }),
  gameUi: page({
    slug: "/game-ui-generator",
    metadataTitle: {
      en: "Game UI Generator - AI Tool",
      ko: "AI 게임 UI 생성기"
    },
    metadataDescription: {
      en: "Generate game UI layouts, HUD ideas, screen flows, and UX direction instantly using AI.",
      ko: "게임 UI 레이아웃, HUD 아이디어, 화면 흐름, UX 방향성을 AI로 즉시 생성하세요."
    },
    toolHref: "/tools/ui",
    premiumToolHref: "/pricing",
    heroTitle: t("Game UI Generator for layouts, HUDs, and screen flow"),
    heroDescription: t("Generate game UI direction with layout structure, visual hierarchy, and art-aware recommendations."),
    problemTitle: t("UI planning starts too slowly"),
    problemBody: t("Teams often spend too much time deciding screen hierarchy, HUD priorities, and menu structure before visual design begins."),
    solutionTitle: t("Get a strong UI starting point"),
    solutionBody: t("The Game UI Generator gives you a clear structure for screens, HUD, and layout choices tailored to your genre."),
    exampleTitle: t("Example Game UI Layout"),
    exampleBody: t(`## Sci-Fi Base Builder UI

### Layout Structure
- Left rail for build categories
- Bottom action bar for rotate and upgrade
- Right drawer for selected building stats

### UX Notes
- Keep resource indicators visible
- Use strong contrast for interaction states`),
    cta: t("Open Game UI Generator"),
    premiumTitle: t("Need a complete UI planning document?"),
    premiumBody: t("Upgrade to unlock the UI and UX planning workflow with screen lists, flows, and HUD planning."),
    related: ["mobileGameUi", "uiUxPlanning", "tools"]
  }),
  gameDesignDocument: page({
    slug: "/game-design-document-generator",
    metadataTitle: {
      en: "Game Design Document Generator - AI Tool",
      ko: "AI 게임 기획서 생성기"
    },
    metadataDescription: {
      en: "Generate game design documents with gameplay loop, mechanics, progression, scope, and production risks.",
      ko: "게임플레이 루프, 메커닉, 진행, 범위, 프로덕션 리스크를 포함한 게임 기획서를 생성하세요."
    },
    toolHref: "/tools/gdd",
    premiumToolHref: "/pricing",
    heroTitle: t("Game Design Document Generator for premium planning"),
    heroDescription: t("Create a structured GDD with overview, mechanics, progression, MVP scope, and development risks."),
    problemTitle: t("Ideas alone are not enough for production"),
    problemBody: t("A team needs a shared planning document before scope, progression, and differentiation can be aligned."),
    solutionTitle: t("Generate a first-pass GDD instantly"),
    solutionBody: t("The GDD Generator gives your team a planning draft to refine instead of starting from a blank page."),
    exampleTitle: t("Example GDD Output"),
    exampleBody: t(`## Game Overview
- Midcore co-op dungeon crawler

## Core Gameplay Loop
- Prepare loadout
- Enter raid
- Extract resources
- Upgrade the town hub

## Risks and Challenges
- Matchmaking quality
- Content pipeline load`),
    cta: t("Open GDD Generator"),
    premiumTitle: t("Premium planning workflow"),
    premiumBody: t("This landing page connects developers to a paid planning generator built for deeper production documents."),
    related: ["gameSystemDesign", "indieGamePlanning", "mvpRoadmap"]
  }),
  uiUxPlanning: page({
    slug: "/ui-ux-planning-generator",
    metadataTitle: t("UI UX Planning Generator - AI Tool"),
    metadataDescription: t("Generate UI and UX planning docs for game screens, player flows, HUD layout, and component structure."),
    toolHref: "/tools/ui-ux-planning",
    premiumToolHref: "/pricing",
    heroTitle: t("UI UX Planning Generator for production-ready flows"),
    heroDescription: t("Create planning docs with screen lists, user flow, HUD layout, popups, and component guidance."),
    problemTitle: t("Quick UI ideas do not become shippable UX by themselves"),
    problemBody: t("Studios need screen hierarchy, flow logic, and reusable components to move from inspiration to implementation."),
    solutionTitle: t("Plan the whole player journey"),
    solutionBody: t("This generator expands a UI direction into a usable planning document for product, art, and design teams."),
    exampleTitle: t("Example UI UX Planning Output"),
    exampleBody: t(`## Screen List
- Lobby
- Loadout
- Match HUD
- Result Screen

## User Flow
- Open app
- Claim rewards
- Queue match
- Play
- Review results`),
    cta: t("Open UI UX Planning Generator"),
    premiumTitle: t("Premium planning feature"),
    premiumBody: t("Use this generator when you need more than quick UI inspiration and want a full planning layer."),
    related: ["gameUi", "mobileGameUi", "indieGamePlanning"]
  }),
  mvpRoadmap: page({
    slug: "/mvp-roadmap-generator",
    metadataTitle: t("MVP Roadmap Generator - AI Tool"),
    metadataDescription: t("Generate a four-week MVP roadmap for game teams with priorities, must-have features, and production risks."),
    toolHref: "/tools/mvp-roadmap",
    premiumToolHref: "/pricing",
    heroTitle: t("MVP Roadmap Generator for launch-focused planning"),
    heroDescription: t("Map must-have scope, technical priorities, and weekly milestones for your game MVP."),
    problemTitle: t("Small teams often overbuild before launch"),
    problemBody: t("Without a roadmap, must-have features and polish work get mixed together and delay shipping."),
    solutionTitle: t("Generate an MVP-first roadmap"),
    solutionBody: t("This generator separates core scope from optional work and turns it into an execution sequence."),
    exampleTitle: t("Example MVP Roadmap Output"),
    exampleBody: t(`## Must-have Features
- Core combat loop
- Progression hub
- Reward screen

## Four Week Roadmap
- Week 1: loop prototype
- Week 2: progression
- Week 3: UI polish
- Week 4: balancing and fixes`),
    cta: t("Open MVP Roadmap Generator"),
    premiumTitle: t("Studio planning feature"),
    premiumBody: t("Use this workflow when you need deeper production planning and tighter scope control."),
    related: ["gameDesignDocument", "gameSystemDesign", "tools"]
  }),
  tools: page({
    slug: "/ai-game-development-tools",
    metadataTitle: t("AI Game Development Tools - GameDev AI Toolkit"),
    metadataDescription: t("Explore AI tools for game ideas, UI generation, gameplay code, Unity scripts, and planning docs."),
    toolHref: "/dashboard",
    premiumToolHref: "/pricing",
    heroTitle: t("AI game development tools for indie teams"),
    heroDescription: t("Explore idea, UI, code, Unity script, and planning generators in one workflow built for fast iteration."),
    problemTitle: t("Game development workflows are fragmented"),
    problemBody: t("Developers jump between docs, moodboards, code snippets, and spreadsheets without a single structured system."),
    solutionTitle: t("Use one toolkit across concept, design, code, and planning"),
    solutionBody: t("GameDev AI Toolkit connects lightweight generators with premium planning tools, history, export actions, and streaming output."),
    exampleTitle: t("Example Workflow Output"),
    exampleBody: t(`## Example Pipeline
- Generate a game concept
- Generate the UI layout
- Generate a Unity script
- Expand into a GDD and roadmap`),
    cta: t("Explore the Toolkit"),
    premiumTitle: t("Unlock premium planning features"),
    premiumBody: t("Pro and Studio unlock deeper planning tools when your workflow needs more than lightweight generation."),
    related: ["gameIdea", "gameUi", "unityScript"]
  }),
  puzzleGameIdea: page({
    slug: "/puzzle-game-idea-generator",
    metadataTitle: t("Puzzle Game Idea Generator - AI Tool"),
    metadataDescription: t("Generate puzzle game ideas, loops, monetization hooks, and presentation concepts with AI."),
    toolHref: "/tools/idea",
    premiumToolHref: "/pricing",
    heroTitle: t("Puzzle Game Idea Generator for casual and midcore concepts"),
    heroDescription: t("Create puzzle game concepts with progression, monetization, and genre-specific hooks."),
    problemTitle: t("Puzzle concepts often feel too familiar"),
    problemBody: t("It is difficult to find a fresh puzzle hook without repeating the same match and merge patterns."),
    solutionTitle: t("Generate differentiated puzzle loops"),
    solutionBody: t("This generator explores new puzzle framing, progression hooks, and retention ideas in one response."),
    exampleTitle: t("Example Puzzle Game Output"),
    exampleBody: t(`## Concept
- Restore a floating museum by solving relic merge puzzles

## Gameplay Loop
- Solve short runs
- Earn restoration materials
- Unlock themed galleries`),
    cta: t("Generate Puzzle Game Ideas"),
    premiumTitle: t("Turn the best concept into a plan"),
    premiumBody: t("Use premium planning tools to define progression, economy, and launch scope around the strongest concept."),
    related: ["gameIdea", "gameMonetization", "gameDesignDocument"]
  }),
  mobileGameUi: page({
    slug: "/mobile-game-ui-generator",
    metadataTitle: t("Mobile Game UI Generator - AI Tool"),
    metadataDescription: t("Generate mobile game UI ideas, HUD layouts, screen structures, and UX direction with AI."),
    toolHref: "/tools/ui",
    premiumToolHref: "/pricing",
    heroTitle: t("Mobile Game UI Generator for monetization-aware layouts"),
    heroDescription: t("Create mobile-first lobby, HUD, menu, and result screen layouts with AI guidance."),
    problemTitle: t("Mobile UI has strict readability and UX constraints"),
    problemBody: t("Small screens and monetization pressure make mobile interface planning harder than many teams expect."),
    solutionTitle: t("Generate a mobile-first structure before production"),
    solutionBody: t("Use this generator to outline lobby structure, HUD priorities, menu logic, and mobile UX decisions."),
    exampleTitle: t("Example Mobile UI Output"),
    exampleBody: t(`## Main Lobby Structure
- Top bar for energy and premium currency
- Center event banner
- Bottom navigation for home, collection, shop, and missions

## In-game HUD
- Objective in upper corner
- Thumb-friendly action bar at bottom`),
    cta: t("Open Mobile Game UI Generator"),
    premiumTitle: t("Need full mobile UX planning?"),
    premiumBody: t("Upgrade for detailed screen lists, user flow, popup structure, and component guidance."),
    related: ["gameUi", "pixelArtGenerator", "uiUxPlanning"]
  }),
  indieGamePlanning: page({
    slug: "/indie-game-planning-tool",
    metadataTitle: t("Indie Game Planning Tool - AI SaaS"),
    metadataDescription: t("Plan indie games with AI using GDD, UI, system design, roadmap, idea, and code generation tools."),
    toolHref: "/tools/gdd",
    premiumToolHref: "/pricing",
    heroTitle: t("Indie game planning tools for clearer scope and production"),
    heroDescription: t("Move from concept to GDD, system design, UI planning, and roadmap generation without starting every doc from scratch."),
    problemTitle: t("Indie teams have limited planning bandwidth"),
    problemBody: t("Smaller teams need production clarity but usually do not have time to write every planning document manually."),
    solutionTitle: t("Use AI as a lightweight planning stack"),
    solutionBody: t("GameDev AI Toolkit gives indie teams a faster way to create structured planning outputs for design, UX, systems, and roadmap decisions."),
    exampleTitle: t("Example Indie Planning Output"),
    exampleBody: t(`## Planning Stack
- Game concept
- GDD outline
- HUD and lobby plan
- Economy structure
- Four week MVP roadmap`),
    cta: t("Open Indie Planning Tools"),
    premiumTitle: t("Premium planning suite"),
    premiumBody: t("Pro and Studio unlock planning generators built for deeper game production documents."),
    related: ["gameDesignDocument", "gameSystemDesign", "mvpRoadmap"]
  }),
  pixelArtGenerator: page({
    slug: "/pixel-art-generator",
    metadataTitle: {
      en: "Pixel Art Generator - AI Tool",
      ko: "AI 픽셀 아트 생성기"
    },
    metadataDescription: {
      en: "Generate pixel art prompts, scene direction, and visual references for indie games using AI.",
      ko: "인디 게임을 위한 픽셀 아트 프롬프트, 장면 방향성, 비주얼 레퍼런스를 AI로 생성하세요."
    },
    toolHref: "/tools/ui",
    premiumToolHref: "/pricing",
    heroTitle: t("Pixel Art Generator for indie game visuals"),
    heroDescription: t("Create pixel art prompt direction, style notes, and scene breakdowns for your next game."),
    problemTitle: t("Art direction is hard to lock early"),
    problemBody: t("Indie developers often know the gameplay they want, but struggle to define a clear visual identity for pixel art production."),
    solutionTitle: t("Generate visual direction faster"),
    solutionBody: t("Use AI to create art prompts, palette guidance, environment ideas, and style constraints before production begins."),
    exampleTitle: t("Example Pixel Art Output"),
    exampleBody: t(`## Pixel Art Prompt
- Top-down forest shrine at dusk
- Warm lantern highlights
- Limited green and amber palette
- Readable silhouettes for enemies and pickups`),
    cta: t("Open Game UI Generator"),
    premiumTitle: t("Need full UI and art planning?"),
    premiumBody: t("Upgrade when you want deeper planning around visual systems, player flow, and production structure."),
    related: ["gameUi", "mobileGameUi", "tools"]
  }),
  gameSystemDesign: page({
    slug: "/game-system-design-generator",
    metadataTitle: t("Game System Design Generator - AI Tool"),
    metadataDescription: t("Generate game system design docs covering progression, economy, rewards, rankings, and live systems."),
    toolHref: "/tools/system-design",
    premiumToolHref: "/pricing",
    heroTitle: t("Game System Design Generator for progression and economy planning"),
    heroDescription: t("Build AI-assisted system design docs for progression, economy loops, rewards, and recurring systems."),
    problemTitle: t("Core systems are hard to align early"),
    problemBody: t("Economy, rewards, progression, and ranking systems often evolve separately, creating balancing and retention problems later."),
    solutionTitle: t("Generate a shared systems blueprint"),
    solutionBody: t("This generator organizes main systems, progression, reward loops, and recurring content into one structured document."),
    exampleTitle: t("Example System Design Output"),
    exampleBody: t(`## Main Systems
- Session-based combat loop
- Account-level progression
- Daily mission system

## Economy Design
- Soft currency for upgrades
- Premium currency for convenience
- Event tokens for limited rewards`),
    cta: t("Open System Design Generator"),
    premiumTitle: t("Premium systems planning"),
    premiumBody: t("Use premium generators when your team needs stronger economy and retention planning."),
    related: ["gameDesignDocument", "gameMonetization", "mvpRoadmap"]
  }),
  gameMechanics: page({
    slug: "/game-mechanics-generator",
    metadataTitle: t("Game Mechanics Generator - AI Tool"),
    metadataDescription: t("Generate game mechanics, core loops, feature hooks, and player progression ideas with AI."),
    toolHref: "/tools/idea",
    premiumToolHref: "/pricing",
    heroTitle: t("Game Mechanics Generator for stronger core loops"),
    heroDescription: t("Use AI to develop mechanics, variations, player abilities, and progression hooks for your next game."),
    problemTitle: t("Mechanics sound good in theory but fail in structure"),
    problemBody: t("Developers often have an interesting mechanic idea but need help turning it into a loop that can carry real gameplay."),
    solutionTitle: t("Generate mechanic systems with context"),
    solutionBody: t("This generator turns a theme or genre direction into core mechanics, loop logic, and feature variations worth prototyping."),
    exampleTitle: t("Example Mechanics Output"),
    exampleBody: t(`## Core Mechanic
- Chain gravity swaps to redirect projectiles

## Supporting Systems
- Cooldown-based stance changes
- Combo meter for risk and reward
- Stage hazards that amplify movement decisions`),
    cta: t("Open Game Idea Generator"),
    premiumTitle: t("Need full system planning?"),
    premiumBody: t("Expand a strong mechanic into a system design doc or GDD when the prototype direction becomes promising."),
    related: ["gameIdea", "gameSystemDesign", "unityScript"]
  }),
  gameMonetization: page({
    slug: "/game-monetization-generator",
    metadataTitle: t("Game Monetization Generator - AI Tool"),
    metadataDescription: t("Generate game monetization strategies, retention hooks, reward structures, and revenue ideas with AI."),
    toolHref: "/tools/system-design",
    premiumToolHref: "/pricing",
    heroTitle: t("Game Monetization Generator for sustainable revenue planning"),
    heroDescription: t("Design monetization systems, currency loops, offers, and retention hooks for indie game products."),
    problemTitle: t("Monetization gets bolted on too late"),
    problemBody: t("Many teams leave revenue design until late production, which creates friction between economy, UX, and retention."),
    solutionTitle: t("Generate monetization-aware systems early"),
    solutionBody: t("This generator helps developers define offer structure, currencies, reward loops, and user-friendly monetization ideas before launch."),
    exampleTitle: t("Example Monetization Output"),
    exampleBody: t(`## Monetization Strategy
- Cosmetic skins for high-value users
- Starter bundle for early conversion
- Event pass for recurring engagement

## Reward Design
- Daily streak chest
- Mission-based premium currency fragments`),
    cta: t("Open System Design Generator"),
    premiumTitle: t("Premium economy planning"),
    premiumBody: t("Use the planning suite to connect monetization with progression, reward design, and long-term retention."),
    related: ["gameSystemDesign", "puzzleGameIdea", "gameDesignDocument"]
  })
};
