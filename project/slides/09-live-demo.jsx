/* =========================================================================
   VRP Seminar — Part VIII: Live demo
   Slides: section header, Clarke-Wright idea, Interactive demo
   (ClarkeWrightDemo component lives in demo.jsx)
   ========================================================================= */

function Slide24() {
  return (
    <section className="slide section-slide" data-label="Part VIII — Live demo">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part VIII of IX</div>
        <div>Slides 57 — 60</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>

        <div className="hero" style={{ fontSize: 220 }}>Clarke–Wright</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          The savings heuristic — still the starting point for most real VRP solvers, 60 years later.
        </div>
      </div>
    </section>
  );
}


function SlideClarkeWrightIntro() {
  const steps = [
    {
      n: "01",
      h: "Setting",
      b: "CVRP: n customers, one depot. The number of vehicles K is a decision variable — not fixed in advance. The algorithm works for both symmetric and asymmetric distance matrices.",
    },
    {
      n: "02",
      h: "Initial solution — n dedicated round-trips",
      b: "Create one route (0, i, 0) per customer i = 1, …, n. Every customer is served by its own vehicle. Feasible, but maximally wasteful — no shared legs.",
    },
    {
      n: "03",
      h: "Savings — the key quantity",
      b: "Merging (0, …, i, 0) with (0, j, …, 0) into one route (0, …, i, j, …, 0) eliminates two depot legs and generates a saving s(i, j) = c(i,0) + c(0,j) − c(i,j). Compute all savings, sort in non-increasing order.",
    },
    {
      n: "04",
      h: "Greedy merge — parallel version (dominant in practice)",
      b: "Scan the savings list from the top. For each s(i,j): if the route containing arc (i,0) and the route containing arc (0,j) can be feasibly merged — combined load ≤ Q, both i and j are at depot-adjacent endpoints — merge them by deleting (i,0) and (0,j) and introducing (i,j). Repeat until no feasible merge remains.",
    },
  ];

  return (
    <section className="slide" data-label="Clarke-Wright — what and why">
      <SlideFrame>
        <div className="tag">Clarke–Wright (1964) · Laporte &amp; Semet in Toth &amp; Vigo §5.2.1</div>
        <h2 className="title" style={{ marginTop: 20 }}>
          The savings algorithm — builds CVRP routes by merging round-trips greedily.
        </h2>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
          {steps.map(({ n, h, b }) => (
            <div key={n} style={{
              display: "grid",
              gridTemplateColumns: "64px 1fr",
              gap: 24,
              padding: "14px 0",
              borderTop: "1px solid var(--line)",
              alignItems: "start",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 46,
                lineHeight: 1,
                color: "var(--accent)",
              }}>{n}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.1 }}>{h}</div>
                <div style={{ fontSize: 21, color: "var(--ink-2)", marginTop: 5, lineHeight: 1.45 }}>{b}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }}/>
        </div>

        <div style={{
          marginTop: 16,
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "12px 20px",
          fontFamily: "var(--font-mono)",
          fontSize: 20,
          lineHeight: 1.4,
        }}>
          Step 1 complexity: <span style={{ color: "var(--accent-2)" }}>O(n²)</span> savings to compute
          &nbsp;+&nbsp;<span style={{ color: "var(--accent-2)" }}>O(n² log n)</span> to sort.
          &nbsp;·&nbsp; A sequential version also exists — parallel dominates (Toth &amp; Vigo, Table 5.1).
        </div>

      </SlideFrame>
    </section>
  );
}


