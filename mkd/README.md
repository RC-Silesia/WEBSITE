# Mikołowska Karta Drzew 1:1

Samodzielny statyczny projekt programu identyfikowalnych nasadzeń drzew w Mikołowie i na Górnym Śląsku. Projekt wydziela kierunek ROTARY for PLANET z architektury strony `RC-Silesia/WEBSITE`, ale nie zależy od żadnych plików tamtego repozytorium.

## Zasada 1:1

Jedno drzewo = jedna karta = jeden wpis w rejestrze. Publikujemy tylko to, co istnieje w `assets/data/rejestr.json`. Nie ma deklaracji liczbowych ani komunikatów o efektach bez wpisu w rejestrze.

Każda karta drzewa dokumentuje:

- gatunek,
- lokalizację,
- datę nasadzenia,
- źródło sadzonki,
- monitoring przeżywalności po 12 i 24 miesiącach,
- opcjonalnego opiekuna instytucjonalnego,
- referencje do Karty Nasadzenia D2.

## Schemat karty drzewa

Tablica `drzewa` pozostaje pusta w sprincie `MKD-0-bootstrap`. Docelowy rekord ma postać:

```json
{
  "id": "MKD-2026-0001",
  "gatunek": { "nazwaPolska": "", "nazwaLacinska": "" },
  "lokalizacja": { "opis": "", "lat": null, "lng": null, "typTerenu": "" },
  "dataNasadzenia": "",
  "zrodloSadzonki": "",
  "monitoring": {
    "m12": { "data": "", "status": "", "uwagi": "" },
    "m24": { "data": "", "status": "", "uwagi": "" }
  },
  "opiekun": { "typ": "", "nazwa": "" },
  "zdjecia": [],
  "kartaNasadzeniaD2": ""
}
```

Zasady danych:

- `id` ma format `MKD-RRRR-NNNN` i musi być unikalny,
- `opiekun` jest opcjonalny i nie powinien zawierać danych osobowych osób fizycznych do czasu przyjęcia polityki RODO,
- `kartaNasadzeniaD2` jest referencją do dokumentu Karty Nasadzenia D2 i w tym sprincie pozostaje pustym stringiem,
- status monitoringu przyjmuje jedną z wartości: `zyje`, `oslabione`, `usuniete`, `wymienione`, `brak-danych`.

## Lokalny podglad

Strona działa jako statyczny projekt bez bibliotek zewnętrznych.

Opcja bez serwera:

```powershell
Invoke-Item .\index.html
```

Opcja przez lokalny serwer HTTP:

```powershell
python -m http.server 8080
```

Następnie otwórz `http://127.0.0.1:8080/`.

Przy `file://` przeglądarka może zablokować `fetch` do plików JSON. To oczekiwany scenariusz: HTML zawiera statyczny fallback i pokazuje uczciwy stan zerowy rejestru.

## Relacja do RC Silesia i ROTARY for PLANET

Projekt został wydzielony z architektury strony `RC-Silesia/WEBSITE`. Zaadaptowano:

- treści kierunku ROTARY for PLANET z sekcji projektów i galerii,
- wzorzec akordeonów klikalnych i obsługiwanych klawiaturą,
- paletę Rotary Gold, Royal Blue, Cardinal oraz stonowaną zieleń dla wątku przyrodniczego,
- ostrożny model komunikacji: bez liczb i efektów poza potwierdzonym rejestrem.

Repozytorium `WEBSITE` pozostaje źródłem architektonicznym i nie jest modyfikowane przez ten projekt.
