/* =========================================================================
   VRP Seminar — Part VII: VRP family
   Slides: section header, Taxonomy, VRPTW, Backhauls & PD,
           Multi-depot & open VRP
   ========================================================================= */

function Slide19() {
  return (
    <section className="slide section-slide" data-label="Part VII — VRP family">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part VII of IX</div>
        <div>Slides 48 — 51</div>
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


function Slide20() {
  // Figure 1.1 recreation — hierarchical tree
  return (
    <section className="slide" data-label="VRP taxonomy">
      <SlideFrame>
        <div className="tag">Family · Fig. 1.1</div>
        <h2 className="title" style={{ marginTop: 28 }}>The basic VRPs and their interconnections.</h2>

        {/* Explanatory lede — placed ABOVE the diagram so the figure can sit
            comfortably below it without crowding the slide chrome. */}
        <div className="lede" style={{ marginTop: 24, fontSize: 30, lineHeight: 1.25, maxWidth: 1700 }}>
          The <strong>CVRP sits at the centre of the family</strong>: every classical variant adds one extra constraint to the same capacitated core — a time window, a precedence pairing, a second depot.
        </div>

        {/* Chart container — flex:1 absorbs the remaining vertical space and
            never overflows into the chrome. Sub-texts inside each node have
            been bumped from 15 → 22 px so they stay legible in projection. */}
        <div style={{ marginTop: 24, background: "var(--paper-2)", border: "1px solid var(--line)", padding: 28, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <svg viewBox="0 0 1600 680" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
              {/* TSP at root */}
              {(() => {
                const box = (x, y, w, h, label, sub, accent) => (
                  <g>
                    <rect x={x} y={y} width={w} height={h} fill={accent ? "var(--ink)" : "var(--paper)"} stroke="var(--ink)" strokeWidth={2}/>
                    <text x={x + w/2} y={y + 50} textAnchor="middle" fontFamily="var(--font-display)" fontSize={40} fill={accent ? "var(--paper)" : "var(--ink)"}>{label}</text>
                    <text x={x + w/2} y={y + 92} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill={accent ? "var(--paper-deep)" : "var(--ink-3)"}>{sub}</text>
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
                    {/* Top row — TSP and CVRP widened to 360 to fit the bigger sub text */}
                    {box(620, 40, 360, 120, "TSP", "1 vehicle · no capacity", false)}

                    {/* Second row — CVRP centerpiece */}
                    {box(620, 240, 360, 120, "CVRP", "+ K vehicles · capacity C", true)}

                    {arrow(800, 160, 800, 240)}

                    {/* Third row — VARIANTS (widths bumped 260→320, last 220→280;
                        positions recomputed to keep them inside the 1600 viewBox). */}
                    {box(10,   480, 320, 130, "DVRP",  "+ distance / time limit",   false)}
                    {box(335,  480, 320, 130, "VRPTW", "+ time windows [aᵢ, bᵢ]",   false)}
                    {box(660,  480, 320, 130, "VRPB",  "+ linehauls & backhauls",   false)}
                    {box(985,  480, 320, 130, "VRPPD", "+ pickup & delivery",       false)}
                    {box(1310, 480, 280, 130, "MDVRP", "+ multi-depot",             false)}

                    {/* Arrows from CVRP — targets updated to the new variant centres */}
                    {[170, 495, 820, 1145, 1450].map((cx, i) =>
                      <line key={i} x1={800} y1={360} x2={cx} y2={480} stroke="var(--ink-3)" strokeWidth={2} markerEnd="url(#arrHead)"/>
                    )}
                  </g>
                );
              })()}
            </svg>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-3)", marginTop: 8 }}>
            An arrow A → B means B is an extension of A (Toth & Vigo, Fig. 1.1).
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


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


Object.assign(window, {
  Slide19, Slide20, Slide21, Slide22, Slide23,
});
