export const PRODUCTION_ORIGIN = "https://eldotz.com";

export function resolveSiteOrigin({ siteUrl = "", vercelEnv } = {}) {
  // Preview deployments must not enter the index, even with inherited env vars.
  if (vercelEnv === "preview") return null;
  const value = siteUrl.trim() || PRODUCTION_ORIGIN;
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error(
      "SITE_URL must be an HTTPS origin with no credentials, subpath, query, or fragment.",
    );
  }
  return url.origin;
}
