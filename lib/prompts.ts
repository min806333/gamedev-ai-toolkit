export function buildIdeaPrompt(input: {
  genre: string;
  platform: string;
  theme: string;
  languageInstruction?: string;
}) {
  return `
You are a senior game design consultant for indie developers.
${input.languageInstruction ?? "Respond in English."}
Create a concise but production-usable concept for a game with:
- Genre: ${input.genre}
- Platform: ${input.platform}
- Theme: ${input.theme}

Return markdown with these sections:
1. Game Concept
2. Gameplay Loop
3. Monetization Strategy
4. UI Layout
  `.trim();
}

export function buildUiPrompt(input: {
  gameType: string;
  style: string;
  theme: string;
  languageInstruction?: string;
}) {
  return `
You are a game UI/UX director.
${input.languageInstruction ?? "Respond in English."}
Design a UI direction for:
- Game Type: ${input.gameType}
- Style: ${input.style}
- Theme: ${input.theme}

Return markdown with these sections:
1. UI Description
2. Layout Structure
3. Design Suggestions
  `.trim();
}

export function buildCodePrompt(input: {
  gameType: string;
  engine: string;
  language: string;
  languageInstruction?: string;
}) {
  return `
You are an expert gameplay engineer.
${input.languageInstruction ?? "Respond in English."}
Generate a starter implementation for:
- Game Type: ${input.gameType}
- Engine: ${input.engine}
- Language: ${input.language}

Return markdown with these sections:
1. Starter Project Structure
2. Core Gameplay Code
3. Implementation Notes

Keep the code practical and compact for an MVP.
  `.trim();
}

export function buildUnityScriptPrompt(input: {
  scriptType: string;
  gameGenre: string;
  extraFeatures: string;
  languageInstruction?: string;
}) {
  return `
You are a senior Unity gameplay engineer.
${input.languageInstruction ?? "Respond in English."}
Generate a clean Unity C# script with comments for:
- Script Type: ${input.scriptType}
- Game Genre: ${input.gameGenre}
- Extra Features: ${input.extraFeatures}

Return markdown with these sections:
1. Unity Script
2. Main Variables Explained
3. Integration Notes

The script should be practical, readable, and ready to adapt in a real project.
  `.trim();
}

export function buildGddPrompt(input: {
  gameGenre: string;
  platform: string;
  theme: string;
  targetAudience: string;
  monetizationModel: string;
  coreDifferentiation: string;
  playerMode: string;
  sessionLength: string;
  languageInstruction?: string;
}) {
  return `
You are a lead game designer writing a premium planning document for a game team.
${input.languageInstruction ?? "Respond in English."}
Create a Game Design Document outline for:
- Game Genre: ${input.gameGenre}
- Platform: ${input.platform}
- Theme: ${input.theme}
- Target Audience: ${input.targetAudience}
- Monetization Model: ${input.monetizationModel}
- Core Differentiation: ${input.coreDifferentiation}
- Multiplayer or Single Player: ${input.playerMode}
- Session Length: ${input.sessionLength}

Return markdown with these sections:
1. Game Overview
2. Core Gameplay Loop
3. Core Mechanics
4. Progression Structure
5. Monetization Strategy
6. Differentiation
7. MVP Scope
8. Risks and Challenges
  `.trim();
}

export function buildUiUxPlanningPrompt(input: {
  gameGenre: string;
  platform: string;
  artStyle: string;
  coreMode: string;
  monetizationModel: string;
  languageInstruction?: string;
}) {
  return `
You are a senior game UI/UX planner creating a production-ready planning document.
${input.languageInstruction ?? "Respond in English."}
Create a UI/UX planning document for:
- Game Genre: ${input.gameGenre}
- Platform: ${input.platform}
- Art Style: ${input.artStyle}
- Core Mode: ${input.coreMode}
- Monetization Model: ${input.monetizationModel}

Return markdown with these sections:
1. Screen List
2. User Flow
3. Main Lobby Structure
4. In-game HUD Layout
5. Result Screen Layout
6. Popup Structure
7. Button/Component Descriptions
8. UX Recommendations
  `.trim();
}

export function buildSystemDesignPrompt(input: {
  gameGenre: string;
  coreMechanic: string;
  metaProgression: string;
  currencyTypes: string;
  eventSystem: string;
  leaderboardNeeds: string;
  languageInstruction?: string;
}) {
  return `
You are a live game systems designer documenting the core product systems for a team.
${input.languageInstruction ?? "Respond in English."}
Create a system design document for:
- Game Genre: ${input.gameGenre}
- Core Mechanic: ${input.coreMechanic}
- Meta Progression: ${input.metaProgression}
- Currency Types: ${input.currencyTypes}
- Event System: ${input.eventSystem}
- Ranking or Leaderboard Needs: ${input.leaderboardNeeds}

Return markdown with these sections:
1. Main Systems
2. Progression Systems
3. Economy Design
4. Ranking Structure
5. Reward Design
6. Daily/Weekly Systems
  `.trim();
}

export function buildMvpRoadmapPrompt(input: {
  teamSize: string;
  engine: string;
  targetLaunchPeriod: string;
  priorityFeatures: string;
  revenueModel: string;
  languageInstruction?: string;
}) {
  return `
You are a game production lead creating an MVP delivery roadmap.
${input.languageInstruction ?? "Respond in English."}
Create an MVP roadmap for:
- Team Size: ${input.teamSize}
- Engine: ${input.engine}
- Target Launch Period: ${input.targetLaunchPeriod}
- Priority Features: ${input.priorityFeatures}
- Revenue Model: ${input.revenueModel}

Return markdown with these sections:
1. Must-have Features
2. Nice-to-have Features
3. 4-week Roadmap
4. Technical Priorities
5. Production Risks
  `.trim();
}
