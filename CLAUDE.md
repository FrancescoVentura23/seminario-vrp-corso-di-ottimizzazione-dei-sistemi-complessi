# Seminario VRP — Guida rapida

Deck HTML/CSS/JS esportato da Claude Design. **52 slide** gestite dal web component `<deck-stage>` in [project/deck-stage.js](project/deck-stage.js), montate da [project/vrp-seminar.html](project/vrp-seminar.html).

## Come far partire la presentazione

Aprire il file direttamente con `file://` **non funziona**: Babel standalone non riesce a eseguire i file `.jsx` e la pagina resta bloccata su "Loading…". Serve un server HTTP locale:

```bash
cd ~/Documents/GitHub/seminario-vrp-corso-di-ottimizzazione-dei-sistemi-complessi/project
python3 -m http.server 8000
```

Poi aprire http://localhost:8000/vrp-seminar.html nel browser.

Per fermare il server:

```bash
lsof -ti:8000 | xargs kill
```

## Navigazione slide

Gestita da [project/deck-stage.js](project/deck-stage.js):

- **→** / **Spazio** / **PageDown** — slide successiva
- **←** / **PageUp** — slide precedente
- **Home** / **End** — prima / ultima
- **1–9** — salto alle prime 9 slide (0 = slide 10)
- **R** — reset alla prima slide

Muovendo il mouse appare in basso un overlay con i bottoni prev/next/reset. L'indice corrente viene persistito in `localStorage`, quindi un refresh riporta alla stessa slide.

## Esportare in PDF

`Cmd+P` nel browser → *Salva come PDF*. Il CSS `@media print` in [project/deck-stage.js](project/deck-stage.js) impagina una slide per pagina alla dimensione autorizzata (1920×1080).

## Struttura dei file

```
project/
├── vrp-seminar.html      # entry point: monta tutte le slide
├── deck-stage.js         # web component <deck-stage> (navigazione, print)
├── styles.css            # stili condivisi
├── components.jsx        # componenti riusabili (TeX, SlideFrame, VRPGraph, BigNumber) + dati EX_NODES / EX_ROUTES condivisi
├── demo.jsx              # ClarkeWrightDemo (demo interattiva)
├── slides/
│   ├── 01-cover.jsx            # Cover
│   ├── 02-intro.jsx            # Part I — Introduction
│   ├── 03-foundations.jsx      # Part II — Foundations (graph theory)
│   ├── 04-vrp-elements.jsx     # Part III — VRP elements
│   ├── 05-tsp.jsx              # Part IV — TSP
│   ├── 06-cvrp.jsx             # Part V — CVRP
│   ├── 07-complexity.jsx       # Part VI — Complexity
│   ├── 08-family.jsx           # Part VII — VRP family
│   ├── 09-live-demo.jsx        # Part VIII — Live demo
│   └── 10-applications.jsx     # Part IX — Applications & closing
├── assets/                # immagini fisse del deck
└── uploads/               # caricamenti dell'utente
```

Ogni file in `slides/` è un `<script type="text/babel">` che definisce le sue funzioni `Slide*` e le registra su `window` in fondo al file. L'array di mount in [project/vrp-seminar.html](project/vrp-seminar.html) legge questi globali e li rende in ordine.

## Struttura della presentazione

Ogni section header è una slide con `className="section-slide"`. Per modificare titolo o numerazione di una sezione, cerca la funzione indicata nel file corrispondente.

