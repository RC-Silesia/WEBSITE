# Koncepcja modułu głosowania elektronicznego v0.1

**Status: szkic koncepcyjny (governance design).** To NIE jest wdrożony mechanizm głosowania, NIE jest podstawa prawna i NIE stanowi opinii prawnej. Wiążące głosowanie organów ma skutki prawne; dopuszczalność, architektura tajności, integralność i relacja do statutu wymagają weryfikacji przez prawnika oraz osobę odpowiedzialną za bezpieczeństwo przed jakąkolwiek implementacją.

Status lifecycle: `under_review` / `legal_review_required` / `security_review_required`.

## 1. Cel i zakres

Ten dokument opisuje koncepcyjny moduł głosowania elektronicznego dla RC Silesia i przyszłego ngOs. Celem jest zdefiniowanie granic, zależności i wymogów governance przed decyzją o backendzie, rejestrze członków, płatnościach i kontach użytkowników.

Moduł może w przyszłości obsługiwać dwa typy użycia:

- głosowania wiążące organów Klubu, jeżeli są dopuszczalne według statutu, prawa i uchwał właściwego organu;
- głosowania niewiążące, konsultacje albo sondaże, jeżeli są jawnie oznaczone jako niewiążące i nie zastępują uchwał organów.

Ten sprint nie dodaje backendu, API, UI głosowania, formularza oddawania głosu, liczenia głosów w przeglądarce ani żadnej namiastki wiążącego głosowania na statycznym froncie.

## 2. Źródła statutowe i status mapowania

Repozytorium zawiera maszynową warstwę statutu:

- `governance/legal/statut.json` - pierwsza wersja statutu JSON wygenerowana z dokumentu DOCX, ze stabilnymi identyfikatorami `statut:...`;
- `assets/docs/RC_Silesia_Statut_Final.docx` - źródłowy dokument statutu;
- `assets/data/site.json` - publiczny skrót organów statutowych i reguł reprezentacji;
- `index.html` - publiczna prezentacja wybranych informacji formalnych.

Poniższe identyfikatory są teraz sprawdzalnymi odwołaniami do `governance/legal/statut.json`. Nadal mają status `REVIEW_REQUIRED`, ponieważ maszynowy JSON nie zastępuje interpretacji prawnej statutu ani weryfikacji przez właściwy organ.

| Obszar | Identyfikator statutu JSON | Źródło obecne w repo | Co wynika z dostępnego źródła | Status |
| --- | --- | --- | --- | --- |
| Członkostwo czynne | `statut:par_9_ust_1` | `governance/legal/statut.json`, `assets/docs/RC_Silesia_Statut_Final.docx` | Członek czynny ma status członka czynnego Rotary w RI w domenie Klubu. Prawo głosu wymaga potwierdzenia w rejestrze członków i procedurze głosowania. | `REVIEW_REQUIRED` |
| Członkostwo honorowe | `statut:par_10` | `governance/legal/statut.json`, `assets/docs/RC_Silesia_Statut_Final.docx` | Członkowie honorowi nie mają prawa głosowania i nie mogą być wybierani na funkcje w Klubie. | `REVIEW_REQUIRED` |
| Walne Zgromadzenie | `statut:par_18` | `governance/legal/statut.json`, `assets/data/site.json` | Walne Zgromadzenie jest najwyższą władzą Klubu; wybiera i odwołuje organy, zatwierdza sprawozdania, uchwala statut, składki i wybrane decyzje strategiczne. | `REVIEW_REQUIRED` |
| Tryb uchwał | `statut:par_18_ust_19` | `governance/legal/statut.json` | Uchwały Walnego Zgromadzenia Członków zapadają zwykłą większością głosów członków uprawnionych do głosowania. | `REVIEW_REQUIRED` |
| Zmiana statutu | `statut:par_18_ust_20` | `governance/legal/statut.json` | Zmiana Statutu wymaga bezwzględnej większości głosów, przy obecności 2/3 ogólnej liczby członków Klubu. | `LEGAL_REVIEW_REQUIRED` |
| Zarząd | `statut:par_19` | `governance/legal/statut.json`, `assets/data/site.json` | Zarząd prowadzi sprawy Klubu, reprezentuje Klub, organizuje zebrania i Walne Zgromadzenia oraz wykonuje obowiązki wynikające z prawa, statutu i uchwał Walnego Zgromadzenia. | `REVIEW_REQUIRED` |
| Komisja Rewizyjna | `statut:par_20` | `governance/legal/statut.json`, `assets/data/site.json` | Komisja Rewizyjna kontroluje działalność Klubu i może występować z wnioskiem o zwołanie Walnego Zgromadzenia. | `REVIEW_REQUIRED` |
| Komunikacja elektroniczna | `statut:par_33` | `governance/legal/statut.json`, `assets/docs/RC_Silesia_Statut_Final.docx` | Zebrania Klubu, posiedzenia Zarządu, Komisji Rewizyjnej i komitetów mogą odbywać się przy wykorzystaniu środków komunikacji elektronicznej; dopuszcza się wykorzystywanie tych środków w głosowaniach na zebraniach i posiedzeniach władz statutowych Klubu. | `REVIEW_REQUIRED` |
| Ballot-by-mailing | `statut:par_33_ballot_by_mailing` | `governance/legal/statut.json`, `assets/docs/RC_Silesia_Statut_Final.docx` | W komunikacji elektronicznej mogą być wykorzystywane m.in. platforma on-line, mail, mailing i ballot-by-mailing, opisany jako tajne głosowanie mailem. | `LEGAL_REVIEW_REQUIRED` |

