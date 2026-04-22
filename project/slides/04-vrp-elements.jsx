/* =========================================================================
   VRP Seminar — Part III: VRP elements
   Slides: section header, Anatomy of a routing problem,
           Road -> complete graph, Graph notation
   ========================================================================= */

function SlideVRPElementsSection() {
  return (
    <section className="slide section-slide" data-label="Part III — VRP elements">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part III of IX</div>
        <div>Slides 18 — 20</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Three</div>
        <div className="hero" style={{ fontSize: 240 }}>VRP elements</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          The ingredients of every routing problem — road graph, customers, depot, vehicles — and the TSP as their common ancestor.
        </div>
      </div>
    </section>
  );
}


function Slide06() {
  const ic = { fill: "none", stroke: "var(--accent)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const parts = [
    {
      k: "Road network", d: "Graph of streets & junctions; arcs carry cost and travel time.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} {...ic}>
          <circle cx={10} cy={10} r={5}/><circle cx={38} cy={10} r={5}/><circle cx={24} cy={40} r={5}/>
          <line x1={15} y1={10} x2={33} y2={10}/>
          <line x1={12} y1={14} x2={22} y2={36}/>
          <line x1={36} y1={14} x2={26} y2={36}/>
        </svg>
      ),
    },
    {
      k: "Customers", d: "Located at vertices; have demand, service time, possible time windows.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} {...ic}>
          <path d="M24 44 C24 44 8 30 8 18 C8 10.3 15.2 4 24 4 C32.8 4 40 10.3 40 18 C40 30 24 44 24 44Z"/>
          <circle cx={24} cy={18} r={6}/>
        </svg>
      ),
    },
    {
      k: "Depots", d: "Origin/destination of routes; hold the vehicle fleet.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} {...ic}>
          <path d="M4 22 L24 6 L44 22"/>
          <rect x={8} y={22} width={32} height={20} rx={1}/>
          <rect x={19} y={30} width={10} height={12}/>
        </svg>
      ),
    },
    {
      k: "Vehicles", d: "Capacity, costs, allowed arcs. Homogeneous or heterogeneous fleet.",
      icon: (
        <svg viewBox="0 0 52 48" width={56} height={52} {...ic}>
          <rect x={2} y={12} width={26} height={22} rx={2}/>
          <path d="M28 16 L28 34 L48 34 L48 24 L40 16 Z"/>
          <circle cx={10} cy={38} r={4}/><circle cx={38} cy={38} r={4}/>
          <line x1={14} y1={34} x2={34} y2={34}/>
          <line x1={28} y1={24} x2={48} y2={24}/>
        </svg>
      ),
    },
    {
      k: "Drivers", d: "Working hours, breaks — usually absorbed into vehicle constraints.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx={24} cy={9} r={6}/>
          {/* Shoulders */}
          <path d="M10 24 Q10 17 24 17 Q38 17 38 24"/>
          {/* Steering wheel rim */}
          <circle cx={24} cy={36} r={10}/>
          {/* Hub */}
          <circle cx={24} cy={36} r={2.5} fill="var(--accent)"/>
          {/* 3 spokes */}
          <line x1={24} y1={26} x2={24} y2={33.5}/>
          <line x1={15.3} y1={41} x2={21.3} y2={37.2}/>
          <line x1={32.7} y1={41} x2={26.7} y2={37.2}/>
        </svg>
      ),
    },
    {
      k: "Objective", d: "Minimise total cost, number of vehicles, or a weighted combination.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer frame */}
          <rect x={3} y={3} width={42} height={42} rx={3} stroke="var(--accent)" strokeWidth={1.5}/>
          {/* "min" label */}
          <text x={24} y={18} textAnchor="middle" fontSize={11} fontFamily="monospace" fill="var(--accent)" letterSpacing="1.5">min</text>
          {/* Separator */}
          <line x1={7} y1={22} x2={41} y2={22} stroke="var(--accent)" strokeWidth={1}/>
          {/* Dollar sign */}
          <text x={13} y={39} textAnchor="middle" fontSize={15} fontFamily="serif" fill="var(--accent)">$</text>
          {/* Clock */}
          <circle cx={24} cy={34} r={5} stroke="var(--accent)" strokeWidth={1.5}/>
          <line x1={24} y1={30} x2={24} y2={34} stroke="var(--accent)" strokeWidth={1.5}/>
          <line x1={24} y1={34} x2={27} y2={34} stroke="var(--accent)" strokeWidth={1.5}/>
          {/* Mini truck */}
          <rect x={33} y={30} width={10} height={7} rx={1} stroke="var(--accent)" strokeWidth={1.5}/>
          <circle cx={35} cy={38.5} r={2} stroke="var(--accent)" strokeWidth={1.5}/>
          <circle cx={41} cy={38.5} r={2} stroke="var(--accent)" strokeWidth={1.5}/>
        </svg>
      ),
    },
  ];
  return (
    <section className="slide" data-label="Anatomy of a routing problem">
      <SlideFrame>
        <div className="tag">VRP elements</div>
        <h2 className="title" style={{ marginTop: 28 }}>The anatomy of a routing problem.</h2>
        <div className="body" style={{ marginTop: 28, color: "var(--ink-3)", maxWidth: 1300 }}>
          Every VRP instance is built from the same six components. Different variants just tune which constraints apply to each.
        </div>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {parts.map((p, i) => (
            <div key={i} style={{
              padding: "28px 32px 32px", minHeight: 250,
              borderRight: (i % 3 !== 2) ? "1px solid var(--line)" : "none",
              borderBottom: i < 3 ? "1px solid var(--line)" : "none",
              background: "var(--paper-2)",
            }}>
              {p.icon}
              <div className="kicker" style={{ fontSize: 22, color: "var(--accent)", marginTop: 12 }}>0{i+1}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 38, marginTop: 6, lineHeight: 1 }}>{p.k}</div>
              <div className="body small" style={{ marginTop: 12, color: "var(--ink-3)" }}>{p.d}</div>
            </div>
          ))}
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide07() {
  const [phase, setPhase] = React.useState(0); // 0=road, 1=animating
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);
  const btnRef = React.useRef(null);

  // Reset to static road view whenever the slide becomes active
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) { setPhase(0); setAnimKey(k => k + 1); }
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // Native click: React event delegation breaks after section is moved in the DOM
  React.useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const handler = () => { setPhase(1); setAnimKey(k => k + 1); };
    btn.addEventListener('click', handler);
    return () => btn.removeEventListener('click', handler);
  }, []);

  const roadNodes = [
    { x: 400, y: 170 },  // 0  C₁
    { x: 560, y: 115 },  // 1  junction
    { x: 730, y: 155 },  // 2  C₂
    { x: 900, y: 130 },  // 3  junction
    { x: 990, y: 265 },  // 4  C₃
    { x: 1060, y: 390 }, // 5  junction
    { x: 910, y: 480 },  // 6  C₄
    { x: 720, y: 520 },  // 7  junction
    { x: 535, y: 490 },  // 8  C₅
    { x: 360, y: 375 },  // 9  junction
    { x: 510, y: 285 },  // 10 junction
    { x: 740, y: 330 },  // 11 junction
  ];
  const roadEdges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],
    [0,10],[1,10],[2,11],[4,11],[5,11],[7,11],[10,11],[10,8],[11,6],
  ];
  const customers  = [0, 2, 4, 6, 8];
  const custLabels = ["C₁","C₂","C₃","C₄","C₅"];
  const hlEdgeSet  = new Set(["0-1","1-2"]); // path C₁ → junction → C₂

  // Timing for phase-1 animation (ms)
  const DUR        = 12000;
  const T_DRAW1    = 800;   // C₁→junc arc turns blue
  const T_DRAW2    = 2000;  // junc→C₂ arc turns blue (after first finishes)
  const T_CALLOUT  = 3400;  // callout "shortest path C₁→C₂" appears
  const T_REPLACE1 = 4800;  // path arcs replaced by direct C₁→C₂ edge; cost label appears
  const T_COLLAPSE = 6500;  // rest of road collapses; all remaining complete-graph edges draw in
  const T_GONE     = 8800;  // everything road-related fully gone

  const pD1    = (T_DRAW1/DUR*100).toFixed(1),       pD1e   = ((T_DRAW1+900)/DUR*100).toFixed(1);
  const pD2    = (T_DRAW2/DUR*100).toFixed(1),       pD2e   = ((T_DRAW2+900)/DUR*100).toFixed(1);
  const pCout  = (T_CALLOUT/DUR*100).toFixed(1),     pCoute = ((T_CALLOUT+700)/DUR*100).toFixed(1);
  const pRepl  = (T_REPLACE1/DUR*100).toFixed(1),    pReple = ((T_REPLACE1+900)/DUR*100).toFixed(1);
  const pColl  = (T_COLLAPSE/DUR*100).toFixed(1),    pGone  = (T_GONE/DUR*100).toFixed(1);
  const pCostEnd = ((T_REPLACE1+1200)/DUR*100).toFixed(1);
  const pLbl2End = ((T_GONE+1400)/DUR*100).toFixed(1);

  // Highlighted path segment lengths
  const seg01 = Math.hypot(roadNodes[1].x-roadNodes[0].x, roadNodes[1].y-roadNodes[0].y);
  const seg12 = Math.hypot(roadNodes[2].x-roadNodes[1].x, roadNodes[2].y-roadNodes[1].y);

  return (
    <section ref={sectionRef} className="slide" data-label="The road as a graph">
      <style>{`
        /* Rest of road: fades at T_COLLAPSE */
        @keyframes s07-road      { 0%,${pColl}%{opacity:.32} ${pGone}%,100%{opacity:0} }
        /* Path edges base: fades earlier at T_REPLACE1 */
        @keyframes s07-road-path { 0%,${pRepl}%{opacity:.32} ${pReple}%,100%{opacity:0} }
        /* Other junctions: fade at T_COLLAPSE */
        @keyframes s07-junc      { 0%{opacity:.6} ${pColl}%{opacity:.6} ${pGone}%,100%{opacity:0} }
        /* Path junction (node 1): fades at T_REPLACE1 */
        @keyframes s07-junc-path { 0%{opacity:.6} ${pRepl}%{opacity:.6} ${pReple}%,100%{opacity:0} }
        /* ROAD NETWORK label: fades at T_COLLAPSE */
        @keyframes s07-rl        { 0%,${pColl}%{opacity:1} ${pGone}%,100%{opacity:0} }
        /* Highlighted path arcs: draw then fade at T_REPLACE1 */
        @keyframes s07-hlp1      { 0%,${pD1}%{stroke-dashoffset:var(--len);opacity:1} ${pD1e}%,${pRepl}%{stroke-dashoffset:0;opacity:1} ${pReple}%,100%{stroke-dashoffset:0;opacity:0} }
        @keyframes s07-hlp2      { 0%,${pD2}%{stroke-dashoffset:var(--len);opacity:1} ${pD2e}%,${pRepl}%{stroke-dashoffset:0;opacity:1} ${pReple}%,100%{stroke-dashoffset:0;opacity:0} }
        /* Callout: appears at T_CALLOUT, fades at T_REPLACE1 */
        @keyframes s07-callout   { 0%,${pCout}%{opacity:0;transform:translateY(6px)} ${pCoute}%,${pRepl}%{opacity:1;transform:translateY(0)} ${pReple}%,100%{opacity:0;transform:translateY(0)} }
        /* COMPLETE GRAPH label: fades in after road is gone */
        @keyframes s07-lbl2      { 0%,${pGone}%{opacity:0;transform:translateY(8px)} ${pLbl2End}%,100%{opacity:1;transform:translateY(0)} }
      `}</style>
      <SlideFrame>
        <div className="tag">VRP elements</div>
        <h2 className="title" style={{ marginTop: 20 }}>From the road network to a complete graph.</h2>
        <div className="body" style={{ marginTop: 14, color: "var(--ink-3)", maxWidth: 1500, fontSize: 28 }}>
          Roads are sparse — you can't drive directly between any two customers. VRP needs the travel cost for <em>every</em> pair.
          A shortest-path computation collapses the network: junctions disappear and only customers remain, connected by a <em>complete graph</em> whose edge weights are the minimum road distances.
        </div>

        <div style={{ marginTop: 20, flex: 1, position: "relative", background: "var(--paper-2)", border: "1px solid var(--line)", padding: 20 }}>
          {/* Always in DOM so btnRef stays stable; hidden once animation starts */}
          <button ref={btnRef} style={{
            position: "absolute", top: 20, right: 20, zIndex: 10,
            background: "var(--accent)", color: "#fff",
            border: "none", borderRadius: 8, padding: "12px 28px",
            fontFamily: "var(--font-mono)", fontSize: 18, letterSpacing: "0.06em",
            cursor: "pointer", textTransform: "uppercase",
            visibility: phase === 0 ? "visible" : "hidden"
          }}>Network collapsing →</button>

          <svg viewBox="0 0 1400 540" style={{ width: "100%", height: "100%", display: "block" }}>
            <defs>
              <pattern id="dotgrid-s07" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="var(--line)"/>
              </pattern>
            </defs>
            <rect width={1400} height={540} fill="url(#dotgrid-s07)" opacity={0.5}/>

            {phase === 0 ? (
              /* ── Static road network ── */
              <>
                <text x={30} y={32} fontFamily="var(--font-mono)" fontSize={18} letterSpacing="0.1em"
                      fill="var(--ink-3)">ROAD NETWORK</text>
                {roadEdges.map(([a,b], i) => (
                  <line key={i} x1={roadNodes[a].x} y1={roadNodes[a].y} x2={roadNodes[b].x} y2={roadNodes[b].y}
                        stroke="var(--ink-3)" strokeWidth={2} opacity={0.32}/>
                ))}
                {roadNodes.map((n, i) => customers.includes(i) ? null : (
                  <circle key={i} cx={n.x} cy={n.y} r={7} fill="var(--ink-3)" opacity={0.6}/>
                ))}
                {customers.map((ci, i) => (
                  <g key={i}>
                    <circle cx={roadNodes[ci].x} cy={roadNodes[ci].y} r={22}
                            fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                    <text x={roadNodes[ci].x} y={roadNodes[ci].y+7} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={16} fontWeight={600} fill="var(--ink)">{custLabels[i]}</text>
                  </g>
                ))}
              </>
            ) : (
              /* ── Animated collapse ── */
              <g key={animKey}>
                {/* "ROAD NETWORK" label fades out at full opacity */}
                <text x={30} y={32} fontFamily="var(--font-mono)" fontSize={18} letterSpacing="0.1em" fill="var(--ink-3)"
                      style={{ animation: `s07-rl ${DUR}ms both ease-in-out` }}>ROAD NETWORK</text>
                {/* "COMPLETE GRAPH" label fades in */}
                <text x={30} y={32} fontFamily="var(--font-mono)" fontSize={18} letterSpacing="0.1em" fill="var(--accent)"
                      style={{ animation: `s07-lbl2 ${DUR}ms both ease-in-out` }}>COMPLETE GRAPH  G = (V, E)</text>

                {/* Road edges: base layer fades at T_REPLACE1 for path, T_COLLAPSE for rest */}
                {roadEdges.map(([a,b], i) => {
                  const k = `${Math.min(a,b)}-${Math.max(a,b)}`;
                  const hl = hlEdgeSet.has(k);
                  const seg = k === "0-1" ? seg01 : k === "1-2" ? seg12 : null;
                  // Edges touching the path junction (node 1) must also fade at T_REPLACE1
                  const baseKf = (hl || a === 1 || b === 1) ? "s07-road-path" : "s07-road";
                  return (
                    <React.Fragment key={i}>
                      {/* Muted base — path edges fade at T_REPLACE1, others at T_COLLAPSE */}
                      <line x1={roadNodes[a].x} y1={roadNodes[a].y} x2={roadNodes[b].x} y2={roadNodes[b].y}
                            stroke="var(--ink-3)" strokeWidth={2}
                            style={{ animation: `${baseKf} ${DUR}ms both ease-in-out` }}/>
                      {/* Accent overlay — C₁→junc first (s07-hlp1), junc→C₂ second (s07-hlp2) */}
                      {hl && (
                        <line x1={roadNodes[a].x} y1={roadNodes[a].y} x2={roadNodes[b].x} y2={roadNodes[b].y}
                              stroke="var(--accent)" strokeWidth={5}
                              style={{ '--len': seg, strokeDasharray: seg, strokeDashoffset: seg,
                                       animation: `${k === "0-1" ? "s07-hlp1" : "s07-hlp2"} ${DUR}ms both ease-in-out` }}/>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Junction nodes — path junction (node 1) fades at T_REPLACE1, others at T_COLLAPSE */}
                {roadNodes.map((n, i) => customers.includes(i) ? null : (
                  <circle key={i} cx={n.x} cy={n.y} r={7} fill="var(--ink-3)"
                          style={{ animation: `${i === 1 ? "s07-junc-path" : "s07-junc"} ${DUR}ms both ease-in-out` }}/>
                ))}

                {/* Callout: appears at T_CALL, fades with road */}
                {(() => {
                  const mx = (roadNodes[0].x + roadNodes[2].x) / 2;
                  const my = roadNodes[1].y - 52;
                  return (
                    <g style={{ animation: `s07-callout ${DUR}ms both ease-in-out` }}>
                      <rect x={mx-160} y={my-20} width={320} height={58} rx={4}
                            fill="var(--paper)" stroke="var(--accent)" strokeWidth={1.5}/>
                      <text x={mx} y={my+6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--accent)">shortest path C₁ → C₂</text>
                      <text x={mx} y={my+26} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">via 1 junction  ·  cost = 5.2 km</text>
                    </g>
                  );
                })()}

                {/* Complete graph edges:
                     C₁→C₂ (ii=0,jj=0) draws at T_REPLACE1 — replaces the path arcs
                     All others draw at T_COLLAPSE + stagger — replace the rest of the road */}
                {customers.map((ci, ii) =>
                  customers.slice(ii+1).map((cj, jj) => {
                    const hlE = ii===0 && jj===0;
                    const len = Math.hypot(roadNodes[cj].x-roadNodes[ci].x, roadNodes[cj].y-roadNodes[ci].y);
                    const delay = hlE ? T_REPLACE1 : T_COLLAPSE + (ii*5+jj)*140;
                    return (
                      <line key={`e${ii}-${jj}`} x1={roadNodes[ci].x} y1={roadNodes[ci].y}
                            x2={roadNodes[cj].x} y2={roadNodes[cj].y}
                            stroke="var(--accent)" strokeWidth={hlE ? 3.5 : 1.5}
                            style={{ '--len': len, strokeDasharray: len, strokeDashoffset: len,
                                     opacity: hlE ? 1 : 0.35,
                                     animation: `drawPath 800ms both ease-out`,
                                     animationDelay: `${delay}ms` }}/>
                    );
                  })
                )}

                {/* Cost label on C₁–C₂ edge — appears with the direct edge at T_REPLACE1 */}
                {(() => {
                  const mx = (roadNodes[0].x + roadNodes[2].x) / 2;
                  const my = (roadNodes[0].y + roadNodes[2].y) / 2 - 32;
                  return (
                    <g style={{ opacity: 0, animation: `fadeUp 600ms both ease-out`,
                                animationDelay: `${T_REPLACE1 + 600}ms` }}>
                      <rect x={mx-72} y={my-16} width={144} height={34} rx={4}
                            fill="var(--paper)" stroke="var(--accent)" strokeWidth={1.5}/>
                      <text x={mx} y={my+7} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--accent)">c₁₂ = 5.2 km</text>
                    </g>
                  );
                })()}

                {/* Customer nodes — always visible */}
                {customers.map((ci, i) => (
                  <g key={i}>
                    <circle cx={roadNodes[ci].x} cy={roadNodes[ci].y} r={22}
                            fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                    <text x={roadNodes[ci].x} y={roadNodes[ci].y+7} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={16} fontWeight={600} fill="var(--ink)">{custLabels[i]}</text>
                  </g>
                ))}
              </g>
            )}

            {/* Legend */}
            <g transform="translate(30,516)">
              <circle cx={8} cy={-2} r={7} fill="var(--ink-3)" opacity={0.5}/>
              <text x={24} y={4} fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)">junction (disappears)</text>
              <circle cx={230} cy={-2} r={10} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              <text x={250} y={4} fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)">customer (stays)</text>
            </g>
          </svg>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide08() {
  return (
    <section className="slide" data-label="Vertices and arcs">
      <SlideFrame>
        <div className="tag">VRP elements · Notation</div>
        <h2 className="title" style={{ marginTop: 28 }}>The basic graph-theoretic notation.</h2>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", alignContent: "center" }}>
            {[
              ["G = (V, A)", "directed complete graph (undirected: E)"],
              ["V = {0, 1, …, n}", "vertex 0 is the depot; 1…n are the customers"],
              ["cᵢⱼ ≥ 0", "travel cost on arc (i, j)"],
              ["dᵢ", "demand of customer i; d₀ = 0"],
              ["δ⁺(i), δ⁻(i)", "forward / backward star of vertex i"],
              ["cᵢⱼ = cⱼᵢ ?", "symmetric (SCVRP) vs asymmetric (ACVRP) cost matrix"],
              ["cᵢⱼ ≤ cᵢₖ + cₖⱼ", "triangle inequality — automatic when cᵢⱼ is a shortest path"],
            ].map(([k, v], i) => (
              <React.Fragment key={i}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink)", borderBottom: "1px solid var(--line)", paddingBottom: 9, paddingTop: i === 0 ? 0 : 9, paddingRight: 16 }}>{k}</div>
                <div style={{ fontSize: 21, color: "var(--ink-3)", borderBottom: "1px solid var(--line)", paddingBottom: 9, paddingTop: i === 0 ? 0 : 9, lineHeight: 1.25 }}>{v}</div>
              </React.Fragment>
            ))}
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24 }}>
            <VRPGraph
              nodes={EX_NODES.slice(0, 8)}
              routes={[]}
              showEdges
              edgeOpacity={0.45}
              showLabels
              width={800} height={560}
              nodeRadius={14}
              depotRadius={16}
              labelFontSize={15}
              viewBoxOverride="160 55 620 510"
            />
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


Object.assign(window, {
  SlideVRPElementsSection, Slide06, Slide07, Slide08,
});
