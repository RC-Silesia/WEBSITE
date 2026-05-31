# Changelog

## v1.5.89-statute-json-integrity-fix
- naprawiono techniczny duplikat `art_viii` / `statut:art_viii` w `governance/legal/statut.json`, zachowując źródłową etykietę `Artykuł VIII` jako ostrzeżenie numeracji źródła;
- przypisano §22 do unikalnego technicznego artykułu `statut:art_viii_b`;
- rozszerzono `scripts/statute-json-check.mjs` o unikalność i integralność `articles`, `paragraphs` oraz `units`;
- oznaczono `statut:par_33_ballot_by_mailing` jako pojęcie wyprowadzone (`derived_from`, `not_formal_statute_unit`);
- zaktualizowano raport integralności statutu; zmiana governance-only, bez publicznego HTML/CSS/JS i bez cache-bustu.

## v1.5.88-statute-json-integrity-audit
- dodano `scripts/statute-json-check.mjs` jako techniczny gate integralności `governance/legal/statut.json`;
- dopisano hash SHA-256 i rozmiar źródłowego `assets/docs/RC_Silesia_Statut_Final.docx` do metadanych `statut.json`;
- dodano raport `docs/STATUTE_JSON_INTEGRITY_AUDIT_v0_1.md` z wynikiem technicznym GOV-5.1;
- podłączono `check:statute:json` do `npm run check:governance`; zmiana governance-only, bez publicznego HTML/CSS/JS i bez cache-bustu.

## v1.5.87-statute-json
- dodano `governance/legal/statut.json` jako pierwszą maszynową warstwę statutu RC Silesia wygenerowaną z `assets/docs/RC_Silesia_Statut_Final.docx`;
- wprowadzono stabilne odwołania `statut:...`, w tym jednostki paragrafów i bloków `par_X_ust_N`, jako podstawę dla przyszłego egzekwowania `statute_refs`;
- zaktualizowano dokument koncepcyjny e-głosowania tak, aby wskazywał realne identyfikatory z `statut.json`, przy zachowaniu statusu `REVIEW_REQUIRED` / `LEGAL_REVIEW_REQUIRED`;
- zmiana governance-only, bez publicznego HTML/CSS/JS i bez cache-bustu.

## v1.5.86-evoting-concept
- dodano koncepcyjny dokument `governance/legal/EVOTING_CONCEPT_v0_1.md` dla przyszłego modułu e-głosowania RC Silesia / ngOs;
- dodano schema-lite `governance/legal/EVOTING_SCHEMA_DRAFT_v0_1.json` jako projektowy model metadanych głosowania;
- wskazano robocze odniesienia statutowe, w tym `statut:par_33`, oraz twarde ograniczenie: brak backendu oznacza brak wiążącego głosowania;
- zmiana governance-only, bez publicznego HTML/CSS/JS i bez cache-bustu.

## v1.5.85-wcag-keyboard-interactive-audit
- dodano raport A11Y-3 `docs/WCAG_KEYBOARD_INTERACTIVE_AUDIT_v0_1.md` dla klawiatury i komponentów interaktywnych;
- wykonano headless smoke test Edge/CDP dla 6 stron i 5 viewportów bez nowych zależności;
- nie wykryto nowych automatycznych barier P0/P1/P2/P3; `A11Y-INIT-001` pozostaje otwarte do pełnego audytu eksperckiego;
- zmiana raportowa, bez zmian publicznego HTML/CSS/JS i bez cache-bustu.

## v1.5.84-public-policy-json-index
- dodano `governance/public/public_policy_index.json` jako maszynowy indeks publicznego depozytu Polityki i standardy;
- rozszerzono `scripts/governance-metadata-check.mjs` o walidację JSON oraz synchronizację JSON ↔ Markdown;
- dodano zasady `governance/public/PUBLIC_POLICY_INDEX_JSON_RULES_v0_1.md`;
- zmiana governance-only, bez zmian publicznego HTML/CSS/JS i bez cache-bustu.

## v1.5.83-governance-metadata-gate-lifecycle
- doprecyzowano GOV-3 metadata gate o lifecycle statusów dokumentów oraz regułę staging/production;
- dodano twardą walidację przypadku „dokument deklaruje przyjęcie, ale nie ma powiązanej uchwały ani placeholdera”;
- utrzymano staging jako tryb domyślny, w którym projekty i dokumenty `board_approval_required` nie blokują gate'u;
- zmiana governance-only, bez zmian publicznego HTML/CSS/JS i bez cache-bustu.

## v1.5.82-governance-metadata-gate
- dodano pierwszy techniczny gate metadanych `scripts/governance-metadata-check.mjs` dla publicznego depozytu Polityki i standardy;
- gate sprawdza obecność schema-lite, kolumn indeksu publicznego, podstawowe metadane dokumentów oraz zakaz publikacji prywatnych materiałów governance;
- podłączono `check:governance:metadata` do `npm run check:governance`;
- dodano dokumentację `governance/legal/GOVERNANCE_METADATA_GATE_v0_1.md`; zmiana governance-only, bez cache-bustu.

## v1.5.81-public-status-and-legal-draft-notes
- przywrócono publiczny status Polityki Dostępności Cyfrowej jako przyjętej przez Zarząd z tokenami `[UCHWAŁA_NR]` i `[UCHWAŁA_DATA]`;
- usunięto obietnicę pełnej zgodności WCAG i zastąpiono ją informacją, że zgodność nie została jeszcze potwierdzona pełnym audytem;
- oznaczono dokumenty `governance/legal/` jako szkice koncepcyjne, niewdrożony mechanizm i brak podstawy zgodności prawnej;
- podbito cache-bust assetów i danych do `v=1.5.81`.

## v1.5.80-public-policy-status-correction
- skorygowano status Polityki Dostępności Cyfrowej w publicznej sekcji i indeksie na `projekt / do przyjęcia uchwałą Zarządu`;
- doprecyzowano, że przed audytem nie deklarujemy pełnej zgodności WCAG;
- podbito cache-bust assetów i danych do `v=1.5.80`.

## v1.5.80-legal-statute-policy-gate-design
- dodano projekt LegalStatutePolicy Consistency Gate dla spójności statutu, reprezentacji, uchwał, polityk, procedur i CI gates;
- dodano legal corpus ledger, szablon kwartalnego raportu zgodności, wymagania statutu JSON oraz trzy schema-lite dla metadanych polityk, uchwał i warningów;
- powiązano zasady publicznego depozytu polityk z przyszłym LegalStatutePolicy Gate, bez zmian w stronie publicznej i bez cache-bustu.

## v1.5.79-hero-title-break-fix
- poprawiono wizualne łamanie tytułu w hero na `Rotary` / `Klub Silesia`, bez zmiany pełnej nazwy semantycznej i bez zmian w assetach marki.

## v1.5.79-policy-repository-section
- dodano publiczną sekcję `#polityki-standardy` jako indeks polityk, standardów, uchwał i regulaminów organizacyjnych RC Silesia;
- dodano publiczne dokumenty governance dla depozytu polityk oraz koncepcji ngOs Governance Pack;
- podbito cache-bust assetów i danych do `v=1.5.79`.

