export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://gamedev-ai-toolkit.vercel.app";
}

export function getAppUrl(path = "/") {
  return new URL(path, `${getBaseUrl()}/`).toString();
}
