/* =========================================================================
   VRP Seminar — Part IV: TSP
   Slides: section header, informal statement, Hamiltonian circuit,
           ILP formulation, degree constraints, subtour problem,
           DFJ subtour elimination, exponential blow-up, TSP -> VRP
   ========================================================================= */

function SlideTSPSection() {
  return (
    <section className="slide section-slide" data-label="Part IV — TSP">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part IV of IX</div>
        <div>Slides 22 — 28</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Four</div>
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
                <TeX display>{String.raw`c(\tau) \;=\; \sum_{k=0}^{n} c_{\,\pi(k),\,\pi(k+1)}`}</TeX>
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
              <TeX display>{String.raw`\min \; \sum_{i \in V} \sum_{\substack{j \in V \\ j \neq i}} c_{ij}\, x_{ij}`}</TeX>
            </div>
            <div style={{ color: "var(--ink-3)", marginBottom: 10 }}>subject to</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", rowGap: 14, columnGap: 18 }}>
              <div>
                <TeX>{String.raw`\sum_{\substack{j \in V \\ j \neq i}} x_{ij} = 1`}</TeX> &nbsp; ∀ i ∈ V
              </div>
              <div style={{ color: "var(--ink-3)" }}>(out-degree)</div>

              <div>
                <TeX>{String.raw`\sum_{\substack{i \in V \\ i \neq j}} x_{ij} = 1`}</TeX> &nbsp; ∀ j ∈ V
              </div>
              <div style={{ color: "var(--ink-3)" }}>(in-degree)</div>

              <div style={{ color: "var(--accent)" }}>
                <TeX>{String.raw`\sum_{i \in S} \sum_{\substack{j \in S \\ j \neq i}} x_{ij} \;\leq\; |S| - 1`}</TeX>
                <div style={{ color: "var(--accent)", fontSize: 19, marginTop: 4 }}>∀ S ⊊ V, &nbsp; 2 ≤ |S| ≤ n − 1</div>
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
              <TeX display>{String.raw`\sum_{\substack{j \in V \\ j \neq i}} x_{ij} = 1 \qquad \forall\, i \in V`}</TeX>
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
              <TeX display>{String.raw`\sum_{\substack{i \in V \\ i \neq j}} x_{ij} = 1 \qquad \forall\, j \in V`}</TeX>
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

  const arcSegments = (grp, edges, color, startDelay) =>
    edges.map(([a, b], i) => {
      const na = grp[a], nb = grp[b];
      const dx = nb.x - na.x, dy = nb.y - na.y;
      const len = Math.hypot(dx, dy);
      const ux = dx / len, uy = dy / len;
      const x1 = na.x + ux * r, y1 = na.y + uy * r;
      const x2 = nb.x - ux * r, y2 = nb.y - uy * r;
      const segLen = Math.hypot(x2 - x1, y2 - y1);
      const delay = startDelay + i * 350;
      return (
        <line key={`${color}-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={color} strokeWidth={4} strokeLinecap="round"
              style={{
                "--len": segLen,
                strokeDasharray: segLen,
                animation: "drawPath 700ms both ease-in-out",
                animationDelay: `${delay}ms`,
              }}/>
      );
    });

  return (
    <section ref={sectionRef} className="slide" data-label="The subtour problem">
      <SlideFrame>
        <div className="tag">TSP · The subtour issue</div>
        <h2 className="title" style={{ marginTop: 28, minHeight: 150 }}>
          Degree constraints alone <em style={{ color: "var(--accent-2)" }}>are not enough</em>.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, flex: 1, alignItems: "center" }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 26, position: "relative" }}>
            <svg viewBox="0 0 1050 720" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-sub" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
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
                        fontStyle="italic" fontSize={40} fill="var(--accent)">S₁</text>
                  <ellipse cx={830} cy={405} rx={200} ry={240}
                           fill="var(--accent-2)" fillOpacity={0.06}
                           stroke="var(--accent-2)" strokeWidth={2} strokeDasharray="6 5"/>
                  <text x={1010} y={175} textAnchor="end" fontFamily="var(--font-display)"
                        fontStyle="italic" fontSize={40} fill="var(--accent-2)">S₂</text>
                </g>

                {/* Cycle 1 arcs */}
                {arcSegments(group1, cycle1, "var(--accent)", 1000)}
                {/* Cycle 2 arcs */}
                {arcSegments(group2, cycle2, "var(--accent-2)", 1000 + cycle1.length * 350 + 150)}

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
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--accent-2)", borderLeft: "4px solid var(--accent-2)", padding: "18px 22px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 8, color: "var(--accent-2)" }}>Why it happens</div>
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
  // v₁ (in S₁) → v₃ (in S₂),  v₂ (in S₁) → v₅ (in S₂)
  const crossV1V3 = segment(group1[1], group2[0]);
  const crossV2V5 = segment(group1[2], group2[2]);
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
              </defs>
              <rect width={1050} height={720} fill="url(#dotgrid-dfj2)" opacity={0.5}/>

              <ellipse cx={350} cy={290} rx={230} ry={175}
                       fill="var(--accent)" fillOpacity={0.06}
                       stroke="var(--accent)" strokeWidth={2} strokeDasharray="6 5"/>
              <text x={150} y={120} fontFamily="var(--font-display)"
                    fontStyle="italic" fontSize={40} fill="var(--accent)">S₁</text>
              <ellipse cx={830} cy={405} rx={200} ry={240}
                       fill="var(--accent-2)" fillOpacity={0.06}
                       stroke="var(--accent-2)" strokeWidth={2} strokeDasharray="6 5"/>
              <text x={1010} y={175} textAnchor="end" fontFamily="var(--font-display)"
                    fontStyle="italic" fontSize={40} fill="var(--accent-2)">S₂</text>

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
                             stroke="var(--accent)" strokeWidth={4} strokeLinecap="round"
                             style={animateHide ? {
                               animation: `fadeOut 450ms ease-out ${fadeDelay}ms both, blink 400ms ease-in-out ${blinkDelay}ms 3`,
                             } : {}}/>;
              })}
              {/* Cycle 2 — arc v₅→v₃ (index 2) same behaviour as the S₁ arc above */}
              {cycle2.map((e, i) => {
                const s = segment(group2[e[0]], group2[e[1]]);
                const animateHide = (isPacking || isCut) && i === 2;
                const blinkDelay = isPacking ? 1500 : 3700;
                const fadeDelay  = isPacking ? 2800 : 5000;
                return <line key={`c2-${i}-${animKey}`} {...s}
                             stroke="var(--accent-2)" strokeWidth={4} strokeLinecap="round"
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
                        stroke="var(--ink)" strokeWidth={4} strokeLinecap="round"
                        style={{
                          "--len": lenV1V3,
                          strokeDasharray: lenV1V3,
                          animation: "drawPath 900ms both ease-out",
                          animationDelay: isPacking ? "4100ms" : "1500ms",
                        }}/>
                  <line {...crossV2V5}
                        stroke="var(--ink)" strokeWidth={4} strokeLinecap="round"
                        style={{
                          "--len": lenV2V5,
                          strokeDasharray: lenV2V5,
                          animation: "drawPath 900ms both ease-out",
                          animationDelay: isPacking ? "4400ms" : "1800ms",
                        }}/>
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
                          <TeX>{String.raw`\sum_{\substack{j \in V \\ j \neq i}} x_{ij} = 1`}</TeX>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{ fontSize: 16, color: "var(--ink-3)", letterSpacing: "0.06em" }}>IN-DEGREE</div>
                        <div style={{ fontSize: 38 }}>
                          <TeX>{String.raw`\sum_{\substack{i \in V \\ i \neq j}} x_{ij} = 1`}</TeX>
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
              padding: "18px 22px",
              fontFamily: "var(--font-mono)",
              fontSize: 22,
              cursor: "pointer",
              userSelect: "none",
              transform: isPacking ? "translateX(6px)" : "translateX(0)",
              transition: "all 320ms ease",
            }}>
              <div style={{ color: isPacking ? "var(--accent)" : "var(--ink-3)", fontSize: 18, marginBottom: 4 }}>packing form</div>
              <TeX display>{String.raw`\sum_{i \in S}\sum_{\substack{j \in S \\ j \neq i}} x_{ij} \;\leq\; |S| - 1`}</TeX>
            </div>
            <div data-constraint="cut" style={{
              background: isCut ? "rgba(107,74,245,0.08)" : "var(--paper-2)",
              border: `1px solid ${isCut ? "var(--accent)" : "var(--line)"}`,
              borderLeft: `${isCut ? 4 : 1}px solid ${isCut ? "var(--accent)" : "var(--line)"}`,
              padding: "18px 22px",
              fontFamily: "var(--font-mono)",
              fontSize: 22,
              cursor: "pointer",
              userSelect: "none",
              transform: isCut ? "translateX(6px)" : "translateX(0)",
              transition: "all 320ms ease",
            }}>
              <div style={{ color: isCut ? "var(--accent)" : "var(--ink-3)", fontSize: 18, marginBottom: 4 }}>equivalent cut form</div>
              <TeX display>{String.raw`\sum_{i \notin S}\sum_{j \in S} x_{ij} \;\geq\; 1`}</TeX>
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

  return (
    <section ref={sectionRef} className="slide" data-label="Exponential blow-up of DFJ">
      <SlideFrame>
        <div className="tag">TSP · The combinatorial wall</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          Subtour elimination constraints grow <em style={{ color: "var(--accent)" }}>exponentially</em>.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 30, lineHeight: 1.22 }}>
              One DFJ constraint for <em>every</em> proper subset of <span style={{ fontFamily: "var(--font-mono)" }}>V</span> of size between 2 and n − 1:
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 24px", fontFamily: "var(--font-mono)", fontSize: 22 }}>
              <TeX display>{String.raw`\begin{aligned}
\#\{S \subsetneq V : 2 \leq |S| \leq n-1\}
  &= \underbrace{2^{n}}_{\text{all subsets of }V}
   \;-\; \underbrace{1}_{|S|=0}
   \;-\; \underbrace{n}_{|S|=1}
   \;-\; \underbrace{1}_{|S|=n} \\[4pt]
  &= 2^{n} - n - 2
\end{aligned}`}</TeX>
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
                  const color = i < 2 ? "var(--accent)" : "var(--accent-2)";
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
                <TeX>{String.raw`\sum_{i,j \in S} x^*_{ij} \;>\; |S| - 1`}</TeX>
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


function SlideTSPMinCut() {
  const [step, setStep] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timers = [];
    const play = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setStep(0);
      timers.push(setTimeout(() => setStep(1), 900));
      timers.push(setTimeout(() => setStep(2), 2000));
      timers.push(setTimeout(() => setStep(3), 3100));
    };
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) play();
      else { timers.forEach(clearTimeout); timers = []; setStep(0); }
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    if (el.hasAttribute('data-deck-active')) play();
    return () => { obs.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const V = [
    { id: '1', x: 170, y:  90, side: 'S' },
    { id: '2', x:  90, y: 250, side: 'S' },
    { id: '3', x: 270, y: 250, side: 'S' },
    { id: '4', x: 540, y:  90, side: 'T' },
    { id: '5', x: 460, y: 250, side: 'T' },
    { id: '6', x: 640, y: 250, side: 'T' },
  ];
  const byId = Object.fromEntries(V.map(v => [v.id, v]));

  // Weights chosen so every vertex has degree exactly 2 in x* — a valid
  // point of the LP relaxation. The only S violating DFJ is the left shore
  // {1,2,3}: its boundary x*(δ(S)) = 0.3 + 0.3 = 0.6 < 2.
  const intraEdges = [
    { a: '1', b: '2', w: 1.0 }, { a: '2', b: '3', w: 1.0 }, { a: '3', b: '1', w: 0.7 },
    { a: '4', b: '5', w: 0.7 }, { a: '5', b: '6', w: 1.0 }, { a: '6', b: '4', w: 1.0 },
  ];
  const crossEdges = [
    { a: '1', b: '4', w: 0.3 },
    { a: '3', b: '5', w: 0.3 },
  ];
  const cutSum = crossEdges.reduce((s, e) => s + e.w, 0);

  return (
    <section ref={sectionRef} className="slide" data-label="Why separation is a min-cut problem">
      <SlideFrame>
        <div className="tag">TSP · Separation = min-cut</div>
        <h2 className="title" style={{ marginTop: 24 }}>
          Why a <em style={{ color: "var(--accent)" }}>min-cut</em> finds the violated DFJ cut.
        </h2>

        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 40, flex: 1, alignItems: "stretch", minHeight: 0 }}>

          {/* -------- Left column: the equivalence -------- */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="lede" style={{ fontSize: 28, lineHeight: 1.3 }}>
              Intuition: in any <em>integer</em> tour the boundary of every subset S carries <em>exactly 2 units</em> — the tour enters S once and exits once. In a fractional x* this is no longer forced: <TeX>{String.raw`x^*(\delta(S))`}</TeX> can <em>fall below 2</em>, and a DFJ violation is precisely an S where this happens.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "14px 20px" }}>
              <div className="kicker" style={{ fontSize: 19, marginBottom: 8 }}>Identity (from degree = 2)</div>
              <div style={{ fontSize: 21, lineHeight: 1.5, color: "var(--ink-2)" }}>
                Sum the degree constraint <TeX>{String.raw`\sum_{\substack{j \in V \\ j \neq i}} x^*_{ij}=2`}</TeX> (j ranges over every other vertex of V) over every i ∈ S:
                <div style={{ margin: "6px 0" }}>
                  <TeX display>{String.raw`\sum_{i \in S} \sum_{\substack{j \in V \\ j \neq i}} x^*_{ij} \;=\; 2|S|`}</TeX>
                </div>
                That double sum counts each <em>intra-S</em> edge <em>twice</em> (once from each endpoint in S) and each <em>boundary</em> edge <em>once</em>, so:
                <div style={{ margin: "6px 0 0" }}>
                  <TeX display>{String.raw`2\,x^*(E(S)) \;+\; x^*(\delta(S)) \;=\; 2|S|`}</TeX>
                </div>
              </div>
            </div>

            {/* Highlighted equivalence — the punchline */}
            <div style={{ background: "var(--accent)", color: "var(--paper)", padding: "14px 22px", textAlign: "center" }}>
              <div style={{ fontSize: 17, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, color: "var(--paper-deep)", opacity: 0.9 }}>DFJ ⟺ min-cut</div>
              <div style={{ fontSize: 24 }}>
                <TeX display>{String.raw`x^*(E(S)) > |S|-1 \;\Longleftrightarrow\; x^*(\delta(S)) < 2`}</TeX>
              </div>
              <div style={{ marginTop: 8, fontSize: 17, color: "var(--paper-deep)", fontStyle: "italic", opacity: 0.95 }}>
                Finding a violated S ⇒ find the partition of V that minimizes x*(δ(S)) — a global min-cut. Precise algorithm on the next slide.
              </div>
            </div>
          </div>

          {/* -------- Right column: animated graph -------- */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 18, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center", overflow: "hidden", minHeight: 0 }}>
            <svg viewBox="0 0 740 340" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
              {/* subtle boundary (the "cut") appearing from step 1 */}
              {step >= 1 && (
                <line x1={370} y1={20} x2={370} y2={310}
                      stroke="var(--accent)" strokeWidth={2} strokeDasharray="6 6"
                      style={{ opacity: 0, animation: "fadeIn 500ms both ease-out" }}/>
              )}

              {/* intra-cluster edges (always visible) */}
              {intraEdges.map((e, i) => {
                const va = byId[e.a], vb = byId[e.b];
                const mx = (va.x + vb.x) / 2, my = (va.y + vb.y) / 2;
                return (
                  <g key={`ie-${i}`}>
                    <line x1={va.x} y1={va.y} x2={vb.x} y2={vb.y}
                          stroke="var(--ink)" strokeWidth={2.2} opacity={step >= 2 ? 0.25 : 0.5}
                          style={{ transition: "opacity 400ms ease" }}/>
                    <text x={mx} y={my - 6} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">
                      {e.w.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* cross edges — these are the δ(S) we highlight at step 2 */}
              {crossEdges.map((e, i) => {
                const va = byId[e.a], vb = byId[e.b];
                const mx = (va.x + vb.x) / 2, my = (va.y + vb.y) / 2;
                const hi = step >= 2;
                return (
                  <g key={`ce-${i}`}>
                    <line x1={va.x} y1={va.y} x2={vb.x} y2={vb.y}
                          stroke={hi ? "var(--accent)" : "var(--ink)"}
                          strokeWidth={hi ? 4 : 2.2}
                          opacity={hi ? 1 : 0.55}
                          style={{ transition: "stroke 400ms ease, stroke-width 400ms ease, opacity 400ms ease" }}/>
                    <text x={mx} y={my - 10} textAnchor="middle"
                          fontFamily="var(--font-mono)"
                          fontSize={hi ? 17 : 14}
                          fontWeight={hi ? 600 : 400}
                          fill={hi ? "var(--accent)" : "var(--ink-3)"}
                          style={{ transition: "all 400ms ease" }}>
                      {e.w.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* vertices */}
              {V.map((v) => {
                const colored = step >= 1;
                const color = !colored ? "var(--ink)" : (v.side === 'S' ? "var(--accent)" : "var(--ink)");
                return (
                  <g key={v.id}>
                    <circle cx={v.x} cy={v.y} r={20}
                            fill="var(--paper)"
                            stroke={color}
                            strokeWidth={3}
                            style={{ transition: "stroke 400ms ease" }}/>
                    <text x={v.x} y={v.y + 6} textAnchor="middle"
                          fontFamily="var(--font-mono)"
                          fontSize={18} fontWeight={600}
                          fill={color}
                          style={{ transition: "fill 400ms ease" }}>{v.id}</text>
                  </g>
                );
              })}

              {/* shore labels */}
              {step >= 1 && (
                <g style={{ opacity: 0, animation: "fadeUp 500ms both ease-out" }}>
                  <text x={180} y={320} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={17} fontWeight={600}
                        fill="var(--accent)">S</text>
                  <text x={550} y={320} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={17} fontWeight={600}
                        fill="var(--ink-2)">V \ S</text>
                </g>
              )}

              {/* result callout */}
              {step >= 3 && (
                <g style={{ opacity: 0, animation: "fadeUp 600ms both ease-out" }}>
                  <rect x={220} y={6} width={300} height={36} fill="var(--accent)" rx={3}/>
                  <text x={370} y={31} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={17} fontWeight={600}
                        fill="var(--paper)">
                    x*(δ(S)) = {cutSum.toFixed(1)} &lt; 2  →  violated
                  </text>
                </g>
              )}
            </svg>

            {/* running caption under the graph — anchored to the story on the left */}
            <div style={{ marginTop: 12, minHeight: 60, fontSize: 17, textAlign: "center", fontFamily: "var(--font-mono)", lineHeight: 1.45 }}>
              {step < 1 && (
                <span style={{ color: "var(--ink-3)" }}>
                  ① fractional x* — every vertex has degree 2, some edges at 1.0, others at 0.3
                </span>
              )}
              {step === 1 && (
                <span style={{ color: "var(--ink-2)" }}>
                  ② the min-cut algorithm splits V into the two cheapest shores — here S = {"{1, 2, 3}"}
                </span>
              )}
              {step === 2 && (
                <span style={{ color: "var(--accent)" }}>
                  ③ boundary δ(S) = only the two bridge edges — sum them under x*
                </span>
              )}
              {step >= 3 && (
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                  ④ x*(δ(S)) = 0.3 + 0.3 = 0.6 &lt; 2 &nbsp;⇒&nbsp; DFJ violated on S = {"{1, 2, 3}"}
                </span>
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
    <section className="slide" data-label="Separation oracle: precise algorithm">
      <SlideFrame>
        <div className="tag">TSP · Separation oracle · formulation</div>
        <h2 className="title" style={{ marginTop: 24 }}>
          The separation oracle, <em style={{ color: "var(--accent)" }}>step by step</em>.
        </h2>

        <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 40, flex: 1, alignItems: "stretch", minHeight: 0 }}>

          {/* -------- Left: pseudocode -------- */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 22px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
              procedure
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 600, color: "var(--accent)", marginBottom: 14 }}>
              SEPARATE-DFJ(x*)
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--ink-3)", lineHeight: 1.5, marginBottom: 14, borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
              <div>input :  fractional x* with deg<sub>x*</sub>(i) = 2 for every i ∈ V</div>
              <div>output:  a violated DFJ cut, or ⊥ (x* is feasible)</div>
            </div>

            <div style={{ fontSize: 20, lineHeight: 1.55 }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 600, marginRight: 10 }}>1.</span>
                Build the <em>support graph</em> <TeX>{String.raw`G_{x^*} = (V, E)`}</TeX> with edge capacity
                <div style={{ marginTop: 4 }}>
                  <TeX display>{String.raw`c_{ij} \;=\; x^*_{ij} \qquad \forall\,(i,j) \in E`}</TeX>
                </div>
              </div>

              <div style={{ marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 600, marginRight: 10 }}>2.</span>
                Compute the <em>global minimum cut</em> of <TeX>{String.raw`G_{x^*}`}</TeX>:
                <div style={{ marginTop: 4 }}>
                  <TeX display>{String.raw`(S^*,\, V \setminus S^*) \;=\; \arg\min_{\emptyset \,\subsetneq\, S \,\subsetneq\, V} \; x^*(\delta(S)) \qquad \mu \;=\; x^*(\delta(S^*))`}</TeX>
                </div>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontWeight: 600, marginRight: 10 }}>3.</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>if</span> μ &lt; 2 &nbsp;<span style={{ fontFamily: "var(--font-mono)" }}>return</span>&nbsp;<TeX>{String.raw`x(S^*) \leq |S^*| - 1`}</TeX>
                <div style={{ marginLeft: 34, marginTop: 2 }}>
                  <span style={{ fontFamily: "var(--font-mono)" }}>else return</span>&nbsp;⊥
                </div>
              </div>
            </div>
          </div>

          {/* -------- Right: how step 2 is implemented + bottom-line -------- */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "16px 20px" }}>
              <div className="kicker" style={{ fontSize: 19, marginBottom: 10 }}>Step 2 — how the min-cut is computed</div>
              <div style={{ fontSize: 20, lineHeight: 1.4, color: "var(--ink-2)" }}>
                Global min-cut on an n-vertex capacitated graph is a classical polynomial problem. Three standard choices:
              </div>
              <div style={{ marginTop: 12, fontSize: 19, lineHeight: 1.5 }}>
                <div><em>Ford–Fulkerson / max-flow</em> between a fixed source s and every other vertex t ≠ s — take the minimum.
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-3)", marginLeft: 16, marginTop: 2 }}>
                    n − 1 max-flow calls
                  </div>
                </div>
                <div style={{ marginTop: 10 }}><em>Gomory–Hu tree</em> — same n − 1 calls, but stores <em>all</em> pairwise min-cuts in a tree.
                </div>
                <div style={{ marginTop: 10 }}><em>Stoer–Wagner</em> — purely combinatorial, no max-flow.
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-3)", marginLeft: 16, marginTop: 2 }}>
                    O(nm + n² log n)
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "16px 20px" }}>
              <div className="kicker" style={{ fontSize: 19, color: "var(--paper-deep)", marginBottom: 8 }}>Bottom line</div>
              <div style={{ fontSize: 20, lineHeight: 1.4 }}>
                One polynomial call to <span style={{ fontFamily: "var(--font-mono)" }}>SEPARATE-DFJ</span> decides in full whether <em>any</em> of the 2ⁿ − n − 2 DFJ cuts is violated — and, if so, returns one. The family is never enumerated.
              </div>
            </div>
          </div>

        </div>
      </SlideFrame>
    </section>
  );
}


function Slide10() {
  return (
    <section className="slide" data-label="TSP to VRP">
      <SlideFrame>
        <div className="tag">VRP elements</div>
        <h2 className="title" style={{ marginTop: 28 }}>From one tour to many — how TSP becomes VRP.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, flex: 1 }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, display: "flex", flexDirection: "column" }}>
            <div className="kicker">TSP · one vehicle · no capacity</div>
            <div style={{ flex: 1 }}>
              <VRPGraph nodes={EX_NODES} routes={[[1,2,3,4,10,5,6,11,7,8,9]]}
                        width={900} height={560} routeColors={["var(--ink)"]} strokeWidth={3.6}/>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)", marginTop: 10 }}>
              Hamiltonian circuit. Total demand may exceed any real vehicle's capacity.
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, display: "flex", flexDirection: "column" }}>
            <div className="kicker" style={{ color: "var(--accent)" }}>CVRP · K vehicles · capacity C</div>
            <div style={{ flex: 1 }}>
              <VRPGraph nodes={EX_NODES} routes={EX_ROUTES}
                        width={900} height={560} strokeWidth={3.6}/>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)", marginTop: 10 }}>
              Several routes, each depot-to-depot, each respecting capacity. The total distance is larger, but feasibility is restored.
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
  SlideTSPLazy, SlideTSPMinCut, SlideTSPMinCutAlgo, Slide10,
});