## v1.5.77-fix-sob-logo-scope
- cofnięto rozsiane użycie logo Śląskiego Ogrodu Botanicznego do zatwierdzonego zakresu: karta partnera, sekcja ROTARY for PLANET i dedykowana strona programu;
- usunięto automatyczne wstawianie logo ŚOB przez JavaScript na podstawie treści;
- podbito cache-bust assetów i danych do `v=1.5.77`.

## v1.5.78-wcag-baseline-audit
- dodano techniczny baseline audit dostępności `docs/WCAG_BASELINE_AUDIT_v0_1.md`;
- udokumentowano wyniki governance gate, headless overflow smoke i podstawowego testu klawiatury;
- zaktualizowano rejestr WCAG bez zmian w kodzie publicznej strony i bez cache-bustu.

## v1.5.77-wcag-youth-pages-noindex-gate
- rozszerzono statyczny gate WCAG o podstrony `mlodziez-wymiana.html` i `mlodziez-rotaract.html`;
- gate sprawdza teraz `noindex,nofollow` również dla podstron YEP i Rotaract;
- zmiana governance-only, bez cache-bustu HTML/CSS/JS.

## v1.5.76-sob-logo-scale-placement
- zmniejszono prezentację logo Śląskiego Ogrodu Botanicznego o 50% do szerokości 110 px;
- dodano dekoracyjne logo ŚOB przy głównych blokach, w których strona mówi o ŚOB i współpracy w ROTARY for PLANET;
- podbito cache-bust assetów i danych do `v=1.5.76`.

## v1.5.75-a11y-honeypot-gate-refinement
- doprecyzowano statyczny gate WCAG dla kontrolowanego honeypotu formularza kontaktowego;
- rozszerzono kontrolę `noindex,nofollow` na wszystkie strony HTML objęte testem statycznym;
- przeklasyfikowano `A11Y-STATIC-001` jako `resolved / false positive` z zachowaniem śladu audytowego.

## v1.5.74-partner-sob-logo-link
- dodano lokalne logo Śląskiego Ogrodu Botanicznego ZS w istniejącej karcie partnera;
- poprawiono link karty ŚOB na stronę internetową Ogrodu i pozostawiono Facebook jako osobny link;
- dodano tekstowy link do Śląskiego Ogrodu Botanicznego przy sekcji ROTARY for PLANET;
- podbito cache-bust assetów i danych do `v=1.5.74`.

## v1.5.73-wcag-governance-ci-gates
- dodano dokumenty governance dla polityki dostępności cyfrowej WCAG 2.2 AA i CI gates;
- dodano statyczny test dostępności `scripts/wcag-static-check.mjs` bez zewnętrznych zależności;
- dodano skrypty npm `check:js`, `check:wcag:static`, `check:governance` i `ci:gates`.

## v1.5.72-rotaract-detail-copy
- zaktualizowano `mlodziez-rotaract.html` do pełnej treści informacyjnej o Rotaract dla młodych dorosłych;
- zachowano jasny status: Rotary Klub Silesia nie prowadzi obecnie aktywnego klubu Rotaract;
- podbito cache-bust assetów i danych do `v=1.5.72`.

## v1.5.71-fix-areas-icons
- usunięto koło obszarów działania Rotary spod siatki `#zasady-rotary`;
- powiększono oficjalne ikony w nagłówkach siedmiu kafli obszarów z 40 px do 60 px;
- podbito cache-bust assetów i danych do `v=1.5.71`.

## v1.5.70-youth-exchange-rye-copy
- zaktualizowano podstronę `mlodziez-wymiana.html` do pełnej treści RYE z akcentem na bezpieczeństwo, budowanie pokoju i rolę RC Silesia;
- ujednolicono tytuł i nagłówek do `Wymiana młodzieży Rotary (RYE)`;
- doprecyzowano oficera wymiany jako `Agnieszka Koniarek-Smorzewska` bez publikacji zdjęcia, prywatnego kontaktu ani CV;
- podbito cache-bust assetów i danych do `v=1.5.70`.

## v1.5.69-chore-versioning-and-consent-hardening
- dopisano regułę ściśle monotonicznego cache-bustu w `DEPLOYMENT.md`;
- doprecyzowano bramkę karuzeli dla zdjęć z małoletnimi: `guardianConsent === true` jest wymagane jako twardy boolean;
- uzupełniono `PRIVACY_RELEASE_CHECKLIST.md` o wymóg pisemnej zgody opiekuna przed `status:"approved"`;
- podbito cache-bust assetów i danych do `v=1.5.69`.

## v1.5.68-areas-of-focus-icons
- dodano siedem oficjalnych ikon Areas of Focus z Rotary Brand Center/WebDAM do nagłówków kafli `#zasady-rotary`;
- dodano dostępne, responsywne polskie koło obszarów działania Rotary pod siatką kafli;
- podbito cache-bust assetów i danych do `v=1.5.68`.

## v1.5.67-carousel-guardian-consent
- wzmocniono bramkę karuzeli: slajdy `photo` z `consent.minorsPresent === true` wymagają teraz także `consent.guardianConsent === true`, poza statusem `approved` i niepustym `image.src`.
- dodano jawne `guardianConsent: false` w domyślnym slajdzie zdjęciowym `assets/data/carousel.json`, więc paczka nadal renderuje placeholder.
- Podbito cache-bust assetów i danych do `v=1.5.67`.

## v1.5.66-youth-pages
- aktywowano kafle w sekcji `#mlodziez` jako dostępne karty-linki prowadzące do osobnych podstron YEP i Rotaract.
- dodano `mlodziez-wymiana.html` z opisem aktywnego programu wymiany młodzieży, rolą RC Silesia, ograniczonym zakresem danych oficera wymiany i notą o wizerunku małoletnich.
- dodano `mlodziez-rotaract.html` jako niezależny placeholder z jasnym statusem braku aktywnego klubu Rotaract przy RC Silesia.
- Podbito cache-bust assetów i danych do `v=1.5.66`.

## v1.5.64-hero-carousel
- dodano dostępną karuzelę pod hero z trybem treściowym i zdjęciowym, statycznym fallbackiem HTML oraz sterowaniem klawiaturą.
- dodano `assets/data/carousel.json` ładowany przez `fetch(...?v=DATA_VERSION)` z fallbackiem na statyczne slajdy.
- wdrożono bramkę wizerunku: slajdy `photo` pokazują realny obraz wyłącznie przy `consent.status === "approved"` i niepustym `image.src`; domyślne dane mają status `pending` i renderują placeholder z linkiem do `privacy.html#wizerunek`.
- Podbito cache-bust assetów i danych do `v=1.5.64`.

