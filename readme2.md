# lucalombardo.dev — Portfolio

**Luca Lombardo** — Computer Engineering Student & Landing Page Developer  
[lucalombardo.dev](https://lucalombardo.dev)

---

## File Structure

```
lucalombardo.dev/
├── index.html      ← main page (all sections)
├── style.css       ← all styles (dark theme, responsive)
├── script.js       ← nav scroll, reveal animations, burger menu
└── README.md       ← this file
```

---

## Deploying on GitHub Pages with Custom Domain

### Step 1 — Create the GitHub repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it exactly: `lucalombardo.dev` (or any name you prefer)
3. Set it to **Public**
4. Do NOT initialize with README (you already have the files)

### Step 2 — Push the files

```bash
cd lucalombardo.dev
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lucalombardo.dev.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select: `Deploy from a branch`
4. Branch: `main`, folder: `/ (root)`
5. Click **Save**

GitHub will give you a URL like: `https://yourusername.github.io/lucalombardo.dev`

### Step 4 — Add the custom domain `lucalombardo.dev`

**In GitHub:**

1. Still in Settings → Pages
2. Under **Custom domain**, type: `lucalombardo.dev`
3. Click **Save**
4. This will automatically create a `CNAME` file in your repo — that's normal

**In your DNS provider (where you bought lucalombardo.dev):**

Add these DNS records:

| Type  | Host | Value                   |
| ----- | ---- | ----------------------- |
| A     | @    | 185.199.108.153         |
| A     | @    | 185.199.109.153         |
| A     | @    | 185.199.110.153         |
| A     | @    | 185.199.111.153         |
| CNAME | www  | YOUR_USERNAME.github.io |

> DNS propagation can take up to 24–48 hours.

**Once DNS propagates:**

- Go back to GitHub Settings → Pages
- Check **Enforce HTTPS** (free SSL from GitHub)

---

## Customization Guide

### Update contact links

Open `index.html` and search for:

- `luca@lucalombardo.dev` → replace with your real email
- `github.com/lucalombardo` → replace with your GitHub URL
- `linkedin.com/in/lucalombardo` → replace with your LinkedIn URL

### Add real projects

Find the `Projects` section in `index.html`.  
Update each `<article class="card card--project">` with:

- Real project title
- Real description
- Real GitHub and live preview links (replace `href="#"`)

### Change accent color

Open `style.css`, find `:root` at the top, and change:

```css
--accent: #38bdf8; /* change to any color you like */
```

### Add a favicon

Create or download a favicon (e.g. `favicon.ico` or `favicon.png`) and add to `<head>` in `index.html`:

```html
<link rel="icon" type="image/png" href="favicon.png" />
```

---

## Performance Tips

- The site loads **zero external JS** — only 2 Google Fonts (Syne + DM Mono)
- All animations use CSS + a tiny Intersection Observer (no jQuery)
- To make it even faster: self-host the fonts (download them and serve from `/fonts/`)

---

Built with HTML5, CSS3, Vanilla JS — no frameworks, no dependencies.
