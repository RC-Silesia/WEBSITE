(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const form = document.querySelector(".contact-form");
  if (form) {
    const CONTACT_EMAIL = "silesia@rotary.org.pl"; // <- adres odbiorcy zgłoszeń
    const statusEl = document.getElementById("form-status");
    const btn = form.querySelector('button[type="submit"]');
    const topicSelect = document.getElementById("contact-topic");
    const categoryInput = document.getElementById("contact-category");
    const topicGroups = Array.prototype.slice.call(form.querySelectorAll("[data-topic-panel]"));
    const topicButtons = Array.prototype.slice.call(document.querySelectorAll("[data-topic]"));
    const topicLabels = {
      "meeting": "Chcę przyjść na spotkanie",
      "meeting-topic": "Chcę zaproponować temat spotkania",
      "active-member": "Chcę zostać członkiem czynnym",
      "supporting-member": "Chcę zostać członkiem wspierającym",
      "partnership": "Partnerstwo lub sponsoring",
      "planet-location": "ROTARY for PLANET - zgłoszenie lokalizacji",
      "planet-volunteer": "ROTARY for PLANET - wolontariat",
      "media": "Kontakt dla mediów",
      "general": "Inna sprawa"
    };

    function setGroupEnabled(group, enabled) {
      group.hidden = !enabled;
      Array.prototype.slice.call(group.querySelectorAll("input, select, textarea")).forEach(function (field) {
        field.disabled = !enabled;
        if (!enabled) field.required = false;
      });
    }

    function applyTopic(topic, shouldFocus) {
      if (!topicLabels[topic]) topic = "general";
      if (topicSelect) topicSelect.value = topic;
      if (categoryInput) categoryInput.value = topicLabels[topic];
      topicGroups.forEach(function (group) {
        setGroupEnabled(group, group.getAttribute("data-topic-panel") === topic);
      });
      topicButtons.forEach(function (button) {
        button.classList.toggle("is-active", button.getAttribute("data-topic") === topic);
      });
      if (shouldFocus && topicSelect) topicSelect.focus();
    }

    if (topicSelect) {
      topicSelect.addEventListener("change", function () { applyTopic(topicSelect.value, false); });
    }

    topicButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const topic = button.getAttribute("data-topic") || "general";
        applyTopic(topic, true);
      });
    });

    applyTopic(topicSelect ? topicSelect.value : "meeting", false);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const hp = form.elements["_honey"];
      if (hp && hp.value) return; // pułapka na boty
      const data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (statusEl) { statusEl.classList.remove("is-error"); statusEl.textContent = "Wysyłanie\u2026"; }
      if (btn) btn.disabled = true;
      fetch("https://formsubmit.co/ajax/" + CONTACT_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
        .then(function () {
          form.reset();
          applyTopic("meeting", false);
          if (statusEl) statusEl.textContent = "Dziękujemy! Wiadomość została wysłana. Jeśli formularz nie działa, napisz bezpośrednio na " + CONTACT_EMAIL + ".";
        })
        .catch(function () {
          if (statusEl) {
            statusEl.classList.add("is-error");
            statusEl.textContent = "Nie udało się wysłać. Napisz bezpośrednio na " + CONTACT_EMAIL + ".";
          }
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  }

  const copyAccountButton = document.querySelector("[data-copy-account]");
  const copyAccountStatus = document.getElementById("copy-account-status");

  if (copyAccountButton) {
    copyAccountButton.addEventListener("click", function () {
      const accountNumber = copyAccountButton.getAttribute("data-copy-account") || "";
      const formattedNumber = accountNumber.replace(/(\d{2})(?=\d)/g, "$1 ").trim();

      function report(message, isError) {
        if (!copyAccountStatus) return;
        copyAccountStatus.textContent = message;
        copyAccountStatus.classList.toggle("is-error", Boolean(isError));
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(accountNumber)
          .then(function () { report("Skopiowano numer konta.", false); })
          .catch(function () { report("Nie udało się skopiować. Numer konta: " + formattedNumber, true); });
      } else {
        report("Skopiuj ręcznie numer konta: " + formattedNumber, true);
      }
    });
  }

  const returnStorageKey = "rcSilesiaLastSection";
  const safeHashPattern = /^#[A-Za-z0-9_-]+$/;

  function safeReturnHash(value) {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    return safeHashPattern.test(trimmed) ? trimmed : "";
  }

  function readStoredReturnHash() {
    try {
      return safeReturnHash(window.sessionStorage.getItem(returnStorageKey) || "");
    } catch (error) {
      return "";
    }
  }

  function writeStoredReturnHash(hash) {
    const safeHash = safeReturnHash(hash);
    if (!safeHash) return;
    try {
      window.sessionStorage.setItem(returnStorageKey, safeHash);
    } catch (error) {
      // Brak sessionStorage nie blokuje nawigacji.
    }
  }

  const observedSections = Array.prototype.slice.call(document.querySelectorAll("main section[id], main[id]"))
    .filter(function (section) {
      return safeReturnHash("#" + section.id);
    });

  if (observedSections.length) {
    writeStoredReturnHash(window.location.hash || "#start");

    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            writeStoredReturnHash("#" + entry.target.id);
          }
        });
      }, {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0
      });
      observedSections.forEach(function (section) {
        sectionObserver.observe(section);
      });
    } else {
      writeStoredReturnHash("#start");
    }
  }

  Array.prototype.slice.call(document.querySelectorAll("[data-privacy-link]")).forEach(function (link) {
    function updatePrivacyHref() {
      const returnTo = readStoredReturnHash() || safeReturnHash(window.location.hash) || "#start";
      link.setAttribute("href", "privacy.html?returnTo=" + encodeURIComponent(returnTo));
    }
    updatePrivacyHref();
    link.addEventListener("focus", updatePrivacyHref);
    link.addEventListener("pointerenter", updatePrivacyHref);
    link.addEventListener("click", updatePrivacyHref);
  });

  Array.prototype.slice.call(document.querySelectorAll("[data-return-link]")).forEach(function (link) {
    const params = new URLSearchParams(window.location.search);
    const returnTo = safeReturnHash(params.get("returnTo") || "") || readStoredReturnHash() || "#start";
    link.setAttribute("href", "index.html" + returnTo);
  });

  let currentNewsletterData = null;
  const newsletterContainer = document.querySelector('[data-render="newsletter"]');
  const newsletterStatus = document.querySelector("[data-newsletter-status]");
  const newsletterDownloadButton = document.querySelector("[data-download-newsletter-html]");

  function setNewsletterStatus(message, isError) {
    if (!newsletterStatus) return;
    newsletterStatus.textContent = message || "";
    newsletterStatus.classList.toggle("is-error", Boolean(isError));
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function clearNode(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  function appendNewsletterText(parent, tagName, text, className) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text || "";
    parent.appendChild(element);
    return element;
  }

  function normalizeNewsletterSections(data) {
    return data && Array.isArray(data.sections) ? data.sections : [];
  }

  function renderNewsletter(data) {
    if (!newsletterContainer || !data) return;
    clearNode(newsletterContainer);
    currentNewsletterData = data;

    appendNewsletterText(newsletterContainer, "p", "Okres raportu", "eyebrow");
    appendNewsletterText(newsletterContainer, "h2", data.period && data.period.label ? data.period.label : "do uzupełnienia");
    appendNewsletterText(newsletterContainer, "p", "Status: " + (data.status || "draft"), "newsletter-draft-badge");
    appendNewsletterText(newsletterContainer, "p", data.editorialNote || "Szkic newslettera wymaga zatwierdzenia przed wysyłką.");
    if (data.intro) appendNewsletterText(newsletterContainer, "p", data.intro);

    normalizeNewsletterSections(data).forEach(function (section) {
      const sectionElement = document.createElement("section");
      appendNewsletterText(sectionElement, "h3", section.title || "Sekcja");
      const list = document.createElement("ul");
      (Array.isArray(section.items) ? section.items : []).forEach(function (item) {
        const listItem = document.createElement("li");
        appendNewsletterText(listItem, "strong", item.title || "Temat");
        appendNewsletterText(listItem, "span", "Status: " + (item.status || "draft"), "newsletter-item-status");
        appendNewsletterText(listItem, "p", item.text || "");
        list.appendChild(listItem);
      });
      sectionElement.appendChild(list);
      newsletterContainer.appendChild(sectionElement);
    });

    if (data.cta && data.cta.label) {
      const cta = document.createElement("a");
      cta.className = "button primary";
      cta.textContent = data.cta.label;
      cta.setAttribute("href", data.cta.href || "index.html#start");
      newsletterContainer.appendChild(cta);
    }
  }

  function readNewsletterFallback() {
    const fallback = document.getElementById("newsletter-fallback-data");
    if (!fallback) return null;
    try {
      return JSON.parse(fallback.textContent || "");
    } catch (error) {
      return null;
    }
  }

  function buildNewsletterHtml(data) {
    const title = data.title || "Newsletter tygodniowy RC Silesia";
    const period = data.period && data.period.label ? data.period.label : "do uzupełnienia";
    const status = data.status || "draft";
    const sections = normalizeNewsletterSections(data).map(function (section) {
      const items = (Array.isArray(section.items) ? section.items : []).map(function (item) {
        return [
          "        <li>",
          "          <strong>" + escapeHtml(item.title || "Temat") + "</strong>",
          "          <span class=\"status\">" + escapeHtml(item.status || "draft") + "</span>",
          "          <p>" + escapeHtml(item.text || "") + "</p>",
          "        </li>"
        ].join("\n");
      }).join("\n");
      return [
        "      <section>",
        "        <h2>" + escapeHtml(section.title || "Sekcja") + "</h2>",
        "        <ul>",
        items,
        "        </ul>",
        "      </section>"
      ].join("\n");
    }).join("\n");
    const cta = data.cta && data.cta.label
      ? "      <p class=\"cta\"><a href=\"" + escapeHtml(data.cta.href || "index.html#start") + "\">" + escapeHtml(data.cta.label) + "</a></p>\n"
      : "";

    return [
      "<!doctype html>",
      "<html lang=\"pl\">",
      "<head>",
      "  <meta charset=\"utf-8\">",
      "  <title>" + escapeHtml(title) + "</title>",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
      "  <style>",
      "    body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #263238; background: #f5f7fa; line-height: 1.55; }",
      "    .wrap { max-width: 760px; margin: 0 auto; padding: 32px 18px; }",
      "    header, section, footer { margin-bottom: 18px; padding: 22px; border: 1px solid #dfe5ea; border-radius: 8px; background: #ffffff; }",
      "    h1, h2 { color: #0d2b5f; }",
      "    h1 { margin: 0 0 10px; }",
      "    h2 { margin-top: 0; }",
      "    .meta, .note, footer { color: #64707a; }",
      "    .status { display: inline-block; margin-left: 8px; padding: 2px 8px; border-radius: 999px; color: #0d2b5f; background: #fff7e6; font-size: 12px; font-weight: 700; }",
      "    li { margin-bottom: 14px; }",
      "    li p { margin: 6px 0 0; }",
      "    .cta a { display: inline-block; padding: 10px 14px; border-radius: 6px; color: #0d2b5f; background: #f7a81b; font-weight: 700; text-decoration: none; }",
      "  </style>",
      "</head>",
      "<body>",
      "  <div class=\"wrap\">",
      "    <header>",
      "      <p class=\"meta\">RC Silesia</p>",
      "      <h1>" + escapeHtml(title) + "</h1>",
      "      <p>Okres raportu: <strong>" + escapeHtml(period) + "</strong></p>",
      "      <p>Status: <strong>" + escapeHtml(status) + "</strong></p>",
      "      <p class=\"note\">" + escapeHtml(data.editorialNote || "Szkic newslettera wymaga zatwierdzenia przed wysyłką.") + "</p>",
      "      <p>" + escapeHtml(data.intro || "") + "</p>",
      "    </header>",
      sections,
      cta + "    <footer>" + escapeHtml(data.footer || "To jest szkic newslettera RC Silesia. Przed wysyłką wymaga zatwierdzenia.") + "</footer>",
      "  </div>",
      "</body>",
      "</html>",
      ""
    ].join("\n");
  }

  function newsletterFileDate(data) {
    const raw = data && data.period && data.period.to ? data.period.to : data && data.generatedAt ? data.generatedAt : new Date().toISOString().slice(0, 10);
    return String(raw).replace(/[^0-9-]/g, "") || "draft";
  }

  function downloadNewsletterHtml(data) {
    const html = buildNewsletterHtml(data);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rc-silesia-newsletter-" + newsletterFileDate(data) + ".html";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 0);
  }

  if (newsletterContainer || newsletterDownloadButton) {
    const fallbackData = readNewsletterFallback();
    if (fallbackData) {
      currentNewsletterData = fallbackData;
      renderNewsletter(fallbackData);
    }
    fetch("assets/data/newsletter.json")
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        currentNewsletterData = data;
        renderNewsletter(data);
        setNewsletterStatus("");
      })
      .catch(function () {
        if (!currentNewsletterData) {
          setNewsletterStatus("Eksport HTML wymaga załadowania danych newslettera.", true);
          if (newsletterDownloadButton instanceof HTMLButtonElement) newsletterDownloadButton.disabled = true;
        }
      });
  }

  if (newsletterDownloadButton instanceof HTMLButtonElement) {
    newsletterDownloadButton.addEventListener("click", function () {
      if (!currentNewsletterData) {
        setNewsletterStatus("Eksport HTML wymaga załadowania danych newslettera.", true);
        return;
      }
      downloadNewsletterHtml(currentNewsletterData);
      setNewsletterStatus("Plik HTML newslettera został przygotowany do pobrania.", false);
    });
  }

  const backToTopButton = document.querySelector("[data-back-to-top]");
  if (backToTopButton instanceof HTMLButtonElement) {
    const threshold = 600;
    let backToTopVisible = false;
    let backToTopTicking = false;
    let backToTopHideTimer = 0;
    backToTopButton.tabIndex = -1;

    function moveBackToTopFocus() {
      const target = document.getElementById("start");
      if (target instanceof HTMLElement) {
        const hadTabindex = target.hasAttribute("tabindex");
        const previousTabindex = target.getAttribute("tabindex");
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (hadTabindex) {
          target.setAttribute("tabindex", previousTabindex || "");
        } else {
          target.removeAttribute("tabindex");
        }
        return;
      }

      document.body.setAttribute("tabindex", "-1");
      document.body.focus({ preventScroll: true });
      document.body.removeAttribute("tabindex");
    }

    function setBackToTopVisible(visible) {
      if (visible === backToTopVisible) return;
      backToTopVisible = visible;
      window.clearTimeout(backToTopHideTimer);

      if (visible) {
        backToTopButton.hidden = false;
        backToTopButton.tabIndex = 0;
        window.requestAnimationFrame(function () {
          backToTopButton.classList.add("is-visible");
        });
        return;
      }

      if (document.activeElement === backToTopButton) {
        moveBackToTopFocus();
      }
      backToTopButton.classList.remove("is-visible");
      backToTopButton.tabIndex = -1;
      backToTopHideTimer = window.setTimeout(function () {
        if (!backToTopVisible && !backToTopButton.classList.contains("is-visible")) {
          backToTopButton.hidden = true;
        }
      }, 220);
    }

    function updateBackToTop() {
      backToTopTicking = false;
      setBackToTopVisible(window.scrollY > threshold);
    }

    function requestBackToTopUpdate() {
      if (backToTopTicking) return;
      backToTopTicking = true;
      window.requestAnimationFrame(updateBackToTop);
    }

    backToTopButton.addEventListener("click", function () {
      const target = document.getElementById("start") || document.body;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });

    window.addEventListener("scroll", requestBackToTopUpdate, { passive: true });
    updateBackToTop();
  }

  const canvas = document.getElementById("hero-canvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let ratio = 1;
  let frame = 0;

  function resize() {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.max(1, Math.floor(width * ratio));
    canvas.height = Math.max(1, Math.floor(height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function drawBranch(x, y, length, angle, depth, sway) {
    if (depth <= 0 || length < 3) return;

    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    const alpha = Math.max(.08, depth * .035);

    ctx.strokeStyle = `rgba(247, 168, 27, ${alpha})`;
    ctx.lineWidth = Math.max(1, depth * .55);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    const next = length * .72;
    drawBranch(endX, endY, next, angle - .36 + sway, depth - 1, sway * .7);
    drawBranch(endX, endY, next * .9, angle + .32 + sway, depth - 1, sway * .7);
  }

  function draw() {
    frame += .006;
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#0d2b5f");
    gradient.addColorStop(.48, "#17458f");
    gradient.addColorStop(1, "#2d7d46");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 42; i += 1) {
      const x = (i * 131 + Math.sin(frame + i) * 16) % (width + 120) - 60;
      const y = (i * 79) % Math.max(height, 1);
      const radius = 1.5 + (i % 5) * .8;
      ctx.fillStyle = i % 3 === 0 ? "rgba(247,168,27,.2)" : "rgba(255,255,255,.16)";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    ctx.translate(width * .72, height * .92);
    drawBranch(0, 0, Math.min(width, height) * .19, -Math.PI / 2, 8, Math.sin(frame * 2) * .018);
    ctx.restore();

    ctx.save();
    ctx.translate(width * .88, height * .94);
    drawBranch(0, 0, Math.min(width, height) * .13, -Math.PI / 2.15, 7, Math.cos(frame * 2.2) * .014);
    ctx.restore();

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
})();


(function () {
  const grid = document.querySelector(".areas-grid");
  const local = document.getElementById("area-local");
  if (!grid || !local) return;
  const tiles = Array.prototype.slice.call(grid.querySelectorAll(".area-tile:not(.area-local)"));
  const titleEl = document.getElementById("local-title");
  const textEl = document.getElementById("local-text");
  const srcEl = document.getElementById("local-source");
  let def = tiles.findIndex(function (t) { return t.dataset.area === "srodowisko"; });
  if (def < 0) def = tiles.length - 1;

  function apply(i) {
    const t = tiles[i];
    if (!t) return;
    titleEl.textContent = t.dataset.localTitle;
    textEl.textContent = t.dataset.localText;
    srcEl.textContent = "Obszar: " + t.querySelector("h3").textContent;
    local.style.order = String((i + 1) * 10 + 5);
    tiles.forEach(function (x) {
      x.classList.remove("is-source");
      x.setAttribute("aria-pressed", "false");
    });
    t.classList.add("is-source");
    t.setAttribute("aria-pressed", "true");
    local.classList.remove("flash");
    void local.offsetWidth;
    local.classList.add("flash");
  }

  tiles.forEach(function (t, i) {
    t.setAttribute("role", "button");
    t.setAttribute("aria-pressed", "false");
    t.addEventListener("mouseenter", function () { apply(i); });
    t.addEventListener("pointerdown", function () { apply(i); });
    t.addEventListener("focusin", function () { apply(i); });
    t.addEventListener("click", function () { apply(i); });
    t.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        apply(i);
      }
    });
  });
  grid.addEventListener("mouseleave", function () { apply(def); });

  apply(def);
})();