## v1.5.63-hero-obszary-jezyk-planet
- hero-lockup-center: rozbito tytuł hero na dwa blokowe wiersze `Rotary Klub` i `Silesia` oraz wyśrodkowano cały wiersz tytułu ze znakiem Rotary.
- obszary-4-3: zmieniono układ kafli `.principles-grid` na 4 + 3 z wyśrodkowanym dolnym rzędem i zachowaniem responsywności 2/1.
- sprint-jezykowy-typografia: ujednolicono półpauzy, polskie cudzysłowy drukarskie i zakres `15–19` wyłącznie w widocznych węzłach tekstowych.
- planet-buttons-green: zmieniono przyciski `.planet-actions` na zieleń `#eef7f1` zgodną z `.planet-principle`, z zielonym hoverem i bez szarych tokenów.
- Podbito cache-bust assetów i danych do `v=1.5.63`.

## v1.5.62-planet-actions-gray
- dodano tokeny Rotary Silver i Smoke (`--gray`, `--gray-strong`) dla neutralnych przycisków programu;
- ujednolicono wygląd wszystkich przycisków `.planet-actions` do granatowego tekstu i obwódki na szarym tle;
- dodano `font: inherit` do bazowej reguły `.button`, aby przyciski `<button>` miały tę samą typografię co linki;
- podbito cache-bust assetów i danych do `v=1.5.62`.

## v1.5.61-hero-lockup-rotary-gear
- przebudowano główny nagłówek hero na lockup: `Rotary Klub Silesia` oraz biały znak Rotary po prawej stronie;
- przeniesiono claim `działamy lokalnie, łączymy globalnie.` do osobnego bloku pod nazwą Klubu i znakiem;
- pozostawiono oficjalny asset zębatki bez deformacji, obrotu i efektów dekoracyjnych;
- podbito cache-bust assetów i danych do `v=1.5.61`.

## v1.5.60-obszary-rotary-akordeony
- przekształcono siedem kafli „Obszary działania Rotary” w sekcji `#zasady-rotary` w dostępne akordeony z wyjaśnieniami obszarów;
- dodano obsługę kliknięcia, Enter/Spacji, `aria-expanded`, `aria-hidden` i `inert` dla kafli `.principle-card`;
- uzupełniono style paneli, focusu i strzałek zgodnie z istniejącym wzorcem akordeonów;
- podbito cache-bust assetów i danych do `v=1.5.60`.

## v1.5.59-youth-logos
- dodano logotypy Rotary Youth Exchange Program i Rotaract Club Silesia nad tytułami kart w sekcji `#mlodziez`;
- osadzono dostarczone przezroczyste pliki PNG w `assets/img/` bez zmian treści merytorycznej sekcji;
- dodano responsywne style `.youth-card-logo`;
- podbito cache-bust assetów i danych do `v=1.5.59`.

## v1.5.58-zarzad-karty-aktywne
- przekształcono karty osób funkcyjnych Zarządu w dostępne akordeony z miejscem na zdjęcie i CV;
- dodano opcjonalne pola `photo` i `cv` do danych Zarządu bez uzupełniania danych osobowych;
- dodano placeholdery zdjęć i CV, obsługę kliknięcia oraz Enter/Spacji, `aria-expanded`, `aria-hidden` i `inert`;
- podbito cache-bust assetów i danych do `v=1.5.58`.

## v1.5.57-test-czterech-pytan-akordeony
- przekształcono cztery kafle Testu Czterech Pytań w dostępne akordeony z wyjaśnieniami pojęć;
- dodano obsługę kliknięcia, Enter/Spacji, `aria-expanded`, `aria-hidden` i `inert` dla nowych kafli;
- uzupełniono style paneli, focusu i strzałek zgodnie z istniejącym wzorcem akordeonów;
- podbito cache-bust assetów i danych do `v=1.5.57`.

## v1.5.56-hero-tytul-skala
- zmniejszono skalę tytułu hero o około 20% i zwiększono odstęp między nazwą Klubu a hasłem;
- usunięto ręczny `<br>` z tytułu hero i dodano kropkę kończącą zdanie;
- podbito cache-bust assetów i danych do `v=1.5.56`.

## v1.5.55-szybkie-poprawki-layout
- poprawiono domyślny kontrast przycisku `.button.secondary` na jasnych tłach, z zachowaniem wariantu hero;
- usunięto pasek KRS/NIP/REGON/adres z hero, dodano KRS/NIP/REGON do górnego paska oraz adres do sekcji Kontakt;
- dodano `scroll-margin-top` dla kotwic sekcji i poprawiono dywiz w linku porozumienia RC Silesia-ŚOB;
- podbito cache-bust assetów i danych do `v=1.5.55`.

## v1.5.54-porozumienie-link-wspolpraca
- dodano link do porozumienia ramowego RC Silesia / ŚOB w panelu współpracy na podstronie ROTARY for PLANET;
- pozostawiono link partnera i sekcję Rejestr nasadzeń bez zmian;
- podbito cache-bust assetów i danych do `v=1.5.54`.

## v1.5.53-kolory-cardinal
- dodano tokeny `--cardinal` i `--cardinal-text` dla czerwieni stanów,
- ujednolicono czerwienie błędów formularzy, statusów i wskaźników mapy do rodziny Rotary Cardinal,
- zachowano ciemniejszy wariant `--cardinal-text` dla tekstu błędów z kontrastem AA,
- podbito cache-bust assetów i danych do `v=1.5.53`.

## v1.5.51-planet-source-panel
- przeniesiono blok `Materiały źródłowe Rotary Polska` do domyślnie zwiniętego panelu w sekcji `#planet`,
- zmieniono akcję `Dowiedz się więcej o programie` na dostępny przycisk rozwijający panel źródeł,
- zmieniono etykietę `Zgłoś lokalizację` na `Zgłoś nasadzenia drzew`,
- podbito cache-bust assetów i danych do `v=1.5.51`.

## v1.5.50-sob-link-facebook
- zmieniono linki Śląskiego Ogrodu Botanicznego na profil Facebook z poprawnym certyfikatem,
- zachowano `target="_blank"` i `rel="noopener noreferrer"` oraz doprecyzowano dostępne nazwy linków,
- wykonano audyt linków zewnętrznych i kotwic wewnętrznych,
- podbito cache-bust assetów i danych do `v=1.5.50`.

## v1.5.49-chevron-kolor
- ustawiono żółty kolor strzałek zwiniętych akordeonów treściowych i granatowy kolor po rozwinięciu,
- dodano płynne przejście `border-color` bez zmiany obrotu, rozmiaru ani pozycji strzałek,
- pozostawiono hamburger menu bez zmian,
- podbito cache-bust assetów i danych do `v=1.5.49`.

## v1.5.48-planet-podstrona
- dodano podstronę `rotary-for-planet.html` z rozwijanymi sekcjami o współpracy ze Śląskim Ogrodem Botanicznym, standardzie nasadzeń, procesie i rejestrze,
- przebudowano `#planet` na przegląd programu z kaflem `Współpraca / Śląski Ogród Botaniczny` i przyciskiem do podstrony,
- przeniesiono z `#planet` szczegóły standardu, procesu, rejestru, mapy demonstracyjnej i zasad komunikacji efektów,
- usunięto z `#planet` panel SOB, którego treść jest teraz w kaflu i na podstronie,
- podbito cache-bust assetów i danych do `v=1.5.48`.

