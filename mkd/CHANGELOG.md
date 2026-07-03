# Changelog

## MKD-WWW-0.2.3-mikolowianie-dla-klimatu - 2026-07-03

- Zmieniono publiczną nazwę społecznej części serwisu na `Mikołowianie dla klimatu`.
- Zaktualizowano hero, relację z MKD, kartę partnerów, stopkę i dane `site.json`.

## MKD-WWW-0.2.2-local-copy-cleanup - 2026-07-03

- Usunięto widoczny dopisek lokalizacyjny z hero i panelu kontaktu.
- Pozostawiono formalne odwołania do Gminy Mikołów tam, gdzie opisują status porozumienia.

## MKD-WWW-0.2.1-mkd-identity - 2026-07-03

- Usunięto obce brandowanie z nagłówka, leadu, sekcji partnerów i stopki serwisu.
- Przebudowano kolorystykę na własny system MKD: ciemna zieleń marki i sezonowe akcenty liści.
- Dodano obsługę `data-season` oraz parametru testowego `?sezon=wiosna|lato|jesien|zima`.

## MKD-WWW-0-bootstrap - 2026-07-03

- Utworzono samodzielny statyczny projekt `mkd-www`.
- Wydzielono i zaadaptowano układ informacyjny ze strony `RC-Silesia/WEBSITE` jako roboczy serwis Mikołowska Karta Drzew.
- Dodano status formalny inicjatywy oraz sekcję relacji obywatelskiego komponentu do gminnej Mikołowskiej Karty Drzew.
- Dodano rejestr danych `assets/data/rejestr.json` w wersji schematu `0.2.0`, pusty na start.
- Dodano placeholder polityki prywatności i wizerunku.
- Dodano progresywny loader rejestru i danych kontaktowych bez wstrzykiwania HTML, z fallbackiem dla nieudanego `fetch`.
