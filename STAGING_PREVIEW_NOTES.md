# STAGING PREVIEW NOTES

## URL

Roboczy podglad strony:

`https://rc-silesia.github.io/WEBSITE/staging/`

Publiczna wersja indeksowana:

`https://rc-silesia.github.io/WEBSITE/`

## Status noindex

`staging/index.html` ma:

`<meta name="robots" content="noindex,nofollow,noarchive">`

`robots.txt` blokuje crawling stagingu przez:

`Disallow: /staging/`

GitHub Pages nie zapewnia tu osobnego naglowka `X-Robots-Tag`, dlatego stosujemy meta robots i robots.txt.

## Co wolno pokazywac w staging

- sekcje w przygotowaniu;
- publiczne szkice opisow;
- preview governance bez danych prywatnych;
- opisy ngOs oznaczone jako przyszle lub robocze;
- statusy dokumentow z jasnym oznaczeniem draft / preview / w przygotowaniu;
- materialy edukacyjne i partnerskie po usunieciu danych wrazliwych.

## Czego nie wolno pokazywac

- danych czlonkow;
- PESEL;
- danych wrazliwych;
- sekretow i service-role;
- prywatnych endpointow backendu;
- linkow do Workbench;
- produkcyjnych platnosci;
- formularzy zbierajacych dane bez gotowego backendu i informacji RODO;
- nieoznaczonych projektow jako dokumentow przyjetych.

## Przenoszenie do public root

Przed przeniesieniem sekcji ze staging do publicznego `index.html` sprawdz:

- status formalny i redakcje;
- brak martwych anchorow;
- brak lokalnych adresow, sekretow i danych wrazliwych;
- WCAG smoke;
- `git diff --check`;
- `npm run check:governance`.