## v1.5.47-sob-link-fix
- poprawiono adres strony Śląskiego Ogrodu Botanicznego na wariant bez `www`,
- usunięto warianty wywołujące ostrzeżenie certyfikatu w linku partnera i panelu ROTARY for PLANET.

## v1.5.47-planet-sob
- dodano rozwijany panel współpracy ze Śląskim Ogrodem Botanicznym w sekcji `#planet`,
- dopisano lekkie odwołania do Ogrodu w kroku `Sadzenie i edukacja` oraz karcie `Dobór gatunku`,
- pozostawiono materiały źródłowe Rotary Polska i pozostałe sekcje bez zmian,
- podbito cache-bust assetów i danych do `v=1.5.47`.

## v1.5.46-partnerzy-linki
- dodano linki do stron internetowych nazwanych partnerów w sekcji `#partnerstwa`,
- pozostawiono placeholdery list partnerów bez nazw i bez linków,
- podbito cache-bust assetów i danych do `v=1.5.46`.

## v1.5.45-spojnosc-naglowkow
- przywrócono nadtytuł `Fundament Rotary` w sekcji `#zasady-rotary`,
- wycentrowano skalowany nagłówek `Obszary działania Rotary` oraz jego intro,
- ograniczono szerokość intro `areas-intro-large`, zachowując lżejszą typografię z v1.5.43,
- podbito cache-bust assetów i danych do `v=1.5.45`.

## v1.5.43-obszary-hierarchia
- podniesiono nagłówek `Obszary działania Rotary` w bloku zasad do skali nagłówka sekcji,
- przestylowano intro `areas-intro-large` na lżejszy, niepogrubiony akapit podporządkowany nagłówkowi,
- pozostawiono pozostałe podsekcje i układ kafli bez zmian,
- podbito cache-bust assetów i danych do `v=1.5.43`.

## v1.5.42-zasady-naglowek
- usunięto zdublowany nadtytuł `Zasady Rotary` w sekcji `#zasady-rotary`,
- pozostawiono pojedynczy nagłówek `h2` w standardowej skali sekcji,
- podbito cache-bust assetów i danych do `v=1.5.42`.

## v1.5.41-typografia-kart
- podniesiono bazowy rozmiar tytułów kart `h3` do skali `clamp(22px, 2.2vw, 25px)`,
- wyrównano mniejszy override tytułów w kartach galerii do nowej bazy,
- pozostawiono bez zmian hierarchię `h1`, `h2` oraz większe tytuły schematu struktury Rotary,
- podbito cache-bust assetów i danych do `v=1.5.41`.

## v1.5.40-partnerzy
- przekształcono kafle Firmy oraz Szkoły i młodzież w dostępne akordeony z placeholderami list partnerów,
- dodano akordeon Kluby rotariańskie, z którymi współpracujemy z placeholderem do czasu podpisania umów,
- pozostawiono kafle nazwanych partnerów bez linków i bez zmian treści,
- podbito cache-bust assetów i danych do `v=1.5.40`.

## v1.5.38-zarzad-domkniecie
- powiększono logo w górnym nagłówku i zawężono granatową ramkę wokół białego boksu logo,
- uzupełniono funkcyjne opisy Skarbnika oraz Członka Zarządu w sekcji Władze,
- uzupełniono dane JSON osób funkcyjnych, aby render dynamiczny nie przywracał opisów zastępczych,
- przebudowano sekcję Rotary na wycentrowany schemat struktury: Rotary International, Dystrykt 2231, Rotary Klub Silesia,
- usunięto podpisy pod nagłówkami sekcji Członkostwo i Obszary działania bez zmiany kafli,
- podbito cache-bust assetów i danych do `v=1.5.38`.

## v1.5.37-zarzad-layout-skonsolidowany
- skonsolidowano uwagi Zarządu po sprincie v1.5.36 i skorygowano komunikacyjne brzmienie motta Rotary na `Służba ponad własne interesy`,
- zaktualizowano nadtytuł hero do `ŚLĄSK | ROTARY POLSKA | ROTARY INTERNATIONAL`,
- skrócono wskazane treści w sekcjach Rotary i Zasady Rotary oraz usunięto kartę opisową Dystryktu,
- powiększono skrócone zdanie wprowadzające przy obszarach działania,
- usunięto wizualne badge'e z numerami Testu Czterech Pytań oraz inicjałami członków Zarządu przy zachowaniu kolejności i treści,
- podbito cache-bust assetów do `v=1.5.37`.

## v1.5.36-zarzad-layout-uwagi
- wdrożono uwagi Zarządu do sekcji startowej bez zmiany kanonicznej dewizy,
- zmieniono zdanie wprowadzające na "śląskim klubem Rotary z siedzibą w Mikołowie",
- usunięto wtrącenie o nazwach alternatywnych i dolny pasek informacyjny spod kafli,
- powiększono linię dewizy; wpis zastąpiony przez skonsolidowaną korektę v1.5.37,
- usunięto okrągłe badge literowe z kafli strony bez naruszania treści i akordeonów,
- podbito cache-bust assetów do `v=1.5.36`.

## v1.5.35-private-report-cleanup
- usunięto publiczny plik PDF raportu braków z katalogu `assets/docs`,
- usunięto publiczne linki i wpis danych prowadzące do raportu braków,
- pozostawiono raport jako materiał prywatny poza publicznym repo,
- podbito cache-bust do `v=1.5.35`, aby nie odtwarzać starego wpisu z cache danych.

## v1.5.34-payment-operator-p24-decision
- wskazano Przelewy24 jako rekomendowanego operatora zewnętrznego dla przyszłego wdrożenia płatności online,
- doprecyzowano, że obecny moduł wpłat pozostaje wersją bez backendu i bez transakcji online,
- dodano informację o raportach, eksporcie danych i przyszłej integracji REST API jako powodach wyboru,
- dodano nieaktywne placeholdery przyszłych ścieżek płatności online,
- bez dodawania tokenów, backendu, webhooków ani realnej integracji Przelewy24.

## v1.5.33-membership-card-height-fix
- naprawiono nadmierne rozciąganie kafli w sekcji Trzy statutowe typy członkostwa,
- odizolowano karty członkostwa od ogólnych reguł article/card,
- zwinięte kafle są kompaktowe, a rozwinięte mają wysokość wynikającą z treści,
- zachowano dostępność akordeonu i brak horizontal overflow.

## v1.5.32-members-tiles-expand
- rozbudowano trzy kafle członkostwa do niezależnych akordeonów,
- dodano definicje statutowe, prawa, obowiązki, ograniczenia i składki dla członkostwa czynnego, honorowego oraz wspierającego,
- dodano cytaty statutowe w stylu blockquote oraz linki do sekcji Dokumenty do pobrania,
- zaktualizowano cache-bust assetów do `1.5.32`.

