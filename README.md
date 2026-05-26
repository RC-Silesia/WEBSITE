# RC Silesia - prototyp strony głównej

Statyczny prototyp strony głównej Rotary Klub Silesia.

## Uruchomienie lokalne

1. Otworzyć `index.html` w przeglądarce.
2. Albo uruchomić lokalny serwer:

```bash
python -m http.server 8000
```

Następnie wejść na `http://localhost:8000`.

## Struktura katalogów

```text
rc-silesia-site/
  index.html
  assets/
    css/
      styles.css
    js/
      script.js
    img/
    docs/
    data/
  README.md
  CHANGELOG.md
```

## Sprint 0.5 - recovery / clean baseline

- naprawiono kodowanie polskich znaków,
- zapisano pliki jako UTF-8 bez BOM,
- przywrócono aktualny hero,
- zachowano strukturę katalogów v0.2,
- przygotowano bazę do Sprintu 1.

## Sprint 1 - top bar, social media i hero

- dodano top bar,
- dodano social media jako placeholdery,
- dodano skip link,
- dodano social media w menu mobilnym,
- dopracowano zachowanie pierwszego ekranu na mobile,
- dodano oznaczenie wersji demonstracyjnej.

## Sprint 2 - dane formalne, władze i dokumenty

- dodano osoby funkcyjne,
- rozdzielono organy statutowe od osób funkcyjnych,
- rozbudowano dane formalne,
- dodano kartę konta bankowego,
- dodano kopiowanie numeru konta,
- dodano moduł dokumentów do pobrania,
- dodano noty o statusie dokumentów roboczych.

## Sprint 3 - formularze i routing kontaktu

- rozbudowano formularz kontaktowy,
- dodano ścieżki kontaktu,
- dodano dynamiczne pola zależne od tematu,
- dodano kategorię zgłoszenia,
- dodano warstwę RODO przy formularzu,
- dodano fallback mailowy,
- przygotowano formularz pod późniejszą migrację do systemu produkcyjnego.

## Sprint 4 - moduł ROTARY for PLANET

- rozbudowano sekcję ROTARY for PLANET,
- dodano standard odpowiedzialnego nasadzenia,
- dodano demonstracyjny rejestr nasadzeń,
- dodano statusy nasadzeń,
- dodano placeholder mapy,
- dodano blok komunikacji antygreenwashingowej,
- powiązano CTA z formularzem kontaktowym.