## 3. Co statut już dopuszcza, a co wymaga potwierdzenia

### Statut dopuszcza według dostępnego źródła

- `statut:par_33`: wykorzystanie środków komunikacji elektronicznej do zebrań Klubu, posiedzeń Zarządu, Komisji Rewizyjnej i komitetów.
- `statut:par_33`: wykorzystanie środków komunikacji elektronicznej w głosowaniach na zebraniach i posiedzeniach władz statutowych Klubu.
- `statut:par_33_ballot_by_mailing`: użycie ballot-by-mailing jako pojęcia tajnego głosowania mailem.

### Wymaga potwierdzenia prawnika

- czy `ballot-by-mailing` pozwala na wiążące tajne głosowanie całkowicie elektroniczne poza posiedzeniem, czy tylko na określony tryb korespondencyjny powiązany z posiedzeniem;
- czy głosowanie tajne może być realizowane przez system internetowy, jeżeli system przechowuje tożsamość głosującego i treść głosu w odseparowanych rejestrach;
- czy głosowanie elektroniczne w sprawach osobowych lub wyborczych wymaga dodatkowej uchwały proceduralnej albo regulaminu głosowań;
- czy poszczególne typy uchwał Walnego Zgromadzenia, Zarządu albo Komisji Rewizyjnej mogą być podejmowane zdalnie w tym samym trybie;
- czy zmiana statutu lub uchwały o szczególnych progach może być obsłużona elektronicznie bez zmiany statutu.

### Może wymagać zmiany statutu

- rozszerzenie wiążącego głosowania poza ramy `statut:par_33`, jeżeli obecna treść ogranicza je do zebrań i posiedzeń;
- wprowadzenie systemowego tajnego głosowania online innego niż ballot-by-mailing, jeżeli prawnik uzna, że obecne brzmienie nie obejmuje takiego mechanizmu;
- powierzenie automatycznemu systemowi rozstrzygania ważności głosu, kworum albo wyniku bez wyraźnej podstawy statutowej lub regulaminowej;
- głosowanie produkcyjne bez rejestru uprawnionych, procedury reklamacji i audytowalnej podstawy ustalenia liczby głosów.

Zmiana statutu jest materią Walnego Zgromadzenia, a nie samodzielną decyzją Zarządu. Dla takich przypadków status powinien być co najmniej `GENERAL_MEETING_REQUIRED` i `LEGAL_REVIEW_REQUIRED`.

## 4. Uprawnieni do głosu

