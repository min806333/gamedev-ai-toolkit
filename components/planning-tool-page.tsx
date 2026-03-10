"use client";

import { useLanguage } from "@/components/language-provider";
import { ToolForm } from "@/components/tool-form";

type PlanningTool = "gdd" | "ui-ux-planning" | "system-design" | "mvp-roadmap";

export function PlanningToolPage({ tool }: { tool: PlanningTool }) {
  const { t } = useLanguage();

  if (tool === "gdd") {
    return (
      <ToolForm
        title={t.tools.gddTitle}
        description={t.tools.gddDescription}
        endpoint="/api/generate/gdd"
        templates={[
          {
            label: t.tools.templatePuzzle,
            values: {
              gameGenre: "Puzzle",
              platform: "Mobile",
              theme: "Mystic artifact restoration",
              targetAudience: "Women 18-35 who enjoy relaxed progression",
              monetizationModel: "Battle pass + cosmetics",
              coreDifferentiation: "Narrative restoration meta tied to puzzle mastery",
              playerMode: "Single player",
              sessionLength: "5-8 minutes"
            }
          },
          {
            label: t.tools.templateIdle,
            values: {
              gameGenre: "Idle",
              platform: "iOS and Android",
              theme: "Underwater energy colony",
              targetAudience: "Broad casual players",
              monetizationModel: "Ads + starter bundles",
              coreDifferentiation: "Reactive colony automation that changes the map",
              playerMode: "Single player",
              sessionLength: "2-5 minutes"
            }
          },
          {
            label: t.tools.templateRpg,
            values: {
              gameGenre: "RPG",
              platform: "PC",
              theme: "Fallen moon kingdom",
              targetAudience: "Core fantasy RPG players",
              monetizationModel: "Premium box price + DLC",
              coreDifferentiation: "Time-loop party building with evolving class memory",
              playerMode: "Single player",
              sessionLength: "30-45 minutes"
            }
          },
          {
            label: t.tools.templateTowerDefense,
            values: {
              gameGenre: "Tower Defense",
              platform: "PC and mobile",
              theme: "Bio-mechanical frontier war",
              targetAudience: "Strategy players who enjoy short tactical sessions",
              monetizationModel: "Cosmetics + expansion packs",
              coreDifferentiation: "Movable towers and terrain mutation system",
              playerMode: "Single player",
              sessionLength: "10-15 minutes"
            }
          }
        ]}
        fields={[
          { name: "gameGenre", label: t.tools.gameGenre, placeholder: "Action RPG" },
          { name: "platform", label: t.tools.platform, placeholder: "PC + Console" },
          { name: "theme", label: t.tools.theme, placeholder: "Post-apocalyptic sky islands" },
          { name: "targetAudience", label: t.tools.targetAudience, placeholder: "Midcore strategy players aged 18-34" },
          { name: "monetizationModel", label: t.tools.monetizationModel, placeholder: "Premium + cosmetic DLC" },
          { name: "coreDifferentiation", label: t.tools.coreDifferentiation, placeholder: "Tactical runs with persistent city rebuilding" },
          { name: "playerMode", label: t.tools.playerMode, placeholder: "Single player" },
          { name: "sessionLength", label: t.tools.sessionLength, placeholder: "15-20 minutes" }
        ]}
      />
    );
  }

  if (tool === "ui-ux-planning") {
    return (
      <ToolForm
        title={t.tools.uiUxPlanningTitle}
        description={t.tools.uiUxPlanningDescription}
        endpoint="/api/generate/ui-ux-planning"
        templates={[
          {
            label: t.tools.templatePuzzle,
            values: {
              gameGenre: "Puzzle",
              platform: "Mobile",
              artStyle: "Soft magical diorama",
              coreMode: "Level-based merge puzzles",
              monetizationModel: "Cosmetics + hints"
            }
          },
          {
            label: t.tools.templateIdle,
            values: {
              gameGenre: "Idle",
              platform: "Mobile",
              artStyle: "Readable clean sci-fi",
              coreMode: "Passive resource collection",
              monetizationModel: "Ads + starter packs"
            }
          },
          {
            label: t.tools.templateRpg,
            values: {
              gameGenre: "RPG",
              platform: "PC",
              artStyle: "Dark painterly fantasy",
              coreMode: "Party exploration and combat",
              monetizationModel: "Premium"
            }
          },
          {
            label: t.tools.templateTowerDefense,
            values: {
              gameGenre: "Tower Defense",
              platform: "PC and mobile",
              artStyle: "Stylized tactical battlefield",
              coreMode: "Wave defense",
              monetizationModel: "Premium + cosmetics"
            }
          }
        ]}
        fields={[
          { name: "gameGenre", label: t.tools.gameGenre, placeholder: "Tower Defense" },
          { name: "platform", label: t.tools.platform, placeholder: "Mobile" },
          { name: "artStyle", label: t.tools.artStyle, placeholder: "Minimal sci-fi HUD" },
          { name: "coreMode", label: t.tools.coreMode, placeholder: "Session-based co-op raids" },
          { name: "monetizationModel", label: t.tools.monetizationModel, placeholder: "Battle pass + cosmetics" }
        ]}
      />
    );
  }

  if (tool === "system-design") {
    return (
      <ToolForm
        title={t.tools.systemDesignTitle}
        description={t.tools.systemDesignDescription}
        endpoint="/api/generate/system-design"
        templates={[
          {
            label: t.tools.templatePuzzle,
            values: {
              gameGenre: "Puzzle",
              coreMechanic: "Tile matching with chain combos",
              metaProgression: "Room restoration and chapter unlocks",
              currencyTypes: "Soft coins, premium gems, event tokens",
              eventSystem: "Weekend challenge ladders",
              leaderboardNeeds: "Optional score ranking per event"
            }
          },
          {
            label: t.tools.templateIdle,
            values: {
              gameGenre: "Idle",
              coreMechanic: "Automated resource extraction",
              metaProgression: "Factory prestige tiers",
              currencyTypes: "Credits, shards, premium boosts",
              eventSystem: "Limited-time colony events",
              leaderboardNeeds: "Guild contribution ranking"
            }
          },
          {
            label: t.tools.templateRpg,
            values: {
              gameGenre: "RPG",
              coreMechanic: "Party-based action combat",
              metaProgression: "Class unlocks and relic growth",
              currencyTypes: "Gold, relic dust, premium tickets",
              eventSystem: "Seasonal dungeon rotations",
              leaderboardNeeds: "Endgame raid ranking"
            }
          },
          {
            label: t.tools.templateTowerDefense,
            values: {
              gameGenre: "Tower Defense",
              coreMechanic: "Lane defense with movable towers",
              metaProgression: "Commander talents and tower unlocks",
              currencyTypes: "Scrap, energy cores, premium currency",
              eventSystem: "Weekly mutation maps",
              leaderboardNeeds: "High-score leaderboard by map"
            }
          }
        ]}
        fields={[
          { name: "gameGenre", label: t.tools.gameGenre, placeholder: "Idle strategy" },
          { name: "coreMechanic", label: t.tools.coreMechanic, placeholder: "Automated resource chains" },
          { name: "metaProgression", label: t.tools.metaProgression, placeholder: "Prestige loop with permanent tech upgrades" },
          { name: "currencyTypes", label: t.tools.currencyTypes, placeholder: "Gold, gems, guild tokens" },
          { name: "eventSystem", label: t.tools.eventSystem, placeholder: "Weekly boss event with rotating modifiers" },
          { name: "leaderboardNeeds", label: t.tools.leaderboardNeeds, placeholder: "Yes, weekly leaderboard by score and clear speed" }
        ]}
      />
    );
  }

  return (
    <ToolForm
      title={t.tools.mvpRoadmapTitle}
      description={t.tools.mvpRoadmapDescription}
      endpoint="/api/generate/mvp-roadmap"
      templates={[
        {
          label: t.tools.templatePuzzle,
          values: {
            teamSize: "3",
            engine: "Unity",
            targetLaunchPeriod: "8 weeks",
            priorityFeatures: "Core puzzle loop, onboarding, 30 levels, economy hooks",
            revenueModel: "Ads + IAP"
          }
        },
        {
          label: t.tools.templateIdle,
          values: {
            teamSize: "4",
            engine: "Unity",
            targetLaunchPeriod: "10 weeks",
            priorityFeatures: "Offline rewards, economy balancing, progression tuning",
            revenueModel: "Ads + starter bundles"
          }
        },
        {
          label: t.tools.templateRpg,
          values: {
            teamSize: "6",
            engine: "Unity",
            targetLaunchPeriod: "16 weeks",
            priorityFeatures: "Combat prototype, one biome, one boss, progression loop",
            revenueModel: "Premium"
          }
        },
        {
          label: t.tools.templateTowerDefense,
          values: {
            teamSize: "5",
            engine: "Unity",
            targetLaunchPeriod: "12 weeks",
            priorityFeatures: "Wave system, tower upgrade tree, enemy variety, economy",
            revenueModel: "Premium + cosmetics"
          }
        }
      ]}
      fields={[
        { name: "teamSize", label: t.tools.teamSize, placeholder: "4" },
        { name: "engine", label: t.tools.engine, placeholder: "Unity" },
        { name: "targetLaunchPeriod", label: t.tools.targetLaunchPeriod, placeholder: "12 weeks" },
        { name: "priorityFeatures", label: t.tools.priorityFeatures, type: "textarea", placeholder: "Core loop, tutorial, progression, one polished vertical slice" },
        { name: "revenueModel", label: t.tools.revenueModel, placeholder: "Premium + cosmetic DLC" }
      ]}
    />
  );
}
