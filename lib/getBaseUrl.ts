const DEVELOPMENT_APP_URL = "http://localhost:3000";
const PRODUCTION_APP_URL = "https://gamedev-ai-toolkit.vercel.app";

export function getBaseUrl() {
  let url =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    process.env.VERCEL_URL ??
    (process.env.NODE_ENV === "development" ? DEVELOPMENT_APP_URL : PRODUCTION_APP_URL);

  url = url.replace(/\/$/, "");
  return url.startsWith("http") ? url : `https://${url}`;
}

export function getAppUrl(path = "/") {
  return new URL(path, `${getBaseUrl()}/`).toString();
}