## v1.5.31-gallery-level3
- rozbudowano sekcję Galeria działań RC Silesia do czterech rozwijanych mini-stron tematycznych,
- dodano niezależny akordeon dla kafli Spotkania klubu, ROTARY for PLANET, Partnerstwa lokalne oraz Media i wydarzenia,
- dodano treści wyjaśniające zakres dokumentacji, powód wstrzymania publikacji i planowany moment publikacji zdjęć,
- dodano placeholder zdjęć oraz linki do odpowiednich sekcji strony i polityki wizerunku,
- dodano placeholder sekcji Polityka wizerunku w `privacy.html#wizerunek`.

## v1.5.31-live-content-sync
- zsynchronizowano opis ROTARY for PLANET z ustalonym brzmieniem redakcyjnym,
- usunięto zbyt mocne sformułowanie globalny program Rotary International,
- doprecyzowano zapisy antygreenwashingowe dotyczące kompensacji emisji,
- potwierdzono pojedyncze miejsce prezentacji materiałów źródłowych Rotary Polska,
- utrzymano dokumenty lokalne RC Silesia jako osobny blok,
- bez zmian w module wpłat, social hubu, newsletterze, kalendarium i privacy/SEO.

## v1.5.29-source-materials-deduplication
- usunięto duplikację bloku Materiały źródłowe Rotary Polska,
- pełny blok materiałów źródłowych pozostawiono wyłącznie w sekcji ROTARY for PLANET,
- w sekcji Dokumenty do pobrania dodano krótki odsyłacz do sekcji ROTARY for PLANET,
- zachowano lokalne dokumenty RC Silesia w sekcji dokumentów,
- bez zmian w module wpłat, social hub, newsletterze, kalendarium, privacy/SEO i image pipeline.

## v1.5.28-source-materials-actions
- poprawiono widoczność przycisków akcji w kartach Materiały źródłowe Rotary Polska,
- odróżniono akcję przejścia do strony Rotary Polska od pobrania prezentacji PDF,
- pozostawiono film jako nieaktywny link do aktualizacji,
- bez zmian w strukturze sekcji i bez nowych funkcji.

## v1.5.27-live-polish
- wykonano drobne korekty redakcyjne i porządkowe publicznego stagingu,
- sprawdzono widoczność komunikatu demonstracyjnego,
- sprawdzono linki i dokumenty do pobrania,
- sprawdzono kalendarium spotkań i wydarzeń,
- zachowano staging jako noindex/nofollow i robots.txt Disallow: /,
- bez nowych funkcji i bez zmian architektury strony.

## v1.5.26-calendar-and-meetings-register
- rozszerzono sekcję spotkań do formy kalendarium spotkań i wydarzeń RC Silesia,
- dodano informację, że kalendarium nie jest jeszcze pełnym archiwum,
- dodano filtry: wszystkie, spotkania, wydarzenia, kamienie milowe, do uzupełnienia,
- dodano kartę Brakujące spotkania do uzupełnienia,
- dodano CTA Zgłoś brakujące spotkanie,
- dane pozostają robocze i wymagają zatwierdzenia przez klub,
- nie dodano scrapingu Facebooka, Meta API ani automatycznego pobierania danych.

## v1.5.25-meetings-and-events-register
- zaktualizowano `assets/data/meetings.json` do wersji `meetings-demo-v0.2`,
- rozbudowano sekcję Spotkania i wydarzenia RC Silesia,
- dodano roboczy, kuratorski rejestr spotkań, wydarzeń, prelekcji i kamieni milowych,
- dodano wpisy odtworzone na podstawie publicznych źródeł Facebook RC Silesia, Rotary Polska i materiałów klubowych,
- rozszerzono bezpieczny renderer spotkań z fallbackiem HTML,
- dodano CTA Zaproponuj temat spotkania,
- nie dodano scrapingu Facebooka ani automatycznego pobierania danych,
- wpisy wymagają zatwierdzenia przed publikacją produkcyjną.

## v1.5.24-cache-bust-statutory-bodies
- dodano cache-busting dla `styles.css`, `script.js`, `site.json` i `meetings.json`,
- ułatwiono wymuszenie aktualnego renderu rozwijanych kafli organów statutowych na GitHub Pages.

## v1.5.23-statutory-bodies
- dodano dane `statutoryBodies` na podstawie Artykułu VII Statutu RC Silesia,
- zastąpiono proste kafle organów statutowych rozwijanym akordeonem dla Walnego Zgromadzenia, Zarządu i Komisji Rewizyjnej,
- dodano renderer akordeonu z `button`, `aria-expanded`, `aria-controls`, `role="region"` i obsługą Escape,
- zsynchronizowano listę osób funkcyjnych Zarządu z obiektem `statutoryBodies`,
- nie rozstrzygano kwestii dewizy statutowej względem motta Rotary.

## v1.5.22-unified-download-bars
- zastosowano dyskretny pasek pobierania także w module rejestru nasadzeń oraz kaflu dokumentów w danych formalnych,
- zachowano dotychczasowe pliki docelowe i atrybuty `download`,
- linki w stopce pozostawiono jako zwykłe linki nawigacyjne.

## v1.5.21-download-bar
- zastąpiono pełnowymiarowe przyciski pobierania w kartach dokumentów subtelnym dolnym paskiem,
- dodano opisowe `aria-label` dla linków pobierania dokumentów,
- zachowano dotychczasowe pliki docelowe dokumentów.

## v1.5.20-rotary-for-planet-video-link-fix
- oznaczono film źródłowy ROTARY for PLANET jako link do aktualizacji, ponieważ obecny link YouTube wskazany na stronie Rotary Polska jest nieaktywny.
- usunięto aktywny link YouTube z publicznego UI oraz `assets/data/site.json`.

## v1.5.19-meetings-register
- dodano `assets/data/meetings.json`,
- dodano demonstracyjną sekcję Spotkania RC Silesia,
- dodano ręcznie opracowane wpisy na podstawie publicznych źródeł,
- dodano bezpieczny renderer spotkań z fallbackiem HTML,
- nie dodano scrapingu Facebooka ani automatycznego pobierania danych,
- wpisy wymagają zatwierdzenia przed publikacją produkcyjną.

## v1.5.18-rotary-for-planet-source-docs
- doprecyzowano opis ROTARY for PLANET jako globalnej inicjatywy społeczności Rotary opisanej na stronie Rotary Polska,
- dodano blok Materiały źródłowe Rotary Polska,
- dodano link do oficjalnej strony programu na rotary.org.pl,
- dodano link do prezentacji PDF pierwszej edycji,
- dodano link do filmu o akcji,
- dodano notę rozdzielającą materiały źródłowe Rotary Polska od lokalnych dokumentów wdrożeniowych RC Silesia,
- bez zmian w module wpłat, social hub, newsletterze, privacy/SEO i image pipeline.

