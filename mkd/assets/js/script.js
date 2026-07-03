(function () {
  "use strict";

  const DATA_VERSION = "0.2.1";
  const EMPTY_REGISTRY_TEXT = "Rejestr jest pusty. Pierwsze nasadzenia planowane są na sezon jesień 2026. Karty pojawią się po wykonaniu nasadzeń i dokumentacji standardu.";
  const MONITORING_LABELS = {
    "zyje": "żyje",
    "oslabione": "osłabione",
    "usuniete": "usunięte",
    "wymienione": "wymienione",
    "brak-danych": "brak danych"
  };

  function assetUrl(path) {
    return new URL(path, document.baseURI).toString();
  }

  function isActivationKey(event) {
    return event.key === "Enter" ||
      event.key === " " ||
      event.code === "Enter" ||
      event.code === "Space" ||
      event.keyCode === 13 ||
      event.keyCode === 32;
  }

  function seasonFromDate(date) {
    var month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return "wiosna";
    if (month >= 6 && month <= 8) return "lato";
    if (month >= 9 && month <= 11) return "jesien";
    return "zima";
  }

  function initSeason() {
    var allowed = { wiosna: true, lato: true, jesien: true, zima: true };
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("sezon");
    var season = allowed[requested] ? requested : seasonFromDate(new Date());
    document.documentElement.setAttribute("data-season", season);
  }

  function toggleAccordion(header, expanded) {
    var card = header.closest(".accordion-card");
    var panel = document.getElementById(header.getAttribute("aria-controls"));
    if (!card || !panel) return;

    card.setAttribute("aria-expanded", String(expanded));
    header.setAttribute("aria-expanded", String(expanded));
    panel.setAttribute("aria-hidden", String(!expanded));

    if (expanded) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
    }
  }

  function initAccordions(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll(".accordion-card__header")).forEach(function (header) {
      if (header.getAttribute("data-accordion-ready") === "true") return;
      header.setAttribute("data-accordion-ready", "true");
      toggleAccordion(header, header.getAttribute("aria-expanded") === "true");

      header.addEventListener("click", function () {
        toggleAccordion(header, header.getAttribute("aria-expanded") !== "true");
      });

      header.addEventListener("keydown", function (event) {
        if (!isActivationKey(event)) return;
        event.preventDefault();
        toggleAccordion(header, header.getAttribute("aria-expanded") !== "true");
      });
    });
  }

  function setText(selector, value) {
    var element = document.querySelector(selector);
    if (element && typeof value === "string" && value.trim()) {
      element.textContent = value;
    }
  }

  function setContactLink(selector, href, label) {
    var element = document.querySelector(selector);
    if (!element) return;
    if (typeof label === "string" && label.trim()) {
      element.textContent = label;
    }
    if (typeof href === "string" && href.trim()) {
      element.setAttribute("href", href);
    }
  }

  function loadJson(path) {
    if (!window.fetch) return Promise.reject(new Error("fetch unavailable"));
    return fetch(assetUrl(path), { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      });
  }

  function registrySource(section) {
    var fallback = section.getAttribute("data-registry-src") || "assets/data/rejestr.json";
    var params = new URLSearchParams(window.location.search);
    var override = params.get("registry");
    if (override && /^assets\/data\/[-a-z0-9_.]+\.json$/i.test(override)) {
      return override;
    }
    return fallback;
  }

  function clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function appendText(parent, tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    parent.appendChild(element);
    return element;
  }

  function formatValue(value, fallback) {
    if (value === null || value === undefined || value === "") return fallback || "brak danych";
    return String(value);
  }

  function monitoringStatus(entry) {
    var status = entry && entry.status ? String(entry.status) : "brak-danych";
    return MONITORING_LABELS[status] || "brak danych";
  }

  function buildMetaRow(list, label, value) {
    var row = document.createElement("div");
    var term = document.createElement("dt");
    var description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    row.appendChild(term);
    row.appendChild(description);
    list.appendChild(row);
  }

  function coordinateSummary(location) {
    var epsg = location && location.epsg2177 ? location.epsg2177 : {};
    var wgs = location && location.wgs84 ? location.wgs84 : {};
    if (epsg.x !== null && epsg.x !== undefined && epsg.y !== null && epsg.y !== undefined) {
      return "EPSG:2177 x=" + epsg.x + ", y=" + epsg.y;
    }
    if (wgs.lat !== null && wgs.lat !== undefined && wgs.lng !== null && wgs.lng !== undefined) {
      return "WGS84 " + wgs.lat + ", " + wgs.lng;
    }
    return "brak danych";
  }

  function renderTreeCard(tree) {
    var card = document.createElement("article");
    var meta = document.createElement("dl");
    var species = tree && tree.gatunek ? tree.gatunek : {};
    var location = tree && tree.lokalizacja ? tree.lokalizacja : {};
    var monitoring = tree && tree.monitoring ? tree.monitoring : {};
    var polishName = formatValue(species.nazwaPolska, "gatunek do uzupełnienia");
    var latinName = species.nazwaLacinska ? " (" + species.nazwaLacinska + ")" : "";

    card.className = "tree-card";
    appendText(card, "h3", "", formatValue(tree && tree.id, "MKD-RRRR-NNNN"));
    appendText(card, "p", "", polishName + latinName);

    meta.className = "tree-meta";
    buildMetaRow(meta, "Lokalizacja", formatValue(location.opis, "lokalizacja do uzupełnienia"));
    buildMetaRow(meta, "Współrzędne", coordinateSummary(location));
    buildMetaRow(meta, "Typ terenu", formatValue(location.typTerenu, "brak danych"));
    buildMetaRow(meta, "Data nasadzenia", formatValue(tree && tree.dataNasadzenia, "brak danych"));
    buildMetaRow(meta, "Obwód pnia", tree && tree.obwodPniaCm !== null && tree.obwodPniaCm !== undefined ? tree.obwodPniaCm + " cm" : "brak danych");
    buildMetaRow(meta, "Monitoring 12 mies.", monitoringStatus(monitoring.m12));
    buildMetaRow(meta, "Monitoring 24 mies.", monitoringStatus(monitoring.m24));
    buildMetaRow(meta, "Monitoring 36 mies.", monitoringStatus(monitoring.m36));
    card.appendChild(meta);

    return card;
  }

  function renderEmptyRegistry(list) {
    var empty = document.createElement("article");
    empty.className = "empty-state";
    empty.setAttribute("data-registry-empty", "");
    appendText(empty, "h3", "", "Rejestr jest pusty.");
    appendText(empty, "p", "", EMPTY_REGISTRY_TEXT);
    list.appendChild(empty);
  }

  function renderRegistry(data) {
    var section = document.querySelector("[data-registry-src]");
    if (!section) return;

    var count = section.querySelector("[data-registry-count]");
    var list = section.querySelector("[data-registry-list]");
    var status = section.querySelector("[data-registry-status]");
    var trees = data && Array.isArray(data.drzewa) ? data.drzewa : [];

    if (count) count.textContent = String(trees.length);
    if (status) {
      status.textContent = trees.length === 0 ? EMPTY_REGISTRY_TEXT : "Rejestr załadowany z danych. Liczba kart: " + trees.length + ".";
    }
    if (!list) return;

    clearElement(list);
    if (trees.length === 0) {
      renderEmptyRegistry(list);
      return;
    }

    trees.forEach(function (tree) {
      list.appendChild(renderTreeCard(tree));
    });
  }

  function loadRegistry() {
    var section = document.querySelector("[data-registry-src]");
    if (!section) return Promise.resolve(null);

    var source = registrySource(section);
    section.setAttribute("data-version", DATA_VERSION);

    return loadJson(source)
      .then(function (data) {
        section.setAttribute("data-registry-loaded", "true");
        renderRegistry(data);
        return data;
      })
      .catch(function (error) {
        section.setAttribute("data-registry-loaded", "false");
        var status = section.querySelector("[data-registry-status]");
        if (status) status.textContent = EMPTY_REGISTRY_TEXT;
        console.warn("Nie załadowano rejestru drzew. Używam statycznego fallbacku HTML.", error);
        return null;
      });
  }

  function renderSiteConfig(data) {
    if (!data || !data.kontakt) return;
    var contact = data.kontakt;
    setText("[data-contact-name]", contact.nazwa);
    setContactLink("[data-contact-email]", contact.email ? "mailto:" + contact.email : "", contact.email);
    setText("[data-contact-phone]", contact.telefon);
    setText("[data-contact-location]", contact.lokalizacja);
  }

  function loadSiteConfig() {
    return loadJson("assets/data/site.json")
      .then(function (data) {
        renderSiteConfig(data);
        return data;
      })
      .catch(function (error) {
        console.warn("Nie załadowano konfiguracji projektu. Używam statycznego fallbacku HTML.", error);
        return null;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSeason();
    initAccordions(document);
    loadRegistry();
    loadSiteConfig();
  });
}());
