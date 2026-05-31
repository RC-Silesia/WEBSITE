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
- metadane wierszy dokumentów o statusie `adopted` lub `published`;
- jednoznaczny status dokumentów roboczych, projektowych i w przygotowaniu;
- brak widoczności `private_governance` w publicznym indeksie;
- brak sformułowań sugerujących publikację prywatnych threat modeli, sekretów, danych członków lub rejestrów dostępu.

## 3. Czego skrypt jeszcze nie sprawdza

Skrypt nie sprawdza jeszcze:

- zgodności prawnej dokumentów;
- zgodności uchwał ze statutem;
- kompetencji organów według statutu JSON;
- poprawności reprezentacji;
- zmian w aktach wyższego rzędu;
- automatycznego generowania uchwał;
- merytorycznej poprawności polityk;
- kompletności prywatnych rejestrów governance.

## 4. Relacja do LegalStatutePolicy Gate

Ten gate jest pierwszą techniczną warstwą projektu LegalStatutePolicy Consistency Gate. Obejmuje wyłącznie metadane publicznego indeksu i schema-lite. Docelowo kolejne poziomy będą mogły sprawdzać statut JSON, kompetencje organów, reprezentację, relacje uchwała-polityka-procedura oraz kwartalne raporty zgodności.

## 5. Ograniczenia

Gate nie pobiera automatycznie prawa, nie korzysta z zewnętrznych API, nie tworzy opinii prawnej i nie zmienia dokumentów. Wynik `PASS` oznacza wyłącznie, że metadane publicznego depozytu spełniają aktualne techniczne reguły repozytorium.