/* ===== Sprint v1.0 — social hub z lazy-load embedów ===== */
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-social-tab]"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-social-panel]"));

  if (tabs.length && panels.length) {
    function activateSocialPanel(name, focus) {
      tabs.forEach(function (tab) {
        var active = tab.getAttribute("data-social-tab") === name;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-social-panel") !== name;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activateSocialPanel(tab.getAttribute("data-social-tab"), false);
      });

      tab.addEventListener("keydown", function (event) {
        var direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!direction) return;
        event.preventDefault();
        var next = (index + direction + tabs.length) % tabs.length;
        activateSocialPanel(tabs[next].getAttribute("data-social-tab"), true);
      });
    });
  }

  var messages = {
    facebook: "Facebook Page Plugin zostanie podłączony po podaniu oficjalnego URL profilu RC Silesia.",
    instagram: "Automatyczny feed Instagram wymaga oficjalnego konta i integracji przez Meta/Instagram API albo zatwierdzony widget zewnętrzny.",
    linkedin: "LinkedIn pozwala osadzać wybrane posty. Pełny automatyczny feed może wymagać narzędzia zewnętrznego lub integracji API.",
    x: "Feed X zostanie podłączony po decyzji o oficjalnym profilu i sposobie integracji."
  };

  Array.prototype.slice.call(document.querySelectorAll("[data-social-load]")).forEach(function (button) {
    button.addEventListener("click", function () {
      var channel = button.getAttribute("data-social-load");
      var target = document.getElementById(button.getAttribute("aria-controls"));
      if (!target) return;

      if (channel === "youtube") {
        var iframe = target.querySelector("iframe[data-src]");
        var src = iframe ? iframe.getAttribute("data-src") || "" : "";
        var message = target.querySelector("p");
        if (!iframe || src.indexOf("PLAYLIST_ID") !== -1) {
          if (message) message.textContent = "Playlista zostanie podłączona po podaniu oficjalnego ID kanału lub playlisty RC Silesia.";
          target.classList.remove("is-loaded");
          button.textContent = "Playlista do podłączenia";
          button.disabled = true;
          return;
        }
        if (!iframe.getAttribute("src")) {
          iframe.setAttribute("src", src);
        }
        target.classList.add("is-loaded");
        button.textContent = "YouTube załadowany";
        button.disabled = true;
        return;
      }

      target.classList.add("is-loaded");
      target.textContent = messages[channel] || "Ten kanał zostanie podłączony po podaniu oficjalnego linku lub wyborze widgetu.";
      button.textContent = "Kanał oznaczony do podłączenia";
      button.disabled = true;
    });
  });
})();