## v1.5.17-regional-and-attribution
- doprecyzowano regionalny charakter RC Silesia w meta tagach, hero, top barze, sekcji o klubie i stopce,
- rozdzielono w komunikacji obszar działania na Górnym Śląsku od siedziby w Mikołowie,
- dodano `areaServed` w JSON-LD bez zmiany formalnego adresu siedziby,
- uzupełniono sekcję ROTARY for PLANET o atrybucję globalnego programu Rotary International, pomysłodawczynię Małgorzatę Szymczyk i coroczne podsumowanie w Golf Park Mikołów,
- dodano strukturalne dane `rotaryForPlanet` w `assets/data/site.json` oraz renderer kart faktów z fallbackiem statycznym,
- commit odtwarza pracę z osobistego repo jako następny sprint po `v1.5.16-canonical-fix`,
- bez zmian w danych formalnych KRS/NIP/REGON, numerze konta, adresie siedziby, motcie Rotary i dokumentach źródłowych.

## v1.5.16-canonical-fix
- odkręcono regresję z `v1.5.11`: canonical, `og:url`, JSON-LD `url`, `sitemap.xml` i `robots.txt` wskazują ponownie na staging `https://rc-silesia.github.io/WEBSITE/`,
- pozostawiono `noindex, nofollow` i `Disallow: /`, ponieważ strona nadal jest stagingiem,
- poprawiono wpis sitemap dla polityki prywatności na `privacy.html`,
- adres `https://rotary.org.pl/kluby/rc-silesia/` traktujemy jako zewnętrzną wizytówkę Rotary Polska, nie kanoniczny adres tej strony,
- po decyzji domenowej Zarządu URL-e kanoniczne wymagają ponownej rewizji i zmiany na docelową domenę,
- bez zmian w treści stron, danych formalnych, RODO, dokumentach, motcie Rotary i sekcji ROTARY for PLANET.

## v1.5.14-wp-matrix-and-rodo-gap-fix
- dodano roboczy raport macierzy WordPress do dokumentów publicznej wersji demonstracyjnej,
- podpięto raport braków Macierzy WordPress do sekcji Dokumenty do pobrania, danych formalnych i stopki,
- dodano wpis raportu do `assets/data/site.json`, aby dynamiczny renderer dokumentów zachował link po załadowaniu danych,
- uzupełniono formularz kontaktowy o rozwijaną klauzulę informacyjną RODO z elementami art. 13,
- zastąpiono placeholder klauzuli RODO w makiecie wpłat informacją, że dane nie są wysyłane i że przed produkcją wymagana jest zatwierdzona klauzula,
- bez zmian w social hub, newsletterze, hero, logo, dokumentach źródłowych porozumienia i image pipeline.

## v1.5.13-doc-downloads-and-area-tiles
- dodano wymuszenie pobierania dla linków do dokumentów z `assets/docs/`, także po dynamicznym renderze z `site.json`,
- dodano `download` do statycznych linków dokumentów w `index.html`,
- wzmocniono interakcję kafli Obszary działania o `pointerdown`, Enter i Spację,
- dodano stan `aria-pressed` dla aktywnego kafla,
- bez zmian w dokumentach źródłowych, danych formalnych, motcie, logo, social hub, newsletterze, privacy/SEO i image pipeline.

## v1.5.12-documents-download-fix
- podpięto dokumenty w sekcji Dokumenty do pobrania i w danych formalnych,
- dodano notę: Wersje DOCX służą do pracy roboczej. Na stronie produkcyjnej preferowane będą dokumenty PDF zatwierdzone do publikacji.,
- dodano i utrzymano link do statutu RC Silesia DOCX,
- podmieniono plik porozumienia ramowego ROTARY for PLANET na najnowszą zredagowaną wersję DOCX,
- zaktualizowano `assets/data/site.json`, aby dynamiczny renderer dokumentów nie przywracał starego linku,
- pozostawiono starszy plik porozumienia jako archiwum bez linkowania w publicznym UI,
- bez zmian w modułach biznesowych, logo, social hub, newsletterze, privacy/SEO i image pipeline.

## v1.5.11-production-rotary-polska-url
- ustawiono produkcyjny adres kanoniczny klubu na `https://rotary.org.pl/kluby/rc-silesia/`,
- zaktualizowano `canonical`, `og:url` i JSON-LD `url` w `index.html`,
- zaktualizowano `sitemap.xml` oraz linię `Sitemap` w `robots.txt` na adresy w domenie `rotary.org.pl`,
- pozostawiono `og:image` i `twitter:image` na działającym pliku z GitHub Pages, ponieważ obraz nie jest hostowany w serwisie Rotary Polska,
- pozostawiono `noindex, nofollow` i `Disallow: /` do czasu decyzji o otwarciu indeksacji,
- bez zmian w social placeholderach, YouTube, danych formalnych, motcie, dokumentach i modułach biznesowych.

## v1.5.10-staging-url-cleanup
- ujednolicono tymczasowe URL-e stagingowe na działający adres `https://rc-silesia.github.io/WEBSITE/`,
- zaktualizowano `canonical`, `og:url` i JSON-LD `url` w `index.html`,
- zaktualizowano `sitemap.xml` oraz linię `Sitemap` w `robots.txt`,
- pozostawiono `noindex, nofollow` i `Disallow: /` do czasu decyzji produkcyjnej,
- bez zmian w social placeholderach, YouTube, danych formalnych, motcie, dokumentach i modułach biznesowych.

## v1.5.9-hero-moe
- zastąpiono ręcznie rysowany znak w hero oficjalnym Mark of Excellence z pliku `RotaryMoE-R_REV.eps`,
- dodano webowe warianty `assets/img/rotary-moe-r-rev.png` i `assets/img/rotary-moe-r-rev.webp` wygenerowane z osadzonego podglądu TIFF pliku EPS,
- zachowano nazwę hero `Rotary Klub Silesia` zgodnie z wpisem do KRS,
- bez zmian w danych formalnych, motcie, dokumentach, OG image, logo w nagłówku i pozostałych modułach.

## v1.5.8-hero-krs-name
- zmieniono nazwę w hero z `RC Silesia` na pełną nazwę `Rotary Klub Silesia` zgodnie z wpisem do KRS,
- uzupełniono hero emblem o napis `ROTARY CLUB` w otoku koła,
- bez zmian w danych formalnych, motcie, dokumentach, OG image, logo w nagłówku i pozostałych modułach.

## v1.5.7-docs-link
- dodano plik `assets/docs/Porozumienie_ramowe_RC_Silesia_SOB_D1-D14_ze_statutami_i_analiza.docx`,
- przepięto linki do porozumienia w rejestrze nasadzeń, sekcji Dane formalne i sekcji Dokumenty,
- zaktualizowano opis karty dokumentu, aby wskazywał statuty obu Stron i analizę porównawczą celów statutowych,
- starszy plik `Projekt_Porozumienia_z_dokumentami_D1-D14.docx` pozostawiono w repo jako archiwum,
- bez zmian w OG image, logo, motcie, social hubie, panelu wpłat i pozostałych modułach biznesowych.

