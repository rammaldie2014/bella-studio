# Bella Studio — production readiness (HU-008)

## Audit

- Installed Angular core: 22.2.1. Standalone browser application, no SSR, server entry, backend or database.
- Builder: @angular/build:application. Production is the default build configuration.
- Build: npm run build. Existing package manager declaration and lockfile: Yarn 1.22.22, yarn.lock.
- Output: dist/bella-studio/browser. angular.json has no explicit outputPath; this is the verified default output, not dist/bella-studio itself.
- Routes: empty Angular route list; the page uses existing fragment targets. No extra rewrites or deployment configuration have been added.
- Existing production minification, output hashing and bundle budgets remain enabled.

## SEO policy and domain-dependent tasks

This is a public demo, so index.html uses noindex, follow. robots.txt permits crawling so search engines can see noindex. Do not use Disallow: / as a substitute for noindex.

The requested Lima title is present, but no physical address, reviews, credentials, LocalBusiness data or unverified business details have been added.

Sitemap generation is deliberately pending: there is no final public domain. Do not publish a sitemap with localhost, placeholders, relative loc URLs or fragment sections.

Once a real HTTPS domain is approved:

1. Decide whether the demo should remain noindex. Change indexing policy only when the real site is intended for search.
2. Create public/sitemap.xml with an XML urlset in the http://www.sitemaps.org/schemas/sitemap/0.9 namespace and one absolute loc for the homepage. No fragment URLs are needed.
3. Add its absolute URL as a Sitemap directive in public/robots.txt.
4. Add the confirmed homepage URL as canonical and og:url.
5. Add a licensed social preview image with an absolute public URL for og:image and twitter:image. Currently summary metadata has no invented image or account URL.
6. Rebuild and verify the generated files and production responses.

## Performance and accessibility

- Hero: same photograph, WebP rather than JPEG, 120556 versus 189749 bytes (36.5% less). Eager/high-priority loading.
- Other content images retain lazy loading, descriptive alt text and intrinsic dimensions; thumbnail CSS sets stable aspect ratios.
- Google Fonts retains preconnect and display=swap. Only used normal weights are requested, with the actual Playfair italic needed by the existing design.
- WhatsApp glyph uses primary brown on its existing green background for non-text contrast.
- Existing semantic headings, labeled fields, visible focus, mobile menu controls, native modal focus behavior and reduced-motion handling remain.
- No new dependencies, architecture changes, deployment commands or third-party analytics.

## Cloudflare Pages preparation only

Use npm run build and publish directory dist/bella-studio/browser. With no top-level 404.html, Pages provides its default SPA fallback; current navigation only uses fragments. No Wrangler, deployment or Cloudflare configuration was executed.

Installed Angular CLI requires Node ^22.22.3, ^24.15.0 or >=26.0.0. Select a compatible version for the remote build environment. Keep yarn.lock for reproducible dependency installation.

## Validation results

- Production build: passed, initial bundle 317.23 kB, estimated transfer 81.67 kB.
- Vitest: 24 tests passed, including menu, portfolio filters, modal lifecycle boundaries, forms, WhatsApp, unique IDs, headings and image alternatives.
- 14 local asset references checked against both public and the generated browser output: no missing files.
- Generated HTML SEO metadata and robots.txt checked successfully.
- WhatsApp primary glyph / green background contrast calculated at 7.05:1.
- Native modal focus containment is not reproduced by jsdom; its browser API is simulated in unit tests.
- No visual browser audit or Lighthouse run was performed. Responsive rules were reviewed in source; actual 375/768/1440px behavior remains to verify.

## Remaining checks before publishing

- Real WhatsApp number and social profile URLs are still unconfigured.
- Replace stock demonstration photographs with authorized business work if this becomes a real commercial portfolio.
- Verify keyboard and native dialog behavior in current browsers.
- Check 375px, 768px and 1440px viewports, image loading, fixed WhatsApp overlap and real-device date inputs.
- Run Lighthouse/Core Web Vitals measurements against the eventual deployed site. No scores are claimed here.

## References

- https://developers.cloudflare.com/pages/configuration/serving-pages/
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
