# Changelog

## MKD-WWW-0.2.10-place-language - 2026-07-03

- Uproszczono język sekcji o miejscu sadzenia.
- Zmieniono tytuł na `To miejsce wskazuje gatunek i odmianę drzewa`.
- Usunięto z publicznego wprowadzenia żargon o kategoriach A-E i odniesienie do wersji pakietu.

## MKD-WWW-0.2.9-tree-shrub-risk-list - 2026-07-03

- Zawężono blok gatunków niewprowadzanych do drzew, krzewów i pnączy istotnych dla decyzji nasadzeniowych MKD.
- Usunięto sugestię, że strona pokazuje pełną listę wszystkich roślin IGO.
- Wskazano konkretne taksony ryzyka: bożodrzew gruczołowaty, dławisz okrągłolistny, robinia akacjowa, klon jesionolistny, dąb czerwony i czeremcha amerykańska.

## MKD-WWW-0.2.8-merge-mkd-v1-4 - 2026-07-03

- Sprawdzono zgodność strony z pakietem `Mikolowska_Karta_Drzew_pakiet_final_v1_4_po_korekcie`.
- Zmergowano treści pakietu v1.4: zasady MKD, kategorie miejsc A-E, karty operacyjne, SOD, tabelę doboru taksonów i dokumenty techniczne T-01-T-09.
- Zaktualizowano status formalny na materiał do uzgodnień wewnętrznych i podpisania zarządzenia.
- Zachowano wcześniejsze elementy strony: sezonowe drzewo, rejestr kart drzew, moduły jakości, brak niepotwierdzonych liczb i brak śladów zewnętrznych inicjatyw.
- Podbito cache-bust CSS do `0.2.8`.

## MKD-WWW-0.2.7-standard-habitat-species - 2026-07-03

- Wydzielono na stronie MKD moduły: `Standard nasadzeń`, `Ocena siedliska` i `Dobór gatunków`.
- Przepisano materiał merytoryczny na język MKD, bez śladów nazewnictwa zewnętrznych inicjatyw.
- Dodano listy gatunków rekomendowanych, warunkowych, wymagających ostrożności oraz niewprowadzanych w standardzie MKD.
- Podbito cache-bust CSS do `0.2.7`.

## MKD-WWW-0.2.6-seasonal-tree-filter - 2026-07-03

- Drzewo w hero zmienia barwy wraz z sezonem: wiosna, lato, jesień i zima.
- Podłączono sezonowe filtry obrazu do istniejącego `data-season` i parametru testowego `?sezon=...`.
- Podbito cache-bust CSS do `0.2.6`.

## MKD-WWW-0.2.5-climate-service-copy - 2026-07-03

- Zmieniono nagłówek relacji z MKD na `Serwis klimatyczny Mikołowa`.
- Usunięto z widocznego nagłówka niezręczną formę zaprzeczenia.

## MKD-WWW-0.2.4-hero-tree - 2026-07-03

- Zastąpiono koncentryczne okręgi w hero ilustracją dojrzałego drzewa.
- Uspokojono układ metryk w prawym panelu hero i podbito cache-bust CSS do `0.2.4`.

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
- Wydzielono i zaadaptowano neutralny układ informacyjny jako roboczy serwis Mikołowska Karta Drzew.
- Dodano status formalny inicjatywy oraz sekcję relacji obywatelskiego komponentu do gminnej Mikołowskiej Karty Drzew.
- Dodano rejestr danych `assets/data/rejestr.json` w wersji schematu `0.2.0`, pusty na start.
- Dodano placeholder polityki prywatności i wizerunku.
- Dodano progresywny loader rejestru i danych kontaktowych bez wstrzykiwania HTML, z fallbackiem dla nieudanego `fetch`.
