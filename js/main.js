/* =============================================================================
   SOUTHWORTH LANDSCAPE — interactions
   Lenis smooth scroll · scroll reveals · parallax · config rendering · form
   ============================================================================= */
(function () {
  "use strict";
  var CFG = window.SITE || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var EXPO = "cubic-bezier(0.16,1,0.3,1)";

  /* ---------------------------------------------------- config → markup --- */
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){
    return ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" })[c]; }); }

  // Services
  var svcGrid = $("#svcGrid");
  if (svcGrid && CFG.services) {
    svcGrid.innerHTML = CFG.services.map(function (s, i) {
      var tags = (s.tags || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
      return '<article class="svc" tabindex="0">' +
        '<div class="svc__img"><img src="' + esc(s.img) + '" alt="' + esc(s.title) + '" loading="lazy" /></div>' +
        '<div class="svc__body">' +
          '<span class="svc__num">' + String(i + 1).padStart(2, "0") + " / Service</span>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.blurb) + "</p>" +
          '<div class="svc__tags">' + tags + "</div>" +
        "</div></article>";
    }).join("");
  }

  // Work grid
  var workGrid = $("#workGrid");
  if (workGrid && CFG.work) {
    workGrid.innerHTML = CFG.work.map(function (w) {
      return '<figure class="tile' + (w.wide ? " wide" : "") + '" tabindex="0">' +
        '<img src="' + esc(w.img) + '" alt="' + esc(w.title) + '" loading="lazy" />' +
        '<figcaption class="tile__cap"><span class="t">' + esc(w.title) + "</span>" +
        '<span class="m">' + esc(w.meta || "") + "</span></figcaption></figure>";
    }).join("");
  }

  // Form service options
  var serviceSel = $("#service");
  if (serviceSel && CFG.form && CFG.form.services) {
    CFG.form.services.forEach(function (o) {
      var opt = document.createElement("option");
      opt.value = o.value; opt.textContent = o.label;
      serviceSel.appendChild(opt);
    });
  }

  // Contact + footer from config
  var c = CFG.contact || {}, soc = CFG.social || {};
  if (c.phone) {
    var pl = $("#phoneLink"), pt = $("#phoneText");
    if (pl) pl.href = c.phoneHref || ("tel:" + c.phone.replace(/[^0-9+]/g, ""));
    if (pt) pt.textContent = c.phone;
  }
  if (c.location) { var lt = $("#locText"); if (lt) lt.textContent = c.location; }

  var footContact = $("#footContact");
  if (footContact) {
    var items = [];
    if (c.phone) items.push('<li><a class="ulink" href="' + (c.phoneHref || "tel:" + c.phone.replace(/[^0-9+]/g,"")) + '">' + esc(c.phone) + "</a></li>");
    if (c.email) items.push('<li><a class="ulink" href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li>");
    if (c.serviceArea) items.push("<li>" + esc(c.serviceArea) + "</li>");
    if (soc.instagram) items.push('<li><a class="ulink" href="' + esc(soc.instagram) + '" target="_blank" rel="noopener">Instagram</a></li>');
    if (soc.facebook) items.push('<li><a class="ulink" href="' + esc(soc.facebook) + '" target="_blank" rel="noopener">Facebook</a></li>');
    footContact.innerHTML = items.join("");
  }

  var footSocial = $("#footSocial");
  if (footSocial) {
    var IG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
    var FB = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';
    var out = "";
    if (soc.instagram) out += '<a href="' + esc(soc.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + IG + "</a>";
    if (soc.facebook)  out += '<a href="' + esc(soc.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + FB + "</a>";
    footSocial.innerHTML = out;
  }
  var copy = $("#copy");
  if (copy) copy.innerHTML = "© " + new Date().getFullYear() + " " + esc((CFG.brand && CFG.brand.name) || "Southworth Landscape") + " · All rights reserved.";

  /* ------------------------------------------------------------- header --- */
  var header = $("#header");
  var onScrollHeader = function () {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScrollHeader();

  /* -------------------------------------------------------- mobile menu --- */
  var menuBtn = $("#menuBtn");
  function closeMenu() { document.body.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#nav a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* ---------------------------------------------- Lenis smooth scroll ----- */
  var lenis = null;
  if (!reduce && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    window.__lenis = lenis;
    var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on("scroll", function () { onScrollHeader(); parallax(); });
    // Anchor links routed through Lenis for a smooth, eased jump
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -70, duration: 1.2, easing: function (x){ return 1 - Math.pow(1 - x, 4); } });
      });
    });
  } else {
    window.addEventListener("scroll", function () { onScrollHeader(); parallax(); }, { passive: true });
  }

  /* ------------------------------------------------------- scroll reveal -- */
  var revealEls = $$("[data-reveal], [data-reveal-stagger] > *");
  if (reduce) {
    revealEls.forEach(function (el) { el.style.opacity = "1"; });
  } else {
    revealEls.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.willChange = "opacity, transform";
      el.style.transition = "opacity 900ms " + EXPO + ", transform 900ms " + EXPO;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target, delay = 0;
        var parent = el.parentElement;
        if (parent && parent.hasAttribute("data-reveal-stagger")) {
          delay = Array.prototype.indexOf.call(parent.children, el) * 90;
        }
        setTimeout(function () { el.style.opacity = "1"; el.style.transform = "none"; }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------ parallax -- */
  var pImg = $("[data-parallax]");
  var heroVid = $(".hero__media");
  function parallax() {
    if (reduce) return;
    var y = window.scrollY;
    if (heroVid && y < window.innerHeight) heroVid.style.transform = "translateY(" + (y * 0.15) + "px)";
    if (pImg) {
      var r = pImg.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        var prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        pImg.style.transform = "translateY(" + ((prog - 0.5) * 9) + "%)";
      }
    }
  }
  parallax();

  /* --------------------------------------------------------------- form --- */
  var form = $("#quoteForm");
  var otherWrap = $("#otherWrap");
  var otherInput = $("#otherService");
  var statusEl = $("#formStatus");

  if (serviceSel) {
    serviceSel.addEventListener("change", function () {
      var isOther = serviceSel.value === "Other";
      otherWrap.classList.toggle("show", isOther);
      if (otherInput) otherInput.required = isOther;
      if (!isOther) fieldOf(otherInput) && fieldOf(otherInput).classList.remove("invalid");
    });
  }

  function fieldOf(input) { return input ? input.closest(".field") : null; }
  function setInvalid(input, bad) { var f = fieldOf(input); if (f) f.classList.toggle("invalid", !!bad); }
  var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var rePhone = /[0-9][0-9\s().+-]{6,}/;

  function validate() {
    var ok = true;
    var name = $("#name"), phone = $("#phone"), email = $("#email");
    if (!name.value.trim()) { setInvalid(name, true); ok = false; } else setInvalid(name, false);
    if (!rePhone.test(phone.value.trim())) { setInvalid(phone, true); ok = false; } else setInvalid(phone, false);
    if (!reEmail.test(email.value.trim())) { setInvalid(email, true); ok = false; } else setInvalid(email, false);
    if (!serviceSel.value) { setInvalid(serviceSel, true); ok = false; } else setInvalid(serviceSel, false);
    if (serviceSel.value === "Other" && !otherInput.value.trim()) { setInvalid(otherInput, true); ok = false; } else setInvalid(otherInput, false);
    return ok;
  }

  // validate on blur once touched
  $$("#quoteForm input, #quoteForm select").forEach(function (el) {
    el.addEventListener("blur", function () { if (fieldOf(el).classList.contains("invalid")) validate(); });
  });

  function showStatus(kind, msg) {
    statusEl.className = "form__status show " + kind;
    statusEl.textContent = msg;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.className = "form__status";
      if (!validate()) {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid select");
        if (firstBad) firstBad.focus();
        showStatus("err", "Please complete the highlighted fields.");
        return;
      }

      var btn = $("#submitBtn"), label = btn.querySelector(".label"), original = label.textContent;
      var service = serviceSel.value === "Other" ? "Other — " + otherInput.value.trim() : serviceSel.value;
      var payload = {
        name: $("#name").value.trim(),
        phone: $("#phone").value.trim(),
        email: $("#email").value.trim(),
        service: service,
        message: $("#message").value.trim(),
      };

      var key = CFG.form && CFG.form.web3formsKey;
      var successMsg = (CFG.form && CFG.form.successMessage) || "Thank you — your request is in. We'll be in touch shortly.";

      // ---- No endpoint configured yet: graceful fallback (never lose a lead)
      if (!key) {
        var lines = [
          "New quote request",
          "Name: " + payload.name,
          "Phone: " + payload.phone,
          "Email: " + payload.email,
          "Service: " + payload.service,
          payload.message ? "Details: " + payload.message : "",
        ].filter(Boolean).join("%0D%0A");
        var mailto = c.email ? ("mailto:" + c.email + "?subject=" + encodeURIComponent("Free quote request — " + payload.name) + "&body=" + lines) : null;
        showStatus("ok", successMsg + (mailto ? "" : " (Prefer to talk now? Call " + (c.phone || "") + ".)"));
        form.reset(); otherWrap.classList.remove("show");
        if (mailto) window.location.href = mailto;
        return;
      }

      // ---- Web3Forms submission
      label.textContent = "Sending…"; btn.disabled = true;
      var body = {
        access_key: key,
        subject: "Free quote request — " + payload.name,
        from_name: "Southworth Landscape website",
        name: payload.name, phone: payload.phone, email: payload.email,
        service: payload.service, message: payload.message,
      };
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.success) {
            showStatus("ok", successMsg);
            form.reset(); otherWrap.classList.remove("show");
          } else {
            showStatus("err", "Something went wrong. Please call " + (c.phone || "us") + " and we'll take care of you.");
          }
        })
        .catch(function () {
          showStatus("err", "Network error. Please call " + (c.phone || "us") + " and we'll take care of you.");
        })
        .finally(function () { label.textContent = original; btn.disabled = false; });
    });
  }
})();
