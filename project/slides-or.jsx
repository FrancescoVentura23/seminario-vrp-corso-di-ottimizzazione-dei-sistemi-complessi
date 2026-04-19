/* OR-link slide: VRP as an operations-research problem + formal definition */

function SlideORLink() {
  // Small illustrative instance: 1 depot + 8 customers + 3 routes
  const depot = { x: 500, y: 340 };
  const custs = [
    { x: 220, y: 180, d: 4 },
    { x: 360, y: 110, d: 3 },
    { x: 700, y: 140, d: 5 },
    { x: 820, y: 270, d: 2 },
    { x: 780, y: 470, d: 4 },
    { x: 560, y: 540, d: 3 },
    { x: 300, y: 500, d: 2 },
    { x: 180, y: 360, d: 3 },
  ];
  // Three routes from depot
  const routes = [
    [0, 1, 7], // left-top loop
    [2, 3, 4], // right loop
    [5, 6],    // bottom loop
  ];
  const palette = ["var(--accent)", "var(--accent-2)", "var(--accent-3)"];

  const pathFor = (r) => {
    const pts = [depot, ...r.map(i => custs[i]), depot];
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  };

  return (
    <section className="slide" data-label="Operations Research · Formal definition">
      <SlideFrame>
        <div className="tag">Introduction · Operations Research</div>
        <h2 className="title" style={{ marginTop: 24, maxWidth: 1600 }}>
          VRP is a <em style={{ color: "var(--accent)" }}>combinatorial optimization</em> problem — the bridge to Operations Research.
        </h2>

        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 50, flex: 1, minHeight: 0 }}>
          {/* LEFT — formal definition */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div className="lede" style={{ fontSize: 34, lineHeight: 1.3 }}>
              The <em style={{ color: "var(--accent)" }}>Vehicle Routing Problem</em> asks for the optimal set of routes that a fleet of vehicles must follow to serve a set of customers, minimizing a cost function under a set of operational constraints.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="kicker" style={{ fontSize: 24 }}>The three ingredients of any OR problem</div>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", rowGap: 14, columnGap: 24, alignItems: "baseline" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, color: "var(--accent)" }}>1 · Variables</div>
                <div style={{ fontSize: 25, color: "var(--ink-2)" }}>Which edges each vehicle traverses · the <em>sequence</em> of visits.</div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, color: "var(--accent)" }}>2 · Objective</div>
                <div style={{ fontSize: 25, color: "var(--ink-2)" }}>Minimise total cost (distance, time, fuel, or a weighted combination).</div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, color: "var(--accent)" }}>3 · Constraints</div>
                <div style={{ fontSize: 25, color: "var(--ink-2)" }}>Capacity · time windows · route duration · fleet size · visit each customer once.</div>
              </div>
            </div>

            <div className="body small" style={{ color: "var(--ink-3)", fontSize: 22, lineHeight: 1.4 }}>
              Like TSP, assignment, knapsack or scheduling, the VRP is a <em>discrete</em> optimization problem: we pick one configuration out of a combinatorial space — and the space grows faster than we can enumerate it.
            </div>
          </div>

          {/* RIGHT — illustrative instance */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 28, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14, gap: 16, flexWrap: "wrap" }}>
              <div className="kicker" style={{ fontSize: 24 }}>A small instance</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-3)", whiteSpace: "nowrap" }}>1 depot · 8 customers · 3 routes</div>
            </div>

            <svg viewBox="0 0 1000 680" style={{ flex: 1, width: "100%", height: "auto" }}>
              {/* grid */}
              <defs>
                <pattern id="orgrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect width={1000} height={680} fill="url(#orgrid)" opacity={0.5}/>

              {/* routes */}
              {routes.map((r, ri) => (
                <path key={ri}
                      d={pathFor(r)}
                      fill="none"
                      stroke={palette[ri]}
                      strokeWidth={4.5}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      className={`anim-draw anim-draw-${ri + 1}`}
                      style={{ "--len": 1600 }}/>
              ))}

              {/* customers */}
              {custs.map((c, i) => (
                <g key={i} className="anim-fade-1">
                  <circle cx={c.x} cy={c.y} r={16} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                  <text x={c.x} y={c.y + 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink)">
                    {i + 1}
                  </text>
                  <text x={c.x + 22} y={c.y - 16} fontFamily="var(--font-mono)" fontSize={16} fill="var(--ink-3)">
                    d={c.d}
                  </text>
                </g>
              ))}

              {/* depot */}
              <g className="anim-fade">
                <rect x={depot.x - 22} y={depot.y - 22} width={44} height={44} fill="var(--ink)"/>
                <text x={depot.x} y={depot.y + 7} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--paper)" fontWeight={600}>D</text>
                <text x={depot.x} y={depot.y - 34} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--ink)">depot</text>
              </g>
            </svg>

            <div style={{ display: "flex", gap: 22, marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-3)", flexWrap: "wrap", alignItems: "center" }}>
              <span><span style={{ display: "inline-block", width: 14, height: 14, background: "var(--accent)", marginRight: 8, verticalAlign: "middle" }}/>Route 1</span>
              <span><span style={{ display: "inline-block", width: 14, height: 14, background: "var(--accent-2)", marginRight: 8, verticalAlign: "middle" }}/>Route 2</span>
              <span><span style={{ display: "inline-block", width: 14, height: 14, background: "var(--accent-3)", marginRight: 8, verticalAlign: "middle" }}/>Route 3</span>
            </div>
            <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)" }}>min Σ cᵢⱼ xᵢⱼ · s.t. capacity, covering</div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

Object.assign(window, { SlideORLink });
