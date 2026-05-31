# WCAG baseline audit v0.1

Status: raport bazowy techniczny, nie pełny audyt ekspercki WCAG 2.2 AA.

Data wykonania: 2026-05-31

Commit audytowany: `9d6d1e0b06fb13aee0a28d83d3bb6456e0fca6cb`

Wersja strony / cache-bust: `1.5.76`

Repozytorium: `RC-Silesia/WEBSITE`

## Zakres stron

- `index.html`
- `rotary-for-planet.html`
- `privacy.html`
- `newsletter-preview.html`
- `mlodziez-wymiana.html`
- `mlodziez-rotaract.html`

## Zakres viewportów

- 320 px
- 375 px
- 768 px
- 1024 px
- 1280 px

## Narzędzia

- `npm run check:governance`
- `node --check assets/js/script.js`
- `node --check scripts/wcag-static-check.mjs`
- `node scripts/wcag-static-check.mjs`
- Headless Microsoft Edge przez Chrome DevTools Protocol, bez zewnętrznych bibliotek:
  - smoke test poziomego overflow dla 6 stron x 5 viewportów;
  - podstawowy smoke test klawiatury: pierwszy `Tab` na każdej stronie.

Nie wykonano w tym sprincie:

- Lighthouse: narzędzie nie było dostępne lokalnie.
- pa11y: narzędzie nie było dostępne lokalnie.
- axe-core: brak lokalnej zależności `axe-core`, nie dodawano nowych bibliotek w ramach raportu bazowego.

## Wyniki governance gate

`npm run check:governance`: PASS

Zakres statycznego gate:

- `lang="pl"`
- obecność `main`
- dokładnie jeden `h1`
- `alt` przy obrazach
- dostępne nazwy linków
- brak `javascript:void(0)`
- brak inline event handlerów
- spójność `aria-controls`
- wymagania dla `data-disclosure-toggle`
- `role="button"` z `tabindex="0"`
- kontrola formularzy i kontrolowany wyjątek honeypotu
- `noindex,nofollow` na wszystkich stronach stagingowych objętych testem
- `robots.txt` z `Disallow: /`
- brak przypisania do `innerHTML` w `assets/js/script.js`

## Wyniki headless smoke

Mobile / reflow / overflow:

- `index.html`: PASS dla 320, 375, 768, 1024, 1280 px
- `rotary-for-planet.html`: PASS dla 320, 375, 768, 1024, 1280 px
- `privacy.html`: PASS dla 320, 375, 768, 1024, 1280 px
- `newsletter-preview.html`: PASS dla 320, 375, 768, 1024, 1280 px
- `mlodziez-wymiana.html`: PASS dla 320, 375, 768, 1024, 1280 px
- `mlodziez-rotaract.html`: PASS dla 320, 375, 768, 1024, 1280 px

Podstawowy smoke test klawiatury:

- pierwszy `Tab` na każdej stronie przenosi fokus na skip-link `Przejdź do treści`;
- wynik: PASS dla wszystkich 6 stron.

## Lista wykrytych barier

W tym baseline technicznym nie wykryto nowych automatycznych barier P0/P1/P2/P3.

Pozostaje znane ograniczenie governance:

- `A11Y-INIT-001`: brak pełnego audytu eksperckiego WCAG 2.2 AA. Status: otwarte.

## Problemy wymagające testu manualnego

Poniższe obszary wymagają testu manualnego albo narzędziowego w kolejnych sprintach:

- pełna obsługa klawiaturą wszystkich akordeonów, zakładek, disclosure i formularzy;
- widoczność fokusu w scenariuszach rzeczywistej nawigacji, nie tylko pierwszy `Tab`;
- test z czytnikiem ekranu dla karuzeli, akordeonów, formularzy, alertów i treści dynamicznych;
- kontrast tekstu i stanów hover/focus w całym serwisie;
- powiększenie 200% / 400% i reflow zgodnie z WCAG;
- formularze: walidacja, komunikaty błędów, grupy pól, wymagane zgody;
- dokumenty DOCX/PDF do pobrania;
- multimedia i przyszłe embed-y społecznościowe;
- przyszłe płatności i Przelewy24;
- przyszły CMS i panel administracyjny.

## Rekomendowany backlog naprawczy

1. A11Y-3: uruchomić axe albo pa11y jako drugi automatyczny gate, najlepiej bez zmiany produkcyjnego kodu strony.
2. A11Y-4: dodać Lighthouse accessibility baseline do procesu raportowego albo CI.
3. A11Y-5: wykonać manualny keyboard smoke test dla wszystkich interaktywnych wzorców.
4. A11Y-6: wykonać test z czytnikiem ekranu dla karuzeli, akordeonów, formularzy i komunikatów statusu.
5. A11Y-7: przeprowadzić kontrast i reflow/zoom 200-400%.
6. A11Y-8: audyt dokumentów do pobrania i przyszłych elementów płatności.

## Zastrzeżenie

Ten raport jest technicznym baseline po wdrożeniu zielonego static gate. Nie jest pełnym audytem eksperckim WCAG 2.2 AA i nie stanowi deklaracji pełnej zgodności strony.
