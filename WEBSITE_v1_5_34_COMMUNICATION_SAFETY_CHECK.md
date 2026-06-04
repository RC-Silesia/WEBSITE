# Communication Safety Check

Status: `PASS_WITH_WARNINGS`

- PASS: Public page says the site is an informational visitcard.
- PASS: Public page says ngOs is being developed as organizational back office and is not publicly available at this stage.
- PASS: Public page says no online payments, member panel or login are launched.
- PASS: Facebook is linked by ordinary link only; no Facebook embed or external Facebook script was added.
- PASS: Public data layer no longer exposes the preferred payment operator list.
- PASS: No private governance material was used as page content.

Warnings:

- `governance/` exists in the public repo context/history and `robots.txt` still blocks `/governance/`. Treat as a repository-boundary risk, not page content.
- Historical `CHANGELOG.md` entries still mention P24, AI and governance. They are not live page claims, but remain searchable in the public repository.
- `assets/js/script.js` still contains legacy staging/demo support text mentioning Przelewy24. It is not rendered by the public `index.html`, but it is present in a public asset and should be considered for a later public-bundle cleanup.
- `FACEBOOK_URL_PENDING_CONFIRMATION`: candidate Facebook URL was applied but not independently confirmed during this sprint.
- `DOMAIN_PENDING_CONFIRMATION`: custom production domain was not confirmed.