| # | Slide | Funzione | File |
|---|-------|----------|------|
| 1 | Cover | `Slide01` | [slides/01-cover.jsx](project/slides/01-cover.jsx) |
| 2 | **Part I — Introduction** *(section header)* | `SlideIntroSection` | [slides/02-intro.jsx](project/slides/02-intro.jsx) |
| 3 | History & origins | `SlideHistory` | [slides/02-intro.jsx](project/slides/02-intro.jsx) |
| 4 | Operations Research link | `SlideORLink` | [slides/02-intro.jsx](project/slides/02-intro.jsx) |
| 5 | A problem you meet every day | `Slide02` | [slides/02-intro.jsx](project/slides/02-intro.jsx) |
| 6 | The economic scale | `Slide03` | [slides/02-intro.jsx](project/slides/02-intro.jsx) |
| 7 | Who uses VRP today | `SlideWhoUsesIt` | [slides/02-intro.jsx](project/slides/02-intro.jsx) |
| 8 | **Part II — Foundations** *(section header)* | `Slide05` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 9 | Node | `SlideNode` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 10 | Node attributes (animated) | `SlideNodeAttributes` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 11 | Edge | `SlideEdge` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 12 | Simple graph | `SlideSimpleGraph` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 13 | Directed arc | `SlideDirectedArc` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 14 | Digraph | `SlideDigraph` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 15 | Forward / backward star | `SlideStarNotation` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 16 | Network | `SlideNetwork` | [slides/03-foundations.jsx](project/slides/03-foundations.jsx) |
| 17 | **Part III — VRP elements** *(section header)* | `SlideVRPElementsSection` | [slides/04-vrp-elements.jsx](project/slides/04-vrp-elements.jsx) |
| 18 | Anatomy of a routing problem | `Slide06` | [slides/04-vrp-elements.jsx](project/slides/04-vrp-elements.jsx) |
| 19 | Road → complete graph | `Slide07` | [slides/04-vrp-elements.jsx](project/slides/04-vrp-elements.jsx) |
| 20 | Graph notation | `Slide08` | [slides/04-vrp-elements.jsx](project/slides/04-vrp-elements.jsx) |
| 21 | **Part IV — TSP** *(section header)* | `SlideTSPSection` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 22 | TSP — informal statement | `Slide09` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 23 | Hamiltonian circuit (animated) | `SlideTSPHamiltonian` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 24 | TSP — ILP formulation | `SlideTSPFormulation` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 25 | Degree constraints | `SlideTSPDegree` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 26 | The subtour problem (animated) | `SlideTSPSubtourProblem` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 27 | DFJ subtour elimination | `SlideTSPDFJ` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 28 | Exponential blow-up (animated) | `SlideTSPExponential` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 29 | Lazy subtour cuts in branch-and-cut | `SlideTSPLazy` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 30 | Separation = min-cut (animated) | `SlideTSPMinCut` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 31 | Separation oracle — precise algorithm | `SlideTSPMinCutAlgo` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 32 | TSP → VRP | `Slide10` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 33 | **Part V — CVRP** *(section header)* | `Slide11` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 34 | CVRP informal definition | `Slide12` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 35 | CVRP three constraints | `Slide13` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 36 | Two-index ILP formulation | `Slide14` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 37 | Capacity-cut inequality | `Slide15` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 38 | **Part VI — Complexity** *(section header)* | `Slide16` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 39 | NP-hardness & explosion | `Slide17` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 40 | Why heuristics | `Slide18` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 41 | **Part VII — VRP family** *(section header)* | `Slide19` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 42 | Taxonomy | `Slide20` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 43 | VRPTW | `Slide21` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 44 | Backhauls & PD | `Slide22` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 45 | Multi-depot & open VRP | `Slide23` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 46 | **Part VIII — Live demo** *(section header)* | `Slide24` | [slides/09-live-demo.jsx](project/slides/09-live-demo.jsx) |
| 47 | Clarke-Wright idea | `Slide25` | [slides/09-live-demo.jsx](project/slides/09-live-demo.jsx) |
| 48 | Interactive demo | `Slide26` | [slides/09-live-demo.jsx](project/slides/09-live-demo.jsx) |
| 49 | **Part IX — Applications** *(section header)* | `Slide27` | [slides/10-applications.jsx](project/slides/10-applications.jsx) |
| 50 | Case studies | `Slide28` | [slides/10-applications.jsx](project/slides/10-applications.jsx) |
| 51 | Takeaways | `Slide29` | [slides/10-applications.jsx](project/slides/10-applications.jsx) |
| 52 | Closing / references | `Slide30` | [slides/10-applications.jsx](project/slides/10-applications.jsx) |

> Per aggiungere una slide: crea la funzione nel file della parte corrispondente, aggiungila all'`Object.assign(window, {...})` in fondo a quel file, poi inseriscila nell'array `slides` dentro [project/vrp-seminar.html](project/vrp-seminar.html).

## Pattern e gotcha per animazioni e interattività

### 1. Event handler: usare listener nativi, non `onClick`

`deck-stage.js` sposta ogni `<section>` fuori dal div host di `createRoot()`. React usa event delegation sulla root, che non segue il nodo spostato → **`onClick` non funziona mai nelle slide**.

Soluzione obbligatoria: listener nativo via `useRef` + `useEffect`:

