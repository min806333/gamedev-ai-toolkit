function normalizeUrl(url: string) {
  return url.replace(/\/$/, "");
}

function isLocalhostUrl(url: string) {
  return /localhost(?::\d+)?/i.test(url);
}

export function getBaseUrl(requestUrl?: string) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (configuredUrl) {
    const normalizedConfiguredUrl = normalizeUrl(configuredUrl);

    if (!(process.env.NODE_ENV === "production" && isLocalhostUrl(normalizedConfiguredUrl))) {
      return normalizedConfiguredUrl;
    }
  }

  if (requestUrl) {
    const requestOrigin = new URL(requestUrl).origin;

    if (!(process.env.NODE_ENV === "production" && isLocalhostUrl(requestOrigin))) {
      return requestOrigin;
    }
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://gamedev-ai-toolkit.vercel.app";
}

export function getAppUrl(path = "/", requestUrl?: string) {
  return new URL(path, `${getBaseUrl(requestUrl)}/`).toString();
}