## v1.5.6-og-image
- wdrożono Open Graph image w `assets/img/og-rc-silesia.jpg` (1200x630, oficjalne logo klubu wycentrowane na białym tle),
- dodano wariant WebP `og-rc-silesia.webp` jako bonus dla platform z obsługą WebP; meta tag wskazuje na JPG dla maksymalnej kompatybilności,
- zaktualizowano `meta property="og:image"` z placeholderowego URL-a `https://rcsilesia.pl/...` na działający `https://rc-silesia.github.io/WEBSITE/assets/img/og-rc-silesia.jpg`,
- dodano `og:image:type=image/jpeg`, `og:image:width=1200`, `og:image:height=630` zgodne ze specyfikacją Open Graph,
- zaktualizowano `meta name="twitter:image"` analogicznie,
- usunięto komentarz TODO o OG image z `index.html`,
- po decyzji o domenie produkcyjnej należy zmienić URL `og:image` i `twitter:image` z `rc-silesia.github.io/WEBSITE` na ostateczną domenę,
- bez zmian w headerze, motcie, danych formalnych, logo i pozostałych modułach.

## v1.5.5-rotary-logo
- dodano dostarczony lockup Rotary Klub Silesia / Dystrykt 2231 jako zoptymalizowane pliki WebP i PNG,
- dodano wariant mobilny logo przez strukturę `<picture>`,
- zastąpiono tekstowy placeholder `RCS` w nagłówku strony głównej, polityce prywatności i podglądzie newslettera,
- zachowano istniejący layout, staging `noindex` i brak zmian w modułach biznesowych.

## v1.5.4-motto-terminology-fix
- ujednolicono polskie brzmienie motta Rotary; wpis zastąpiony przez korektę v1.5.37,
- poprawiono wystąpienia motta w sekcji O klubie, Zasady Rotary i Dane formalne,
- bez zmian w modułach technicznych, newsletterze, privacy, social hub i płatnościach.

## v1.5.3-back-to-top-a11y-fix
- usunięto `aria-hidden` z przycisku Wróć na górę,
- poprawiono przenoszenie fokusu przed ukryciem przycisku,
- zachowano przewijanie do sekcji Hero / `#start` i obsługę `prefers-reduced-motion`.

## v1.5.2-newsletter-social-hub-link
- dodano wejście do podglądu newslettera tygodniowego z panelu Media w sekcji Co słychać w RC Silesia?,
- przeniesiono kartę newslettera na początek panelu Media i dodano link w stopce,
- dodano widoczne wejście do newslettera nad zakładkami social hubu,
- newsletter-preview.html pozostaje podglądem demonstracyjnym bez wysyłki e-mail,
- nie dodano integracji z dostawcą mailingowym ani backendu.

## v1.5.1-newsletter-html-export
- dodano możliwość pobrania szkicu newslettera jako pliku HTML z poziomu newsletter-preview.html,
- rozszerzono scripts/generate-newsletter.js o eksport HTML,
- npm run newsletter generuje teraz Markdown i HTML,
- dodano escapowanie danych newslettera w eksporcie HTML,
- nie dodano wysyłki e-mail ani integracji z dostawcą mailingowym.

## v1.4.5-return-navigation
- rozdzielono funkcję Wróć na górę od powrotu z podstron,
- dodano zapamiętywanie ostatniej aktywnej sekcji strony,
- link do polityki prywatności może zawierać parametr returnTo,
- privacy.html kieruje użytkownika z powrotem do poprzedniej sekcji albo do #start,
- bez zmian w modułach biznesowych, social hub, płatnościach i privacy/SEO.

## v1.4.4-back-to-top
- dodano dostępny przycisk Wróć na górę prowadzący do sekcji Hero / #start,
- przycisk pojawia się dopiero po przewinięciu strony,
- dodano obsługę prefers-reduced-motion,
- ustawiono wersję package.json i package-lock.json na 1.4.4,
- dodano link Zasady w głównej nawigacji,
- ukryto privacy notice do czasu inicjalizacji JS, aby uniknąć FOUC,
- ujednolicono polskie brzmienie motta Rotary,
- bez zmian w modułach biznesowych, privacy, SEO, social hub, ROTARY for PLANET i image pipeline.

## v1.4.3-gallery-section
- dodano sekcję Galeria działań RC Silesia,
- dodano demonstracyjne karty albumów,
- dodano notę o zgodach i statusie demonstracyjnym,
- przygotowano miejsce pod przyszłe zdjęcia WebP z image pipeline,
- dodano link do galerii w stopce strony głównej,
- bez zmian w modułach biznesowych, privacy, SEO, social hub i płatnościach.

## v1.4.2-rotary-principles
- dodano sekcję Zasady Rotary,
- dodano Test Czterech Pytań,
- dodano dewizę Service Above Self - Uczynność innym ponad korzyść własną,
- dodano karty obszarów działania Rotary,
- dodano lokalne zastosowanie zasad Rotary w RC Silesia,
- bez zmian w modułach biznesowych, privacy, SEO, social hub, płatnościach i image pipeline.

## v1.4-privacy-seo-candidate
- dodano roboczą politykę prywatności privacy.html,
- dodano demonstracyjny panel cookies/privacy notice z localStorage,
- dodano meta SEO, Open Graph i Twitter/X Cards,
- dodano JSON-LD Organization,
- dodano privacy.html do sitemap.xml,
- pozostawiono staging jako noindex/nofollow,
- dodano checklistę prywatności i publikacji,
- uzupełniono oficjalny URL profilu Facebook RC Silesia,
- sprawdzono lazy-load zewnętrznych embedów,
- nie dodano nowych funkcji biznesowych.

## v1.3.3-nav-stable
- przywrócono breakpoint nawigacji do 980px,
- zachowano stabilny układ flex-wrap w nawigacji desktopowej,
- wyeliminowano horizontal overflow w zakresie tabletowym 981-1252px,
- nie zmieniono modułów biznesowych ani treści strony.

## v1.3.1-staging-hardening
- ustawiono stagingowe robots.txt na noindex przez Disallow: /,
- dodano meta robots noindex, nofollow dla wersji stagingowej,
- dodano zawijanie menu desktopowego, aby usunąć overflow w zakresie tablet/mały laptop bez ruszania breakpointów,
- dezaktywowano oznaczone placeholderowe linki social/media także w trybie fallback bez site.json,
- ograniczono allow iframe YouTube do niezbędnych uprawnień.
- zaktualizowano package.json do wersji 1.3.1.

## v1.4.1-facebook-url
- uzupełniono oficjalny link Facebook RC Silesia w assets/data/site.json.

## v1.3-staging-readiness
- dodano dokumentację stagingową,
- dodano instrukcję deploymentu dla GitHub Pages, Cloudflare Pages i Netlify,
- dodano release notes dla wersji demonstracyjnej,
- dodano robots.txt i sitemap.xml w wariancie stagingowym,
- sprawdzono ścieżki, dane JSON, fallback i lazy-load embedów,
- nie dodano nowych funkcji biznesowych.

