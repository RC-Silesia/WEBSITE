# Zasady publicznego depozytu polityk i standardów RC Silesia

Status: wersja robocza v0.1, dokument governance public.

## 1. Definicja depozytu

Publiczny depozyt polityk i standardów to uporządkowany indeks dokumentów przyjętych przez RC Silesia oraz dokumentów jawnie oznaczonych jako projekty, wzorce docelowe albo dokumenty w przygotowaniu. Depozyt służy przejrzystości organizacyjnej i wskazuje, które zasady obowiązują, które są projektowane, a które pozostają poza publikacją z uwagi na bezpieczeństwo, prywatność albo charakter wewnętrzny.

Depozyt nie jest miejscem publikacji dokumentów prywatnych governance. Dokument prywatny może być wskazany w indeksie tylko jako metadana zakresu, bez treści, danych osób, sekretów, rejestrów dostępu, wewnętrznych analiz ryzyka ani materiałów nieprzeznaczonych publicznie.

## 2. Statusy dokumentów

Stosowane statusy:

- `draft` - dokument roboczy, nieprzyjęty;
- `under_review` - dokument w przeglądzie merytorycznym, prawnym albo technicznym;
- `adopted` - dokument przyjęty przez właściwy organ, jeszcze niekoniecznie opublikowany;
- `published` - dokument przyjęty i opublikowany w depozycie publicznym;
- `superseded` - dokument zastąpiony nowszą wersją;
- `archived` - dokument historyczny, utrzymywany jako ślad audytowy;
- `withdrawn` - dokument wycofany decyzją właściwego organu.

Każdy dokument przyjęty musi mieć wersję oraz podstawę przyjęcia. Dokument powinien wskazywać organ przyjmujący, powiązaną uchwałę oraz datę lub numer uchwały, jeżeli są dostępne.

## 3. Organ, uchwała i statut

Dokument powinien wskazywać organ przyjmujący i powiązaną uchwałę. Jeżeli kompetencja organu wynika ze statutu, dokument powinien wskazywać właściwe odwołania do statutu.

W docelowym ngOs odwołania do statutu będą generowane ze statutu przetwarzanego w formacie JSON. Model relacji:

`statut JSON -> reprezentacja -> uchwała -> polityka -> procedura -> CI gate / test / rejestr wyjątków`

Oznacza to, że system powinien umieć powiązać dokument z organem, reprezentacją, podstawą statutową, uchwałą przyjmującą, treścią polityki, procedurami wykonawczymi oraz testami lub rejestrami wyjątków, które egzekwują przyjęte zasady.

## 4. Dokument publiczny a prywatny governance

Dokument publiczny może zostać opublikowany, gdy:

- został przyjęty albo jawnie oznaczony jako projekt lub dokument w przygotowaniu;
- nie zawiera danych członków, sekretów, prywatnych rejestrów dostępu, wewnętrznych threat modeli ani innych materiałów nieprzeznaczonych publicznie;
- jego publikacja jest zgodna z zasadami ochrony danych i bezpieczeństwa;
- status i wersja są jednoznaczne.

Dokument prywatny governance pozostaje poza publicznym depozytem. Dotyczy to w szczególności macierzy dostępów, szczegółowych rejestrów kont, danych członków, wewnętrznych analiz ryzyka, danych technicznych bezpieczeństwa, sekretów, kluczy, tokenów, konfiguracji infrastruktury oraz roboczych materiałów niezatwierdzonych do publikacji.

## 5. Minimalny pakiet przed uruchomieniem strony

Przed uruchomieniem strony lub nowego modułu publicznego minimalny pakiet powinien obejmować:

- uchwałę albo decyzję o uruchomieniu strony lub modułu;
- rejestr osób odpowiedzialnych za stronę lub moduł, przechowywany prywatnie;
- zasady publikacji treści i dokumentów;
- politykę prywatności albo informację o przetwarzaniu danych;
- politykę dostępności cyfrowej lub governance gate dla dostępności;
- rejestr barier dostępności lub rejestr wyjątków;
- zasady publikacji wizerunku, jeżeli strona publikuje zdjęcia osób.

## 6. Minimalny pakiet przed uruchomieniem płatności

Przed uruchomieniem płatności online minimalny pakiet powinien obejmować:

- regulamin płatności online;
- uchwałę lub decyzję o wyborze operatora płatności;
- politykę darowizn lub składek;
- politykę zwrotów i reklamacji;
- procedurę ręcznych wpłat bankowych, jeżeli system ją obsługuje;
- opis ról, odpowiedzialności i dostępu do danych płatności;
- kontrolę zgodności formularzy i komunikatów płatniczych z WCAG 2.2 AA.

## 7. Minimalny pakiet przed uruchomieniem AI

Przed uruchomieniem modułu AI minimalny pakiet powinien obejmować:

- politykę korzystania z AI;
- rejestr zastosowań AI;
- zasady human review;
- zasady oznaczania lub weryfikacji treści generowanych przez AI;
- ocenę gotowości regulacyjnej, w tym AI Act readiness, w zakresie właściwym dla organizacji;
- rejestr wyjątków i incydentów dotyczących AI;
- rozdzielenie dokumentów publicznych od prywatnych analiz ryzyka i danych bezpieczeństwa.

## 8. Zasada publikacji

Na stronie publicznej publikujemy wyłącznie dokumenty przyjęte albo jawnie oznaczone jako projekty, wzorce docelowe lub dokumenty w przygotowaniu. Robocze uchwały nie mogą być przedstawiane jako dokumenty przyjęte. Każdy dokument publiczny powinien mieć status tekstowy, wersję, zakres, właściciela merytorycznego albo organ przyjmujący oraz plan przeglądu.

## 9. Powiązanie z LegalStatutePolicy Gate

Publiczny depozyt dokumentów przyjętych jest powiązany z LegalStatutePolicy Consistency Gate. Oznacza to, że dokument publiczny powinien mieć metadane kompatybilne z policy metadata schema, a dokument przyjęty powinien być powiązany z uchwałą albo inną podstawą przyjęcia.

Docelowo zgodność dokumentów będzie sprawdzana względem statutu JSON oraz legal corpus ledger. Bramka ma wykrywać niespójności między statutem, reprezentacją, uchwałami, politykami, procedurami, testami CI i rejestrami barier lub wyjątków.

Kwartalne raporty zgodności będą generowane jako draft do decyzji Zarządu. Raport może wskazywać warningi, propozycje zmian i projekty uchwał, ale nie zmienia automatycznie statutu, polityk ani regulaminów. Decyzję podejmuje właściwy organ organizacji.
