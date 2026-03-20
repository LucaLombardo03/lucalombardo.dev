/* ============================================================
   LUCA LOMBARDO — PORTFOLIO  v3
   script.js
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   UTILITY — aspetta che il DOM sia pronto
   ───────────────────────────────────────────────────────────── */
function ready(fn) {
  if (document.readyState !== 'loading') { fn(); }
  else { document.addEventListener('DOMContentLoaded', fn); }
}

ready(function () {

  /* ───────────────────────────────────────────────────────────
     0. HERO TEXT SPLIT — animazione carattere per carattere
     ───────────────────────────────────────────────────────── */
  var heroName = document.querySelector('.hero__name');
  if (heroName) {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var nodes = Array.prototype.slice.call(heroName.childNodes);
    heroName.innerHTML = '';
    nodes.forEach(function (node) {
      if (node.nodeType === 3) { // text
        node.textContent.split('').forEach(function (ch) {
          var span = document.createElement('span');
          span.className = 'char';
          span.textContent = ch === ' ' ? '\u00A0' : ch;
          if (reducedMotion) span.classList.add('visible');
          heroName.appendChild(span);
        });
      } else if (node.nodeName === 'BR') {
        heroName.appendChild(document.createElement('br'));
      }
    });
    if (!reducedMotion) {
      var chars = heroName.querySelectorAll('.char');
      chars.forEach(function (ch, i) {
        setTimeout(function () { ch.classList.add('visible'); }, 200 + i * 40);
      });
    }
  }

  /* ───────────────────────────────────────────────────────────
     1. NAV — blur quando si scrolla
     ───────────────────────────────────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ───────────────────────────────────────────────────────────
     2. NAV — burger menu mobile
     ───────────────────────────────────────────────────────── */
  var burger   = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (nav) nav.classList.toggle('menu-open', open);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (nav) nav.classList.remove('menu-open');
      });
    });
  }

  /* ───────────────────────────────────────────────────────────
     3. NAV — smooth scroll con offset per navbar fixed
     ───────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href   = anchor.getAttribute('href');
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var offset = nav ? nav.offsetHeight + 8 : 78;
      var top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ───────────────────────────────────────────────────────────
     4. NAV — active link highlight on scroll
     ───────────────────────────────────────────────────────── */
  var sections   = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { threshold: 0.35 });

    sections.forEach(function (s) { activeObserver.observe(s); });
  }

  /* ───────────────────────────────────────────────────────────
     5. SCROLL REVEAL — fade-in + translateY con IntersectionObserver
     Gli elementi ricevono .reveal dal JS (non dall'HTML),
     così senza JS sono tutti visibili normalmente.
     ───────────────────────────────────────────────────────── */
  var revealTargets = [
    { sel: '.section__label',    stagger: false, extra: 'label-reveal' },
    { sel: '.section__title',    stagger: false, extra: '' },
    { sel: '.about__left',       stagger: false, extra: '' },
    { sel: '.about__text',       stagger: true,  extra: '' },
    { sel: '.about__tags',       stagger: false, extra: '' },
    { sel: '.about__email-btn',  stagger: false, extra: '' },
    { sel: '.card--service',     stagger: true,  extra: '' },
    { sel: '.card--project',     stagger: true,  extra: '' },
    { sel: '.stack__item',       stagger: true,  extra: '' },
    { sel: '.contact__subtitle', stagger: false, extra: '' },
    { sel: '.contact__link',     stagger: true,  extra: '' },
  ];

  // Raggruppa elementi per parent così lo stagger è per-riga
  revealTargets.forEach(function (cfg) {
    var groups = new Map();
    document.querySelectorAll(cfg.sel).forEach(function (el) {
      var p = el.parentElement;
      if (!groups.has(p)) groups.set(p, []);
      groups.get(p).push(el);
    });
    groups.forEach(function (children) {
      children.forEach(function (el, i) {
        el.classList.add('reveal');
        if (cfg.extra) el.classList.add(cfg.extra);
        if (cfg.stagger && i > 0) {
          el.classList.add('reveal-delay-' + Math.min(i, 5));
        }
      });
    });
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ───────────────────────────────────────────────────────────
     6. HERO STATS — counter animato easeOutCubic
     ───────────────────────────────────────────────────────── */
  function animateCounter(el) {
    var original = el.textContent.trim();
    var num      = parseInt(original.replace(/\D/g, ''), 10);
    var prefix   = original.match(/^[^0-9]*/)[0] || '';
    var suffix   = original.replace(/^[^0-9]*\d+/, '');

    if (isNaN(num) || num === 0) {
      el.classList.add('popped');
      return;
    }

    var dur   = 950;
    var t0    = performance.now();

    function ease(t) { return 1 - Math.pow(1 - t, 3); }

    function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      el.textContent = prefix + Math.round(ease(p) * num) + suffix;
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = original;
        el.classList.add('popped');
      }
    }
    requestAnimationFrame(tick);
  }

  var heroStats = document.querySelector('.hero__stats');
  if (heroStats) {
    var statsDone = false;
    new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || statsDone) return;
      statsDone = true;
      setTimeout(function () {
        document.querySelectorAll('.hero__stat-num').forEach(function (el, i) {
          setTimeout(function () { animateCounter(el); }, i * 160);
        });
      }, 350);
    }, { threshold: 0.6 }).observe(heroStats);
  }

  /* ───────────────────────────────────────────────────────────
     7. HERO SPOTLIGHT — segue il cursore, usa window mousemove
     Non dipende da pointer:fine (evita falsi negativi su localhost)
     ───────────────────────────────────────────────────────── */
  var heroSection = document.getElementById('hero');
  var spotlight   = document.getElementById('heroSpotlight');

  if (heroSection && spotlight) {
    var slrp = function (a, b, t) { return a + (b - a) * t; };
    var hw = 350; // metà larghezza spotlight (700px / 2)
    var hh = 350; // metà altezza spotlight

    var smouse     = { x: 0, y: 0 };
    var spos       = { x: 0, y: 0 };
    var sraf       = null;
    var insideHero = false;

    // Centra lo spotlight (posizione di riposo)
    function spotlightCenter() {
      var r    = heroSection.getBoundingClientRect();
      smouse.x = spos.x = r.width  / 2;
      smouse.y = spos.y = r.height / 2;
      spotlight.style.transform = 'translate(' + (spos.x - hw) + 'px,' + (spos.y - hh) + 'px)';
    }

    // Muove lo spotlight verso il target con lerp
    function spotlightLoop() {
      spos.x = slrp(spos.x, smouse.x, 0.06);
      spos.y = slrp(spos.y, smouse.y, 0.06);
      spotlight.style.transform = 'translate(' + (spos.x - hw) + 'px,' + (spos.y - hh) + 'px)';
      sraf = requestAnimationFrame(spotlightLoop);
    }

    // Inizializza al centro subito
    spotlightCenter();

    // Ascolta mousemove sull'intera finestra — più affidabile di mouseenter
    window.addEventListener('mousemove', function (e) {
      var r = heroSection.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;

      // Dentro la hero?
      var inside = (x >= 0 && x <= r.width && y >= 0 && y <= r.height);

      if (inside) {
        smouse.x = x;
        smouse.y = y;

        if (!insideHero) {
          // Prima volta che entra: salta subito alla posizione reale
          insideHero = true;
          spos.x = x;
          spos.y = y;
          spotlight.style.transform = 'translate(' + (x - hw) + 'px,' + (y - hh) + 'px)';
          spotlight.classList.add('active');
          if (!sraf) spotlightLoop();
        }
      } else {
        if (insideHero) {
          insideHero = false;
          spotlight.classList.remove('active');
          setTimeout(function () {
            if (!insideHero) {
              cancelAnimationFrame(sraf);
              sraf = null;
              spotlightCenter();
            }
          }, 650);
        }
      }
    }, { passive: true });
  }

  var hasMouse = window.matchMedia('(pointer: fine)').matches;

  if (hasMouse) {

    /* ─────────────────────────────────────────────────────────
       8. CURSOR GLOW GLOBALE — più sottile, si nasconde nella hero
       ───────────────────────────────────────────────────────── */
    var cursorGlow = document.createElement('div');
    cursorGlow.setAttribute('aria-hidden', 'true');
    cursorGlow.style.cssText = [
      'position:fixed',
      'width:280px',
      'height:280px',
      'border-radius:50%',
      'background:radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 70%)',
      'pointer-events:none',
      'z-index:9998',
      'transform:translate(-50%,-50%)',
      'will-change:left,top',
      'transition:opacity 0.35s ease',
      'opacity:0',
    ].join(';');
    document.body.appendChild(cursorGlow);

    var cgMouse  = { x: 0, y: 0 };
    var cgPos    = { x: 0, y: 0 };
    var cgLerp   = function (a, b, t) { return a + (b - a) * t; };

    document.addEventListener('mousemove', function (e) {
      cgMouse.x = e.clientX;
      cgMouse.y = e.clientY;
      // nella hero lo spotlight è sufficiente — nascondi il glow globale
      var inHero = heroSection && heroSection.matches(':hover');
      cursorGlow.style.opacity = inHero ? '0' : '1';
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      cursorGlow.style.opacity = '0';
    });

    (function cgLoop() {
      cgPos.x = cgLerp(cgPos.x, cgMouse.x, 0.075);
      cgPos.y = cgLerp(cgPos.y, cgMouse.y, 0.075);
      cursorGlow.style.left = cgPos.x + 'px';
      cursorGlow.style.top  = cgPos.y + 'px';
      requestAnimationFrame(cgLoop);
    })();
  }

  /* ───────────────────────────────────────────────────────────
     9. CARD TILT 3D — solo desktop ≥ 901px con mouse preciso
     ───────────────────────────────────────────────────────── */
  if (hasMouse && window.matchMedia('(min-width: 901px)').matches) {
    document.querySelectorAll('.card--service, .card--project').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r  = card.getBoundingClientRect();
        var dx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        var dy = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        card.style.transform  = 'translateY(-6px) scale(1.025) rotateX(' + (dy * -4.5) + 'deg) rotateY(' + (dx * 4.5) + 'deg)';
        card.style.transition = 'transform 0.08s ease';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform  = '';
        card.style.transition = 'transform 0.38s cubic-bezier(0.4,0,0.2,1)';
      });
    });
  }

  /* ───────────────────────────────────────────────────────────
     10. MAGNETIC BUTTONS — i CTA si attraggono verso il cursore
     ───────────────────────────────────────────────────────── */
  if (hasMouse) {
    var magnets = document.querySelectorAll('.btn, .nav__cta, .about__email-btn');
    var magStrength = 0.22;

    magnets.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r  = el.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top  + r.height / 2;
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        el.style.transform = 'translate(' + (dx * magStrength) + 'px,' + (dy * magStrength) + 'px)';
        el.style.transition = 'transform 0.15s ease';
      }, { passive: true });

      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      });
    });
  }

  /* ───────────────────────────────────────────────────────────
     11. HERO PARALLAX — profondità con velocità diverse
     ───────────────────────────────────────────────────────── */
  var heroBgGrid  = document.querySelector('.hero__bg-grid');
  var heroContent = document.querySelector('.hero__content');
  var heroEl      = heroSection || document.getElementById('hero');

  if (heroEl && heroBgGrid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var heroVisible = true;
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(heroEl);

    window.addEventListener('scroll', function () {
      if (!heroVisible) return;
      var sy = window.scrollY;
      heroBgGrid.style.transform = 'translateY(' + (sy * 0.3) + 'px)';
      if (heroContent) heroContent.style.transform = 'translateY(' + (sy * 0.08) + 'px)';
    }, { passive: true });
  }

  /* ───────────────────────────────────────────────────────────
     12. SECTION DIVIDERS — linee che si disegnano con lo scroll
     ───────────────────────────────────────────────────────── */
  var dividers = document.querySelectorAll('.section-divider');
  if (dividers.length) {
    var dividerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('drawn');
          dividerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    dividers.forEach(function (d) { dividerObserver.observe(d); });
  }

  /* ───────────────────────────────────────────────────────────
     13. REDUCED MOTION — mostra subito tutto se l'utente
         ha disabilitato le animazioni nel sistema operativo
     ───────────────────────────────────────────────────────── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

});
