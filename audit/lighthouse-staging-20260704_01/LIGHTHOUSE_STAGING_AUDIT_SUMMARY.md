# RC Silesia Staging Lighthouse Audit

Status:

```text
LIGHTHOUSE_STAGING_REPORT_CAPTURED /
MOBILE_RUN_COMPLETED_WITH_REPORT_FILES /
A11Y_FINDINGS_PRESENT_REVIEW_REQUIRED /
BEST_PRACTICES_NO_CRITICAL_BROWSER_SECURITY_FINDINGS /
SEO_NOINDEX_EXPECTED_FOR_STAGING /
NOT_PRODUCTION_READY
```

## Scope

- URL: `http://127.0.0.1:8765/staging/index.html`
- Source file: `staging/index.html`
- Mode: mobile
- Lighthouse: `13.4.0`
- Browser host user agent: `HeadlessChrome/150.0.0.0 ... Edg/150.0.0.0`
- Network user agent: Android mobile emulation, Chrome `150.0.0.0`
- Fetch time: `2026-07-04T19:27:14.769Z`
- Local server: `python -m http.server 8765 --bind 127.0.0.1`

Generated reports:

- `lighthouse-staging-mobile.report.json`
- `lighthouse-staging-mobile.report.html`

Note: Lighthouse wrote both report files, then the CLI exited non-zero while removing its temporary browser directory (`EPERM`). The report artifacts are present and were parsed from JSON. Treat the CLI cleanup error as an environment residual, not as production readiness.

## Scores

```text
Performance: 80
Accessibility: 94
Best Practices: 100
SEO: 61
```

Key metrics:

```text
FCP: 2.1 s
LCP: 4.9 s
CLS: 0
TBT: 0 ms
Speed Index: 2.2 s
```

## Criteria Assessment

Accessibility:

```text
A11Y_FINDINGS_PRESENT_REVIEW_REQUIRED
```

Lighthouse reported three accessibility findings:

- `link-in-text-block`: a formal-section link relies on color without enough visual distinction.
- `list`: the hero carousel uses a `ul` with direct children carrying `role=group`, which Lighthouse flags as invalid list structure.
- `label-content-name-mismatch`: two partner links have visible text not included in their accessible names.

Best Practices:

```text
BEST_PRACTICES_NO_CRITICAL_BROWSER_SECURITY_FINDINGS
```

Score is `100`; no failed Best Practices audits were reported.

Performance:

```text
PERFORMANCE_STAGING_ACCEPTABLE_WITH_LCP_FOLLOW_UP
```

Score is `80`. `CLS=0` and `TBT=0 ms` are clean. `LCP=4.9 s` and main-thread work need follow-up before any production claim.

SEO:

```text
SEO_NOINDEX_EXPECTED_FOR_STAGING
```

SEO score is reduced by intentional staging guardrails:

- `Page is blocked from indexing`: expected, because staging uses `noindex,nofollow,noarchive`.
- `Links are not crawlable`: primarily disabled placeholder social links in the staging prototype.

Do not treat this as production SEO failure. Do not report SEO production readiness from this run.

## Final Boundary

This audit captures a real Lighthouse mobile report for staging preview. It does not approve production deployment, final content, legal/RODO readiness, image-consent clearance, final asset pipeline, or verified production SEO.
