/* =========================================================================
   VRP Seminar — Part V: TSP
   Slides: section header, informal statement, Hamiltonian circuit,
           ILP formulation, degree constraints, subtour problem,
           DFJ subtour elimination, exponential blow-up, TSP -> VRP
   ========================================================================= */

function SlideTSPSection() {
  return (
    <section className="slide section-slide" data-label="Part V — TSP">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part V of IX</div>
        <div>Slides 28 — 38</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Five</div>
        <div className="hero" style={{ fontSize: 200 }}>Traveling<br/>Salesman</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          The simplest non-trivial routing problem — one vehicle, no capacity limit, visit everyone exactly once. The ancestor of every VRP.
        </div>
      </div>
    </section>
  );
}


function Slide09() {
  const [showRoute, setShowRoute] = React.useState(false);
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);
  const btnRef = React.useRef(null);

  // Route: depot(0)→1→2→3→4→5→6→7→depot(0) as [x1,y1,x2,y2] segments
  const nodes09 = EX_NODES.slice(0, 8);
  const tour = [0, 1, 2, 3, 4, 5, 6, 7, 0];
  const routeSegments = tour.slice(0, -1).map((id, i) => {
    const a = nodes09[id], b = nodes09[tour[i + 1]];
    return [a.x, a.y, b.x, b.y];
  });

  // Reset when slide leaves view
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (!el.hasAttribute('data-deck-active')) {
        setShowRoute(false);
        setAnimKey(0);
      }
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // Native click listener — React event delegation breaks when the section
  // is moved out of the createRoot host div by the deck-stage web component.
  React.useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const handler = () => {
      setShowRoute(true);
      setAnimKey(k => k + 1);
    };
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <section ref={sectionRef} className="slide" data-label="The Traveling Salesman Problem">
      <SlideFrame>
        <div className="tag">TSP · Informal statement</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          One vehicle, <em style={{ color: "var(--accent)" }}>n cities</em>, one closed tour.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
            <div className="lede" style={{ fontSize: 34, lineHeight: 1.22 }}>
              A salesman leaves a <em>depot</em>, visits <em>n</em> customers <em>exactly once</em>, and returns home — with the smallest possible total distance.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 24px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 10 }}>Ingredients</div>
              <ul style={{ margin: 0, paddingLeft: 22, fontSize: 22, color: "var(--ink-2)", lineHeight: 1.4, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>One vehicle — no capacity limit.</li>
                <li>A depot <span style={{ fontFamily: "var(--font-mono)" }}>v₀</span> and <span style={{ fontFamily: "var(--font-mono)" }}>n</span> customer vertices.</li>
                <li>Complete graph with arc costs <span style={{ fontFamily: "var(--font-mono)" }}>cᵢⱼ</span>.</li>
                <li>Each customer visited <em>exactly once</em>.</li>
                <li>The tour is <em>closed</em>: ends where it started.</li>
              </ul>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-2)", lineHeight: 1.4, background: "var(--paper-2)", padding: "14px 20px", border: "1px solid var(--line)" }}>
              TSP = VRP &nbsp;with&nbsp; <span style={{ color: "var(--accent)" }}>K = 1</span> &nbsp;and&nbsp; <span style={{ color: "var(--accent)" }}>C ≥ d(V)</span>
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 28, position: "relative" }}>
            {/* Always in DOM so btnRef stays stable across slide revisits; hidden once route is shown */}
            <button
              ref={btnRef}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,
                fontFamily: "var(--font-mono)",
                fontSize: 16,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                padding: "10px 22px",
                background: "#1d4ed8",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                visibility: showRoute ? "hidden" : "visible",
              }}
            >
              find a possible solution
            </button>

            {/* Route overlay — rendered BEFORE VRPGraph so nodes sit on top */}
            {showRoute && (
              <svg
                key={animKey}
                viewBox="160 55 620 510"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  position: "absolute",
                  top: 28, left: 28,
                  width: "calc(100% - 56px)",
                  height: "calc(100% - 56px)",
                  pointerEvents: "none",
                }}
              >
                {routeSegments.map(([x1, y1, x2, y2], i) => {
                  const len = Math.hypot(x2 - x1, y2 - y1);
                  return (
                    <line key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="var(--accent)" strokeWidth={5} strokeLinecap="round"
                      style={{
                        strokeDasharray: len,
                        strokeDashoffset: len,
                        "--len": len,
                        animation: `drawPath 700ms both ease-in-out`,
                        animationDelay: `${i * 550}ms`,
                      }}
                    />
                  );
                })}
              </svg>
            )}

            {/* Background graph — position relative + zIndex:1 to stack above the absolute overlay */}
            <div style={{ width: "100%", height: "100%", pointerEvents: "none", position: "relative", zIndex: 1 }}>
              <VRPGraph
                nodes={nodes09}
                routes={[]}
                showEdges
                edgeOpacity={showRoute ? 0.15 : 0.45}
                showLabels
                width={800} height={560}
                nodeRadius={14}
                depotRadius={16}
                labelFontSize={15}
                viewBoxOverride="160 55 620 510"
              />
            </div>

            <div style={{ position: "absolute", bottom: 18, left: 30, fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
              FIG. — a single closed tour through depot and every customer.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPHamiltonian() {
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) setAnimKey(k => k + 1);
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  const nodes = [
    { x: 500, y: 130, label: "v₀" },
    { x: 760, y: 230, label: "v₁" },
    { x: 830, y: 450, label: "v₂" },
    { x: 670, y: 620, label: "v₃" },
    { x: 330, y: 620, label: "v₄" },
    { x: 170, y: 450, label: "v₅" },
    { x: 240, y: 230, label: "v₆" },
  ];
  const tour = [0, 1, 2, 3, 4, 5, 6, 0];
  const r = 34;

  return (
    <section ref={sectionRef} className="slide" data-label="Hamiltonian circuit">
      <SlideFrame>
        <div className="tag">TSP · Hamiltonian circuit</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          A valid tour is a <em style={{ color: "var(--accent)" }}>Hamiltonian circuit</em>.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, flex: 1, alignItems: "center" }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 26, position: "relative" }}>
            <svg viewBox="0 0 1000 760" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-tsph" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
                <marker id="tsph-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/>
                </marker>
              </defs>
              <rect width={1000} height={760} fill="url(#dotgrid-tsph)" opacity={0.5}/>

              <g key={animKey}>
                {/* Tour arcs — draw sequentially (body only, no markerEnd) */}
                {tour.slice(0, -1).map((from, i) => {
                  const a = nodes[from], b = nodes[tour[i+1]];
                  const dx = b.x - a.x, dy = b.y - a.y;
                  const len = Math.hypot(dx, dy);
                  const ux = dx / len, uy = dy / len;
                  const x1 = a.x + ux * r, y1 = a.y + uy * r;
                  const x2 = b.x - ux * r, y2 = b.y - uy * r;
                  const delay = 1200 + i * 380;
                  const segLen = Math.hypot(x2 - x1, y2 - y1);
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke="var(--accent)" strokeWidth={4} strokeLinecap="round"
                          style={{
                            "--len": segLen,
                            strokeDasharray: segLen,
                            animation: "drawPath 700ms both ease-in-out",
                            animationDelay: `${delay}ms`,
                          }}/>
                  );
                })}

                {/* Arrowheads — appear after each arc body finishes */}
                {tour.slice(0, -1).map((from, i) => {
                  const a = nodes[from], b = nodes[tour[i+1]];
                  const dx = b.x - a.x, dy = b.y - a.y;
                  const len = Math.hypot(dx, dy);
                  const ux = dx / len, uy = dy / len;
                  const x2 = b.x - ux * r, y2 = b.y - uy * r;
                  const aw = 10, al = 20;
                  const tip = [x2, y2];
                  const base = [x2 - ux * al, y2 - uy * al];
                  const p1 = [base[0] - uy * aw, base[1] + ux * aw];
                  const p2 = [base[0] + uy * aw, base[1] - ux * aw];
                  const pts = `${tip[0]},${tip[1]} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`;
                  const delay = 1200 + i * 380 + 680;
                  return (
                    <polygon key={`arr-${i}`} points={pts} fill="var(--accent)"
                             style={{ opacity: 0, animation: "fadeUp 150ms both ease-out", animationDelay: `${delay}ms` }}/>
                  );
                })}

                {/* Sequence number pills */}
                {tour.slice(0, -1).map((from, i) => {
                  const a = nodes[from], b = nodes[tour[i+1]];
                  const mx = (a.x + b.x) / 2;
                  const my = (a.y + b.y) / 2;
                  const delay = 1200 + i * 380 + 500;
                  return (
                    <g key={`lab-${i}`}
                       style={{ opacity: 0, animation: "fadeUp 400ms both ease-out", animationDelay: `${delay}ms` }}>
                      <circle cx={mx} cy={my} r={14} fill="var(--paper)" stroke="var(--accent)" strokeWidth={1.5}/>
                      <text x={mx} y={my + 6} textAnchor="middle" fontFamily="var(--font-mono)"
                            fontSize={16} fill="var(--accent)" fontWeight={600}>{i + 1}</text>
                    </g>
                  );
                })}

                {/* Nodes — depot square, customers circles */}
                {nodes.map((n, i) => (
                  <g key={i} style={{ animation: "fadeUp 500ms both ease-out", animationDelay: `${i * 130}ms` }}>
                    {i === 0 ? (
                      <rect x={n.x - r} y={n.y - r} width={r*2} height={r*2}
                            fill="var(--depot)" rx={4}/>
                    ) : (
                      <circle cx={n.x} cy={n.y} r={r} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                    )}
                    <text x={n.x} y={n.y + 10} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={24} fontWeight={600}
                          fill={i === 0 ? "var(--paper)" : "var(--ink)"}>
                      {n.label}
                    </text>
                  </g>
                ))}
              </g>

              <text x={500} y={740} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-3)">
                FIG. — a closed walk that visits each vertex exactly once.
              </text>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 32, lineHeight: 1.25 }}>
              A <em>Hamiltonian circuit</em> is a cyclic ordering of the vertex set — every vertex appears <em>exactly once</em>, and the walk closes on the starting vertex.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 22px", fontFamily: "var(--font-mono)", fontSize: 22, lineHeight: 1.55 }}>
              τ = (v<sub>π(0)</sub>, v<sub>π(1)</sub>, …, v<sub>π(n)</sub>, v<sub>π(0)</sub>)
              <div style={{ color: "var(--ink-3)", marginTop: 10, fontSize: 20 }}>
                π is a permutation of {"{"}0, 1, …, n{"}"}.
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)", fontSize: 19, color: "var(--ink-2)" }}>
                On a complete graph of&nbsp;<em>n</em>&nbsp;vertices there are&nbsp;
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>(n − 1)!</span>&nbsp;
                distinct directed tours.
              </div>
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 22px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 8 }}>Cost of a tour</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22 }}>
                <TeX display>{"c(\\tau) \\;=\\; \\sum_{k=0}^{n} c_{\\,\\pi(k),\\,\\pi(k+1)}"}</TeX>
              </div>
              <div style={{ color: "var(--ink-3)", fontSize: 20, marginTop: 4 }}>
                TSP asks for the circuit of <em>minimum</em> cost.
              </div>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPFormulation() {
  return (
    <section className="slide" data-label="TSP — ILP formulation">
      <SlideFrame>
        <div className="tag">TSP · Integer programming model</div>
        <h2 className="title" style={{ marginTop: 28 }}>A binary model on the arcs of the complete graph.</h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 26, lineHeight: 1.35 }}>
              One decision variable per arc of the complete graph G = (V, A):
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 22, fontFamily: "var(--font-mono)", fontSize: 23, lineHeight: 1.55 }}>
              xᵢⱼ = 1 &nbsp;if arc (i, j) belongs to the tour<br/>
              xᵢⱼ = 0 &nbsp;otherwise
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 23, lineHeight: 1.35 }}>
              The model needs three families of constraints:
            </div>
            <ul style={{ margin: 0, paddingLeft: 22, fontSize: 22, color: "var(--ink-2)", lineHeight: 1.4, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><em>Out-degree 1</em> — the tour <em>leaves</em> every vertex exactly once.</li>
              <li><em>In-degree 1</em> — the tour <em>arrives</em> at every vertex exactly once.</li>
              <li style={{ color: "var(--accent)" }}><em>Subtour elimination</em> — the selected arcs must form a <em>single</em> connected cycle.</li>
            </ul>
            <div className="body small" style={{ color: "var(--ink-3)", fontSize: 20, lineHeight: 1.35 }}>
              Without the third family, degree-feasible solutions could break into several disjoint cycles.
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "30px 38px", fontFamily: "var(--font-mono)", fontSize: 23, lineHeight: 1.55 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, marginBottom: 16 }}>
              <TeX display>{"\\min \\; \\sum_{i \\in V} \\sum_{\\substack{j \\in V \\\\ j \\neq i}} c_{ij}\\, x_{ij}"}</TeX>
            </div>
            <div style={{ color: "var(--ink-3)", marginBottom: 10 }}>subject to</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", rowGap: 14, columnGap: 18 }}>
              <div>
                <TeX>{"\\sum_{\\substack{j \\in V \\\\ j \\neq i}} x_{ij} = 1"}</TeX> &nbsp; ∀ i ∈ V
              </div>
              <div style={{ color: "var(--ink-3)" }}>(out-degree)</div>

              <div>
                <TeX>{"\\sum_{\\substack{i \\in V \\\\ i \\neq j}} x_{ij} = 1"}</TeX> &nbsp; ∀ j ∈ V
              </div>
              <div style={{ color: "var(--ink-3)" }}>(in-degree)</div>

              <div style={{ color: "var(--accent)", whiteSpace: "nowrap" }}>
                <TeX>{"\\sum_{i \\in S} \\sum_{\\substack{j \\in S \\\\ j \\neq i}} x_{ij} \\;\\leq\\; |S| - 1"}</TeX> &nbsp; ∀ S ⊊ V, &nbsp; 2 ≤ |S| ≤ n − 1
              </div>
              <div style={{ color: "var(--accent)" }}>(subtour elim.)</div>

              <div>xᵢⱼ ∈ {"{"}0, 1{"}"}</div>
              <div style={{ color: "var(--ink-3)" }}>(integrality)</div>
            </div>
            <div style={{ color: "var(--ink-3)", fontSize: 20, marginTop: 20, lineHeight: 1.4 }}>
              Dantzig, Fulkerson &amp; Johnson (1954) — the formulation that solved a 49-city instance by hand.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPDegree() {
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) setAnimKey(k => k + 1);
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  const r = 26;
  // index 0 = focused node (center), 1-5 = other nodes (unlabeled)
  const pos = [
    { x: 250, y: 255 },
    { x: 250, y: 52  },
    { x: 432, y: 168 },
    { x: 370, y: 430 },
    { x: 130, y: 430 },
    { x: 68,  y: 168 },
  ];

  const seg = (a, b) => {
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.hypot(dx, dy);
    const ux = dx/d, uy = dy/d;
    const x1 = a.x + ux*r, y1 = a.y + uy*r;
    const x2 = b.x - ux*r, y2 = b.y - uy*r;
    return { x1, y1, x2, y2, ux, uy, len: Math.hypot(x2-x1, y2-y1) };
  };

  const arrowPts = (s) => {
    const aw = 9, al = 18;
    const bx = s.x2 - s.ux*al, by = s.y2 - s.uy*al;
    return `${s.x2},${s.y2} ${bx - s.uy*aw},${by + s.ux*aw} ${bx + s.uy*aw},${by - s.ux*aw}`;
  };

  const outCandidates = [1, 3, 4, 5];
  const outSelected   = 2;
  const inCandidates  = [1, 2, 3, 5];
  const inSelected    = 4;

  const renderGraph = (direction, candidates, selected, focusLabel, color, ak) => {
    const cSegs = candidates.map(j =>
      direction === "out" ? seg(pos[0], pos[j]) : seg(pos[j], pos[0])
    );
    const sSeg = direction === "out"
      ? seg(pos[0], pos[selected])
      : seg(pos[selected], pos[0]);

    return (
      <svg key={ak} viewBox="0 0 500 490"
           style={{ width: "100%", height: "100%", display: "block" }}>
        {/* candidate arcs — dashed gray */}
        {cSegs.map((s, idx) => (
          <line key={idx} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke="var(--ink-3)" strokeWidth={2} strokeDasharray="7 5"
            style={{ opacity: 0, animation: "fadeUp 300ms both ease-out",
                     animationDelay: `${500 + idx * 60}ms` }} />
        ))}

        {/* selected arc body */}
        <line x1={sSeg.x1} y1={sSeg.y1} x2={sSeg.x2} y2={sSeg.y2}
          stroke={color} strokeWidth={4} strokeLinecap="round"
          style={{ "--len": sSeg.len, strokeDasharray: sSeg.len,
                   animation: "drawPath 700ms both ease-in-out",
                   animationDelay: "1100ms" }} />

        {/* selected arrowhead */}
        <polygon points={arrowPts(sSeg)} fill={color}
          style={{ opacity: 0, animation: "fadeUp 150ms both ease-out",
                   animationDelay: "1770ms" }} />

        {/* other nodes (unlabeled) */}
        {pos.slice(1).map((n, i) => (
          <g key={i} style={{ animation: "fadeUp 400ms both ease-out",
                              animationDelay: `${(i + 1) * 80}ms` }}>
            <circle cx={n.x} cy={n.y} r={r}
              fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
          </g>
        ))}

        {/* focused node — same style as others, ink border */}
        <g style={{ animation: "fadeUp 400ms both ease-out", animationDelay: "0ms" }}>
          <circle cx={pos[0].x} cy={pos[0].y} r={r + 3}
            fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
          <text x={pos[0].x} y={pos[0].y + 7} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize={19} fontWeight={700}
            fill="var(--ink)">{focusLabel}</text>
        </g>
      </svg>
    );
  };

  return (
    <section ref={sectionRef} className="slide" data-label="Degree constraints">
      <SlideFrame>
        <div className="tag">TSP · Degree constraints</div>
        <h2 className="title" style={{ marginTop: 16 }}>
          Every vertex must be <em style={{ color: "var(--accent)" }}>left</em> and{" "}
          <em style={{ color: "var(--accent-2)" }}>entered</em> exactly once.
        </h2>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr",
                      gap: 36, flex: 1, minHeight: 0 }}>

          {/* OUT-DEGREE — violet */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-2)", lineHeight: 1.35 }}>
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>Out-degree = 1</span>
              {" "}— exactly one arc <em>leaves</em> vᵢ.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)",
                          padding: "18px 26px", fontSize: 34 }}>
              <TeX display>{"\\sum_{\\substack{j \\in V \\\\ j \\neq i}} x_{ij} = 1 \\qquad \\forall\\, i \\in V"}</TeX>
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)",
                          padding: 10, flex: 1, minHeight: 0, overflow: "hidden" }}>
              {renderGraph("out", outCandidates, outSelected, "vᵢ", "var(--accent)", `out-${animKey}`)}
            </div>
          </div>

          {/* IN-DEGREE — amber */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-2)", lineHeight: 1.35 }}>
              <span style={{ color: "var(--accent-2)", fontWeight: 700 }}>In-degree = 1</span>
              {" "}— exactly one arc <em>arrives at</em> vⱼ.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)",
                          padding: "18px 26px", fontSize: 34 }}>
              <TeX display>{"\\sum_{\\substack{i \\in V \\\\ i \\neq j}} x_{ij} = 1 \\qquad \\forall\\, j \\in V"}</TeX>
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)",
                          padding: 10, flex: 1, minHeight: 0, overflow: "hidden" }}>
              {renderGraph("in", inCandidates, inSelected, "vⱼ", "var(--accent-2)", `in-${animKey}`)}
            </div>
          </div>

        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPSubtourProblem() {
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) setAnimKey(k => k + 1);
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // Two disjoint cycles sharing no vertices
  const group1 = [
    { x: 200, y: 230, label: "v₀" },
    { x: 430, y: 160, label: "v₁" },
    { x: 500, y: 360, label: "v₂" },
    { x: 260, y: 410, label: "v₆" },
  ];
  const group2 = [
    { x: 760, y: 240, label: "v₃" },
    { x: 920, y: 420, label: "v₄" },
    { x: 740, y: 560, label: "v₅" },
  ];
  const cycle1 = [[0,1],[1,2],[2,3],[3,0]];
  const cycle2 = [[0,1],[1,2],[2,0]];
  const r = 30;

  const segData = (grp, edges) =>
    edges.map(([a, b]) => {
      const na = grp[a], nb = grp[b];
      const dx = nb.x - na.x, dy = nb.y - na.y;
      const len = Math.hypot(dx, dy);
      const ux = dx / len, uy = dy / len;
      const x1 = na.x + ux * r, y1 = na.y + uy * r;
      const x2 = nb.x - ux * r, y2 = nb.y - uy * r;
      const segLen = Math.hypot(x2 - x1, y2 - y1);
      const aw = 9, al = 18;
      const bx = x2 - ux * al, by = y2 - uy * al;
      const pts = `${x2},${y2} ${bx - uy*aw},${by + ux*aw} ${bx + uy*aw},${by - ux*aw}`;
      return { x1, y1, x2, y2, segLen, pts };
    });

  const arcBodies = (grp, edges, color, startDelay) =>
    segData(grp, edges).map((s, i) => (
      <line key={`${color}-body-${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke={color} strokeWidth={4} strokeLinecap="butt"
            style={{
              "--len": s.segLen,
              strokeDasharray: s.segLen,
              animation: "drawPath 700ms both ease-in-out",
              animationDelay: `${startDelay + i * 350}ms`,
            }}/>
    ));

  const arcHeads = (grp, edges, color, startDelay) =>
    segData(grp, edges).map((s, i) => (
      <polygon key={`${color}-head-${i}`} points={s.pts} fill={color}
               style={{ opacity: 0, animation: "fadeUp 150ms both ease-out",
                        animationDelay: `${startDelay + i * 350 + 680}ms` }}/>
    ));

  return (
    <section ref={sectionRef} className="slide" data-label="The subtour problem">
      <SlideFrame>
        <div className="tag">TSP · The subtour issue</div>
        <h2 className="title" style={{ marginTop: 28, minHeight: 150 }}>
          Degree constraints alone <em style={{ color: "#c1272d" }}>are not enough</em>.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, flex: 1, alignItems: "center" }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 26, position: "relative" }}>
            <svg viewBox="0 0 1050 720" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-sub" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
                <marker id="arrow-accent-sub" markerUnits="userSpaceOnUse"
                        viewBox="0 0 16 12" markerWidth="16" markerHeight="12"
                        refX="16" refY="6" orient="auto">
                  <path d="M0,0 L16,6 L0,12 z" fill="var(--accent)"/>
                </marker>
                <marker id="arrow-accent2-sub" markerUnits="userSpaceOnUse"
                        viewBox="0 0 16 12" markerWidth="16" markerHeight="12"
                        refX="16" refY="6" orient="auto">
                  <path d="M0,0 L16,6 L0,12 z" fill="var(--accent-2)"/>
                </marker>
              </defs>
              <rect width={1050} height={720} fill="url(#dotgrid-sub)" opacity={0.5}/>

              <g key={animKey}>
                {/* Subset hulls fade in after cycles */}
                <g style={{
                  opacity: 0,
                  animation: "fadeUp 600ms both ease-out",
                  animationDelay: `${900 + (cycle1.length + cycle2.length) * 350 + 500}ms`,
                }}>
                  <ellipse cx={350} cy={290} rx={230} ry={175}
                           fill="var(--accent)" fillOpacity={0.06}
                           stroke="var(--accent)" strokeWidth={2} strokeDasharray="6 5"/>
                  <text x={150} y={120} fontFamily="var(--font-display)"
                        fontStyle="italic" fontSize={40} fill="var(--accent)">S</text>
                  <ellipse cx={830} cy={405} rx={200} ry={240}
                           fill="var(--accent-2)" fillOpacity={0.06}
                           stroke="var(--accent-2)" strokeWidth={2} strokeDasharray="6 5"/>
                  <text x={1010} y={175} textAnchor="end" fontFamily="var(--font-display)"
                        fontStyle="italic" fontSize={40} fill="var(--accent-2)">V \ S</text>
                </g>

                {/* Cycle 1 arcs */}
                {arcBodies(group1, cycle1, "var(--accent)", 1000)}
                {arcBodies(group2, cycle2, "var(--accent-2)", 1000 + cycle1.length * 350 + 150)}
                {arcHeads(group1, cycle1, "var(--accent)", 1000)}
                {arcHeads(group2, cycle2, "var(--accent-2)", 1000 + cycle1.length * 350 + 150)}

                {/* Nodes */}
                {group1.map((n, i) => (
                  <g key={`g1-${i}`} style={{ animation: "fadeUp 500ms both ease-out", animationDelay: `${i * 120}ms` }}>
                    <circle cx={n.x} cy={n.y} r={r} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                    <text x={n.x} y={n.y + 9} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={22} fontWeight={600} fill="var(--ink)">
                      {n.label}
                    </text>
                  </g>
                ))}
                {group2.map((n, i) => (
                  <g key={`g2-${i}`} style={{ animation: "fadeUp 500ms both ease-out", animationDelay: `${(i + group1.length) * 120}ms` }}>
                    <circle cx={n.x} cy={n.y} r={r} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                    <text x={n.x} y={n.y + 9} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={22} fontWeight={600} fill="var(--ink)">
                      {n.label}
                    </text>
                  </g>
                ))}
              </g>

              <text x={525} y={700} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-3)">
                FIG. — every vertex has in-degree 1 and out-degree 1, yet this is <em>not</em> a tour.
              </text>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 32, lineHeight: 1.25 }}>
              A solution satisfying all degree equalities can still decompose into <em>two or more disjoint cycles</em>.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid #c1272d", borderLeft: "4px solid #c1272d", padding: "18px 22px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 8, color: "#c1272d" }}>Why it happens</div>
              <div style={{ fontSize: 23, color: "var(--ink-2)", lineHeight: 1.4 }}>
                Degree constraints are <em>local</em>: they see each vertex in isolation. They cannot express the <em>global</em> property that all vertices must lie on a single cycle.
              </div>
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 23, lineHeight: 1.35 }}>
              We need a constraint that <em style={{ color: "var(--accent)" }}>forbids every proper subset</em> S ⊊ V from closing on itself.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPDFJ() {
  const group1 = [
    { x: 200, y: 230, label: "v₀" },
    { x: 430, y: 160, label: "v₁" },
    { x: 500, y: 360, label: "v₂" },
    { x: 260, y: 410, label: "v₆" },
  ];
  const group2 = [
    { x: 760, y: 240, label: "v₃" },
    { x: 920, y: 420, label: "v₄" },
    { x: 740, y: 560, label: "v₅" },
  ];
  const cycle1 = [[0,1],[1,2],[2,3],[3,0]]; // v₀→v₁, v₁→v₂, v₂→v₆, v₆→v₀
  const cycle2 = [[0,1],[1,2],[2,0]];       // v₃→v₄, v₄→v₅, v₅→v₃
  const r = 30;

  const segment = (na, nb) => {
    const dx = nb.x - na.x, dy = nb.y - na.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    return {
      x1: na.x + ux * r, y1: na.y + uy * r,
      x2: nb.x - ux * r, y2: nb.y - uy * r,
    };
  };
  const segLen = (s) => Math.hypot(s.x2 - s.x1, s.y2 - s.y1);

  // Cross-subset arcs created when the packing-form constraint activates.
  // v₁ (in S₁) → v₃ (in S₂),  v₅ (in S₂) → v₂ (in S₁)
  const crossV1V3 = segment(group1[1], group2[0]);
  const crossV2V5 = segment(group2[2], group1[2]);
  const lenV1V3 = segLen(crossV1V3);
  const lenV2V5 = segLen(crossV2V5);

  const [active, setActive] = React.useState(null);
  const [animKey, setAnimKey] = React.useState(0);
  const btnsRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  // Reset interactive state whenever the slide leaves the stage.
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (!el.hasAttribute('data-deck-active')) setActive(null);
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // Native click listener — React's event delegation doesn't reach slides
  // after deck-stage moves them out of their original host.
  React.useEffect(() => {
    const el = btnsRef.current;
    if (!el) return;
    const handler = (e) => {
      const btn = e.target.closest('[data-constraint]');
      if (!btn || !el.contains(btn)) return;
      setActive(btn.getAttribute('data-constraint'));
      setAnimKey(k => k + 1);
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, []);

  const isPacking = active === 'packing';
  const isCut     = active === 'cut';

  const dx13 = group2[0].x - group1[1].x, dy13 = group2[0].y - group1[1].y;
  const d13 = Math.hypot(dx13, dy13);
  const ux13 = dx13/d13, uy13 = dy13/d13;
  const dx25 = group1[2].x - group2[2].x, dy25 = group1[2].y - group2[2].y;
  const d25 = Math.hypot(dx25, dy25);
  const ux25 = dx25/d25, uy25 = dy25/d25;
  const crossArrowPts = (s, ux, uy) => {
    const aw = 9, al = 18;
    const bx = s.x2 - ux*al, by = s.y2 - uy*al;
    return `${s.x2},${s.y2} ${bx - uy*aw},${by + ux*aw} ${bx + uy*aw},${by - ux*aw}`;
  };

  return (
    <section ref={sectionRef} className="slide" data-label="DFJ subtour elimination">
      <SlideFrame>
        <div className="tag">TSP · Subtour elimination (DFJ)</div>
        <h2 className="title" style={{ marginTop: 28, minHeight: 150 }}>
          Forbid every proper subset from closing on itself.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, flex: 1, alignItems: "center" }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 26, position: "relative" }}>
            <svg viewBox="0 0 1050 720" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
              <defs>
                <pattern id="dotgrid-dfj2" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
                {/* Arrow markers — same pattern as slide 36 (SlideTSPMinCut):
                    markerUnits=userSpaceOnUse keeps head size independent of
                    stroke width; refX aligned with tip so it meets the line
                    endpoint (already at the node border via `segment()`). */}
                <marker id="arrow-accent-dfj" markerUnits="userSpaceOnUse"
                        viewBox="0 0 16 12" markerWidth="16" markerHeight="12"
                        refX="16" refY="6" orient="auto">
                  <path d="M0,0 L16,6 L0,12 z" fill="var(--accent)"/>
                </marker>
                <marker id="arrow-accent2-dfj" markerUnits="userSpaceOnUse"
                        viewBox="0 0 16 12" markerWidth="16" markerHeight="12"
                        refX="16" refY="6" orient="auto">
                  <path d="M0,0 L16,6 L0,12 z" fill="var(--accent-2)"/>
                </marker>
                <marker id="arrow-ink-dfj" markerUnits="userSpaceOnUse"
                        viewBox="0 0 18 14" markerWidth="18" markerHeight="14"
                        refX="18" refY="7" orient="auto">
                  <path d="M0,0 L18,7 L0,14 z" fill="var(--ink)"/>
                </marker>
              </defs>
              <rect width={1050} height={720} fill="url(#dotgrid-dfj2)" opacity={0.5}/>

              <ellipse cx={350} cy={290} rx={230} ry={175}
                       fill="var(--accent)" fillOpacity={0.06}
                       stroke="var(--accent)" strokeWidth={2} strokeDasharray="6 5"/>
              <text x={150} y={120} fontFamily="var(--font-display)"
                    fontStyle="italic" fontSize={40} fill="var(--accent)">S</text>
              <ellipse cx={830} cy={405} rx={200} ry={240}
                       fill="var(--accent-2)" fillOpacity={0.06}
                       stroke="var(--accent-2)" strokeWidth={2} strokeDasharray="6 5"/>
              <text x={1010} y={175} textAnchor="end" fontFamily="var(--font-display)"
                    fontStyle="italic" fontSize={40} fill="var(--accent-2)">V \ S</text>

              {/* Cycle 1 — arc v₁→v₂ (index 1) blinks, then fades out.
                  All delays include a 1500ms pause after the click, to give the viewer
                  time to register which button was pressed before the animation begins.
                  Packing: blink at 1500ms, fade at 2800ms.
                  Cut:     crossing arcs appear first, then this blinks at 3700ms and fades at 5000ms. */}
              {cycle1.map((e, i) => {
                const s = segment(group1[e[0]], group1[e[1]]);
                const animateHide = (isPacking || isCut) && i === 1;
                const blinkDelay = isPacking ? 1500 : 3700;
                const fadeDelay  = isPacking ? 2800 : 5000;
                return <line key={`c1-${i}-${animKey}`} {...s}
                             stroke="var(--accent)" strokeWidth={4} strokeLinecap="butt"
                             markerEnd="url(#arrow-accent-dfj)"
                             style={animateHide ? {
                               animation: `fadeOut 450ms ease-out ${fadeDelay}ms both, blink 400ms ease-in-out ${blinkDelay}ms 3`,
                             } : {}}/>;
              })}
              {/* Cycle 2 — arc v₅→v₃ (index 2):
                  - on `cut` blinks at 3700ms (before crossings appear);
                  - on `packing` blinks AFTER the two black crossing arcs are drawn
                    (last arrow fadeUp ends ~5430ms → blink at 5600ms). */}
              {cycle2.map((e, i) => {
                const s = segment(group2[e[0]], group2[e[1]]);
                const animateHide = (isPacking || isCut) && i === 2;
                const blinkDelay = isPacking ? 5600 : 3700;
                const fadeDelay  = isPacking ? 6900 : 5000;
                return <line key={`c2-${i}-${animKey}`} {...s}
                             stroke="var(--accent-2)" strokeWidth={4} strokeLinecap="butt"
                             markerEnd="url(#arrow-accent2-dfj)"
                             style={animateHide ? {
                               animation: `fadeOut 450ms ease-out ${fadeDelay}ms both, blink 400ms ease-in-out ${blinkDelay}ms 3`,
                             } : {}}/>;
              })}

              {/* Crossing arcs v₁→v₃ and v₂→v₅ — appear for both forms but with different ordering.
                  Packing: crossings appear last (after callout).
                  Cut:     crossings appear first (after the 1.5s initial pause). */}
              {(isPacking || isCut) && (
                <g key={`cross-${animKey}`}>
                  <line {...crossV1V3}
                        stroke="var(--ink)" strokeWidth={4} strokeLinecap="butt"
                        style={{
                          "--len": lenV1V3,
                          strokeDasharray: lenV1V3,
                          animation: "drawPath 900ms both ease-out",
                          animationDelay: isPacking ? "4100ms" : "1500ms",
                        }}/>
                  <line {...crossV2V5}
                        stroke="var(--ink)" strokeWidth={4} strokeLinecap="butt"
                        style={{
                          "--len": lenV2V5,
                          strokeDasharray: lenV2V5,
                          animation: "drawPath 900ms both ease-out",
                          animationDelay: isPacking ? "4400ms" : "1800ms",
                        }}/>
                  <polygon points={crossArrowPts(crossV1V3, ux13, uy13)} fill="var(--ink)"
                           style={{ opacity: 0, animation: "fadeUp 150ms both ease-out",
                                    animationDelay: isPacking ? "4980ms" : "2380ms" }}/>
                  <polygon points={crossArrowPts(crossV2V5, ux25, uy25)} fill="var(--ink)"
                           style={{ opacity: 0, animation: "fadeUp 150ms both ease-out",
                                    animationDelay: isPacking ? "5280ms" : "2680ms" }}/>
                </g>
              )}

              {group1.map((n, i) => (
                <g key={`g1-${i}`}>
                  <circle cx={n.x} cy={n.y} r={r} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                  <text x={n.x} y={n.y + 9} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={22} fontWeight={600} fill="var(--ink)">
                    {n.label}
                  </text>
                </g>
              ))}
              {group2.map((n, i) => (
                <g key={`g2-${i}`}>
                  <circle cx={n.x} cy={n.y} r={r} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                  <text x={n.x} y={n.y + 9} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={22} fontWeight={600} fill="var(--ink)">
                    {n.label}
                  </text>
                </g>
              ))}

              {/* Degree-constraints callout — KaTeX inside foreignObject, positioned
                  above the viewBox top (negative y) so it sits clear of S₁ / v₁.
                  Requires overflow:visible on the parent <svg> element.
                  Packing: appears at 1900ms (after arcs blink+fade).
                  Cut:     appears at 1400ms (after crossing arcs drawn). */}
              {(isPacking || isCut) && (
                <foreignObject key={`deg-${animKey}`} x={135} y={-170} width={780} height={220}
                               style={{
                                 opacity: 0,
                                 animation: "fadeUp 600ms both ease-out",
                                 animationDelay: isPacking ? "3400ms" : "2900ms",
                                 overflow: "visible",
                               }}>
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{
                    width: "100%",
                    height: "100%",
                    background: "var(--paper)",
                    border: "2px solid var(--ink)",
                    borderRadius: 6,
                    padding: "16px 28px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    fontFamily: "var(--font-mono)",
                  }}>
                    <div style={{ fontSize: 19, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
                      DEGREE CONSTRAINTS STILL HOLD
                    </div>
                    <div style={{ display: "flex", gap: 64, alignItems: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{ fontSize: 16, color: "var(--ink-3)", letterSpacing: "0.06em" }}>OUT-DEGREE</div>
                        <div style={{ fontSize: 38 }}>
                          <TeX>{"\\sum_{\\substack{j \\in V \\\\ j \\neq i}} x_{ij} = 1"}</TeX>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{ fontSize: 16, color: "var(--ink-3)", letterSpacing: "0.06em" }}>IN-DEGREE</div>
                        <div style={{ fontSize: 38 }}>
                          <TeX>{"\\sum_{\\substack{i \\in V \\\\ i \\neq j}} x_{ij} = 1"}</TeX>
                        </div>
                      </div>
                    </div>
                  </div>
                </foreignObject>
              )}

              <text x={525} y={700} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-3)">
                FIG. — every vertex has in-degree 1 and out-degree 1, yet this is <em>not</em> a tour.
              </text>
            </svg>
          </div>

          <div ref={btnsRef} style={{ display: "flex", flexDirection: "column", gap: 18, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 30, lineHeight: 1.22 }}>
              The <em>Dantzig–Fulkerson–Johnson</em> cut. For every proper subset <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>S</span> of vertices, the arcs chosen <em>inside</em> S must fall short of forming a cycle — forcing at least one arc to cross the boundary.
            </div>
            <div data-constraint="packing" style={{
              background: isPacking ? "rgba(107,74,245,0.08)" : "var(--paper-2)",
              border: `1px solid ${isPacking ? "var(--accent)" : "var(--line)"}`,
              borderLeft: `${isPacking ? 4 : 1}px solid ${isPacking ? "var(--accent)" : "var(--line)"}`,
              padding: "22px 28px",
              fontFamily: "var(--font-mono)",
              fontSize: 30,
              cursor: "pointer",
              userSelect: "none",
              transform: isPacking ? "translateX(6px)" : "translateX(0)",
              transition: "all 320ms ease",
            }}>
              <div style={{ color: isPacking ? "var(--accent)" : "var(--ink-3)", fontSize: 22, marginBottom: 6 }}>packing form</div>
              <TeX display>{"\\sum_{i \\in S}\\sum_{\\substack{j \\in S \\\\ j \\neq i}} x_{ij} \\;\\leq\\; |S| - 1"}</TeX>
            </div>
            <div data-constraint="cut" style={{
              background: isCut ? "rgba(107,74,245,0.08)" : "var(--paper-2)",
              border: `1px solid ${isCut ? "var(--accent)" : "var(--line)"}`,
              borderLeft: `${isCut ? 4 : 1}px solid ${isCut ? "var(--accent)" : "var(--line)"}`,
              padding: "22px 28px",
              fontFamily: "var(--font-mono)",
              fontSize: 30,
              cursor: "pointer",
              userSelect: "none",
              transform: isCut ? "translateX(6px)" : "translateX(0)",
              transition: "all 320ms ease",
            }}>
              <div style={{ color: isCut ? "var(--accent)" : "var(--ink-3)", fontSize: 22, marginBottom: 6 }}>equivalent cut form</div>
              <TeX display>{"\\sum_{i \\notin S}\\sum_{j \\in S} x_{ij} \\;\\geq\\; 1"}</TeX>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)", fontSize: 20, lineHeight: 1.35 }}>
              Required for every S ⊊ V with 2 ≤ |S| ≤ n − 1.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPExponential() {
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) setAnimKey(k => k + 1);
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // Bars: log10 of the number of valid S. At (n=5) only ~25; log≈1.4.
  // Pinned to a shared max (30) for the log scale axis.
  const data = [
    { n: 5,   label: "25",        log: 1.4  },
    { n: 10,  label: "≈ 10³",     log: 3.0  },
    { n: 20,  label: "≈ 10⁶",     log: 6.0  },
    { n: 50,  label: "≈ 10¹⁵",    log: 15.0 },
    { n: 100, label: "≈ 10³⁰",    log: 30.0 },
  ];

  const axisMax = 32;
  const chartY0 = 560;
  const chartTop = 80;
  const chartH = chartY0 - chartTop; // 480
  const barW = 88;
  const gap = 38;
  const x0 = 130;

  // Gradient stops: green (few constraints = tractable) → yellow/orange → red
  // (many constraints = intractable). t in [0,1].
  const gradientStops = [
    { t: 0.00, r: 0x2b, g: 0x7a, b: 0x5e }, // forest green  (like --accent-3 light)
    { t: 0.30, r: 0x7a, g: 0x9a, b: 0x2e }, // lime / olive
    { t: 0.55, r: 0xe8, g: 0x93, b: 0x21 }, // amber          (like --accent-2 light)
    { t: 0.80, r: 0xd2, g: 0x5a, b: 0x25 }, // orange
    { t: 1.00, r: 0xb8, g: 0x32, b: 0x2e }, // red / danger
  ];
  const expColor = (t) => {
    const x = Math.max(0, Math.min(1, t));
    for (let i = 0; i < gradientStops.length - 1; i++) {
      const a = gradientStops[i], b = gradientStops[i + 1];
      if (x <= b.t) {
        const k = (x - a.t) / (b.t - a.t);
        const r = Math.round(a.r + (b.r - a.r) * k);
        const g = Math.round(a.g + (b.g - a.g) * k);
        const bl = Math.round(a.b + (b.b - a.b) * k);
        return `rgb(${r}, ${g}, ${bl})`;
      }
    }
    const last = gradientStops[gradientStops.length - 1];
    return `rgb(${last.r}, ${last.g}, ${last.b})`;
  };

  return (
    <section ref={sectionRef} className="slide" data-label="Exponential blow-up of DFJ">
      <SlideFrame>
        <div className="tag">TSP · The combinatorial wall</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          Subtour elimination constraints grow <em style={{ color: "#b8322e" }}>exponentially</em>.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 30, lineHeight: 1.22 }}>
              One DFJ constraint for <em>every</em> proper subset of <span style={{ fontFamily: "var(--font-mono)" }}>V</span> of size between 2 and n − 1:
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 24px", fontFamily: "var(--font-mono)", fontSize: 22 }}>
              <TeX display>{"\\begin{aligned}\n\\#\\{S \\subsetneq V : 2 \\leq |S| \\leq n-1\\}\n  &= \\underbrace{2^{n}}_{\\text{all subsets of }V}\n   \\;-\\; \\underbrace{1}_{|S|=0}\n   \\;-\\; \\underbrace{n}_{|S|=1}\n   \\;-\\; \\underbrace{1}_{|S|=n} \\\\[4pt]\n  &= 2^{n} - n - 2\n\\end{aligned}"}</TeX>
              <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--ink-3)", lineHeight: 1.6, fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "calt" 0' }}>
                <div>|S|=0 → ∅ (empty set)</div>
                <div>|S|=1 → singletons {"{v}"}, one per vertex (n in total)</div>
                <div>|S|=n → V itself</div>
              </div>
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 23, lineHeight: 1.35 }}>
              Already unmanageable at n ≈ 30. For realistic instances — hundreds of customers — the full model <em>cannot even be written down</em>, let alone passed to a solver.
            </div>
            <div className="body small" style={{ fontSize: 21, color: "var(--ink-3)", lineHeight: 1.35, fontStyle: "italic" }}>
              So how do solvers handle it in practice? → see next slide.
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 900 680" style={{ width: "100%", height: "100%", display: "block" }}>
              {/* Axes */}
              <line x1={80} y1={chartTop} x2={80} y2={chartY0} stroke="var(--ink)" strokeWidth={2}/>
              <line x1={80} y1={chartY0} x2={860} y2={chartY0} stroke="var(--ink)" strokeWidth={2}/>

              <text x={30} y={50} fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink-3)">
                log₁₀(#constraints)
              </text>
              <text x={860} y={610} fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink-3)" textAnchor="end">
                n (cities) →
              </text>

              {/* Y ticks */}
              {[0, 10, 20, 30].map((v) => {
                const y = chartY0 - (v / axisMax) * chartH;
                return (
                  <g key={v}>
                    <line x1={75} y1={y} x2={80} y2={y} stroke="var(--ink)" strokeWidth={1.5}/>
                    <line x1={80} y1={y} x2={860} y2={y} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 5"/>
                    <text x={65} y={y + 5} textAnchor="end" fontFamily="var(--font-mono)" fontSize={16} fill="var(--ink-3)">
                      10{v === 0 ? "⁰" : v === 10 ? "¹⁰" : v === 20 ? "²⁰" : "³⁰"}
                    </text>
                  </g>
                );
              })}

              <g key={animKey}>
                {data.map((d, i) => {
                  const xCenter = x0 + i * (barW + gap) + barW / 2;
                  const h = (d.log / axisMax) * chartH;
                  const delay = 400 + i * 280;
                  // Position along the gradient: smooth green → amber → red
                  // progression across the 5 bars.
                  const color = expColor(i / (data.length - 1));
                  return (
                    <g key={i}>
                      {/* Growing bar — implemented as a thick stroked line */}
                      <line x1={xCenter} y1={chartY0} x2={xCenter} y2={chartY0 - h}
                            stroke={color} strokeWidth={barW}
                            style={{
                              "--len": h,
                              strokeDasharray: h,
                              animation: "drawPath 900ms both ease-out",
                              animationDelay: `${delay}ms`,
                            }}/>
                      {/* Count label above bar */}
                      <text x={xCenter} y={chartY0 - h - 14}
                            textAnchor="middle" fontFamily="var(--font-mono)"
                            fontSize={19} fontWeight={600} fill={color}
                            style={{ opacity: 0, animation: "fadeUp 500ms both ease-out", animationDelay: `${delay + 700}ms` }}>
                        {d.label}
                      </text>
                      {/* n label below */}
                      <text x={xCenter} y={chartY0 + 28}
                            textAnchor="middle" fontFamily="var(--font-mono)"
                            fontSize={20} fontWeight={600} fill="var(--ink)">
                        n = {d.n}
                      </text>
                    </g>
                  );
                })}
              </g>

              <text x={470} y={655} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink-3)">
                FIG. — logarithmic vertical axis: each step up is a factor of 10.
              </text>
            </svg>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPLazy() {
  return (
    <section className="slide" data-label="Lazy subtour cut generation">
      <SlideFrame>
        <div className="tag">TSP · Branch-and-cut in practice</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          Subtour cuts are <em style={{ color: "var(--accent)" }}>never enumerated</em> — they are added lazily inside branch-and-cut.
        </h2>

        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, flex: 1, alignItems: "stretch", minHeight: 0 }}>
          {/* -------- Left column: the idea -------- */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="lede" style={{ fontSize: 28, lineHeight: 1.3 }}>
              Start with a <em>weak</em> model — only degree constraints and variable bounds, <em>no DFJ cuts</em>. Let a <em>separation oracle</em> inject them one at a time, only when the current LP solution actually violates one.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "16px 20px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 8, color: "var(--accent)" }}>Separation oracle</div>
              <div style={{ fontSize: 21, lineHeight: 1.35 }}>
                A <em>black box</em> that takes the current fractional solution x* and answers one question:
              </div>
              <div style={{ marginTop: 10, paddingLeft: 14, borderLeft: "3px solid var(--accent)", fontSize: 20, lineHeight: 1.35, fontStyle: "italic" }}>
                "Is there any subset S ⊂ V whose DFJ cut is violated by x*?"
              </div>
              <div style={{ marginTop: 10, fontSize: 20, lineHeight: 1.4, color: "var(--ink-2)" }}>
                It returns either <em>no violation</em> (x* is DFJ-feasible, stop) or one specific <em>violated S</em>:
              </div>
              <div style={{ marginTop: 8, background: "var(--paper)", border: "1px solid var(--line)", padding: "8px 14px", fontSize: 20, textAlign: "center" }}>
                <TeX>{"\\sum_{i,j \\in S} x^*_{ij} \\;>\\; |S| - 1"}</TeX>
              </div>
              <div style={{ marginTop: 10, fontSize: 18, color: "var(--ink-3)", lineHeight: 1.35, fontStyle: "italic" }}>
                Implemented as a min-cut / max-flow computation — polynomial in n, <em>without</em> enumerating the 2ⁿ subsets.
              </div>
            </div>

            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "16px 20px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 6, color: "var(--paper-deep)" }}>Why this is correct</div>
              <div style={{ fontSize: 22, lineHeight: 1.35 }}>
                When the oracle finds <em>no</em> violated S, x* already satisfies every one of the 2ⁿ − n − 2 DFJ cuts — <em>including the ones never written down</em>.
              </div>
            </div>

            <div className="body small" style={{ fontSize: 20, color: "var(--ink-3)", lineHeight: 1.35 }}>
              Typical 100-city run: a few dozen cuts are added in total, not 10³⁰.
            </div>
          </div>

          {/* -------- Right column: flowchart -------- */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 18, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", minHeight: 0 }}>
            <svg viewBox="0 0 790 640" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <marker id="lz-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink)"/>
                </marker>
                <marker id="lz-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/>
                </marker>
              </defs>

              {/* Box 1: Initial LP */}
              <rect x="120" y="10" width="440" height="70" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              <text x="340" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fontWeight={600} fill="var(--ink)">Initial LP relaxation</text>
              <text x="340" y="63" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)">degree constraints + bounds · NO DFJ cuts</text>

              {/* 1 → 2 */}
              <line x1="340" y1="82" x2="340" y2="128" stroke="var(--ink)" strokeWidth={2} markerEnd="url(#lz-arrow)"/>

              {/* Box 2: Solve LP */}
              <rect x="210" y="130" width="260" height="62" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              <text x="340" y="158" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fontWeight={600} fill="var(--ink)">Solve LP  →  x*</text>
              <text x="340" y="180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">(possibly fractional)</text>

              {/* 2 → 3 */}
              <line x1="340" y1="194" x2="340" y2="238" stroke="var(--ink)" strokeWidth={2} markerEnd="url(#lz-arrow)"/>

              {/* Decision diamond */}
              <polygon points="340,240 500,305 340,370 180,305" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              <text x="340" y="299" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--ink)">x* contains a</text>
              <text x="340" y="321" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--ink)">subtour?</text>

              {/* → NO (left) */}
              <path d="M 180 305 L 100 305 L 100 398" stroke="var(--ink)" strokeWidth={2} fill="none" markerEnd="url(#lz-arrow)"/>
              <text x="140" y="296" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600} fill="var(--ink)">NO</text>

              {/* → YES (right) */}
              <path d="M 500 305 L 580 305 L 580 398" stroke="var(--accent)" strokeWidth={2.5} fill="none" markerEnd="url(#lz-arrow-accent)"/>
              <text x="516" y="296" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600} fill="var(--accent)">YES</text>

              {/* Box 4: Done */}
              <rect x="10" y="400" width="190" height="82" fill="var(--ink)" stroke="var(--ink)" strokeWidth={2}/>
              <text x="105" y="430" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--paper)">Optimal TSP tour</text>
              <text x="105" y="452" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--paper-deep)">integer · all DFJ</text>
              <text x="105" y="470" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--paper-deep)">implicitly satisfied</text>

              {/* Box 5: Separation oracle */}
              <rect x="410" y="400" width="260" height="98" fill="var(--paper)" stroke="var(--accent)" strokeWidth={2.5}/>
              <text x="540" y="427" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--ink)">Separation oracle</text>
              <text x="540" y="450" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-2)">find S ⊂ V with</text>
              <text x="540" y="471" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink)">Σ x*(S) &gt; |S| − 1</text>
              <text x="540" y="490" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ink-3)">min-cut · polynomial</text>

              {/* 5 → 6 */}
              <line x1="540" y1="500" x2="540" y2="530" stroke="var(--ink)" strokeWidth={2} markerEnd="url(#lz-arrow)"/>

              {/* Box 6: Add cut */}
              <rect x="410" y="532" width="260" height="72" fill="var(--accent)" stroke="var(--accent)" strokeWidth={2}/>
              <text x="540" y="562" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--paper)">Add ONE DFJ cut</text>
              <text x="540" y="588" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--paper)">x(S)  ≤  |S| − 1</text>

              {/* Feedback: box 6 right side → loop back up to Solve LP.
                  The curve lives in the extra right margin of the viewBox
                  (boxes end at x=670; curve bulges to x≈755) so it never
                  overlaps the Separation-oracle / Add-cut boxes. */}
              <path d="M 670 568 C 755 568, 755 161, 470 161" stroke="var(--ink)" strokeWidth={2} fill="none" strokeDasharray="5 4" markerEnd="url(#lz-arrow)"/>
              <text x="770" y="365" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)" transform="rotate(-90 770 365)" textAnchor="middle">re-solve with the new cut</text>
            </svg>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPKeyIdentity() {
  return (
    <section className="slide" data-label="The key identity: relating cuts to arcs">
      <SlideFrame>
        <div className="tag">TSP · Separation oracle foundation</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          The <em style={{ color: "var(--accent)" }}>key identity</em>: relating cuts to arc weights.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 28, lineHeight: 1.35 }}>
              How do degree constraints on every vertex relate to the weights crossing a subset boundary?
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px", display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontSize: 18, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Mathematical foundation
              </div>

              <div style={{ fontSize: 24, lineHeight: 1.6, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 12 }}>
                <div>Each vertex i ∈ S satisfies the degree constraint</div>
                <TeX display>{"\\sum_{j \\neq i}\\left(x^*_{ij} + x^*_{ji}\\right) = 2"}</TeX>

                <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--line)" }}>
                  <div style={{ marginBottom: 8 }}>Summing over all |S| vertices:</div>
                  <div style={{ fontSize: 20, color: "var(--ink-3)", lineHeight: 1.5, marginBottom: 6 }}>
                    • Arcs <em>internal to S</em> have both endpoints in S — counted <em>twice</em>
                  </div>
                  <div style={{ fontSize: 20, color: "var(--ink-3)", lineHeight: 1.5 }}>
                    • Arcs <em>crossing the boundary</em> δ(S) have one endpoint outside S — counted <em>once</em>
                  </div>
                </div>

                <TeX display>{"2\\,x^*(A(S)) \\;+\\; x^*(\\delta(S)) \\;=\\; 2|S|"}</TeX>

                <div style={{ fontSize: 18, color: "var(--ink-2)", marginTop: 6, fontStyle: "italic" }}>
                  This is the foundation for why every violated DFJ constraint can be found as a minimum cut.
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 28, display: "flex", flexDirection: "column", gap: 18, justifyContent: "center" }}>
            <svg viewBox="0 0 800 600" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-key" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
                <marker id="arrow-accent-key" markerUnits="userSpaceOnUse"
                        viewBox="0 0 16 12" markerWidth="16" markerHeight="12"
                        refX="16" refY="6" orient="auto">
                  <path d="M0,0 L16,6 L0,12 z" fill="var(--accent)"/>
                </marker>
                <marker id="arrow-ink-key" markerUnits="userSpaceOnUse"
                        viewBox="0 0 18 14" markerWidth="18" markerHeight="14"
                        refX="18" refY="7" orient="auto">
                  <path d="M0,0 L18,7 L0,14 z" fill="var(--ink)"/>
                </marker>
              </defs>

              <rect width={800} height={600} fill="url(#dotgrid-key)" opacity={0.5}/>

              <ellipse cx={250} cy={300} rx={140} ry={130}
                       fill="var(--accent)" fillOpacity={0.08}
                       stroke="var(--accent)" strokeWidth={2.5} strokeDasharray="5 4"/>
              <text x={120} y={160} fontFamily="var(--font-display)"
                    fontStyle="italic" fontSize={48} fill="var(--accent)">S</text>

              <ellipse cx={550} cy={300} rx={140} ry={130}
                       fill="var(--accent-2)" fillOpacity={0.08}
                       stroke="var(--accent-2)" strokeWidth={2.5} strokeDasharray="5 4"/>
              <text x={700} y={160} textAnchor="end" fontFamily="var(--font-display)"
                    fontStyle="italic" fontSize={48} fill="var(--accent-2)">V \ S</text>

              {/* Arcs first (so they render behind nodes) */}
              <line x1={200} y1={250} x2={300} y2={300} stroke="var(--accent)" strokeWidth={3} markerEnd="url(#arrow-accent-key)"/>
              <line x1={300} y1={300} x2={200} y2={250} stroke="var(--accent)" strokeWidth={3} markerEnd="url(#arrow-accent-key)" strokeDasharray="8 5"/>
              <line x1={200} y1={250} x2={600} y2={280} stroke="var(--ink)" strokeWidth={3.5} markerEnd="url(#arrow-ink-key)"/>

              {/* Nodes on top of arcs */}
              <g>
                <circle cx={200} cy={250} r={20} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                <text x={200} y={260} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fontWeight={600} fill="var(--ink)">i</text>
              </g>

              <g>
                <circle cx={300} cy={300} r={20} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                <text x={300} y={310} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fontWeight={600} fill="var(--ink)">j</text>
              </g>

              <g>
                <circle cx={600} cy={280} r={20} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                <text x={600} y={290} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fontWeight={600} fill="var(--ink)">k</text>
              </g>

              {/* Arc labels */}
              <text x={245} y={235} fontFamily="var(--font-mono)" fontSize={18} fill="var(--accent)" fontWeight={600}>x*ᵢⱼ</text>
              <text x={245} y={335} fontFamily="var(--font-mono)" fontSize={18} fill="var(--accent)" fontWeight={600}>x*ⱼᵢ</text>
              <text x={390} y={260} fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink)" fontWeight={600}>x*ᵢₖ ∈ δ(S)</text>

              <text x={400} y={550} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink-3)">
                Degree constraints at every vertex sum to reveal the structure of cuts.
              </text>
            </svg>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPMinCut() {
  const r = 30;
  const [mode, setMode] = React.useState('integer');
  // animStep: 0 subtours, 1 callout (subtour), 2 crosses blink (dashed w=0),
  //           3 snap solid (w=1), 4 degree-constraints box, 5 old arcs blink+fade, 6 idle
  // (idle = post-animation / slide not yet active; disappearing arcs are simply not
  // rendered so no stale CSS animations are kicked off on mount)
  const [animStep, setAnimStep] = React.useState(6);
  const [animKey, setAnimKey] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [animStarted, setAnimStarted] = React.useState(false);
  // fracStep: 0 static, 1 callout, 2 crossing↑, 3 degree box, 4 crossing↓, 5 blink+fade, 6 idle
  const [fracStep, setFracStep] = React.useState(0);
  const [fracCrossW, setFracCrossW] = React.useState(0.3);   // crossing arcs: 0.3→1.0
  const [fracIntraW, setFracIntraW] = React.useState(0.7);   // intra arcs (v1→v2, v5→v3): 0.7→0.0
  const [fracKey, setFracKey] = React.useState(0);
  const [fracStarted, setFracStarted] = React.useState(false);
  const btnsRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  // Track whether the slide is active so the integer animation only
  // plays while visible and restarts on every activation.
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const check = () => {
      const active = el.hasAttribute('data-deck-active');
      setIsActive(active);
      if (!active) { setMode('integer'); setAnimStarted(false); setFracStarted(false); }
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // Native click delegation — React's onClick doesn't reach slides after
  // deck-stage moves them out of their original host. Clicking "Integer
  // tour" bumps animKey so the animation replays even if mode didn't change.
  React.useEffect(() => {
    const el = btnsRef.current;
    if (!el) return;
    const handler = (e) => {
      const btn = e.target.closest('[data-mode]');
      if (!btn || !el.contains(btn)) return;
      const m = btn.getAttribute('data-mode');
      setMode(m);
      if (m === 'integer')    { setAnimStarted(true); setAnimKey(k => k + 1); }
      if (m === 'fractional') { setFracStarted(true); setFracKey(k => k + 1); }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, []);

  // Integer animation: steps 0–5, parked at idle (6) between animations.
  //
  // useLayoutEffect (not useEffect) so that the animStep reset happens
  // synchronously before the browser paints — otherwise the transition
  // from idle → active briefly shows the final-state scene.
  React.useLayoutEffect(() => {
    if (!isActive || mode !== 'integer') {
      setAnimStep(6);
      return;
    }
    // Show initial state (dashed crossings w=0) without starting timers
    // until the user explicitly clicks the button.
    if (!animStarted) {
      setAnimStep(0);
      return;
    }
    setAnimStep(0);
    const timers = [];
    timers.push(setTimeout(() => setAnimStep(1), 1800));
    timers.push(setTimeout(() => setAnimStep(2), 3800));
    timers.push(setTimeout(() => setAnimStep(3), 4800));  // snap after 1 s blink
    timers.push(setTimeout(() => setAnimStep(4), 6800));  // 2 s pause → degree-constraints box
    timers.push(setTimeout(() => setAnimStep(5), 8300));  // 1.5 s pause → old arcs blink+fade
    return () => timers.forEach(clearTimeout);
  }, [isActive, mode, animKey, animStarted]);

  // Fractional animation — steps 0→1→2 via timers; steps 3→4→5 driven by
  // the weight-animation effect below (setInterval / setTimeout).
  React.useLayoutEffect(() => {
    if (!isActive || mode !== 'fractional') {
      setFracStep(0); setFracCrossW(0.3); setFracIntraW(0.7);
      return;
    }
    if (!fracStarted) { setFracStep(0); setFracCrossW(0.3); setFracIntraW(0.7); return; }
    setFracStep(0); setFracCrossW(0.3); setFracIntraW(0.7);
    const timers = [];
    timers.push(setTimeout(() => setFracStep(1), 1800));  // callout
    timers.push(setTimeout(() => setFracStep(2), 3800));  // start weight increase
    return () => timers.forEach(clearTimeout);
  }, [isActive, mode, fracKey, fracStarted]);

  // Drive fracCrossW: 0.3→1.0 at step 2, pause at step 3, 1.0→0.0 at step 4.
  React.useEffect(() => {
    if (mode !== 'fractional') return;
    if (fracStep === 2) {
      // 0.3 → 1.0 in 7 steps × 285 ms ≈ 2 s
      let w = 0.3;
      const ticker = setInterval(() => {
        w = Math.round((w + 0.1) * 10) / 10;
        setFracCrossW(Math.min(w, 1.0));
        if (w >= 1.0) { clearInterval(ticker); setFracStep(3); }
      }, 285);
      return () => clearInterval(ticker);
    }
    if (fracStep === 3) {
      // 1.5 s pause, then start decrease
      const t = setTimeout(() => setFracStep(4), 1500);
      return () => clearTimeout(t);
    }
    if (fracStep === 4) {
      // 0.7 → 0.0 in 7 steps × 285 ms ≈ 2 s (intra arcs v1→v2 and v5→v3)
      let w = 0.7;
      const ticker = setInterval(() => {
        w = Math.round((w - 0.1) * 10) / 10;
        setFracIntraW(Math.max(w, 0.0));
        if (w <= 0.0) { clearInterval(ticker); setFracStep(5); }
      }, 285);
      return () => clearInterval(ticker);
    }
  }, [mode, fracStep]);

  // Same layout as slide 27 (SlideTSPDFJ): 4 vertices in S, 3 in V\S.
  const V = [
    { id: 'v0', label: 'v₀', x: 200, y: 230, side: 'S' },
    { id: 'v1', label: 'v₁', x: 430, y: 160, side: 'S' },
    { id: 'v2', label: 'v₂', x: 500, y: 360, side: 'S' },
    { id: 'v6', label: 'v₆', x: 260, y: 410, side: 'S' },
    { id: 'v3', label: 'v₃', x: 760, y: 240, side: 'T' },
    { id: 'v4', label: 'v₄', x: 920, y: 420, side: 'T' },
    { id: 'v5', label: 'v₅', x: 740, y: 560, side: 'T' },
  ];
  const byId = Object.fromEntries(V.map(v => [v.id, v]));

  // Integer scene as a storyboard: the full 9-arc set that ever appears
  // during the animation, each tagged with its role. The Hamiltonian tour
  // v₀→v₁→v₃→v₄→v₅→v₂→v₆→v₀ is reached only at step 3. Before that:
  //   step 0–1 : v₁→v₂ and v₅→v₃ carry the two subtours (w=1);
  //              v₁→v₃ and v₅→v₂ are pending crosses (w=0, dashed).
  //   step 2   : crosses blink while still dashed (w=0) for 1 s.
  //   step 3   : crosses snap to solid (w=1) — no morphing animation.
  //   step 4   : the two subtour-closing arcs flip to 0, blink, disappear.
  const INTEGER_ARCS = [
    { from: 'v0', to: 'v1', group: 'S',     kind: 'static' },
    { from: 'v1', to: 'v2', group: 'S',     kind: 'disappearing' },
    { from: 'v2', to: 'v6', group: 'S',     kind: 'static' },
    { from: 'v6', to: 'v0', group: 'S',     kind: 'static' },
    { from: 'v3', to: 'v4', group: 'T',     kind: 'static' },
    { from: 'v4', to: 'v5', group: 'T',     kind: 'static' },
    { from: 'v5', to: 'v3', group: 'T',     kind: 'disappearing' },
    { from: 'v1', to: 'v3', group: 'cross', kind: 'appearing' },
    { from: 'v5', to: 'v2', group: 'cross', kind: 'appearing' },
  ];

  // Map animation step + arc kind → weight, dash flag, and the active
  // transition: `blinking` for appearing arcs at step 2 (blink 1s, dashed w=0),
  // then at step 3 they snap to solid w=1 with no animation; `fading` for
  // disappearing arcs at step 5 (blink 1.5 s, then fade out).
  // At idle (step 6) the disappearing arcs are simply not rendered via
  // the `hidden` flag — avoids kicking off stale CSS animations on mount.
  const arcState = (kind, step) => {
    if (kind === 'appearing') {
      if (step < 2)   return { w: 0, dashed: true,  blinking: false, fading: false };
      if (step === 2) return { w: 0, dashed: true,  blinking: true,  fading: false };
      return            { w: 1, dashed: false, blinking: false, fading: false };
    }
    if (kind === 'disappearing') {
      if (step === 5) return { w: 1, dashed: false, blinking: false, fading: true  };
      if (step >= 6)  return { hidden: true };
      return            { w: 1, dashed: false, blinking: false, fading: false };
    }
    return { w: 1, dashed: false, blinking: false, fading: false };
  };

  // Fractional x* with in-deg = out-deg = 1 at every vertex, but v₁ and v₅
  // split their out-flow into two arcs each, giving x*(δ(S)) = 0.6 < 2.
  const FRACTIONAL = {
    intraS: [
      { from: 'v0', to: 'v1', w: 1.0 },
      { from: 'v1', to: 'v2', w: 0.7 },
      { from: 'v2', to: 'v6', w: 1.0 },
      { from: 'v6', to: 'v0', w: 1.0 },
    ],
    intraT: [
      { from: 'v3', to: 'v4', w: 1.0 },
      { from: 'v4', to: 'v5', w: 1.0 },
      { from: 'v5', to: 'v3', w: 0.7 },
    ],
    cross: [
      { from: 'v1', to: 'v3', w: 0.3 },   // δ⁺(S): out of S
      { from: 'v5', to: 'v2', w: 0.3 },   // δ⁻(S): into S
    ],
  };

  const fmt = (w) => mode === 'integer' ? `${w}` : w.toFixed(1);
  const isInt = mode === 'integer';
  const isFrac = mode === 'fractional';
  // Integer cut total during the animation: 0 before snap (step 3), 2 after.
  const intCutSum = animStep >= 3 ? 2 : 0;
  const fracCutSum = 0.6;

  const btnStyle = (active) => ({
    cursor: "pointer",
    userSelect: "none",
    background: active ? "rgba(107,74,245,0.08)" : "var(--paper-2)",
    border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
    borderLeft: `${active ? 4 : 1}px solid ${active ? "var(--accent)" : "var(--line)"}`,
    padding: "14px 20px",
    fontSize: 20,
    lineHeight: 1.5,
    color: "var(--ink-2)",
    transform: active ? "translateX(6px)" : "translateX(0)",
    transition: "all 320ms ease",
  });

  const segment = (na, nb) => {
    const dx = nb.x - na.x, dy = nb.y - na.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    return {
      x1: na.x + ux * r, y1: na.y + uy * r,
      x2: nb.x - ux * r, y2: nb.y - uy * r,
    };
  };

  // Place a weight label perpendicular to the edge midpoint, on the side
  // farther from `awayFrom`. Using each cluster centroid keeps intra-cycle
  // labels on the outside of the cycle; for crossings we pass a point
  // above or below the line to steer the label into the gap.
  const labelPos = (na, nb, awayFrom, dist = 36) => {
    const midX = (na.x + nb.x) / 2, midY = (na.y + nb.y) / 2;
    const dx = nb.x - na.x, dy = nb.y - na.y;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len, ny = dx / len;
    const s = (midX - awayFrom.x) * nx + (midY - awayFrom.y) * ny;
    const sign = s >= 0 ? 1 : -1;
    return { x: midX + nx * dist * sign, y: midY + ny * dist * sign };
  };
  const CENTER_S = { x: 347, y: 290 };   // centroid of {v₀,v₁,v₂,v₆}
  const CENTER_T = { x: 807, y: 407 };   // centroid of {v₃,v₄,v₅}

  return (
    <section ref={sectionRef} className="slide" data-label="Why separation is a min-cut problem">
      <SlideFrame>
        <div className="tag">TSP · Separation = min-cut</div>
        <h2 className="title" style={{ marginTop: 24 }}>
          Why a <em style={{ color: "var(--accent)" }}>min-cut</em> finds the violated DFJ cut.
        </h2>

        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1.35fr 0.9fr", gap: 28, flex: 1, alignItems: "stretch", minHeight: 0 }}>

          {/* -------- Left column: the equivalence -------- */}
          <div ref={btnsRef} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <div className="lede" style={{ fontSize: 28, lineHeight: 1.3 }}>
              Read <TeX>{"x^*(\\delta(S))"}</TeX> as the <em>total weight</em> on the boundary — the sum <TeX>{"\\sum_{(i,j)\\in\\delta(S)} x^*_{ij}"}</TeX>, <em>not</em> a count of arcs.
            </div>

            {/* Click to show the integer-tour scene on the right. */}
            <div data-mode="integer" style={btnStyle(isInt)}>
              <div className="kicker" style={{ fontSize: 21, marginBottom: 3, color: isInt ? "var(--accent)" : "var(--ink-3)" }}>Integer tour</div>
              <div style={{ fontSize: 24, lineHeight: 1.4 }}>
                A <em>Hamiltonian circuit</em> visits every node exactly once, so the path crosses the boundary of S exactly once in each direction: one arc exits (<TeX>{"\\delta^+(S)"}</TeX>) and one enters (<TeX>{"\\delta^-(S)"}</TeX>). Each <TeX>{"x_{ij}\\in\\{0,1\\}"}</TeX> is the <em>weight</em> of arc <TeX>{"(i,j)"}</TeX>: 1 if the tour uses it, 0 otherwise. Total boundary weight <TeX>{"x(\\delta(S))=1+1=2"}</TeX>.
              </div>
            </div>

            {/* Click to show the fractional x* scene (DFJ violation). */}
            <div data-mode="fractional" style={btnStyle(isFrac)}>
              <div className="kicker" style={{ fontSize: 21, marginBottom: 3, color: isFrac ? "var(--accent)" : "var(--ink-3)" }}>Fractional x*</div>
              <div style={{ fontSize: 24, lineHeight: 1.4 }}>
                In the LP relaxation, <TeX>{"x^*_{ij}\\in[0,1]"}</TeX>: each vertex still satisfies deg = 1, but can <em>split</em> its flow. Here v₁ routes 0.7 inside S (v₁→v₂) and only 0.3 across the boundary (v₁→v₃). When <TeX>{"x^*(\\delta(S)) < 2"}</TeX> the DFJ constraint is violated.
              </div>
            </div>

            {/* Highlighted equivalence — the punchline */}
            <div style={{ background: "var(--accent)", color: "var(--paper)", padding: "11px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 24, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5, color: "var(--paper-deep)", opacity: 0.9 }}>DFJ ⟺ min-cut</div>
              <div style={{ fontSize: 24 }}>
                <TeX display>{"x^*(A(S)) > |S|-1 \\;\\Longleftrightarrow\\; x^*(\\delta(S)) < 2"}</TeX>
              </div>
              <div style={{ marginTop: 4, fontSize: 24, color: "var(--paper-deep)", fontStyle: "italic", opacity: 0.95 }}>
                Finding a violated S ⇒ minimize x*(δ(S)) over all S — a global min-cut.
              </div>
            </div>
          </div>

          {/* -------- Right column: same layout as slide 27 (DFJ) -------- */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 26, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>

            {/* Animation callout for integer mode — subtour diagnosis at step 1,
                flips to "Hamiltonian tour" headline at step 3. Rendered as an
                absolutely-positioned HTML overlay so it sits crisply above the
                SVG without competing with its scaling. */}
            {isInt && animStep >= 1 && animStep <= 2 && (
              <div key={`callout-sub-${animKey}`}
                   style={{
                     position: "absolute",
                     top: 20,
                     left: "50%",
                     transform: "translateX(-50%)",
                     maxWidth: "calc(100% - 52px)",
                     boxSizing: "border-box",
                     padding: "10px 20px",
                     border: "2px solid var(--ink)",
                     background: "var(--paper)",
                     color: "var(--ink)",
                     borderRadius: 3,
                     fontFamily: "var(--font-mono)",
                     fontSize: 16,
                     fontWeight: 600,
                     textAlign: "center",
                     lineHeight: 1.5,
                     zIndex: 3,
                     animation: "fadeUp 420ms both ease-out",
                   }}>
                <TeX>{"x(\\delta(S)) = 0 + 0 = 0 < 2"}</TeX>
                {"  ⇒  there are subtours!"}
              </div>
            )}

            {/* Fractional callout — shown at steps 1-2 while crossing weights animate */}
            {isFrac && fracStep >= 1 && fracStep <= 2 && (
              <div key={`frac-callout-${fracKey}`}
                   style={{
                     position: "absolute",
                     top: 20,
                     left: "50%",
                     transform: "translateX(-50%)",
                     maxWidth: "calc(100% - 52px)",
                     boxSizing: "border-box",
                     padding: "10px 20px",
                     border: "2px solid var(--ink)",
                     background: "var(--paper)",
                     color: "var(--ink)",
                     borderRadius: 3,
                     fontFamily: "var(--font-mono)",
                     fontSize: 16,
                     fontWeight: 600,
                     textAlign: "center",
                     lineHeight: 1.5,
                     zIndex: 3,
                     animation: "fadeUp 420ms both ease-out",
                   }}>
                <TeX>{"x^*(\\delta(S)) = 0.3 + 0.3 = 0.6 < 2"}</TeX>
                {"  ⇒  there are subtours!"}
              </div>
            )}

            {/* Degree-constraints box — always in normal flow when integer mode so
                the SVG never shifts position. Invisible (opacity:0) before step 4,
                fades in at step 4, stays visible at step 5. */}
            {isInt && (
              <div key={`deg-box-${animKey}`}
                   style={{
                     background: "var(--paper)",
                     border: "2px solid var(--ink)",
                     borderRadius: 6,
                     padding: "12px 24px",
                     marginBottom: 12,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     gap: 10,
                     fontFamily: "var(--font-mono)",
                     ...(animStep >= 4 && animStep <= 5
                       ? { animation: "fadeUp 420ms both ease-out" }
                       : { opacity: 0, pointerEvents: "none" }
                     ),
                   }}>
                <div style={{ fontSize: 16, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
                  DEGREE CONSTRAINTS STILL HOLD
                </div>
                <div style={{ display: "flex", gap: 52, alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ fontSize: 13, color: "var(--ink-3)", letterSpacing: "0.06em" }}>OUT-DEGREE</div>
                    <div style={{ fontSize: 32 }}>
                      <TeX>{"\\sum_{\\substack{j \\in V \\\\ j \\neq i}} x_{ij} = 1"}</TeX>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ fontSize: 13, color: "var(--ink-3)", letterSpacing: "0.06em" }}>IN-DEGREE</div>
                    <div style={{ fontSize: 32 }}>
                      <TeX>{"\\sum_{\\substack{i \\in V \\\\ i \\neq j}} x_{ij} = 1"}</TeX>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fractional degree box — same structure as integer, visible at steps 3-5 */}
            {isFrac && (
              <div key={`frac-deg-box-${fracKey}`}
                   style={{
                     background: "var(--paper)",
                     border: "2px solid var(--ink)",
                     borderRadius: 6,
                     padding: "12px 24px",
                     marginBottom: 12,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     gap: 10,
                     fontFamily: "var(--font-mono)",
                     ...(fracStep >= 3 && fracStep <= 5
                       ? { animation: "fadeUp 420ms both ease-out" }
                       : { opacity: 0, pointerEvents: "none" }
                     ),
                   }}>
                <div style={{ fontSize: 16, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
                  DEGREE CONSTRAINTS STILL HOLD
                </div>
                <div style={{ display: "flex", gap: 52, alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ fontSize: 13, color: "var(--ink-3)", letterSpacing: "0.06em" }}>OUT-DEGREE</div>
                    <div style={{ fontSize: 32 }}>
                      <TeX>{"\\sum_{\\substack{j \\in V \\\\ j \\neq i}} x_{ij} = 1"}</TeX>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ fontSize: 13, color: "var(--ink-3)", letterSpacing: "0.06em" }}>IN-DEGREE</div>
                    <div style={{ fontSize: 32 }}>
                      <TeX>{"\\sum_{\\substack{i \\in V \\\\ i \\neq j}} x_{ij} = 1"}</TeX>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <svg viewBox="100 90 930 560" preserveAspectRatio="xMidYMid meet"
                 style={{ width: "100%", flex: "1 1 auto", minHeight: 0, display: "block", overflow: "visible" }}>
              <defs>
                <pattern id="dotgrid-mincut" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
                {/* Arrow markers: one per stroke colour so the head matches
                    the arc. `markerUnits=userSpaceOnUse` keeps the arrow the
                    same size regardless of stroke thickness; refX=16 aligns
                    the tip with the line endpoint (which already sits at the
                    node border thanks to `segment()`). */}
                <marker id="arrow-accent" markerUnits="userSpaceOnUse"
                        viewBox="0 0 16 12" markerWidth="16" markerHeight="12"
                        refX="16" refY="6" orient="auto">
                  <path d="M0,0 L16,6 L0,12 z" fill="var(--accent)"/>
                </marker>
                <marker id="arrow-accent2" markerUnits="userSpaceOnUse"
                        viewBox="0 0 16 12" markerWidth="16" markerHeight="12"
                        refX="16" refY="6" orient="auto">
                  <path d="M0,0 L16,6 L0,12 z" fill="var(--accent-2)"/>
                </marker>
                <marker id="arrow-ink" markerUnits="userSpaceOnUse"
                        viewBox="0 0 18 14" markerWidth="18" markerHeight="14"
                        refX="18" refY="7" orient="auto">
                  <path d="M0,0 L18,7 L0,14 z" fill="var(--ink)"/>
                </marker>
              </defs>
              <rect width={1050} height={720} fill="url(#dotgrid-mincut)" opacity={0.5}/>

              {/* S ellipse (same coords as S₁ in slide 27) */}
              <ellipse cx={350} cy={290} rx={230} ry={175}
                       fill="var(--accent)" fillOpacity={0.06}
                       stroke="var(--accent)" strokeWidth={2} strokeDasharray="6 5"/>
              <text x={150} y={120} fontFamily="var(--font-display)"
                    fontStyle="italic" fontSize={40} fill="var(--accent)">S</text>

              {/* V\S ellipse (same coords as S₂ in slide 27) */}
              <ellipse cx={830} cy={405} rx={200} ry={240}
                       fill="var(--accent-2)" fillOpacity={0.06}
                       stroke="var(--accent-2)" strokeWidth={2} strokeDasharray="6 5"/>
              <text x={1010} y={175} textAnchor="end" fontFamily="var(--font-display)"
                    fontStyle="italic" fontSize={40} fill="var(--accent-2)">V \ S</text>

              {/* Arc rendering — integer mode replays the storyboard,
                  fractional mode shows the static x* scene. */}
              {isInt ? INTEGER_ARCS.map((arc, i) => {
                const state = arcState(arc.kind, animStep);
                if (state.hidden) return null;  // idle: disappearing arcs simply absent
                const va = byId[arc.from], vb = byId[arc.to];
                const seg = segment(va, vb);
                const isCross = arc.group === 'cross';
                const stroke = arc.group === 'S' ? "var(--accent)"
                             : arc.group === 'T' ? "var(--accent-2)"
                                                 : "var(--ink)";
                const marker = arc.group === 'S' ? "arrow-accent"
                             : arc.group === 'T' ? "arrow-accent2"
                                                 : "arrow-ink";
                const center = arc.group === 'S' ? CENTER_S
                             : arc.group === 'T' ? CENTER_T
                             : (arc.from === 'v1' ? { x: 595, y: 600 } : { x: 620, y: 100 });
                const lp = labelPos(va, vb, center, isCross ? 34 : 38);
                // Per-arc animation: `blinking` at step 2 blinks the dashed crosses
                // for 1 s (w=0); at step 3 they snap to solid w=1 with no animation.
                // `fading` at step 4 blinks 3× then fades out.
                const animStyle = state.fading ? {
                  animation: "blink 500ms ease-in-out 0ms 3, fadeOut 500ms ease-out 1500ms forwards",
                } : state.blinking ? {
                  animation: "blink 500ms ease-in-out 0ms 2",
                } : undefined;
                return (
                  <g key={`int-${i}-${animKey}-${state.fading ? 'f' : state.blinking ? 'b' : 'n'}`}>
                    <line {...seg}
                          stroke={stroke}
                          strokeWidth={isCross ? 4.5 : 4}
                          strokeLinecap="butt"
                          strokeDasharray={state.dashed ? "12 7" : undefined}
                          markerEnd={`url(#${marker})`}
                          style={animStyle}/>
                    <text x={lp.x} y={lp.y + (isCross ? 8 : 7)} textAnchor="middle"
                          fontFamily="var(--font-mono)"
                          fontSize={isCross ? 28 : 22}
                          fontWeight={isCross ? 700 : 500}
                          fill={isCross ? "var(--ink)" : "var(--ink-2)"}
                          style={animStyle}>
                      {state.w}
                    </text>
                  </g>
                );
              }) : (
                <>
                  {/* Fractional — intra-S arcs; v1→v2 animates down from 0.7→0.0 then blink+fade */}
                  {FRACTIONAL.intraS.map((e, i) => {
                    const isAnimArc = e.from === 'v1' && e.to === 'v2';
                    if (isAnimArc && fracStep >= 6) return null;
                    const isFading = isAnimArc && fracStep === 5;
                    const animStyle = isFading ? {
                      animation: "blink 500ms ease-in-out 0ms 3, fadeOut 500ms ease-out 1500ms forwards",
                    } : undefined;
                    const displayW = isAnimArc ? fracIntraW.toFixed(1) : fmt(e.w);
                    const va = byId[e.from], vb = byId[e.to];
                    const seg = segment(va, vb);
                    const lp = labelPos(va, vb, CENTER_S, 38);
                    return (
                      <g key={`frac-is-${i}-${fracKey}-${isFading ? 'f' : 'n'}`}>
                        <line {...seg} stroke="var(--accent)" strokeWidth={4}
                              strokeLinecap="butt" markerEnd="url(#arrow-accent)"
                              style={animStyle}/>
                        <text x={lp.x} y={lp.y + 7} textAnchor="middle"
                              fontFamily="var(--font-mono)" fontSize={22}
                              fontWeight={500} fill="var(--ink-2)"
                              style={animStyle}>
                          {displayW}
                        </text>
                      </g>
                    );
                  })}
                  {/* Fractional — intra-(V\S) arcs; v5→v3 animates down from 0.7→0.0 then blink+fade */}
                  {FRACTIONAL.intraT.map((e, i) => {
                    const isAnimArc = e.from === 'v5' && e.to === 'v3';
                    if (isAnimArc && fracStep >= 6) return null;
                    const isFading = isAnimArc && fracStep === 5;
                    const animStyle = isFading ? {
                      animation: "blink 500ms ease-in-out 0ms 3, fadeOut 500ms ease-out 1500ms forwards",
                    } : undefined;
                    const displayW = isAnimArc ? fracIntraW.toFixed(1) : fmt(e.w);
                    const va = byId[e.from], vb = byId[e.to];
                    const seg = segment(va, vb);
                    const lp = labelPos(va, vb, CENTER_T, 38);
                    return (
                      <g key={`frac-it-${i}-${fracKey}-${isFading ? 'f' : 'n'}`}>
                        <line {...seg} stroke="var(--accent-2)" strokeWidth={4}
                              strokeLinecap="butt" markerEnd="url(#arrow-accent2)"
                              style={animStyle}/>
                        <text x={lp.x} y={lp.y + 7} textAnchor="middle"
                              fontFamily="var(--font-mono)" fontSize={22}
                              fontWeight={500} fill="var(--ink-2)"
                              style={animStyle}>
                          {displayW}
                        </text>
                      </g>
                    );
                  })}
                  {/* Fractional — crossing arcs: weight follows fracCrossW (0.3→1.0);
                      always visible, no blink/fade. */}
                  {FRACTIONAL.cross.map((e, i) => {
                    const va = byId[e.from], vb = byId[e.to];
                    const seg = segment(va, vb);
                    const awayFrom = e.from === 'v1' ? { x: 595, y: 600 } : { x: 620, y: 100 };
                    const lp = labelPos(va, vb, awayFrom, 34);
                    return (
                      <g key={`frac-ce-${i}`}>
                        <line {...seg} stroke="var(--ink)" strokeWidth={4.5}
                              strokeLinecap="butt" markerEnd="url(#arrow-ink)"/>
                        <text x={lp.x} y={lp.y + 8} textAnchor="middle"
                              fontFamily="var(--font-mono)" fontSize={28}
                              fontWeight={700} fill="var(--ink)">
                          {fracCrossW.toFixed(1)}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* Vertices (same style as slide 27: paper fill, ink stroke) */}
              {V.map((v) => (
                <g key={v.id}>
                  <circle cx={v.x} cy={v.y} r={r} fill="var(--paper)"
                          stroke="var(--ink)" strokeWidth={3}/>
                  <text x={v.x} y={v.y + 9} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={22}
                        fontWeight={600} fill="var(--ink)">
                    {v.label}
                  </text>
                </g>
              ))}

            </svg>

            {/* Figure caption — HTML so it wraps naturally; changes with mode
                and with animation step. */}
            <div style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)", lineHeight: 1.55 }}>
              {isInt ? (
                animStep >= 6 ? (
                  <>
                    FIG. — integer Hamiltonian tour; every x_ij ∈ {"{0, 1}"}, in-deg = out-deg = 1.
                    <br/>
                    For S = {"{v₀, v₁, v₂, v₆}"}: x(δ⁺(S)) = 1, x(δ⁻(S)) = 1, so x(δ(S)) = {intCutSum}.
                  </>
                ) : (
                  <>
                    FIG. — two disjoint subtours on S and V \ S; crossings pending.
                    <br/>
                    For S = {"{v₀, v₁, v₂, v₆}"}: x(δ(S)) = 0 — DFJ violated.
                  </>
                )
              ) : (
                <>
                  FIG. — fractional x* with in-deg(i) = out-deg(i) = 1 at every vertex.
                  <br/>
                  For S = {"{v₀, v₁, v₂, v₆}"}: x*(δ(S)) = 0.3 + 0.3 = {fracCutSum.toFixed(1)} &lt; 2.
                </>
              )}
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function SlideTSPMinCutAlgo() {
  return (
    <section className="slide" data-label="Separation oracle: step 1 — the procedure">
      <SlideFrame>
        <div className="tag">TSP · Separation oracle · <strong>step 1 of 2</strong> — the procedure</div>
        <h2 className="title" style={{ marginTop: 24 }}>
          The separation oracle, <em style={{ color: "var(--accent)" }}>step by step</em>.
        </h2>

        <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, flex: 1, alignItems: "start", minHeight: 0 }}>

          {/* -------- Left: pseudocode -------- */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                procedure
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 30, fontWeight: 600, color: "var(--accent)" }}>
                SEPARATE-DFJ(x*)
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)", lineHeight: 1.6, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "12px 0" }}>
              <div>input :  fractional x* with deg<sub>x*</sub>(i) = 2 for every i ∈ V</div>
              <div>output:  a violated DFJ cut (S, V\S), or ⊥ if x* is feasible</div>
            </div>

            <div style={{ fontSize: 22, lineHeight: 1.65 }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 600, marginRight: 12 }}>1.</span>
                Build the <em>support graph</em> <TeX>{"G_{x^*} = (V, E)"}</TeX> with arc capacity
                <div style={{ marginTop: 6 }}>
                  <TeX display>{"c_{ij} \\;=\\; x^*_{ij} \\qquad \\forall\\,(i,j) \\in E"}</TeX>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 600, marginRight: 12 }}>2.</span>
                Compute the <em>global minimum cut</em> of <TeX>{"G_{x^*}"}</TeX> — searching over <em>all</em> subsets S ⊂ V for the one with the smallest boundary weight, i.e. checking whether any DFJ constraint is violated:
                <div style={{ marginTop: 6 }}>
                  <TeX display>{"(S^*,\\, V \\setminus S^*) \\;=\\; \\arg\\min_{\\emptyset \\,\\subsetneq\\, S \\,\\subsetneq\\, V} \\; x^*(\\delta(S))"}</TeX>
                  <TeX display>{"\\mu \\;=\\; x^*(\\delta(S^*))"}</TeX>
                </div>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 600, marginRight: 12 }}>3.</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>if</span> <TeX>{"\\mu < 2"}</TeX>
                <div style={{ marginLeft: 38, marginTop: 6, lineHeight: 1.5 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>return</span> the violated DFJ constraint for S*:
                  <div style={{ marginTop: 4 }}>
                    <TeX display>{"x(A(S^*)) \\;\\leq\\; |S^*| - 1"}</TeX>
                  </div>
                  <div style={{ fontSize: 18, color: "var(--ink-3)", marginTop: 2 }}>
                    violated because <TeX>{"x^*(A(S^*)) = |S^*| - \\mu/2 > |S^*| - 1"}</TeX>
                  </div>
                </div>
                <div style={{ marginLeft: 38, marginTop: 8 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>else return</span>&nbsp;&nbsp;<span style={{ fontFamily: "var(--font-mono)", fontSize: 24 }}>⊥</span>&nbsp;&nbsp;<span style={{ color: "var(--ink-3)", fontSize: 18 }}>(x* is feasible)</span>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Right: why the constraint is violated -------- */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 24px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 10 }}>Why that constraint is violated</div>
              <div style={{ fontSize: 22, lineHeight: 1.55, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 6 }}>
                <div>From the degree identity on the previous slide, applied to the optimal cut S*:</div>
                <TeX display>{"2\\,x^*(A(S^*)) + \\mu \\;=\\; 2|S^*|"}</TeX>
                <div>where <TeX>{"\\mu = x^*(\\delta(S^*))"}</TeX>. Divide every term by 2:</div>
                <TeX display>{"\\tfrac{2\\,x^*(A(S^*))}{2} + \\tfrac{\\mu}{2} \\;=\\; \\tfrac{2|S^*|}{2} \\;\\;\\Longrightarrow\\;\\; x^*(A(S^*)) + \\tfrac{\\mu}{2} \\;=\\; |S^*|"}</TeX>
                <div>Isolating <TeX>{"x^*(A(S^*))"}</TeX> by subtracting <TeX>{"\\tfrac{\\mu}{2}"}</TeX> from both sides:</div>
                <TeX display>{"x^*(A(S^*)) \\;=\\; |S^*| - \\tfrac{\\mu}{2}"}</TeX>
                <div>The oracle returned <TeX>{"\\mu < 2"}</TeX> (else no violated cut). Dividing by 2 gives <TeX>{"\\tfrac{\\mu}{2} < 1"}</TeX>, i.e. <TeX>{"{-}\\tfrac{\\mu}{2} > {-}1"}</TeX>. Adding <TeX>{"|S^*|"}</TeX>:</div>
                <TeX display>{"x^*(A(S^*)) \\;=\\; |S^*| - \\tfrac{\\mu}{2} \\;>\\; |S^*| - 1"}</TeX>
                <div>This <em>directly</em> contradicts DFJ: <TeX>{"x(A(S^*)) \\leq |S^*|-1"}</TeX> — so <TeX>{"(S^*, V \\setminus S^*)"}</TeX> is the violated cut returned.</div>
              </div>
            </div>
          </div>

        </div>
      </SlideFrame>
    </section>
  );
}

