/* =========================================================================
   VRP Seminar — Part V: CVRP
   Slides: section header, informal definition, three constraints,
           two-index ILP formulation, capacity-cut inequality
   ========================================================================= */

function Slide11() {
  return (
    <section className="slide section-slide" data-label="Part III — CVRP">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part V of IX</div>
        <div>Slides 23 — 26</div>
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


function Slide12() {
  return (
    <section className="slide" data-label="CVRP informal definition">
      <SlideFrame>
        <div className="tag">CVRP</div>
        <h2 className="title" style={{ marginTop: 28 }}>CVRP — informal statement.</h2>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, flex: 1, alignItems: "center" }}>
          <div className="lede" style={{ fontSize: 54, lineHeight: 1.12, maxWidth: 1100 }}>
            Given <span style={{ color: "var(--accent)" }}>n customers</span> with known demand, a depot, and <span style={{ color: "var(--accent)" }}>K identical vehicles</span> of capacity C —
            design routes that serve every customer exactly once, respect capacity, and minimize total distance.
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24 }}>
            <VRPGraph nodes={EX_NODES} routes={EX_ROUTES} width={800} height={580}
                      strokeWidth={4} nodeRadius={12} depotRadius={16} showDemand showLabels={false}/>
            <div className="body small" style={{ color: "var(--ink-3)", marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 25, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Numbers inside nodes = demand dᵢ
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide13() {
  return (
    <section className="slide" data-label="The three constraints">
      <SlideFrame>
        <div className="tag">CVRP</div>
        <h2 className="title" style={{ marginTop: 28 }}>Three constraints define the CVRP.</h2>

        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, flex: 1 }}>
          {[
            {
              num: "i", tag: "Depot closure",
              text: "Every route starts and ends at the depot — no open paths."
            },
            {
              num: "ii", tag: "Single visit",
              text: "Every customer is visited exactly once, by exactly one vehicle."
            },
            {
              num: "iii", tag: "Capacity", color: "var(--accent)",
              text: "On every route, the sum of the demands served never exceeds the vehicle capacity C."
            },
          ].map((c, i) => (
            <div key={i} style={{
              border: "1px solid var(--line)",
              background: c.color ? "var(--ink)" : "var(--paper-2)",
              color: c.color ? "var(--paper)" : "var(--ink)",
              padding: "40px 36px",
              display: "flex", flexDirection: "column", justifyContent: "space-between"
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 180, lineHeight: 0.85, color: c.color ? c.color : "var(--ink-3)", fontStyle: "italic" }}>
                ({c.num})
              </div>
              <div>
                <div className="kicker" style={{ color: c.color ? "var(--paper-deep)" : "var(--ink-3)" }}>{c.tag}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1.1, marginTop: 10, textWrap: "balance" }}>
                  {c.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 30, fontFamily: "var(--font-mono)", fontSize: 28, color: "var(--ink-3)", textAlign: "right" }}>
          Toth & Vigo, §1.2.1 — definition of CVRP
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide14() {
  return (
    <section className="slide" data-label="Two-index ILP formulation">
      <SlideFrame>
        <div className="tag">CVRP · Model VRP1</div>
        <h2 className="title" style={{ marginTop: 28 }}>A two-index integer formulation.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="body" style={{ color: "var(--ink-2)" }}>
              Binary decision variable on each arc:
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 22, fontFamily: "var(--font-mono)", fontSize: 26, lineHeight: 1.4 }}>
              xᵢⱼ = 1 &nbsp;if arc (i, j) belongs to some route<br/>
              xᵢⱼ = 0 &nbsp;otherwise
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              The objective sums arc costs over used arcs; the constraints force in/out-degrees, depot usage, and capacity.
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "32px 40px", fontFamily: "var(--font-mono)", fontSize: 24, lineHeight: 1.6 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, marginBottom: 18 }}>
              <TeX display>{String.raw`\min \sum_{i \in V} \sum_{j \in V} c_{ij}\, x_{ij}`}</TeX>
            </div>
            <div style={{ color: "var(--ink-3)", marginBottom: 6 }}>subject to</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", rowGap: 10, columnGap: 16 }}>
              <div><TeX>{String.raw`\sum_{i \in V} x_{ij} = 1`}</TeX> &nbsp; ∀ j ∈ V\{0}</div><div style={{ color: "var(--ink-3)" }}>(in-degree)</div>
              <div><TeX>{String.raw`\sum_{j \in V} x_{ij} = 1`}</TeX> &nbsp; ∀ i ∈ V\{0}</div><div style={{ color: "var(--ink-3)" }}>(out-degree)</div>
              <div><TeX>{String.raw`\sum_{j \in V} x_{0j} = K`}</TeX></div><div style={{ color: "var(--ink-3)" }}>(K vehicles)</div>
              <div><TeX>{String.raw`\sum_{i \in V} x_{i0} = K`}</TeX></div><div style={{ color: "var(--ink-3)" }}>(return)</div>
              <div style={{ color: "var(--accent)" }}><TeX>{String.raw`\sum_{i \notin S}\sum_{j \in S} x_{ij} \;\geq\; r(S)`}</TeX> &nbsp; ∀ S ⊆ V\{0}</div><div style={{ color: "var(--accent)" }}>(capacity-cut)</div>
              <div>xᵢⱼ ∈ {"{"}0, 1{"}"}</div><div style={{ color: "var(--ink-3)" }}>(integrality)</div>
            </div>
            <div style={{ color: "var(--ink-3)", fontSize: 26, marginTop: 18 }}>
              r(S) = minimum number of vehicles to serve customers in S (a BPP on demands).
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide15() {
  // Visual: a cut separating a subset S
  return (
    <section className="slide" data-label="Capacity-cut constraints">
      <SlideFrame>
        <div className="tag">CVRP · Valid inequality</div>
        <h2 className="title" style={{ marginTop: 28 }}>Capacity cuts forbid over-loaded clusters.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, flex: 1 }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, position: "relative" }}>
            <svg viewBox="0 0 820 600" style={{ width: "100%", height: "100%", display: "block" }}>
              {/* Region S */}
              <ellipse cx={560} cy={220} rx={190} ry={160}
                       fill="var(--accent)" fillOpacity={0.08}
                       stroke="var(--accent)" strokeWidth={2.5} strokeDasharray="8 6"/>
              <text x={560} y={70} textAnchor="middle" fontFamily="var(--font-display)" fontSize={34} fill="var(--accent)" fontStyle="italic">S</text>

              {/* Depot */}
              <rect x={200-14} y={400-14} width={28} height={28} fill="var(--depot)"/>
              <text x={200} y={450} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)">depot 0</text>

              {/* Customers outside S */}
              {[[260,260],[340,370],[430,460],[180,230]].map(([x,y],i) =>
                <circle key={i} cx={x} cy={y} r={11} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              )}
              {/* Customers inside S */}
              {[[500,160],[580,180],[640,240],[550,280],[680,180]].map(([x,y],i) =>
                <circle key={i} cx={x} cy={y} r={11} fill="var(--paper)" stroke="var(--accent)" strokeWidth={2.5}/>
              )}

              {/* Boundary-crossing arcs */}
              {[[[340,370],[550,280]],[[430,460],[640,240]],[[260,260],[500,160]]].map((pair,i)=>(
                <line key={i} x1={pair[0][0]} y1={pair[0][1]} x2={pair[1][0]} y2={pair[1][1]}
                      stroke="var(--accent-2)" strokeWidth={3} markerEnd="url(#arr)"/>
              ))}
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-2)"/>
                </marker>
              </defs>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
            <div className="lede" style={{ fontSize: 42 }}>
              At least <em style={{ color: "var(--accent)" }}>r(S)</em> vehicles must <em>enter</em> any subset S of customers.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px", fontFamily: "var(--font-mono)", fontSize: 24 }}>
              <TeX display>{String.raw`\sum_{i \notin S}\sum_{j \in S} x_{ij} \;\geq\; r(S) \;\geq\; \left\lceil \frac{d(S)}{C} \right\rceil`}</TeX>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              These constraints are exponentially many — in practice they are added lazily during branch-and-cut via a separation oracle.
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
  Slide11, Slide12, Slide13, Slide14, Slide15,
});
