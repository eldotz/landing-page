import test from "node:test";
import assert from "node:assert/strict";
import { resolveSiteOrigin, PRODUCTION_ORIGIN } from "./site-origin.mjs";

test("production builds default to the verified live domain", () => {
  assert.equal(
    resolveSiteOrigin({ vercelEnv: "production" }),
    PRODUCTION_ORIGIN,
  );
  assert.equal(
    resolveSiteOrigin({ vercelEnv: "production", siteUrl: " " }),
    PRODUCTION_ORIGIN,
  );
});

test("Vercel previews never inherit indexable production metadata", () => {
  assert.equal(
    resolveSiteOrigin({ vercelEnv: "preview", siteUrl: PRODUCTION_ORIGIN }),
    null,
  );
});

test("ordinary builds cannot silently become noindex when SITE_URL is missing", () => {
  assert.equal(resolveSiteOrigin(), PRODUCTION_ORIGIN);
  assert.equal(
    resolveSiteOrigin({ siteUrl: `${PRODUCTION_ORIGIN}/` }),
    PRODUCTION_ORIGIN,
  );
});

test("invalid canonical URLs fail the build", () => {
  for (const siteUrl of [
    "http://eldotz.com",
    "https://eldotz.com/blog",
    "https://eldotz.com/?a=1",
    "https://eldotz.com/#main",
    "https://name:secret@eldotz.com",
  ]) {
    assert.throws(() => resolveSiteOrigin({ siteUrl }));
  }
});
