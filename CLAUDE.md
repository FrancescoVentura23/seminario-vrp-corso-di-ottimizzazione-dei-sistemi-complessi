# Seminario VRP — Guida rapida

Deck HTML/CSS/JS esportato da Claude Design. **61 slide** gestite dal web component `<deck-stage>` in [project/deck-stage.js](project/deck-stage.js), montate da [project/vrp-seminar.html](project/vrp-seminar.html).

## Istruzioni per Claude Dispatch

Quando si usa Claude Dispatch dal telefono, inviare questo messaggio come **primo messaggio** per preparare il contesto:

```
Lavora nella cartella:
~/Documents/GitHub/seminario-vrp-corso-di-ottimizzazione-dei-sistemi-complessi/

Leggi attentamente il CLAUDE.md nella root: contiene la struttura completa
della presentazione (61 slide), i file coinvolti, i pattern obbligatori
da seguire e i gotcha delle animazioni.

Quando hai finito di leggere, confermami che sei pronto per ricevere
istruzioni di modifica. Ad ogni modifica completata, ricordati di:
1. Rimuovere lock stantii: find .git -name "*.lock" -delete
2. git add <file modificati>
3. git commit -m "descrizione modifica"
4. git push origin main
```

Dopo la conferma, inviare la modifica desiderata in un messaggio separato.

Note operative:
- Il Mac deve restare **sveglio** con la **Claude Desktop app aperta**
- Le credenziali GitHub sono già configurate — il push funziona senza autenticazione
- VS Code git integration è **abilitata** (`"git.enabled": true`) — funziona normalmente quando VS Code è aperto. **Tenere VS Code chiuso mentre si usa Claude Dispatch**: se entrambi girano contemporaneamente possono generare `.git/*.lock` stantii che bloccano i commit
- Dopo il push attendere ~1 minuto e ricaricare il browser sul telefono

---

## Come far partire la presentazione

### Da remoto (telefono o qualsiasi browser)

La presentazione è pubblicata su GitHub Pages:

```
https://francescoventura23.github.io/seminario-vrp-corso-di-ottimizzazione-dei-sistemi-complessi/project/vrp-seminar.html
```

Si aggiorna automaticamente entro ~1 minuto da ogni `git push` sul branch `main`.

Le credenziali GitHub sono già configurate nell'URL remoto — `git push origin main` funziona senza autenticazione interattiva.

### In locale (sviluppo)

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

