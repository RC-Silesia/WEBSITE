# WEBSITE-v1.5.34 Audit Notes

Status: `FAILED_RUNTIME`

Date: 2026-06-04.
Repo: `RC-Silesia/WEBSITE` local checkout at `C:\Users\pkojs\WEBSITE`.

## Pre-flight

- `git status --short`: clean before edits.
- `git pull --ff-only`: already up to date.
- latest commits before edits:
  - `bb210ac Remove private governance materials from public site repo`
  - `a9f0966 Add public formal data and board section`
  - `d3dd768 Restore full working preview at /staging/`
  - `0a37425 Split public one page and staging preview`
  - `e6ca131 Publish signed SOB agreement update`

## Initial State

- Current repo line was `1.5.86`, not a literal `1.5.33` checkout.
- Public `index.html` had cache-bust `1.5.86`.
- `assets/js/script.js` had `DATA_VERSION = "1.5.86"`.
- `CHANGELOG.md` exists and contains v1.5.31, v1.5.32 and later entries.
- Public `index.html` did not contain `#galeria` or `#czlonkostwo`; full versions existed in `staging/index.html`.
- Public motto had the forbidden paraphrase `Służba na rzecz innych ponad własną korzyść`.
- Data layer exists in `assets/data/site.json`; JS renderer exists in `assets/js/script.js`.
- Existing hardening includes `safeHref`, placeholder link hardening, embed guards, iframe `allow` / `referrerpolicy` logic, and static fallback on fetch failure.
- `robots.txt` blocks `/staging/`, `/governance/`, and `/docs/`; public root is indexable.
- Public repo still contains a `governance/` directory path in the checkout history/working tree scan context. It was not used as page content. This remains a communication-boundary risk to monitor.

## Changes

- Corrected public motto to `Służba ponad własny interes` with English label `Service Above Self`.
- Replaced public Test Czterech Pytań copy with official Rotary Polska wording.
- Restored membership section as `#czlonkostwo` with member-card accordions based on v1.5.32.
- Restored gallery as `#galeria` with four thematic accordion cards based on v1.5.31.
- Added ordinary Facebook link section without Facebook embed or external scripts.
- Consolidated Facebook data source to `site.social.facebookUrl`.
- Removed the public data-layer payment operator list from `assets/data/site.json`.
- Added `scripts/check-website-v1-5-34-runtime.mjs` for headless file/HTTP runtime checks.
- Bumped public cache-bust, `DATA_VERSION`, package metadata and changelog to `1.5.87` instead of downgrading the active repo line to `1.5.34`.

## Result

Static validation passed. Headless `file://` runtime passed, including accordion click checks. Headless HTTP runtime failed because local Edge did not return a DOM for the local server test, even after unsandboxed retry.

Final status is therefore `FAILED_RUNTIME`, not `PASS`.
