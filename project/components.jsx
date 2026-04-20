/* =========================================================================
   VRP Seminar — Reusable visual components
   Exposes globals on window.
   ========================================================================= */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// -----------------------------------------------------------
// LaTeX rendering via KaTeX (loaded globally from CDN)
// -----------------------------------------------------------
function TeX({ children, display = false, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.katex || !ref.current) return;
    try {
      window.katex.render(String(children), ref.current, {
        displayMode: display,
        throwOnError: false,
        output: "html",
      });
    } catch (e) { /* ignore */ }
  }, [children, display]);
  return <span ref={ref} className={className} />;
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
}) {
  const colors = routeColors || [
    "var(--route-1)", "var(--route-2)", "var(--route-3)",
    "var(--route-4)", "var(--route-5)"
  ];
  const depot = nodes[0];

  // Build route polyline points
  const polylineFor = (route) => {
    const ids = [0, ...route, 0];
    return ids.map(i => `${nodes[i].x},${nodes[i].y}`).join(" ");
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

      {/* Routes */}
      {routes.map((route, ri) => {
        const len = approxLen(route);
        return (
          <polyline
            key={`r-${ri}`}
            points={polylineFor(route)}
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
// Export to window
// -----------------------------------------------------------
Object.assign(window, {
  TeX, SlideFrame, VRPGraph, BigNumber, makeInstance,
});