## Sprint 5.5 - moduł wpłat i wsparcia (makieta)
- sekcja "Wpłaty i wsparcie" (#wsparcie) z trzema zakładkami: darowizna, składka członkowska, wydarzenie / partnerstwo,
- makieta bez realnej bramki - przyciski płatności pokazują komunikat demonstracyjny, nie wykonują transakcji,
- karta przelewu tradycyjnego (numer konta + kopiowanie) i lista preferowanych operatorów polskich/europejskich,
- checklista wymagań przed uruchomieniem płatności online (regulamin, RODO, zwroty, rozdzielenie wpłat, potwierdzenia e-mail, eksport, operator, zgoda Zarządu),
- realne płatności to osobny etap produkcyjny po decyzji Zarządu i księgowości.

## Sprint 0.8.1 - stabilizacja modułu wpłat
- doprecyzowano, że moduł wpłat jest makietą,
- zmieniono teksty przycisków tak, aby nie sugerowały realnej transakcji,
- dodano status makieta bez transakcji,
- uporządkowano linki wejściowe do sekcji wsparcia,
- potwierdzono preferencję operatorów polskich/europejskich.

## Sprint 0.9 - optymalizacja zdjęć

Pipeline zdjęć przygotowuje przyszłe fotografie z wydarzeń, spotkań i akcji RC Silesia do publikacji na stronie.

- `src/img/` służy do wrzucania surowych zdjęć z aparatu lub telefonu, np. JPG, JPEG, PNG albo WebP.
- `assets/img/` jest folderem docelowym dla zoptymalizowanych plików WebP.
- Instalacja zależności:

```bash
npm install
```

- Uruchomienie optymalizacji:

```bash
npm run optimize
```

- Wyczyszczenie wygenerowanych WebP i ponowne wygenerowanie:

```bash
npm run optimize:clean
```

Warianty generowane automatycznie:
- `hero` - maksymalna szerokość 1920 px,
- `card` - maksymalna szerokość 960 px,
- `thumb` - maksymalna szerokość 480 px.

Przykład:

```text
src/img/sadzenie-drzew.jpg
assets/img/sadzenie-drzew-hero.webp
assets/img/sadzenie-drzew-card.webp
assets/img/sadzenie-drzew-thumb.webp
```

Nie należy publikować zdjęć bez zgód na wizerunek, zwłaszcza w przypadku dzieci i młodzieży.

## Sprint v1.0 - social hub

- dodano sekcję "Co słychać w RC Silesia?",
- dodano zakładki Facebook, Instagram, YouTube, LinkedIn, X i Media,
- zastosowano lazy-load treści zewnętrznych,
- przyjęto zasadę: tylko oficjalne kanały RC Silesia,
- nie pobieramy hashtagów, komentarzy ani wzmianek,
- linki i embed-y są placeholderami do podmiany po podaniu oficjalnych URL-i,
- YouTube używa docelowo `youtube-nocookie.com`.

## Sprint v1.2 - social hub i media render

- dodano sekcję Co słychać w RC Silesia,
- dodano zakładki Facebook, Instagram, YouTube, LinkedIn, X, Media,
- dodano lazy-load embedów,
- dodano renderowanie mediaDemo z site.json,
- przyjęto zasadę: tylko oficjalne kanały,
- brak hashtagów, komentarzy i wzmianek,
- linki social są placeholderami do podmiany.

## Sprint v1.2.1 - stabilizacja social hubu

- dodano guard blokujący ładowanie YouTube przy placeholderowym `PLAYLIST_ID`,
- utwardzono iframe YouTube przez usunięcie `autoplay` z `allow` i dodanie `referrerpolicy`,
- dezaktywowano martwe linki social i media, gdy w `site.json` wartością jest `#`,
- skrócono link w głównym menu do `Media`, aby ograniczyć ryzyko overflow na desktopie.

## Sprint v1.3 - staging deployment readiness

- przygotowano pliki `STAGING_CHECKLIST.md`, `DEPLOYMENT.md` i `RELEASE_NOTES_v1.3.md`,
- projekt jest gotowy do publikacji testowej jako statyczna strona,
- dodano stagingowe `robots.txt` i `sitemap.xml`,
- domena `https://example.com/` jest placeholderem i wymaga podmiany przed produkcją,
- przed wersją produkcyjną wymagane są decyzje dotyczące domeny, dokumentów, polityki prywatności, operatora płatności i oficjalnych social URL-i.

## Sprint v1.3.1 - staging hardening

- ustawiono stagingowe `robots.txt` na `Disallow: /`,
- dodano `meta robots` z `noindex, nofollow`,
- dodano zawijanie menu desktopowego, aby usunąć overflow w zakresie tablet/mały laptop bez ruszania breakpointów,
- dezaktywowano oznaczone placeholderowe linki social/media także w trybie fallback bez `site.json`,
- ograniczono atrybut `allow` iframe YouTube do niezbędnych uprawnień.

## Sprint v1.3.2 - nav breakpoint final fix

- skorygowano breakpoint nawigacji z 980px do 1200px,
- usunięto martwą strefę overflow dla tabletów i małych laptopów,
- bez zmian w modułach biznesowych.

## Sprint 1.1 - pilotaż warstwy danych JSON

Dodano pilotażową warstwę danych w pliku `assets/data/site.json`. To nie jest pełna internacjonalizacja i18n i nie zastępuje kluczowych treści strony.

- `assets/data/site.json` przechowuje wybrane dane zmienne: linki social media, dokumenty, demonstracyjny rejestr nasadzeń, metody płatności, preferowanych operatorów płatności oraz placeholdery mediów.
- Kluczowe treści strony pozostają w HTML, aby strona była czytelna, indeksowalna i odporna na błąd ładowania JSON.
- Loader w `assets/js/script.js` renderuje tylko wybrane moduły, jeśli istnieją odpowiednie kontenery `data-render`.
- Jeżeli `assets/data/site.json` się nie załaduje, strona używa statycznego fallbacku HTML.
- Test modułów JSON najlepiej wykonywać przez lokalny serwer:

```bash
python -m http.server 8000
```

Następnie wejść na `http://localhost:8000`.

Pełna internacjonalizacja i18n nie jest jeszcze wdrożona.

## Do uzupełnienia w kolejnych sprintach

- oficjalne logo RC Silesia,
- finalne linki social media,
- polityka prywatności,
- aktualności,
- rejestr nasadzeń,
- mapa nasadzeń,
- SEO i dostępność.
