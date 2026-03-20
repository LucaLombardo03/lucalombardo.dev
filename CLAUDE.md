# CLAUDE.md — lucalombardo.dev

## Project overview
Personal portfolio website for Luca Lombardo, web developer & IT system administrator based in Brescia, Italy. Hosted on GitHub Pages at `lucalombardo.dev`.

## Tech stack
- Vanilla HTML / CSS / JavaScript (zero dependencies)
- No build tools, no frameworks
- Google Fonts: Syne (display) + DM Mono (mono)
- Hosted via GitHub Pages (CNAME file)

## File structure
- `index.html` — single-page site (hero, about, services, process, stack, projects, contact, footer)
- `style.css` — all styles, indigo palette, responsive breakpoints at 1060/900/680/420px
- `script.js` — nav scroll blur, burger menu, smooth scroll, IntersectionObserver reveals, counter animation, spotlight, cursor glow, card tilt
- `favicon.svg` — site icon

## Code conventions
- CSS custom properties in `:root` for theming (--bg, --accent, --font-display, etc.)
- BEM-like class naming: `.block__element--modifier`
- JS uses `var` and function expressions (no ES6 modules, no arrow functions)
- Comments in Italian for internal notes, English for code
- CSS sections separated by comment headers (`/* -- SECTION -- */`)

## Responsive breakpoints
- `≤1060px` — hero stacks vertically, code block hidden
- `≤900px` — single-column grids
- `≤680px` — mobile nav (hamburger), adjusted padding
- `≤420px` — 2-col stack grid, hide stat dividers

## Key behaviors
- Nav blur on scroll (`.scrolled` class)
- Burger menu locks body scroll (`overflow: hidden`)
- Scroll reveal animations via IntersectionObserver
- Hero spotlight follows cursor (desktop only)
- Card 3D tilt on hover (desktop ≥901px with precise pointer)
- Reduced-motion support
