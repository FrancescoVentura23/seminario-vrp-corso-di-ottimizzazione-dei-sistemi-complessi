/* =========================================================================
   VRP Seminar — Slides part B (16-30): Complexity, family, demo, closing
   ========================================================================= */

// ----- SLIDE 16 — Section III: Complexity -----
function Slide16() {
  return (
    <section className="slide section-slide" data-label="Part IV — Complexity">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part VI of IX</div>
        <div>Slides 28 — 29</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Six</div>
        <div className="hero" style={{ fontSize: 240 }}>Complexity</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          Why the VRP is hard — and why heuristics matter in practice.
        </div>
      </div>
    </section>
  );
}

// ----- SLIDE 17 — NP-hardness & explosion -----
function Slide17() {
  const rows = [
    ["5", "60", "instant"],
    ["10", "3.6 · 10⁶", "ms"],
    ["15", "8.7 · 10¹¹", "minutes"],
    ["20", "1.2 · 10¹⁷", "centuries"],
    ["25", "3.1 · 10²²", "→ heat death"],
  ];
  return (
    <section className="slide" data-label="NP-hardness and explosion">
      <SlideFrame>
        <div className="tag">Complexity</div>
        <h2 className="title" style={{ marginTop: 28 }}>CVRP is NP-hard — enumeration doesn't scale.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, justifyContent: "center" }}>
            <div className="lede">
              The CVRP generalises the TSP — which is already NP-hard in the strong sense. Every known exact algorithm is, in the worst case, super-polynomial.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px", fontFamily: "var(--font-mono)", fontSize: 24 }}>
              Hamiltonian circuits on n vertices:<br/>
              <span style={{ color: "var(--accent)" }}>{"(n - 1)! / 2"}</span> — factorial growth.
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              Adding capacity, time windows, or multiple vehicles only makes things worse.
            </div>
          </div>

          <div style={{ border: "1px solid var(--line)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: 34 }}>
              <thead>
                <tr style={{ background: "var(--ink)", color: "var(--paper)" }}>
                  <th style={{ padding: "18px 20px", textAlign: "left", fontSize: 25, letterSpacing: "0.1em", textTransform: "uppercase" }}>n</th>
                  <th style={{ padding: "18px 20px", textAlign: "right", fontSize: 25, letterSpacing: "0.1em", textTransform: "uppercase" }}>tours</th>
                  <th style={{ padding: "18px 20px", textAlign: "right", fontSize: 25, letterSpacing: "0.1em", textTransform: "uppercase" }}>@ 1 μs/tour</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "18px 20px", color: "var(--ink)" }}>{r[0]}</td>
                    <td style={{ padding: "18px 20px", textAlign: "right" }}>{r[1]}</td>
                    <td style={{ padding: "18px 20px", textAlign: "right", color: i >= 3 ? "var(--accent-2)" : "var(--ink-3)" }}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 18 — Exact vs heuristic -----
function Slide18() {
  return (
    <section className="slide" data-label="Exact vs heuristic">
      <SlideFrame>
        <div className="tag">Complexity</div>
        <h2 className="title" style={{ marginTop: 28 }}>Two families of algorithms — two different promises.</h2>

        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, flex: 1 }}>
          {[
            {
              name: "Exact methods",
              sub: "Branch-and-bound · branch-and-cut · set covering",
              pros: ["Certificate of optimality", "Tight lower bounds via LP", "Benchmark results for research"],
              cons: ["Hundreds of vertices at most", "Minutes → hours per instance", "Brittle with added constraints"],
              bg: "var(--paper-2)", color: "var(--ink)",
            },
            {
              name: "Heuristics & metaheuristics",
              sub: "Clarke-Wright · Tabu · LNS · Genetic · ALNS",
              pros: ["Thousands of vertices, seconds", "Handle messy real constraints", "Re-optimise dynamically"],
              cons: ["No optimality guarantee", "Tuning required", "Quality varies by instance"],
              bg: "var(--ink)", color: "var(--paper)",
            },
          ].map((c, i) => (
            <div key={i} style={{ background: c.bg, color: c.color, padding: "44px 40px", border: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <div className="kicker" style={{ color: i === 1 ? "var(--paper-deep)" : "var(--ink-3)" }}>Approach {i+1}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 56, marginTop: 10 }}>{c.name}</div>
                <div className="body small" style={{ color: i === 1 ? "var(--paper-deep)" : "var(--ink-3)", marginTop: 8 }}>{c.sub}</div>
              </div>
              <div className="rule" style={{ background: i === 1 ? "rgba(255,255,255,0.15)" : "var(--line)" }}/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div className="kicker" style={{ color: "var(--accent-3)", marginBottom: 12 }}>+ strengths</div>
                  {c.pros.map((p, k) => <div key={k} style={{ fontSize: 34, lineHeight: 1.3, marginBottom: 8 }}>— {p}</div>)}
                </div>
                <div>
                  <div className="kicker" style={{ color: "var(--accent-2)", marginBottom: 12 }}>− limits</div>
                  {c.cons.map((p, k) => <div key={k} style={{ fontSize: 34, lineHeight: 1.3, marginBottom: 8 }}>— {p}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 19 — Section IV: Family -----
function Slide19() {
  return (
    <section className="slide section-slide" data-label="Part V — VRP family">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part VII of IX</div>
        <div>Slides 31 — 34</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Seven</div>
        <div className="hero" style={{ fontSize: 240 }}>The family</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          A taxonomy of VRP variants — time windows, backhauls, pickup & delivery, and beyond.
        </div>
      </div>
    </section>
  );
}

// ----- SLIDE 20 — Taxonomy -----
function Slide20() {
  // Figure 1.1 recreation — hierarchical tree
  return (
    <section className="slide" data-label="VRP taxonomy">
      <SlideFrame>
        <div className="tag">Family · Fig. 1.1</div>
        <h2 className="title" style={{ marginTop: 28 }}>The basic VRPs and their interconnections.</h2>

        <div style={{ marginTop: 40, flex: 1, background: "var(--paper-2)", border: "1px solid var(--line)", padding: 40 }}>
          <svg viewBox="0 0 1600 680" style={{ width: "100%", height: "100%", display: "block" }}>
            {/* TSP at root */}
            {(() => {
              const box = (x, y, w, h, label, sub, accent) => (
                <g>
                  <rect x={x} y={y} width={w} height={h} fill={accent ? "var(--ink)" : "var(--paper)"} stroke="var(--ink)" strokeWidth={2}/>
                  <text x={x + w/2} y={y + 40} textAnchor="middle" fontFamily="var(--font-display)" fontSize={36} fill={accent ? "var(--paper)" : "var(--ink)"}>{label}</text>
                  <text x={x + w/2} y={y + 68} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill={accent ? "var(--paper-deep)" : "var(--ink-3)"} letterSpacing="0.05em">{sub}</text>
                </g>
              );
              const arrow = (x1, y1, x2, y2) => (
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink-3)" strokeWidth={2} markerEnd="url(#arrHead)"/>
              );
              return (
                <g>
                  <defs>
                    <marker id="arrHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-3)"/>
                    </marker>
                  </defs>
                  {/* Top row */}
                  {box(660, 40, 280, 100, "TSP", "1 vehicle · no capacity", false)}

                  {/* Second row - CVRP centerpiece */}
                  {box(660, 260, 280, 100, "CVRP", "+ K vehicles · capacity C", true)}

                  {arrow(800, 140, 800, 260)}

                  {/* Third row - VARIANTS */}
                  {box(160, 500, 260, 110, "DVRP", "+ distance / time limit", false)}
                  {box(460, 500, 260, 110, "VRPTW", "+ time windows [aᵢ, bᵢ]", false)}
                  {box(760, 500, 260, 110, "VRPB", "+ linehauls & backhauls", false)}
                  {box(1060, 500, 260, 110, "VRPPD", "+ pickup & delivery", false)}
                  {box(1360, 500, 220, 110, "MDVRP", "+ multi-depot", false)}

                  {/* Arrows from CVRP */}
                  {[290, 590, 890, 1190, 1470].map((cx, i) =>
                    <line key={i} x1={800} y1={360} x2={cx} y2={500} stroke="var(--ink-3)" strokeWidth={2} markerEnd="url(#arrHead)"/>
                  )}
                </g>
              );
            })()}
          </svg>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 25, color: "var(--ink-3)", marginTop: 10 }}>
            An arrow A → B means B is an extension of A (Toth & Vigo, Fig. 1.1).
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 21 — VRPTW -----
function Slide21() {
  const tw = [
    { id: 1, a: "08:00", b: "10:00", x: 220, y: 170 },
    { id: 2, a: "09:30", b: "11:00", x: 340, y: 120 },
    { id: 3, a: "08:00", b: "09:00", x: 540, y: 120 },
    { id: 4, a: "13:00", b: "16:00", x: 680, y: 200 },
    { id: 5, a: "10:00", b: "12:30", x: 720, y: 340 },
    { id: 6, a: "14:00", b: "17:00", x: 620, y: 470 },
    { id: 7, a: "11:00", b: "13:00", x: 440, y: 510 },
    { id: 8, a: "09:00", b: "11:00", x: 240, y: 480 },
  ];
  return (
    <section className="slide" data-label="VRPTW">
      <SlideFrame>
        <div className="tag">Family</div>
        <h2 className="title" style={{ marginTop: 28 }}>VRP with Time Windows — every customer has a time interval.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, flex: 1 }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, position: "relative" }}>
            <svg viewBox="0 0 900 620" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
              <rect x={420-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
              {/* Routes */}
              <polyline points="420,320 220,170 340,120 540,120 420,320" fill="none" stroke="var(--route-1)" strokeWidth={3.5}/>
              <polyline points="420,320 680,200 720,340 620,470 420,320" fill="none" stroke="var(--route-2)" strokeWidth={3.5}/>
              <polyline points="420,320 440,510 240,480 420,320" fill="none" stroke="var(--route-3)" strokeWidth={3.5}/>
              {tw.map(c => (
                <g key={c.id}>
                  <circle cx={c.x} cy={c.y} r={12} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <rect x={c.x + 18} y={c.y - 16} width={96} height={32} fill="var(--ink)" rx={2}/>
                  <text x={c.x + 66} y={c.y + 5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--paper)">{c.a}–{c.b}</text>
                </g>
              ))}
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
            <div className="lede">
              Each customer <em>i</em> has a window <em>[aᵢ, bᵢ]</em>. The vehicle must <strong>start service</strong> within it — early arrivals wait.
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 34, background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 22px", lineHeight: 1.5 }}>
              service at i starts at τᵢ<br/>
              with <span style={{ color: "var(--accent)" }}>aᵢ ≤ τᵢ ≤ bᵢ</span><br/>
              vehicle waits sᵢ time units
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              Windows orient routes implicitly: even a symmetric cost matrix becomes effectively asymmetric once you add time.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 22 — VRPB -----
function Slide22() {
  return (
    <section className="slide" data-label="VRPB">
      <SlideFrame>
        <div className="tag">Family</div>
        <h2 className="title" style={{ marginTop: 28 }}>VRP with Backhauls — linehauls first, then backhauls.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, flex: 1 }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24 }}>
            <svg viewBox="0 0 900 620" style={{ width: "100%", height: "100%" }}>
              <rect x={420-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
              {/* Route 1: L -> L -> B -> B -> 0 */}
              <polyline points="420,320 280,170 500,140 680,230 620,440 420,320" fill="none" stroke="var(--route-1)" strokeWidth={3.5}/>
              {/* Linehauls (deliveries) — filled solid */}
              {[[280,170],[500,140]].map(([x,y],i) =>
                <g key={`L${i}`}>
                  <circle cx={x} cy={y} r={14} fill="var(--accent-3)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={x} y={y+5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--paper)" fontWeight={700}>L</text>
                </g>
              )}
              {/* Backhauls (pickups) */}
              {[[680,230],[620,440]].map(([x,y],i) =>
                <g key={`B${i}`}>
                  <circle cx={x} cy={y} r={14} fill="var(--accent-2)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={x} y={y+5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink)" fontWeight={700}>B</text>
                </g>
              )}
              {/* Second route — linehaul only */}
              <polyline points="420,320 240,450 380,520 420,320" fill="none" stroke="var(--route-3)" strokeWidth={3.5}/>
              {[[240,450],[380,520]].map(([x,y],i) =>
                <g key={`L2${i}`}>
                  <circle cx={x} cy={y} r={14} fill="var(--accent-3)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={x} y={y+5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--paper)" fontWeight={700}>L</text>
                </g>
              )}
            </svg>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 25, color: "var(--ink-3)", marginTop: 10 }}>
              L = linehaul (delivery) · B = backhaul (pickup)
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
            <div className="lede">
              The customer set splits into linehaul <em>L</em> and backhaul <em>B</em>. On any mixed route, <strong>all deliveries finish before any pickup</strong>.
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              The precedence reflects physical loading constraints: rearranging the cargo mid-route is costly or impossible.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 23 — VRPPD -----
function Slide23() {
  return (
    <section className="slide" data-label="VRPPD">
      <SlideFrame>
        <div className="tag">Family</div>
        <h2 className="title" style={{ marginTop: 28 }}>VRP with Pickup & Delivery — coupled origin-destination pairs.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, flex: 1 }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24 }}>
            <svg viewBox="0 0 900 620" style={{ width: "100%", height: "100%" }}>
              <rect x={420-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
              {/* Route visiting P1 -> D1 -> P2 -> D2 -> depot */}
              <polyline points="420,320 240,200 600,160 520,440 720,380 420,320"
                        fill="none" stroke="var(--route-4)" strokeWidth={3.5}/>
              {/* Dashed pair-links */}
              <line x1={240} y1={200} x2={520} y2={440} stroke="var(--accent-2)" strokeWidth={1.8} strokeDasharray="4 5" opacity={0.7}/>
              <line x1={600} y1={160} x2={720} y2={380} stroke="var(--accent-2)" strokeWidth={1.8} strokeDasharray="4 5" opacity={0.7}/>
              {/* P nodes */}
              {[[240,200,"P₁"],[600,160,"P₂"]].map(([x,y,l],i) =>
                <g key={`P${i}`}>
                  <circle cx={x} cy={y} r={16} fill="var(--accent)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={x} y={y+5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--paper)" fontWeight={700}>{l}</text>
                </g>
              )}
              {/* D nodes */}
              {[[520,440,"D₁"],[720,380,"D₂"]].map(([x,y,l],i) =>
                <g key={`D${i}`}>
                  <circle cx={x} cy={y} r={16} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                  <text x={x} y={y+5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink)" fontWeight={700}>{l}</text>
                </g>
              )}
            </svg>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 25, color: "var(--ink-3)", marginTop: 10 }}>
              P = pickup · D = delivery · dashed = pairing constraint
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
            <div className="lede">
              Each request has an <em>origin Oᵢ</em> and a <em>destination Dᵢ</em>: same vehicle, and <strong>Oᵢ visited before Dᵢ</strong>.
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              The archetype of ride-sharing, dial-a-ride, and courier dispatch.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 24 — Section V: Demo -----
function Slide24() {
  return (
    <section className="slide section-slide" data-label="Part VI — Live demo">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Live demo</div>
        <div>Slides 36 — 37</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Interactive</div>
        <div className="hero" style={{ fontSize: 220 }}>Clarke–Wright</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          The savings heuristic — still the starting point for most real VRP solvers, 60 years later.
        </div>
      </div>
    </section>
  );
}

// ----- SLIDE 25 — Idea -----
function Slide25() {
  return (
    <section className="slide" data-label="Clarke-Wright idea">
      <SlideFrame>
        <div className="tag">Clarke–Wright (1964)</div>
        <h2 className="title" style={{ marginTop: 28 }}>The savings idea — merge two round-trips if it shortens the total.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, flex: 1 }}>
          {[
            {
              t: "Before merging",
              desc: "Two separate round-trips: 0 → i → 0 and 0 → j → 0.",
              svg: (
                <svg viewBox="0 0 600 400">
                  <rect x={300-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
                  <polyline points="300,320 150,120 300,320" fill="none" stroke="var(--route-1)" strokeWidth={3.5} strokeDasharray="6 6"/>
                  <polyline points="300,320 470,120 300,320" fill="none" stroke="var(--route-1)" strokeWidth={3.5} strokeDasharray="6 6"/>
                  <circle cx={150} cy={120} r={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={150} y={125} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600}>i</text>
                  <circle cx={470} cy={120} r={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={470} y={125} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600}>j</text>
                </svg>
              ),
              cost: <>c(0,i) + c(i,0) + c(0,j) + c(j,0) = <b>2 c(0,i) + 2 c(0,j)</b></>
            },
            {
              t: "After merging",
              desc: "One single route visiting i then j: 0 → i → j → 0.",
              svg: (
                <svg viewBox="0 0 600 400">
                  <rect x={300-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
                  <polyline points="300,320 150,120 470,120 300,320" fill="none" stroke="var(--route-2)" strokeWidth={4}/>
                  <circle cx={150} cy={120} r={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={150} y={125} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600}>i</text>
                  <circle cx={470} cy={120} r={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={470} y={125} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600}>j</text>
                </svg>
              ),
              cost: <>c(0,i) + c(i,j) + c(j,0)</>
            },
          ].map((c, i) => (
            <div key={i} style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="kicker">{c.t}</div>
              <div style={{ flex: 1, minHeight: 280 }}>{c.svg}</div>
              <div className="body small" style={{ color: "var(--ink-3)" }}>{c.desc}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 29, background: "var(--paper)", border: "1px solid var(--line)", padding: "12px 16px" }}>{c.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: "var(--ink)", color: "var(--paper)", padding: "20px 26px", fontFamily: "var(--font-mono)", fontSize: 28 }}>
          savings &nbsp;<span style={{ color: "var(--accent-2)" }}>s(i, j) = c(0, i) + c(0, j) − c(i, j)</span> &nbsp; → merge pair with largest positive saving that remains feasible.
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 26 — Interactive demo -----
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

// ----- SLIDE 27 — Section VI: Applications -----
function Slide27() {
  return (
    <section className="slide section-slide" data-label="Part VII — Applications">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Applications</div>
        <div className="hero" style={{ fontSize: 240 }}>In the wild</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          Four industries where VRP solvers directly drive planning decisions every day.
        </div>
      </div>
    </section>
  );
}

// ----- SLIDE 28 — Case studies -----
function Slide28() {
  const cases = [
    { t: "Gasoline distribution", v: "Dantzig & Ramser (1959) · the founding case · bulk terminal to service stations.", model: "CVRP" },
    { t: "Solid waste collection", v: "Urban garbage trucks, one pass through every street · arc-routing variant.", model: "ARP · CARP" },
    { t: "School bus routing", v: "Pickup children within time windows; capacity = seats; minimise fleet.", model: "VRPTW" },
    { t: "Dial-a-ride transport", v: "Shared rides for elderly/disabled passengers · strict pickup → dropoff pairing.", model: "VRPPD" },
    { t: "Newspaper distribution", v: "Morning deadline = hard time window · few depots, many endpoints.", model: "VRPTW" },
    { t: "Electric-vehicle fleets", v: "Battery-aware routing · charging-station detours · modern research frontier.", model: "EVRP" },
  ];
  return (
    <section className="slide" data-label="Case studies">
      <SlideFrame>
        <div className="tag">Applications</div>
        <h2 className="title" style={{ marginTop: 28 }}>Six canonical case studies.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {cases.map((c, i) => (
            <div key={i} style={{
              padding: "32px 36px",
              borderRight: (i % 2 === 0) ? "1px solid var(--line)" : "none",
              borderBottom: i < 4 ? "1px solid var(--line)" : "none",
              display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "start",
              minHeight: 200,
            }}>
              <div>
                <div className="kicker" style={{ color: "var(--accent)" }}>{String(i+1).padStart(2,"0")}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 40, marginTop: 6, lineHeight: 1.05 }}>{c.t}</div>
                <div className="body small" style={{ color: "var(--ink-3)", marginTop: 10 }}>{c.v}</div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 25, letterSpacing: "0.08em", color: "var(--paper)", background: "var(--ink)", padding: "6px 12px", whiteSpace: "nowrap" }}>{c.model}</div>
            </div>
          ))}
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 29 — Takeaways -----
function Slide29() {
  const pts = [
    ["A VRP is a family, not one problem.", "Every real-world routing question maps to a CVRP variant + extra constraints."],
    ["The graph model is the grammar.", "Depot, customers, complete graph with arc costs — then objectives layer on top."],
    ["Exact methods dominate research; heuristics dominate practice.", "Clarke–Wright, LNS and metaheuristics still power commercial solvers."],
    ["The frontier is dynamic & stochastic.", "Real-time re-optimisation, uncertain demands, EV constraints, multi-modal fleets."],
  ];
  return (
    <section className="slide" data-label="Takeaways">
      <SlideFrame>
        <div className="tag">Takeaways</div>
        <h2 className="title" style={{ marginTop: 28 }}>Four things worth remembering.</h2>

        <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
          {pts.map(([h, d], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 40, padding: "30px 0", borderTop: "1px solid var(--line)", alignItems: "baseline" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 80, color: "var(--accent)", lineHeight: 1 }}>{String(i+1).padStart(2,"0")}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1.1 }}>{h}</div>
                <div className="body" style={{ color: "var(--ink-3)", marginTop: 10 }}>{d}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }}/>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 30 — Closing -----
function Slide30() {
  return (
    <section className="slide section-slide" data-label="Thank you">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ marginBottom: 30 }}>End of lecture</div>
        <div className="hero" style={{ fontSize: 260 }}>Questions?</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 46, marginTop: 50, maxWidth: 1400, lineHeight: 1.15 }}>
          Further reading — P. Toth & D. Vigo (eds.), <em>The Vehicle Routing Problem</em>, SIAM Monographs on Discrete Math., 2002.
        </div>

        <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 60, fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.04em" }}>
          <div>
            <div style={{ color: "var(--paper-deep)", marginBottom: 10, fontSize: 24, letterSpacing: "0.12em", textTransform: "uppercase" }}>Course</div>
            <div>Optimization of Complex Systems</div>
            <div style={{ color: "var(--paper-deep)" }}>MSc Management Engineering</div>
          </div>
          <div>
            <div style={{ color: "var(--paper-deep)", marginBottom: 10, fontSize: 24, letterSpacing: "0.12em", textTransform: "uppercase" }}>Next lecture</div>
            <div>Exact methods — branch-and-cut for CVRP</div>
          </div>
          <div>
            <div style={{ color: "var(--paper-deep)", marginBottom: 10, fontSize: 24, letterSpacing: "0.12em", textTransform: "uppercase" }}>Try it yourself</div>
            <div>VRPLIB benchmarks · OR-Tools · PyVRP</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Register slides B
Object.assign(window, {
  Slide16, Slide17, Slide18, Slide19, Slide20,
  Slide21, Slide22, Slide23, Slide24, Slide25,
  Slide26, Slide27, Slide28, Slide29, Slide30,
});
