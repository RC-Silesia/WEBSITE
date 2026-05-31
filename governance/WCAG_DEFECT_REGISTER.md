# WCAG Defect Register

Priorytety:

- P0 - blocker;
- P1 - poważna bariera;
- P2 - utrudnienie z obejściem;
- P3 - poprawka jakościowa.

| ID | Data | Lokalizacja | Bariera | Kryterium WCAG | Priorytet | Status | Właściciel | Termin | Uwagi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A11Y-INIT-001 | 2026-05-31 | Publiczny staging | Brak pełnego audytu eksperckiego WCAG 2.2 AA, więc nie deklarujemy pełnej zgodności. | Wszystkie właściwe kryteria WCAG 2.2 AA | P2 | Otwarte | Zarząd / zespół www | Do ustalenia | Gate statyczny wdrożony jako pierwsza techniczna kontrola regresji. A11Y-2 baseline techniczny wykonany 2026-05-31; nie wykrył nowych automatycznych barier, ale pełny audyt ekspercki, czytniki ekranu, kontrast, reflow, dokumenty, płatności i CMS nadal wymagają osobnej weryfikacji. |
| A11Y-STATIC-001 | 2026-05-31 | `index.html:1476` | Pole honeypot formularza kontaktowego ma `type="text"` i nie ma `label`, `aria-label` ani `aria-labelledby`. | 1.3.1 Info and Relationships / 4.1.2 Name, Role, Value | P2 | resolved / false positive | Zespół www | 2026-05-31 | Honeypot formularza kontaktowego jest kontrolowanym polem antyspamowym, wyłączonym z drzewa dostępności przez `aria-hidden="true"` i z sekwencji fokusu przez `tabindex="-1"`. Brak label nie jest barierą dla użytkownika. Dostosowano test statyczny tak, aby zwykłe pola nadal wymagały etykiet, a wyjątek dotyczył wyłącznie poprawnie oznaczonych honeypotów. |