## v1.2.1-social-hub-hardening
- dodano guard YouTube, który nie ładuje iframe przy placeholderowym PLAYLIST_ID,
- utwardzono iframe YouTube przez usunięcie autoplay i dodanie referrerpolicy,
- dezaktywowano martwe linki social/media, gdy ich href w danych wynosi #,
- ograniczono ryzyko overflow w menu przez skrócenie linku Obserwuj nas do Media,
- zachowano bez zmian architekturę social hubu i data layer.

## v1.2-social-hub-media-render
- dodano sekcję Co słychać w RC Silesia,
- dodano zakładki Facebook, Instagram, YouTube, LinkedIn, X i Media,
- dodano lazy-load zewnętrznych embedów,
- dodano fallback linki do kanałów,
- dodano komunikaty prywatności,
- dodano renderowanie mediaDemo z danych strony,
- przyjęto zasadę automatyzacji wyłącznie oficjalnych kanałów RC Silesia,
- bez tokenów API, backendu i zewnętrznych bibliotek.

## v1.0-social-hub
- dodano sekcję Co słychać w RC Silesia,
- dodano zakładki Facebook, Instagram, YouTube, LinkedIn, X i Media,
- dodano lazy-load zewnętrznych embedów,
- dodano fallback linki do kanałów,
- dodano komunikaty prywatności,
- przyjęto zasadę automatyzacji wyłącznie oficjalnych kanałów RC Silesia,
- nie dodano tokenów API ani zewnętrznych bibliotek,
- zachowano bez zmian hero, top bar, dane formalne, moduł wpłat, image pipeline i ROTARY for PLANET.

## v1.1-data-layer-pilot
- dodano pilotażową warstwę danych assets/data/site.json,
- przygotowano renderowanie wybranych modułów z JSON,
- zachowano kluczowe treści strony w HTML dla SEO i odporności strony,
- dodano fallback na wypadek braku pliku JSON,
- nie wdrożono jeszcze pełnej internacjonalizacji i18n.

## v0.9-image-pipeline
- dodano pipeline optymalizacji zdjęć oparty o Node.js i sharp,
- dodano folder src/img na zdjęcia źródłowe,
- dodano generowanie wariantów WebP: hero, card, thumb,
- dodano czyszczenie wygenerowanych obrazów przez npm run optimize:clean,
- dodano dokumentację użycia w README,
- zachowano bez zmian wygląd i treść strony z v0.8.1.

## v0.8.1-wsparcie-stabilized
- doprecyzowano status modułu wpłat jako makiety bez transakcji,
- zmieniono teksty przycisków w sekcji wpłat, aby nie sugerowały uruchomionej bramki,
- dodano statusy makieta bez transakcji,
- uporządkowano wejścia do sekcji Wpłaty i wsparcie,
- potwierdzono preferencję polskich i europejskich operatorów płatności,
- bez zmian w danych formalnych, formularzu kontaktowym, hero i module ROTARY for PLANET.

## v0.8-wsparcie-mockup (Sprint 5.5)
- dodano moduł "Wpłaty i wsparcie" jako makietę (bez realnej bramki płatniczej),
- trzy rozdzielone zakładki: darowizna, składka członkowska, wydarzenie / partnerstwo,
- darowizna: kafelki kwot (50/100/250/500/inna) + cel wpłaty + dane darczyńcy + zgody RODO i regulaminu,
- składka: generator sugerowanego tytułu przelewu (rodzaj — imię i nazwisko — okres) z kopiowaniem,
- karta przelewu tradycyjnego z kopiowaniem numeru konta i sugerowanymi tytułami,
- lista preferowanych operatorów (Wpłacam.ngo.pl, Autopay/FaniPay, PayU, Przelewy24, Tpay; Stripe tylko rezerwowo),
- checklista warunków przed uruchomieniem płatności (regulamin, RODO, procedura zwrotów, rozdzielenie wpłat, potwierdzenia e-mail, eksport dla Skarbnika, wybór operatora, zgoda Zarządu),
- przyciski płatności wyświetlają komunikat demonstracyjny i nie wykonują żadnej transakcji,
- dodano wejścia: "Wesprzyj" w top barze, "Wsparcie" w menu, "Wesprzyj nasadzenia" w sekcji PLANET, linki w stopce,
- bez przelicznika "kwota = liczba drzew" do czasu ustalenia rzeczywistego kosztu (antygreenwashing),
- bez zmian w istniejących modułach (kontakt, dane formalne, PLANET, władze).

## v0.7-planet-module
- rozbudowano sekcję ROTARY for PLANET jako moduł operacyjny,
- dodano standard odpowiedzialnego nasadzenia,
- dodano demonstracyjny rejestr nasadzeń ze statusami,
- dodano placeholder mapy nasadzeń,
- dodano blok zasad komunikacji antygreenwashingowej,
- powiązano przyciski programu z routingiem formularza kontaktowego,
- zachowano strukturę strony i interfejs komunikacyjny z v0.6.

## v0.6-contact-routing
- przebudowano sekcję Kontakt jako centrum kontaktu,
- dodano ścieżki: spotkanie, członkostwo, członek wspierający, partnerstwo/sponsoring, ROTARY for PLANET, media, kontakt ogólny,
- dodano dynamiczne pola formularza zależne od tematu,
- dodano ukrytą kategorię zgłoszenia,
- doprecyzowano zgody przy formularzu,
- dodano fallback mailowy,
- przygotowano formularz pod późniejszą integrację produkcyjną.

## v0.5-formal-transparency
- rozdzielono organy statutowe i osoby funkcyjne,
- dodano karty osób funkcyjnych,
- rozbudowano sekcję danych formalnych,
- dodano kartę konta bankowego z funkcją kopiowania,
- dodano moduł dokumentów do pobrania,
- dodano statusy dokumentów i noty publikacyjne,
- zachowano strukturę merytoryczną i wizualną strony z v0.4.

## v0.4-hero-navigation
- dodano dostępny link Przejdź do treści,
- dodano górny pasek informacyjny z social media i adresem e-mail,
- dodano social media do menu mobilnego,
- dopracowano zachowanie pierwszego ekranu na mobile,
- dodano dyskretne oznaczenie wersji demonstracyjnej,
- zachowano dotychczasową strukturę merytoryczną strony.

## v0.3-recovered-baseline
- naprawiono krytyczny problem mojibake w polskich znakach,
- zapisano pliki tekstowe jako UTF-8 bez BOM,
- przywrócono aktualny hero z dwuliniowym nagłówkiem RC Silesia / działamy lokalnie, łączymy globalnie,
- przywrócono lead o Górnym Śląsku i siedzibie w Mikołowie,
- zachowano czystą strukturę katalogów z v0.2,
- przygotowano projekt do Sprintu 1.

## v0.2-clean-structure
- rozdzielono strukturę projektu na HTML, CSS i JavaScript,
- dodano katalogi assets/css, assets/js, assets/img, assets/docs, assets/data,
- dodano README.md,
- dodano CHANGELOG.md,
- zachowano dotychczasowy wygląd i zachowanie prototypu.

## v0.1-demo
- pierwotna jednoplikowa wersja demonstracyjna strony głównej RC Silesia.
