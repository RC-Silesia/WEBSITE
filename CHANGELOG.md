# Changelog

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
- dodano `assets/docs/RC_Silesia_WP_Matrix_Raport_brakow_v1.pdf`,
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
- ujednolicono polskie brzmienie motta Rotary na `Służba ponad własny interes`,
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
