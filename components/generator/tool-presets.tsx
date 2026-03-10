"use client";

import { useLanguage } from "@/components/language-provider";
import { ToolForm } from "@/components/tool-form";

export function GameIdeaGenerator() {
  const { t } = useLanguage();

  return (
    <ToolForm
      title={t.tools.ideaTitle}
      description={t.tools.ideaDescription}
      endpoint="/api/generate/idea"
      templates={[
        {
          label: t.tools.templatePuzzle,
          values: {
            genre: "Puzzle",
            platform: "Mobile",
            theme: "Color-matching dreamscape"
          }
        },
        {
          label: t.tools.templateIdle,
          values: {
            genre: "Idle",
            platform: "iOS and Android",
            theme: "Space mining corporation"
          }
        },
        {
          label: t.tools.templateRpg,
          values: {
            genre: "RPG",
            platform: "PC",
            theme: "Ancient kingdoms and lost magic"
          }
        },
        {
          label: t.tools.templateTowerDefense,
          values: {
            genre: "Tower Defense",
            platform: "PC and mobile",
            theme: "Bio-mechanical invasion"
          }
        }
      ]}
      fields={[
        { name: "genre", label: t.tools.genre, placeholder: t.tools.placeholders.ideaGenre },
        { name: "platform", label: t.tools.platform, placeholder: t.tools.placeholders.ideaPlatform },
        { name: "theme", label: t.tools.theme, placeholder: t.tools.placeholders.ideaTheme }
      ]}
    />
  );
}

export function UnityScriptGenerator() {
  const { t } = useLanguage();

  return (
    <ToolForm
      title={t.tools.unityTitle}
      description={t.tools.unityDescription}
      endpoint="/api/generate/unity-script"
      templates={[
        {
          label: t.tools.templatePuzzle,
          values: {
            scriptType: "Grid Manager",
            gameGenre: "Puzzle",
            extraFeatures: "Tile swapping, combo detection, score feedback"
          }
        },
        {
          label: t.tools.templateIdle,
          values: {
            scriptType: "Offline Reward System",
            gameGenre: "Idle",
            extraFeatures: "Server-safe timestamp checks, reward popup, bonus multipliers"
          }
        },
        {
          label: t.tools.templateRpg,
          values: {
            scriptType: "Player Combat Controller",
            gameGenre: "RPG",
            extraFeatures: "Combo attacks, stamina usage, hit reactions"
          }
        },
        {
          label: t.tools.templateTowerDefense,
          values: {
            scriptType: "Tower Targeting System",
            gameGenre: "Tower Defense",
            extraFeatures: "Priority targeting, range gizmos, upgrade hooks"
          }
        }
      ]}
      fields={[
        {
          name: "scriptType",
          label: t.tools.scriptType,
          type: "select",
          placeholder: t.tools.placeholders.unityScriptType,
          options: [
            t.tools.options.playerMovement,
            t.tools.options.enemyAi,
            t.tools.options.cameraController,
            t.tools.options.inventorySystem
          ]
        },
        { name: "gameGenre", label: t.tools.gameGenre, placeholder: t.tools.placeholders.unityGameGenre },
        {
          name: "extraFeatures",
          label: t.tools.extraFeatures,
          type: "textarea",
          placeholder: t.tools.placeholders.unityExtraFeatures
        }
      ]}
    />
  );
}

export function GameUiGenerator() {
  const { t } = useLanguage();

  return (
    <ToolForm
      title={t.tools.uiTitle}
      description={t.tools.uiDescription}
      endpoint="/api/generate/ui"
      templates={[
        {
          label: t.tools.templatePuzzle,
          values: {
            gameType: "Puzzle Merge",
            style: "Bright mobile-first UI",
            theme: "Magic relic workshop"
          }
        },
        {
          label: t.tools.templateIdle,
          values: {
            gameType: "Idle Tycoon",
            style: "Clean sci-fi management HUD",
            theme: "Orbital mining station"
          }
        },
        {
          label: t.tools.templateRpg,
          values: {
            gameType: "Action RPG",
            style: "Dark fantasy layered HUD",
            theme: "Forgotten moon temple"
          }
        },
        {
          label: t.tools.templateTowerDefense,
          values: {
            gameType: "Tower Defense",
            style: "Readable tactical battlefield UI",
            theme: "Biomechanical wasteland"
          }
        }
      ]}
      fields={[
        { name: "gameType", label: t.tools.gameType, placeholder: t.tools.placeholders.uiGameType },
        { name: "style", label: t.tools.style, placeholder: t.tools.placeholders.uiStyle },
        { name: "theme", label: t.tools.theme, placeholder: t.tools.placeholders.uiTheme }
      ]}
    />
  );
}