> **Ordine delle parti** — la **Complexity** (Parte IV) è collocata **prima** del TSP e del CVRP: il deck introduce Big-O, classi P/NP/NP-hard, branch-and-bound/cut e il concetto di lazy constraint **prima** che le slide TSP usino questo vocabolario per la generazione lazy dei vincoli DFJ. La numerazione dei file `.jsx` (`05-tsp.jsx`, `06-cvrp.jsx`, `07-complexity.jsx`) riflette l'ordine *di creazione* dei file, non l'ordine di rendering — l'array `slides[]` in [vrp-seminar.html](project/vrp-seminar.html) è la fonte autoritativa dell'ordine effettivo.

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
| 21 | **Part IV — Complexity** *(section header)* | `Slide16` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 22 | Big-O notation | `Slide17A` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 23 | Growth rates table (log n → n!) | `Slide17AGrowth` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 24 | Complexity classes — P / NP / NP-hard / NP-complete | `Slide17B` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 25 | Exact algorithms (B&B, B&C, DP) | `Slide17C` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 26 | Why heuristics | `Slide18` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 27 | **Part V — TSP** *(section header)* | `SlideTSPSection` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 28 | TSP — informal statement | `Slide09` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 29 | Hamiltonian circuit (animated) | `SlideTSPHamiltonian` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 30 | TSP — ILP formulation | `SlideTSPFormulation` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 31 | Degree constraints | `SlideTSPDegree` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 32 | The subtour problem (animated) | `SlideTSPSubtourProblem` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 33 | DFJ subtour elimination | `SlideTSPDFJ` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 34 | Exponential blow-up (animated) | `SlideTSPExponential` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 35 | Lazy subtour cuts in branch-and-cut | `SlideTSPLazy` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 36 | The key identity: relating cuts to arcs | `SlideTSPKeyIdentity` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 37 | Separation = min-cut (animated) | `SlideTSPMinCut` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 38 | Separation oracle — precise algorithm | `SlideTSPMinCutAlgo` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 39 | Separation oracle — implementation | `SlideTSPMinCutImpl` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 40 | **Part VI — CVRP** *(section header)* | `Slide11` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 41 | CVRP is NP-hard | `Slide17` | [slides/07-complexity.jsx](project/slides/07-complexity.jsx) |
| 42 | TSP → CVRP — capacity intro | `Slide10` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 43 | TSP → CVRP — multiple routes | `Slide10B` | [slides/05-tsp.jsx](project/slides/05-tsp.jsx) |
| 44 | Three constraints + two-index ILP | `Slide14` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 45 | Depot constraints — K leave / K return | `Slide14B` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 46 | r(S) and capacity-cut inequality | `Slide15` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 47 | Capacity cuts — exponential blow-up | `Slide15B` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 48 | Lazy capacity-cut generation (B&C) | `Slide15C` | [slides/06-cvrp.jsx](project/slides/06-cvrp.jsx) |
| 49 | **Part VII — VRP family** *(section header)* | `Slide19` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 50 | Taxonomy | `Slide20` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 51 | VRPTW | `Slide21` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 52 | Linehauls vs backhauls (animated demo) | `Slide22Intro` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 53 | Partial loads — each customer's own demand | `Slide22Load` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 54 | VRPB rule (linehauls before backhauls) | `Slide22` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 55 | Multi-depot & open VRP | `Slide23` | [slides/08-family.jsx](project/slides/08-family.jsx) |
| 56 | **Part VIII — Live demo** *(section header)* | `Slide24` | [slides/09-live-demo.jsx](project/slides/09-live-demo.jsx) |
| 57 | Clarke-Wright idea | `Slide25` | [slides/09-live-demo.jsx](project/slides/09-live-demo.jsx) |
| 58 | Interactive demo | `Slide26` | [slides/09-live-demo.jsx](project/slides/09-live-demo.jsx) |
| 59 | **Part IX — Applications** *(section header)* | `Slide27` | [slides/10-applications.jsx](project/slides/10-applications.jsx) |
| 60 | Case studies | `Slide28` | [slides/10-applications.jsx](project/slides/10-applications.jsx) |
| 61 | Takeaways | `Slide29` | [slides/10-applications.jsx](project/slides/10-applications.jsx) |
| 62 | Closing / references | `Slide30` | [slides/10-applications.jsx](project/slides/10-applications.jsx) |

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

### 7. Workflow git — rimuovere i lock prima di committare

Il repo può accumulare file `.lock` stantii in `.git/` (lasciati da sessioni interrotte o da VS Code). Prima di qualsiasi `git add / commit / push`, eseguire sempre:

```bash
find .git -name "*.lock" -delete
git add <files>
git commit -m "..."
git push origin main
```

Nota: VS Code git integration è abilitata (`"git.enabled": true`). Per evitare conflitti di lock, **tenere VS Code chiuso quando si usa Claude Dispatch**.

### 8. Tap zone mobile: solo i bordi (10%), non i terzi

Su touch device, `deck-stage.js` monta due zone trasparenti a sinistra e destra per navigare (tocco sinistro = indietro, tocco destro = avanti). Queste zone coprono il **10% del bordo** ciascuna — il restante 80% centrale è libero per interagire con bottoni e animazioni nelle slide. Non allargare le tap zone oltre il 15% o i bottoni nelle slide laterali diventano inaccessibili da telefono.

### 9. Mount sincrono con `flushSync`

Il mount in [project/vrp-seminar.html](project/vrp-seminar.html) avvolge `root.render(...)` in `ReactDOM.flushSync(...)`: questo forza React 18 a renderizzare sincronamente, così la `<section>` è disponibile subito per essere spostata in `<deck-stage>`. Senza questa forzatura, a freddo (cache vuota, JIT freddo) alcune slide venivano appese prima che React avesse prodotto il DOM → sparivano dal deck finché non si ricaricava la pagina.

