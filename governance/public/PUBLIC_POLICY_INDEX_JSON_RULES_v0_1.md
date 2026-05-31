# Public Policy Index JSON Rules

Status: szkic zasad technicznych dla maszynowego indeksu publicznego depozytu polityk.

## 1. Cel

`governance/public/public_policy_index.json` jest maszynowym indeksem dokumentów publicznego depozytu Polityki i standardy. Plik ma porządkować metadane dokumentów tak, aby kolejne moduły ngOs mogły je walidować, renderować i wykorzystywać jako dane wejściowe dla przyszłych generatorów dokumentów.

`governance/public/PUBLIC_POLICY_INDEX.md` pozostaje publicznym widokiem czytelnym dla człowieka. W GOV-4 oba pliki są utrzymywane równolegle, a gate sprawdza ich synchronizację po `document_id`, `title`, `category` i `status`.

## 2. Wymagane pola indeksu

Indeks JSON zawiera:

- `index_id`;
- `organization_id`;
- `status`;
- `version`;
- `generated_from`;
- `documents`.

`documents` musi być niepustą tablicą rekordów dokumentów.

## 3. Wymagane pola dokumentu

Każdy rekord dokumentu zawiera:

- `document_id`;
- `title`;
- `category`;
- `type`;
- `status`;
- `version`;
- `adopted_by`;
- `resolution_ref`;
- `statute_refs`;
- `visibility`;
- `planned_review`;
- `notes`.

`statute_refs` jest tablicą. Jeżeli odwołanie do statutu nie jest jeszcze rozbite na jednostki redakcyjne, tablica może tymczasowo zawierać opis tekstowy przeniesiony z tabeli Markdown.

## 4. Synchronizacja JSON i Markdown

Na tym etapie JSON i Markdown muszą zawierać ten sam zestaw `document_id`. Brak dokumentu po jednej ze stron jest błędem gate'u.

Różnice w `document_id`, `title`, `category` i `status` są traktowane jako błąd, ponieważ te pola opisują podstawową tożsamość i status dokumentu. Pozostałe pola mogą być w przyszłości walidowane ostrzej, gdy JSON stanie się jedynym źródłem prawdy.

## 5. Relacja do ngOs

Docelowo `public_policy_index.json` może stać się źródłem danych dla:

- renderowania publicznej sekcji Polityki i standardy;
- generatora uchwał i załączników polityk;
- walidacji statusu dokumentów przed uruchomieniem modułów ngOs;
- kwartalnych raportów zgodności;
- mapowania dokumentów do statutu JSON i legal corpus ledger.

## 6. Ograniczenia

GOV-4 nie jest generatorem uchwał, silnikiem zgodności prawnej ani opinią prawną. JSON porządkuje metadane i umożliwia techniczne kontrole spójności, ale nie rozstrzyga kompetencji organów, zgodności statutu ani treści dokumentów z prawem.
