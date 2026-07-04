# RC Silesia frontend staging preview - assets and consents checklist

Status: STAGING_PREVIEW / NOT_PRODUCTION_READY

This checklist records what must be cleared before any staging preview element can be promoted to the public root. It is not a production release approval.

## Current Site Inventory

- Public root: `index.html`
- Staging preview: `staging/index.html`
- Shared styles: `assets/css/styles.css`
- Prototype staging layer: `assets/css/staging-preview.css`
- Shared script: `assets/js/script.js`
- Static content/data: `assets/data/*.json`
- Images: `assets/img/`
- Source images/video: `src/img/`, `src/video/`
- Public documents: `assets/docs/`
- Staging notes: `STAGING_PREVIEW_NOTES.md`, `STAGING_CHECKLIST.md`

## Promotion Rules

- Public root content must not be replaced by staging content without a separate production decision.
- Formal content, including KRS/NIP/REGON, statutory excerpts, board data, privacy links and public documents, must remain intact unless a formal source correction exists.
- Demo values must be marked before review and removed or formally approved before production.
- Social embeds, analytics, payment widgets and external scripts require consent/cookie review before production.

## Asset Checklist

- [ ] Hero image has approved source, author/license record and publication consent.
- [ ] ROTARY for PLANET images have publication approval and no unsupported environmental claims.
- [ ] Gallery images have image consent for identifiable people.
- [ ] Youth exchange images have extra review for minors and guardianship/consent context.
- [ ] Partner logos and materials have partner approval for web use.
- [ ] Video files have publication clearance, captions plan and fallback text.
- [ ] OG image is final and uses approved branding.
- [ ] WebP/thumbnail derivatives match source files and do not introduce cropped misleading context.

## Consent And Governance Checklist

- [ ] Image consent register exists for all identifiable people.
- [ ] Partner publication approvals are recorded.
- [ ] Privacy/cookie text is final for any forms, embeds, analytics or payment tools.
- [ ] Form routing has an approved data controller/process note.
- [ ] Payment/support module has Treasurer/Board approval before real values or payment gateway use.
- [ ] Newsletter preview remains demo-only until mailing process, lawful basis and unsubscribe flow are approved.
- [ ] Accessibility statement is ready before production.

## Demo Values In Staging

The staging preview currently marks demo values in:

- support amount tiles;
- suggested membership-fee transfer title;
- newsletter preview text;
- media placeholder cards and social placeholders.

These markers are intentional and must not be removed as a cosmetic cleanup unless the values are replaced by approved production content.

## Test Expectations

- `npm run check:staging-preview`
- `npm run check:wcag:static`
- `npm run check:governance`
- mobile smoke review at 360px, 390px and 768px
- Lighthouse Performance/Accessibility/Best Practices/SEO when Lighthouse is available locally or in CI