```jsx
const btnRef = React.useRef(null);
React.useEffect(() => {
  const btn = btnRef.current;
  if (!btn) return;
  const handler = () => { /* aggiorna stato */ };
  btn.addEventListener("click", handler);
  return () => btn.removeEventListener("click", handler);
}, []);
// Nel JSX: <button ref={btnRef}>...</button>
```

Esempio funzionante: `SlideNodeAttributes` in [project/slides/03-foundations.jsx](project/slides/03-foundations.jsx) e `Slide09` in [project/slides/05-tsp.jsx](project/slides/05-tsp.jsx).

### 2. Riavviare un'animazione: usare `key`

Le animazioni CSS si attivano al mount del DOM node. Per riavviarle su click, metti `key={animKey}` sull'elemento animato e incrementa `animKey` nello state:

```jsx
const [animKey, setAnimKey] = React.useState(0);
// nel handler:
setAnimKey(k => k + 1);
// nel JSX:
<svg key={animKey} ...> ... </svg>
```

### 3. `drawPath` e la variabile `--len`

Il keyframe CSS `drawPath` usa `var(--len, 2000)` come `stroke-dashoffset` iniziale. Se non imposti `--len`, usa il fallback 2000 e l'animazione parte già a metà percorso. **Sempre** passare `"--len": len` nell'`style`:

```jsx
style={{
  strokeDasharray: len,
  strokeDashoffset: len,
  "--len": len,              // ← obbligatorio
  animation: `drawPath 700ms both ease-in-out`,
  animationDelay: `${i * 550}ms`,
}}
```

### 4. Animazione segmento-per-segmento (path drawing lento)

`VRPGraph` disegna tutte le route in un colpo solo con `anim-draw`. Per un percorso lento (segmento dopo segmento), sovrapponi un SVG custom con `<line>` separati e delay scalati:

```jsx
{showRoute && (
  <svg key={animKey} viewBox="160 55 620 510"
       style={{ position:"absolute", top:28, left:28,
                width:"calc(100% - 56px)", height:"calc(100% - 56px)",
                pointerEvents:"none" }}>
    {segments.map(([x1,y1,x2,y2], i) => {
      const len = Math.hypot(x2-x1, y2-y1);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
               stroke="var(--accent)" strokeWidth={5} strokeLinecap="round"
               style={{ strokeDasharray:len, strokeDashoffset:len, "--len":len,
                        animation:`drawPath 700ms both ease-in-out`,
                        animationDelay:`${i * 550}ms` }} />;
    })}
  </svg>
)}
```

### 5. Stacking CSS: `position:absolute` sopravanza gli elementi statici

Un SVG/div con `position:absolute` viene dipinto **dopo** (sopra) tutti gli elementi `position:static` nello stesso stacking context, indipendentemente dall'ordine nel DOM. Se vuoi che un elemento statico (es. VRPGraph con i nodi) stia sopra un overlay assoluto, dagli `position:relative` e `zIndex` esplicito:

```jsx
// overlay (position:absolute, zIndex implicito 0) → sotto
<svg style={{ position:"absolute", ... }} />
// VRPGraph wrapper → sopra
<div style={{ position:"relative", zIndex:1, pointerEvents:"none" }}>
  <VRPGraph ... />
</div>
```

### 6. Reset animazione quando la slide esce dalla vista

Usa un `MutationObserver` sul `ref` della `<section>` per osservare `data-deck-active`:

```jsx
React.useEffect(() => {
  const el = sectionRef.current;
  if (!el) return;
  const obs = new MutationObserver(() => {
    if (!el.hasAttribute('data-deck-active')) {
      setShowRoute(false);   // reset stato
      setAnimKey(0);
    }
  });
  obs.observe(el, { attributes:true, attributeFilter:['data-deck-active'] });
  return () => obs.disconnect();
}, []);
```

### 7. Mount sincrono con `flushSync`

Il mount in [project/vrp-seminar.html](project/vrp-seminar.html) avvolge `root.render(...)` in `ReactDOM.flushSync(...)`: questo forza React 18 a renderizzare sincronamente, così la `<section>` è disponibile subito per essere spostata in `<deck-stage>`. Senza questa forzatura, a freddo (cache vuota, JIT freddo) alcune slide venivano appese prima che React avesse prodotto il DOM → sparivano dal deck finché non si ricaricava la pagina.