/* ===== Sprint 1.1 — pilotaż warstwy danych JSON ===== */
(function () {
  var DATA_VERSION = "1.5.69";

  function safeText(element, value) {
    if (!element || value === undefined || value === null) return;
    element.textContent = String(value);
  }

  function safeHref(element, value) {
    if (!element || typeof value !== "string") return;
    var normalizedValue = value.trim();
    if (!normalizedValue || normalizedValue === "#" || normalizedValue.replace(/#$/, "") === "") {
      element.removeAttribute("href");
      element.removeAttribute("target");
      element.removeAttribute("rel");
      element.setAttribute("aria-disabled", "true");
      element.classList.add("is-disabled");
      if (!element.dataset.placeholderClickGuard) {
        element.addEventListener("click", function (event) {
          if (element.getAttribute("aria-disabled") === "true") {
            event.preventDefault();
          }
        });
        element.dataset.placeholderClickGuard = "true";
      }
      if (element.textContent.indexOf("Otwórz") === 0) {
        element.textContent = element.getAttribute("data-placeholder-link") === "media" ? "Materiał wkrótce" : "Kanał wkrótce";
      }
      return;
    }
    if (normalizedValue.indexOf("mailto:") === 0 || normalizedValue.indexOf("assets/") === 0 || normalizedValue.indexOf("https://") === 0 || normalizedValue.indexOf("http://") === 0) {
      element.setAttribute("href", normalizedValue);
      element.removeAttribute("aria-disabled");
      element.classList.remove("is-disabled");
    }
  }

  function clearElement(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  function enhanceDocumentDownloadLink(link) {
    if (!link) return;
    var href = link.getAttribute("href") || "";
    if (href.indexOf("assets/docs/") !== 0) return;
    var fileName = href.split("/").pop();
    link.setAttribute("download", fileName || "");
  }

  function enhanceDocumentDownloads(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll('a[href^="assets/docs/"]')).forEach(enhanceDocumentDownloadLink);
  }

  function appendTextElement(parent, tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    safeText(element, text);
    parent.appendChild(element);
    return element;
  }

  function renderSocialLinks(social) {
    if (!social) return;
    Array.prototype.slice.call(document.querySelectorAll("[data-social-link]")).forEach(function (link) {
      var key = link.getAttribute("data-social-link");
      safeHref(link, social[key]);
    });
  }

  function hardenStaticPlaceholderLinks() {
    Array.prototype.slice.call(document.querySelectorAll('[data-placeholder-link][href="#"], [data-placeholder-link]:not([href])')).forEach(function (link) {
      safeHref(link, "#");
    });
  }

  function safeCarouselHref(value) {
    if (typeof value !== "string") return "";
    var normalizedValue = value.trim();
    if (!normalizedValue) return "";
    if (normalizedValue.charAt(0) === "#") return normalizedValue;
    if (normalizedValue.indexOf("privacy.html#") === 0) return normalizedValue;
    if (normalizedValue.indexOf("assets/") === 0) return normalizedValue;
    if (normalizedValue.indexOf("https://") === 0 || normalizedValue.indexOf("http://") === 0) return normalizedValue;
    return "";
  }

  function appendCarouselLink(parent, linkData, className) {
    if (!linkData || typeof linkData !== "object") return null;
    var href = safeCarouselHref(linkData.href);
    if (!href || !linkData.label) return null;
    var link = document.createElement("a");
    link.className = className || "button secondary";
    link.href = href;
    safeText(link, linkData.label);
    parent.appendChild(link);
    return link;
  }

  function renderHeroCarouselContentSlide(slide) {
    var article = document.createElement("article");
    article.className = "hero-carousel__content-card";
    appendTextElement(article, "p", "eyebrow", slide.id === "planet" ? "ROTARY for PLANET" : "RC Silesia");
    appendTextElement(article, "h2", "", slide.title);
    appendTextElement(article, "p", "", slide.text);
    appendCarouselLink(article, slide.link, "button secondary");
    return article;
  }

  function isApprovedPhotoSlide(slide) {
    var ok = Boolean(
      slide &&
      slide.type === "photo" &&
      slide.consent &&
      slide.consent.status === "approved" &&
      slide.image &&
      typeof slide.image.src === "string" &&
      slide.image.src.trim()
    );
    if (!ok) return false;
    // Defense-in-depth: zdjęcie z małoletnimi wymaga jawnej zgody opiekuna.
    if (slide.consent.minorsPresent === true && slide.consent.guardianConsent !== true) {
      return false;
    }
    return true;
  }

  function renderHeroCarouselPhotoPlaceholder(slide) {
    var article = document.createElement("article");
    article.className = "hero-carousel__photo-card";

    var placeholder = document.createElement("div");
    placeholder.className = "hero-carousel__placeholder";
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", "Zdjęcie po zatwierdzeniu zgód");

    var camera = document.createElement("span");
    camera.className = "hero-carousel__camera";
    camera.setAttribute("aria-hidden", "true");
    placeholder.appendChild(camera);

    appendTextElement(placeholder, "h2", "", slide.title || "Zdjęcie");
    appendTextElement(placeholder, "p", "", "Zdjęcie po zatwierdzeniu zgód.");
    appendCarouselLink(placeholder, {
      href: slide.policyHref || "privacy.html#wizerunek",
      label: "Polityka wizerunku i zgód"
    }, "hero-carousel__policy");

    article.appendChild(placeholder);
    return article;
  }

  function renderHeroCarouselPhotoSlide(slide, index) {
    if (!isApprovedPhotoSlide(slide)) return renderHeroCarouselPhotoPlaceholder(slide);

    var article = document.createElement("article");
    article.className = "hero-carousel__photo-card";
    var picture = document.createElement("picture");
    var image = slide.image || {};
    var src = image.src.trim();
    var fallback = typeof image.fallback === "string" && image.fallback.trim() ? image.fallback.trim() : src;

    if (/\.webp(\?|$)/i.test(src) && fallback !== src) {
      var source = document.createElement("source");
      source.srcset = src;
      source.type = "image/webp";
      picture.appendChild(source);
    }

    var img = document.createElement("img");
    img.className = "hero-carousel__image";
    img.src = fallback;
    img.alt = typeof image.alt === "string" ? image.alt : "";
    img.width = Number(image.width) || 1200;
    img.height = Number(image.height) || 675;
    img.decoding = "async";
    if (index > 0) img.loading = "lazy";
    picture.appendChild(img);
    article.appendChild(picture);

    if (slide.caption) appendTextElement(article, "p", "hero-carousel__caption", slide.caption);
    return article;
  }

  function renderHeroCarouselSlide(slide, index, total) {
    var item = document.createElement("li");
    item.className = "hero-carousel__slide";
    item.setAttribute("role", "group");
    item.setAttribute("aria-roledescription", "slajd");
    item.setAttribute("aria-label", (index + 1) + " z " + total);
    item.dataset.carouselTitle = slide.title || ("Slajd " + (index + 1));
    if (slide.type === "photo") {
      item.appendChild(renderHeroCarouselPhotoSlide(slide, index));
    } else {
      item.appendChild(renderHeroCarouselContentSlide(slide));
    }
    return item;
  }

  function initHeroCarousel(scope) {
    var rootScope = scope || document;
    var carousel = rootScope.querySelector("[data-hero-carousel]");
    if (!carousel || carousel.getAttribute("data-carousel-ready") === "true") return Promise.resolve(null);
    carousel.setAttribute("data-carousel-ready", "true");

    var track = carousel.querySelector(".hero-carousel__track");
    var prev = carousel.querySelector(".hero-carousel__prev");
    var next = carousel.querySelector(".hero-carousel__next");
    var dots = carousel.querySelector(".hero-carousel__dots");
    var rotate = carousel.querySelector(".hero-carousel__rotate");
    if (!track || !prev || !next || !dots || !rotate) return Promise.resolve(null);

    var activeIndex = 0;
    var slides = [];
    var dotButtons = [];
    var autoRotate = false;
    var intervalId = null;
    var paused = true;
    var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function stopAutoplay() {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = null;
      paused = true;
      rotate.textContent = "Wznów";
      rotate.setAttribute("aria-pressed", "true");
      track.setAttribute("aria-live", "polite");
    }

    function startAutoplay() {
      if (!autoRotate || prefersReducedMotion || slides.length < 2) return;
      if (intervalId) window.clearInterval(intervalId);
      paused = false;
      rotate.textContent = "Wstrzymaj";
      rotate.setAttribute("aria-pressed", "false");
      track.setAttribute("aria-live", "off");
      intervalId = window.setInterval(function () {
        goTo(activeIndex + 1, false);
      }, 6000);
    }

    function userStop() {
      if (autoRotate) stopAutoplay();
    }

    function goTo(index, userInitiated) {
      if (!slides.length) return;
      activeIndex = (index + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (activeIndex * 100) + "%)";
      slides.forEach(function (slide, slideIndex) {
        var active = slideIndex === activeIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        if (active) {
          slide.removeAttribute("inert");
        } else {
          slide.setAttribute("inert", "");
        }
      });
      dotButtons.forEach(function (dot, dotIndex) {
        var active = dotIndex === activeIndex;
        dot.setAttribute("aria-current", String(active));
        dot.setAttribute("aria-selected", String(active));
        dot.tabIndex = active ? 0 : -1;
      });
      if (userInitiated) userStop();
    }

    function setupCarousel(data) {
      var dataSlides = data && Array.isArray(data.slides) ? data.slides : null;
      if (dataSlides && dataSlides.length) {
        clearElement(track);
        dataSlides.forEach(function (slide, index) {
          track.appendChild(renderHeroCarouselSlide(slide, index, dataSlides.length));
        });
        autoRotate = data.autoRotate === true;
      }

      slides = Array.prototype.slice.call(track.querySelectorAll(".hero-carousel__slide"));
      if (!slides.length) return;
      carousel.classList.add("is-enhanced");
      prev.hidden = slides.length < 2;
      next.hidden = slides.length < 2;
      dots.hidden = slides.length < 2;
      clearElement(dots);
      dotButtons = slides.map(function (slide, index) {
        var title = slide.dataset.carouselTitle || slide.querySelector("h2") && slide.querySelector("h2").textContent || ("Slajd " + (index + 1));
        if (!slide.id) slide.id = "hero-carousel-slide-" + (index + 1);
        slide.setAttribute("aria-label", (index + 1) + " z " + slides.length);
        var dot = document.createElement("button");
        dot.className = "hero-carousel__dot";
        dot.type = "button";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-controls", slide.id);
        dot.setAttribute("aria-label", "Slajd " + (index + 1) + ": " + title);
        dot.addEventListener("click", function () {
          goTo(index, true);
        });
        dots.appendChild(dot);
        return dot;
      });

      prev.addEventListener("click", function () {
        goTo(activeIndex - 1, true);
      });
      next.addEventListener("click", function () {
        goTo(activeIndex + 1, true);
      });
      carousel.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(activeIndex - 1, true);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(activeIndex + 1, true);
        }
      });
      carousel.addEventListener("mouseenter", function () {
        if (autoRotate && !paused) stopAutoplay();
      });
      carousel.addEventListener("focusin", function () {
        if (autoRotate && !paused) stopAutoplay();
      });
      rotate.addEventListener("click", function () {
        if (paused) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      });

      if (autoRotate && !prefersReducedMotion) {
        rotate.hidden = false;
        startAutoplay();
      } else {
        rotate.hidden = true;
        track.setAttribute("aria-live", "polite");
      }
      goTo(0, false);
    }

    if (!window.fetch) {
      setupCarousel(null);
      return Promise.resolve(null);
    }

    return fetch("assets/data/carousel.json?v=" + DATA_VERSION)
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        setupCarousel(data);
        return data;
      })
      .catch(function (error) {
        console.warn("Nie załadowano assets/data/carousel.json. Używam statycznego fallbacku HTML.", error);
        setupCarousel(null);
        return null;
      });
  }

  function renderDocuments(documents) {
    var container = document.querySelector('[data-render="documents"]');
    if (!container || !Array.isArray(documents) || !documents.length) return;

    clearElement(container);
    documents.forEach(function (documentItem) {
      var card = document.createElement("article");
      card.className = "document-card";

      var status = appendTextElement(card, "span", "document-status", documentItem.status);
      if (String(documentItem.status || "").toLowerCase().indexOf("projekt") !== -1) {
        status.classList.add("is-draft");
      }

      appendTextElement(card, "h3", "", documentItem.title);
      appendTextElement(card, "p", "", "Format: " + (documentItem.format || "plik"));
      appendTextElement(card, "p", "", documentItem.note);

      var link = document.createElement("a");
      link.className = "document-download-bar";
      link.setAttribute("aria-label", "Pobierz " + (documentItem.title || "dokument") + " " + (documentItem.format || ""));
      appendTextElement(link, "span", "", "Pobierz");
      var icon = appendTextElement(link, "span", "", "↓");
      icon.setAttribute("aria-hidden", "true");
      safeHref(link, documentItem.href);
      enhanceDocumentDownloadLink(link);
      card.appendChild(link);

      container.appendChild(card);
    });
  }

  function statusClass(status) {
    var normalized = String(status || "").toLowerCase();
    if (normalized.indexOf("planowane") !== -1) return "status-planned";
    if (normalized.indexOf("uzgodnieniu") !== -1) return "status-review";
    if (normalized.indexOf("gotowe") !== -1) return "status-ready";
    if (normalized.indexOf("posadzone") !== -1) return "status-planted";
    if (normalized.indexOf("monitoringu") !== -1) return "status-monitoring";
    return "status-action";
  }

  function appendTableCell(row, text) {
    var cell = document.createElement("td");
    safeText(cell, text);
    row.appendChild(cell);
    return cell;
  }

  function renderPlantings(rows) {
    var tbody = document.querySelector('[data-render="plantings-demo"]');
    if (!tbody || !Array.isArray(rows) || !rows.length) return;

    clearElement(tbody);
    rows.forEach(function (item) {
      var row = document.createElement("tr");
      var statusCell = document.createElement("td");
      var badge = appendTextElement(statusCell, "span", "status-badge " + statusClass(item.status), item.status);
      badge.setAttribute("aria-label", "Status: " + (item.status || ""));
      row.appendChild(statusCell);
      appendTableCell(row, item.location);
      appendTableCell(row, item.species);
      appendTableCell(row, item.count);
      appendTableCell(row, item.caretaker);
      appendTableCell(row, item.inspection);
      tbody.appendChild(row);
    });
  }

  function renderList(selector, items) {
    var list = document.querySelector(selector);
    if (!list || !Array.isArray(items) || !items.length) return;

    clearElement(list);
    items.forEach(function (item) {
      appendTextElement(list, "li", "", item);
    });
  }

  function renderMediaDemo(items) {
    var container = document.querySelector('[data-render="media-demo"]');
    if (!container || !Array.isArray(items) || !items.length) return;

    clearElement(container);
    items.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "media-card";

      appendTextElement(card, "span", "", item.type);
      appendTextElement(card, "h4", "", item.title);

      var link = appendTextElement(card, "a", "button secondary", "Otwórz materiał");
      link.setAttribute("data-placeholder-link", "media");
      safeHref(link, item.href);

      container.appendChild(card);
    });
  }

  function renderRotaryForPlanet(program) {
    if (!program) return;

    var summary = document.querySelector('[data-render="rotary-for-planet-summary"]');
    safeText(summary, program.summary);

    var cardsContainer = document.querySelector('[data-render="rotary-for-planet-cards"]');
    if (cardsContainer && Array.isArray(program.cards) && program.cards.length) {
      clearElement(cardsContainer);
      program.cards.forEach(function (item) {
        var card = document.createElement("article");
        appendTextElement(card, "span", "", item.title);
        appendTextElement(card, "strong", "", item.value);
        appendTextElement(card, "p", "", item.body);
        cardsContainer.appendChild(card);
      });
    }
  }

  function appendTextList(parent, items) {
    if (!Array.isArray(items) || !items.length) return null;
    var list = document.createElement("ul");
    items.forEach(function (item) {
      appendTextElement(list, "li", "", item);
    });
    parent.appendChild(list);
    return list;
  }

  function findBody(data, id) {
    if (!data || !Array.isArray(data.bodies)) return null;
    return data.bodies.find(function (body) { return body.id === id; }) || null;
  }

  function appendMembers(parent, members) {
    if (!Array.isArray(members) || !members.length) return;
    var list = document.createElement("ul");
    members.forEach(function (member) {
      appendTextElement(list, "li", "", (member.name || "") + " - " + (member.role || ""));
    });
    parent.appendChild(list);
  }

  function renderStatutoryBody(container, body) {
    var card = document.createElement("article");
    card.className = "statutory-body-card";

    var buttonId = "statutory-toggle-" + body.id;
    var panelId = "statutory-panel-" + body.id;

    var button = document.createElement("button");
    button.className = "statutory-body-toggle";
    button.type = "button";
    button.id = buttonId;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", panelId);

    var text = document.createElement("span");
    appendTextElement(text, "strong", "", body.name);
    appendTextElement(text, "small", "", body.shortDescription);
    button.appendChild(text);

    var chevron = document.createElement("span");
    chevron.className = "statutory-chevron";
    chevron.setAttribute("aria-hidden", "true");
    button.appendChild(chevron);
    card.appendChild(button);

    var panel = document.createElement("div");
    panel.className = "statutory-body-panel";
    panel.id = panelId;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", buttonId);
    panel.hidden = true;

    appendTextElement(panel, "p", "statutory-reference", body.statutoryReference);
    if (body.composition) appendTextElement(panel, "p", "", body.composition);
    appendTextElement(panel, "h4", "", "Zadania statutowe");
    appendTextList(panel, body.statutoryTasks);

    if (Array.isArray(body.members) && body.showMembersList) {
      appendTextElement(panel, "h4", "", body.id === "zarzad" ? "Skład Zarządu" : "Skład");
      appendMembers(panel, body.members);
    }

    if (body.membersCount) {
      appendTextElement(panel, "h4", "", "Liczba członków zwyczajnych");
      appendTextElement(panel, "p", "", (body.membersCount.regular || "") + " " + (body.membersCount.asOfDate || ""));
    }

    if (Array.isArray(body.additionalInfo) && body.additionalInfo.length) {
      appendTextElement(panel, "h4", "", "Terminy i zasady");
      appendTextList(panel, body.additionalInfo);
    }

    if (body.termCurrent) appendTextElement(panel, "p", "status-note", body.termCurrent);
    if (body.representationRule) appendTextElement(panel, "p", "statutory-representation", body.representationRule);
    if (body.membersNote) appendTextElement(panel, "p", "status-note", body.membersNote);

    card.appendChild(panel);
    container.appendChild(card);
  }

  function renderStatutoryBodies(statutoryBodies) {
    if (!statutoryBodies) return;

    safeText(document.querySelector('[data-render="statutory-term-note"]'), statutoryBodies.termNote);

    var container = document.querySelector('[data-render="statutory-bodies"]');
    if (!container || !Array.isArray(statutoryBodies.bodies) || !statutoryBodies.bodies.length) return;
    clearElement(container);
    statutoryBodies.bodies.forEach(function (body) {
      renderStatutoryBody(container, body);
    });
    initStatutoryAccordions(container);
  }

  function renderBoardMembers(statutoryBodies) {
    var zarzad = findBody(statutoryBodies, "zarzad");
    var container = document.querySelector('[data-render="board-members"]');
    if (!container || !zarzad || !Array.isArray(zarzad.members) || !zarzad.members.length) return;

    clearElement(container);
    zarzad.members.forEach(function (member, index) {
      var itemNumber = index + 1;
      var toggleId = "zarzad-toggle-" + itemNumber;
      var panelId = "zarzad-panel-" + itemNumber;
      var card = document.createElement("article");
      card.className = "person-card";
      card.setAttribute("aria-expanded", "false");

      var header = document.createElement("div");
      header.className = "person-card__header";
      header.id = toggleId;
      header.setAttribute("role", "button");
      header.setAttribute("tabindex", "0");
      header.setAttribute("aria-expanded", "false");
      header.setAttribute("aria-controls", panelId);

      var body = document.createElement("div");
      appendTextElement(body, "h3", "", member.name);
      appendTextElement(body, "p", "person-role", member.role);
      appendTextElement(body, "p", "", member.description || "Opis roli do potwierdzenia przed publikacją produkcyjną.");
      header.appendChild(body);

      var chevron = document.createElement("span");
      chevron.className = "person-card__chevron";
      chevron.setAttribute("aria-hidden", "true");
      header.appendChild(chevron);
      card.appendChild(header);

      var panel = document.createElement("div");
      panel.className = "person-card__panel";
      panel.id = panelId;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", toggleId);
      panel.setAttribute("aria-hidden", "true");
      panel.setAttribute("inert", "");

      var details = document.createElement("div");
      details.className = "person-card__details";
      if (member.photo) {
        var photo = document.createElement("img");
        photo.className = "person-card__photo";
        photo.src = member.photo;
        photo.alt = (member.name || "Osoba funkcyjna") + " - " + (member.role || "Zarząd");
        photo.loading = "lazy";
        photo.width = 320;
        photo.height = 400;
        details.appendChild(photo);
      } else {
        appendTextElement(details, "div", "person-card__photo-placeholder", "Zdjęcie do dodania po zgodzie osoby");
      }

      var cv = document.createElement("div");
      cv.className = "person-card__cv";
      if (member.cv) {
        String(member.cv).split(/\n{2,}/).forEach(function (paragraph) {
          appendTextElement(cv, "p", "", paragraph.trim());
        });
      } else {
        appendTextElement(cv, "p", "", "CV w przygotowaniu - do uzupełnienia przed publikacją.");
      }
      details.appendChild(cv);
      panel.appendChild(details);
      card.appendChild(panel);

      container.appendChild(card);
    });
    initPersonAccordions(container);
  }

  function toggleStatutoryButton(button, expanded) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;
    button.setAttribute("aria-expanded", String(expanded));
    panel.hidden = !expanded;
  }

  function initStatutoryAccordions(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll(".statutory-body-toggle")).forEach(function (button) {
      if (button.getAttribute("data-accordion-ready") === "true") return;
      button.setAttribute("data-accordion-ready", "true");
      button.addEventListener("click", function () {
        toggleStatutoryButton(button, button.getAttribute("aria-expanded") !== "true");
      });
      button.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          event.preventDefault();
          toggleStatutoryButton(button, false);
          button.focus();
        }
      });
    });
  }

  function toggleGalleryCard(header, expanded) {
    var card = header.closest(".gallery-card");
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

  function initGalleryAccordions(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll(".gallery-card__header")).forEach(function (header) {
      if (header.getAttribute("data-accordion-ready") === "true") return;
      header.setAttribute("data-accordion-ready", "true");
      toggleGalleryCard(header, header.getAttribute("aria-expanded") === "true");
      header.addEventListener("click", function () {
        toggleGalleryCard(header, header.getAttribute("aria-expanded") !== "true");
      });
      header.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " " || event.code === "Enter" || event.code === "Space" || event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          toggleGalleryCard(header, header.getAttribute("aria-expanded") !== "true");
        }
      });
    });
  }

  function toggleFourWayCard(header, expanded) {
    var card = header.closest(".four-way-card");
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

  function initFourWayAccordions(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll(".four-way-card__header")).forEach(function (header) {
      if (header.getAttribute("data-accordion-ready") === "true") return;
      header.setAttribute("data-accordion-ready", "true");
      toggleFourWayCard(header, header.getAttribute("aria-expanded") === "true");
      header.addEventListener("click", function () {
        toggleFourWayCard(header, header.getAttribute("aria-expanded") !== "true");
      });
      header.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " " || event.code === "Enter" || event.code === "Space" || event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          toggleFourWayCard(header, header.getAttribute("aria-expanded") !== "true");
        }
      });
    });
  }

  function togglePrincipleCard(header, expanded) {
    var card = header.closest(".principle-card");
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

  function initPrincipleAccordions(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll(".principle-card__header")).forEach(function (header) {
      if (header.getAttribute("data-accordion-ready") === "true") return;
      header.setAttribute("data-accordion-ready", "true");
      togglePrincipleCard(header, header.getAttribute("aria-expanded") === "true");
      header.addEventListener("click", function () {
        togglePrincipleCard(header, header.getAttribute("aria-expanded") !== "true");
      });
      header.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " " || event.code === "Enter" || event.code === "Space" || event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          togglePrincipleCard(header, header.getAttribute("aria-expanded") !== "true");
        }
      });
    });
  }

  function togglePersonCard(header, expanded) {
    var card = header.closest(".person-card");
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

  function initPersonAccordions(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll(".person-card__header")).forEach(function (header) {
      if (header.getAttribute("data-accordion-ready") === "true") return;
      header.setAttribute("data-accordion-ready", "true");
      togglePersonCard(header, header.getAttribute("aria-expanded") === "true");
      header.addEventListener("click", function () {
        togglePersonCard(header, header.getAttribute("aria-expanded") !== "true");
      });
      header.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " " || event.code === "Enter" || event.code === "Space" || event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          togglePersonCard(header, header.getAttribute("aria-expanded") !== "true");
        }
      });
    });
  }

  function toggleMemberCard(header, expanded) {
    var card = header.closest(".member-card");
    var panel = document.getElementById(header.getAttribute("aria-controls"));
    if (!card || !panel) return;
    card.setAttribute("aria-expanded", String(expanded));
    card.classList.toggle("is-open", Boolean(expanded));
    header.setAttribute("aria-expanded", String(expanded));
    panel.setAttribute("aria-hidden", String(!expanded));
    if (expanded) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
    }
  }

  function initMemberAccordions(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll(".member-card__header")).forEach(function (header) {
      if (header.getAttribute("data-accordion-ready") === "true") return;
      header.setAttribute("data-accordion-ready", "true");
      toggleMemberCard(header, header.getAttribute("aria-expanded") === "true");
      header.addEventListener("click", function () {
        toggleMemberCard(header, header.getAttribute("aria-expanded") !== "true");
      });
      header.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " " || event.code === "Enter" || event.code === "Space" || event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          toggleMemberCard(header, header.getAttribute("aria-expanded") !== "true");
        }
      });
    });
  }

  function togglePartnerAccordion(header, expanded) {
    var card = header.closest(".partner-accordion-card");
    var panel = document.getElementById(header.getAttribute("aria-controls"));
    if (!card || !panel) return;
    card.setAttribute("aria-expanded", String(expanded));
    card.classList.toggle("is-open", Boolean(expanded));
    header.setAttribute("aria-expanded", String(expanded));
    panel.setAttribute("aria-hidden", String(!expanded));
    if (expanded) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
    }
  }

  function initPartnerAccordions(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll(".partner-accordion-card__header")).forEach(function (header) {
      if (header.getAttribute("data-accordion-ready") === "true") return;
      header.setAttribute("data-accordion-ready", "true");
      togglePartnerAccordion(header, header.getAttribute("aria-expanded") === "true");
      header.addEventListener("click", function () {
        togglePartnerAccordion(header, header.getAttribute("aria-expanded") !== "true");
      });
      header.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " " || event.code === "Enter" || event.code === "Space" || event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          togglePartnerAccordion(header, header.getAttribute("aria-expanded") !== "true");
        }
      });
    });
  }

  function toggleDisclosure(button, expanded) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;
    button.setAttribute("aria-expanded", String(expanded));
    panel.hidden = !expanded;
    panel.setAttribute("aria-hidden", String(!expanded));
    if (expanded) {
      panel.removeAttribute("inert");
      panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else {
      panel.setAttribute("inert", "");
    }
  }

  function initDisclosures(scope) {
    var root = scope || document;
    Array.prototype.slice.call(root.querySelectorAll("[data-disclosure-toggle]")).forEach(function (button) {
      if (button.getAttribute("data-disclosure-ready") === "true") return;
      button.setAttribute("data-disclosure-ready", "true");
      toggleDisclosure(button, button.getAttribute("aria-expanded") === "true");
      button.addEventListener("click", function () {
        toggleDisclosure(button, button.getAttribute("aria-expanded") !== "true");
      });
    });
  }

  function meetingTypeLabel(type) {
    var normalized = String(type || "").toLowerCase();
    if (normalized === "event") return "wydarzenie";
    if (normalized === "milestone") return "kamień milowy";
    if (normalized === "proposal") return "do uzupełnienia";
    if (normalized === "lecture") return "prelekcja";
    if (normalized === "project") return "projekt";
    if (normalized === "media") return "media";
    return "spotkanie";
  }

  function meetingStatusClass(status) {
    var normalized = String(status || "").toLowerCase();
    if (normalized === "draft") return "is-draft";
    if (normalized === "review") return "is-review";
    if (normalized === "open" || normalized === "missing-data") return "is-open";
    if (normalized === "approved" || normalized === "published") return "is-approved";
    return "is-draft";
  }

  function meetingStatusLabel(status) {
    var normalized = String(status || "").toLowerCase();
    if (normalized === "approved") return "zatwierdzone";
    if (normalized === "published") return "opublikowane";
    if (normalized === "open" || normalized === "missing-data") return "do uzupełnienia";
    return "do zatwierdzenia / robocze";
  }

  function appendMeetingDate(card, date, meetingTime) {
    if (date) {
      var timeElement = document.createElement("time");
      timeElement.setAttribute("datetime", date);
      safeText(timeElement, date + (meetingTime ? ", " + meetingTime : ""));
      card.appendChild(timeElement);
      return;
    }
    appendTextElement(card, "span", "meeting-date", "Data do potwierdzenia");
  }

  function meetingGroupRank(item) {
    var group = String(item && item.calendarGroup || "").toLowerCase();
    if (group === "upcoming") return 0;
    if (group === "archive") return 1;
    if (group === "missing") return 2;
    if (!item || !item.date) return 2;
    return Date.parse(item.date) >= Date.now() ? 0 : 1;
  }

  function compareMeetings(a, b) {
    var groupDiff = meetingGroupRank(a) - meetingGroupRank(b);
    if (groupDiff) return groupDiff;

    var group = meetingGroupRank(a);
    var dateA = a && a.date ? Date.parse(a.date) : 0;
    var dateB = b && b.date ? Date.parse(b.date) : 0;
    if (group === 0) return dateA - dateB;
    if (group === 1) return dateB - dateA;
    return String(a && a.title || "").localeCompare(String(b && b.title || ""), "pl");
  }

  function isExternalUrl(url) {
    return /^https?:\/\//i.test(String(url || ""));
  }

  function appendMeetingSource(card, item) {
    if (!item.sourceUrl) return;
    var source = appendTextElement(card, "a", "meeting-card__source", item.sourceName || "Źródło");
    source.setAttribute("href", item.sourceUrl);
    if (isExternalUrl(item.sourceUrl)) {
      source.setAttribute("target", "_blank");
      source.setAttribute("rel", "noopener noreferrer");
    }
  }

  function renderMeetings(data) {
    var container = document.querySelector('[data-render="meetings"]');
    if (!container || !data || !Array.isArray(data.items) || !data.items.length) return;

    clearElement(container);
    var filter = container.getAttribute("data-active-filter") || "all";
    var items = data.items.slice().sort(compareMeetings).filter(function (item) {
      return filter === "all" || String(item.type || "").toLowerCase() === filter;
    });

    if (!items.length) {
      appendTextElement(container, "p", "meetings-empty", "Brak wpisów dla wybranego filtra.");
      return;
    }

    items.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "meeting-card";
      if (item.type === "proposal") card.className += " meeting-card--missing";

      var meta = document.createElement("div");
      meta.className = "meeting-card__meta";
      appendTextElement(meta, "span", "meeting-card__type", meetingTypeLabel(item.type));
      appendTextElement(meta, "span", "meeting-card__status " + meetingStatusClass(item.status), item.approvalStatus || meetingStatusLabel(item.status));
      card.appendChild(meta);

      appendMeetingDate(card, item.date, item.time);
      appendTextElement(card, "h3", "", item.title);
      if (item.speaker) appendTextElement(card, "p", "meeting-speaker", "Prelegent: " + item.speaker);
      appendTextElement(card, "p", "meeting-location", item.location || "Miejsce do potwierdzenia");
      appendTextElement(card, "p", "", item.summary);
      if (item.imageConsentStatus) {
        appendTextElement(card, "p", "meeting-card__consent", "Zgody zdjęciowe: " + item.imageConsentStatus);
      }

      appendMeetingSource(card, item);

      container.appendChild(card);
    });
  }

  var meetingsDataCache = null;

  function setMeetingsFilter(filter) {
    var container = document.querySelector('[data-render="meetings"]');
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-meetings-filter]"));
    var normalized = filter || "all";

    buttons.forEach(function (button) {
      var active = button.getAttribute("data-meetings-filter") === normalized;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (container) container.setAttribute("data-active-filter", normalized);
    if (meetingsDataCache) renderMeetings(meetingsDataCache);
  }

  function initMeetingsFilters() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-meetings-filter]"));
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      if (button.getAttribute("data-filter-ready") === "true") return;
      button.setAttribute("data-filter-ready", "true");
      button.addEventListener("click", function () {
        setMeetingsFilter(button.getAttribute("data-meetings-filter") || "all");
      });
    });
  }

  function loadMeetingsData() {
    if (!window.fetch) return Promise.resolve(null);

    return fetch("assets/data/meetings.json?v=" + DATA_VERSION)
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        meetingsDataCache = data;
        renderMeetings(data);
        return data;
      })
      .catch(function (error) {
        console.warn("Nie załadowano assets/data/meetings.json. Używam statycznego fallbacku HTML.", error);
        return null;
      });
  }

  function renderSiteData(data) {
    renderSocialLinks(data.social);
    renderRotaryForPlanet(data.rotaryForPlanet);
    renderStatutoryBodies(data.statutoryBodies);
    renderBoardMembers(data.statutoryBodies);
    renderDocuments(data.documents);
    renderPlantings(data.plantingsDemo);
    renderMediaDemo(data.mediaDemo);
    if (data.payment) {
      renderList('[data-render="payment-methods"]', data.payment.methods);
    }
  }

  function loadSiteData() {
    if (!window.fetch) return Promise.resolve(null);

    return fetch("assets/data/site.json?v=" + DATA_VERSION)
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        renderSiteData(data);
        enhanceDocumentDownloads(document);
        return data;
      })
      .catch(function (error) {
        console.warn("Nie załadowano assets/data/site.json. Używam statycznego fallbacku HTML.", error);
        hardenStaticPlaceholderLinks();
        enhanceDocumentDownloads(document);
        return null;
      });
  }

  window.loadSiteData = loadSiteData;
  window.loadMeetingsData = loadMeetingsData;
  window.filterMeetings = setMeetingsFilter;
  window.initHeroCarousel = initHeroCarousel;
  hardenStaticPlaceholderLinks();
  enhanceDocumentDownloads(document);
  initHeroCarousel(document);
  initStatutoryAccordions(document);
  initGalleryAccordions(document);
  initFourWayAccordions(document);
  initPrincipleAccordions(document);
  initPersonAccordions(document);
  initMemberAccordions(document);
  initPartnerAccordions(document);
  initDisclosures(document);
  initMeetingsFilters();
  loadSiteData();
  loadMeetingsData();
})();


