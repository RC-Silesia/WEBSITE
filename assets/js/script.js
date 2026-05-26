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
    tiles.forEach(function (x) { x.classList.remove("is-source"); });
    t.classList.add("is-source");
    local.classList.remove("flash");
    void local.offsetWidth;
    local.classList.add("flash");
  }

  tiles.forEach(function (t, i) {
    t.addEventListener("mouseenter", function () { apply(i); });
    t.addEventListener("focusin", function () { apply(i); });
    t.addEventListener("click", function () { apply(i); });
  });
  grid.addEventListener("mouseleave", function () { apply(def); });

  apply(def);
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

  var DEMO = "To makieta. Płatność online nie została uruchomiona. Skorzystaj z numeru konta lub poczekaj na wybór operatora płatności.";
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
