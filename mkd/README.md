# Mikołowska Karta Drzew

`mkd-www` to samodzielny statyczny projekt roboczego serwisu Mikołowska Karta Drzew. Serwis prezentuje informacyjną warstwę pakietu MKD v1.4 po korekcie: aktywne zadrzewianie miasta, kategorie miejsc, karty operacyjne, tabelę doboru taksonów, rejestry i etapowe dokumenty techniczne.

Status formalny: pakiet MKD v1.4 po korekcie jest materiałem do uzgodnień wewnętrznych i podpisania zarządzenia. Do czasu formalnego przyjęcia dokumentu serwis ma charakter informacyjny i roboczy.

## Zasada rejestru

Jedno drzewo = jedna karta = jeden wpis w rejestrze. Publicznie pokazujemy tylko dane istniejące w `assets/data/rejestr.json`. Nie ma deklaracji liczbowych ani komunikatów o efektach bez wpisu w rejestrze.

Każda karta drzewa dokumentuje:

- gatunek,
- lokalizację,
- datę nasadzenia,
- źródło sadzonki,
- monitoring przeżywalności po 12 i 24 miesiącach,
- opcjonalny punkt 36 miesięcy dla nasadzeń objętych gwarancją,
- opcjonalnego opiekuna instytucjonalnego,
- referencje do dokumentów nasadzenia.

## Moduły merytoryczne

Wersja `0.2.8` scala treść strony z pakietem `Mikolowska_Karta_Drzew_pakiet_final_v1_4_po_korekcie` i zachowuje wcześniejsze moduły informacyjne MKD:

- `Standard MKD v1.4` - podstawowe zasady aktywnego zadrzewiania miasta,
- `Kategorie miejsc A-E` - decyzja, czy sadzić drzewo duże, mniejsze, formę kolumnową czy zieleń alternatywną,
- `Karty operacyjne` - Karta Miejsca Nasadzenia i Karta Terenu Inwestycji,
- `Ocena miejsca` - pola decyzyjne: korzenie, korona, woda, zasolenie, kolizje, uzbrojenie i utrzymanie,
- `Dobór taksonów` - tabela pomocnicza do kategorii miejsca oraz lista taksonów wymagających ostrożności,
- `Dokumenty T-01-T-09` - rejestr dokumentów technicznych do etapowego opracowania.

Tabela doboru taksonów nie zastępuje oceny konkretnego miejsca. Gatunki regulowane prawnie i gatunki ryzyka wymagają aktualnej weryfikacji przed decyzją terenową.

## Schemat karty drzewa

Tablica `drzewa` pozostaje pusta w sprincie `MKD-WWW-0-bootstrap`. Docelowy rekord ma postać:

```json
{
  "id": "MKD-2026-0001",
  "gatunek": { "nazwaPolska": "", "nazwaLacinska": "", "zgodnyZTabelaTaksonow": null },
  "lokalizacja": {
    "opis": "",
    "epsg2177": { "x": null, "y": null },
    "wgs84": { "lat": null, "lng": null },
    "typTerenu": "",
    "idMiejscaRWMN": ""
  },
  "dataNasadzenia": "",
  "zrodloSadzonki": "",
  "obwodPniaCm": null,
  "monitoring": {
    "m12": { "data": "", "status": "", "uwagi": "" },
    "m24": { "data": "", "status": "", "uwagi": "" },
    "m36": { "data": "", "status": "", "uwagi": "" }
  },
  "opiekun": { "typ": "", "nazwa": "" },
  "zdjecia": [],
  "kartaNasadzeniaD2": "",
  "kartaMiejscaNasadzenia": ""
}
```

Zasady danych:

- `id` ma format `MKD-RRRR-NNNN` i musi być unikalny,
- układ kanoniczny danych przestrzennych to `EPSG:2177`,
- `wgs84` (`EPSG:4326`) służy przyszłej mapie web,
- przy wpisie wymagana jest co najmniej jedna para współrzędnych, a druga para może być wyliczana przy imporcie poza tym sprintem,
- `idMiejscaRWMN` jest miejscem na powiązanie z miejskim rejestrem miejsc nasadzeń,
- `zgodnyZTabelaTaksonow` oznacza zgodność gatunku z tabelą taksonów przyjętą w warstwie gminnej,
- `opiekun` jest opcjonalny i nie powinien zawierać danych osobowych osób fizycznych do czasu przyjęcia polityki RODO,
- `kartaNasadzeniaD2` jest referencją do dokumentu nasadzenia komponentu społecznego/ŚOB,
- `kartaMiejscaNasadzenia` jest referencją do dokumentu warstwy gminnej,
- status monitoringu przyjmuje jedną z wartości: `zyje`, `oslabione`, `usuniete`, `wymienione`, `brak-danych`,
- `m36` jest opcjonalny i wypełniany dla nasadzeń objętych gwarancją 36-miesięczną.

Schemat jest zaprojektowany pod bezstratny eksport do struktury GIS gminy, w tym do docelowego formatu GeoPackage. Sam eksport i konwersja współrzędnych nie są częścią tego sprintu.

## Lokalny podgląd

Projekt działa bez bibliotek zewnętrznych.

Opcja przez lokalny serwer HTTP:

```powershell
python -m http.server 8080
```

Następnie otwórz:

<http://127.0.0.1:8080/>

Opcja bez serwera:

```powershell
Invoke-Item .\index.html
```

Przy `file://` przeglądarka może zablokować `fetch` do plików JSON. To oczekiwane: statyczny HTML zawiera fallback i pokazuje uczciwy stan zerowy rejestru.

## Pochodzenie architektury

Projekt korzysta z wcześniej wypracowanego wzorca statycznej strony informacyjnej, ale nie zależy od zewnętrznych plików ani nazewnictwa. Zaadaptowano:

- układ informacyjny sekcji projektowych, aktualnościowych i galeryjnych,
- wzorzec akordeonu klikalnego i obsługiwanego klawiaturą,
- kafle informacyjne, badge, przyciski i układ sekcji,
- ostrożny model komunikacji: brak liczb i efektów bez potwierdzonego rejestru.
- własny system kolorystyki sezonowej MKD oparty o ciemną zieleń i barwy liści.

Źródła zewnętrzne nie są częścią publicznego serwisu MKD.

## Odstępstwa względem źródła

- Nazwa publiczna została zmieniona na `Mikołowska Karta Drzew`.
- Dodano obowiązkowy pasek statusu formalnego.
- Dodano sekcję relacji inicjatywy Mikołowianie dla klimatu do gminnej Mikołowskiej Karty Drzew.
- Rozszerzono model danych rejestru o zgodność z `EPSG:2177`, `EPSG:4326`, RWMN, `m36` oraz referencję do karty miejsca nasadzenia.
