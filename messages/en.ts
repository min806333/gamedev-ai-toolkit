const enMessages = {
  landing: {
    hero: {
      badge: "AI Toolkit for Indie Studios",
      title: "Generate game ideas, UI systems, and starter code in one workspace.",
      description:
        "VertikerAI helps solo developers move from concept to playable MVP with structured AI workflows, prompt templates, streaming responses, and generation history.",
      primaryCta: "Start free",
      secondaryCta: "AI Tools"
    },
    preview: {
      label: "Live Output Streaming",
      status: "Streaming",
      codeBlock: `## Mission-Based Roguelite
- Midcore co-op raid loop
- Procedural level goals
- Town progression meta

## Recommended MVP
- 1 biome
- 3 weapons
- 2 boss variants`,
      workspaceNote: "Idea, UI, code and planning in one workspace.",
      productionNote: "Structured outputs built for actual production decisions."
    },
    features: {
      label: "Features",
      title: "Built for developers shipping real games",
      items: [
        {
          title: "Fast Ideation",
          body: "Move from vague concept to testable design direction in minutes instead of days."
        },
        {
          title: "UI-First Planning",
          body: "Generate HUDs, menu structures, and screen flows before production starts."
        },
        {
          title: "Engine-Aware Code",
          body: "Produce starter gameplay code and Unity scripts with implementation context."
        },
        {
          title: "Production Docs",
          body: "Build GDDs, system design docs, and MVP roadmaps without starting from zero."
        }
      ]
    },
    tools: {
      label: "Tools",
      title: "Every workflow from concept to roadmap",
      dashboardCta: "Open the full toolkit",
      openTool: "Open tool",
      items: [
        {
          id: "idea",
          title: "Game Idea Generator",
          description: "Turn a genre, platform, and theme into a polished gameplay concept."
        },
        {
          id: "unity-script",
          title: "Unity Script Generator",
          description: "Create gameplay systems and C# scripts with comments and integration notes."
        },
        {
          id: "ui",
          title: "Game UI Generator",
          description: "Generate HUD structures, menu hierarchies, and visual UX direction."
        },
        {
          id: "gdd",
          title: "Game Design Document Generator",
          description: "Draft full game design documents with scope, loops, and production risks."
        },
        {
          id: "system-design",
          title: "System Design Generator",
          description: "Map progression, economy, ranking, rewards, and live systems."
        },
        {
          id: "mvp-roadmap",
          title: "MVP Roadmap Generator",
          description: "Break features into an execution plan your team can actually ship."
        }
      ]
    },
    examples: {
      label: "Example Outputs",
      title: "Structured outputs your team can use immediately",
      items: [
        {
          label: "Game Idea",
          title: "Cozy Relic Merge Adventure",
          body: `- Restore a floating museum with puzzle expeditions
- Monetization: seasonal pass + cosmetics
- UI: top bar currency, central merge board, bottom boosters`
        },
        {
          label: "Unity Script",
          title: "Player Dash Controller",
          body: `public class PlayerDash : MonoBehaviour {
  public float dashForce = 12f;
  public float cooldown = 1.5f;
}`
        },
        {
          label: "GDD",
          title: "Vertical Slice Plan",
          body: `- Core loop defined
- MVP scope: 1 biome, 3 enemy types, 1 progression hub
- Risks: onboarding friction and content cadence`
        }
      ]
    },
    pricing: {
      label: "Pricing Preview",
      title: "Start free, upgrade when your pipeline grows",
      viewFullPricing: "View full pricing",
      plans: [
        {
          name: "Free",
          price: "$0",
          detail: "5 generations per day",
          items: ["Game ideas", "UI layouts", "Starter code"]
        },
        {
          name: "Pro",
          price: "$12/mo",
          detail: "Unlimited generations + planning tools",
          items: ["GDD generator", "System design", "UI/UX planning"],
          featured: true
        },
        {
          name: "Studio",
          price: "$29/mo",
          detail: "For teams building full production workflows",
          items: ["Everything in Pro", "MVP roadmap", "Monetization planning"]
        }
      ]
    },
    cta: {
      label: "Start Building",
      title: "Give your game team a faster planning and prototyping stack",
      description: "Join VertikerAI to generate concepts, scripts, UI direction and production docs from one place.",
      primaryCta: "Start Free Trial",
      secondaryCta: "Log in"
    }
  }
} as const;

export default enMessages;

