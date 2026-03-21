# CLAUDE.md — lucalombardo.dev

## Project overview
Personal portfolio website for Luca Lombardo, web developer & IT system administrator based in Brescia, Italy. Hosted on GitHub Pages at `lucalombardo.dev`. The site's purpose is to sell web development services — visual impact matters.

## Tech stack
- Vanilla HTML / CSS / JavaScript (zero dependencies)
- No build tools, no frameworks
- Google Fonts: Syne (display) + DM Mono (mono)
- Hosted via GitHub Pages (CNAME file)

## File structure
- `index.html` — single-page site (hero, about, services, process, stack, projects, contact, footer)
- `style.css` — all styles, indigo palette, responsive breakpoints at 1060/900/680/420px, CSS 3D transforms, `@property` for animated gradients
- `script.js` — nav scroll blur, burger menu, smooth scroll, IntersectionObserver reveals, counter animation, spotlight, cursor glow, card tilt, hero text split, magnetic buttons, particle constellation (canvas), 3D floating geometry, morphing blob (canvas), project card parallax, section dividers, hero parallax
- `favicon.svg` — site icon

## Code conventions
- CSS custom properties in `:root` for theming (--bg, --accent, --font-display, etc.)
- BEM-like class naming: `.block__element--modifier`
- JS uses `var` and function expressions (no ES6 modules, no arrow functions)
- Comments in Italian for internal notes, English for code
- CSS sections separated by comment headers (`/* ── SECTION ── */`)
- JS sections numbered with comment blocks (`/* 1. SECTION NAME — description */`)

## Responsive breakpoints
- `≤1060px` — hero stacks vertically, code block + 3D geometry hidden
- `≤900px` — single-column grids
- `≤680px` — mobile nav (hamburger), adjusted padding
- `≤420px` — 2-col stack grid, hide stat dividers

## Key behaviors
- Nav blur on scroll (`.scrolled` class), menu-open removes backdrop-filter
- Burger menu locks body scroll (`overflow: hidden`)
- Scroll reveal animations via IntersectionObserver (`.reveal` + `.visible`)
- Hero spotlight follows cursor (desktop only, lerp smoothing)
- Card 3D tilt on hover (desktop ≥901px with precise pointer)
- Hero text split animation (character-by-character stagger)
- Magnetic buttons (CTA attract toward cursor on hover)
- Particle constellation canvas in hero (interactive, cursor attracts particles)
- 3D floating geometry (wireframe cube, ring, octahedron) around hero code block
- Rotating gradient borders on service/project cards (`@property --border-angle`)
- Shimmer effect on hero code block
- Animated gradient section titles (paused until visible)
- Floating stack icons (staggered wave animation)
- Project card preview parallax (mockup follows cursor)
- Morphing blob canvas behind services section
- Section dividers drawn on scroll
- Hero parallax (grid + content at different speeds)
- Reduced-motion support (`prefers-reduced-motion: reduce`)
- Mouse effects gated behind `pointer: fine` / `hasMouse` check
