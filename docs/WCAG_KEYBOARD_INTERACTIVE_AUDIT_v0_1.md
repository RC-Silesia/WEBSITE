# WCAG keyboard and interactive components audit v0.1

Status: raport techniczny keyboard smoke / interactive components, nie pełny audyt ekspercki WCAG 2.2 AA.

Data wykonania: 2026-05-31

Commit audytowany: `7846f98fab121c959f492fcf37389c95edb209c7`

Wersja strony / cache-bust: `1.5.81`

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

## Zakres komponentów

- skip-link;
- menu główne i widok mobilny;
- CTA i linki w hero;
- Test Czterech Pytań - 4 akordeony;
- Obszary działania Rotary - 7 akordeonów;
- panel źródeł i materiałów ROTARY for PLANET;
- karty Zarządu;
- sekcja Polityki i standardy;
- sekcja Wpłaty i wsparcie;
- formularz kontaktowy;
- linki do dokumentów;
- przyciski w `.planet-actions`;
- podstrony młodzieżowe i ich główne linki / CTA;
- akordeony na `rotary-for-planet.html`.

## Narzędzia

- `npm run check:governance`;
- `node scripts/wcag-static-check.mjs`;
- `node scripts/governance-metadata-check.mjs`;
- Headless Microsoft Edge przez Chrome DevTools Protocol, bez zewnętrznych bibliotek:
  - smoke test pierwszego `Tab`;
  - smoke test sekwencji `Tab`;
  - smoke test `Shift+Tab`;
  - aktywacja elementów `role="button"` przez `Enter` i `Space`;
  - kontrola zmian `aria-expanded`;
  - kontrola poziomego overflow przed i po interakcji z disclosure.

Nie dodano nowych zależności npm. Tymczasowy skrypt headless był narzędziem roboczym i nie jest częścią commita.

## Co sprawdzono automatycznie

- pierwszy `Tab` na każdej stronie prowadzi do skip-linka `Przejdź do treści`;
- `Tab` przechodzi przez elementy fokusowalne bez wykrytej pułapki;
- `Shift+Tab` cofa fokus;
- elementy `role="button"` z `aria-expanded` reagują na `Enter` i `Space`;
- `aria-expanded` zmienia stan po aktywacji i wraca po ponownej aktywacji;
- na 320, 375, 768, 1024 i 1280 px nie wykryto poziomego overflow przed interakcją;
- po rozwinięciu/zwinięciu testowanych disclosure nie wykryto poziomego overflow;
- statyczny WCAG gate nadal przechodzi;
- governance metadata gate nadal przechodzi.

## Wyniki per strona

| Strona | Viewporty | Wynik headless keyboard smoke |
| --- | --- | --- |
| `index.html` | 320 / 375 / 768 / 1024 / 1280 | PASS |
| `rotary-for-planet.html` | 320 / 375 / 768 / 1024 / 1280 | PASS |
| `privacy.html` | 320 / 375 / 768 / 1024 / 1280 | PASS |
| `newsletter-preview.html` | 320 / 375 / 768 / 1024 / 1280 | PASS |
| `mlodziez-wymiana.html` | 320 / 375 / 768 / 1024 / 1280 | PASS |
| `mlodziez-rotaract.html` | 320 / 375 / 768 / 1024 / 1280 | PASS |

## Wyniki per komponent

| Komponent | Wynik | Uwagi |
| --- | --- | --- |
| Skip-link | PASS | Pierwszy `Tab` trafia w skip-link na wszystkich stronach i viewportach. |
| Sekwencja `Tab` | PASS | Wykryto logiczne przechodzenie po elementach fokusowalnych; brak automatycznie wykrytej pułapki. |
| `Shift+Tab` | PASS | Fokus cofa się na wszystkich stronach i viewportach. |
| Test Czterech Pytań | PASS | 4 kontrolki `role="button"` reagują na `Enter` i `Space`. |
| Obszary działania Rotary | PASS | 7 kontrolek `role="button"` reaguje na `Enter` i `Space`. |
| ROTARY for PLANET - panel źródeł | PASS | Panel na stronie głównej objęty statycznym gate; szczegółowe akordeony na podstronie przeszły headless smoke. |
| Karty Zarządu | PASS | 4 kontrolki `role="button"` reagują na `Enter` i `Space`. |
| Akordeony galerii i partnerów | PASS | Kontrolki disclosure reagują na `Enter` i `Space`. |
| `rotary-for-planet.html` akordeony | PASS | 4 kontrolki `role="button"` reagują na `Enter` i `Space`. |
| Sekcja Polityki i standardy | PASS_WITH_MANUAL_REVIEW | Sekcja nie zawiera własnych interaktywnych akordeonów; statusy są tekstowe, nie tylko kolorystyczne. Rekomendowana ręczna kontrola czytelności. |
| Wpłaty i wsparcie | PASS_WITH_MANUAL_REVIEW | Static gate i sekwencja Tab przeszły; scenariusze płatności pozostają poza zakresem. |
| Formularz kontaktowy | PASS_WITH_MANUAL_REVIEW | Static gate potwierdza etykiety i kontrolowany honeypot; komunikaty walidacyjne wymagają osobnego testu manualnego. |
| Linki dokumentów i CTA | PASS | Linki mają dostępne nazwy w static gate i są dostępne w sekwencji Tab. |

## Lista wykrytych barier

W A11Y-3 nie wykryto nowych automatycznych barier P0/P1/P2/P3.

Nie dodano nowych wpisów do rejestru barier dostępności.

Pozostaje otwarte:

- `A11Y-INIT-001`: brak pełnego audytu eksperckiego WCAG 2.2 AA. Status pozostaje otwarty do czasu pełnego audytu eksperckiego.

Pozostaje jako ślad audytowy:

- `A11Y-STATIC-001`: resolved / false positive dla kontrolowanego honeypotu.

## Co wymaga testu manualnego

- test z czytnikiem ekranu dla akordeonów, karuzeli, formularzy i komunikatów statusu;
- pełna ocena widoczności fokusu w przeglądarce z realnym użytkownikiem;
- weryfikacja, czy przejście do kotwic nie chowa nagłówków pod sticky headerem;
- formularze: walidacja błędów, komunikaty, grupowanie pól i zgody;
- kontrast i stany hover/focus w całej stronie;
- zoom 200% / 400% i reflow;
- dokumenty DOCX/PDF;
- przyszłe płatności, Przelewy24, CMS i panel administracyjny.

## Rekomendacje naprawcze

1. Nie otwierać jeszcze sprintu naprawczego dla klawiatury, bo smoke test nie wykrył nowych barier blokujących.
2. Utrzymać A11Y-INIT-001 jako otwarte do pełnego audytu eksperckiego.
3. W kolejnym kroku dostępnościowym wykonać test czytnika ekranu oraz kontrast / zoom / reflow 200-400%.
4. Przed sprintem płatności powtórzyć keyboard smoke dla nowych formularzy i panelu skarbnika.

## Zastrzeżenie

Ten raport jest technicznym keyboard / interactive smoke audit. Nie jest pełnym audytem eksperckim WCAG 2.2 AA i nie stanowi deklaracji pełnej zgodności strony.
