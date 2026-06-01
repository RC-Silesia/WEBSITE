# AI Enablement Readiness Gate v0.1

Status: governance design / GOV-6 readiness gate candidate.

To nie jest zgoda na produkcyjne uruchomienie AI, opinia prawna, ocena jakości modelu ani decyzja o dopuszczalności konkretnego dostawcy. Brama sprawdza, czy architektura ngOs jest gotowa na dołożenie warstwy AI bez naruszania deterministycznego rdzenia systemu.

Zasada naczelna: deterministyczny rdzeń pozostaje nienaruszalny; AI jest warstwą asystującą. Decyzje prawne, finansowe, członkowskie, statutowe i głosowaniowe pozostają w kontrolowanych procedurach systemu i właściwych organach organizacji.

## Cel

AI Enablement Readiness Gate jest bramą-alertem dla przyszłych funkcji AI w ngOs. Jej celem jest odpowiedź na pytanie:

> Czy można włączyć daną funkcję AI jako warstwę asystującą bez przepisywania architektury i bez obchodzenia RLS, audytu, RODO oraz decyzji człowieka?

Brama nie mówi, czy model jest dobry. Nie porównuje jakości odpowiedzi AI. Nie tworzy opinii prawnej. Sprawdza wyłącznie gotowość architektury i governance.

## Ledger

Źródłem stanu jest:

`governance/legal/ai_enablement_readiness_ledger.json`

Ledger jest żywym rejestrem. Statusy zmieniają się wraz z postępem backendu, governance, RODO, security i testów runtime. `GREEN` dla konkretnej funkcji AI jest świadomą decyzją wdrożeniową, nie automatyczną zgodą produkcyjną.

## Semantyka Alertu

### BLOCK

`BLOCK` oznacza:

> AI enablement blocked: włączenie teraz wymagałoby zmiany architektury.

Ten alert występuje, gdy którykolwiek niezmiennik architektoniczny `AI-INV-*` nie ma statusu `met` albo `verified_runtime`.

Przykład: jeżeli audit log nie rejestruje każdej akcji AI, późniejsze dodanie AI wymagałoby przebudowy ścieżek zapisu, narzędzi i kontroli. Taki stan blokuje włączenie AI.

### WARNING

`WARNING` oznacza, że wszystkie niezmienniki architektoniczne są spełnione, ale część warunków governance, RODO albo security pozostaje niepełna.

W takim stanie AI można rozważyć tylko dla konkretnej, opisanej funkcji niskiego ryzyka, z human review, bez autonomicznych skutków prawnych, finansowych, członkowskich lub głosowaniowych.

### GREEN

`GREEN` oznacza, że wszystkie warunki istotne dla danej funkcji są spełnione. AI wolno włączyć dla tej funkcji, nadal zgodnie z przyjętymi politykami, zakresem danych, dokumentacją RODO, security review i decyzją organizacji.

## Reguła Progu

Domyślnie gate wypisuje alert i nie blokuje prac dev/staging.

Jeżeli środowisko ustawia:

`AI_ENABLED=true`

to gate staje się blokujący. Jeśli alert jest `BLOCK`, skrypt kończy się błędem i wypisuje niespełnione niezmienniki. To zapobiega włączeniu AI w architekturze, która nie jest na to gotowa.

## Niezmienniki Architektoniczne

Niezmienniki `AI-INV-*` są twarde. Ich niespełnienie blokuje AI, bo późniejsze włączenie AI wymagałoby przebudowy rdzenia.

1. `AI-INV-1` - dostęp AI do danych idzie kontekstem wołającego i RLS; nigdy przez service-role bypass.
2. `AI-INV-2` - deterministyczny rdzeń jest jedynym właścicielem decyzji prawnych, finansowych, członkowskich i głosowaniowych.
3. `AI-INV-3` - append-only audit log rejestruje każdą akcję AI, w tym prompt, narzędzie, wynik i zatwierdzenie człowieka.
4. `AI-INV-4` - istnieje tryb bez AI: feature flag i graceful degradation.
5. `AI-INV-5` - retrieval/RAG ma izolację per-tenant równoważną RLS oraz propagację usunięcia do indeksu i embeddingów.

## Warunki Governance, RODO i Security

Warunki `AI-GOV-*`, `AI-RODO-*` i `AI-SEC-*` nie zawsze blokują architekturę, ale blokują `GREEN` dla funkcji, której dotyczą.

Minimalny zestaw:

- rejestr przypadków użycia AI i klasyfikacja ryzyka;
- katalog tego, co wymaga human review i co może być proceduralnie autonomiczne;
- DPA z dostawcą modelu, rezydencja danych UE i zasady PII w promptach;
- threat model prompt-injection, eksfiltracji i użycia narzędzi;
- red-team lub równoważny test bezpieczeństwa przed produkcją.

## Relacja Do Backend Runtime Testów

`AI-INV-1` może być oznaczone jako `verified_runtime`, jeżeli istnieje dowód, że backend egzekwuje dostęp przez token wołającego i RLS. Aktualny ledger odwołuje się do prywatnego repo backendu:

`ngos-payments-backend:docs/RUNTIME_TEST_RESULTS_v0_1.md`

Ten dowód nie jest publikacją sekretów ani danych członków. Wskazuje wyłącznie na wynik testu runtime: FORCE RLS, read model tokenem wołającego oraz brak service-role w ścieżce zwykłego odczytu.

## Ograniczenia

Brama nie:

- pobiera aktów prawnych;
- ocenia jakości modeli;
- wykonuje red-team;
- sprawdza DPA dostawcy;
- uruchamia AI;
- dodaje backendu ani UI;
- zastępuje opinii prawnej, RODO review ani pentestu.

## Zasada Wdrożeniowa

AI powinno być włączane funkcja po funkcji. Dla każdej funkcji trzeba wskazać:

- cel i zakres;
- dane wejściowe;
- role użytkowników;
- czy dane zawierają PII;
- czy wynik ma skutki prawne, finansowe, członkowskie albo głosowaniowe;
- ścieżkę human review;
- audit log;
- sposób wyłączenia funkcji bez degradacji rdzenia systemu.

Jeżeli którejkolwiek z tych informacji brakuje, funkcja nie powinna być oznaczana jako `GREEN`.
