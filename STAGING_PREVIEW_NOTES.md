# STAGING PREVIEW NOTES

Status token: STAGING_PREVIEW / NOT_PRODUCTION_READY

Current frontend redesign prototype layer:

- `staging/index.html`
- `assets/css/staging-preview.css`
- `docs/RC_SILESIA_FRONTEND_ASSETS_CONSENTS_CHECKLIST.md`
- `scripts/staging-preview-check.mjs`

The staging preview is a prototype layer only. It must not be reported as a production release, public launch, legal readiness, payment readiness or final WCAG/Lighthouse certification.

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
- oznaczone wartosci demonstracyjne, jezeli widocznie lub strukturalnie wskazuja `demo value`.

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
- nieoznaczonych wartosci demonstracyjnych jako wartosci finalnych.

## Przenoszenie do public root

Przed przeniesieniem sekcji ze staging do publicznego `index.html` sprawdz:

- status formalny i redakcje;
- brak martwych anchorow;
- brak lokalnych adresow, sekretow i danych wrazliwych;
- WCAG smoke;
- `npm run check:staging-preview`;
- `git diff --check`;
- `npm run check:governance`.
