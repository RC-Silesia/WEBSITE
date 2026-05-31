# Governance Metadata Gate

Status: first technical metadata gate v0.1.

## 1. Zakres GOV-3

GOV-3 wdraża pierwszy techniczny gate metadanych dla publicznego depozytu Polityki i standardy. Gate działa lokalnie w Node.js, bez zewnętrznych zależności i bez pobierania aktów prawnych.

Skrypt: `scripts/governance-metadata-check.mjs`.

## 2. Co skrypt sprawdza

Skrypt sprawdza:

- istnienie publicznego indeksu polityk i zasad depozytu;
- istnienie trzech schema-lite z GOV-2;
- poprawność parsowania JSON dla schema-lite;
- obecność podstawowych pól `schema_id`, `title`, `status`, `description`, `required_fields`, `fields`;
- obecność wymaganych kolumn tabeli w `PUBLIC_POLICY_INDEX.md`;
- metadane wierszy dokumentów deklarujących przyjęcie (`przyjęt`, `adopted`, `published`);
- regułę: dokument deklarujący przyjęcie musi mieć powiązaną uchwałę albo jawny placeholder `[UCHWAŁA_NR]` / `[UCHWAŁA_DATA]`;
- lifecycle statusów dokumentów: `required_for_operation`, `draft`, `under_review`, `board_approval_required`, `adopted_pending_metadata`, `adopted`, `published`, `superseded`, `archived`;
- jednoznaczny status dokumentów roboczych, projektowych, wymaganych operacyjnie i w przygotowaniu;
- regułę staging/production dla minimalnego pakietu przed uruchomieniem strony;
- brak widoczności `private_governance` w publicznym indeksie;
- brak sformułowań sugerujących publikację prywatnych threat modeli, sekretów, danych członków lub rejestrów dostępu.

## 3. Reguła staging/production

Domyślnym trybem jest `staging`. Skrypt rozpoznaje staging, gdy `robots.txt` zawiera `Disallow: /`, a tryb produkcyjny można włączyć jawnie przez `NGOS_ENV=production` albo plik flagę `.ngos-production`.

W trybie staging dokumenty w statusie `draft`, `under_review`, `board_approval_required`, `required_for_operation`, `projekt`, `do przyjęcia` albo `w przygotowaniu` są dozwolone i nie wymagają uchwały. Nadal obowiązuje jednak twarda reguła anty-overclaim: jeżeli status deklaruje przyjęcie, musi istnieć powiązana uchwała albo jawny placeholder.

W trybie production dokumenty z minimalnego pakietu przed uruchomieniem strony nie mogą pozostać w statusie draft/projekt/do przyjęcia ani w `adopted_pending_metadata`, chyba że przyszły mechanizm wyjątków zostanie osobno zatwierdzony przez właściwy organ.

## 4. Reguła adopted bez uchwały albo placeholdera

Skrypt uznaje, że wiersz deklaruje przyjęcie, jeżeli status pasuje do `przyjęt`, `adopted` albo `published` i jednocześnie nie pasuje do `projekt`, `do przyjęcia`, `draft`, `w przygotowaniu` albo `under_review`.

Taki wiersz musi mieć w kolumnie `Powiązana uchwała` realne odniesienie albo token `[UCHWAŁA_NR]` / `[UCHWAŁA_DATA]`. Pusta wartość, `do uzupełnienia` albo `Do określenia` bez placeholdera powoduje `FAIL`.

## 5. Czego skrypt jeszcze nie sprawdza

Skrypt nie sprawdza jeszcze:

- zgodności prawnej dokumentów;
- zgodności uchwał ze statutem;
- kompetencji organów według statutu JSON;
- poprawności reprezentacji;
- zmian w aktach wyższego rzędu;
- automatycznego generowania uchwał;
- merytorycznej poprawności polityk;
- kompletności prywatnych rejestrów governance.

## 6. Relacja do LegalStatutePolicy Gate

Ten gate jest pierwszą techniczną warstwą projektu LegalStatutePolicy Consistency Gate. Obejmuje wyłącznie metadane publicznego indeksu i schema-lite. Docelowo kolejne poziomy będą mogły sprawdzać statut JSON, kompetencje organów, reprezentację, relacje uchwała-polityka-procedura oraz kwartalne raporty zgodności.

## 7. Ograniczenia

Gate nie pobiera automatycznie prawa, nie korzysta z zewnętrznych API, nie tworzy opinii prawnej i nie zmienia dokumentów. Wynik `PASS` oznacza wyłącznie, że metadane publicznego depozytu spełniają aktualne techniczne reguły repozytorium.
