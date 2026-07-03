# Mikołowska Karta Drzew

`mkd-www` to samodzielny statyczny projekt roboczego serwisu Mikołowska Karta Drzew. Serwis rozwija inicjatywę Mikołowianie dla klimatu przy gminnej Mikołowskiej Karcie Drzew i jest przygotowywany jako narzędzie publicznej informacji o standardzie odpowiedzialnych nasadzeń.

Status formalny: porozumienie z Gminą Mikołów jest w przygotowaniu. Do czasu jego zawarcia serwis ma charakter roboczy i nie jest oficjalnym serwisem Gminy.

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

Projekt korzysta z architektury wypracowanej w repo `RC-Silesia/WEBSITE`, ale nie zależy od jego plików. Zaadaptowano:

- układ informacyjny sekcji projektowych, aktualnościowych i galeryjnych,
- wzorzec akordeonu klikalnego i obsługiwanego klawiaturą,
- kafle informacyjne, badge, przyciski i układ sekcji,
- ostrożny model komunikacji: brak liczb i efektów bez potwierdzonego rejestru.
- własny system kolorystyki sezonowej MKD oparty o ciemną zieleń i barwy liści.

Repo `RC-Silesia/WEBSITE` jest w tym sprincie tylko źródłem odczytu i nie jest modyfikowane.

## Odstępstwa względem źródła

- Nazwa publiczna została zmieniona na `Mikołowska Karta Drzew`.
- Dodano obowiązkowy pasek statusu formalnego.
- Dodano sekcję relacji inicjatywy Mikołowianie dla klimatu do gminnej Mikołowskiej Karty Drzew.
- Rozszerzono model danych rejestru o zgodność z `EPSG:2177`, `EPSG:4326`, RWMN, `m36` oraz referencję do karty miejsca nasadzenia.
