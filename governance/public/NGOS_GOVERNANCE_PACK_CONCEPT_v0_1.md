# ngOs Governance Pack - koncepcja docelowa

Status: koncepcja v0.1, dokument governance public.

## 1. Cel

ngOs Governance Pack ma być modułem generującym zestaw uchwał, polityk, regulaminów, rejestrów i indeksów publicznych dla organizacji pozarządowych wdrażających ngOs. Celem jest to, aby organizacja przed uruchomieniem strony lub wybranego modułu systemu miała przyjęty minimalny pakiet zasad, odpowiedzialności i bramek jakości.

RC Silesia pełni rolę wdrożenia referencyjnego: publiczny depozyt polityk i standardów pokazuje, jak organizacja może ujawniać dokumenty przyjęte i dokumenty w przygotowaniu, bez publikowania danych prywatnych, sekretów ani wewnętrznych materiałów bezpieczeństwa.

## 2. Dane wejściowe

Docelowy generator powinien korzystać z następujących danych wejściowych:

- profil organizacji: nazwa, forma prawna, adres, dane kontaktowe, zakres działania;
- statut przetworzony do formatu JSON, w tym organy, kompetencje, reprezentacja i tryb podejmowania decyzji;
- reprezentacja organizacji i zasady podpisywania dokumentów;
- lista organów i ról odpowiedzialnych za obszary governance;
- wybrane moduły ngOs, na przykład strona publiczna, płatności, newsletter, CMS, panel administracyjny, galerie, dokumenty, AI;
- ustawienia widoczności dokumentów: publiczne, prywatne, publiczne tylko jako metadane;
- wymagania sektorowe, jeżeli organizacja działa w obszarach regulowanych albo z udziałem osób małoletnich.

## 3. Dane wyjściowe

Generator powinien tworzyć:

- uchwały przyjmujące polityki i regulaminy;
- załączniki z tekstami polityk;
- regulaminy modułów;
- rejestry odpowiedzialności, dostępów, barier, wyjątków i przeglądów;
- metadane dokumentów;
- publiczny indeks dokumentów przyjętych i dokumentów w przygotowaniu;
- odwołania do konkretnych jednostek statutu zapisanych w JSON;
- listę bramek CI, testów i procedur wymaganych przed uruchomieniem modułu.

## 4. Model dokumentu

Podstawowy model to:

`uchwała przyjmująca + załącznik polityki`

Uchwała wskazuje organ, datę, podstawę statutową, wersję i zakres przyjęcia. Załącznik zawiera treść polityki, standardu albo regulaminu. Metadane dokumentu powinny obejmować co najmniej:

- ID dokumentu;
- tytuł;
- kategorię;
- typ dokumentu;
- status;
- wersję;
- organ przyjmujący;
- powiązaną uchwałę;
- odwołania do statutu;
- widoczność;
- właściciela merytorycznego lub odpowiedzialną rolę;
- planowany przegląd;
- relację do testu, CI gate albo rejestru wyjątków, jeżeli dotyczy.

## 5. Statusy i widoczność

Dokumenty powinny obsługiwać statusy: `draft`, `under_review`, `adopted`, `published`, `superseded`, `archived`, `withdrawn`.

Widoczność powinna rozróżniać:

- dokument publiczny;
- dokument prywatny;
- dokument prywatny z publiczną metadaną;
- projekt publiczny;
- dokument archiwalny.

Status nie może być komunikowany wyłącznie kolorem. W indeksach publicznych status powinien być opisany tekstowo.

## 6. Warunek uruchomienia modułu

Przed uruchomieniem modułu ngOs musi istnieć przyjęty minimalny pakiet polityk dla tego modułu. Przykłady:

- strona publiczna: zasady publikacji, dostępność cyfrowa, polityka prywatności, wizerunek, rejestr odpowiedzialności;
- płatności: regulamin płatności, wybór operatora, zwroty i reklamacje, role dostępu, testy formularzy;
- CMS: workflow publikacji, role redakcyjne, historia zmian, zasady przeglądu treści;
- panel administracyjny: role, logowanie, rejestr dostępów, procedura nadawania i odbierania uprawnień;
- AI: polityka AI, rejestr zastosowań, human review, oznaczanie i przegląd treści.

Jeżeli minimalny pakiet nie istnieje, moduł powinien pozostać w trybie roboczym albo stagingowym.

## 7. Relacja z CI gates

Dokument governance powinien mieć przełożenie na kontrolę techniczną tam, gdzie jest to możliwe. Przykład: polityka dostępności cyfrowej wskazuje standard WCAG 2.2 AA, a repozytorium egzekwuje pierwszą bramę przez statyczny test HTML/ARIA. Kolejne bramy mogą obejmować axe, pa11y, Lighthouse, smoke test klawiatury, kontrolę reflow i rejestr wyjątków.

## 8. Granice publikacji

ngOs Governance Pack nie powinien publikować danych członków, sekretów, prywatnych rejestrów dostępu, wewnętrznych threat modeli, konfiguracji bezpieczeństwa ani roboczych dokumentów nieprzeznaczonych publicznie. Publiczny indeks może wskazywać, że dany dokument istnieje lub jest wymagany, ale nie musi ujawniać jego treści.
