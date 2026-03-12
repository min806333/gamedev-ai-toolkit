import type { ToolConfig } from "./types";
import { pixelArtCopy } from "./pixel-art-copy";

export const TOOL_CONFIGS: ToolConfig[] = [
  {
    id: "idea",
    label: "Game Idea Generator",
    route: "/tools/idea",
    publicRoute: "/game-idea-generator",
    apiRoute: "/api/generate/idea",
    provider: "anthropic",
    defaultModel: "claude-3-5-sonnet-latest",
    resultTitle: "Game Idea",
    titleKey: "ideaTitle",
    descriptionKey: "ideaDescription",
    fieldConfigs: [
      { name: "genre", labelKey: "genre", placeholderKey: "ideaGenre" },
      { name: "platform", labelKey: "platform", placeholderKey: "ideaPlatform" },
      { name: "theme", labelKey: "theme", placeholderKey: "ideaTheme" }
    ],
    templates: [
      { labelKey: "templatePuzzle", values: { genre: "Puzzle", platform: "Mobile", theme: "Color-matching dreamscape" } },
      { labelKey: "templateIdle", values: { genre: "Idle", platform: "iOS and Android", theme: "Space mining corporation" } },
      { labelKey: "templateRpg", values: { genre: "RPG", platform: "PC", theme: "Ancient kingdoms and lost magic" } },
      { labelKey: "templateTowerDefense", values: { genre: "Tower Defense", platform: "PC and mobile", theme: "Bio-mechanical invasion" } }
    ]
  },
  {
    id: "ui",
    label: "Game UI Generator",
    route: "/tools/ui",
    publicRoute: "/game-ui-generator",
    apiRoute: "/api/generate/ui",
    provider: "openai",
    defaultModel: "gpt-4.1-mini",
    resultTitle: "Game UI Plan",
    titleKey: "uiTitle",
    descriptionKey: "uiDescription",
    fieldConfigs: [
      { name: "gameType", labelKey: "gameType", placeholderKey: "uiGameType" },
      { name: "style", labelKey: "style", placeholderKey: "uiStyle" },
      { name: "theme", labelKey: "theme", placeholderKey: "uiTheme" }
    ],
    templates: [
      { labelKey: "templatePuzzle", values: { gameType: "Puzzle Merge", style: "Bright mobile-first UI", theme: "Magic relic workshop" } },
      { labelKey: "templateIdle", values: { gameType: "Idle Tycoon", style: "Clean sci-fi management HUD", theme: "Orbital mining station" } },
      { labelKey: "templateRpg", values: { gameType: "Action RPG", style: "Dark fantasy layered HUD", theme: "Forgotten moon temple" } },
      { labelKey: "templateTowerDefense", values: { gameType: "Tower Defense", style: "Readable tactical battlefield UI", theme: "Biomechanical wasteland" } }
    ]
  },
  {
    id: "pixel-art",
    label: "Pixel Art Generator",
    route: "/tools/pixel-art",
    apiRoute: "/api/generate/pixel-art",
    provider: "openai",
    defaultModel: "gpt-4.1-mini",
    resultTitle: "Pixel Art Prompt Pack",
    fieldConfigs: [],
    copy: pixelArtCopy
  },
  {
    id: "code",
    label: "Game Code Generator",
    route: "/tools/code",
    apiRoute: "/api/generate/code",
    provider: "openai",
    defaultModel: "gpt-4.1-mini",
    resultTitle: "Game Code Starter",
    titleKey: "codeTitle",
    descriptionKey: "codeDescription",
    fieldConfigs: [
      { name: "gameType", labelKey: "gameType", placeholderKey: "codeGameType" },
      { name: "engine", labelKey: "engine", type: "select", optionKeys: ["options.unity", "options.flutter"] },
      { name: "language", labelKey: "language", type: "select", optionKeys: ["options.csharp", "options.dart"] }
    ],
    templates: [
      { labelKey: "templatePuzzle", values: { gameType: "Puzzle Match Game", engine: "Unity", language: "C#" } },
      { labelKey: "templateIdle", values: { gameType: "Idle Resource Game", engine: "Flutter", language: "Dart" } },
      { labelKey: "templateRpg", values: { gameType: "Action RPG", engine: "Unity", language: "C#" } },
      { labelKey: "templateTowerDefense", values: { gameType: "Tower Defense", engine: "Unity", language: "C#" } }
    ]
  },
  {
    id: "unity-script",
    label: "Unity Script Generator",
    route: "/tools/unity-script",
    publicRoute: "/unity-script-generator",
    apiRoute: "/api/generate/unity-script",
    provider: "openai",
    defaultModel: "gpt-4.1-mini",
    resultTitle: "Unity Script",
    titleKey: "unityTitle",
    descriptionKey: "unityDescription",
    fieldConfigs: [
      {
        name: "scriptType",
        labelKey: "scriptType",
        type: "select",
        placeholderKey: "unityScriptType",
        optionKeys: ["options.playerMovement", "options.enemyAi", "options.cameraController", "options.inventorySystem"]
      },
      { name: "gameGenre", labelKey: "gameGenre", placeholderKey: "unityGameGenre" },
      { name: "extraFeatures", labelKey: "extraFeatures", placeholderKey: "unityExtraFeatures", type: "textarea" }
    ],
    templates: [
      { labelKey: "templatePuzzle", values: { scriptType: "Grid Manager", gameGenre: "Puzzle", extraFeatures: "Tile swapping, combo detection, score feedback" } },
      { labelKey: "templateIdle", values: { scriptType: "Offline Reward System", gameGenre: "Idle", extraFeatures: "Server-safe timestamp checks, reward popup, bonus multipliers" } },
      { labelKey: "templateRpg", values: { scriptType: "Player Combat Controller", gameGenre: "RPG", extraFeatures: "Combo attacks, stamina usage, hit reactions" } },
      { labelKey: "templateTowerDefense", values: { scriptType: "Tower Targeting System", gameGenre: "Tower Defense", extraFeatures: "Priority targeting, range gizmos, upgrade hooks" } }
    ]
  },
  {
    id: "gdd",
    label: "Game Design Document Generator",
    route: "/tools/gdd",
    publicRoute: "/game-design-document-generator",
    apiRoute: "/api/generate/gdd",
    provider: "anthropic",
    defaultModel: "claude-3-5-sonnet-latest",
    requiredPlan: "pro",
    premiumMessageKey: "gddMessage",
    resultTitle: "Game Design Document",
    titleKey: "gddTitle",
    descriptionKey: "gddDescription",
    fieldConfigs: [
      { name: "gameGenre", labelKey: "gameGenre", placeholderKey: "gddGameGenre" },
      { name: "platform", labelKey: "platform", placeholderKey: "gddPlatform" },
      { name: "theme", labelKey: "theme", placeholderKey: "gddTheme" },
      { name: "targetAudience", labelKey: "targetAudience", placeholderKey: "gddTargetAudience" },
      { name: "monetizationModel", labelKey: "monetizationModel", placeholderKey: "gddMonetizationModel" },
      { name: "coreDifferentiation", labelKey: "coreDifferentiation", placeholderKey: "gddCoreDifferentiation" },
      { name: "playerMode", labelKey: "playerMode", placeholderKey: "gddPlayerMode" },
      { name: "sessionLength", labelKey: "sessionLength", placeholderKey: "gddSessionLength" }
    ],
    templates: [
      { labelKey: "templatePuzzle", values: { gameGenre: "Puzzle", platform: "Mobile", theme: "Mystic artifact restoration", targetAudience: "Women 18-35 who enjoy relaxed progression", monetizationModel: "Battle pass + cosmetics", coreDifferentiation: "Narrative restoration meta tied to puzzle mastery", playerMode: "Single player", sessionLength: "5-8 minutes" } },
      { labelKey: "templateIdle", values: { gameGenre: "Idle", platform: "iOS and Android", theme: "Underwater energy colony", targetAudience: "Broad casual players", monetizationModel: "Ads + starter bundles", coreDifferentiation: "Reactive colony automation that changes the map", playerMode: "Single player", sessionLength: "2-5 minutes" } },
      { labelKey: "templateRpg", values: { gameGenre: "RPG", platform: "PC", theme: "Fallen moon kingdom", targetAudience: "Core fantasy RPG players", monetizationModel: "Premium box price + DLC", coreDifferentiation: "Time-loop party building with evolving class memory", playerMode: "Single player", sessionLength: "30-45 minutes" } },
      { labelKey: "templateTowerDefense", values: { gameGenre: "Tower Defense", platform: "PC and mobile", theme: "Bio-mechanical frontier war", targetAudience: "Strategy players who enjoy short tactical sessions", monetizationModel: "Cosmetics + expansion packs", coreDifferentiation: "Movable towers and terrain mutation system", playerMode: "Single player", sessionLength: "10-15 minutes" } }
    ]
  },
  {
    id: "ui-ux-plan",
    label: "UI/UX Planning Generator",
    route: "/tools/ui-ux-planning",
    apiRoute: "/api/generate/ui-ux-planning",
    provider: "openai",
    defaultModel: "gpt-4.1-mini",
    requiredPlan: "pro",
    premiumMessageKey: "uiUxMessage",
    resultTitle: "UI/UX Planning Document",
    titleKey: "uiUxPlanningTitle",
    descriptionKey: "uiUxPlanningDescription",
    fieldConfigs: [
      { name: "gameGenre", labelKey: "gameGenre", placeholderKey: "uiUxGameGenre" },
      { name: "platform", labelKey: "platform", placeholderKey: "uiUxPlatform" },
      { name: "artStyle", labelKey: "artStyle", placeholderKey: "uiUxArtStyle" },
      { name: "coreMode", labelKey: "coreMode", placeholderKey: "uiUxCoreMode" },
      { name: "monetizationModel", labelKey: "monetizationModel", placeholderKey: "uiUxMonetizationModel" }
    ],
    templates: [
      { labelKey: "templatePuzzle", values: { gameGenre: "Puzzle", platform: "Mobile", artStyle: "Soft magical diorama", coreMode: "Level-based merge puzzles", monetizationModel: "Cosmetics + hints" } },
      { labelKey: "templateIdle", values: { gameGenre: "Idle", platform: "Mobile", artStyle: "Readable clean sci-fi", coreMode: "Passive resource collection", monetizationModel: "Ads + starter packs" } },
      { labelKey: "templateRpg", values: { gameGenre: "RPG", platform: "PC", artStyle: "Dark painterly fantasy", coreMode: "Party exploration and combat", monetizationModel: "Premium" } },
      { labelKey: "templateTowerDefense", values: { gameGenre: "Tower Defense", platform: "PC and mobile", artStyle: "Stylized tactical battlefield", coreMode: "Wave defense", monetizationModel: "Premium + cosmetics" } }
    ]
  },
  {
    id: "system-design",
    label: "System Design Generator",
    route: "/tools/system-design",
    publicRoute: "/game-system-design-generator",
    apiRoute: "/api/generate/system-design",
    provider: "openai",
    defaultModel: "gpt-4.1-mini",
    requiredPlan: "pro",
    premiumMessageKey: "systemDesignMessage",
    resultTitle: "System Design Document",
    titleKey: "systemDesignTitle",
    descriptionKey: "systemDesignDescription",
    fieldConfigs: [
      { name: "gameGenre", labelKey: "gameGenre", placeholderKey: "systemDesignGameGenre" },
      { name: "coreMechanic", labelKey: "coreMechanic", placeholderKey: "systemDesignCoreMechanic" },
      { name: "metaProgression", labelKey: "metaProgression", placeholderKey: "systemDesignMetaProgression" },
      { name: "currencyTypes", labelKey: "currencyTypes", placeholderKey: "systemDesignCurrencyTypes" },
      { name: "eventSystem", labelKey: "eventSystem", placeholderKey: "systemDesignEventSystem" },
      { name: "leaderboardNeeds", labelKey: "leaderboardNeeds", placeholderKey: "systemDesignLeaderboardNeeds" }
    ],
    templates: [
      { labelKey: "templatePuzzle", values: { gameGenre: "Puzzle", coreMechanic: "Tile matching with chain combos", metaProgression: "Room restoration and chapter unlocks", currencyTypes: "Soft coins, premium gems, event tokens", eventSystem: "Weekend challenge ladders", leaderboardNeeds: "Optional score ranking per event" } },
      { labelKey: "templateIdle", values: { gameGenre: "Idle", coreMechanic: "Automated resource extraction", metaProgression: "Factory prestige tiers", currencyTypes: "Credits, shards, premium boosts", eventSystem: "Limited-time colony events", leaderboardNeeds: "Guild contribution ranking" } },
      { labelKey: "templateRpg", values: { gameGenre: "RPG", coreMechanic: "Party-based action combat", metaProgression: "Class unlocks and relic growth", currencyTypes: "Gold, relic dust, premium tickets", eventSystem: "Seasonal dungeon rotations", leaderboardNeeds: "Endgame raid ranking" } },
      { labelKey: "templateTowerDefense", values: { gameGenre: "Tower Defense", coreMechanic: "Lane defense with movable towers", metaProgression: "Commander talents and tower unlocks", currencyTypes: "Scrap, energy cores, premium currency", eventSystem: "Weekly mutation maps", leaderboardNeeds: "High-score leaderboard by map" } }
    ]
  },
  {
    id: "mvp-roadmap",
    label: "MVP Roadmap Generator",
    route: "/tools/mvp-roadmap",
    apiRoute: "/api/generate/mvp-roadmap",
    provider: "openai",
    defaultModel: "gpt-4.1-mini",
    requiredPlan: "studio",
    premiumMessageKey: "mvpRoadmapMessage",
    resultTitle: "MVP Roadmap",
    titleKey: "mvpRoadmapTitle",
    descriptionKey: "mvpRoadmapDescription",
    fieldConfigs: [
      { name: "teamSize", labelKey: "teamSize", placeholderKey: "mvpTeamSize" },
      { name: "engine", labelKey: "engine", placeholderKey: "mvpEngine" },
      { name: "targetLaunchPeriod", labelKey: "targetLaunchPeriod", placeholderKey: "mvpTargetLaunchPeriod" },
      { name: "priorityFeatures", labelKey: "priorityFeatures", placeholderKey: "mvpPriorityFeatures", type: "textarea" },
      { name: "revenueModel", labelKey: "revenueModel", placeholderKey: "mvpRevenueModel" }
    ],
    templates: [
      { labelKey: "templatePuzzle", values: { teamSize: "3", engine: "Unity", targetLaunchPeriod: "8 weeks", priorityFeatures: "Core puzzle loop, onboarding, 30 levels, economy hooks", revenueModel: "Ads + IAP" } },
      { labelKey: "templateIdle", values: { teamSize: "4", engine: "Unity", targetLaunchPeriod: "10 weeks", priorityFeatures: "Offline rewards, economy balancing, progression tuning", revenueModel: "Ads + starter bundles" } },
      { labelKey: "templateRpg", values: { teamSize: "6", engine: "Unity", targetLaunchPeriod: "16 weeks", priorityFeatures: "Combat prototype, one biome, one boss, progression loop", revenueModel: "Premium" } },
      { labelKey: "templateTowerDefense", values: { teamSize: "5", engine: "Unity", targetLaunchPeriod: "12 weeks", priorityFeatures: "Wave system, tower upgrade tree, enemy variety, economy", revenueModel: "Premium + cosmetics" } }
    ]
  }
];

export function getToolConfig(toolId: ToolConfig["id"]) {
  const tool = TOOL_CONFIGS.find((entry) => entry.id === toolId);

  if (!tool) {
    throw new Error(`Unknown tool: ${toolId}`);
  }

  return tool;
}

export const DASHBOARD_TOOL_IDS = ["idea", "ui", "unity-script", "code", "gdd", "ui-ux-plan", "system-design", "mvp-roadmap"] as const;
export const LANDING_TOOL_IDS = ["idea", "unity-script", "ui", "gdd", "ui-ux-plan", "system-design", "mvp-roadmap"] as const;




