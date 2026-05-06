/* =========================================================================
   VRP Seminar — Reusable visual components
   Exposes globals on window.
   ========================================================================= */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// -----------------------------------------------------------
// LaTeX rendering via KaTeX (loaded globally from CDN)
// -----------------------------------------------------------
function TeX({ children, display = false, className = "" }) {
  // Synchronous render via katex.renderToString + dangerouslySetInnerHTML.
  // The previous useEffect-based approach raced across React 18 roots
  // (mountDeck creates a fresh root per slide and moves the section into
  // <deck-stage>): TeX expressions from one slide leaked into the spans of
  // another. Rendering during React's render phase keeps each TeX bound to
  // its own JSX tree.
  const html = useMemo(() => {
    if (!window.katex) return null;
    try {
      return window.katex.renderToString(String(children), {
        displayMode: display,
        throwOnError: false,
        output: "html",
      });
    } catch (e) {
      return null;
    }
  }, [children, display]);

  if (html === null) {
    return <span className={className} data-tex-source={String(children)}>{String(children)}</span>;
  }
  return <span className={className} data-tex-source={String(children)} dangerouslySetInnerHTML={{ __html: html }} />;
}

// -----------------------------------------------------------
// SlideFrame — standard chrome: tag + page number + title row
// -----------------------------------------------------------
function SlideFrame({ tag, pageNumber, totalPages = 35, children, style }) {
  return (
    <>
      {children}
      <div className="slide-chrome">
        <div className="left">
          <span>OCS 2025–26</span>
          <span>·</span>
          <span>VRP Seminar</span>
        </div>
        <div className="pg" data-chrome-pg>{String(totalPages).padStart(2, "0")}</div>
      </div>
    </>
  );
}

