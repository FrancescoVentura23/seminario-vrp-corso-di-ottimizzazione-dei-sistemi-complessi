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
        <div>Slides 34 — 37</div>
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


function Slide15() {
  // Bin-packing visual: 3 equal-size bins of capacity C, items inside = demands of S.
  // Each item carries its own global index k so subscript and colour are unique
  // across all bins (otherwise readers misread "dᵢ" as the same customer i).
  const bins = [
    { items: [{ d: 5, k: 0 }, { d: 4, k: 1 }],                       load: 9,  full: false },
    { items: [{ d: 4, k: 2 }, { d: 3, k: 3 }, { d: 3, k: 4 }],       load: 10, full: true  },
    { items: [{ d: 3, k: 5 }, { d: 2, k: 6 }],                       load: 5,  full: false },
  ];
  const C = 10;
  const unit = 34;     // px per unit of demand (bin height = C * unit = 340)
  const binTopY = 110;
  const binBottomY = binTopY + C * unit;   // 110 + 340 = 450
  const binWidth = 180;
  const binXs = [80, 320, 560];
  // 7 distinct hues so no two items share a colour. Items 5 and 7 are
  // hard-coded (brown / navy) to stay clearly distinct from violet (item 1)
  // and forest (item 3) — using route-5 (blue) clashed with violet, and a
  // teal pick clashed with forest.
  const itemColors = [
    "var(--route-1)",  // violet — item 1
    "var(--route-2)",  // amber  — item 2
    "var(--route-3)",  // forest — item 3
    "var(--route-4)",  // red    — item 4
    "#8b4513",         // saddle brown — item 5
    "#b83280",         // magenta      — item 6
    "#1e3a8a",         // navy blue    — item 7
  ];
  const subs = ["₁","₂","₃","₄","₅","₆","₇"];

  return (
    <section className="slide" data-label="r(S) — bin packing on demands of S">
      <SlideFrame>
        <div className="tag">CVRP · capacity cuts</div>
        <h2 className="title" style={{ marginTop: 28 }}>What is r(S)? — a bin-packing subproblem.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, flex: 1 }}>
          {/* Left — bin-packing visual */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, position: "relative" }}>
            <svg viewBox="0 0 820 600" style={{ width: "100%", height: "100%", display: "block" }}>
              {/* r(S) headline */}
              <text x={410} y={50} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={44} fontStyle="italic"
                    fill="var(--accent)">r(S) = 3</text>
              <text x={410} y={82} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={16}
                    fill="var(--ink-3)">minimum bins of capacity C to pack all items {`{dᵢ : i ∈ S}`}</text>

              {/* Capacity scale on the side */}
              <line x1={50} y1={binTopY} x2={50} y2={binBottomY}
                    stroke="var(--ink-3)" strokeWidth={1.5} strokeDasharray="4 4"/>
              <line x1={45} y1={binTopY} x2={55} y2={binTopY} stroke="var(--ink-3)" strokeWidth={1.5}/>
              <line x1={45} y1={binBottomY} x2={55} y2={binBottomY} stroke="var(--ink-3)" strokeWidth={1.5}/>
              <text x={42} y={binTopY+5} textAnchor="end" fontFamily="var(--font-mono)" fontSize={16} fill="var(--ink-3)">C</text>
              <text x={42} y={binBottomY+5} textAnchor="end" fontFamily="var(--font-mono)" fontSize={16} fill="var(--ink-3)">0</text>

              {/* Bins */}
              {bins.map((bin, bi) => {
                const bx = binXs[bi];
                let cursor = binBottomY; // stack from bottom up
                return (
                  <g key={bi}>
                    {/* Bin outline (equal size for all) */}
                    <rect x={bx} y={binTopY} width={binWidth} height={C*unit}
                          fill="none" stroke="var(--ink)" strokeWidth={2.5}/>
                    {/* Stacked items = customer demands in S — each with its own subscript & colour */}
                    {bin.items.map((item, ii) => {
                      const h = item.d * unit;
                      cursor -= h;
                      const yTop = cursor;
                      const color = itemColors[item.k];
                      return (
                        <g key={ii}>
                          <rect x={bx + 3} y={yTop} width={binWidth - 6} height={h}
                                fill={color} fillOpacity={0.32}
                                stroke={color} strokeWidth={1.8}/>
                          <text x={bx + binWidth/2} y={yTop + h/2 + 8}
                                textAnchor="middle"
                                fontFamily="var(--font-mono)" fontSize={24}
                                fill={color}>d{subs[item.k]} = {item.d}</text>
                        </g>
                      );
                    })}
                    {/* Vehicle label */}
                    <text x={bx + binWidth/2} y={binBottomY + 32} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-2)">
                      vehicle {bi+1}
                    </text>
                    <text x={bx + binWidth/2} y={binBottomY + 56} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)">
                      load = {bin.load}{bin.full ? " (full)" : ""}
                    </text>
                  </g>
                );
              })}

              {/* Total demand & lower bound */}
              <text x={410} y={binBottomY + 110} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={17} fill="var(--ink-3)">
                d(S) = 5+4+4+3+3+3+2 = 24,  ⌈d(S)/C⌉ = 3
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
              <TeX display>{String.raw`r(S) \;\geq\; \left\lceil \frac{d(S)}{C} \right\rceil, \qquad d(S) = \sum_{i \in S} d_i`}</TeX>
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

// ---------------------------------------------------------------
// Register slides A
// ---------------------------------------------------------------

Object.assign(window, {
  Slide11, Slide14, Slide15,
});
