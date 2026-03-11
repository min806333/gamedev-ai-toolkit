"use client";

import { ToolRenderer } from "@/components/generator/ToolRenderer";

export function GameIdeaGenerator() {
  return <ToolRenderer toolId="idea" />;
}

export function UnityScriptGenerator() {
  return <ToolRenderer toolId="unity-script" />;
}

export function GameUiGenerator() {
  return <ToolRenderer toolId="ui" />;
}

export function PixelArtGenerator() {
  return <ToolRenderer toolId="pixel-art" />;
}

export function GddGenerator() {
  return <ToolRenderer toolId="gdd" />;
}
