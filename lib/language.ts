export function detectLanguageInstruction(input: string) {
  const isKorean = /[가-힣]/.test(input);
  return isKorean ? "Respond in Korean." : "Respond in English.";
}

export function stringifyPromptPayload(payload: Record<string, string>) {
  return JSON.stringify(payload);
}
