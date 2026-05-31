# Minimalne wymagania dla statutu JSON

**Status: szkic koncepcyjny (governance design).** To NIE jest wdrożony mechanizm kontroli zgodności ani podstawa zgodności prawnej. Dokument nie stanowi opinii prawnej. Wszelka interpretacja statutu i treść uchwał wymagają weryfikacji przez osobę uprawnioną / prawnika.

Status techniczny: wymagania projektowe v0.1.

Statut JSON ma umożliwić powiązanie dokumentów governance z kompetencjami organów, reprezentacją, uchwałami i jednostkami redakcyjnymi statutu. Dokument nie definiuje pełnego parsera statutu.

## 1. Jednostki redakcyjne

Statut JSON powinien zachować identyfikatory paragrafów, ustępów, punktów i liter. Każda jednostka powinna mieć stabilny identyfikator, na przykład `par_8`, `par_8_ust_1`, `par_8_ust_1_pkt_2`.

Wymagane pola minimalne:

- `id`;
- `label`;
- `text`;
- `children`;
- `source_order`;
- `effective_from`, jeżeli znane.

## 2. Organy

Statut JSON powinien zawierać listę organów organizacji, ich skład, sposób powołania i zakres działania.

Minimalnie:

- nazwa organu;
- identyfikator organu;
- kompetencje;
- tryb podejmowania uchwał;
- relacje do innych organów;
- odwołania do jednostek statutu.

## 3. Kompetencje organów

Kompetencje powinny być modelowane tak, aby gate mógł sprawdzić, czy dany organ może przyjąć politykę, regulamin, uchwałę albo zmianę dokumentu.

Minimalnie:

- `competence_id`;
- `organ_id`;
- `action_type`;
- `scope`;
- `statute_refs`;
- `notes`.

## 4. Reprezentacja

Statut JSON powinien opisywać zasady reprezentacji organizacji, w tym role podpisujące i liczbę wymaganych osób, jeżeli statut to reguluje.

Minimalnie:

- role uprawnione do reprezentacji;
- liczba wymaganych podpisów;
- ograniczenia zakresu;
- odwołania do jednostek statutu;
- wyjątki albo wymóg dodatkowej uchwały, jeżeli istnieje.

## 5. Tryb uchwał

Statut JSON powinien opisywać tryb podejmowania uchwał:

- organ podejmujący;
- wymagane kworum, jeżeli statut je określa;
- wymagana większość;
- możliwość trybu obiegowego lub zdalnego, jeżeli występuje;
- wymogi protokołowania;
- odwołania do jednostek statutu.

## 6. Członkostwo

Statut JSON powinien wskazywać typy członkostwa, warunki nabycia, prawa, obowiązki, utratę członkostwa i organy właściwe.

## 7. Składki

Jeżeli statut reguluje składki, statut JSON powinien zawierać:

- organ ustalający składkę;
- tryb ustalenia;
- podstawę statutową;
- relację do polityk płatności lub rejestru należności.

## 8. Majątek

Statut JSON powinien opisywać zasady majątku, źródła finansowania, dysponowanie środkami oraz ograniczenia, jeżeli statut je wskazuje.

## 9. Zmiana statutu

Statut JSON powinien wskazywać organ właściwy, tryb zmiany, wymaganą większość, kworum i jednostki redakcyjne regulujące zmianę statutu.

## 10. Rozwiązanie organizacji

Statut JSON powinien wskazywać tryb rozwiązania organizacji, organ właściwy, sposób dysponowania majątkiem i odwołania do jednostek statutu.

## 11. Odwołania do jednostek redakcyjnych

Wszystkie dokumenty governance powinny odwoływać się do statutu przez stabilne identyfikatory jednostek redakcyjnych, nie przez opis słowny. Wersja publiczna dokumentu może pokazywać czytelną etykietę, ale metadane powinny zachować identyfikator.

## 12. Wymogi techniczne

- Plik statutu JSON musi być UTF-8 bez BOM.
- Linie powinny używać LF, bez CRLF.
- Polskie znaki muszą zostać zachowane; zakazana jest normalizacja do ASCII.
- Należy zachować znak `§`, jeżeli występuje w jednostkach statutu.
- Identyfikatory powinny być stabilne, ASCII i bez spacji.
- Teksty źródłowe statutu powinny pozostać wierne dokumentowi przyjętemu.
