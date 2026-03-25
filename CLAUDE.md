# CLAUDE.md - lucalombardo.dev

## Project overview
Personal portfolio website for Luca Lombardo, web developer and IT system administrator based in Brescia, Italy. Hosted on GitHub Pages at `lucalombardo.dev`. The site's purpose is to present services and generate freelance leads, so visual quality and reliability matter.

## Tech stack
- Vanilla HTML / CSS / JavaScript
- No build tools, frameworks, or runtime dependencies
- Google Fonts: Syne + DM Mono
- GitHub Pages deployment from `main` branch `/docs` folder
- Custom domain configured through `CNAME`

## File structure
- `index.html` - single-page site source
- `style.css` - all styles and responsive rules
- `script.js` - all interactions and animations
- `favicon.svg` - site icon
- `og-image.svg` - social preview image
- `site.webmanifest` - public site manifest
- `robots.txt` - crawler rules
- `docs/` - publish directory used by GitHub Pages
- `sync-pages.ps1` - syncs public files from root into `docs/`

## Deployment status
- Active branch: `main`
- Deleted branch: `dev` was merged and then removed locally and on GitHub
- GitHub Pages source: `main` + `/docs`
- Production domain: `https://lucalombardo.dev`
- `www.lucalombardo.dev` may require periodic verification until GitHub Pages TLS is fully aligned

## Recent work completed
- Prepared the repository for safe publishing from `docs/` so internal repository files are not exposed on the live site
- Added missing public assets and metadata files required by the live site
- Updated public references in `index.html` to match the files that actually exist in the published bundle
- Reduced direct email exposure in static HTML by composing the `mailto:` link at runtime in `script.js`
- Added `README.md` instructions for GitHub Pages publishing
- Merged `dev` into `main`, pushed `main`, and removed `dev` locally and remotely

## Code conventions
- CSS custom properties in `:root` for theme tokens
- BEM-like naming: `.block__element--modifier`
- JavaScript uses `var` and function expressions
- Comments may be in Italian for implementation notes
- No module system or bundling step

## Responsive breakpoints
- `<=1060px` - hero stacks vertically, heavy decorative elements reduce
- `<=900px` - single-column layouts
- `<=680px` - mobile navigation layout
- `<=420px` - tighter mobile adjustments

## Key behaviors
- Nav blur on scroll
- Burger menu with body scroll lock
- Smooth anchor scrolling
- IntersectionObserver reveal animations
- Animated counters and hero spotlight
- Magnetic buttons and hover effects
- Hero particle canvas and decorative 3D geometry
- Morphing blob canvas
- Project card parallax
- Section divider animations
- Reduced-motion support

## Security notes
- The site is fully static: never commit API keys, tokens, passwords, or private credentials
- Only files inside `docs/` are intended to be public through GitHub Pages
- The email address is still visible in the rendered UI, but is no longer stored directly in static HTML
- Before future deploys, run `.\sync-pages.ps1` and verify the generated `docs/` bundle before pushing
