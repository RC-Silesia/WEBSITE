# Statute JSON Integrity Audit v0.1

Data: 2026-06-01

Status: PASS after GOV-5.2 structural fix / legal review still required.

Commit źródłowy GOV-5: `1ed901e Add statute JSON governance source`.

Commit naprawczy GOV-5.2 usuwa techniczny duplikat `statut:art_viii`: źródłowy DOCX zachowuje dwa nagłówki `Artykuł VIII`, więc drugi z nich otrzymał unikalny techniczny identyfikator `art_viii_b` i `statut:art_viii_b`, z zachowaniem źródłowej etykiety oraz ostrzeżeniem `source_numbering_warning`.

## 1. Zakres

Audyt obejmuje:

- `governance/legal/statut.json`;
- `assets/docs/RC_Silesia_Statut_Final.docx`;
- `governance/legal/EVOTING_CONCEPT_v0_1.md`;
- nowy skrypt kontrolny `scripts/statute-json-check.mjs`.

Audyt nie jest opinią prawną i nie potwierdza wykładni statutu. Sprawdza integralność techniczną reprezentacji JSON, stabilność identyfikatorów i możliwość użycia `statute_refs` przez kolejne bramki governance.

## 2. Źródło

Źródłowy dokument statutu:

- ścieżka: `assets/docs/RC_Silesia_Statut_Final.docx`;
- rozmiar: 50054 bajty;
- SHA-256: `87666b933611d6d15a7a02fd57835e7ca2dabb4a851a29acf9ac8959c91c914d`.

Metadane źródła zostały dopisane do `governance/legal/statut.json` jako:

- `source_document_sha256`;
- `source_document_size_bytes`.

## 3. Wyniki strukturalne

`statut.json` zawiera:

- 16 artykułów;
- 33 paragrafy;
- 239 jednostek w `units`;
- stabilny prefiks referencji `statut:`;
- unikalne `article.id`;
- unikalne `article.canonical_ref`;
- unikalne `paragraph.id`;
- unikalne `paragraph.canonical_ref`;
- unikalne `unit.id`;
- unikalne `unit.canonical_ref`;
- strukturę artykuł -> paragraf -> jednostka potomna.

Źródłowy dokument zawiera dwa nagłówki `Artykuł VIII`. W reprezentacji JSON jest to zachowane jako duplikat `label`, ale techniczne `id` i `canonical_ref` pozostają unikalne. Skrypt zgłasza ten stan jako `WARNING`, nie `FAIL`.

Każda jednostka w `units` ma wymagane pola:

- `id`;
- `canonical_ref`;
- `label`;
- `type`;
- `text`;
- `children`;
- `parent_id`;
- `article_id`;
- `paragraph_id`;
- `source_order`;
- `effective_from`.

## 4. Kontrola treści i kodowania

Skrypt potwierdza:

- `statut.json` parsuje się jako JSON;
- pliki są UTF-8 bez BOM;
- linie są LF, bez CRLF;
- zachowany jest znak `§`;
- zachowane są polskie znaki;
- nie wykryto typowych wzorców mojibake;
- brak pustych jednostek tekstowych;
- obecne są kluczowe fragmenty statutu, w tym członkostwo czynne, Walne Zgromadzenie, zwykła większość, zmiana statutu, reprezentacja oraz komunikacja elektroniczna.

## 5. Odwołania wymagane przez e-głosowanie

Skrypt potwierdza istnienie kluczowych referencji:

- `statut:par_9_ust_1`;
- `statut:par_10`;
- `statut:par_18`;
- `statut:par_18_ust_19`;
- `statut:par_18_ust_20`;
- `statut:par_19`;
- `statut:par_20`;
- `statut:par_33`;
- `statut:par_33_ust_1`;
- `statut:par_33_ust_2`;
- `statut:par_33_ballot_by_mailing`.

Wszystkie odwołania `statut:...` użyte w `EVOTING_CONCEPT_v0_1.md` istnieją w `statut.json`.

## 6. Ballot-by-mailing

`statut:par_33_ballot_by_mailing` istnieje jako jednostka typu `derived_concept`, z rodzicem `par_33`, polem `derived_from: "statut:par_33"` oraz `not_formal_statute_unit: true`.

To oznacza, że jest technicznie sprawdzalnym pojęciem wyprowadzonym z treści §33, ale nie jest samodzielną jednostką formalną statutu. Interpretacja prawna pozostaje wymagana przed jakąkolwiek implementacją e-głosowania.

Tekst źródłowy zawiera zapis `tajne glosowanie mailem` bez polskiego znaku `ł`. Skrypt nie poprawia tego automatycznie; zgłasza `WARNING`, aby odróżnić literalne brzmienie źródła od błędu technicznego.

## 7. Ograniczenia

Ten audyt nie potwierdza:

- prawnej wykładni statutu;
- poprawności wszystkich decyzji mapowania kompetencji organów;
- dopuszczalności e-głosowania;
- kompletności przyszłego generatora uchwał;
- zgodności z aktami wyższego rzędu.

W razie rozbieżności pierwszeństwo ma formalny dokument statutu przyjęty przez właściwy organ. `statut.json` jest reprezentacją maszynową do kontroli governance, nie autonomicznym nowym statutem.

## 8. Wniosek

Status techniczny:

`GOV-5 ACCEPTED_AS_MACHINE_STATUTE_SOURCE_FOR_GOVERNANCE_TESTING`

Warunek techniczny GOV-5.2:

- brak duplikatów `article.id` i `article.canonical_ref`;
- brak duplikatów `paragraph.id` i `paragraph.canonical_ref`;
- brak duplikatów `unit.id` i `unit.canonical_ref`;
- odwołania w `EVOTING_CONCEPT_v0_1.md` nadal wskazują istniejące refy.

Warunek dalszy:

Przed egzekwowaniem kompetencji organów i uchwał w trybie blokującym należy wykonać przegląd prawny mapowania statutu oraz dodać rejestr uchwał jako osobne źródło maszynowe.