export function PixelArtGenerator() {
  const { language } = useLanguage();

  const copy =
    language === "ko"
      ? {
          title: "픽셀 아트 생성기",
          description: "인디 게임용 픽셀 아트 프롬프트, 장면 방향성, 색상 분위기, 제작 메모를 한 번에 정리합니다.",
          theme: "테마",
          style: "픽셀 스타일",
          palette: "팔레트",
          resolution: "해상도",
          themePlaceholder: "비 오는 사이버 골목과 홀로그램 상점가",
          stylePlaceholder: "16비트 네온 도시, 선명한 실루엣, 부드러운 디더링",
          palettePlaceholder: "청록, 마젠타, 보라, 어두운 남색",
          resolutionPlaceholder: "32x32 character sprite, 256x144 environment scene"
        }
      : {
          title: "Pixel Art Generator",
          description:
            "Generate pixel art prompts, scene direction, color mood, and production notes for your next indie game.",
          theme: "Theme",
          style: "Pixel style",
          palette: "Palette",
          resolution: "Resolution",
          themePlaceholder: "Rainy cyber alley with hologram storefronts",
          stylePlaceholder: "16-bit neon city, crisp silhouettes, soft dithering",
          palettePlaceholder: "Teal, magenta, violet, deep navy",
          resolutionPlaceholder: "32x32 character sprite, 256x144 environment scene"
        };

  return (
    <ToolForm
      title={copy.title}
      description={copy.description}
      endpoint="/api/generate/pixel-art"
      templates={[
        {
          label: language === "ko" ? "퍼즐" : "Puzzle",
          values: {
            theme: "Restoration workshop full of magical relics",
            style: "Pastel 16-bit interiors, soft glow, readable objects",
            palette: "Mint, cream, peach, muted gold",
            resolution: "32x32 characters, 320x180 gameplay mockup"
          }
        },
        {
          label: "RPG",
          values: {
            theme: "Moonlit ruins with ancient statues and drifting fog",
            style: "SNES-inspired fantasy palette, dramatic lighting, layered depth",
            palette: "Indigo, silver, moss green, moonlit blue",
            resolution: "48x48 character sprites, 427x240 environment frame"
          }
        },
        {
          label: language === "ko" ? "생존" : "Survival",
          values: {
            theme: "Collapsed rooftop shelter above an overgrown city",
            style: "Muted post-apocalyptic tileset, worn textures, sparse contrast",
            palette: "Dusty olive, rust, concrete gray, faded amber",
            resolution: "64x64 hero sprite, 384x216 environment concept"
          }
        }
      ]}
      fields={[
        { name: "theme", label: copy.theme, placeholder: copy.themePlaceholder }
        ,
        { name: "style", label: copy.style, placeholder: copy.stylePlaceholder },
        { name: "palette", label: copy.palette, placeholder: copy.palettePlaceholder },
        { name: "resolution", label: copy.resolution, placeholder: copy.resolutionPlaceholder }
      ]}
    />
  );
}

export function GddGenerator() {
  const { t } = useLanguage();

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
        { name: "gameGenre", label: t.tools.gameGenre, placeholder: t.tools.placeholders.gddGameGenre },
        { name: "platform", label: t.tools.platform, placeholder: t.tools.placeholders.gddPlatform },
        { name: "theme", label: t.tools.theme, placeholder: t.tools.placeholders.gddTheme },
        { name: "targetAudience", label: t.tools.targetAudience, placeholder: t.tools.placeholders.gddTargetAudience },
        { name: "monetizationModel", label: t.tools.monetizationModel, placeholder: t.tools.placeholders.gddMonetizationModel },
        { name: "coreDifferentiation", label: t.tools.coreDifferentiation, placeholder: t.tools.placeholders.gddCoreDifferentiation },
        { name: "playerMode", label: t.tools.playerMode, placeholder: t.tools.placeholders.gddPlayerMode },
        { name: "sessionLength", label: t.tools.sessionLength, placeholder: t.tools.placeholders.gddSessionLength }
      ]}
    />
  );
}
