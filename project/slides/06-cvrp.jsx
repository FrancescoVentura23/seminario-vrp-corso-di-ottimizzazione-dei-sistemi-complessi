/* =========================================================================
   VRP Seminar — Part V: CVRP
   Slides: section header, two-index ILP (with the three constraints),
           capacity-cut inequality with r(S)
   ========================================================================= */

function Slide11() {
  return (
    <section className="slide section-slide" data-label="Part III — CVRP">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part V of IX</div>
        <div>Slides 34 — 40</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Five</div>
        <div className="hero" style={{ fontSize: 240 }}>The CVRP</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          The capacitated VRP — the core member of the family, from which all other variants are built.
        </div>
      </div>
    </section>
  );
}


function Slide14() {
  const constraints = [
    { num: "i",   tag: "Depot closure", text: "Every route starts and ends at the depot — no open paths." },
    { num: "ii",  tag: "Single visit",  text: "Every customer is visited exactly once, by exactly one vehicle." },
    { num: "iii", tag: "Capacity",      text: "On every route, the sum of the demands served never exceeds the vehicle capacity C.", accent: true },
  ];
  return (
    <section className="slide" data-label="Two-index ILP formulation">
      <SlideFrame>
        <div className="tag">CVRP · Model VRP1</div>
        <h2 className="title" style={{ marginTop: 28 }}>The two-index ILP formulation.</h2>

        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, flex: 1 }}>
          {/* Left — three constraints + decision variable */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {constraints.map((c, i) => (
                <div key={i} style={{
                  border: `1px solid ${c.accent ? "var(--accent)" : "var(--line)"}`,
                  borderLeft: `${c.accent ? 4 : 1}px solid ${c.accent ? "var(--accent)" : "var(--line)"}`,
                  background: c.accent ? "rgba(107,74,245,0.08)" : "var(--paper-2)",
                  color: "var(--ink)",
                  padding: "14px 20px",
                  display: "flex", alignItems: "center", gap: 18,
                }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1, color: c.accent ? "var(--accent)" : "var(--ink-3)", fontStyle: "italic", flexShrink: 0, minWidth: 70, textAlign: "center" }}>
                    ({c.num})
                  </div>
                  <div>
                    <div className="kicker" style={{ color: c.accent ? "var(--accent)" : "var(--ink-3)", fontSize: 22 }}>{c.tag}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.2, marginTop: 4 }}>
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 26, marginTop: 6 }}>
              Encoded with one binary variable on each arc:
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 18, fontFamily: "var(--font-mono)", fontSize: 24, lineHeight: 1.4 }}>
              xᵢⱼ = 1 &nbsp;if arc (i, j) belongs to some route<br/>
              xᵢⱼ = 0 &nbsp;otherwise
            </div>
          </div>

          {/* Right — ILP formulation, each row tagged with its logical constraint */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "32px 40px", fontFamily: "var(--font-mono)", fontSize: 24, lineHeight: 1.6 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, marginBottom: 18 }}>
              <TeX display>{"\\min \\sum_{i \\in V} \\sum_{j \\in V} c_{ij}\\, x_{ij}"}</TeX>
            </div>
            <div style={{ color: "var(--ink-3)", marginBottom: 6 }}>subject to</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", rowGap: 10, columnGap: 16 }}>
              <div><TeX>{"\\sum_{i \\in V} x_{ij} = 1"}</TeX> &nbsp; ∀ j ∈ V\{0}</div><div style={{ color: "var(--ink-3)" }}>(ii) in-degree</div>
              <div><TeX>{"\\sum_{j \\in V} x_{ij} = 1"}</TeX> &nbsp; ∀ i ∈ V\{0}</div><div style={{ color: "var(--ink-3)" }}>(ii) out-degree</div>
              <div><TeX>{"\\sum_{j \\in V} x_{0j} = K"}</TeX></div><div style={{ color: "var(--ink-3)" }}>(i) K vehicles leave</div>
              <div><TeX>{"\\sum_{i \\in V} x_{i0} = K"}</TeX></div><div style={{ color: "var(--ink-3)" }}>(i) K vehicles return</div>
              <div style={{ color: "var(--accent)" }}><TeX>{"\\sum_{i \\in V \\setminus S}\\sum_{j \\in S} x_{ij} \\;\\geq\\; \\mathbf{r(S)} \\quad \\forall\\, S \\subseteq V \\setminus \\{0\\}"}</TeX></div><div style={{ color: "var(--accent)" }}>(iii) capacity-cut</div>
              <div>xᵢⱼ ∈ {"{"}0, 1{"}"}</div><div style={{ color: "var(--ink-3)" }}>(integrality)</div>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide14B() {
  // Coordinates aligned with EX_NODES (components.jsx) so the depot sits roughly
  // at the centre of the box plot, with 12 customers around it.
  const depot = { x: 420, y: 300 };
  const custs = [
    { x: 220, y: 170 }, { x: 330, y: 110 },
    { x: 540, y: 110 }, { x: 680, y: 180 },
    { x: 730, y: 330 }, { x: 640, y: 470 },
    { x: 460, y: 510 }, { x: 240, y: 480 },
    { x: 140, y: 350 }, { x: 290, y: 260 },
    { x: 570, y: 260 }, { x: 520, y: 420 },
  ];

  // Three vehicles → three colours (matching slide 35 / Slide10B route palette).
  const colors = ["var(--route-1)", "var(--route-2)", "var(--route-3)"];
  // Pick three customers spread across the perimeter so the active arcs are
  // visually well separated (top, right, bottom-left).
  const activeIdx = [1, 4, 7];

  const depotHalf = 22;   // half-side of the black depot square
  const nodeR     = 12;   // customer circle radius

  // Arrow polygon — tip at (tx,ty), pointing along unit vector (ux,uy)
  const arrowPts = (tx, ty, ux, uy, aw, al) => {
    const bx = tx - ux * al, by = ty - uy * al;
    return `${tx},${ty} ${bx - uy * aw},${by + ux * aw} ${bx + uy * aw},${by - ux * aw}`;
  };

  // Distance from a square's centre to its edge along direction (ux,uy)
  const squareEdgeDist = (h, ux, uy) => h / Math.max(Math.abs(ux), Math.abs(uy));

  // One arc between depot and a customer, oriented according to `direction`
  const renderArc = (i, direction, isActive, ki) => {
    const c = custs[i];
    const fromX = direction === "out" ? depot.x : c.x;
    const fromY = direction === "out" ? depot.y : c.y;
    const toX   = direction === "out" ? c.x : depot.x;
    const toY   = direction === "out" ? c.y : depot.y;

    const dx = toX - fromX, dy = toY - fromY;
    const L  = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;

    // Retract endpoints from the node boundaries so the arrow tip and line
    // don't overlap the depot square or the customer circle.
    const fromIsDepot = direction === "out";
    const toIsDepot   = direction === "in";
    const retractFrom = fromIsDepot ? squareEdgeDist(depotHalf, ux, uy) : nodeR;
    const retractTo   = (toIsDepot   ? squareEdgeDist(depotHalf, ux, uy) : nodeR) + 6;
    const fx = fromX + ux * retractFrom;
    const fy = fromY + uy * retractFrom;
    const tx = toX   - ux * retractTo;
    const ty = toY   - uy * retractTo;

    const color = isActive ? colors[ki] : "var(--ink-3)";
    const sw    = isActive ? 4.5 : 1.8;
    const dash  = isActive ? null : "6 6";
    const op    = isActive ? 1   : 0.55;
    const aw    = isActive ? 8   : 5;
    const al    = isActive ? 14  : 9;

    return (
      <g key={`${direction}-${i}`} opacity={op}>
        <line x1={fx} y1={fy} x2={tx} y2={ty}
              stroke={color} strokeWidth={sw}
              strokeDasharray={dash || undefined}
              strokeLinecap="round"/>
        <polygon points={arrowPts(tx, ty, ux, uy, aw, al)} fill={color}/>
      </g>
    );
  };

  const Star = ({ direction }) => (
    <svg viewBox="80 60 740 500"
         preserveAspectRatio="xMidYMid meet"
         style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
      {/* Dashed (unused) arcs first, so the active ones paint on top */}
      {custs.map((_, i) => activeIdx.includes(i) ? null : renderArc(i, direction, false, -1))}
      {activeIdx.map((i, k) => renderArc(i, direction, true, k))}

      {/* Customers — drawn after the arcs so the lines don't bleed through */}
      {custs.map((c, i) => (
        <circle key={`n-${i}`} cx={c.x} cy={c.y} r={nodeR}
                fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.2}/>
      ))}

      {/* Depot — black square (the user explicitly asked for square + black,
          regardless of theme) */}
      <rect x={depot.x - depotHalf - 4} y={depot.y - depotHalf - 4}
            width={(depotHalf + 4) * 2} height={(depotHalf + 4) * 2}
            fill="none" stroke="#000" strokeWidth={1.5} rx={2}/>
      <rect x={depot.x - depotHalf} y={depot.y - depotHalf}
            width={depotHalf * 2} height={depotHalf * 2}
            fill="#000" rx={2}/>
      <text x={depot.x} y={depot.y + 7} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize={20}
            fill="#fff" fontWeight={700}>0</text>
    </svg>
  );

  return (
    <section className="slide" data-label="Depot constraints — K leave, K return">
      <SlideFrame>
        <div className="tag">CVRP · depot constraints</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          K vehicles leave, K vehicles return — closing the depot.
        </h2>

        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 22, flex: 1, minHeight: 0 }}>

          {/* Top — two constraint boxes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

            <div style={{
              border: "1px solid var(--accent)",
              borderLeft: "4px solid var(--accent)",
              background: "rgba(107,74,245,0.08)",
              padding: "16px 22px",
            }}>
              <div className="kicker" style={{ color: "var(--accent)", fontSize: 22 }}>(i) K vehicles leave</div>
              <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 10 }}>
                <div style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.3 }}>
                  Exactly K arcs in the <em>out-star</em> δ⁺(0) of the depot — one outgoing arc per departing vehicle.
                </div>
                <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "10px 18px", fontSize: 26, flexShrink: 0 }}>
                  <TeX>{"\\sum_{j \\in V} x_{0j} = K"}</TeX>
                </div>
              </div>
            </div>

            <div style={{
              border: "1px solid var(--accent)",
              borderLeft: "4px solid var(--accent)",
              background: "rgba(107,74,245,0.08)",
              padding: "16px 22px",
            }}>
              <div className="kicker" style={{ color: "var(--accent)", fontSize: 22 }}>(i) K vehicles return</div>
              <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 10 }}>
                <div style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.3 }}>
                  Exactly K arcs in the <em>in-star</em> δ⁻(0) of the depot — one incoming arc per returning vehicle.
                </div>
                <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "10px 18px", fontSize: 26, flexShrink: 0 }}>
                  <TeX>{"\\sum_{i \\in V} x_{i0} = K"}</TeX>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom — two box plots, depot at the centre, K = 3 vehicles */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, flex: 1, minHeight: 0 }}>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 20, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div className="kicker" style={{ color: "var(--accent)" }}>K = 3 vehicles · out-star δ⁺(0)</div>
              <div style={{ flex: 1, minHeight: 0, marginTop: 8 }}>
                <Star direction="out"/>
              </div>
              <div className="body small" style={{ color: "var(--ink-3)", marginTop: 6, lineHeight: 1.3 }}>
                Three coloured arcs leave the depot — one per vehicle. The other arcs (dashed) belong to the complete graph but are not selected.
              </div>
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 20, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div className="kicker" style={{ color: "var(--accent)" }}>K = 3 vehicles · in-star δ⁻(0)</div>
              <div style={{ flex: 1, minHeight: 0, marginTop: 8 }}>
                <Star direction="in"/>
              </div>
              <div className="body small" style={{ color: "var(--ink-3)", marginTop: 6, lineHeight: 1.3 }}>
                Three coloured arcs return to the depot — one per vehicle. The other arcs (dashed) belong to the complete graph but are not selected.
              </div>
            </div>

          </div>

        </div>
      </SlideFrame>
    </section>
  );
}