function SlideTSPMinCutImpl() {
  const Section = ({ label, children }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        {label}
      </div>
      <div style={{ fontSize: 19, lineHeight: 1.5, color: "var(--ink-2)" }}>
        {children}
      </div>
    </div>
  );

  const Cost = ({ children }) => (
    <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-3)", lineHeight: 1.5 }}>
      <span style={{ letterSpacing: "0.08em", textTransform: "uppercase", marginRight: 8 }}>cost</span>
      {children}
    </div>
  );

  const Card = ({ title, accent, children }) => (
    <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderTop: `3px solid ${accent}`, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
      <div className="kicker" style={{ fontSize: 20, color: accent }}>{title}</div>
      {children}
    </div>
  );

  return (
    <section className="slide" data-label="Separation oracle: computing the min-cut">
      <SlideFrame>
        <div className="tag">TSP · Separation oracle · <strong>step 2 of 2</strong> — computing the min-cut</div>
        <h2 className="title" style={{ marginTop: 20 }}>
          Step 2 — how the <em style={{ color: "var(--accent)" }}>global min-cut</em> is computed.
        </h2>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14, flex: 1, minHeight: 0 }}>

          <div style={{ fontSize: 19, lineHeight: 1.45, color: "var(--ink-2)" }}>
            On the support graph <TeX>{"G_{x^*} = (V, E)"}</TeX> with arc capacities <TeX>{"c_{ij} = x^*_{ij}"}</TeX>, finding the global minimum cut is a <em>polynomial</em> problem. Three classical approaches differ in how they exploit — or avoid — the max-flow / min-cut duality.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, flex: 1, alignItems: "stretch", minHeight: 0 }}>

            {/* ── Ford–Fulkerson ───────────────────────────────────────── */}
            <Card title="Ford–Fulkerson / max-flow" accent="var(--accent)">
              <Section label="Idea">
                The <em>max-flow / min-cut theorem</em> says: for any source s and sink t, the maximum s→t flow equals the capacity of the minimum s-t cut. So a max-flow algorithm is also a min-cut algorithm — for one specific pair (s, t) at a time.
              </Section>
              <Section label="Reduction to global min-cut">
                Fix one vertex s ∈ V arbitrarily. For every other vertex t ∈ V \ {"{s}"}, compute a max-flow from s to t and read off the corresponding min s-t cut. The smallest of these n − 1 cuts is the global minimum cut.
              </Section>
              <Section label="Why it works">
                Any partition (S, V\S) has s on one side. Pick any t on the other side: the s-t min-cut is <em>at most</em> cap(S, V\S). Sweeping t over all V \ {"{s}"} therefore sees every possible S — none escapes.
              </Section>
              <Cost>
                n − 1 max-flow calls; with Edmonds–Karp <TeX>{"O(n \\cdot V E^2)"}</TeX>. Conceptually simplest, computationally redundant — many flows duplicate work.
              </Cost>
            </Card>

            {/* ── Gomory–Hu ────────────────────────────────────────────── */}
            <Card title="Gomory–Hu tree" accent="var(--accent-2)">
              <Section label="Idea">
                Build a single weighted tree T on V that simultaneously encodes <em>all</em> <TeX>{"\\binom{n}{2}"}</TeX> pairwise min-cuts. Property: for any u, v ∈ V, the min u-v cut in G equals the <em>lightest edge on the unique u-v path</em> in T.
              </Section>
              <Section label="Construction">
                Still uses n − 1 max-flow calls — one per tree edge — but each call runs on a contracted graph that reuses information from previous flows, avoiding redundant computation across queries.
              </Section>
              <Section label="Global min-cut from T">
                Just pick the lightest edge of T. Removing it splits V into two components: those are exactly S* and V\S*, with cut value equal to that edge's weight.
              </Section>
              <Cost>
                n − 1 max-flow calls, but <em>any</em> later pairwise min-cut query is answered in <TeX>{"O(n)"}</TeX> by tree traversal — ideal when branch-and-cut calls separation many times on similar relaxations.
              </Cost>
            </Card>

            {/* ── Stoer–Wagner ─────────────────────────────────────────── */}
            <Card title="Stoer–Wagner" accent="var(--ink)">
              <Section label="Idea">
                A purely combinatorial algorithm — <em>no max-flow at all</em>. Skips the s-t reduction entirely and works directly on the global cut by repeated graph contraction.
              </Section>
              <Section label="One phase">
                <em>Maximum-adjacency ordering</em>: start from any vertex, then greedily add the vertex most strongly connected to the already-selected set. The last two vertices added — call them s and t — define the <em>cut-of-the-phase</em>: separate t from V \ {"{t}"}, with weight equal to the sum of edges incident to t.
              </Section>
              <Section label="Repeat & contract">
                Record the cut-of-the-phase, then contract s and t into a single supernode and run another phase on the smaller graph. After n − 1 phases, the lightest cut-of-the-phase is the global minimum cut.
              </Section>
              <Cost>
                <TeX>{"O(nm + n^2 \\log n)"}</TeX> with Fibonacci heaps. No augmenting-path machinery, easier to implement than max-flow, very competitive in practice.
              </Cost>
            </Card>

          </div>

          <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "14px 22px", flexShrink: 0 }}>
            <div className="kicker" style={{ fontSize: 16, color: "var(--paper-deep)", marginBottom: 6 }}>Bottom line</div>
            <div style={{ fontSize: 19, lineHeight: 1.4 }}>
              One polynomial call to <span style={{ fontFamily: "var(--font-mono)" }}>SEPARATE-DFJ</span> decides whether <em>any</em> of the 2ⁿ − n − 2 DFJ cuts is violated — and returns one if so. The exponential family is <em>never enumerated</em>.
            </div>
          </div>

        </div>
      </SlideFrame>
    </section>
  );
}

