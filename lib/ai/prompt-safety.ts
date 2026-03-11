const BLOCKED_PHRASES = [
  "ignore previous instructions",
  "reveal system prompt",
  "show hidden prompt"
];

export function containsBlockedPromptInstruction(prompt: string) {
  const normalized = prompt.toLowerCase();

  return BLOCKED_PHRASES.some((phrase) => normalized.includes(phrase));
}

