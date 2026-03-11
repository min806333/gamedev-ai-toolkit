export function getEnv(name: string) {
  return process.env[name];
}

export function getRequiredEnv(name: string) {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}
