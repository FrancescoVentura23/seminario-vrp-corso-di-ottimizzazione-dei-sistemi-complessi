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
        <div>Slides 48 — 54</div>
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

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, flex: 1 }}>
          {/* Left — explanatory text */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
            <div className="lede">
              Each customer <TeX>{"i"}</TeX> has a window <TeX>{"[a_i,\\, b_i]"}</TeX>. The vehicle must <strong>start service</strong> within it — early arrivals wait.
            </div>
            <div style={{ fontSize: 28, background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 22px", lineHeight: 1.7 }}>
              service at <TeX>{"i"}</TeX> starts at <TeX>{"\\tau_i"}</TeX><br/>
              with <span style={{ color: "var(--accent)" }}><TeX>{"a_i \\le \\tau_i \\le b_i"}</TeX></span><br/>
              vehicle waits <TeX>{"s_i"}</TeX> time units
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              Windows orient routes implicitly: even a symmetric cost matrix becomes effectively asymmetric once you add time.
            </div>
          </div>

          {/* Right — chart with time-window pills (slide-10 style: white pill, accent border, accent monospace text) */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, position: "relative" }}>
            <svg viewBox="0 0 900 620" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
              <rect x={420-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
              {/* Routes */}
              <polyline points="420,320 220,170 340,120 540,120 420,320" fill="none" stroke="var(--route-1)" strokeWidth={3.5}/>
              <polyline points="420,320 680,200 720,340 620,470 420,320" fill="none" stroke="var(--route-2)" strokeWidth={3.5}/>
              <polyline points="420,320 440,510 240,480 420,320" fill="none" stroke="var(--route-3)" strokeWidth={3.5}/>
              {tw.map(c => {
                // Pill placed above each customer, mirroring SlideNodeAttributes (slide 10):
                // white fill, accent border, monospace text in accent color, dashed leader.
                const pillW = 160, pillH = 42;
                const pillX = c.x - pillW / 2;
                const pillY = c.y - 88;
                return (
                  <g key={c.id}>
                    {/* dashed leader from pill bottom to just above node */}
                    <line x1={c.x} y1={c.y - 46} x2={c.x} y2={c.y - 14}
                          stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 3"/>
                    {/* customer node */}
                    <circle cx={c.x} cy={c.y} r={12} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                    {/* time-window pill — identical visual language to slide 10 */}
                    <rect x={pillX} y={pillY} width={pillW} height={pillH}
                          fill="var(--paper)" stroke="var(--accent)" strokeWidth={2} rx={6}/>
                    <text x={c.x} y={pillY + 28} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={22} fontWeight={600}
                          fill="var(--accent)">
                      {c.a}–{c.b}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}



// ==========================================================
// VRPB INTRO — define linehaul vs backhaul with an animated
// truck demo: cargo full at depot, unloads at the green
// linehaul, then loads at the amber backhaul.
// Pattern follows Slide09 (TSP) for replay button + animKey
// reset, plus inline @keyframes for truck movement and
// cargo-fill height.

function Slide22Intro() {
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);
  const btnRef = React.useRef(null);

  // Auto-restart whenever the slide becomes active
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) {
        setAnimKey(k => k + 1);
      }
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // Replay button — native click listener (React's delegation breaks once
  // <section> is moved into <deck-stage>).
  React.useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const handler = () => setAnimKey(k => k + 1);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  // Geometry
  const depot    = { x: 90,  y: 230 };
  const linehaul = { x: 410, y: 230 };
  const backhaul = { x: 720, y: 230 };
  const truckY   = 140;          // truck sits above the stops
  const seg1Len  = Math.abs(linehaul.x - depot.x);
  const seg2Len  = Math.abs(backhaul.x - linehaul.x);
  const seg3Len  = Math.abs(backhaul.x - depot.x);

  return (
    <section ref={sectionRef} className="slide" data-label="Linehauls and backhauls">
      <SlideFrame>
        <div className="tag">Family · VRPB primer</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          Two kinds of customers — <em style={{ color: "var(--accent-3)" }}>linehauls</em> and <em style={{ color: "var(--accent-2)" }}>backhauls</em>.
        </h2>

        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, flex: 1 }}>
          {/* Left — definitions */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
            <div className="lede">
              Before the rule, the vocabulary. A <em>linehaul</em> is a customer that <em>receives</em> goods; a <em>backhaul</em> is one whose goods are <em>collected</em> back to the depot.
            </div>

            {/* Two definition cards — same colour code as the chart on the right */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ display: "inline-flex", width: 30, height: 30, borderRadius: "50%", background: "var(--accent-3)", border: "1.5px solid var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, alignItems: "center", justifyContent: "center" }}>L</span>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>Linehaul</div>
                </div>
                <div style={{ fontSize: 21, color: "var(--ink-2)", lineHeight: 1.3 }}>
                  Customer that <em>receives</em> goods from the depot — a delivery on the outbound leg.
                </div>
              </div>
              <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ display: "inline-flex", width: 30, height: 30, borderRadius: "50%", background: "var(--accent-2)", border: "1.5px solid var(--ink)", color: "var(--ink)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, alignItems: "center", justifyContent: "center" }}>B</span>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 26 }}>Backhaul</div>
                </div>
                <div style={{ fontSize: 21, color: "var(--ink-2)", lineHeight: 1.3 }}>
                  Customer from which goods are <em>collected</em> back to the depot — a pickup.
                </div>
              </div>
            </div>

            <div className="body small" style={{ color: "var(--ink-3)" }}>
              Watch the truck on the right: it leaves the depot loaded, <em>unloads</em> at the green linehaul, <em>loads</em> at the amber backhaul, then returns to the depot — completing the Hamiltonian cycle.
            </div>
          </div>

          {/* Right — animated demo */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, position: "relative" }}>
            <button
              ref={btnRef}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                padding: "8px 18px",
                background: "var(--accent)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
              }}
            >
              ↻ Replay
            </button>

            {/* Inline keyframes — depend on the (x,y) of the three stops, so
                we can not move them to styles.css. */}
            <style dangerouslySetInnerHTML={{ __html: `
              /* Total duration: 6500ms
                 0-11%  : depot (pause)
                 11-31% : depot→L (moving)
                 31-45% : at L (unloading)
                 45-63% : L→B (moving)
                 63-77% : at B (loading)
                 77-95% : B→depot (returning)
                 95-100%: depot (done) */
              @keyframes truckMove22Intro {
                0%, 11%   { transform: translate(${depot.x}px,    ${truckY}px); }
                31%       { transform: translate(${linehaul.x}px, ${truckY}px); }
                45%       { transform: translate(${linehaul.x}px, ${truckY}px); }
                63%       { transform: translate(${backhaul.x}px, ${truckY}px); }
                77%       { transform: translate(${backhaul.x}px, ${truckY}px); }
                95%, 100% { transform: translate(${depot.x}px,    ${truckY}px); }
              }
              @keyframes truckFlip22Intro {
                0%   { transform: scaleX(1);  animation-timing-function: step-end; }
                77%  { transform: scaleX(-1); }
                100% { transform: scaleX(-1); }
              }
              @keyframes cargoFill22Intro {
                0%, 31%   { y: -22px; height: 28px; }
                45%       { y: 6px;   height: 0px;  }
                63%       { y: 6px;   height: 0px;  }
                77%, 100% { y: -22px; height: 28px; }
              }
              @keyframes labelUnloading22 {
                0%, 33%   { opacity: 0; }
                37%, 43%  { opacity: 1; }
                49%, 100% { opacity: 0; }
              }
              @keyframes labelLoading22 {
                0%, 65%   { opacity: 0; }
                69%, 75%  { opacity: 1; }
                81%, 100% { opacity: 0; }
              }
            ` }}/>

            <svg viewBox="0 0 820 360" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
              {/* Single keyed group so every animation restarts together when animKey changes */}
              <g key={animKey}>
                {/* Route 1: depot -> linehaul (delivery leg, drawn while truck moves) */}
                <line x1={depot.x} y1={depot.y} x2={linehaul.x} y2={linehaul.y}
                      stroke="var(--accent-3)" strokeWidth={3} strokeLinecap="round"
                      style={{
                        "--len": seg1Len,
                        strokeDasharray: seg1Len,
                        strokeDashoffset: seg1Len,
                        animation: "drawPath 1300ms both ease-in-out",
                        animationDelay: "715ms",
                      }}/>
                {/* Route 2: linehaul -> backhaul (pickup leg) */}
                <line x1={linehaul.x} y1={linehaul.y} x2={backhaul.x} y2={backhaul.y}
                      stroke="var(--accent-2)" strokeWidth={3} strokeLinecap="round"
                      style={{
                        "--len": seg2Len,
                        strokeDasharray: seg2Len,
                        strokeDashoffset: seg2Len,
                        animation: "drawPath 1200ms both ease-in-out",
                        animationDelay: "2925ms",
                      }}/>
                {/* Route 3: backhaul -> depot (return leg) */}
                <line x1={backhaul.x} y1={backhaul.y} x2={depot.x} y2={depot.y}
                      stroke="var(--ink-3)" strokeWidth={2.5} strokeLinecap="round"
                      style={{
                        "--len": seg3Len,
                        strokeDasharray: seg3Len,
                        strokeDashoffset: seg3Len,
                        animation: "drawPath 1200ms both ease-in-out",
                        animationDelay: "5005ms",
                      }}/>

                {/* Depot — black square */}
                <rect x={depot.x - 18} y={depot.y - 18} width={36} height={36} fill="#000"/>
                <text x={depot.x} y={depot.y + 7} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize={22} fill="#fff" fontWeight={700}>0</text>
                <text x={depot.x} y={depot.y + 56} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-3)"
                      letterSpacing="0.12em">DEPOT</text>

                {/* Linehaul */}
                <circle cx={linehaul.x} cy={linehaul.y} r={28}
                        fill="var(--accent-3)" stroke="var(--ink)" strokeWidth={2.5}/>
                <text x={linehaul.x} y={linehaul.y + 8} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize={22} fill="var(--paper)" fontWeight={700}>L</text>
                <text x={linehaul.x} y={linehaul.y + 60} textAnchor="middle"
                      fontFamily="var(--font-display)" fontSize={20} fill="var(--ink)">linehaul</text>
                <text x={linehaul.x} y={linehaul.y + 84} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize={15} fill="var(--accent-3)" fontWeight={700}
                      style={{ opacity: 0, animation: "labelUnloading22 6500ms forwards ease-in-out" }}>
                  ↓ unloading
                </text>

                {/* Backhaul */}
                <circle cx={backhaul.x} cy={backhaul.y} r={28}
                        fill="var(--accent-2)" stroke="var(--ink)" strokeWidth={2.5}/>
                <text x={backhaul.x} y={backhaul.y + 8} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize={22} fill="var(--ink)" fontWeight={700}>B</text>
                <text x={backhaul.x} y={backhaul.y + 60} textAnchor="middle"
                      fontFamily="var(--font-display)" fontSize={20} fill="var(--ink)">backhaul</text>
                <text x={backhaul.x} y={backhaul.y + 84} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize={15} fill="#a86b16" fontWeight={700}
                      style={{ opacity: 0, animation: "labelLoading22 6500ms forwards ease-in-out" }}>
                  ↑ loading
                </text>

                {/* Truck — outer g translates; inner g flips at 77% when returning */}
                <g style={{ animation: "truckMove22Intro 6500ms forwards ease-in-out" }}>
                  <g style={{ transformOrigin: "5px -6px", animation: "truckFlip22Intro 6500ms forwards" }}>
                    {/* cargo box (frame) */}
                    <rect x={-30} y={-22} width={50} height={28}
                          fill="#5b6370" stroke="var(--ink)" strokeWidth={1.5} rx={2}/>
                    {/* cargo fill — height & y change via @keyframes */}
                    <rect x={-29} width={48} fill="#7CC9F0"
                          style={{ animation: "cargoFill22Intro 6500ms forwards ease-in-out" }}/>
                    {/* cab — small darker box on the right (truck faces right) */}
                    <polygon points="20,-22 36,-22 40,-12 40,6 20,6"
                             fill="#3a414b" stroke="var(--ink)" strokeWidth={1.5}/>
                    {/* windshield */}
                    <polygon points="23,-19 33,-19 36,-11 23,-11"
                             fill="rgba(180,230,255,0.6)"
                             stroke="rgba(120,180,220,0.5)" strokeWidth={0.5}/>
                    {/* wheels */}
                    <circle cx={-16} cy={10} r={5} fill="var(--ink)"/>
                    <circle cx={28}  cy={10} r={5} fill="var(--ink)"/>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide22Load() {
  const C = 10, dL1 = 4, dL2 = 3, dB1 = 5;
  const q0 = dL1 + dL2; // 7 — departure load (sum of linehaul demands)

  const cb = 250, ct = 30; // chartBottom, chartTop
  const toY = (v) => cb - (v / C) * (cb - ct);

  const stops = [85, 215, 345, 475, 615];
  const legs  = [q0, q0 - dL1, 0, dB1]; // load carried on each leg

  return (
    <section className="slide" data-label="Cargo profile">
      <SlideFrame>
        <div className="tag">Family · VRPB primer</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          Partial loads — each customer handles only their own demand.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, flex: 1 }}>

          {/* Left — key rules */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
            <div className="lede">
              The truck does not need to leave full, and no single customer unloads or loads the entire vehicle.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 23, lineHeight: 1.55 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--ink-3)", letterSpacing: "0.07em", marginBottom: 4 }}>DEPARTURE</div>
                <TeX>{"q_0 = \\sum_{i \\in L} d_i \\;\\leq\\; C"}</TeX>
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10, fontSize: 23, lineHeight: 1.55 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--accent-3)", letterSpacing: "0.07em", marginBottom: 4 }}>AT EACH LINEHAUL L_i</div>
                delivers <TeX>{"d_i"}</TeX> — load <TeX>{"- d_i"}</TeX>
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10, fontSize: 23, lineHeight: 1.55 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--accent-2)", letterSpacing: "0.07em", marginBottom: 4 }}>AT EACH BACKHAUL B_j</div>
                collects <TeX>{"d_j"}</TeX> — load <TeX>{"+ d_j"}</TeX>
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10, fontSize: 22, lineHeight: 1.55, color: "var(--ink-2)" }}>
                At every leg: load <TeX>{"\\leq C"}</TeX>
              </div>
            </div>

            <div className="body small" style={{ color: "var(--ink-3)" }}>
              The previous slide showed the degenerate case (1 L + 1 B) where the loads happened to fill and empty the truck exactly. The chart on the right shows the general picture with 2 L and 1 B.
            </div>
          </div>

          {/* Right — step chart */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 24px", display: "flex", flexDirection: "column" }}>
            <svg viewBox="0 0 700 300" style={{ width: "100%", flex: 1, display: "block" }}>

              {/* C reference line */}
              <line x1={55} y1={toY(C)} x2={650} y2={toY(C)}
                    stroke="var(--ink-3)" strokeWidth={1.5} strokeDasharray="5 4"/>
              <text x={50} y={toY(C) + 5} textAnchor="end"
                    fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">C=10</text>

              {/* Filled areas under each non-zero leg */}
              {legs.map((load, i) => {
                if (load === 0) return null;
                const color = i < 2 ? "var(--accent-3)" : "var(--accent-2)";
                return (
                  <rect key={i} x={stops[i]} y={toY(load)}
                        width={stops[i+1] - stops[i]} height={cb - toY(load)}
                        fill={color} opacity={0.18}/>
                );
              })}

              {/* Horizontal step lines */}
              {legs.map((load, i) => {
                const y = load === 0 ? cb : toY(load);
                const color = i < 2 ? "var(--accent-3)" : i === 3 ? "var(--accent-2)" : "var(--ink-3)";
                return (
                  <line key={i} x1={stops[i]} y1={y} x2={stops[i+1]} y2={y}
                        stroke={color}
                        strokeWidth={load === 0 ? 1.5 : 3}
                        strokeDasharray={load === 0 ? "4 3" : undefined}/>
                );
              })}

              {/* Vertical connectors at interior stops */}
              <line x1={stops[1]} y1={toY(legs[0])} x2={stops[1]} y2={toY(legs[1])}
                    stroke="var(--accent-3)" strokeWidth={2.5}/>
              <line x1={stops[2]} y1={toY(legs[1])} x2={stops[2]} y2={cb}
                    stroke="var(--accent-3)" strokeWidth={2.5}/>
              <line x1={stops[3]} y1={cb} x2={stops[3]} y2={toY(legs[3])}
                    stroke="var(--accent-2)" strokeWidth={2.5}/>

              {/* Delta labels */}
              <text x={stops[1] + 8} y={(toY(legs[0]) + toY(legs[1])) / 2 + 5}
                    fontFamily="var(--font-mono)" fontSize={15} fill="var(--accent-3)" fontWeight={700}>
                {"↓ " + dL1}
              </text>
              <text x={stops[2] + 8} y={(toY(legs[1]) + cb) / 2 + 5}
                    fontFamily="var(--font-mono)" fontSize={15} fill="var(--accent-3)" fontWeight={700}>
                {"↓ " + dL2}
              </text>
              <text x={stops[3] + 8} y={(cb + toY(legs[3])) / 2 + 5}
                    fontFamily="var(--font-mono)" fontSize={15} fill="var(--accent-2)" fontWeight={700}>
                {"↑ " + dB1}
              </text>

              {/* Load value on each leg */}
              {legs.map((load, i) => {
                const mx = (stops[i] + stops[i+1]) / 2;
                const y  = load === 0 ? cb - 10 : toY(load) - 10;
                const color = i < 2 ? "var(--accent-3)" : i === 3 ? "var(--accent-2)" : "var(--ink-3)";
                return (
                  <text key={i} x={mx} y={y} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={18} fill={color}
                        fontWeight={load === 0 ? 400 : 700}>
                    {load}
                  </text>
                );
              })}

              {/* q₀ < C annotation above first leg */}
              <text x={(stops[0] + stops[1]) / 2} y={toY(legs[0]) - 26}
                    textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)">
                {"q₀ = " + q0 + " < C"}
              </text>

              {/* X axis */}
              <line x1={55} y1={cb} x2={650} y2={cb} stroke="var(--ink-3)" strokeWidth={1.5}/>

              {/* Stop labels */}
              {["Depot", "L₁", "L₂", "B₁", "Depot"].map((lbl, i) => (
                <g key={i}>
                  <line x1={stops[i]} y1={cb} x2={stops[i]} y2={cb + 6}
                        stroke="var(--ink-3)" strokeWidth={1.5}/>
                  <text x={stops[i]} y={cb + 22} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={16}
                        fill={i === 0 || i === 4 ? "var(--ink)" : i < 3 ? "var(--accent-3)" : "var(--accent-2)"}>
                    {lbl}
                  </text>
                </g>
              ))}

              {/* Y axis */}
              <line x1={55} y1={ct - 10} x2={55} y2={cb} stroke="var(--ink-3)" strokeWidth={1.5}/>
              <text x={50} y={cb + 5} textAnchor="end"
                    fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">0</text>
            </svg>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-3)", textAlign: "center", marginTop: 8 }}>
              {"Example: C = 10 · dₗ₁ = " + dL1 + " · dₗ₂ = " + dL2 + " · dᴮ₁ = " + dB1}
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
              The customer set splits into two disjoint groups — linehauls <TeX>{"L"}</TeX> and backhauls <TeX>{"B"}</TeX> (see the previous slide). VRPB now adds a precedence constraint on every mixed route.
            </div>

            {/* Precedence rule — the heart of VRPB */}
            <div style={{ fontSize: 26, background: "var(--paper-2)", border: "1px solid var(--line)", borderLeft: "4px solid var(--accent)", padding: "18px 22px", lineHeight: 1.45 }}>
              <strong>VRPB rule:</strong> on any mixed route, every customer in <TeX>{"L"}</TeX> is served <em>before</em> any customer in <TeX>{"B"}</TeX>.
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
  Slide19, Slide20, Slide21, Slide22Intro, Slide22Load, Slide22, Slide23,
});