### 10. Frecce animate: non usare `markerEnd` con `drawPath`

SVG `markerEnd` posiziona la punta all'endpoint geometrico della linea indipendentemente dal `stroke-dashoffset` corrente → la punta appare immediatamente, prima che il corpo sia disegnato.

**Soluzione obbligatoria**: omettere `markerEnd` e disegnare le punte come `<polygon>` separati con `opacity: 0` e `fadeUp` ritardato di ~680ms rispetto all'inizio del segmento corrispondente.

**Regola critica di ordine**: rendere **prima tutti i body** e **poi tutte le punte** in due `.map()` distinti — mai interleaved (es. con `flatMap`). La struttura che funziona (verificata in slide 23 e 26):

```jsx
{/* 1. Tutti i segmenti */}
{edges.map((e, i) => (
  <line key={`body-${i}`} ...
        style={{ "--len": segLen, strokeDasharray: segLen,
                 animation: "drawPath 700ms both ease-in-out",
                 animationDelay: `${startDelay + i * 350}ms` }}/>
))}
{/* 2. Tutte le punte — DOPO tutti i body */}
{edges.map((e, i) => (
  <polygon key={`head-${i}`} points={pts} fill={color}
           style={{ opacity: 0, animation: "fadeUp 150ms both ease-out",
                    animationDelay: `${startDelay + i * 350 + 680}ms` }}/>
))}
```

Calcolo dei punti del poligono (punta in direzione `(ux, uy)`, tip in `(x2, y2)`):

```javascript
const aw = 9, al = 18;
const bx = x2 - ux * al, by = y2 - uy * al;
const pts = `${x2},${y2} ${bx - uy*aw},${by + ux*aw} ${bx + uy*aw},${by - ux*aw}`;
```

Esempio funzionante: `SlideTSPHamiltonian` (slide 23) e `SlideTSPSubtourProblem` (slide 26) in [slides/05-tsp.jsx](project/slides/05-tsp.jsx).

### 11. Animazioni multiple sulla stessa proprietà: `both` sovrascrive quelle precedenti

Quando si concatenano due animazioni CSS sulla stessa proprietà (es. `opacity`), quella listata **per ultima** ha la priorità. Se la seconda usa `fill-mode: both`, la sua **backward fill** (stato `from`) viene applicata anche **durante il delay**, sovrascrivendo l'animazione precedente ancora in corso.

Esempio problematico — `blink` non lampeggia perché `fadeOut ... both` mantiene `opacity: 1` durante il delay di 1500ms:
```js
animation: "blink 500ms ease-in-out 0ms 3, fadeOut 500ms ease-out 1500ms both"
```

Fix: usare `forwards` invece di `both` — così la backward fill non interferisce durante il delay, e `blink` controlla `opacity` liberamente:
```js
animation: "blink 500ms ease-in-out 0ms 3, fadeOut 500ms ease-out 1500ms forwards"
```

Regola generale: in una catena `blink + fadeOut`, usare sempre `forwards` su `fadeOut` (mantiene opacity 0 dopo la fine) e **mai** `both` (bloccherebbe il lampeggio).

### 12. Modifiche locali non visibili su GitHub Pages finché non si fa push

Le modifiche ai file locali sono visibili subito su `http://localhost:8000` ma **non** su GitHub Pages finché non si esegue `git push origin main`. Se si testa su GitHub Pages e le modifiche sembrano non applicate, verificare prima se il push è stato fatto.

### 13. Mai usare `String.raw\`...\`` per le espressioni LaTeX nei `<TeX>`

**Bug verificato**: Babel standalone (vers. 7.29.0 servita da CDN, usata da [vrp-seminar.html](project/vrp-seminar.html)) ha un problema con i tagged template literals quando lo stesso modulo `<script type="text/babel">` è caricato insieme ad altri: l'array di "raw strings" che `String.raw` riceve viene **condiviso (memoizzato globalmente) tra script tag diversi**. Risultato pratico: due `<TeX>{String.raw\`A\`}</TeX>` in slide diverse possono finire per ricevere entrambi la stessa stringa `B` proveniente da una terza slide. KaTeX renderizza correttamente quello che riceve, ma riceve i children sbagliati.