function Slide15() {
  const bins = [
    { items: [{ d: 5, k: 0 }, { d: 4, k: 1 }],                   load: 9,  full: false },
    { items: [{ d: 4, k: 2 }, { d: 3, k: 3 }, { d: 3, k: 4 }],   load: 10, full: true  },
    { items: [{ d: 3, k: 5 }, { d: 2, k: 6 }],                    load: 5,  full: false },
  ];
  const C = 10;
  const unitW = 44;
  const containerX = 42;           // container starts from the left
  const containerW = C * unitW;    // 440
  const cabX = containerX + containerW + 4;  // cab starts after container (x = 486)
  const cabW = 110;
  const containerH = 64;
  const cabExtra = 26;             // cab roof is this many px above the container top
  const rowStep = 130;
  const firstRowY = 108;
  const wheelR = 13;

  const itemColors = [
    "var(--route-1)",
    "var(--route-2)",
    "var(--route-3)",
    "var(--route-4)",
    "#8b4513",
    "#b83280",
    "#1e3a8a",
  ];
  const subs = ["₁","₂","₃","₄","₅","₆","₇"];

  // Cab silhouette — windshield slope on the RIGHT side (the actual nose/front).
  // Container is on the left, cab is on the right; the truck faces RIGHT.
  // Points clockwise from rear-bottom (left edge of cab):
  const cabPoly = (cy) => {
    const t = cy - cabExtra;
    const b = cy + containerH;
    return [
      `${cabX},${b}`,               // rear bottom (left, flat — connects to container)
      `${cabX},${t}`,               // rear top (left, flat)
      `${cabX + cabW - 22},${t}`,   // roof — leaves room for windshield slope
      `${cabX + cabW},${t + 22}`,   // windshield top (angled ~45° on RIGHT side)
      `${cabX + cabW},${b}`,        // nose bottom (right)
    ].join(" ");
  };

  // Windshield glass — follows the slope on the RIGHT side of the cab
  const glassPoly = (cy) => {
    const t = cy - cabExtra;
    return [
      `${cabX + 10},${t + 8}`,           // top-left (inset from rear edge)
      `${cabX + cabW - 26},${t + 8}`,    // top-right (before slope)
      `${cabX + cabW - 8},${t + 26}`,    // bottom-right (follows windshield angle)
      `${cabX + 10},${t + 26}`,          // bottom-left
    ].join(" ");
  };

  return (
    <section className="slide" data-label="r(S) — bin packing on demands of S">
      <SlideFrame>
        <div className="tag">CVRP · capacity cuts</div>
        <h2 className="title" style={{ marginTop: 28 }}>What is r(S)? — a bin-packing subproblem.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, flex: 1 }}>
          {/* Left — truck visual */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, position: "relative" }}>
            <svg viewBox="0 0 700 478" style={{ width: "100%", height: "100%", display: "block" }}>

              {/* r(S) headline */}
              <text x={350} y={10} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={36} fontStyle="italic"
                    fill="var(--accent)">r(S) = 3</text>
              <text x={350} y={28} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13}
                    fill="var(--ink-3)">minimum vehicles of capacity C to serve all customers in S</text>

              {/* Capacity ruler above container */}
              <line x1={containerX} y1={66} x2={containerX + containerW} y2={66}
                    stroke="var(--ink-3)" strokeWidth={1}/>
              <line x1={containerX} y1={61} x2={containerX} y2={71}
                    stroke="var(--ink-3)" strokeWidth={1.5}/>
              <line x1={containerX + containerW} y1={61} x2={containerX + containerW} y2={71}
                    stroke="var(--ink-3)" strokeWidth={1.5}/>
              <text x={containerX} y={60} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={12} fill="var(--ink-3)">0</text>
              <text x={containerX + containerW} y={60} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={12} fill="var(--ink-3)">C={C}</text>

              {bins.map((bin, bi) => {
                const cy = firstRowY + bi * rowStep;
                const bot = cy + containerH;
                const wheelCY = bot + 15;
                let cursor = containerX;
                return (
                  <g key={bi}>
                    {/* === CARGO CONTAINER (left side) === */}
                    <rect x={containerX} y={cy} width={containerW} height={containerH}
                          fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                    {/* Demand segments, left → right */}
                    {bin.items.map((item, ii) => {
                      const w = item.d * unitW;
                      const x = cursor;
                      cursor += w;
                      const color = itemColors[item.k];
                      return (
                        <g key={ii}>
                          <rect x={x} y={cy} width={w} height={containerH}
                                fill={color} fillOpacity={0.28}
                                stroke={color} strokeWidth={1.5}/>
                          <text x={x + w / 2} y={cy + containerH / 2 + 7}
                                textAnchor="middle"
                                fontFamily="var(--font-mono)" fontSize={17}
                                fill={color}>d{subs[item.k]}={item.d}</text>
                        </g>
                      );
                    })}
                    {bin.full && (
                      <text x={containerX + containerW - 8} y={cy + 16}
                            textAnchor="end" fontFamily="var(--font-mono)" fontSize={12}
                            fill="var(--accent)" fontWeight="bold">FULL</text>
                    )}

                    {/* === CAB (right side — front of truck) === */}
                    <polygon points={cabPoly(cy)}
                             fill="#5b6370" stroke="var(--ink)" strokeWidth={2}/>
                    {/* Windshield glass */}
                    <polygon points={glassPoly(cy)}
                             fill="rgba(180,230,255,0.55)"
                             stroke="rgba(120,180,220,0.7)" strokeWidth={1}/>
                    {/* Headlight on the RIGHT (nose) face of the cab */}
                    <rect x={cabX + cabW - 6} y={bot - 20} width={5} height={10}
                          fill="#ffe082" stroke="#bbb" strokeWidth={0.5}/>
                    {/* V label — left portion of cab (away from windshield) */}
                    <text x={cabX + 34} y={bot - 9}
                          textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14}
                          fill="white" fontWeight="bold">V{bi + 1}</text>

                    {/* === CHASSIS RAIL + WHEELS === */}
                    <line x1={containerX} y1={bot} x2={cabX + cabW - 16}
                          y2={bot} stroke="var(--ink)" strokeWidth={3}/>
                    {/* Rear tandem axle — under left end of container */}
                    <circle cx={containerX + 17} cy={wheelCY} r={wheelR} fill="#2b2b2b"/>
                    <circle cx={containerX + 17} cy={wheelCY} r={5} fill="#888"/>
                    <circle cx={containerX + 40} cy={wheelCY} r={wheelR} fill="#2b2b2b"/>
                    <circle cx={containerX + 40} cy={wheelCY} r={5} fill="#888"/>
                    {/* Front wheel — under right (nose) side of cab */}
                    <circle cx={cabX + cabW - 22} cy={wheelCY} r={wheelR} fill="#2b2b2b"/>
                    <circle cx={cabX + cabW - 22} cy={wheelCY} r={5} fill="#888"/>

                    {/* Load label — right of cab */}
                    <text x={cabX + cabW + 12} y={cy + containerH / 2 + 6}
                          textAnchor="start" fontFamily="var(--font-mono)" fontSize={16}
                          fill={bin.full ? "var(--accent)" : "var(--ink-3)"}>
                      {bin.load}/{C}{bin.full ? " ✓" : ""}
                    </text>
                  </g>
                );
              })}

              {/* Footer */}
              <text x={350} y={465} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">
                d(S) = 5+4+4+3+3+3+2 = 24  →  ⌈24/10⌉ = 3
              </text>
            </svg>
          </div>

          {/* Right — motivation + definition + bound + tail */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
            <div className="body" style={{ fontSize: 30, lineHeight: 1.3 }}>
              The capacity-cut row of the previous slide reads
              {" "}<span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>∑ xᵢⱼ ≥ r(S)</span>{" "}
              for every <span style={{ fontFamily: "var(--font-mono)" }}>S ⊆ V \ {`{0}`}</span> — but the formulation never says <em>what r(S) is</em>. To enforce capacity feasibility we have to compute, or bound, that quantity.
            </div>
            <div className="body" style={{ fontSize: 30, lineHeight: 1.3 }}>
              <em style={{ color: "var(--accent)" }}>r(S)</em> is the <em>minimum number of vehicles</em> needed to serve every customer in S — equivalently, the optimal value of the <em>Bin Packing Problem</em> on items {`{dᵢ : i ∈ S}`} with bin capacity C.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 26px", fontFamily: "var(--font-mono)", fontSize: 24 }}>
              <TeX display>{"r(S) \\;\\geq\\; \\left\\lceil \\frac{d(S)}{C} \\right\\rceil, \\qquad d(S) = \\sum_{i \\in S} d_i"}</TeX>
              <div style={{ color: "var(--ink-3)", fontSize: 22, lineHeight: 1.4, marginTop: 10 }}>
                BPP is NP-hard, but the trivial lower bound ⌈d(S)/C⌉ is fast and is often used in place of r(S).
              </div>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)", lineHeight: 1.4 }}>
              For the full instance, <span style={{ fontFamily: "var(--font-mono)" }}>r(V \ {`{0}`}) = K<sub>min</sub></span>, the minimum fleet size. Capacity cuts are exponentially many → added lazily during branch-and-cut by a separation oracle.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