System nie może samodzielnie decydować, kto jest uprawniony do głosowania. Źródłem prawdy musi być przyszły backendowy rejestr członków, powiązany z:

- typem członkostwa;
- statusem członka;
- prawem głosu;
- ewentualnym zawieszeniem praw;
- datą ustalenia listy uprawnionych;
- organem, którego głosowanie dotyczy.

Koncepcyjnie:

- członek czynny powinien być oceniany według `statut:par_9_ust_1` i pełnych jednostek statutu dotyczących praw członka;
- członek honorowy powinien być wyłączony z głosowań, jeżeli potwierdza to `statut:par_10`;
- osoby zawieszone lub bez prawa głosu nie mogą być liczone ani do kworum, ani do liczby oddanych ważnych głosów, jeżeli tak wynika ze statutu lub uchwały.

Bez backendowego rejestru członków moduł może być wyłącznie makietą, dokumentem projektowym albo narzędziem konsultacji niewiążącej.

## 5. Tryby głosowania

### Głosowanie jawne

Głosowanie jawne jest technicznie prostsze: system może przechowywać informację, kto i jak głosował, o ile istnieje podstawa prawna, informacja dla członków, ograniczenie dostępu i retencja. Nadal wymaga backendu, audyt logu i procedury reklamacji.

### Głosowanie tajne

Głosowanie tajne wymaga oddzielenia tożsamości uprawnionego od treści głosu. Statyczny frontend nie może zapewnić tajności, integralności ani niezaprzeczalności.

Minimalne wymagania tajności:

- oddzielny rejestr wydania uprawnienia do głosu od rejestru treści głosów;
- brak możliwości powiązania treści głosu z osobą przez administratora aplikacji w zwykłym trybie pracy;
- kryptograficzne albo proceduralne zabezpieczenie przed podwójnym głosowaniem;
- audytowalne otwarcie i zamknięcie głosowania;
- jawny protokół wyników bez ujawniania treści głosów konkretnych osób;
- procedura awaryjna i reklamacyjna.

Tajne głosowanie nie może być implementowane przez `localStorage`, plik JSON w repozytorium, formularz statyczny, arkusz kalkulacyjny ani liczenie głosów w przeglądarce.

## 6. Kworum, progi i większości

Każde głosowanie musi wskazywać podstawę ustalenia:

- liczby uprawnionych;
- liczby obecnych albo uczestniczących, jeżeli kworum jest wymagane;
- liczby głosów ważnych;
- rodzaju większości;
- sposobu liczenia głosów wstrzymujących się;
- skutku braku kworum.

Znane odniesienia robocze:

- `statut:par_18_ust_19`: zwykła większość dla uchwał Walnego Zgromadzenia;
- `statut:par_18_ust_20`: zmiana statutu wymaga bezwzględnej większości przy obecności 2/3 członków;
- `statut:par_33`: środki komunikacji elektronicznej mogą być używane w głosowaniach na zebraniach i posiedzeniach władz statutowych.

Wszystkie reguły kworum i większości mają status `REVIEW_REQUIRED` do czasu opinii prawnej i zatwierdzenia procedury głosowań.

## 7. Integralność i niezaprzeczalność

Wiążące głosowanie elektroniczne wymaga backendu. Minimalnie:

- uwierzytelnienie osoby uprawnionej;
- autoryzacja do konkretnego głosowania;
- jeden ważny głos na osobę, z obsługą ewentualnej zmiany głosu tylko jeśli dopuszcza to regulamin;
- niezmienialny audyt log zdarzeń;
- znaczniki czasu otwarcia, oddania głosu, zamknięcia i zatwierdzenia wyniku;
- brak cichej edycji wyniku;
- protokół wyniku i ślad osoby zatwierdzającej;
- procedura unieważnienia głosowania albo korekty błędów.

Żadna z tych cech nie może być wiarygodnie zapewniona przez statyczną stronę publiczną.

## 8. RODO i minimalizacja danych

Moduł głosowania przetwarza dane członków i dane o uczestnictwie w decyzjach organów. Przed wdrożeniem potrzebne są co najmniej:

