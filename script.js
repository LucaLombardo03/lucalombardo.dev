/* ============================================================
   LUCA LOMBARDO — PORTFOLIO  v2
   script.js
   ============================================================ */

'use strict';

/* ── NAV: scroll effect ───────────────────────────────────── */
const nav = document.getElementById('nav');

function handleScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* ── NAV: mobile burger ───────────────────────────────────── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── ACTIVE NAV LINK on scroll ────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── SCROLL REVEAL ────────────────────────────────────────── */
// Elements to reveal — we add reveal class and optional stagger
const revealConfig = [
  // single elements
  { sel: '.section__label',    stagger: false },
  { sel: '.section__title',    stagger: false },
  { sel: '.about__text',       stagger: true  },
  { sel: '.about__tags',       stagger: false },
  { sel: '.about__email-btn',  stagger: false },
  { sel: '.contact__subtitle', stagger: false },
  // grid items — staggered
  { sel: '.card--service',     stagger: true  },
  { sel: '.card--project',     stagger: true  },
  { sel: '.stack__item',       stagger: true  },
  { sel: '.contact__link',     stagger: true  },
];

revealConfig.forEach(({ sel, stagger }) => {
  // Group siblings by parent so stagger is per-row
  const elements = document.querySelectorAll(sel);
  const groups   = new Map();

  elements.forEach(el => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  groups.forEach(children => {
    children.forEach((el, i) => {
      el.classList.add('reveal');
      if (stagger && i > 0) {
        el.classList.add(`reveal-delay-${Math.min(i, 5)}`);
      }
    });
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -48px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── SUBTLE CURSOR GLOW (desktop only) ───────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,189,248,0.055) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);

  let mouse = { x: 0, y: 0 };
  let pos   = { x: 0, y: 0 };
  let raf;

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateGlow() {
    pos.x = lerp(pos.x, mouse.x, 0.08);
    pos.y = lerp(pos.y, mouse.y, 0.08);
    glow.style.left = pos.x + 'px';
    glow.style.top  = pos.y + 'px';
    raf = requestAnimationFrame(animateGlow);
  }
  animateGlow();
}
