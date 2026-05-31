# RC Silesia - deployment stagingowy

Projekt jest statyczny. Nie wymaga builda do samego działania strony. Node.js i npm są potrzebne tylko do pipeline zdjęć (`npm run optimize`), nie do renderowania strony.

## Wersjonowanie / cache-bust

Cache-bust jest ściśle monotoniczny. Każdy nowy commit ustawia `?v=`, `DATA_VERSION` i `version` w danych na wartość wyższą niż jakakolwiek wcześniej użyta (release lub snapshot). Nigdy nie zmniejszamy ani nie powtarzamy numeru. Reguła praktyczna: weź maksimum ze wszystkich dotychczasowych i podnieś najniższy człon (patch). Kolejne sprinty: > 1.5.69.

## A. GitHub Pages

1. Utwórz repozytorium GitHub.
2. Wypchnij branch `main` do repozytorium.
3. Wejdź w `Settings -> Pages`.
4. Wybierz źródło: `Deploy from a branch`.
5. Wybierz branch: `main`.
6. Wybierz folder: `/root`.
7. Zapisz ustawienia i poczekaj na adres testowy GitHub Pages.

Przykładowe komendy po dodaniu remote:

```powershell
git remote add origin <REMOTE_URL>
git push -u origin main
```

## B. Cloudflare Pages

1. Utwórz projekt w Cloudflare Pages.
2. Połącz repozytorium Git.
3. Build command: pozostaw puste / none.
4. Output directory: `/` albo root projektu.
5. Uruchom deployment.
6. Sprawdź adres stagingowy wygenerowany przez Cloudflare.

## C. Netlify

Opcja szybka:

1. Spakuj lub wybierz folder projektu.
2. Użyj Netlify drag & drop.
3. Publish directory: root projektu.

Opcja z repo:

1. Połącz repozytorium Git.
2. Build command: none.
3. Publish directory: root.
4. Uruchom deployment.

## Uwagi stagingowe

- Domena `https://example.com/` w `sitemap.xml` jest placeholderem.
- Oficjalną domenę trzeba podmienić przed wersją produkcyjną.
- `assets/data/site.json` musi być dostępny przez HTTP.
- Social embed-y pozostają placeholderami do czasu podania oficjalnych URL-i kanałów RC Silesia.
