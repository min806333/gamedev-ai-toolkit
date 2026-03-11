export function getNestedValue(source: Record<string, any>, path: string) {
  return path.split(".").reduce<any>((current, key) => current?.[key], source);
}
