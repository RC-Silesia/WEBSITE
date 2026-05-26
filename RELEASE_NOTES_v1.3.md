# Release notes - v1.3-staging-readiness

## Opis wersji

`v1.3-staging-readiness` przygotowuje statyczną stronę RC Silesia do publikacji testowej na GitHub Pages, Cloudflare Pages albo Netlify. To wersja demonstracyjna do audytu technicznego i organizacyjnego.

## Moduły strony

- Hero RC Silesia z CTA.
- Top bar i menu mobilne.
- Sekcje informacyjne o klubie, Rotary i członkostwie.
- ROTARY for PLANET z modułem operacyjnym, rejestrem demo i mapą placeholder.
- Dane formalne, dokumenty i władze.
- Centrum kontaktu z routingiem tematów.
- Wpłaty i wsparcie jako makieta bez transakcji.
- Image pipeline oparty o Node.js i sharp.
- Data layer pilot w `assets/data/site.json`.
- Social hub z lazy-load i placeholderami oficjalnych kanałów.

## Znane ograniczenia

- Social linki są placeholderami `#`, dopóki nie zostaną podane oficjalne URL-e.
- YouTube ma placeholder `PLAYLIST_ID` i nie ładuje iframe do czasu podmiany.
- Moduł wpłat nie wykonuje transakcji.
- Dokument porozumienia D1-D14 jest roboczy i wymaga zatwierdzenia przez Strony.
- Polityka prywatności produkcyjna nie jest jeszcze finalna.
- AI-CMS i Make.com nie są wdrożone.

## Decyzje wymagane przed produkcją

- Oficjalna domena.
- Finalne dokumenty do publikacji.
- Finalna polityka prywatności i cookies.
- Oficjalne profile social media.
- Decyzja o płatnościach online i operatorze.
- Decyzja o indeksowaniu przez wyszukiwarki.

## Instrukcja audytu dla osób decyzyjnych

1. Otworzyć stronę na adresie stagingowym.
2. Sprawdzić treść hero i głównych sekcji.
3. Sprawdzić dane formalne, osoby funkcyjne i dokumenty.
4. Sprawdzić, czy oznaczenia robocze i demonstracyjne są zrozumiałe.
5. Sprawdzić formularz kontaktowy i tematy zgłoszeń.
6. Sprawdzić social hub bez podłączania prawdziwych kanałów.
7. Spisać decyzje przed wersją produkcyjną.