function Slide10() {
  return (
    <section className="slide" data-label="One tour meets capacity">
      <SlideFrame>
        <div className="tag">CVRP · motivation</div>
        <h2 className="title" style={{ marginTop: 28 }}>One vehicle, one tour — until capacity gets in the way.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, flex: 1 }}>
          {/* Left — narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="body" style={{ fontSize: 36, lineHeight: 1.3 }}>
              The TSP solution is a single <span style={{ color: "var(--accent)" }}>Hamiltonian circuit</span> — one vehicle, no constraint other than visiting every customer once and returning to the depot.
            </div>
            <div className="body" style={{ fontSize: 36, lineHeight: 1.3 }}>
              In real distribution problems each customer <span style={{ fontFamily: "var(--font-mono)" }}>i</span> has a known <span style={{ color: "var(--accent)" }}>demand</span> <span style={{ fontFamily: "var(--font-mono)" }}>d<sub>i</sub> ≥ 0</span>, and every vehicle has a finite <span style={{ color: "var(--accent)" }}>capacity</span> <span style={{ fontFamily: "var(--font-mono)" }}>C</span>.
            </div>
            <div className="body" style={{ fontSize: 36, lineHeight: 1.3 }}>
              When the cumulative demand <span style={{ fontFamily: "var(--font-mono)" }}>d(V) = ∑<sub>i</sub> d<sub>i</sub></span> exceeds <span style={{ fontFamily: "var(--font-mono)" }}>C</span>, the goods simply do not fit on board: a single tour <span style={{ color: "var(--accent)" }}>cannot serve everyone in one run</span>.
            </div>
          </div>

          {/* Right — Hamiltonian graph */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, display: "flex", flexDirection: "column" }}>
            <div className="kicker">TSP · one vehicle · no capacity</div>
            <div style={{ flex: 1 }}>
              <VRPGraph nodes={EX_NODES} routes={[[9,10,1,2,3,4,5,11,12,6,7,8]]}
                        width={900} height={560} routeColors={["var(--ink)"]} strokeWidth={3.6}
                        className="hamilton-slow"/>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)", marginTop: 10, minHeight: 76 }}>
              Hamiltonian circuit. Total demand may exceed any real vehicle's capacity.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide10B() {
  return (
    <section className="slide" data-label="From one tour to many — CVRP">
      <SlideFrame>
        <div className="tag">CVRP · motivation</div>
        <h2 className="title" style={{ marginTop: 28 }}>From one tour to many — the Capacitated VRP.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, flex: 1 }}>
          {/* Left — narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="body" style={{ fontSize: 36, lineHeight: 1.3 }}>
              We split the customers across a fleet of <span style={{ color: "var(--accent)" }}>K identical vehicles</span>, each with capacity <span style={{ fontFamily: "var(--font-mono)" }}>C</span>, all based at a single depot.
            </div>
            <div className="body" style={{ fontSize: 36, lineHeight: 1.3 }}>
              The solution is a <span style={{ color: "var(--accent)" }}>collection of K simple circuits</span>:
              <ul style={{ margin: "10px 0 0 0", paddingLeft: 32, listStyleType: "disc" }}>
                <li style={{ marginTop: 6 }}>every route starts and ends at the depot;</li>
                <li style={{ marginTop: 6 }}>every customer is visited <span style={{ fontFamily: "var(--font-mono)" }}>exactly once</span>;</li>
                <li style={{ marginTop: 6 }}>on every route the demand served stays within <span style={{ fontFamily: "var(--font-mono)" }}>C</span>.</li>
              </ul>
            </div>
            <div className="body" style={{ fontSize: 36, lineHeight: 1.3 }}>
              The objective: <span style={{ color: "var(--accent)" }}>minimise the total cost</span> — sum of arc costs across all K routes. The total distance is larger than the TSP tour, but feasibility is restored.
            </div>
          </div>

          {/* Right — K-routes graph (same box, same size, same position as slide A) */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, display: "flex", flexDirection: "column" }}>
            <div className="kicker" style={{ color: "var(--accent)" }}>CVRP · K vehicles · capacity C</div>
            <div style={{ flex: 1 }}>
              <VRPGraph nodes={EX_NODES} routes={EX_ROUTES}
                        width={900} height={560} strokeWidth={3.6}/>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)", marginTop: 10, minHeight: 76 }}>
              Several routes, each depot-to-depot, each respecting capacity.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


Object.assign(window, {
  SlideTSPSection, Slide09, SlideTSPHamiltonian, SlideTSPFormulation,
  SlideTSPDegree, SlideTSPSubtourProblem, SlideTSPDFJ, SlideTSPExponential,
  SlideTSPLazy, SlideTSPKeyIdentity, SlideTSPMinCut, SlideTSPMinCutAlgo, SlideTSPMinCutImpl, Slide10, Slide10B,
});
