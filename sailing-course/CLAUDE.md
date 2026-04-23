# Sailing English Course — Guida rapida

Deck HTML/CSS/JS sullo stesso modello del seminario VRP. **15 slide** gestite dal web component `<deck-stage>` in [deck-stage.js](deck-stage.js), montate da [sailing-seminar.html](sailing-seminar.html).

## Come far partire la presentazione

Aprire il file direttamente con `file://` **non funziona**: Babel standalone non riesce a eseguire i file `.jsx` e la pagina resta bloccata su "Loading…". Serve un server HTTP locale:

```bash
cd ~/Documents/GitHub/seminario-vrp-corso-di-ottimizzazione-dei-sistemi-complessi/sailing-course
python3 -m http.server 8001
```

Poi aprire http://localhost:8001/sailing-seminar.html nel browser.

(Ho usato la porta `8001` per non confliggere con il VRP, che usa `8000`.)

Per fermare il server:

```bash
lsof -ti:8001 | xargs kill
```

## Navigazione slide

Gestita da [deck-stage.js](deck-stage.js) (identico al VRP):

- **→** / **Spazio** / **PageDown** — slide successiva
- **←** / **PageUp** — slide precedente
- **Home** / **End** — prima / ultima
- **1–9** — salto alle prime 9 slide (0 = slide 10)
- **R** — reset alla prima slide

Muovendo il mouse appare in basso un overlay con i bottoni prev/next/reset. L'indice corrente viene persistito in `localStorage`.

## Esportare in PDF

`Cmd+P` nel browser → *Salva come PDF*. Il CSS `@media print` in [deck-stage.js](deck-stage.js) impagina una slide per pagina alla dimensione autorizzata (1920×1080).

## Struttura dei file

```
sailing-course/
├── sailing-seminar.html          # entry point: monta tutte le slide
├── deck-stage.js                 # web component <deck-stage> (copia 1:1 dal VRP)
├── styles.css                    # design system (palette marine di default)
├── components.jsx                # SlideFrame, Topline, illustrazioni SVG riusabili
├── slides/
│   ├── 01-cover-intro.jsx        # Part I — cover, lettera, overview, route
│   ├── 02-daily-structure.jsx    # Part II — section + 6 blocchi giornalieri
│   └── 03-method-closing.jsx     # Part III — learning, safety, closing
└── assets/                       # immagini fisse (vuoto al momento)
```

Ogni file in `slides/` è un `<script type="text/babel">` che definisce le sue funzioni `Slide*` e le registra su `window` in fondo al file. L'array di mount in [sailing-seminar.html](sailing-seminar.html) legge questi globali e li rende in ordine.

## Struttura della presentazione

| # | Slide | Funzione | File |
|---|-------|----------|------|
| 1 | Cover | `SlideCover` | [slides/01-cover-intro.jsx](slides/01-cover-intro.jsx) |
| 2 | A letter to parents | `SlideLetter` | [slides/01-cover-intro.jsx](slides/01-cover-intro.jsx) |
| 3 | Programme overview | `SlideOverview` | [slides/01-cover-intro.jsx](slides/01-cover-intro.jsx) |
| 4 | The route (Saronic map) | `SlideRoute` | [slides/01-cover-intro.jsx](slides/01-cover-intro.jsx) |
| 5 | **Part II — The day at a glance** *(section header)* | `SlideDaySection` | [slides/02-daily-structure.jsx](slides/02-daily-structure.jsx) |
| 6 | Daily structure (6-block grid) | `SlideDayGrid` | [slides/02-daily-structure.jsx](slides/02-daily-structure.jsx) |
| 7 | 01 · Morning | `SlideMorning` | [slides/02-daily-structure.jsx](slides/02-daily-structure.jsx) |
| 8 | 02 · Sailing session | `SlideSailing` | [slides/02-daily-structure.jsx](slides/02-daily-structure.jsx) |
| 9 | 03 · Lunch & social | `SlideLunch` | [slides/02-daily-structure.jsx](slides/02-daily-structure.jsx) |
| 10 | 04 · Afternoon activities | `SlideAfternoon` | [slides/02-daily-structure.jsx](slides/02-daily-structure.jsx) |
| 11 | 05 · Free time | `SlideFreeTime` | [slides/02-daily-structure.jsx](slides/02-daily-structure.jsx) |
| 12 | 06 · Evening | `SlideEvening` | [slides/02-daily-structure.jsx](slides/02-daily-structure.jsx) |
| 13 | Learning approach | `SlideLearning` | [slides/03-method-closing.jsx](slides/03-method-closing.jsx) |
| 14 | Safety & supervision | `SlideSafety` | [slides/03-method-closing.jsx](slides/03-method-closing.jsx) |
| 15 | **Get in touch** *(section closing)* | `SlideClosing` | [slides/03-method-closing.jsx](slides/03-method-closing.jsx) |

> Per aggiungere una slide: crea la funzione nel file della parte corrispondente, aggiungila all'`Object.assign(window, {...})` in fondo a quel file, poi inseriscila nell'array `slides` dentro [sailing-seminar.html](sailing-seminar.html).

## Temi

Tre palette via attributo `data-theme` su `<deck-stage>`:

- **marine** *(default)* — crema caldo + navy + accenti rame. Tema "diario di bordo".
- **blueprint** — azzurro chiaro + navy + accenti blu. Più "ingegneristico".
- **midnight** — sfondo nerissimo + tipo cream + accenti rame. Per proiezione in sala buia.

Si cambiano dal pannello Tweaks (in basso a destra, nascosto di default — appare se il host attiva l'edit mode), oppure assegnando a mano `data-theme` su `<deck-stage>` nell'HTML.

## Pattern e gotcha (gli stessi del VRP)

Per regole su event handler nativi vs `onClick`, riavvio animazioni con `key`, `--len` per `drawPath`, stacking CSS, reset animazioni con `MutationObserver`, e `flushSync` al mount, vedi le sezioni omonime nel CLAUDE.md del seminario VRP. Le stesse regole si applicano qui perché il sistema (`<deck-stage>` + React 18 + Babel standalone) è identico.
