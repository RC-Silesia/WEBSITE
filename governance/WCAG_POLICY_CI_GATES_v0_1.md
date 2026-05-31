# WCAG Policy and CI Gates v0.1

Status: governance / CI gate

Standard docelowy: WCAG 2.2 AA.

Ten dokument wdraża politykę dostępności cyfrowej RC Silesia jako obowiązkowy warunek jakości dla dalszego rozwoju publicznej strony i docelowego systemu ngOs. Strona jest publicznym stagingiem. Pełna zgodność z WCAG 2.2 AA nie jest jeszcze deklarowana, ponieważ nie wykonano pełnego audytu eksperckiego.

## Zakres

Polityka obejmuje:

- publiczną stronę internetową RC Silesia;
- formularze kontaktowe i przyszłe formularze operacyjne;
- przyszły CMS i workflow publikacji treści;
- przyszły panel administracyjny;
- przyszłe płatności online;
- dokumenty publikowane do pobrania, w tym PDF i DOCX.

## Gate A: statyczny test WCAG

Każda zmiana strony musi przejść statyczny test dostępności uruchamiany poleceniem:

```bash
npm run check:wcag:static
```

Gate A sprawdza podstawowe regresje w HTML i JS: język strony, obecność `main`, pojedynczy `h1`, atrybuty `alt`, dostępne nazwy linków, spójność `aria-controls`, podstawy akordeonów i formularzy, brak `javascript:void(0)`, brak inline handlerów oraz brak przypisania do `innerHTML`.

## Gate B: automatyczny test axe/pa11y

W przyszłym sprincie należy dodać automatyczny test axe lub pa11y dla kluczowych widoków. Test powinien działać w CI i blokować regresje poziomu AA tam, gdzie narzędzie może je wiarygodnie wykryć.

## Gate C: keyboard smoke test

W przyszłym sprincie należy dodać procedurę testu klawiatury dla nawigacji, akordeonów, karuzeli, kart, formularzy, zakładek i przyszłych płatności. Test ma potwierdzać brak pułapki klawiatury i widoczny fokus.

## Gate D: mobile, reflow i zoom

Zmiany wizualne wymagają sprawdzenia reflow i zoomu, w tym szerokości 320, 375, 768, 1024 i 1280 px oraz powiększenia tekstu. Brak poziomego overflow jest warunkiem akceptacji.

## Gate E: formularze

Formularze muszą mieć etykiety, komunikaty błędów, jasne instrukcje, poprawny fokus i zrozumiałe potwierdzenie wysłania. Przed produkcją wymagany jest test czytnikiem ekranu.

## Gate F: płatności

Płatności online mogą zostać uruchomione dopiero po osobnym audycie dostępności ścieżki płatności, operatora, komunikatów błędów, regulaminów i potwierdzeń. Przelewy24 ani inny operator nie jest objęty deklaracją zgodności bez weryfikacji.

## Gate G: dokumenty

Dokumenty PDF i DOCX publikowane publicznie muszą mieć osobną weryfikację dostępności: strukturę nagłówków, język, alternatywy, kolejność odczytu, linki i tabele. Dokument niezweryfikowany należy oznaczyć w rejestrze ryzyk.

## Gate H: CMS i workflow treści

Przyszły CMS musi wymuszać podstawowe wymagania dostępności: alternatywy tekstowe, hierarchię nagłówków, opisowe linki, kontrolę kontrastu, walidację formularzy i ślad akceptacji treści.

## Gate I: audit evidence

Każdy sprint dostępności powinien zostawiać ślad dowodowy: wyniki testów, datę, zakres, wykryte bariery, decyzje akceptacyjne i link do commita. Bariery trafiają do `governance/WCAG_DEFECT_REGISTER.md`.

## Definition of Done dla zmian strony

Zmiana może zostać uznana za gotową, gdy:

- przechodzi `npm run ci:gates`;
- nie pogarsza dostępności klawiatury, fokusów, nazw dostępnych i semantyki;
- nie wprowadza nowych obrazów bez `alt`;
- nie wprowadza linków ani przycisków bez dostępnej nazwy;
- nie wprowadza formularzy bez etykiet;
- nie usuwa `noindex,nofollow` ze stagingu bez decyzji publikacyjnej;
- nie zmienia `robots.txt` bez decyzji publikacyjnej;
- ma wpis w changelogu albo jest częścią udokumentowanego commita technicznego;
- jeśli wykryto barierę, ma wpis w rejestrze defektów z priorytetem i właścicielem.