// -----------------------------------------------------------
// VRPGraph — animated depot+customers+routes SVG
// Props:
//   nodes: [{x,y,id,demand?}]  -- first node is depot
//   routes: [[ids...], ...]     -- each route returns to depot implicitly
//   showDemand, showLabels, animated, width, height
// -----------------------------------------------------------
function VRPGraph({
  nodes,
  routes = [],
  width = 800,
  height = 560,
  showLabels = false,
  showDemand = false,
  showEdges = false,  // show dashed "all possible edges"
  edgeOpacity = 0.12,
  nodeRadius = 12,
  depotRadius = 18,
  strokeWidth = 3.2,
  animated = true,
  className = "",
  routeColors,
  labelFontSize = 16,
  viewBoxOverride,
  // Show oriented arrowheads at the end of every segment of every route.
  // Default off so existing callers (cover, VRP elements, Slide09) stay
  // unchanged. Slides that want directed arcs (Slide10, Slide10B) opt in.
  showArrows = false,
  // Duration of the body draw animation in ms — used to scale per-segment
  // arrowhead fade-in delays so each arrow appears as the body reaches
  // its endpoint. Default 1200ms matches `.anim-draw` in styles.css;
  // hamilton-slow callers (Slide10) override to 4500ms.
  bodyAnimMs = 1200,
  // Per-route cascade start delays in ms — must match the CSS anim-draw-N
  // delays for this graph's className wrapper. Defaults mirror the global
  // [150, 450, 750, 1000] values in styles.css.
  cascadeDelays = [150, 450, 750, 1000],
  // When true, segments whose reverse counterpart also appears in any route
  // are drawn as slight quadratic-bezier curves so the two directions
  // separate visually instead of overlapping. Opt-in only.
  curveBidirectional = false,
  curveAmount = 28,
}) {
  const colors = routeColors || [
    "var(--route-1)", "var(--route-2)", "var(--route-3)",
    "var(--route-4)", "var(--route-5)"
  ];
  const depot = nodes[0];

  // Bidirectional pair detection — used when curveBidirectional is on.
  // dirSegSet holds every directed "fromId:toId" present across all routes.
  // isBidir(a,b) returns true when both a→b and b→a appear somewhere.
  const dirSegSet = useMemo(() => {
    if (!curveBidirectional) return null;
    const s = new Set();
    routes.forEach(route => {
      const ids = [0, ...route, 0];
      for (let i = 1; i < ids.length; i++) s.add(`${ids[i-1]}:${ids[i]}`);
    });
    return s;
  }, [curveBidirectional, routes]);
  const isBidir = (a, b) => !!dirSegSet && dirSegSet.has(`${a}:${b}`) && dirSegSet.has(`${b}:${a}`);

  // Build SVG path `d` for a route. Bidirectional segments get a slight
  // left-hand quadratic bezier so paired reverse arcs don't overlap.
  // When curveBidirectional=false, isBidir is always false and all
  // segments use L commands — identical to the old <polyline> behaviour.
  const pathDataFor = (route) => {
    const ids = [0, ...route, 0];
    const n0 = nodes[ids[0]];
    let d = `M ${n0.x} ${n0.y}`;
    for (let i = 1; i < ids.length; i++) {
      const a = nodes[ids[i-1]], b = nodes[ids[i]];
      if (isBidir(ids[i-1], ids[i])) {
        const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        // Control point offset perpendicular to the left of the arc direction
        const cpx = mx - (dy / L) * curveAmount;
        const cpy = my + (dx / L) * curveAmount;
        d += ` Q ${cpx.toFixed(1)},${cpy.toFixed(1)} ${b.x},${b.y}`;
      } else {
        d += ` L ${b.x},${b.y}`;
      }
    }
    return d;
  };

  // For length estimation for dasharray
  const approxLen = (route) => {
    const ids = [0, ...route, 0];
    let L = 0;
    for (let i = 1; i < ids.length; i++) {
      const a = nodes[ids[i-1]], b = nodes[ids[i]];
      L += Math.hypot(a.x - b.x, a.y - b.y);
    }
    return L;
  };

  return (
    <svg viewBox={viewBoxOverride || `0 0 ${width} ${height}`} className={className}
         style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
      {/* All possible edges (complete graph) — dashed, subtle */}
      {showEdges && nodes.map((a, i) =>
        nodes.slice(i+1).map((b, j) => (
          <line key={`e-${i}-${i+1+j}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="var(--ink-3)" strokeOpacity={edgeOpacity}
                strokeDasharray="3 5" strokeWidth={1} />
        ))
      )}

      {/* Routes — bodies. CLAUDE.md gotcha #10: bodies first, arrowheads
          second, in two separate .map() blocks (never interleaved). */}
      {routes.map((route, ri) => {
        const len = approxLen(route);
        return (
          <path
            key={`r-${ri}`}
            d={pathDataFor(route)}
            fill="none"
            stroke={colors[ri % colors.length]}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            className={animated ? `anim-draw anim-draw-${Math.min(ri+1,4)}` : ""}
            style={{ "--len": len }}
          />
        );
      })}

      {/* Routes — arrowheads (per gotcha #10, second separate .map()).
          Each segment gets a small filled triangle at its destination,
          retracted clear of the node circle / depot square. Per-segment
          fade-in delay = cascade-delay-of-this-route + (cumLen/totalLen)
          * bodyAnimMs, so the arrow lands exactly when the body draw
          reaches that endpoint. */}
      {showArrows && routes.map((route, ri) => {
        const ids = [0, ...route, 0];
        const segs = [];
        let cum = 0;
        for (let i = 1; i < ids.length; i++) {
          const a = nodes[ids[i-1]], b = nodes[ids[i]];
          const dx = b.x - a.x, dy = b.y - a.y;
          const L = Math.hypot(dx, dy);
          cum += L;
          // Tangent direction at endpoint b: for a curved (bidirectional) segment
          // the tangent is the direction from the bezier control point to b, not
          // the chord direction, so the arrowhead aligns with the actual arc.
          let ux = dx / L, uy = dy / L;
          if (isBidir(ids[i-1], ids[i])) {
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
            const cpx = mx - (dy / L) * curveAmount;
            const cpy = my + (dx / L) * curveAmount;
            const tdx = b.x - cpx, tdy = b.y - cpy;
            const tL = Math.hypot(tdx, tdy);
            ux = tdx / tL; uy = tdy / tL;
          }
          segs.push({ b, ux, uy, L, cum, endIsDepot: ids[i] === 0 });
        }
        const totalLen = cum || 1;
        // Match the cascading delays of .anim-draw-1..4 (or caller-supplied override).
        const cascadeDelay = animated ? (cascadeDelays[Math.min(ri, cascadeDelays.length - 1)] ?? 0) : 0;
        const color = colors[ri % colors.length];
        // Arrowhead size scales loosely with strokeWidth so it stays
        // visually proportional across slides.
        const aw = Math.max(5, strokeWidth * 1.7);
        const al = Math.max(10, strokeWidth * 3.4);
        return segs.map((s, i) => {
          const { ux, uy } = s;
          const retract = (s.endIsDepot ? depotRadius : nodeRadius) + 4;
          const tipX = s.b.x - ux * retract;
          const tipY = s.b.y - uy * retract;
          const baseX = tipX - ux * al;
          const baseY = tipY - uy * al;
          const pts = `${tipX.toFixed(2)},${tipY.toFixed(2)} ` +
                      `${(baseX - uy*aw).toFixed(2)},${(baseY + ux*aw).toFixed(2)} ` +
                      `${(baseX + uy*aw).toFixed(2)},${(baseY - ux*aw).toFixed(2)}`;
          const appearDelay = animated
            ? Math.round(cascadeDelay + (s.cum / totalLen) * bodyAnimMs)
            : 0;
          return (
            <polygon
              key={`arr-${ri}-${i}`}
              points={pts}
              fill={color}
              className={animated ? "anim-appear" : ""}
              style={animated ? { "--appear-delay": `${appearDelay}ms` } : undefined}
            />
          );
        });
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isDepot = i === 0;
        return (
          <g key={`n-${i}`}>
            {isDepot ? (
              <>
                <rect x={n.x - depotRadius} y={n.y - depotRadius}
                      width={depotRadius*2} height={depotRadius*2}
                      fill="var(--depot)" rx={2} />
                <rect x={n.x - depotRadius - 4} y={n.y - depotRadius - 4}
                      width={depotRadius*2 + 8} height={depotRadius*2 + 8}
                      fill="none" stroke="var(--depot)" strokeWidth={1.5} rx={2} />
              </>
            ) : (
              <circle cx={n.x} cy={n.y} r={nodeRadius}
                      fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.2} />
            )}
            {showLabels && (
              <text x={n.x} y={isDepot ? n.y + depotRadius + 18 : n.y + labelFontSize * 0.38}
                    fontFamily="var(--font-mono)" fontSize={labelFontSize}
                    textAnchor="middle" fill={isDepot ? "var(--ink-3)" : "var(--ink)"}
                    fontWeight={isDepot ? 400 : 600}
                    style={{ letterSpacing: "0.04em" }}>
                {isDepot ? "DEPOT" : (n.label || `v${i}`)}
              </text>
            )}
            {showDemand && !isDepot && n.demand != null && (
              <text x={n.x} y={n.y + 5} fontFamily="var(--font-mono)"
                    fontSize={labelFontSize - 2} textAnchor="middle"
                    fill="var(--ink)" fontWeight={600}>
                {n.demand}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Generate a pleasant deterministic set of customers around a depot
function makeInstance(n, { seed = 7, w = 800, h = 560, padding = 60 } = {}) {
  // simple LCG
  let s = seed;
  const rand = () => { s = (s * 1664525 + 1013904223) >>> 0; return (s >>> 0) / 4294967296; };
  const nodes = [{ x: w / 2, y: h / 2, id: 0 }];
  for (let i = 1; i <= n; i++) {
    const angle = rand() * Math.PI * 2;
    const r = padding + rand() * (Math.min(w, h) / 2 - padding);
    nodes.push({
      x: Math.round(w / 2 + Math.cos(angle) * r),
      y: Math.round(h / 2 + Math.sin(angle) * r),
      id: i,
      demand: 1 + Math.floor(rand() * 9),
    });
  }
  return nodes;
}

// -----------------------------------------------------------
// BigNumber — for stats slides
// -----------------------------------------------------------
function BigNumber({ value, label, sub, size = 180 }) {
  return (
    <div className="stat">
      <div className="num" style={{ fontSize: size }}>{value}</div>
      {label && <div className="lbl">{label}</div>}
      {sub && <div className="body small" style={{ color: "var(--ink-3)", maxWidth: 420 }}>{sub}</div>}
    </div>
  );
}

// -----------------------------------------------------------
// Shared example instance — used by several slides (cover, VRP
// elements, TSP, CVRP). Kept here so slide files can stay
// independent of each other.
// -----------------------------------------------------------
const EX_NODES = (() => {
  const depot = { x: 420, y: 300, id: 0 };
  const custs = [
    { x: 220, y: 170, demand: 4 }, { x: 330, y: 110, demand: 3 },
    { x: 540, y: 110, demand: 2 }, { x: 680, y: 180, demand: 5 },
    { x: 730, y: 330, demand: 3 }, { x: 640, y: 470, demand: 4 },
    { x: 460, y: 510, demand: 2 }, { x: 240, y: 480, demand: 3 },
    { x: 140, y: 350, demand: 4 }, { x: 290, y: 260, demand: 2 },
    { x: 570, y: 260, demand: 3 }, { x: 520, y: 420, demand: 2 },
  ];
  return [depot, ...custs.map((c, i) => ({ ...c, id: i + 1 }))];
})();

const EX_ROUTES = [
  [9, 1, 2, 10],       // route 1
  [3, 4, 5, 11],       // route 2
  [6, 7, 12],          // route 3
  [8],                 // route 4 (single)
];

// -----------------------------------------------------------
// Superscript rendering helpers
// -----------------------------------------------------------
// Unicode superscript chars come from two different Unicode blocks:
//   ¹²³  → Latin-1 Supplement (U+00B9/B2/B3)
//   ⁰⁴–⁹ → Number Forms (U+2070–2079)
// In monospace fonts these blocks have different baselines, so a
// multi-digit exponent like "10¹⁵" shows ¹ higher than ⁵.
// These helpers convert every consecutive run of superscript chars
// into a real <sup> (HTML) or <tspan dy> (SVG) element.

const _SUP_MAP = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','ⁿ':'n'};

// HTML version — wraps exponent runs in <sup>.
// Safe to call on strings with no superscript chars (returns original).
function renderNum(s) {
  const out = [];
  let base = '', exp = '', key = 0;
  for (const ch of String(s)) {
    if (ch in _SUP_MAP) { if (base) { out.push(base); base = ''; } exp += _SUP_MAP[ch]; }
    else                { if (exp)  { out.push(<sup key={key++}>{exp}</sup>); exp = ''; } base += ch; }
  }
  if (exp)  out.push(<sup key={key++}>{exp}</sup>);
  if (base) out.push(base);
  return out.length === 0 ? s : out.length === 1 && typeof out[0] === 'string' ? s : out;
}

// SVG version — wraps exponent runs in <tspan dy/fontSize>.
// Use inside SVG <text> elements where <sup> is not valid.
function renderNumSVG(s, supSize = 11, supDy = -5) {
  const out = [];
  let base = '', exp = '', key = 0;
  for (const ch of String(s)) {
    if (ch in _SUP_MAP) { if (base) { out.push(<tspan key={key++}>{base}</tspan>); base = ''; } exp += _SUP_MAP[ch]; }
    else                { if (exp)  { out.push(<tspan key={key++} dy={supDy} fontSize={supSize}>{exp}</tspan>, <tspan key={key++} dy={-supDy}/>); exp = ''; } base += ch; }
  }
  if (exp)  { out.push(<tspan key={key++} dy={supDy} fontSize={supSize}>{exp}</tspan>, <tspan key={key++} dy={-supDy}/>); }
  if (base) out.push(<tspan key={key++}>{base}</tspan>);
  return out.length === 0 ? s : out;
}

// -----------------------------------------------------------
// Export to window
// -----------------------------------------------------------
Object.assign(window, {
  TeX, SlideFrame, VRPGraph, BigNumber, makeInstance,
  EX_NODES, EX_ROUTES,
  renderNum, renderNumSVG,
});
