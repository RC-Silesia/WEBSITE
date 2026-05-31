# WCAG Defect Register

Priorytety:

- P0 - blocker;
- P1 - poważna bariera;
- P2 - utrudnienie z obejściem;
- P3 - poprawka jakościowa.

| ID | Data | Lokalizacja | Bariera | Kryterium WCAG | Priorytet | Status | Właściciel | Termin | Uwagi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A11Y-INIT-001 | 2026-05-31 | Publiczny staging | Brak pełnego audytu eksperckiego WCAG 2.2 AA, więc nie deklarujemy pełnej zgodności. | Wszystkie właściwe kryteria WCAG 2.2 AA | P2 | Otwarte | Zarząd / zespół www | Do ustalenia | Gate statyczny wdrożony jako pierwsza techniczna kontrola regresji. |
| A11Y-STATIC-001 | 2026-05-31 | `index.html:1476` | Pole honeypot formularza kontaktowego ma `type="text"` i nie ma `label`, `aria-label` ani `aria-labelledby`. | 1.3.1 Info and Relationships / 4.1.2 Name, Role, Value | P2 | Otwarte | Zespół www | Następny sprint naprawczy | Wykryte przez `scripts/wcag-static-check.mjs`. Nie naprawiane w commicie governance zgodnie z zakresem A11Y-1. |
