/* =========================================================================
   Clarke-Wright Savings — interactive step-by-step demo
   ========================================================================= */

const { useState: cwUseState, useMemo: cwUseMemo, useEffect: cwUseEffect, useRef: cwUseRef } = React;

// Fixed demo instance — hand-placed for visual clarity
const CW_DEPOT = { x: 420, y: 320, id: 0 };
const CW_CUSTOMERS = [
  { id: 1, x: 220, y: 180, demand: 4 },
  { id: 2, x: 300, y: 120, demand: 3 },
  { id: 3, x: 540, y: 110, demand: 2 },
  { id: 4, x: 660, y: 180, demand: 5 },
  { id: 5, x: 720, y: 340, demand: 3 },
  { id: 6, x: 640, y: 480, demand: 4 },
  { id: 7, x: 440, y: 520, demand: 2 },
  { id: 8, x: 240, y: 490, demand: 3 },
  { id: 9, x: 140, y: 350, demand: 4 },
];
const CW_CAPACITY = 10;

const cwDist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// Precompute savings list s(i,j) = c(0,i) + c(0,j) - c(i,j), sorted desc
function computeSavings(depot, custs) {
  const list = [];
  for (let i = 0; i < custs.length; i++) {
    for (let j = i + 1; j < custs.length; j++) {
      const a = custs[i], b = custs[j];
      const s = cwDist(depot, a) + cwDist(depot, b) - cwDist(a, b);
      list.push({ i: a.id, j: b.id, s });
    }
  }
  list.sort((x, y) => y.s - x.s);
  return list;
}

// Simulate Clarke-Wright merges up to `step` savings processed
function cwSimulate(savings, capacity, custs, step) {
  // Each customer starts as its own route [0, i, 0]; represent as list of customers.
  const routeOfCust = new Map();     // custId -> routeIdx
  const routes = custs.map(c => {
    const r = { id: c.id, custs: [c.id], load: c.demand, head: c.id, tail: c.id };
    routeOfCust.set(c.id, r);
    return r;
  });
  const events = [];
  let considered = 0;
  for (let k = 0; k < savings.length && considered < step; k++) {
    const { i, j, s } = savings[k];
    considered++;
    if (s <= 0) continue;
    const ri = routeOfCust.get(i);
    const rj = routeOfCust.get(j);
    if (!ri || !rj || ri === rj) continue;
    // i must be at the end of ri, j at start of rj (or vice versa)
    const iAtEnd   = ri.tail === i;
    const iAtHead  = ri.head === i;
    const jAtEnd   = rj.tail === j;
    const jAtHead  = rj.head === j;
    if (!((iAtEnd || iAtHead) && (jAtEnd || jAtHead))) continue;
    if (ri.load + rj.load > capacity) continue;
    // Merge so the interior edge becomes (i, j)
    let newList;
    if (iAtEnd && jAtHead)         newList = [...ri.custs, ...rj.custs];
    else if (iAtEnd && jAtEnd)     newList = [...ri.custs, ...rj.custs.slice().reverse()];
    else if (iAtHead && jAtHead)   newList = [...ri.custs.slice().reverse(), ...rj.custs];
    else                            newList = [...rj.custs, ...ri.custs];
    ri.custs = newList;
    ri.load  = ri.load + rj.load;
    ri.head  = newList[0];
    ri.tail  = newList[newList.length - 1];
    // remap j side
    for (const c of rj.custs) routeOfCust.set(c, ri);
    rj.custs = [];
    events.push({ step: considered, type: "merge", i, j, s });
  }
  return {
    routes: routes.filter(r => r.custs.length > 0),
    considered,
    lastEvent: events[events.length - 1] || null,
  };
}

function totalCost(depot, custMap, routes) {
  let C = 0;
  for (const r of routes) {
    let prev = depot;
    for (const cid of r.custs) { const c = custMap.get(cid); C += cwDist(prev, c); prev = c; }
    C += cwDist(prev, depot);
  }
  return C;
}

