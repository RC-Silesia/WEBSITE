# PUBLIC-ONEPAGE-0 - Rotary Silesia Public Visiting Card

## Zakres one page

Publiczny `index.html` zostal uproszczony do wizytowki Rotary Club Silesia. Strona komunikuje: kim jest klub, czym jest idea Rotary, jaki jest lokalny profil na Slasku, jakie sa obszary dzialania, jakie kierunki inicjatyw sa rozwijane, kogo zapraszamy do wspolpracy i jak sie skontaktowac.

## Odlozone do pelnej platformy ngOs

Nie uruchamiamy publicznie:

- logowania ani panelu czlonka;
- modul roboczy dla operatorow;
- prywatnego backendu ani API;
- platnosci online, operatorow platnosci ani skladek online;
- formularzy zbierajacych dane osobowe;
- danych czlonkow ani danych wrazliwych;
- pelnego archiwum dokumentow;
- funkcji AI, RAG ani automatyzacji;
- produkcyjnego systemu operacyjnego Rotary Silesia / ngOs.

Platforma ngOs jest opisana w repo jako zaplecze organizacyjne w rozwoju, ale nie jest prezentowana na stronie glownej jako dzialajaca usluga publiczna.

## Status kontaktu

Kontakt publiczny zostal ograniczony do `mailto:silesia@rotary.org.pl`. Formularz kontaktowy nie jest wystawiony na stronie glownej, poniewaz publiczny sprint nie uruchamia produkcyjnego backendu formularzy ani dodatkowej obslugi danych osobowych.

## Status aktualnosci i porozumienia SOB

W sprincie v1.5.82 publiczna wizytowka zawiera jedna aktualnosc: podpisanie 02.06.2026 w Mikolowie porozumienia ramowego ze Slaskim Ogrodem Botanicznym Zwiazkiem Stowarzyszen. Komunikat ma status opublikowany, ale zdjecia z wydarzenia pozostaja wstrzymane do zatwierdzenia zgod wizerunkowych.

Porozumienie ramowe ROTARY for PLANET jest opisane jako obowiazujace w okresie 02.06.2026-31.05.2028. Ta informacja nie oznacza uruchomienia pelnej platformy ngOs, platnosci, panelu czlonka ani publicznego archiwum dokumentow.

## Status SEO / noindex

`index.html` i `privacy.html` nie zawieraja blokady indeksowania. `robots.txt` pozwala na indeksowanie publicznej wizytowki i wskazuje `sitemap.xml`.

Pozostale strony pomocnicze lub dawne podstrony moga nadal miec meta robots blokujace indeksowanie, poniewaz nie sa czescia publicznego one page i nie sa prezentowane jako pelna platforma produkcyjna.

## Status WCAG smoke

Wykonany zakres smoke:

- jeden `h1` na stronie glownej;
- logiczne sekcje `h2`/`h3`;
- link skip do tresci;
- widoczny fokus zapewniany przez istniejacy CSS;
- obrazy z tekstami alternatywnymi;
- brak formularza wymagajacego etykiet i obslugi bledow;
- brak publicznych kontrolek platnosci, logowania i panelu czlonka.

Pelna deklaracja zgodnosci WCAG nie jest skladana w tym sprincie.

## Status linkow

Na stronie glownej pozostawiono tylko linki publiczne: sekcje one page, mailto, Facebook, polityka prywatnosci oraz szkic polityki dostepnosci. Nie ma linkow do lokalnych adresow deweloperskich, prywatnego backendu, API, modulu roboczego ani platnosci.

Wyniki sprawdzen wzorcow wymaganych w sprincie:

- blokady indeksowania: nie wystepuja w publicznym `index.html` ani `privacy.html`; pozostaja w podstronach pomocniczych poza publicznym one page oraz w historycznych dokumentach repo.
- lokalny host: wystepuje tylko w instrukcjach uruchomienia lokalnego w `README.md`.
- adres loopback, absolutna sciezka dysku Windows, sekrety Supabase, dane PESEL, `member_sensitive`, dawny przycisk zasad Rotary i skrot operatora platnosci: brak wynikow.
- modul roboczy: brak wynikow w publicznym `index.html`; termin nie jest linkowany na stronie publicznej.
- operator platnosci wskazywany we wczesniejszych sprintach: pozostaje w historycznych dokumentach, danych roboczych i nieaktywnym skrypcie makiety platnosci; publiczny `index.html` nie linkuje ani nie renderuje modulu platnosci.

## Rzeczy nieuruchamiane publicznie teraz

Publiczna strona nie obiecuje, ze platforma Rotary Silesia / ngOs dziala produkcyjnie. Komunikat publiczny brzmi: Rotary Club Silesia - wizytowka i kierunki dzialania; platforma ngOs jest rozwijana jako zaplecze organizacyjne.
