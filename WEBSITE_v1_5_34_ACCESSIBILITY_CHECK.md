# Accessibility Check

Status: `PASS_STATIC_AND_FILE_HEADLESS`

Checks:

- PASS: `lang="pl"` present.
- PASS: one main `h1`.
- PASS: skip link present.
- PASS: static WCAG script reports no missing accessible names for links in public `index.html`.
- PASS: accordion controls have `role="button"`, `tabindex="0"`, `aria-expanded`, and valid `aria-controls`.
- PASS: gallery, membership and four-way accordion panels have `role="region"` and controlled `aria-hidden`.
- PASS: focus-visible styles already exist in CSS.
- PASS: `prefers-reduced-motion` handling exists for accordion panels and carousel transitions.
- PASS: no autoplaying media added.
- PASS: no Facebook embed added.

Runtime:

- PASS: file headless clicked gallery, membership and four-way accordions successfully.
- FAIL: local HTTP headless did not complete due Edge harness DOM not being returned.
