# lucalombardo.dev

Sito personale di **Luca Lombardo** — siti web per piccole imprese e
professionisti di Brescia.

HTML, CSS e JavaScript scritti a mano. Nessun framework, nessun build step,
nessuna dipendenza da installare: si apre `index.html` e funziona.

🔗 [lucalombardo.dev](https://lucalombardo.dev)

---

## Struttura

```
lucalombardo.dev/
├── index.html            Pagina unica: hero, chi sono, servizi,
│                         come lavoro, lavori, prezzi, contatti
├── style.css             Tutti gli stili (tema scuro, palette indigo)
├── script.js             Interazioni: nav, animazioni allo scroll,
│                         spotlight, particelle, tilt delle card
├── favicon.svg           Icona vettoriale
├── favicon.png           32x32
├── apple-touch-icon.png  180x180
├── icon-192.png          Per il manifest
├── icon-512.png          Per il manifest
├── og-image.png          1200x630, anteprima social
├── site.webmanifest      Manifest PWA
├── robots.txt            Rimanda alla sitemap
├── sitemap.xml           Una sola URL: il sito e a pagina singola
├── CNAME                 Dominio custom di GitHub Pages
└── demo/
    └── geometra/         Sito dimostrativo (vedi sotto)
```

---

## Sviluppo locale

Non serve niente di installato. Due modi:

- doppio clic su `index.html`;
- oppure, meglio, l'estensione **Live Server** di VS Code (porta 5501), che
  ricarica la pagina a ogni salvataggio e serve correttamente le cartelle —
  la demo in `/demo/geometra/` ha bisogno di un server per risolvere la URL
  di cartella senza `index.html` in fondo.

---

## Modifiche frequenti

### Numero di telefono

Compare in quattro punti di `index.html`, in **due formati diversi**:

| Dove | Formato |
|---|---|
| `href="tel:..."` | `+393661908429` |
| testo visibile | `+39 366 190 8429` |
| `href="https://wa.me/..."` | `393661908429` (senza `+`, lo richiede wa.me) |
| JSON-LD `telephone` | `+393661908429` |

Per cambiarlo:

```bash
# le due forme senza spazi
sed -i 's/+393661908429/+39NUOVONUMERO/g; s|wa.me/393661908429|wa.me/39NUOVONUMERO|g' index.html
# il testo visibile, con gli spazi
sed -i 's/+39 366 190 8429/+39 NUO VON UMERO/g' index.html
```

### Prezzi

Sezione `#prezzi` in `index.html` più la stat `da 800 €` nell'hero e la riga
`Da 800 €` nella descrizione. Sono anche in `og:description`,
`twitter:description` e nella `meta description`: se cambi il prezzo,
cambiali tutti.

### Colore principale

`style.css`, blocco `:root` in cima:

```css
--accent:   #6366F1;
--accent-2: #8B5CF6;
```

Attenzione: nel file ci sono anche valori `rgba(99, 102, 241, …)` scritti per
esteso, che vanno cambiati a mano.

### Immagini social e icone

`og-image.png`, `favicon.png`, `apple-touch-icon.png`, `icon-192.png` e
`icon-512.png` sono PNG generati una volta sola e committati. Non c'è uno
script nel repo: se vanno rifatti, si rigenerano con qualsiasi strumento
mantenendo dimensioni e palette (`#0B0B0F` di fondo, gradiente
`#6366F1 → #8B5CF6`).

---

## Il sito dimostrativo

`demo/geometra/` è un sito completo a quattro pagine per **Studio Tecnico
Geom. Marco Rossi**, un'attività **di fantasia**. Serve a due cose: mostrare
un lavoro finito nella sezione Lavori e fare da template per clienti reali.

Ha un CSS tutto suo, un'impostazione grafica volutamente diversa dal
portfolio (tema chiaro, titoli serif, nessuna animazione) e nessuna
dipendenza esterna.

Le pagine sono in `noindex` e il footer dichiara che si tratta di una demo:
è un'attività che non esiste, non deve comparire su Google come reale.

### Riusarlo per un cliente

1. copia la cartella: `cp -r demo/geometra demo/nuovo-cliente`
2. nome attività: cerca `Studio Tecnico` e `Geom. Marco Rossi`
3. monogramma: `.brand__mark` (`MR`) nelle quattro pagine e `favicon.svg`
4. recapiti: telefono, email, indirizzo, P.IVA in header e footer
5. servizi: le card di `index.html` e i blocchi di `servizi.html`
6. colore: `--brand` e `--brand-dark` in cima a `style.css`
7. togli il `<meta name="robots" content="noindex">` e la riga
   "sito dimostrativo" nel footer

Il form in `contatti.html` **non invia niente**: è bloccato da `script.js` e
lo dichiara a schermo. Per renderlo funzionante serve un servizio esterno
(EmailJS, Formspree o simili) oppure un backend.

---

## Deploy su GitHub Pages

Il sito è pubblicato da GitHub Pages con dominio custom. La configurazione è
già fatta: il file `CNAME` contiene `lucalombardo.dev`.

Per pubblicare basta un push sul branch da cui Pages sta servendo.

### Se va rifatto da zero

1. repository **pubblico**;
2. Settings → Pages → Source: `Deploy from a branch`, branch `main`, cartella
   `/ (root)`;
3. Settings → Pages → Custom domain: `lucalombardo.dev`;
4. dal provider DNS, quattro record A sulla root:

   | Tipo  | Host | Valore          |
   | ----- | ---- | --------------- |
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | CNAME | www  | LucaLombardo03.github.io |

5. a propagazione avvenuta, spunta **Enforce HTTPS**.

---

## Note tecniche

- I font sono gli unici file caricati da fuori: **Syne** e **DM Mono** da
  Google Fonts, con `preconnect` e `preload`. Per renderlo ancora più veloce
  si possono scaricare e servire da `/fonts/`.
- Le animazioni rispettano `prefers-reduced-motion`.
- Gli effetti legati al mouse (spotlight, tilt, magnetic buttons) sono attivi
  solo dove esiste un puntatore preciso: su touch non partono.
- I dati strutturati JSON-LD nell'`<head>` descrivono `Person`, `WebSite` e
  `ProfessionalService`. Se cambiano recapiti o servizi, vanno aggiornati
  anche lì.