- podstawa przetwarzania danych uprawnionych;
- informacja o zakresie danych i celu;
- reguła retencji rejestru uprawnionych, logów i protokołów;
- minimalizacja danych w raportach publicznych;
- ograniczenie dostępu dla administratorów;
- zasada rozdzielenia tożsamości i treści głosu w głosowaniu tajnym;
- rejestr czynności albo odpowiednik wewnętrzny, jeżeli wymagany;
- ocena ryzyka i procedura naruszeń.

Treść prywatnego rejestru uprawnionych, szczegółowe logi głosowania i threat model nie trafiają do publicznego repozytorium.

## 9. Bezpieczeństwo

Przed implementacją wymagany jest prywatny threat model, obejmujący co najmniej:

- przejęcie konta członka;
- podszycie się pod uprawnionego;
- podwójne głosowanie;
- manipulację wynikiem;
- nieuprawniony dostęp administratora;
- utratę tajności głosu;
- zmianę listy uprawnionych po otwarciu głosowania;
- awarię w trakcie głosowania;
- spór o ważność głosu lub wynik.

Threat model jest dokumentem prywatnym governance. Publicznie można publikować tylko metrykę, status i ogólne zasady, nie szczegóły ataków ani zabezpieczeń operacyjnych.

## 10. Zależność architektoniczna

E-głosowanie dzieli fundament z płatnościami, rejestrem członków i przyszłym panelem administracyjnym:

- tożsamość i konta użytkowników;
- role i uprawnienia;
- rejestr członków;
- audyt log;
- bezpieczna trwała baza danych;
- workflow zatwierdzania;
- eksporty i protokoły.

Z tego powodu e-głosowanie nie powinno wejść przed decyzją o backendzie. Minimalna kolejność architektoniczna:

1. backend tożsamości i RBAC/RLS;
2. rejestr członków i statusów członkostwa;
3. manualne procesy płatności i panel skarbnika;
4. audyt log i role administracyjne;
5. głosowanie jawne jako najprostszy wariant;
6. głosowanie tajne dopiero po opinii prawnej i przeglądzie bezpieczeństwa.

## 11. Etapy wdrożenia

Proponowane etapy, bez dat i bez obietnicy wdrożenia:

| Etap | Zakres | Status |
| --- | --- | --- |
| EVOTE-0 | Dokument koncepcyjny, mapowanie statutu, decyzja o zakresie | `under_review` |
| EVOTE-1 | Opinia prawna: statut, tryby głosowań, tajność, kworum | `legal_review_required` |
| EVOTE-2 | Decyzja o backendzie wspólnym dla członków, płatności i głosowań | `board_decision_required` |
| EVOTE-3 | Rejestr członków i uprawnień do głosu | `backend_required` |
| EVOTE-4 | Głosowanie jawne, protokół i audit log | `security_review_required` |
| EVOTE-5 | Głosowanie tajne z separacją tożsamości i treści głosu | `legal_review_required` / `security_review_required` |

## 12. Twarde ograniczenia

- Nie liczyć głosów w przeglądarce.
- Nie używać `localStorage`, plików JSON w repozytorium ani statycznych formularzy jako urny.
- Nie uruchamiać wiążących głosowań bez backendu, rejestru członków, audyt logu i podstawy statutowej.
- Nie publikować danych członków, list uprawnionych, prywatnych logów, threat modelu ani szczegółowych procedur bezpieczeństwa.
- Nie deklarować, że moduł jest dopuszczalny prawnie albo gotowy produkcyjnie bez weryfikacji prawnika i bezpieczeństwa.

## 13. Relacja do ngOs Governance Pack

Docelowo ngOs Governance Pack może generować:

- uchwałę o przyjęciu regulaminu głosowań elektronicznych;
- regulamin głosowań elektronicznych;
- metadane głosowania;
- protokół wyniku;
- rejestr wyjątków i reklamacji;
- odwołania do `statut.json`;
- raport kwartalny zgodności procedury z legal corpus ledger.

Ten dokument jest tylko pierwszym szkicem koncepcyjnym i nie tworzy żadnego mechanizmu wykonawczego.