function Slide15B() {
  const rows = [
    { n:  5, val: "31",                   exp: null },
    { n: 10, val: "1 023",                exp: null },
    { n: 15, val: "32 767",               exp: null },
    { n: 20, val: "1 048 575",            exp: null },
    { n: 30, val: "1 073 741 823",        exp: "≈ 10⁹" },
    { n: 50, val: "1 125 899 906 842 623",exp: "≈ 10¹⁵" },
  ];

  return (
    <section className="slide" data-label="Capacity cuts — exponential blow-up">
      <SlideFrame>
        <div className="tag">CVRP · capacity cuts</div>
        <h2 className="title" style={{ marginTop: 28 }}>Exponentially many cuts — added lazily.</h2>

        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 56, flex: 1 }}>

          {/* Left — formula + growth table */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
            {/* Formula box */}
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 24px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--ink-2)", marginBottom: 10 }}>
                Number of capacity-cut constraints:
              </div>
              <div style={{ fontSize: 36 }}>
                <TeX display>{"\\#\\text{cuts} \\;=\\; 2^n - 1"}</TeX>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)", marginTop: 10 }}>
                one per non-empty subset S ⊆ V \ {"{0}"}, with n = |V| − 1
              </div>
            </div>

            {/* Growth table */}
            <div style={{ border: "1px solid var(--line)", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", background: "var(--paper-3, #ddd)", borderBottom: "2px solid var(--line)" }}>
                <div style={{ padding: "8px 16px", fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-2)", fontWeight: "bold" }}>n</div>
                <div style={{ padding: "8px 16px", fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-2)", fontWeight: "bold" }}>2ⁿ − 1</div>
              </div>
              {rows.map((r, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "80px 1fr",
                  background: i % 2 === 0 ? "var(--paper-2)" : "var(--paper)",
                  borderBottom: i < rows.length - 1 ? "1px solid var(--line)" : "none",
                }}>
                  <div style={{ padding: "7px 16px", fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink)", fontWeight: "bold" }}>{r.n}</div>
                  <div style={{ padding: "7px 16px", fontFamily: "var(--font-mono)", fontSize: 18,
                                color: r.exp ? "var(--accent)" : "var(--ink)",
                                display: "flex", alignItems: "center", gap: 12 }}>
                    <span>{r.val}</span>
                    {r.exp && <span style={{ fontSize: 15, color: "var(--accent)", opacity: 0.85 }}>{r.exp}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — problem statement */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
            <div className="body" style={{ fontSize: 30, lineHeight: 1.35 }}>
              The capacity-cut constraint must hold for <em>every</em> non-empty subset S ⊆ V \ {"{0}"} — but the number of such subsets <em>doubles</em> with each new customer.
            </div>
            <div className="body" style={{ fontSize: 30, lineHeight: 1.35 }}>
              Even for a modest instance with <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>n = 30</span> customers, enforcing all cuts upfront would require adding <em>over a billion constraints</em> to the model before solving even the first LP relaxation.
            </div>
            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "18px 24px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.3 }}>
                Enumerating all 2ⁿ − 1 cuts is <em>computationally impossible</em> already for real-world instances.
                The solution: add cuts <em>only when they are needed</em>.
              </div>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

function Slide15C() {
  return (
    <section className="slide" data-label="Lazy capacity-cut generation">
      <SlideFrame>
        <div className="tag">CVRP · Branch-and-cut in practice</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          Capacity cuts are <em style={{ color: "var(--accent)" }}>never enumerated</em> — they are added lazily inside branch-and-cut.
        </h2>

        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, flex: 1, alignItems: "stretch", minHeight: 0 }}>

          {/* Left — idea + oracle box + correctness */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="lede" style={{ fontSize: 28, lineHeight: 1.3 }}>
              Start with a <em>weak</em> model — only degree and depot constraints, <em>no capacity cuts</em>. Let a <em>separation oracle</em> inject them one at a time, only when the current LP solution actually violates one.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "16px 20px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 8, color: "var(--accent)" }}>Separation oracle</div>
              <div style={{ fontSize: 21, lineHeight: 1.35 }}>
                A <em>black box</em> that takes the current fractional solution x* and answers:
              </div>
              <div style={{ marginTop: 10, paddingLeft: 14, borderLeft: "3px solid var(--accent)", fontSize: 20, lineHeight: 1.35, fontStyle: "italic" }}>
                "Is there any subset S ⊂ V \ {"{0}"} whose capacity cut is violated by x*?"
              </div>
              <div style={{ marginTop: 10, fontSize: 20, lineHeight: 1.4, color: "var(--ink-2)" }}>
                It returns either <em>no violation</em> (x* is cut-feasible, stop) or one specific <em>violated S</em>:
              </div>
              <div style={{ marginTop: 8, background: "var(--paper)", border: "1px solid var(--line)", padding: "8px 14px", fontSize: 20, textAlign: "center" }}>
                <TeX>{"\\sum_{i \\notin S,\\, j \\in S} x^*_{ij} \\;<\\; r(S)"}</TeX>
              </div>
              <div style={{ marginTop: 10, fontSize: 18, color: "var(--ink-3)", lineHeight: 1.35, fontStyle: "italic" }}>
                Implemented as a min-cut / max-flow computation — polynomial in n, <em>without</em> enumerating the 2ⁿ subsets.
              </div>
            </div>

            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "16px 20px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 6, color: "var(--paper-deep)" }}>Why this is correct</div>
              <div style={{ fontSize: 22, lineHeight: 1.35 }}>
                When the oracle finds <em>no</em> violated S, x* already satisfies all 2ⁿ − 1 capacity cuts — <em>including the ones never written down</em>.
              </div>
            </div>

            <div className="body small" style={{ fontSize: 20, color: "var(--ink-3)", lineHeight: 1.35 }}>
              Typical run: a few dozen cuts are added in total, not 10⁹.
            </div>
          </div>

          {/* Right — flowchart */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 18, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", minHeight: 0 }}>
            <svg viewBox="0 0 790 640" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <marker id="cc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink)"/>
                </marker>
                <marker id="cc-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"/>
                </marker>
              </defs>

              {/* Box 1: Initial LP */}
              <rect x="120" y="10" width="440" height="70" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              <text x="340" y="40" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fontWeight={600} fill="var(--ink)">Initial LP relaxation</text>
              <text x="340" y="63" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)">degree + depot constraints · NO capacity cuts</text>

              {/* 1 → 2 */}
              <line x1="340" y1="82" x2="340" y2="128" stroke="var(--ink)" strokeWidth={2} markerEnd="url(#cc-arrow)"/>

              {/* Box 2: Solve LP */}
              <rect x="210" y="130" width="260" height="62" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              <text x="340" y="158" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fontWeight={600} fill="var(--ink)">Solve LP  →  x*</text>
              <text x="340" y="180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">(possibly fractional)</text>

              {/* 2 → diamond */}
              <line x1="340" y1="194" x2="340" y2="238" stroke="var(--ink)" strokeWidth={2} markerEnd="url(#cc-arrow)"/>

              {/* Decision diamond */}
              <polygon points="340,240 500,305 340,370 180,305" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              <text x="340" y="299" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--ink)">x* violates a</text>
              <text x="340" y="321" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--ink)">capacity cut?</text>

              {/* → NO (left) */}
              <path d="M 180 305 L 100 305 L 100 398" stroke="var(--ink)" strokeWidth={2} fill="none" markerEnd="url(#cc-arrow)"/>
              <text x="140" y="296" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600} fill="var(--ink)">NO</text>

              {/* → YES (right) */}
              <path d="M 500 305 L 580 305 L 580 398" stroke="var(--accent)" strokeWidth={2.5} fill="none" markerEnd="url(#cc-arrow-accent)"/>
              <text x="516" y="296" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600} fill="var(--accent)">YES</text>

              {/* Box: Optimal CVRP */}
              <rect x="10" y="400" width="190" height="82" fill="var(--ink)" stroke="var(--ink)" strokeWidth={2}/>
              <text x="105" y="428" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--paper)">Optimal CVRP</text>
              <text x="105" y="450" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--paper-deep)">integer · all capacity</text>
              <text x="105" y="468" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--paper-deep)">cuts satisfied</text>

              {/* Box: Separation oracle */}
              <rect x="410" y="400" width="260" height="98" fill="var(--paper)" stroke="var(--accent)" strokeWidth={2.5}/>
              <text x="540" y="427" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--ink)">Separation oracle</text>
              <text x="540" y="450" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-2)">find S ⊂ V with</text>
              <text x="540" y="471" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink)">{"Σ x*(δ(S)) < r(S)"}</text>
              <text x="540" y="490" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--ink-3)">min-cut · polynomial</text>

              {/* oracle → add cut */}
              <line x1="540" y1="500" x2="540" y2="530" stroke="var(--ink)" strokeWidth={2} markerEnd="url(#cc-arrow)"/>

              {/* Box: Add cut */}
              <rect x="410" y="532" width="260" height="72" fill="var(--accent)" stroke="var(--accent)" strokeWidth={2}/>
              <text x="540" y="562" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fontWeight={600} fill="var(--paper)">Add ONE capacity cut</text>
              <text x="540" y="588" textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--paper)">{"Σ x(δ(S))  ≥  r(S)"}</text>

              {/* Feedback loop */}
              <path d="M 670 568 C 755 568, 755 161, 470 161" stroke="var(--ink)" strokeWidth={2} fill="none" strokeDasharray="5 4" markerEnd="url(#cc-arrow)"/>
              <text x="770" y="365" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)" transform="rotate(-90 770 365)" textAnchor="middle">re-solve with the new cut</text>
            </svg>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ---------------------------------------------------------------
// Register slides A
// ---------------------------------------------------------------

Object.assign(window, {
  Slide11, Slide14, Slide14B, Slide15, Slide15B, Slide15C,
});
