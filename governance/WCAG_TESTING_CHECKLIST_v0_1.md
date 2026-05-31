# WCAG Testing Checklist v0.1

Status: robocza checklista governance dla WCAG 2.2 AA.

## Nagłówki

- Strona ma dokładnie jeden `h1`.
- Hierarchia nagłówków jest logiczna i nie pomija poziomów bez uzasadnienia.
- Nagłówki opisują realną zawartość sekcji.

## Landmarki

- Strona ma `main`.
- Nawigacja, nagłówek i stopka są rozpoznawalne semantycznie.
- Link pomijania prowadzi do głównej treści.

## Alt-y

- Każdy obraz ma `alt`.
- Obrazy dekoracyjne mają pusty `alt=""` i nie powielają tekstu obok.
- Obrazy informacyjne mają zwięzłą alternatywę tekstową.

## Linki

- Każdy link ma dostępną nazwę.
- Tekst linku jest zrozumiały poza kontekstem, gdy to możliwe.
- Linki zewnętrzne i pobieranie plików są opisane jasno.

## Przyciski

- Przyciski mają dostępną nazwę.
- Elementy z `role="button"` są fokusowalne i obsługiwane klawiaturą.
- Stan przycisków przełączających jest widoczny przez `aria-expanded`, `aria-pressed` albo inne właściwe ARIA.

## Akordeony

- Trigger akordeonu ma `aria-expanded`.
- Trigger wskazuje panel przez `aria-controls`.
- `aria-controls` wskazuje istniejące `id`.
- Panel nieaktywny nie jest przypadkowo fokusowalny.

## Formularze

- Każde pole ma `label`, `aria-label` albo `aria-labelledby`.
- Pola wymagane są oznaczone i opisane.
- Błędy są czytelne, powiązane z polami i dostępne dla czytników ekranu.
- Komunikat po wysłaniu jest zrozumiały.

## Fokus

- Fokus jest widoczny.
- Kolejność fokusu odpowiada kolejności wizualnej i logicznej.
- Fokus nie trafia do ukrytych elementów.

## Klawiatura

- Całość da się obsłużyć klawiaturą.
- Nie ma pułapki klawiatury.
- Escape, Enter, Spacja i strzałki działają tam, gdzie wymaga tego wzorzec komponentu.

## Kontrast

- Tekst i elementy interfejsu spełniają kontrast WCAG 2.2 AA.
- Stany hover, focus, aktywne i disabled są czytelne.
- Informacja nie jest przekazywana wyłącznie kolorem.

## Mobile, reflow i zoom

- Widoki 320, 375, 768, 1024 i 1280 px nie mają poziomego overflow.
- Treść nie nachodzi na siebie.
- Przy powiększeniu tekstu układ pozostaje używalny.
- Elementy dotykowe mają odpowiedni rozmiar i odstęp.

## Dokumenty PDF/DOCX

- Dokumenty mają tytuł i język.
- Nagłówki, listy i tabele są strukturalne.
- Kolejność odczytu jest logiczna.
- Linki i alternatywy tekstowe są dostępne.

## Multimedia

- Materiały audio/wideo mają napisy, transkrypcję albo opis alternatywny, zależnie od typu.
- Embed nie ładuje niedostępnych lub pustych placeholderów jako realnej treści.
- Sterowanie multimediami jest dostępne z klawiatury.

## Płatności

- Każdy krok płatności ma jasne instrukcje.
- Błędy walidacji są dostępne.
- Operator płatności przechodzi osobny audyt.
- Regulaminy i potwierdzenia są dostępne.

## CMS

- CMS wymusza `alt`, hierarchię nagłówków i opisowe linki.
- Edytor widzi ostrzeżenia o barierach.
- Publikacja wymaga akceptacji governance dla treści ryzykownych.

## Panel administracyjny

- Panel działa klawiaturą.
- Tabele, formularze, filtry i akcje masowe są dostępne.
- Komunikaty statusu i błędów są czytelne dla czytników ekranu.
- Role i uprawnienia nie utrudniają dostępu do informacji wymaganych do pracy.