**Sintomo**: una slide mostra equazioni che provengono da una slide completamente diversa (es. la formulazione CVRP che renderizza il vincolo DFJ del TSP).

**Soluzione obbligatoria**: usare **stringhe normali con doppio backslash** anziché `String.raw`:

```jsx
// SBAGLIATO — può leakare cross-slide
<TeX>{String.raw`\sum_{i \in V} x_{ij} = 1`}</TeX>

// GIUSTO
<TeX>{"\\sum_{i \\in V} x_{ij} = 1"}</TeX>
```

Per espressioni multi-line con `\begin{aligned}…\end{aligned}`, usare `\n` esplicito nella stringa anziché newline reale:

```jsx
<TeX display>{"\\begin{aligned}\nA &= B \\\\\nC &= D\n\\end{aligned}"}</TeX>
```

**Diagnosi rapida**: il componente `TeX` in [components.jsx](project/components.jsx) imposta sempre l'attributo `data-tex-source` sullo `<span>`. Click destro su una formula sospetta → Inspect → guarda `data-tex-source`. Se contiene una stringa diversa da quella nel JSX, è quasi sicuramente questo bug.

### 14. Mount del deck: un solo `ReactDOM.createRoot` per tutto, non uno per slide

**Versione precedente** (rotta): per ogni slide creava un root separato e poi spostava la `<section>` con `appendChild`:

```jsx
slides.forEach((SlideComp) => {
  const host = document.createElement("div");
  const root = ReactDOM.createRoot(host);
  ReactDOM.flushSync(() => root.render(<SlideComp/>));
  stage.appendChild(host.firstElementChild);   // ← move out of host
});
```

Con React 18 (concurrent reconciler) e ~50 root in parallelo + manipolazione DOM imperativa fuori da React, lo stato cross-root non era più isolato.

**Versione corretta** (in [vrp-seminar.html](project/vrp-seminar.html)): un solo root su `<deck-stage>`, tutte le slide come siblings in un Fragment:

```jsx
const root = ReactDOM.createRoot(stage);
ReactDOM.flushSync(() => {
  root.render(
    <React.Fragment>
      {slides.map((SlideComp, i) => <SlideComp key={i}/>)}
    </React.Fragment>
  );
});
```

Tutte le slide vivono in un solo React tree, niente DOM mutation post-render.

### 15. Il componente `TeX` deve renderizzare **sincronamente** durante render-phase

Il componente `TeX` in [components.jsx](project/components.jsx) usa `useMemo` + `katex.renderToString` + `dangerouslySetInnerHTML`, **non** `useRef` + `useEffect` + `katex.render`. Il pattern asincrono (effect-based) crea race condition con il mount delle slide e amplifica eventuali bug del reconciler.

```jsx
// Pattern corretto in TeX:
const html = useMemo(() => {
  if (!window.katex) return null;
  try { return window.katex.renderToString(String(children), {...}); }
  catch (e) { return null; }
}, [children, display]);
return <span dangerouslySetInnerHTML={{ __html: html }} data-tex-source={String(children)} />;
```

KaTeX viene caricato con `<script defer>` prima di Babel, quindi `window.katex` è già disponibile quando le slide renderizzano per la prima volta.

### 16. Non committare worktree Claude — `.claude/` deve restare in `.gitignore`

Le worktree Claude (`.claude/worktrees/...`) hanno un proprio `.git` file e, se trackate dalla repo principale, vengono interpretate da git come **submodule** senza URL associato. Conseguenza: il workflow `pages-build-deployment` di GitHub Actions fallisce con:

```
No url found for submodule path '.claude/worktrees/...' in .gitmodules
```

Mentre il workflow fallisce, GitHub Pages **non aggiorna** il sito — quindi qualsiasi modifica pushata non si vede live. La cartella `.claude/` è in `.gitignore`. Se per errore qualcuno committa di nuovo qualcosa sotto `.claude/`, fare:

```bash
git rm --cached -r .claude/
git commit -m "fix: untrack .claude/"
```