function ClarkeWrightDemo() {
  const custMap = cwUseMemo(() => new Map(CW_CUSTOMERS.map(c => [c.id, c])), []);
  const savings = cwUseMemo(() => computeSavings(CW_DEPOT, CW_CUSTOMERS), []);
  const maxSteps = savings.length;

  const [step, setStep] = cwUseState(0);
  const [playing, setPlaying] = cwUseState(false);

  cwUseEffect(() => {
    if (!playing) return;
    if (step >= maxSteps) { setPlaying(false); return; }
    const t = setTimeout(() => setStep(s => s + 1), 520);
    return () => clearTimeout(t);
  }, [playing, step, maxSteps]);

  const sim = cwUseMemo(() => cwSimulate(savings, CW_CAPACITY, CW_CUSTOMERS, step), [savings, step]);
  const cost = cwUseMemo(() => totalCost(CW_DEPOT, custMap, sim.routes), [sim, custMap]);

  // Colors by route index
  const routeColors = ["var(--route-1)","var(--route-2)","var(--route-3)","var(--route-4)","var(--route-5)"];

  // Highlight last merge edge
  const hl = sim.lastEvent;

  // Savings table (top-N around current pointer)
  const topN = 8;
  const windowStart = Math.max(0, Math.min(step - 2, maxSteps - topN));
  const windowEnd   = Math.min(maxSteps, windowStart + topN);
  const windowRows  = savings.slice(windowStart, windowEnd);

  const reset = () => { setStep(0); setPlaying(false); };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 40, width: "100%", height: "100%" }}>
      {/* LEFT — graph */}
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", position: "relative", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--ink-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          <span>Capacity C = {CW_CAPACITY}</span>
          <span>Routes: {sim.routes.length}</span>
          <span>Total cost: {cost.toFixed(0)}</span>
        </div>
        <div style={{ flex: 1, padding: 20 }}>
          <svg viewBox="0 0 840 600" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
            {/* Spokes from depot for initial routes */}
            {sim.routes.filter(r => r.custs.length === 1).map(r => {
              const c = custMap.get(r.custs[0]);
              return <line key={`spoke-${r.id}`} x1={CW_DEPOT.x} y1={CW_DEPOT.y} x2={c.x} y2={c.y}
                           stroke="var(--ink-3)" strokeWidth={2} strokeDasharray="4 5" opacity={0.55} />;
            })}

            {/* Merged routes — solid colored polyline (bodies first) */}
            {sim.routes.filter(r => r.custs.length > 1).map((r, ri) => {
              const pts = [CW_DEPOT, ...r.custs.map(id => custMap.get(id)), CW_DEPOT]
                .map(p => `${p.x},${p.y}`).join(" ");
              return <polyline key={`r-${ri}`} points={pts} fill="none"
                               stroke={routeColors[ri % routeColors.length]}
                               strokeWidth={4.2} strokeLinejoin="round" strokeLinecap="round" />;
            })}

            {/* Arrowheads on merged routes — drawn after every body so they
                sit on top. Spokes (dashed round-trips for unmerged customers)
                stay un-arrowed: they are not directional traversals. back=18
                clears node r=14 and depot half-side=16. */}
            {sim.routes.filter(r => r.custs.length > 1).flatMap((r, ri) => {
              const nodes = [CW_DEPOT, ...r.custs.map(id => custMap.get(id)), CW_DEPOT];
              const color = routeColors[ri % routeColors.length];
              return nodes.slice(0, -1).map((a, i) => {
                const b = nodes[i+1];
                const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
                if (L < 1) return null;
                const ux = dx / L, uy = dy / L;
                const back = 18, aw = 7, al = 14;
                const tipX = b.x - ux * back, tipY = b.y - uy * back;
                const bx = tipX - ux * al, by = tipY - uy * al;
                const pts = `${tipX.toFixed(1)},${tipY.toFixed(1)} ${(bx-uy*aw).toFixed(1)},${(by+ux*aw).toFixed(1)} ${(bx+uy*aw).toFixed(1)},${(by-ux*aw).toFixed(1)}`;
                return <polygon key={`arr-${ri}-${i}`} points={pts} fill={color}/>;
              }).filter(Boolean);
            })}

            {/* Highlight last merge edge */}
            {hl && (() => {
              const a = custMap.get(hl.i), b = custMap.get(hl.j);
              return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                           stroke="var(--accent-2)" strokeWidth={8} opacity={0.35} strokeLinecap="round" />;
            })()}

            {/* Depot */}
            <rect x={CW_DEPOT.x - 16} y={CW_DEPOT.y - 16} width={32} height={32} fill="var(--depot)" />
            <rect x={CW_DEPOT.x - 20} y={CW_DEPOT.y - 20} width={40} height={40} fill="none" stroke="var(--depot)" strokeWidth={1.5} />
            <text x={CW_DEPOT.x} y={CW_DEPOT.y + 42} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)" letterSpacing="0.05em">DEPOT</text>

            {/* Customers */}
            {CW_CUSTOMERS.map(c => (
              <g key={c.id}>
                <circle cx={c.x} cy={c.y} r={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.2} />
                <text x={c.x} y={c.y + 5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink)" fontWeight={600}>{c.demand}</text>
                <text x={c.x} y={c.y - 22} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)">c{c.id}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* RIGHT — savings list & controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 8 }}>Savings list</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--ink-2)" }}>
            s(i,j) = c(0,i) + c(0,j) − c(i,j)
          </div>
        </div>

        <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: 24 }}>
            <thead>
              <tr style={{ color: "var(--ink-3)", fontSize: 19, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <th style={{ textAlign: "left", padding: "6px 10px" }}>#</th>
                <th style={{ textAlign: "left", padding: "6px 10px" }}>i, j</th>
                <th style={{ textAlign: "right", padding: "6px 10px" }}>s(i,j)</th>
                <th style={{ textAlign: "center", padding: "6px 10px" }}>status</th>
              </tr>
            </thead>
            <tbody>
              {windowRows.map((row, k) => {
                const idx = windowStart + k + 1;
                const isCur = idx === step;
                const isDone = idx < step;
                return (
                  <tr key={idx} style={{
                    background: isCur ? "var(--accent)" : "transparent",
                    color: isCur ? "white" : (isDone ? "var(--ink-3)" : "var(--ink)"),
                  }}>
                    <td style={{ padding: "7px 10px" }}>{String(idx).padStart(2,"0")}</td>
                    <td style={{ padding: "7px 10px" }}>({row.i}, {row.j})</td>
                    <td style={{ padding: "7px 10px", textAlign: "right" }}>{row.s.toFixed(1)}</td>
                    <td style={{ padding: "7px 10px", textAlign: "center" }}>
                      {isCur ? "▶ eval" : isDone ? "done" : "queued"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))}
                  style={cwBtn}>◀ step</button>
          <button onClick={() => setStep(s => Math.min(maxSteps, s + 1))}
                  style={cwBtn}>step ▶</button>
          <button onClick={() => setPlaying(p => !p)} style={{...cwBtn, background: playing ? "var(--ink)" : "var(--accent)", color: "white", borderColor: "transparent"}}>
            {playing ? "❚❚ pause" : "▶ auto"}
          </button>
          <button onClick={reset} style={cwBtn}>reset</button>
          <div style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 23, color: "var(--ink-3)" }}>
            {step} / {maxSteps}
          </div>
        </div>

        {/* Current action */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 23, color: "var(--ink-2)", lineHeight: 1.4, minHeight: 64, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
          {step === 0 ? (
            <>Initial state: every customer is served by a dedicated round-trip from the depot.</>
          ) : hl ? (
            <>Merged routes containing <b>c{hl.i}</b> and <b>c{hl.j}</b> — saving <b>{hl.s.toFixed(1)}</b>. New load fits within capacity.</>
          ) : (
            <>Pair skipped: merge infeasible (capacity exceeded or endpoints not free).</>
          )}
        </div>
      </div>
    </div>
  );
}

const cwBtn = {
  appearance: "none",
  background: "var(--paper)",
  border: "1px solid var(--ink)",
  color: "var(--ink)",
  fontFamily: "var(--font-mono)",
  fontSize: 22,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  padding: "8px 13px",
  cursor: "pointer",
};

window.ClarkeWrightDemo = ClarkeWrightDemo;