/* ===== Sprint 5.5 — moduł "Wpłaty i wsparcie" (makieta, bez realnej bramki) ===== */
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-support-tab]"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-support-panel]"));
  if (tabs.length && panels.length) {
    function activate(name, focus) {
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-support-tab") === name;
        t.setAttribute("aria-selected", String(on));
        t.classList.toggle("is-active", on);
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) {
        p.hidden = p.getAttribute("data-support-panel") !== name;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { activate(t.getAttribute("data-support-tab"), false); });
      t.addEventListener("keydown", function (e) {
        var dir = e.key === "ArrowRight" ? 1 : (e.key === "ArrowLeft" ? -1 : 0);
        if (!dir) return;
        e.preventDefault();
        var next = (i + dir + tabs.length) % tabs.length;
        activate(tabs[next].getAttribute("data-support-tab"), true);
      });
    });
  }

  var tiles = Array.prototype.slice.call(document.querySelectorAll(".amount-tile"));
  var other = document.querySelector(".amount-other");
  var otherInput = document.getElementById("darowizna-inna");
  tiles.forEach(function (tile) {
    tile.addEventListener("click", function () {
      tiles.forEach(function (t) { t.setAttribute("aria-pressed", String(t === tile)); });
      var isOther = tile.getAttribute("data-amount") === "inna";
      if (other) other.hidden = !isOther;
      if (isOther && otherInput) otherInput.focus();
    });
  });

  var osoba = document.getElementById("skladka-osoba");
  var okres = document.getElementById("skladka-okres");
  var rodzaj = document.getElementById("skladka-rodzaj");
  var tytul = document.getElementById("skladka-tytul");
  function buildTitle() {
    if (!tytul) return;
    var name = (osoba && osoba.value.trim()) ? osoba.value.trim() : "imię i nazwisko";
    var per = okres ? okres.value : "miesiąc";
    var kind = rodzaj ? rodzaj.value : "Składka członkowska";
    tytul.textContent = kind + " \u2014 " + name + " \u2014 " + per;
  }
  [osoba, okres, rodzaj].forEach(function (el) {
    if (el) { el.addEventListener("input", buildTitle); el.addEventListener("change", buildTitle); }
  });
  buildTitle();

  var DEMO = "To makieta. Płatność online nie została uruchomiona. Moduł nie zapisuje danych i nie wysyła formularza. Skorzystaj z numeru konta lub poczekaj na konfigurację Przelewy24 po decyzji Zarządu.";
  Array.prototype.slice.call(document.querySelectorAll(".support-pay")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      var st = document.getElementById(btn.getAttribute("data-support-status"));
      if (st) st.textContent = DEMO;
    });
  });

  function copyText(text, statusEl) {
    function ok() { if (statusEl) { statusEl.classList.remove("is-error"); statusEl.textContent = "Skopiowano do schowka."; } }
    function fail() { if (statusEl) { statusEl.classList.add("is-error"); statusEl.textContent = "Nie udało się skopiować. Treść: " + text; } }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok).catch(fail);
    } else {
      try {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta); ok();
      } catch (e) { fail(); }
    }
  }
  Array.prototype.slice.call(document.querySelectorAll(".copy-generic")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      var val = btn.getAttribute("data-copy-value");
      if (!val) {
        var tgt = btn.getAttribute("data-copy-target");
        var el = tgt && document.getElementById(tgt);
        val = el ? el.textContent.trim() : "";
      }
      copyText(val, document.getElementById(btn.getAttribute("data-support-status")));
    });
  });

  var cel = document.getElementById("darowizna-cel");
  Array.prototype.slice.call(document.querySelectorAll("[data-support-link]")).forEach(function (link) {
    link.addEventListener("click", function () {
      var tab = document.querySelector('[data-support-tab="' + link.getAttribute("data-support-link") + '"]');
      if (tab) tab.click();
      var c = link.getAttribute("data-support-cel");
      if (c && cel) cel.value = c;
    });
  });
})();

/* ===== Sprint v1.4 — privacy notice ===== */
(function () {
  var notice = document.querySelector("[data-privacy-notice]");
  var accept = document.querySelector("[data-privacy-accept]");
  var storageKey = "rcSilesiaPrivacyNoticeAccepted";
  var maxAge = 30 * 24 * 60 * 60 * 1000;
  if (!notice || !accept) return;

  function readState() {
    try {
      var raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function isAccepted(state) {
    return state && typeof state.expiresAt === "number" && state.expiresAt > Date.now();
  }

  if (isAccepted(readState())) {
    notice.hidden = true;
    return;
  }

  notice.hidden = false;

  accept.addEventListener("click", function () {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        acceptedAt: new Date().toISOString(),
        expiresAt: Date.now() + maxAge
      }));
    } catch (error) {
      // Brak localStorage nie blokuje zamknięcia panelu.
    }
    notice.hidden = true;
  });
})();
