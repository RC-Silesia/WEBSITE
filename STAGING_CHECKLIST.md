# RC Silesia - staging checklist

## A. Cel stagingu

Publikacja stagingowa służy do technicznego i organizacyjnego sprawdzenia strony RC Silesia przed decyzją o wersji produkcyjnej. To nie jest oficjalny launch strony.

## B. Co testujemy

- Poprawne ładowanie `index.html` jako statycznej strony.
- Poprawne ścieżki do `assets/css/styles.css`, `assets/js/script.js`, `assets/data/site.json`, `assets/docs/` i `assets/img/`.
- Działanie menu desktopowego i mobilnego.
- Działanie formularza kontaktowego i routingu tematów.
- Działanie sekcji ROTARY for PLANET, rejestru demo i mapy placeholder.
- Działanie modułu Wpłaty i wsparcie jako makiety bez transakcji.
- Działanie social hubu bez ładowania zewnętrznych embedów przed kliknięciem.
- Renderowanie danych z `assets/data/site.json` oraz statyczny fallback HTML.
- Pobieranie dokumentów z `assets/docs/`.

## C. Czego jeszcze nie publikujemy jako finalne

- Dokumentów roboczych jako zatwierdzonych dokumentów końcowych.
- Numeru konta jako finalnie zatwierdzonego do przyjmowania wpłat, jeżeli nie ma właściwej decyzji.
- Prawdziwych płatności online.
- Prawdziwych embedów social media bez oficjalnych URL-i.
- Pełnej produkcyjnej polityki prywatności i mechanizmu cookies.
- Automatycznego AI-CMS, Make.com, webhooków ani aktualizacji bez zatwierdzenia człowieka.

## D. Lista kontrolna przed deploymentem

- [ ] Potwierdzić, że dokumenty w `assets/docs/` mogą być dostępne w stagingu.
- [ ] Potwierdzić, że numer konta może być widoczny w wersji demonstracyjnej.
- [ ] Potwierdzić, że stopka zawiera informację o wersji demonstracyjnej.
- [ ] Sprawdzić, że `assets/data/site.json` parsuje się poprawnie.
- [ ] Sprawdzić, że strona pozostaje czytelna, gdy `site.json` się nie załaduje.
- [ ] Sprawdzić, że social hub nie ładuje zewnętrznych iframe lub SDK przed kliknięciem.
- [ ] Sprawdzić, że YouTube nie ładuje placeholderowego `PLAYLIST_ID`.
- [ ] Sprawdzić brak starych ścieżek `documents/`.
- [ ] Sprawdzić brak Windowsowych backslashy w ścieżkach HTML/CSS/JS.
- [ ] Sprawdzić `node --check assets/js/script.js`.
- [ ] Sprawdzić `node --check scripts/optimize.js`.

## E. Lista kontrolna po deploymencie

- [ ] Otworzyć stronę z publicznego URL stagingu.
- [ ] Sprawdzić konsolę przeglądarki pod kątem błędów 404 i CORS.
- [ ] Sprawdzić ładowanie `assets/data/site.json` przez HTTP.
- [ ] Sprawdzić pobieranie dokumentów DOCX.
- [ ] Sprawdzić menu mobilne.
- [ ] Sprawdzić formularz kontaktowy bez wysyłania testów produkcyjnych, jeżeli nie jest to uzgodnione.
- [ ] Sprawdzić zakładki social hubu i lazy-load YouTube.
- [ ] Sprawdzić, czy martwe linki social są oznaczone jako `Kanał wkrótce`.
- [ ] Sprawdzić widok mobile, tablet i desktop.

## F. Decyzje wymagane przed wersją produkcyjną

- Oficjalna domena i docelowe URL-e w `robots.txt` oraz `sitemap.xml`.
- Zakres dokumentów dopuszczonych do publikacji.
- Finalna treść polityki prywatności i cookies.
- Oficjalne linki social media.
- Decyzja o operatorze płatności i regulaminie wpłat.
- Decyzja, czy staging ma być indeksowany przez wyszukiwarki.
- Decyzja o przyszłym AI-CMS wyłącznie w trybie szkicu lub pull request, nie publikacji automatycznej.
