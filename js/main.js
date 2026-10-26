/* ==========================================================================
   main.js — rendering, language switch, timeline, gallery, lightbox.
   All content comes from content.js (window.SITE).
   ========================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE;
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = "ar";
  var hasRendered = false;

  /* ---------- Helpers ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function t(key) { return (SITE.i18n[lang] && SITE.i18n[lang][key]) || ""; }
  function pick(obj) { return obj ? (obj[lang] || obj.ar || "") : ""; }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function storageGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function storageSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* private mode */ } }

  /* Soft placeholder shown until a real photo is added. */
  function placeholder(path, w, h) {
    var file = String(path || "").split("/").pop();
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="xMidYMid slice">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#F7E6DE"/><stop offset=".55" stop-color="#F3E3CC"/><stop offset="1" stop-color="#EBCFC4"/>' +
      "</linearGradient></defs>" +
      '<rect width="100%" height="100%" fill="url(#g)"/>' +
      '<g fill="none" stroke="#B8925A" stroke-opacity=".45" stroke-width="1.5">' +
      '<circle cx="' + w / 2 + '" cy="' + (h / 2 - 14) + '" r="' + Math.min(w, h) * 0.16 + '"/>' +
      '<circle cx="' + w / 2 + '" cy="' + (h / 2 - 14) + '" r="' + Math.min(w, h) * 0.16 * 0.86 + '"/>' +
      "</g>" +
      '<text x="50%" y="' + (h / 2 - 14) + '" dy=".35em" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="' + Math.min(w, h) * 0.11 + '" fill="#8E6A38">M&amp;A</text>' +
      '<text x="50%" y="' + (h / 2 + Math.min(w, h) * 0.16 + 24) + '" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="' + Math.max(14, Math.min(w, h) * 0.045) + '" fill="#8E6A38" fill-opacity=".75" letter-spacing="1">' + esc(file) + "</text>" +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* Load an <img>; on failure swap in the placeholder (or remove it). */
  function loadImage(img, src, opts) {
    opts = opts || {};
    img.onerror = function () {
      img.onerror = null;
      if (opts.removeOnError) {
        var box = img.closest(opts.removeOnError);
        if (box) box.remove();
        return;
      }
      img.src = placeholder(src, opts.w || 800, opts.h || 1000);
      var holder = img.closest("[data-holder]");
      if (holder) holder.classList.add("is-placeholder");
    };
    img.src = src;
  }

  /* ---------- Icons ---------- */
  var ICONS = {
    sparkle: '<path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z"/><path d="M19 3v4M17 5h4"/>',
    heart:   '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    pact:    '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6"/><path d="M9 16.5l1.8 1.5 3.7-3.5"/>',
    book:    '<path d="M3 5.5c3-1.2 6-1 9 1 3-2 6-2.2 9-1V19c-3-1-6-.8-9 1-3-1.8-6-2-9-1z"/><path d="M12 6.5V20"/>',
    gift:    '<rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M3 7h18v3H3zM12 7v13"/><path d="M12 7C10.5 3.5 6.5 4 7.5 6.5M12 7c1.5-3.5 5.5-3 4.5-.5"/>',
    henna:   '<circle cx="12" cy="15" r="6"/><path d="M9 6.5L10.5 4h3L15 6.5 12 9.5z"/>',
    ring:    '<circle cx="12" cy="15" r="6"/><path d="M9 6.5L10.5 4h3L15 6.5 12 9.5z"/>',
    quill:   '<path d="M20 4C13 5 8.5 9.5 6.5 16.5L5 20l3.5-1.5C15.5 16.5 19 11 20 4z"/><path d="M8.5 15.5L15 9"/>',
    moon:    '<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z"/><path d="M17 3.5l.6 1.4 1.4.6-1.4.6L17 7.5l-.6-1.4-1.4-.6 1.4-.6z"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.heart) + "</svg>";
  }
  var CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>';
  var CRESCENT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 17.5A7.5 7.5 0 1 1 11 4.5a6 6 0 0 0 6 13z"/></svg>';

  /* Title with any trailing emoji kept outside the gold-gradient text. */
  var EMOJI_TAIL = /\s*((?:\p{Extended_Pictographic}|️|‍)+)\s*$/u;
  function titleHTML(obj) {
    var text = pick(obj);
    var m = text.match(EMOJI_TAIL);
    if (!m) return '<span class="grad">' + esc(text) + "</span>";
    return '<span class="grad">' + esc(text.slice(0, m.index)) + '</span> <span class="emoji">' + m[1] + "</span>";
  }

  /* ---------- Timeline ---------- */
  function datesHTML(item) {
    if (!item.greg) return "";
    return '<ul class="tl-dates">' +
      "<li>" + CAL + "<span>" + esc(pick(item.greg)) + "</span></li>" +
      '<li class="hijri">' + CRESCENT + "<span>" + esc(pick(item.hijri)) + "</span></li>" +
      "</ul>";
  }

  function renderTimeline() {
    var list = $("#timelineList");
    var html = "";
    var step = 0;

    SITE.timeline.forEach(function (item) {
      if (item.featured) {
        var photos = SITE.photos.engagement || [];
        html +=
          '<li class="tl-item tl-item--featured" id="engagement-day">' +
            '<span class="tl-node">' + icon(item.icon) + "</span>" +
            '<article class="tl-card tl-card--featured">' +
              '<div class="tl-card__body">' +
                '<span class="tl-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>' + esc(t("story.featuredBadge")) + "</span>" +
                '<p class="tl-card__day">' + esc(pick(item.day)) + "</p>" +
                '<h3 class="tl-card__title">' + titleHTML(item.title) + "</h3>" +
                datesHTML(item) +
                '<p class="tl-card__text">' + esc(pick(item.text)) + "</p>" +
              "</div>" +
              (photos.length ? '<div class="collage">' + photos.slice(0, 3).map(function (src, i) {
                return '<button type="button" class="collage__item" data-holder data-collage="' + i + '" aria-label="' + esc(t("gallery.open")) + '">' +
                  '<img data-src="' + esc(src) + '" alt="" loading="lazy" decoding="async"></button>';
              }).join("") + "</div>" : "") +
              '<div class="confetti" aria-hidden="true"></div>' +
            "</article>" +
          "</li>" +
          '<li class="tl-marker">' +
            '<span class="tl-marker__dot" aria-hidden="true"></span>' +
            '<span class="tl-marker__pill">' + esc(t("story.here")) + "</span>" +
            '<span class="tl-marker__ahead">' + esc(t("story.ahead")) + "</span>" +
          "</li>";
        return;
      }

      if (item.future) {
        html +=
          '<li class="tl-item tl-item--future">' +
            '<span class="tl-node">' + icon(item.icon) + "</span>" +
            '<article class="tl-card tl-card--future">' +
              '<span class="soon"><span>' + esc(pick(item.when)) + '</span><span class="soon__dots" aria-hidden="true"><i></i><i></i><i></i></span></span>' +
              '<span class="sr-only">' + esc(t("story.soonA11y")) + "</span>" +
              '<h3 class="tl-card__title">' + esc(pick(item.title)) + "</h3>" +
              (item.subtitle ? '<p class="tl-card__subtitle">' + esc(pick(item.subtitle)) + "</p>" : "") +
              '<p class="tl-card__text">' + esc(pick(item.text)) + "</p>" +
              '<div class="skeleton" aria-hidden="true"><span></span><span></span><span></span></div>' +
            "</article>" +
          "</li>";
        return;
      }

      step += 1;
      html +=
        '<li class="tl-item">' +
          '<span class="tl-node">' + icon(item.icon) + "</span>" +
          '<article class="tl-card">' +
            '<span class="tl-card__num" aria-hidden="true">' + (step < 10 ? "0" : "") + step + "</span>" +
            '<p class="tl-card__day">' + esc(pick(item.day)) + "</p>" +
            '<h3 class="tl-card__title">' + esc(pick(item.title)) + "</h3>" +
            datesHTML(item) +
            '<p class="tl-card__text">' + esc(pick(item.text)) + "</p>" +
            (item.photo ? '<figure class="tl-card__photo"><img data-src="' + esc(item.photo) + '" data-remove-on-error alt="" loading="lazy" decoding="async"></figure>' : "") +
          "</article>" +
        "</li>";
    });

    list.innerHTML = html;

    $$("img[data-src]", list).forEach(function (img) {
      var src = img.getAttribute("data-src");
      if (img.hasAttribute("data-remove-on-error")) loadImage(img, src, { removeOnError: ".tl-card__photo" });
      else loadImage(img, src, { w: 800, h: 800 });
    });

    $$(".collage__item", list).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var items = (SITE.photos.engagement || []).slice(0, 3).map(function (src) {
          return { src: src, caption: SITE.timeline.filter(function (x) { return x.featured; })[0].title };
        });
        openLightbox(items, +btn.getAttribute("data-collage"), btn);
      });
    });
  }

  /* ---------- Gallery ---------- */
  function renderGallery() {
    var grid = $("#galleryGrid");
    var items = SITE.photos.gallery || [];
    grid.innerHTML = items.map(function (p, i) {
      var shape = p.shape === "tall" || p.shape === "wide" ? " g-item--" + p.shape : "";
      var cap = pick(p.caption);
      return '<button type="button" class="g-item' + shape + '" data-holder data-index="' + i + '" aria-label="' + esc(t("gallery.open") + (cap ? " — " + cap : "")) + '">' +
        '<img data-src="' + esc(p.src) + '" alt="' + esc(cap) + '" loading="lazy" decoding="async">' +
        (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") +
        "</button>";
    }).join("");

    $$(".g-item", grid).forEach(function (btn) {
      var img = $("img", btn);
      var shape = (items[+btn.getAttribute("data-index")] || {}).shape;
      var dims = shape === "tall" ? [600, 900] : shape === "wide" ? [900, 450] : [700, 700];
      loadImage(img, img.getAttribute("data-src"), { w: dims[0], h: dims[1] });
      btn.addEventListener("click", function () {
        openLightbox(items, +btn.getAttribute("data-index"), btn);
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox");
  var lbImg = $("#lightboxImg");
  var lbCap = $("#lightboxCaption");
  var lbItems = [];
  var lbIndex = 0;
  var lbOpener = null;

  function showSlide(i) {
    if (!lbItems.length) return;
    lbIndex = (i + lbItems.length) % lbItems.length;
    var item = lbItems[lbIndex];
    var cap = pick(item.caption);
    lbImg.onerror = function () { lbImg.onerror = null; lbImg.src = placeholder(item.src, 900, 1100); };
    lbImg.src = item.src;
    lbImg.alt = cap;
    lbCap.textContent = cap;
    var multi = lbItems.length > 1;
    $(".lightbox__prev", lb).hidden = !multi;
    $(".lightbox__next", lb).hidden = !multi;
  }

  function openLightbox(items, index, opener) {
    lbItems = items;
    lbOpener = opener || null;
    showSlide(index);
    if (typeof lb.showModal === "function") lb.showModal();
    else lb.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (lb.open && typeof lb.close === "function") lb.close();
    else lb.removeAttribute("open");
  }

  lb.addEventListener("close", function () {
    document.body.style.overflow = "";
    if (lbOpener) lbOpener.focus();
  });

  lb.addEventListener("click", function (e) {
    var action = e.target.closest("[data-lb]");
    if (action) {
      var a = action.getAttribute("data-lb");
      if (a === "close") closeLightbox();
      if (a === "prev") showSlide(lbIndex - 1);
      if (a === "next") showSlide(lbIndex + 1);
      return;
    }
    // click on the dark backdrop closes
    if (e.target === lb || e.target.classList.contains("lightbox__figure")) closeLightbox();
  });

  lb.addEventListener("keydown", function (e) {
    var rtl = root.dir === "rtl";
    if (e.key === "ArrowRight") showSlide(lbIndex + (rtl ? -1 : 1));
    if (e.key === "ArrowLeft")  showSlide(lbIndex + (rtl ? 1 : -1));
  });

  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) < 45 || lbItems.length < 2) return;
    var forward = dx < 0;
    if (root.dir === "rtl") forward = !forward;
    showSlide(lbIndex + (forward ? 1 : -1));
  });

  /* ---------- Static text (data-i18n) ---------- */
  function applyStaticText() {
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    $$("[data-i18n-alt]").forEach(function (el) { el.setAttribute("alt", t(el.getAttribute("data-i18n-alt"))); });
    document.title = t("meta.title");
  }

  /* ---------- Language ---------- */
  function setLang(next, animate) {
    var apply = function () {
      lang = next;
      root.lang = next;
      root.dir = next === "ar" ? "rtl" : "ltr";
      applyStaticText();
      renderTimeline();
      renderGallery();
      observeReveals(hasRendered);
      hasRendered = true;
      measureTimeline();
      storageSet("lang", next);
      document.body.classList.remove("is-switching");
    };
    if (animate && !reduceMotion) {
      document.body.classList.add("is-switching");
      setTimeout(apply, 260);
    } else {
      apply();
    }
  }

  $("#langToggle").addEventListener("click", function () {
    setLang(lang === "ar" ? "en" : "ar", true);
  });

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
      if (entry.target.classList.contains("tl-item--featured")) celebrate(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }) : null;

  function observeReveals(instant) {
    var els = $$(".reveal:not(.is-visible), .tl-item, .tl-marker, .g-item");
    els.forEach(function (el) {
      // After a language switch, show everything already scrolled past immediately.
      if (!revealObserver || (instant && el.getBoundingClientRect().top < window.innerHeight)) {
        el.classList.add("is-visible");
        return;
      }
      revealObserver.observe(el);
    });
  }

  /* ---------- Confetti on engagement day ---------- */
  var celebrated = false;
  function celebrate(li) {
    if (celebrated || reduceMotion) return;
    celebrated = true;
    var box = $(".confetti", li);
    if (!box) return;
    var colors = ["#D9BA80", "#E8C3BA", "#F7E9CC", "#B97A78", "#C9A462", "#FFFFFF"];
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 42; i++) {
      var p = document.createElement("i");
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
      p.style.setProperty("--dy", (260 + Math.random() * 320) + "px");
      p.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
      p.style.animationDelay = (Math.random() * 0.6) + "s";
      if (i % 3 === 0) p.style.borderRadius = "50%";
      frag.appendChild(p);
    }
    box.appendChild(frag);
    setTimeout(function () { box.innerHTML = ""; }, 3600);
  }

  /* ---------- Timeline rail progress ---------- */
  var timeline = $("#timeline");
  var rail = $(".timeline__rail");
  var fill = $(".timeline__fill");
  var futureStart = 0;

  function measureTimeline() {
    var marker = $(".tl-marker");
    if (!marker || !rail) return;
    var railTop = rail.getBoundingClientRect().top;
    var mRect = marker.getBoundingClientRect();
    futureStart = Math.max(0, mRect.top + mRect.height / 2 - railTop);
    rail.style.setProperty("--fs", futureStart + "px");
    updateRail();
  }

  function updateRail() {
    if (!rail) return;
    var top = rail.getBoundingClientRect().top;
    var reach = window.innerHeight * 0.62 - top;
    var h = reduceMotion ? futureStart : Math.min(Math.max(reach, 0), futureStart);
    fill.style.height = h + "px";
  }

  /* ---------- Scroll handling ---------- */
  var topbar = $("#topbar");
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      topbar.classList.toggle("is-scrolled", window.scrollY > 24);
      updateRail();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measureTimeline, 150);
  });

  /* ---------- Day counters ---------- */
  function daysSince(iso) {
    var parts = iso.split("-");
    var start = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.max(0, Math.round((today - start) / 86400000));
  }

  function initCounters() {
    $$("[data-count-from]").forEach(function (el) {
      var target = daysSince(SITE.dates[el.getAttribute("data-count-from")]);
      el.textContent = reduceMotion ? target : "0";
      el.setAttribute("data-target", target);
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      $$("[data-target]").forEach(function (el) { el.textContent = el.getAttribute("data-target"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target;
        var target = +el.getAttribute("data-target");
        var t0 = performance.now();
        var dur = 1400;
        (function tick(now) {
          var k = Math.min(1, (now - t0) / dur);
          var eased = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(target * eased);
          if (k < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    $$("[data-target]").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Film ---------- */
  function initFilm() {
    var cfg = SITE.photos.video;
    var section = $("#film");
    var link = $("[data-video-link]");
    if (!cfg || !cfg.src) { if (link) link.hidden = true; return; }

    // Section and nav link stay hidden until the video actually loads.
    var video = $("#filmVideo");
    if (link) link.hidden = true;
    video.addEventListener("loadedmetadata", function () {
      section.hidden = false;
      if (link) link.hidden = false;
      observeReveals(false);
      measureTimeline();
    });

    if (cfg.poster) {
      var probe = new Image();
      probe.onload = function () { video.poster = cfg.poster; };
      probe.src = cfg.poster;
    }
    video.src = cfg.src;
  }

  /* ---------- Opening veil ---------- */
  function liftVeil() {
    var veil = $("#veil");
    if (!veil) return;
    veil.classList.add("is-gone");
    setTimeout(function () { veil.remove(); }, 1000);
  }

  /* ---------- Init ---------- */
  var urlLang = (location.search.match(/[?&]lang=(ar|en)/) || [])[1];
  var initial = urlLang || storageGet("lang") || "ar";

  loadImage($("#heroImg"), SITE.photos.hero, { w: 900, h: 1200 });
  setLang(initial, false);
  initCounters();
  initFilm();
  onScroll();

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureTimeline);
  window.addEventListener("load", measureTimeline);

  setTimeout(liftVeil, reduceMotion ? 0 : 1100);
})();
