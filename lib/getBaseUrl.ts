import { getEnv } from "@/lib/utils/env";

const PRODUCTION_APP_URL = "https://vertikerai.com";
const PRODUCTION_HOSTS = new Set(["vertikerai.com", "www.vertikerai.com"]);

function normalizeUrl(url: string) {
  return url.replace(/\/$/, "");
}

function isLocalhostUrl(url: string) {
  return /localhost(?::\d+)?/i.test(url);
}

function toCanonicalOrigin(url: string) {
  const normalizedUrl = normalizeUrl(url);
  const parsedUrl = new URL(normalizedUrl);

  if (PRODUCTION_HOSTS.has(parsedUrl.host)) {
    return PRODUCTION_APP_URL;
  }

  return parsedUrl.origin;
}

function getRequestOrigin(requestUrl?: string) {
  if (!requestUrl) {
    return null;
  }

  const requestOrigin = toCanonicalOrigin(requestUrl);

  if (getEnv("NODE_ENV") === "production" && isLocalhostUrl(requestOrigin)) {
    return null;
  }

  return requestOrigin;
}

export function getBaseUrl(requestUrl?: string) {
  const requestOrigin = getRequestOrigin(requestUrl);

  if (requestOrigin) {
    return requestOrigin;
  }

  const configuredUrl = getEnv("NEXT_PUBLIC_APP_URL");

  if (configuredUrl) {
    const normalizedConfiguredUrl = toCanonicalOrigin(configuredUrl);

    if (!(getEnv("NODE_ENV") === "production" && isLocalhostUrl(normalizedConfiguredUrl))) {
      return normalizedConfiguredUrl;
    }
  }

  if (getEnv("NODE_ENV") === "development") {
    return "http://localhost:3000";
  }

  return PRODUCTION_APP_URL;
}

export function getAppUrl(path = "/", requestUrl?: string) {
  return new URL(path, `${getBaseUrl(requestUrl)}/`).toString();
}
