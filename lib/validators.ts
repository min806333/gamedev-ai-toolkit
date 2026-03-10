import { z } from "zod";

export const ideaSchema = z.object({
  genre: z.string().min(2),
  platform: z.string().min(2),
  theme: z.string().min(2)
});

export const uiSchema = z.object({
  gameType: z.string().min(2),
  style: z.string().min(2),
  theme: z.string().min(2)
});

export const codeSchema = z.object({
  gameType: z.string().min(2),
  engine: z.enum(["Unity", "Flutter"]),
  language: z.enum(["C#", "Dart"])
});

export const unityScriptSchema = z.object({
  scriptType: z.string().min(2),
  gameGenre: z.string().min(2),
  extraFeatures: z.string().min(2)
});

export const gddSchema = z.object({
  gameGenre: z.string().min(2),
  platform: z.string().min(2),
  theme: z.string().min(2),
  targetAudience: z.string().min(2),
  monetizationModel: z.string().min(2),
  coreDifferentiation: z.string().min(2),
  playerMode: z.string().min(2),
  sessionLength: z.string().min(2)
});

export const uiUxPlanningSchema = z.object({
  gameGenre: z.string().min(2),
  platform: z.string().min(2),
  artStyle: z.string().min(2),
  coreMode: z.string().min(2),
  monetizationModel: z.string().min(2)
});

export const systemDesignSchema = z.object({
  gameGenre: z.string().min(2),
  coreMechanic: z.string().min(2),
  metaProgression: z.string().min(2),
  currencyTypes: z.string().min(2),
  eventSystem: z.string().min(2),
  leaderboardNeeds: z.string().min(2)
});

export const mvpRoadmapSchema = z.object({
  teamSize: z.string().min(1),
  engine: z.string().min(2),
  targetLaunchPeriod: z.string().min(2),
  priorityFeatures: z.string().min(2),
  revenueModel: z.string().min(2)
});
