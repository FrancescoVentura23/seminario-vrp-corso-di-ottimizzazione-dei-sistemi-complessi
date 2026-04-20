# Seminario VRP — Guida rapida

Deck HTML/CSS/JS esportato da Claude Design. **39 slide** gestite dal web component `<deck-stage>` in [project/deck-stage.js](project/deck-stage.js), montate da [project/vrp-seminar.html](project/vrp-seminar.html).

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

`Cmd+P` nel browser → *Salva come PDF*. Il CSS `@media print` in [project/deck-stage.js:230-265](project/deck-stage.js#L230-L265) impagina una slide per pagina alla dimensione autorizzata (1920×1080).

## Struttura della presentazione

Ogni section header è una slide con `className="section-slide"`. Per modificare titolo o numerazione di una sezione, cerca la funzione indicata nel file corrispondente.

| # | Slide | Funzione | File |
|---|-------|----------|------|
| 1 | Cover | `Slide01` | slides-a.jsx |
| 2 | **Part I — Introduction** *(section header)* | `SlideIntroSection` | slides-intro.jsx |
| 3 | History & origins | `SlideHistory` | slides-intro.jsx |
| 4 | Operations Research link | `SlideORLink` | slides-or.jsx |
| 5 | A problem you meet every day | `Slide02` | slides-a.jsx |
| 6 | The economic scale | `Slide03` | slides-a.jsx |
| 7 | Who uses VRP today | `SlideWhoUsesIt` | slides-intro.jsx |
| 8 | **Part II — Foundations** *(section header)* | `Slide05` | slides-a.jsx |
| 9 | Node | `SlideNode` | slides-intro.jsx |
| 10 | Node attributes (animated) | `SlideNodeAttributes` | slides-intro.jsx |
| 11 | Edge | `SlideEdge` | slides-intro.jsx |
| 12 | Simple graph | `SlideSimpleGraph` | slides-intro.jsx |
| 13 | Directed arc | `SlideDirectedArc` | slides-intro.jsx |
| 14 | Network | `SlideNetwork` | slides-intro.jsx |
| 15 | Anatomy of a routing problem | `Slide06` | slides-a.jsx |
| 16 | Road → complete graph | `Slide07` | slides-a.jsx |
| 17 | Graph notation | `Slide08` | slides-a.jsx |
| 18 | TSP | `Slide09` | slides-a.jsx |
| 19 | TSP → VRP | `Slide10` | slides-a.jsx |
| 20 | **Part III — CVRP** *(section header)* | `Slide11` | slides-a.jsx |
| 21 | CVRP informal definition | `Slide12` | slides-a.jsx |
| 22 | CVRP formal model | `Slide13` | slides-a.jsx |
| 23 | Valid inequality | `Slide14` | slides-a.jsx |
| 24 | CVRP example | `Slide15` | slides-a.jsx |
| 25 | **Part IV — Complexity** *(section header)* | `Slide16` | slides-b.jsx |
| 26 | NP-hardness & explosion | `Slide17` | slides-b.jsx |
| 27 | Why heuristics | `Slide18` | slides-b.jsx |
| 28 | **Part V — VRP family** *(section header)* | `Slide19` | slides-b.jsx |
| 29 | Taxonomy | `Slide20` | slides-b.jsx |
| 30 | VRPTW | `Slide21` | slides-b.jsx |
| 31 | Backhauls & PD | `Slide22` | slides-b.jsx |
| 32 | Multi-depot & open VRP | `Slide23` | slides-b.jsx |
| 33 | **Part VI — Live demo** *(section header)* | `Slide24` | slides-b.jsx |
| 34 | Clarke-Wright idea | `Slide25` | slides-b.jsx |
| 35 | Interactive demo | `Slide26` | slides-b.jsx |
| 36 | **Part VII — Applications** *(section header)* | `Slide27` | slides-b.jsx |
| 37 | Case studies | `Slide28` | slides-b.jsx |
| 38 | Takeaways | `Slide29` | slides-b.jsx |
| 39 | Closing / references | `Slide30` | slides-b.jsx |

> Per aggiungere o spostare una slide: modifica l'array `slides` in [project/vrp-seminar.html](project/vrp-seminar.html) (riga ~95) e aggiorna i range "Slides X — Y" nel section header corrispondente.

## File del progetto

- [project/vrp-seminar.html](project/vrp-seminar.html) — entry point, monta tutte le slide
- [project/deck-stage.js](project/deck-stage.js) — web component che gestisce navigazione e rendering
- [project/styles.css](project/styles.css) — stili condivisi
- [project/components.jsx](project/components.jsx) — componenti riutilizzabili
- [project/slides-intro.jsx](project/slides-intro.jsx) — slide intro + graph theory (node, node attributes, edge, simple graph, arc, network) + section header Intro
- [project/slides-or.jsx](project/slides-or.jsx) — slide Operations Research
- [project/slides-a.jsx](project/slides-a.jsx) — slide 1 e 5–22 (Cover, Foundations, CVRP)
- [project/slides-b.jsx](project/slides-b.jsx) — slide 23–37 (Complexity, Family, Demo, Applications)
- [project/demo.jsx](project/demo.jsx) — demo interattiva Clarke-Wright (`ClarkeWrightDemo`)
