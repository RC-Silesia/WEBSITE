# LegalStatutePolicy Consistency Gate

Status: governance design / CI gate candidate v0.1.

Ten dokument opisuje projekt bramki governance dla publicznego depozytu Polityki i standardy oraz przyszłego modułu ngOs Governance Pack. Nie jest opinią prawną i nie zastępuje decyzji organów RC Silesia ani zewnętrznej konsultacji prawnej.

## 1. Cel bramki

LegalStatutePolicy Consistency Gate ma pilnować integralności dokumentów organizacji: statutu, uchwał, polityk, regulaminów, procedur, rejestrów, dokumentów publicznych i dokumentów prywatnych governance. Bramka ma wykrywać niespójności, brak metadanych, brak podstawy przyjęcia, konflikt kompetencji organów oraz potrzebę przeglądu po zmianach prawa, statutu lub polityk.

System nie zmienia automatycznie polityk ani statutu. System przygotowuje warningi, propozycje zmian i projekty uchwał. Decyzję podejmuje człowiek albo właściwy organ organizacji.

## 2. Zakres

Bramka obejmuje:

- statut i statut JSON;
- reprezentację organizacji;
- uchwały Zarządu, Walnego Zgromadzenia i innych właściwych organów;
- polityki, regulaminy i procedury;
- publiczny depozyt dokumentów przyjętych;
- dokumenty prywatne governance, o ile są sprawdzane w repozytorium lub systemie wewnętrznym;
- CI gates, testy i rejestry barier lub wyjątków.

Dokumenty prywatne governance nie trafiają do publicznego indeksu. Mogą być powiązane metadanymi, ale bez publikowania treści, danych członków, sekretów, prywatnych rejestrów dostępu lub wewnętrznych analiz ryzyka.

## 3. LegalStatutePolicy consistency chain

Łańcuch spójności:

`statute JSON -> representation -> resolution -> policy -> procedure -> CI gate/test -> defect register`

Interpretacja:

1. Statut JSON wskazuje organy, kompetencje, reprezentację i tryb uchwał.
2. Reprezentacja określa, kto może skutecznie działać w imieniu organizacji.
3. Uchwała wskazuje organ, podstawę statutową i dokumenty przyjmowane, zmieniane lub uchylane.
4. Polityka albo regulamin ma metadane, wersję, status, właściciela i podstawę przyjęcia.
5. Procedura opisuje wykonanie polityki.
6. CI gate lub test egzekwuje część zasad, jeżeli da się ją sprawdzić technicznie.
7. Defect register zapisuje bariery, wyjątki, warningi i status napraw.

## 4. Gate levels

### GOV-LSP-0 Legal Corpus Integrity

Sprawdza, czy ledger aktów wyższego rzędu istnieje, ma daty przeglądu, statusy i powiązane moduły. Na tym etapie nie pobieramy automatycznie aktów prawnych.

### GOV-LSP-1 Statute JSON Validity

Sprawdza poprawność statutu JSON: identyfikatory jednostek redakcyjnych, organy, kompetencje, reprezentację, tryb uchwał i odwołania do paragrafów lub ustępów.

### GOV-LSP-2 Organ Competence Check

Sprawdza, czy organ wskazany w uchwale lub metadanych dokumentu ma kompetencję do przyjęcia danego dokumentu według statutu JSON.

### GOV-LSP-3 Representation Check

Sprawdza, czy metadane uchwały i dokumentu wskazują właściwą reprezentację lub role podpisujące, zgodnie ze statutem JSON i zasadami organizacji.

### GOV-LSP-4 Policy Metadata Check

Sprawdza, czy dokument publiczny ma status, wersję, metadane, kategorię, widoczność, właściciela, datę wejścia w życie, cykl przeglądu i podstawę przyjęcia.

### GOV-LSP-5 Cross-Document Consistency

Sprawdza relacje między uchwałą, polityką, procedurą, rejestrem i testem. Przykład: polityka dostępności powinna wskazywać WCAG gate, rejestr barier i plan przeglądu.

### GOV-LSP-6 Higher-Order Legal Mapping

Sprawdza mapowanie dokumentu do aktów wyższego rzędu z legal corpus ledger. Ten poziom generuje warningi i wymaga przeglądu człowieka, szczególnie po zmianach prawa.

### GOV-LSP-7 Change Impact Gate

Po zmianie statutu, polityki, uchwały lub wpisu w legal corpus ledger wskazuje potencjalnie dotknięte dokumenty, moduły ngOs i testy. Wyniki mogą mieć status `WARNING`, `REVIEW_REQUIRED` albo `LEGAL_REVIEW_REQUIRED`.

### GOV-LSP-8 Resolution Draft Generator

Przygotowuje projekt uchwały lub listę zmian, ale nie przyjmuje dokumentów automatycznie. Projekt uchwały jest materiałem dla Zarządu, Walnego Zgromadzenia albo innego właściwego organu.

### GOV-LSP-9 Quarterly Compliance Report

Generuje kwartalny draft raportu zgodności statutu, polityk i modułów ngOs z legal corpus ledger oraz z dokumentami wyższego rzędu. Raport wskazuje warningi, rekomendowane działania, projekty uchwał i obszary wymagające opinii prawnej.

## 5. Statusy wyników

- `PASS` - kontrola zakończona bez zastrzeżeń.
- `INFO` - informacja bez blokowania.
- `WARNING` - potencjalna niespójność lub potrzeba przeglądu.
- `REVIEW_REQUIRED` - wymagana decyzja właściciela dokumentu lub roli governance.
- `BLOCKED` - brak wymaganego dokumentu, metadanych albo podstawy przyjęcia blokuje uruchomienie modułu.
- `LEGAL_REVIEW_REQUIRED` - potrzebna weryfikacja prawna.
- `BOARD_DECISION_REQUIRED` - wymagana decyzja Zarządu.
- `GENERAL_MEETING_REQUIRED` - wymagana decyzja Walnego Zgromadzenia albo innego organu statutowego.

## 6. Zasady bramki

- System nie zmienia automatycznie polityk ani statutu.
- System przygotowuje warningi, propozycje zmian i projekty uchwał.
- Człowiek albo właściwy organ organizacji podejmuje decyzję.
- Dokument przyjęty musi mieć uchwałę albo inną podstawę przyjęcia.
- Dokument publiczny musi mieć status, wersję i metadane.
- Dokumenty prywatne governance nie trafiają do publicznego indeksu.
- Warning po zmianie prawa, statutu lub polityki powinien wskazywać dokumenty i moduły dotknięte zmianą.
- Raport kwartalny jest draftem do decyzji Zarządu, nie automatycznym zatwierdzeniem zmian.

## 7. Granice automatyzacji

W tej wersji nie integrujemy z zewnętrznymi API prawnymi, nie pobieramy automatycznie aktów prawnych i nie tworzymy opinii prawnych. Legal corpus ledger jest rejestrem źródeł oraz przeglądów, a nie automatyczną bazą interpretacji prawa.
