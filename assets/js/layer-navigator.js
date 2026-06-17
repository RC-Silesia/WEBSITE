(function () {
  var root = document.querySelector("[data-layer-navigator]");
  if (!root) return;

  var sourceBase = root.getAttribute("data-source-base") || "../";
  var rootBase = root.getAttribute("data-root-base") || sourceBase;
  var storagePrefix = "rcs.layerNavigator.";
  var storageKeys = {
    currentNode: storagePrefix + "currentNode",
    expandedTree: storagePrefix + "expandedTree",
    showDescriptions: storagePrefix + "showDescriptions",
    scrollPositions: storagePrefix + "scrollPositions"
  };
  var scrollTicking = false;
  var pendingScroll = null;
  var pendingFocusSelector = "";
  var sectionObserver = null;

  function page(hash) {
    return sourceBase + "index.html" + hash;
  }

  function file(path) {
    return rootBase + path;
  }

  function n(id, label, icon, description, contains, body, links, children) {
    return {
      id: id,
      label: label,
      icon: icon,
      description: description,
      contains: contains || [],
      body: body || [],
      links: links || [],
      children: children || []
    };
  }

  var layerTree = n("home", "Home", "RCS", "Mapa warstw publicznej strony RC Silesia.", [
    "klub",
    "projekty",
    "dokumenty",
    "kontakt"
  ], [
    "Ten widok porządkuje istniejące treści stagingu w przestrzenną mapę. Nie zastępuje strony głównej, tylko daje alternatywną nawigację po tych samych sekcjach.",
    "Każda warstwa prowadzi do źródłowej sekcji stagingu, dzięki czemu mapa nie dubluje dokumentów ani linków formalnych."
  ], [], [
    n("club", "Klub", "KLB", "Tożsamość RC Silesia, lokalny kontekst, spotkania, aktualności i galeria działań.", [
      "kim jesteśmy",
      "spotkania",
      "aktualności",
      "galeria"
    ], [
      "RC Silesia jest śląskim klubem Rotary z siedzibą w Mikołowie. Łączy ludzi dobrej woli, biznes, naukę, edukację, przyrodę i międzynarodową sieć Rotary.",
      "Warstwa klubowa prowadzi do opisu misji, wartości, kalendarium spotkań, galerii i bieżących informacji."
    ], [
      { label: "Otwórz opis klubu", href: page("#o-klubie") },
      { label: "Kalendarium", href: page("#spotkania") },
      { label: "Galeria działań", href: page("#galeria") }
    ], [
      n("club-identity", "Kim jesteśmy", "ID", "Opis klubu, motto i lokalnego zakresu działania.", [
        "służba",
        "partnerstwo",
        "planeta"
      ], [
        "Na stagingu ta sekcja opisuje klub służby, partnerstw i lokalnego działania oraz motto Service Above Self.",
        "To punkt wejścia dla osób, które nie znają jeszcze RC Silesia."
      ], [
        { label: "Źródło: O klubie", href: page("#o-klubie") }
      ]),
      n("club-meetings", "Spotkania", "CAL", "Kalendarium spotkań, wydarzeń i kamieni milowych.", [
        "terminy",
        "prelekcje",
        "wydarzenia"
      ], [
        "Sekcja spotkań pokazuje planowane i archiwalne wpisy, z rozróżnieniem statusów roboczych i zatwierdzonych.",
        "To naturalny punkt powrotu dla gości zainteresowanych przyjściem na spotkanie."
      ], [
        { label: "Źródło: Spotkania", href: page("#spotkania") },
        { label: "Kontakt w sprawie spotkania", href: page("#kontakt") }
      ], [
        n("club-meetings-visit", "Przyjdź na spotkanie", "GO", "Ścieżka dla osób chcących poznać klub.", [
          "kontakt",
          "termin",
          "potwierdzenie"
        ], [
          "Formularz kontaktowy ma temat spotkania klubu i dopasowuje pola do rodzaju sprawy."
        ], [
          { label: "Formularz kontaktowy", href: page("#kontakt") }
        ])
      ]),
      n("club-news-gallery", "Aktualności i galeria", "IMG", "Bieżące informacje, zdjęcia i materiały robocze.", [
        "aktualności",
        "galeria",
        "zgody wizerunkowe"
      ], [
        "Staging rozdziela aktualności, galerię działań i miejsca, gdzie zdjęcia wymagają zatwierdzenia zgód.",
        "Mapa prowadzi do tych treści bez obchodzenia polityki wizerunku."
      ], [
        { label: "Aktualności", href: page("#aktualnosci") },
        { label: "Galeria", href: page("#galeria") },
        { label: "Polityka wizerunku", href: file("privacy.html#wizerunek") }
      ])
    ]),
    n("rotary", "Rotary", "ROT", "Struktura Rotary International, Dystryktu 2231 i miejsca RC Silesia w tej sieci.", [
      "Rotary International",
      "Dystrykt 2231",
      "RC Silesia"
    ], [
      "Staging pokazuje Rotary jako strukturę: organizację międzynarodową, polski dystrykt i lokalny klub na Śląsku.",
      "Ta warstwa jest dobrym wejściem dla odbiorcy, który chce zrozumieć, czym jest Rotary poza lokalnym klubem."
    ], [
      { label: "Źródło: Rotary", href: page("#rotary") }
    ], [
      n("rotary-international", "Rotary International", "RI", "Międzynarodowa organizacja składająca się z dystryktów.", [
        "sieć globalna",
        "dystrykty",
        "kluby"
      ], [
        "Treść stagingu wyjaśnia relację między Rotary International, dystryktami i klubami."
      ], [
        { label: "Źródło: struktura Rotary", href: page("#rotary") }
      ]),
      n("rotary-district", "Dystrykt 2231", "D31", "Polski dystrykt Rotary, którego częścią jest RC Silesia.", [
        "Polska",
        "80 klubów",
        "koordynacja"
      ], [
        "Na stronie dystrykt opisany jest jako poziom organizacyjny obejmujący obszar całej Polski."
      ], [
        { label: "Źródło: Dystrykt 2231", href: page("#rotary") }
      ]),
      n("rotary-local-club", "RC Silesia w Rotary", "RCS", "Lokalny klub działający na Śląsku w ramach Dystryktu 2231.", [
        "Śląsk",
        "Mikołów",
        "projekty"
      ], [
        "Ta podwarstwa wiąże globalną strukturę Rotary z lokalnym działaniem RC Silesia."
      ], [
        { label: "Źródło: Rotary Klub Silesia", href: page("#rotary") }
      ])
    ]),
    n("principles", "Zasady Rotary", "4Q", "Test Czterech Pytań, dewiza Rotary i praktyka etyczna w działaniach RC Silesia.", [
      "Test Czterech Pytań",
      "Service Above Self",
      "etyka działania"
    ], [
      "Staging opisuje zasady Rotary jako narzędzie codziennego działania: w projektach, partnerstwach, finansach, komunikacji i pracy z młodzieżą.",
      "Warstwa zasad pomaga szybko wrócić do fundamentów, bez przewijania całej strony."
    ], [
      { label: "Źródło: Zasady Rotary", href: page("#zasady-rotary") }
    ], [
      n("principles-four-way", "Test Czterech Pytań", "Q4", "Cztery pytania: prawda, uczciwość, dobra wola i korzyść dla wszystkich.", [
        "prawda",
        "uczciwość",
        "dobra wola",
        "korzyść"
      ], [
        "Na stronie pytania są opisane jako praktyczne filtry decyzji i komunikacji.",
        "Każda karta ma rozwijaną treść i powinna pozostać dostępna z klawiatury."
      ], [
        { label: "Źródło: Test Czterech Pytań", href: page("#zasady-rotary") }
      ], [
        n("principles-four-way-truth", "Prawda", "1", "Pierwszy filtr decyzji: rzetelne fakty i jawna komunikacja.", [
          "rzetelność",
          "fakty"
        ], [
          "Sekcja stagingu podkreśla prawdę jako fundament zaufania."
        ], [
          { label: "Źródło: zasady", href: page("#zasady-rotary") }
        ])
      ]),
      n("principles-motto", "Dewiza Rotary", "MOT", "Service Above Self — służba ponad własną korzyść.", [
        "służba",
        "odpowiedzialność",
        "długofalowość"
      ], [
        "Dewiza jest w stagingu powiązana z projektami społecznymi, edukacyjnymi i środowiskowymi."
      ], [
        { label: "Źródło: dewiza", href: page("#zasady-rotary") }
      ]),
      n("principles-practice", "Praktyka działania", "ACT", "Jak zasady przekładają się na projekty, partnerstwa i komunikację.", [
        "projekty",
        "partnerstwa",
        "komunikacja"
      ], [
        "Ta warstwa spina zasady z innymi sekcjami mapy: członkostwem, partnerstwami, wsparciem i dokumentami."
      ], [
        { label: "Partnerstwa", href: page("#partnerstwa") },
        { label: "Wsparcie", href: page("#wsparcie") }
      ])
    ]),
    n("membership", "Członkostwo", "MEM", "Ścieżki członkostwa czynnego, wspierającego i udziału w spotkaniach.", [
      "członek czynny",
      "członek wspierający",
      "spotkanie",
      "partnerstwo"
    ], [
      "Staging rozróżnia zainteresowanie spotkaniem, członkostwem czynnym, członkostwem wspierającym oraz partnerstwem.",
      "Mapa nie tworzy procesu przyjęcia — prowadzi do publicznych informacji i formularza kontaktowego."
    ], [
      { label: "Źródło: Członkostwo", href: page("#czlonkostwo") },
      { label: "Formularz kontaktowy", href: page("#kontakt") }
    ], [
      n("membership-active", "Członkostwo czynne", "ACT", "Ścieżka dla osób chcących aktywnie działać w klubie.", [
        "zgłoszenie",
        "kontakt",
        "potwierdzenie"
      ], [
        "Formularz ma temat dla osób zainteresowanych członkostwem czynnym. Zgłoszenie nie oznacza automatycznego przyjęcia."
      ], [
        { label: "Zgłoszenie członkostwa", href: page("#kontakt") }
      ]),
      n("membership-supporting", "Członek wspierający", "SUP", "Wsparcie, partnerstwo lub sponsoring bez mieszania z wewnętrznym panelem.", [
        "wsparcie",
        "partnerstwo",
        "sponsoring"
      ], [
        "Staging pokazuje członkostwo wspierające jako publiczną ścieżkę rozmowy o wsparciu i partnerstwie."
      ], [
        { label: "Wsparcie", href: page("#wsparcie") },
        { label: "Kontakt", href: page("#kontakt") }
      ]),
      n("membership-meeting", "Pierwsze spotkanie", "MEET", "Najprostsza ścieżka wejścia: przyjść na spotkanie po potwierdzeniu klubu.", [
        "termin",
        "temat",
        "kontakt"
      ], [
        "Dla nowego użytkownika to mniej formalny punkt wejścia niż deklaracja członkostwa."
      ], [
        { label: "Kalendarium", href: page("#spotkania") },
        { label: "Kontakt w sprawie spotkania", href: page("#kontakt") }
      ])
    ]),
    n("projects", "Projekty i obszary działania", "PRJ", "Obszary społeczne, edukacyjne, środowiskowe i programowe RC Silesia.", [
      "obszary działania",
      "aktualności",
      "spotkania",
      "galeria"
    ], [
      "Staging grupuje działania klubu w obszarach programowych i pokazuje je przez aktualności, spotkania i galerię.",
      "Ta warstwa jest mapą przejścia od deklaracji do konkretnych działań."
    ], [
      { label: "Źródło: Obszary działania", href: page("#obszary") },
      { label: "Aktualności", href: page("#aktualnosci") }
    ], [
      n("projects-areas", "Obszary działania", "AREA", "Przegląd zakresów aktywności RC Silesia.", [
        "społeczność",
        "edukacja",
        "środowisko"
      ], [
        "Sekcja obszarów jest publicznym katalogiem kierunków działania klubu."
      ], [
        { label: "Źródło: obszary", href: page("#obszary") }
      ]),
      n("projects-current", "Aktualne działania", "NOW", "Bieżące informacje, wydarzenia i materiały robocze.", [
        "aktualności",
        "kalendarium",
        "media"
      ], [
        "Ta podwarstwa zbiera miejsca, w których odbiorca szuka najnowszych sygnałów o aktywności klubu."
      ], [
        { label: "Aktualności", href: page("#aktualnosci") },
        { label: "Spotkania", href: page("#spotkania") },
        { label: "Media / newsletter", href: page("#social-hub") }
      ]),
      n("projects-gallery", "Galeria działań", "GAL", "Zdjęcia i relacje z zastrzeżeniem zgód wizerunkowych.", [
        "zdjęcia",
        "relacje",
        "zgody"
      ], [
        "Galeria jest częścią publicznego opowiadania o działaniach, ale pozostaje powiązana z polityką wizerunku."
      ], [
        { label: "Galeria", href: page("#galeria") },
        { label: "Polityka prywatności", href: file("privacy.html#wizerunek") }
      ])
    ]),
    n("planet", "ROTARY for PLANET", "PLN", "Program odpowiedzialnych nasadzeń drzew na Śląsku i edukacji środowiskowej.", [
      "nasadzenia",
      "lokalizacje",
      "wolontariat",
      "wsparcie"
    ], [
      "Staging przedstawia ROTARY for PLANET jako aktualny program flagowy RC Silesia.",
      "Warstwa prowadzi do programu, wsparcia, zgłaszania lokalizacji i wolontariatu."
    ], [
      { label: "Źródło: ROTARY for PLANET", href: page("#planet") },
      { label: "Wesprzyj program", href: page("#wsparcie") }
    ], [
      n("planet-program", "Program", "TREE", "Opis programu i jego sensu środowiskowego.", [
        "drzewa",
        "bioróżnorodność",
        "Śląsk"
      ], [
        "Program dotyczy odpowiedzialnych nasadzeń drzew na Górnym Śląsku oraz współpracy z partnerami merytorycznymi."
      ], [
        { label: "Źródło: program", href: page("#planet") }
      ], [
        n("planet-program-plantings", "Nasadzenia", "SAP", "Warstwa działań terenowych i lokalizacji.", [
          "lokalizacja",
          "ocena",
          "pielęgnacja"
        ], [
          "Formularz kontaktowy zawiera temat zgłoszenia lokalizacji oraz pytania o zgodę właściciela i możliwość pielęgnacji."
        ], [
          { label: "Zgłoś lokalizację", href: page("#kontakt") }
        ])
      ]),
      n("planet-volunteer", "Wolontariat", "VOL", "Udział osób i grup w działaniach programu.", [
        "grupy",
        "szkoły",
        "firmy"
      ], [
        "Kontakt pozwala zgłosić gotowość udziału w działaniach ROTARY for PLANET."
      ], [
        { label: "Kontakt: wolontariat", href: page("#kontakt") }
      ]),
      n("planet-support", "Wsparcie programu", "DON", "Darowizny, partnerstwo i wsparcie rzeczowe.", [
        "darowizna",
        "partnerstwo",
        "sponsoring"
      ], [
        "Warstwa wsparcia prowadzi do publicznej makiety wpłat i informacji o koncie."
      ], [
        { label: "Wsparcie", href: page("#wsparcie") }
      ])
    ]),
    n("youth", "Wymiana młodzieży", "YTH", "Wymiana młodzieży, Rotaract i treści wymagające zgód wizerunkowych.", [
      "wymiana młodzieży",
      "Rotaract",
      "zgody",
      "kontakt"
    ], [
      "Staging ma osobną sekcję młodzieżową oraz linki do podstron o wymianie i Rotaract.",
      "Mapa zachowuje ostrożność: materiały zdjęciowe i wizerunkowe prowadzą przez politykę zgód."
    ], [
      { label: "Źródło: Wymiana młodzieży", href: page("#mlodziez") },
      { label: "Podstrona: wymiana", href: file("mlodziez-wymiana.html") },
      { label: "Podstrona: Rotaract", href: file("mlodziez-rotaract.html") }
    ], [
      n("youth-exchange", "Program wymiany", "EX", "Informacje o wymianie młodzieży i kontakcie w tej sprawie.", [
        "program",
        "kontakt",
        "bezpieczeństwo"
      ], [
        "Podstrona wymiany jest właściwym miejscem dla szczegółów programu."
      ], [
        { label: "Otwórz wymianę młodzieży", href: file("mlodziez-wymiana.html") }
      ]),
      n("youth-rotaract", "Rotaract", "RTA", "Ścieżka dla młodych dorosłych i działań rotaractowych.", [
        "młodzi dorośli",
        "działanie",
        "Rotary"
      ], [
        "Rotaract ma osobną podstronę, żeby nie mieszać go z główną sekcją klubową."
      ], [
        { label: "Otwórz Rotaract", href: file("mlodziez-rotaract.html") }
      ]),
      n("youth-image-policy", "Zgody i wizerunek", "RODO", "Materiały młodzieżowe wymagają szczególnej ostrożności.", [
        "zgody",
        "wizerunek",
        "RODO"
      ], [
        "Mapa nie osadza zdjęć młodzieży poza istniejącą polityką prywatności i zgód."
      ], [
        { label: "Polityka wizerunku", href: file("privacy.html#wizerunek") }
      ])
    ]),
    n("governance-partners", "Władze i partnerzy", "GOV", "Organy, partnerstwa i współpraca instytucjonalna.", [
      "władze",
      "partnerzy",
      "umowy",
      "współpraca"
    ], [
      "Staging rozdziela władze/statutowe role oraz partnerstwa i współpracę.",
      "Ta warstwa pomaga odbiorcy przejść od zaufania formalnego do relacji partnerskich."
    ], [
      { label: "Źródło: Władze", href: page("#wladze") },
      { label: "Źródło: Partnerzy", href: page("#partnerstwa") }
    ], [
      n("governance-bodies", "Władze", "ORG", "Role statutowe i osoby pełniące funkcje.", [
        "zarząd",
        "organy",
        "kadencje"
      ], [
        "Sekcja władz jest renderowana z danych strony i ma zachować rozróżnienie statusów publicznych."
      ], [
        { label: "Władze", href: page("#wladze") }
      ], [
        n("governance-bodies-board", "Zarząd i role", "BRD", "Publiczne informacje o rolach, bez panelu wewnętrznego.", [
          "prezes",
          "sekretarz",
          "skarbnik"
        ], [
          "Mapa nie nadaje uprawnień ani nie pokazuje danych wewnętrznych — prowadzi wyłącznie do publicznej sekcji."
        ], [
          { label: "Źródło: władze", href: page("#wladze") }
        ])
      ]),
      n("governance-partnerships", "Partnerstwa", "PAR", "Współpraca z instytucjami, firmami i mediami.", [
        "partnerzy",
        "sponsoring",
        "media"
      ], [
        "Partnerstwa są powiązane z formularzem kontaktowym i oceną zgodności ze standardami Rotary."
      ], [
        { label: "Partnerzy", href: page("#partnerstwa") },
        { label: "Kontakt partnerski", href: page("#kontakt") }
      ]),
      n("governance-media", "Media i relacje", "MED", "Kontakty medialne i materiały o klubie.", [
        "JazzTV",
        "newsletter",
        "informacje prasowe"
      ], [
        "Materiały medialne mają osobną warstwę w social hubie, z jasnym statusem placeholderów."
      ], [
        { label: "Media / newsletter", href: page("#social-hub") }
      ])
    ]),
    n("documents", "Dokumenty i polityki", "DOC", "Dane formalne, statut, dokumenty, polityki i standardy publiczne.", [
      "KRS",
      "statut",
      "polityki",
      "konto"
    ], [
      "Staging zawiera dane formalne, repozytorium dokumentów, polityki i standardy oraz link do polityki prywatności.",
      "Mapa traktuje dokumenty jako źródła, a nie jako treści do przepisywania."
    ], [
      { label: "Dane formalne", href: page("#dane") },
      { label: "Dokumenty", href: page("#dokumenty") },
      { label: "Polityki i standardy", href: page("#polityki-standardy") }
    ], [
      n("documents-formal", "Dane formalne", "KRS", "KRS, NIP, REGON, adres i konto bankowe.", [
        "KRS 0001161058",
        "NIP 6351874727",
        "REGON 541208196"
      ], [
        "Dane formalne są widoczne w top barze, stopce i sekcji formalnej stagingu."
      ], [
        { label: "Dane formalne", href: page("#dane") }
      ]),
      n("documents-statutory", "Statut i dokumenty", "STA", "Publiczny dokument statutowy i repozytorium plików.", [
        "statut",
        "pobranie DOCX",
        "repozytorium"
      ], [
        "Link do statutu pozostaje linkiem do pliku źródłowego, bez kopiowania dokumentu do mapy."
      ], [
        { label: "Dokumenty", href: page("#dokumenty") },
        { label: "Pobierz statut DOCX", href: file("assets/docs/RC_Silesia_Statut_Final.docx") }
      ], [
        n("documents-statutory-download", "Pobranie statutu", "DL", "Bezpośredni link do dokumentu DOCX.", [
          "DOCX",
          "wersja publiczna",
          "download"
        ], [
          "Mapa zachowuje istniejący link pobierania dokumentu."
        ], [
          { label: "Pobierz statut", href: file("assets/docs/RC_Silesia_Statut_Final.docx") }
        ])
      ]),
      n("documents-policies", "Polityki i standardy", "POL", "Polityka prywatności, standardy komunikacji i statusy robocze.", [
        "RODO",
        "cookies",
        "standardy"
      ], [
        "Staging opisuje polityki jako robocze materiały wymagające zatwierdzenia przed publikacją produkcyjną."
      ], [
        { label: "Polityki i standardy", href: page("#polityki-standardy") },
        { label: "Polityka prywatności", href: file("privacy.html") }
      ])
    ]),
    n("contact-support-media", "Kontakt / wsparcie / media", "CTA", "Centrum kontaktu, wsparcia, newslettera i kanałów społecznościowych.", [
      "kontakt",
      "wsparcie",
      "newsletter",
      "Facebook"
    ], [
      "Ta warstwa zbiera ścieżki działania: napisać do klubu, wesprzeć program, zapisać się na newsletter albo przejść do social hubu.",
      "Nie uruchamia płatności online — staging pozostaje makietą publiczną bez realnej bramki."
    ], [
      { label: "Kontakt", href: page("#kontakt") },
      { label: "Wsparcie", href: page("#wsparcie") },
      { label: "Media / newsletter", href: page("#social-hub") }
    ], [
      n("contact-center", "Kontakt", "MAIL", "Formularz z tematami: spotkanie, członkostwo, partnerstwo, media, ROTARY for PLANET.", [
        "formularz",
        "tematy",
        "e-mail"
      ], [
        "Formularz jest makietą w stagingu i nie wysyła danych, jeśli atrybut data-mock-form pozostaje true."
      ], [
        { label: "Formularz kontaktowy", href: page("#kontakt") },
        { label: "E-mail", href: "mailto:silesia@rotary.org.pl" }
      ]),
      n("contact-support", "Wsparcie", "PAY", "Darowizna, składka członkowska i wsparcie programu.", [
        "darowizna",
        "składka",
        "konto bankowe"
      ], [
        "Staging pokazuje makietę wpłat i numer konta. Płatność online nie jest uruchomiona."
      ], [
        { label: "Wsparcie", href: page("#wsparcie") }
      ]),
      n("contact-media", "Media i newsletter", "SOC", "Facebook, newsletter, media, placeholdery kanałów społecznościowych.", [
        "Facebook",
        "newsletter",
        "media"
      ], [
        "Social hub zachowuje placeholdery dla kanałów, które wymagają oficjalnej decyzji lub integracji."
      ], [
        { label: "Social hub", href: page("#social-hub") },
        { label: "Newsletter", href: file("newsletter-preview.html") },
        { label: "Facebook", href: "https://www.facebook.com/p/Rotary-Club-Silesia-61569752879280/" }
      ])
    ]),
    n("panel-placeholder", "Panel instytucjonalny", "PNL", "Panel instytucjonalny jest poza publiczną warstwą stagingu.", [
      "w przygotowaniu",
      "brak logowania",
      "publiczna strona"
    ], [
      "Ten przycisk nie udaje istniejącego systemu wewnętrznego. Na publicznej stronie RC Silesia panel pozostaje placeholderem.",
      "Gdy realny panel będzie gotowy, ta warstwa może prowadzić do właściwego adresu logowania."
    ], [
      { label: "Wróć do strony publicznej", href: page("#start") }
    ])
  ]);

  function buildIndex(rootNode) {
    var map = {};
    function visit(item, parentId, depth, path) {
      var itemPath = path.concat(item.id);
      map[item.id] = { node: item, parentId: parentId, depth: depth, path: itemPath };
      (item.children || []).forEach(function (child) {
        visit(child, item.id, depth + 1, itemPath);
      });
    }
    visit(rootNode, null, 0, []);
    return map;
  }

  var index = buildIndex(layerTree);
  var topNodes = layerTree.children.filter(function (item) {
    return item.id !== "panel-placeholder";
  });

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function readJson(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function readBoolean(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw === null ? fallback : raw === "true";
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Brak localStorage nie blokuje nawigacji.
    }
  }

  function writeString(key, value) {
    try {
      window.localStorage.setItem(key, String(value));
    } catch (error) {
      // Brak localStorage nie blokuje nawigacji.
    }
  }

  var storedNode = window.localStorage ? window.localStorage.getItem(storageKeys.currentNode) : "";
  var state = {
    currentNodeId: storedNode && index[storedNode] ? storedNode : "home",
    activeSectionId: "home",
    drawerOpen: false,
    showDescriptions: readBoolean(storageKeys.showDescriptions, true),
    armedTileId: "",
    expandedTreeIds: new Set(readJson(storageKeys.expandedTree, ["home"]).filter(function (id) { return index[id]; })),
    history: [],
    scrollPositions: readJson(storageKeys.scrollPositions, {})
  };
  state.expandedTreeIds.add("home");

  function persistState() {
    writeString(storageKeys.currentNode, state.currentNodeId);
    writeString(storageKeys.showDescriptions, state.showDescriptions);
    writeJson(storageKeys.expandedTree, Array.from(state.expandedTreeIds));
    writeJson(storageKeys.scrollPositions, state.scrollPositions);
  }

  function currentMeta() {
    return index[state.currentNodeId] || index.home;
  }

  function activeMeta() {
    return index[state.activeSectionId] || currentMeta();
  }

  function saveCurrentScroll() {
    state.scrollPositions[state.currentNodeId] = window.scrollY || 0;
    writeJson(storageKeys.scrollPositions, state.scrollPositions);
    return state.scrollPositions[state.currentNodeId];
  }

  function expandPath(nodeId) {
    var meta = index[nodeId];
    if (!meta) return;
    meta.path.forEach(function (pathId) {
      state.expandedTreeIds.add(pathId);
    });
  }

  function navigateTo(nodeId, options) {
    var target = index[nodeId];
    if (!target) return;
    options = options || {};
    var previousScroll = saveCurrentScroll();
    if (!options.skipHistory && nodeId !== state.currentNodeId) {
      state.history.push({
        nodeId: state.currentNodeId,
        scrollY: previousScroll,
        expandedTreeIds: Array.from(state.expandedTreeIds)
      });
      state.history = state.history.slice(-24);
    }
    state.currentNodeId = nodeId;
    state.activeSectionId = nodeId;
    state.armedTileId = "";
    state.drawerOpen = false;
    expandPath(nodeId);
    pendingScroll = typeof options.scrollY === "number" ? options.scrollY : (state.scrollPositions[nodeId] || 0);
    persistState();
    render();
  }

  function goBack() {
    var entry = state.history.pop();
    if (!entry) return;
    saveCurrentScroll();
    state.currentNodeId = entry.nodeId;
    state.activeSectionId = entry.nodeId;
    state.expandedTreeIds = new Set(entry.expandedTreeIds && entry.expandedTreeIds.length ? entry.expandedTreeIds : ["home"]);
    state.expandedTreeIds.add("home");
    state.armedTileId = "";
    state.drawerOpen = false;
    pendingScroll = entry.scrollY || 0;
    persistState();
    render();
  }

  function leafSections(item) {
    return [
      n(item.id + "-opis", "Opis", "TXT", item.description, item.contains, item.body, item.links),
      n(item.id + "-przejscia", "Przejścia", "GO", "Powiązane źródła i następne kroki.", [
        "źródło",
        "powrót",
        "kontekst"
      ], [
        "Użyj linków źródłowych, aby przejść do właściwej sekcji strony staging albo dokumentu."
      ], item.links)
    ];
  }

  function contentSections(item) {
    if (item.id === "home") return topNodes;
    return item.children && item.children.length ? item.children : leafSections(item);
  }

  function renderLinks(links) {
    if (!links || !links.length) return "";
    return [
      '<div class="layer-source-links">',
      links.map(function (link) {
        var external = /^https?:\/\//.test(link.href || "");
        return '<a href="' + escapeAttribute(link.href || "#") + '"' + (external ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + escapeHtml(link.label) + "</a>";
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderChips(items) {
    if (!items || !items.length) return "";
    return '<div class="layer-chip-row">' + items.map(function (item) {
      return "<span>" + escapeHtml(item) + "</span>";
    }).join("") + "</div>";
  }

  function renderBody(item) {
    return '<div class="layer-node-body">' + (item.body || []).map(function (paragraph) {
      return "<p>" + escapeHtml(paragraph) + "</p>";
    }).join("") + "</div>";
  }

  function renderTile(item) {
    var armed = state.armedTileId === item.id;
    return [
      '<article class="layer-tile' + (armed ? " is-armed" : "") + '">',
      '<button class="layer-tile-button" type="button" data-layer-tile="' + escapeAttribute(item.id) + '" aria-expanded="' + String(armed) + '">',
      '<span class="layer-symbol">' + escapeHtml(item.icon) + "</span>",
      "<strong>" + escapeHtml(item.label) + "</strong>",
      "<span>" + escapeHtml(item.description) + "</span>",
      "</button>",
      armed ? [
        '<div class="layer-tile-expanded">',
        "<span>Zawiera:</span>",
        "<ul>" + item.contains.map(function (entry) { return "<li>" + escapeHtml(entry) + "</li>"; }).join("") + "</ul>",
        '<button class="layer-inline-action" type="button" data-layer-go="' + escapeAttribute(item.id) + '">Wejdź</button>',
        "</div>"
      ].join("") : "",
      "</article>"
    ].join("");
  }

  function renderHome(item) {
    return [
      '<section class="layer-home-actions" aria-label="Szybkie wejścia">',
      '<a class="layer-primary-action" href="' + escapeAttribute(page("#kontakt")) + '">Kontakt z klubem</a>',
      '<a class="layer-secondary-action" href="' + escapeAttribute(page("#wsparcie")) + '">Wesprzyj RC Silesia</a>',
      '<a class="layer-secondary-action" href="' + escapeAttribute(file("newsletter-preview.html")) + '">Newsletter RCS</a>',
      "</section>",
      '<section class="layer-tile-grid" aria-label="Główne warstwy RC Silesia">',
      topNodes.map(renderTile).join(""),
      "</section>",
      renderLayerSections(item)
    ].join("");
  }

  function renderWorkItems(section) {
    var items = section.children && section.children.length ? section.children : leafSections(section);
    return '<div class="layer-work-grid">' + items.map(function (child) {
      var known = Boolean(index[child.id]);
      return [
        '<button class="layer-work-item" type="button" ' + (known ? 'data-layer-go="' + escapeAttribute(child.id) + '"' : "disabled") + ">",
        '<span class="layer-symbol layer-symbol-soft">' + escapeHtml(child.icon) + "</span>",
        "<strong>" + escapeHtml(child.label) + "</strong>",
        "<small>" + escapeHtml(child.description) + "</small>",
        "</button>"
      ].join("");
    }).join("") + "</div>";
  }

  function renderLayerSections(item) {
    return '<section class="layer-section-list" aria-label="Warstwy">' + contentSections(item).map(function (section) {
      var known = Boolean(index[section.id]);
      return [
        '<section class="layer-section" data-layer-section="' + escapeAttribute(section.id) + '">',
        '<div class="layer-section-head">',
        '<span class="layer-symbol">' + escapeHtml(section.icon) + "</span>",
        "<div>",
        "<h2>" + escapeHtml(section.label) + "</h2>",
        "<p>" + escapeHtml(section.description) + "</p>",
        "</div>",
        known ? '<button class="layer-section-action" type="button" data-layer-go="' + escapeAttribute(section.id) + '">Wejdź głębiej</button>' : "",
        "</div>",
        renderChips(section.contains),
        renderBody(section),
        renderLinks(section.links),
        renderWorkItems(section),
        "</section>"
      ].join("");
    }).join("") + "</section>";
  }

  function renderBreadcrumb() {
    var meta = currentMeta();
    return '<nav class="layer-breadcrumb" aria-label="Ścieżka orientacji">' + meta.path.map(function (id, indexInPath) {
      var item = index[id].node;
      var finalItem = indexInPath === meta.path.length - 1;
      return [
        '<span class="layer-breadcrumb-item">',
        '<button type="button" data-layer-go="' + escapeAttribute(id) + '" aria-current="' + (finalItem ? "page" : "false") + '">' + escapeHtml(item.label) + "</button>",
        finalItem ? "" : '<span aria-hidden="true">&gt;</span>',
        "</span>"
      ].join("");
    }).join("") + "</nav>";
  }

  function renderTreeNode(item, depth) {
    var hasChildren = item.children && item.children.length;
    var expanded = state.expandedTreeIds.has(item.id);
    var current = item.id === state.currentNodeId;
    return [
      "<li>",
      '<div class="layer-tree-row" data-tree-row-id="' + escapeAttribute(item.id) + '" style="--depth:' + depth + '">',
      '<button class="layer-tree-toggle" type="button" data-layer-toggle-tree="' + escapeAttribute(item.id) + '" aria-label="' + (expanded ? "Zwiń gałąź" : "Rozwiń gałąź") + '"' + (hasChildren ? "" : " disabled") + ">" + (hasChildren ? (expanded ? "-" : "+") : "") + "</button>",
      '<button class="layer-tree-link' + (current ? " is-active" : "") + '" type="button" data-layer-go="' + escapeAttribute(item.id) + '" data-tree-id="' + escapeAttribute(item.id) + '" aria-current="' + (current ? "page" : "false") + '">',
      '<span class="layer-tree-icon">' + escapeHtml(item.icon) + "</span>",
      "<span>" + escapeHtml(item.label) + "</span>",
      "<small>poziom " + index[item.id].depth + "</small>",
      "</button>",
      "</div>",
      hasChildren && expanded ? '<ul class="layer-tree-branch">' + item.children.map(function (child) { return renderTreeNode(child, depth + 1); }).join("") + "</ul>" : "",
      "</li>"
    ].join("");
  }

  function renderLevelRail() {
    var meta = activeMeta();
    var maxLevel = 3;
    var steps = [];
    for (var depth = 0; depth <= maxLevel; depth += 1) {
      var nodeId = meta.path[depth] || "";
      var label = nodeId ? index[nodeId].node.label : "Poziom " + depth;
      var active = depth === Math.min(meta.depth, maxLevel);
      steps.push([
        '<button class="layer-level-step' + (active ? " is-active" : "") + '" type="button" data-level-depth="' + depth + '"' + (nodeId ? ' data-layer-go="' + escapeAttribute(nodeId) + '"' : " disabled") + ">",
        '<span class="layer-level-dot" aria-hidden="true"></span>',
        '<span class="layer-level-name">' + (depth === 0 ? "Home" : "Poziom " + depth) + "</span>",
        '<small data-level-label="' + depth + '">' + escapeHtml(label) + "</small>",
        "</button>"
      ].join(""));
    }
    return '<div class="layer-level-rail" aria-label="Poziomy">' + steps.join("") + "</div>";
  }

  function renderDrawer() {
    return [
      '<button class="layer-backdrop' + (state.drawerOpen ? " is-open" : "") + '" type="button" data-layer-action="close-map" aria-label="Zamknij mapę"' + (state.drawerOpen ? "" : " hidden") + "></button>",
      '<aside id="layer-map" class="layer-drawer' + (state.drawerOpen ? " is-open" : "") + '" aria-label="Mapa warstw RC Silesia" aria-hidden="' + String(!state.drawerOpen) + '"' + (state.drawerOpen ? "" : " inert") + ">",
      '<div class="layer-drawer-content">',
      '<div class="layer-drawer-header">',
      "<div><strong>Mapa warstw</strong><span data-layer-active-label>" + escapeHtml(activeMeta().node.label) + "</span></div>",
      '<button class="layer-drawer-close" type="button" data-layer-action="close-map" aria-label="Zamknij mapę">×</button>',
      "</div>",
      '<nav aria-label="Drzewo warstw"><ul class="layer-tree">' + renderTreeNode(layerTree, 0) + "</ul></nav>",
      "</div>",
      renderLevelRail(),
      "</aside>"
    ].join("");
  }

  function renderCommands() {
    return [
      '<div class="layer-command-bar" aria-label="Nawigacja kontekstowa">',
      '<button class="layer-command-button" type="button" data-layer-action="back"' + (state.history.length ? "" : " disabled") + "><span aria-hidden=\"true\">←</span> Wróć</button>",
      '<button class="layer-command-button" type="button" data-layer-action="home"><span aria-hidden="true">⌂</span> Home</button>',
      '<button class="layer-command-button" type="button" data-layer-action="up"' + (currentMeta().parentId ? "" : " disabled") + "><span aria-hidden=\"true\">↑</span> Wyżej</button>",
      '<button class="layer-command-button" type="button" data-layer-action="panel"><span aria-hidden="true">⚙</span> Panel</button>',
      '<label class="layer-toggle"><input type="checkbox" data-layer-description-toggle' + (state.showDescriptions ? " checked" : "") + '> <span>Pokaż opisy przed wejściem</span></label>',
      "</div>"
    ].join("");
  }

  function renderShell() {
    var meta = currentMeta();
    var item = meta.node;
    return [
      '<button class="layer-map-trigger" type="button" data-layer-action="open-map" aria-expanded="' + String(state.drawerOpen) + '" aria-controls="layer-map"><span aria-hidden="true">☰</span> Mapa</button>',
      renderDrawer(),
      '<section class="layer-app" id="layer-app">',
      '<header class="layer-orientation">',
      renderBreadcrumb(),
      renderCommands(),
      "</header>",
      '<section class="layer-context" data-layer-section="' + escapeAttribute(item.id) + '">',
      "<div>",
      '<span class="layer-kicker">' + (meta.depth === 0 ? "warstwa główna" : "poziom " + meta.depth) + "</span>",
      "<h1>" + escapeHtml(item.label) + "</h1>",
      "<p>" + escapeHtml(item.description) + "</p>",
      "</div>",
      '<div class="layer-context-status"><span>RC Silesia / publiczna mapa stagingu</span><strong data-layer-active-label>' + escapeHtml(activeMeta().node.label) + "</strong></div>",
      "</section>",
      item.id === "home" ? renderHome(item) : renderLayerSections(item),
      "</section>"
    ].join("");
  }

  function refreshActiveState() {
    var meta = activeMeta();
    Array.prototype.slice.call(root.querySelectorAll(".layer-section")).forEach(function (section) {
      section.classList.toggle("is-active", section.getAttribute("data-layer-section") === state.activeSectionId);
    });
    Array.prototype.slice.call(root.querySelectorAll("[data-layer-active-label]")).forEach(function (label) {
      label.textContent = meta.node.label;
    });
    Array.prototype.slice.call(root.querySelectorAll("[data-tree-row-id]")).forEach(function (row) {
      var rowActive = row.getAttribute("data-tree-row-id") === meta.node.id;
      var rowLink = row.querySelector("[data-tree-id]");
      row.classList.toggle("is-active", rowActive);
      if (rowLink) {
        rowLink.classList.toggle("is-active", rowActive);
        rowLink.setAttribute("aria-current", rowActive ? "page" : "false");
      }
    });
    Array.prototype.slice.call(root.querySelectorAll(".layer-level-step")).forEach(function (step) {
      var depth = Number(step.getAttribute("data-level-depth") || "0");
      var nodeId = meta.path[depth] || "";
      var active = depth === Math.min(meta.depth, 3);
      step.classList.toggle("is-active", active);
      if (nodeId) {
        step.disabled = false;
        step.setAttribute("data-layer-go", nodeId);
        var label = step.querySelector("[data-level-label]");
        if (label) label.textContent = index[nodeId].node.label;
      } else {
        step.disabled = true;
        step.removeAttribute("data-layer-go");
      }
    });
    if (state.drawerOpen) {
      var treeItem = null;
      Array.prototype.slice.call(root.querySelectorAll("[data-tree-id]")).some(function (candidate) {
        if (candidate.getAttribute("data-tree-id") === meta.node.id) {
          treeItem = candidate;
          return true;
        }
        return false;
      });
      if (treeItem && treeItem.scrollIntoView) {
        treeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }

  function initScrollSpy() {
    if (sectionObserver) sectionObserver.disconnect();
    var sections = Array.prototype.slice.call(root.querySelectorAll("[data-layer-section]"));
    if (!sections.length || !("IntersectionObserver" in window)) return;
    sectionObserver = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) {
        return entry.isIntersecting;
      }).sort(function (first, second) {
        return second.intersectionRatio - first.intersectionRatio;
      })[0];
      if (!visible || !visible.target) return;
      var id = visible.target.getAttribute("data-layer-section") || state.currentNodeId;
      if (id === state.activeSectionId) return;
      state.activeSectionId = id;
      refreshActiveState();
    }, {
      root: null,
      rootMargin: "-120px 0px -55% 0px",
      threshold: [0.1, 0.35, 0.65]
    });
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  function restoreScrollAfterRender() {
    var target = pendingScroll;
    pendingScroll = null;
    window.requestAnimationFrame(function () {
      window.scrollTo({ top: target || 0, left: 0, behavior: "auto" });
    });
  }

  function focusAfterRender() {
    if (!pendingFocusSelector) return;
    var selector = pendingFocusSelector;
    pendingFocusSelector = "";
    window.requestAnimationFrame(function () {
      var target = root.querySelector(selector);
      if (target && target.focus) target.focus();
    });
  }

  function render() {
    root.innerHTML = renderShell();
    initScrollSpy();
    refreshActiveState();
    if (pendingScroll !== null) restoreScrollAfterRender();
    focusAfterRender();
  }

  function openDrawer() {
    state.drawerOpen = true;
    pendingFocusSelector = ".layer-drawer-close";
    render();
  }

  function closeDrawer() {
    state.drawerOpen = false;
    pendingFocusSelector = ".layer-map-trigger";
    render();
  }

  function toggleTreeNode(id) {
    if (!index[id] || !(index[id].node.children || []).length) return;
    if (state.expandedTreeIds.has(id)) {
      state.expandedTreeIds.delete(id);
    } else {
      state.expandedTreeIds.add(id);
    }
    state.expandedTreeIds.add("home");
    persistState();
    render();
  }

  function handleTile(id) {
    if (!index[id]) return;
    if (!state.showDescriptions || state.armedTileId === id) {
      navigateTo(id);
      return;
    }
    state.armedTileId = id;
    render();
  }

  root.addEventListener("click", function (event) {
    var target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    var tileButton = target.closest("[data-layer-tile]");
    if (tileButton) {
      handleTile(tileButton.getAttribute("data-layer-tile"));
      return;
    }

    var treeToggle = target.closest("[data-layer-toggle-tree]");
    if (treeToggle) {
      toggleTreeNode(treeToggle.getAttribute("data-layer-toggle-tree"));
      return;
    }

    var goButton = target.closest("[data-layer-go]");
    if (goButton && goButton.tagName !== "A") {
      navigateTo(goButton.getAttribute("data-layer-go"));
      return;
    }

    var actionButton = target.closest("[data-layer-action]");
    if (!actionButton) return;
    var action = actionButton.getAttribute("data-layer-action");
    if (action === "open-map") openDrawer();
    if (action === "close-map") closeDrawer();
    if (action === "back") goBack();
    if (action === "home") navigateTo("home", { scrollY: 0 });
    if (action === "up" && currentMeta().parentId) navigateTo(currentMeta().parentId);
    if (action === "panel") navigateTo("panel-placeholder", { scrollY: 0 });
  });

  root.addEventListener("change", function (event) {
    var target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.matches("[data-layer-description-toggle]")) {
      state.showDescriptions = target.checked;
      state.armedTileId = "";
      persistState();
      render();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!state.drawerOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== "Tab") return;
    var drawer = root.querySelector(".layer-drawer");
    if (!drawer) return;
    var focusable = Array.prototype.slice.call(drawer.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])"))
      .filter(function (item) {
        return item.offsetParent !== null;
      });
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("scroll", function () {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(function () {
      scrollTicking = false;
      state.scrollPositions[state.currentNodeId] = window.scrollY || 0;
      writeJson(storageKeys.scrollPositions, state.scrollPositions);
    });
  }, { passive: true });

  window.addEventListener("beforeunload", saveCurrentScroll);

  expandPath(state.currentNodeId);
  pendingScroll = state.scrollPositions[state.currentNodeId] || 0;
  render();
})();