function SlideCWInitialSolution() {
  const DEPOT = { x: 420, y: 320 };
  const CUSTS = [
    { id: 1, x: 220, y: 180, d: 1 },
    { id: 2, x: 300, y: 120, d: 2 },
    { id: 3, x: 540, y: 110, d: 3 },
    { id: 4, x: 660, y: 180, d: 4 },
    { id: 5, x: 720, y: 340, d: 5 },
    { id: 6, x: 640, y: 480, d: 6 },
    { id: 7, x: 440, y: 520, d: 7 },
    { id: 8, x: 240, y: 490, d: 8 },
    { id: 9, x: 140, y: 350, d: 9 },
  ];
  const COLORS = [
    "#e25c3e","#4a9ede","#5dbe72","#e8a838","#9b6bbf",
    "#e67e22","#1abc9c","#e74c3c","#2980b9",
  ];

  const [started, setStarted] = React.useState(false);
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);
  const genRef     = React.useRef(null);
  const rstRef     = React.useRef(null);

  React.useEffect(() => {
    const btn = genRef.current; if (!btn) return;
    const h = () => { setStarted(true); setAnimKey(k => k + 1); };
    btn.addEventListener("click", h);
    return () => btn.removeEventListener("click", h);
  }, []);

  React.useEffect(() => {
    const btn = rstRef.current; if (!btn) return;
    const h = () => { setStarted(false); setAnimKey(0); };
    btn.addEventListener("click", h);
    return () => btn.removeEventListener("click", h);
  }, []);

  React.useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new MutationObserver(() => {
      if (!el.hasAttribute("data-deck-active")) { setStarted(false); setAnimKey(0); }
    });
    obs.observe(el, { attributes: true, attributeFilter: ["data-deck-active"] });
    return () => obs.disconnect();
  }, []);

  const GAP = 850;   // must be > RET + DUR so routes are strictly sequential
  const DUR = 360;   // ms per segment
  const RET = 400;   // ms after route start when return leg begins (DUR + 40ms gap)
  const ARW = 310;   // ms after segment start when arrowhead fades in
  const CURVE = 22; // perpendicular bezier offset so reverse arcs don't overlap

  // Returns { d: SVG path, pts: arrowhead polygon points } for a curved arc.
  // Both depot→ci and ci→depot curve to the left of their respective direction,
  // so the two arcs bow away from each other and become visually distinct.
  const mkCurvedArc = (x1, y1, x2, y2) => {
    const dx = x2-x1, dy = y2-y1, L = Math.hypot(dx, dy);
    if (L < 1) return { d: "", pts: "" };
    const mx = (x1+x2)/2, my = (y1+y2)/2;
    const cpx = mx - (dy/L)*CURVE;
    const cpy = my + (dx/L)*CURVE;
    const d = `M ${x1},${y1} Q ${cpx.toFixed(1)},${cpy.toFixed(1)} ${x2},${y2}`;
    // Arrowhead tangent = direction from control-point to endpoint
    const tdx = x2-cpx, tdy = y2-cpy, tL = Math.hypot(tdx, tdy);
    const ux = tdx/tL, uy = tdy/tL;
    const back = 18, aw = 7, al = 14;
    const tx = x2-ux*back, ty = y2-uy*back;
    const bx = tx-ux*al,   by = ty-uy*al;
    const pts = `${tx.toFixed(1)},${ty.toFixed(1)} ${(bx-uy*aw).toFixed(1)},${(by+ux*aw).toFixed(1)} ${(bx+uy*aw).toFixed(1)},${(by-ux*aw).toFixed(1)}`;
    return { d, pts };
  };

  return (
    <section className="slide" data-label="CW — initial solution" ref={sectionRef}>
      <SlideFrame>
        <div className="tag">Clarke–Wright · step 02</div>
        <h2 className="title" style={{ marginTop: 20 }}>
          Initial solution — one dedicated round-trip per customer.
        </h2>

        <div style={{ marginTop: 20, flex: 1, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, minHeight: 0 }}>

          {/* Graph */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 12 }}>
            <svg key={animKey} viewBox="0 0 840 600" style={{ width: "100%", height: "100%", display: "block" }}>

              {/* All segment bodies first */}
              {started && CUSTS.map((c, i) => {
                const col = COLORS[i], d0 = i*GAP, d1 = d0+RET;
                const L = Math.hypot(c.x-DEPOT.x, c.y-DEPOT.y);
                const out = mkCurvedArc(DEPOT.x,DEPOT.y,c.x,c.y);
                const ret = mkCurvedArc(c.x,c.y,DEPOT.x,DEPOT.y);
                return (
                  <React.Fragment key={"b"+i}>
                    <path d={out.d} fill="none"
                          stroke={col} strokeWidth={4} strokeLinecap="round"
                          style={{ strokeDasharray:L, strokeDashoffset:L, "--len":L,
                                   animation:`drawPath ${DUR}ms both ease-in-out`,
                                   animationDelay:`${d0}ms` }}/>
                    <path d={ret.d} fill="none"
                          stroke={col} strokeWidth={4} strokeLinecap="round"
                          style={{ strokeDasharray:L, strokeDashoffset:L, "--len":L,
                                   animation:`drawPath ${DUR}ms both ease-in-out`,
                                   animationDelay:`${d1}ms` }}/>
                  </React.Fragment>
                );
              })}

              {/* All arrowheads after */}
              {started && CUSTS.map((c, i) => {
                const col = COLORS[i], d0 = i*GAP, d1 = d0+RET;
                const out = mkCurvedArc(DEPOT.x,DEPOT.y,c.x,c.y);
                const ret = mkCurvedArc(c.x,c.y,DEPOT.x,DEPOT.y);
                return (
                  <React.Fragment key={"a"+i}>
                    <polygon points={out.pts} fill={col}
                             style={{ opacity:0, animation:"fadeUp 150ms both ease-out",
                                      animationDelay:`${d0+ARW}ms` }}/>
                    <polygon points={ret.pts} fill={col}
                             style={{ opacity:0, animation:"fadeUp 150ms both ease-out",
                                      animationDelay:`${d1+ARW}ms` }}/>
                  </React.Fragment>
                );
              })}

              {/* Depot */}
              <rect x={DEPOT.x-16} y={DEPOT.y-16} width={32} height={32} fill="var(--depot)"/>
              <rect x={DEPOT.x-20} y={DEPOT.y-20} width={40} height={40} fill="none" stroke="var(--depot)" strokeWidth={1.5}/>
              <text x={DEPOT.x} y={DEPOT.y+44} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)" letterSpacing="0.05em">DEPOT</text>

              {/* Customers */}
              {CUSTS.map(c => (
                <g key={c.id}>
                  <circle cx={c.x} cy={c.y} r={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.2}/>
                  <text x={c.x} y={c.y+5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink)" fontWeight={600}>{c.d}</text>
                  <text x={c.x} y={c.y-22} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)">c{c.id}</text>
                </g>
              ))}

            </svg>
          </div>

          {/* Right panel */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:20, color:"var(--ink-2)", lineHeight:1.5 }}>
              9 customers → 9 vehicles. No legs shared — feasible but maximally wasteful.
            </div>
            <div style={{ background:"var(--ink)", color:"var(--paper)", padding:"10px 16px",
                          fontFamily:"var(--font-mono)", fontSize:22 }}>
              {"(0, i, 0)   i = 1 … 9"}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:5, flex:1 }}>
              {CUSTS.map((c, i) => {
                const itemDelay = i*GAP + RET + DUR - 100;
                const sharedStyle = {
                  display:"flex", alignItems:"center", gap:10,
                  fontFamily:"var(--font-mono)", fontSize:19, color:"var(--ink-2)",
                };
                const dot = <div style={{ width:12, height:12, borderRadius:"50%", background:COLORS[i], flexShrink:0 }}/>;
                const label = <span>0 → c{c.id} → 0 &nbsp;<span style={{ color:"var(--ink-3)" }}>demand {c.d}</span></span>;
                return started ? (
                  <div key={"on-"+i+"-"+animKey}
                       style={{ ...sharedStyle, opacity:0,
                                animation:"fadeUp 200ms both ease-out",
                                animationDelay:`${itemDelay}ms` }}>
                    {dot}{label}
                  </div>
                ) : (
                  <div key={"off-"+i} style={{ ...sharedStyle, opacity:0, pointerEvents:"none" }}>
                    {dot}{label}
                  </div>
                );
              })}
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button ref={genRef} style={{
                fontFamily:"var(--font-mono)", fontSize:21, padding:"10px 18px",
                background:"var(--accent)", color:"white", border:"none",
                cursor:"pointer", letterSpacing:"0.04em", textTransform:"uppercase",
              }}>
                ▶ generate
                {!started && <span style={{ marginLeft: 10, fontSize: 14, color: "#fff", letterSpacing: "0.08em", animation: "blink 1.4s ease-in-out 0s infinite" }}>click</span>}
              </button>
              <button ref={rstRef} style={{
                fontFamily:"var(--font-mono)", fontSize:21, padding:"10px 18px",
                background:"var(--paper)", color:"var(--ink)", border:"1px solid var(--ink)",
                cursor:"pointer", letterSpacing:"0.04em", textTransform:"uppercase",
              }}>reset</button>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide25() {
  // Curved arc helper: left-hand Q bezier so reverse arcs (a→b and b→a)
  // bow away from each other instead of overlapping. Returns {d, pts}.
  const mkArc25 = (x1, y1, x2, y2) => {
    const CURVE = 18;
    const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy);
    if (L<1) return {d:'', pts:''};
    const mx=(x1+x2)/2, my=(y1+y2)/2;
    const cpx=mx-(dy/L)*CURVE, cpy=my+(dx/L)*CURVE;
    const d=`M ${x1},${y1} Q ${cpx.toFixed(1)},${cpy.toFixed(1)} ${x2},${y2}`;
    const tdx=x2-cpx, tdy=y2-cpy, tL=Math.hypot(tdx,tdy);
    const ux=tdx/tL, uy=tdy/tL;
    const back=18, aw=6, al=12;
    const tx=x2-ux*back, ty=y2-uy*back;
    const bx=tx-ux*al, by=ty-uy*al;
    const pts=`${tx.toFixed(1)},${ty.toFixed(1)} ${(bx-uy*aw).toFixed(1)},${(by+ux*aw).toFixed(1)} ${(bx+uy*aw).toFixed(1)},${(by-ux*aw).toFixed(1)}`;
    return {d, pts};
  };

  return (
    <section className="slide" data-label="Clarke-Wright idea">
      <SlideFrame>
        <div className="tag">Clarke–Wright (1964)</div>
        <h2 className="title" style={{ marginTop: 12 }}>The savings idea — merge two round-trips if it shortens the total.</h2>

        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {[
            {
              t: "Before merging",
              desc: "Two separate round-trips: 0 → i → 0 and 0 → j → 0.",
              svg: (
                <svg viewBox="0 0 600 400" style={{ width: "100%", height: 330, display: "block" }}>
                  {(() => {
                    // Four segments: depot→i, i→depot (route-1), depot→j, j→depot (route-2).
                    // Bodies first, arrowheads second (gotcha #10).
                    const segs = [[300,320,150,120],[150,120,300,320],[300,320,470,120],[470,120,300,320]];
                    const cols = ["var(--route-1)","var(--route-1)","var(--route-2)","var(--route-2)"];
                    const arcs = segs.map(([x1,y1,x2,y2]) => mkArc25(x1,y1,x2,y2));
                    return <>
                      {arcs.map((a,k) => <path key={`b-${k}`} d={a.d} fill="none" stroke={cols[k]} strokeWidth={3.5}/>)}
                      {arcs.map((a,k) => <polygon key={`h-${k}`} points={a.pts} fill={cols[k]}/>)}
                    </>;
                  })()}
                  {/* Depot rendered after arcs so it covers any arrowheads pointing into it */}
                  <rect x={300-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
                  <rect x={300-20} y={320-20} width={40} height={40} fill="none" stroke="var(--depot)" strokeWidth={1.5}/>
                  <text x={300} y={364} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)" letterSpacing="0.05em">0</text>
                  <circle cx={150} cy={120} r={20} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={150} y={127} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fontWeight={600}>i</text>
                  <circle cx={470} cy={120} r={20} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={470} y={127} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fontWeight={600}>j</text>
                </svg>
              ),
              cost: <TeX>{"c(0,i) + c(i,0) + c(0,j) + c(j,0)"}</TeX>
            },
            {
              t: "After merging",
              desc: "One single route visiting i then j: 0 → i → j → 0.",
              svg: (
                <svg viewBox="0 0 600 400" style={{ width: "100%", height: 330, display: "block" }}>
                  <polyline points="300,320 150,120 470,120 300,320" fill="none" stroke="var(--route-3)" strokeWidth={4}/>
                  {(() => {
                    // Single merged route 0 → i → j → 0 (route-3)
                    const edges = [[300,320,150,120],[150,120,470,120],[470,120,300,320]];
                    return edges.map(([x1,y1,x2,y2], k) => {
                      const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy);
                      const ux=dx/L, uy=dy/L;
                      const back=18, aw=6, al=12;
                      const tipX=x2-ux*back, tipY=y2-uy*back;
                      const bx=tipX-ux*al, by=tipY-uy*al;
                      const pts=`${tipX.toFixed(1)},${tipY.toFixed(1)} ${(bx-uy*aw).toFixed(1)},${(by+ux*aw).toFixed(1)} ${(bx+uy*aw).toFixed(1)},${(by-ux*aw).toFixed(1)}`;
                      return <polygon key={k} points={pts} fill="var(--route-3)"/>;
                    });
                  })()}
                  {/* Depot rendered after arcs so it covers any arrowheads pointing into it */}
                  <rect x={300-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
                  <rect x={300-20} y={320-20} width={40} height={40} fill="none" stroke="var(--depot)" strokeWidth={1.5}/>
                  <text x={300} y={364} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)" letterSpacing="0.05em">0</text>
                  <circle cx={150} cy={120} r={20} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={150} y={127} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fontWeight={600}>i</text>
                  <circle cx={470} cy={120} r={20} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={470} y={127} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fontWeight={600}>j</text>
                </svg>
              ),
              cost: <TeX>{"c(0,i) + c(i,j) + c(j,0)"}</TeX>
            },
          ].map((c, i) => (
            <div key={i} style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="kicker">{c.t}</div>
              <div>{c.svg}</div>
              <div className="body small" style={{ color: "var(--ink-3)" }}>{c.desc}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, background: "var(--paper)", border: "1px solid var(--line)", padding: "8px 12px" }}>{c.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, background: "var(--ink)", color: "var(--paper)", padding: "14px 24px", lineHeight: 1.75 }}>
          {/* General formula (valid for any cost matrix) */}
          <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0 2px", fontSize: 21 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 17, opacity: 0.55, marginRight: 10 }}>saving</span>
            <TeX>{"s(i,j) \\;=\\;"}</TeX>
            <span style={{ color: "var(--accent-2)" }}><TeX>{"\\bigl[c(0,i) + c(i,0) + c(0,j) + c(j,0)\\bigr]"}</TeX></span>
            <TeX>{"\\;-\\;"}</TeX>
            <span style={{ color: "var(--accent-2)" }}><TeX>{"\\bigl[c(0,i) + c(i,j) + c(j,0)\\bigr]"}</TeX></span>
            <TeX>{"\\;=\\;"}</TeX>
            <span style={{ color: "var(--accent-2)" }}><TeX>{"c(i,0) + c(0,j) - c(i,j)"}</TeX></span>
          </div>
          {/* Symmetric simplification */}
          <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0 6px", fontSize: 19, marginTop: 5 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--accent-2)", opacity: 0.8, marginRight: 4 }}>symmetric</span>
            <TeX>{"c(i,0) = c(0,i)"}</TeX>
            <span style={{ fontFamily: "var(--font-mono)", opacity: 0.55 }}>⟹</span>
            <span style={{ color: "var(--accent-2)" }}><TeX>{"s(i,j) = c(0,i) + c(0,j) - c(i,j)"}</TeX></span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, opacity: 0.45 }}>(Euclidean / undirected — standard CW)</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", opacity: 0.45, fontSize: 15, marginTop: 3, fontStyle: "italic" }}>
            ↳ assumes no one-way streets: road cost is the same in both directions, so the trip <em>to</em> the depot costs the same as the trip <em>from</em> it.
          </div>
          <div style={{ fontFamily: "var(--font-mono)", opacity: 0.65, fontSize: 17, marginTop: 5 }}>→ merge the pair with the largest positive saving that remains feasible.</div>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide26() {
  return (
    <section className="slide" data-label="Clarke-Wright interactive demo">
      <SlideFrame>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="tag">Live demo</div>
            <h2 className="title" style={{ marginTop: 20 }}>Step through the savings algorithm.</h2>
            <div className="body small" style={{ color: "var(--ink-3)", marginTop: 10 }}>
              Press <b className="mono">step ▶</b> or <b className="mono">auto</b> to merge pairs in decreasing order of savings.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 30, flex: 1, minHeight: 0 }}>
          <ClarkeWrightDemo/>
        </div>
      </SlideFrame>
    </section>
  );
}


Object.assign(window, { Slide24, SlideClarkeWrightIntro, SlideCWInitialSolution, Slide25, Slide26 });
