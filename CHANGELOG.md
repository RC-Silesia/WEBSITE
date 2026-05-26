# Changelog

## v1.3.2-nav-breakpoint-final-fix
- skorygowano główny breakpoint nawigacji z 980px do 1200px,
- usunięto ryzyko horizontal overflow w zakresie tablet/mały laptop,
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
