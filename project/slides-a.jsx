/* =========================================================================
   VRP Seminar — Slides part A (1-15): Intro, Foundations, CVRP
   ========================================================================= */

// Precomputed example instance (shared across slides)
const EX_NODES = (() => {
  const depot = { x: 420, y: 300, id: 0 };
  const custs = [
    { x: 220, y: 170, demand: 4 }, { x: 330, y: 110, demand: 3 },
    { x: 540, y: 110, demand: 2 }, { x: 680, y: 180, demand: 5 },
    { x: 730, y: 330, demand: 3 }, { x: 640, y: 470, demand: 4 },
    { x: 460, y: 510, demand: 2 }, { x: 240, y: 480, demand: 3 },
    { x: 140, y: 350, demand: 4 }, { x: 290, y: 260, demand: 2 },
    { x: 570, y: 260, demand: 3 }, { x: 520, y: 420, demand: 2 },
  ];
  return [depot, ...custs.map((c, i) => ({ ...c, id: i + 1 }))];
})();

const EX_ROUTES = [
  [9, 1, 2, 10],       // route 1
  [3, 4, 5, 11],       // route 2
  [6, 7, 12],          // route 3
  [8],                 // route 4 (single)
];

// ----- SLIDE 1 — Cover -----
function Slide01() {
  return (
    <section className="slide" data-label="Title">
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 70, marginTop: 20 }}>
        <div style={{ flex: 1.1 }}>
          <div className="kicker" style={{ marginBottom: 18, fontSize: 24 }}>A seminar on</div>
          <h1 className="hero" style={{ fontSize: 140, lineHeight: 0.95 }}>
            Vehicle<br/>Routing<br/><em style={{ fontStyle: "italic", color: "var(--accent)" }}>Problems.</em>
          </h1>
          <div style={{ marginTop: 26, fontSize: 26, color: "var(--ink-2)", maxWidth: 820, lineHeight: 1.3 }}>
            Foundations, graph model, complexity, and the VRP family — with a live Clarke-Wright demo.
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            <div className="kicker" style={{ fontSize: 24, marginBottom: 8 }}>Speaker</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1, color: "var(--ink)" }}>
              Francesco Ventura
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, letterSpacing: "0.06em", color: "var(--ink-3)", marginTop: 8, textTransform: "uppercase" }}>
              41<sup style={{ fontSize: 18 }}>st</sup> cycle · ABRO PhD Program
            </div>
          </div>
        </div>

        <div style={{ flex: 1, height: 560, background: "var(--paper-2)", border: "1px solid var(--line)", position: "relative" }}>
          <VRPGraph
            nodes={EX_NODES}
            routes={EX_ROUTES}
            width={840}
            height={560}
            strokeWidth={3.6}
            nodeRadius={10}
            depotRadius={14}
          />
        </div>
      </div>

      <div style={{ marginTop: 16, marginBottom: 10, display: "flex", justifyContent: "flex-start", alignItems: "flex-end", fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--ink-3)" }}>
        <div>Based on P. Toth & D. Vigo — <em>The Vehicle Routing Problem</em>, SIAM (2002).</div>
      </div>
    </section>
  );
}

// ----- SLIDE 2 — A problem you meet every day -----
function Slide02() {
  const Icon = ({ name, size = 56 }) => {
    const s = size;
    const stroke = "var(--ink)";
    const props = { width: s, height: s, viewBox: "0 0 64 64", fill: "none", stroke, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
    switch (name) {
      case "parcel": return (
        <svg {...props}>
          <path d="M10 22 L32 12 L54 22 L32 32 Z"/>
          <path d="M10 22 V44 L32 54 V32"/>
          <path d="M54 22 V44 L32 54"/>
          <path d="M21 17 L43 27" strokeDasharray="2 2"/>
        </svg>
      );
      case "waste": return (
        <svg {...props}>
          <rect x="14" y="20" width="28" height="30" rx="2"/>
          <path d="M12 18 H44"/>
          <path d="M22 14 H34 V18"/>
          <path d="M22 26 V44 M28 26 V44 M34 26 V44"/>
          <circle cx="50" cy="48" r="4"/>
        </svg>
      );
      case "schoolbus": return (
        <svg {...props}>
          <path d="M8 24 H48 V44 H8 Z"/>
          <path d="M48 30 H56 L58 38 V44 H48"/>
          <circle cx="18" cy="48" r="4"/>
          <circle cx="46" cy="48" r="4"/>
          <rect x="12" y="28" width="8" height="8"/>
          <rect x="24" y="28" width="8" height="8"/>
          <rect x="36" y="28" width="8" height="8"/>
        </svg>
      );
      case "dialaride": return (
        <svg {...props}>
          <circle cx="24" cy="18" r="5"/>
          <path d="M16 44 V32 a8 8 0 0 1 16 0 V44"/>
          <path d="M36 40 L48 40 L52 32 M40 44 a4 4 0 1 0 0 -0.01 M48 44 a4 4 0 1 0 0 -0.01"/>
        </svg>
      );
      case "field": return (
        <svg {...props}>
          <path d="M16 44 L16 30 a6 6 0 0 1 6 -6 H42 a6 6 0 0 1 6 6 V44"/>
          <path d="M12 44 H52"/>
          <path d="M24 44 V50 M40 44 V50"/>
          <path d="M28 24 L30 18 L34 18 L36 24"/>
          <rect x="22" y="32" width="8" height="6"/>
          <rect x="34" y="32" width="8" height="6"/>
        </svg>
      );
      case "food": return (
        <svg {...props}>
          <path d="M10 44 a22 14 0 0 1 44 0 Z"/>
          <path d="M10 48 H54"/>
          <path d="M32 22 V14 M28 18 H36"/>
          <path d="M20 30 L44 30" strokeDasharray="2 3"/>
        </svg>
      );
      case "store": return (
        <svg {...props}>
          <path d="M10 24 L14 14 H50 L54 24"/>
          <path d="M12 24 V50 H52 V24"/>
          <path d="M22 50 V36 H42 V50"/>
          <path d="M10 24 H54"/>
          <path d="M18 24 V30 M26 24 V30 M34 24 V30 M42 24 V30"/>
        </svg>
      );
      case "maintenance": return (
        <svg {...props}>
          <path d="M20 44 L20 18 M44 44 L44 18"/>
          <path d="M20 18 L44 18"/>
          <path d="M8 44 H56"/>
          <path d="M20 26 L32 32 L44 26"/>
          <path d="M20 34 L32 40 L44 34"/>
          <circle cx="32" cy="50" r="2"/>
        </svg>
      );
      default: return null;
    }
  };

  const examples = [
    { k: "Parcel delivery", v: "Last-mile distribution of packages to homes and businesses", icon: "parcel" },
    { k: "Waste collection", v: "Urban garbage trucks covering every street of a district", icon: "waste" },
    { k: "School bus routing", v: "Picking up students along the way to school", icon: "schoolbus" },
    { k: "Dial-a-ride", v: "On-demand transport for elderly or disabled citizens", icon: "dialaride" },
    { k: "Field service", v: "Technicians visiting clients for installs or repairs", icon: "field" },
    { k: "Food distribution", v: "Meals or groceries delivered to homes or restaurants", icon: "food" },
    { k: "Store replenishment", v: "Restocking retail outlets from central warehouses", icon: "store" },
    { k: "Maintenance patrols", v: "Utility, telecom or road-inspection circuits", icon: "maintenance" },
  ];
  return (
    <section className="slide" data-label="A problem you meet every day">
      <SlideFrame>
        <div className="tag">Introduction · Motivation</div>
        <h2 className="title" style={{ marginTop: 16, maxWidth: 1400 }}>
          Every time a vehicle leaves a depot to serve multiple customers, someone is solving a VRP.
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line)", flex: 1 }}>
          {examples.map((ex, i) => (
            <div key={i} style={{
              padding: "36px 32px",
              borderRight: (i % 4 !== 3) ? "1px solid var(--line)" : "none",
              borderBottom: i < 4 ? "1px solid var(--line)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{
                  width: 84, height: 84,
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon name={ex.icon} size={52}/>
                </div>
                <div className="kicker" style={{ fontSize: 26, lineHeight: 1.25 }}>{ex.k}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1.18, color: "var(--ink)" }}>
                {ex.v}
              </div>
            </div>
          ))}
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 3 — Why it matters: the economic stakes -----
function Slide03() {
  // Bar chart: breakdown of the cost of goods (illustrative averages across sectors)
  const costBreakdown = [
    { label: "Raw materials & production", pct: 58, color: "var(--ink-2)" },
    { label: "Transportation & distribution", pct: 15, color: "var(--accent)" },
    { label: "Storage & warehousing", pct: 9,  color: "var(--ink-3)" },
    { label: "Sales, marketing, overhead", pct: 18, color: "var(--ink-3)" },
  ];

  return (
    <section className="slide" data-label="Why it matters · Economic stakes">
      <SlideFrame>
        <div className="tag">Introduction · Motivation</div>
        <h2 className="title" style={{ marginTop: 24, maxWidth: 1600 }}>
          Why does solving VRPs well matter? <em style={{ color: "var(--accent)" }}>Because transportation is expensive.</em>
        </h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 70, flex: 1, minHeight: 0 }}>
          {/* LEFT — the argument, in three facts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div className="lede" style={{ fontSize: 32, lineHeight: 1.32, color: "var(--ink-2)", maxWidth: 900 }}>
              Moving goods from a depot to the customer is never free.
              In most industries it is <em>the single largest cost item after production itself</em>.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { v: "≈10%", k: "of world GDP", s: "Global spending on logistics & freight transportation." },
                { v: "5–20%", k: "of product price", s: "Distribution alone — higher in food, parcel, bulk fuel." },
                { v: "5–30%", k: "potential savings", s: "Typical reduction when routes are optimised vs. planned by hand." },
              ].map((r, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: 28,
                  alignItems: "center",
                  paddingBottom: 16,
                  borderBottom: i < 2 ? "1px solid var(--line)" : "none",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 64,
                    lineHeight: 1,
                    color: "var(--accent)",
                    fontWeight: 400,
                  }}>{r.v}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-3)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 10 }}>{r.k}</div>
                    <div style={{ fontSize: 24, color: "var(--ink-2)", lineHeight: 1.35 }}>{r.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — visualization: the product cost pie + "lever" stat */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {/* Horizontal stacked bar */}
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "26px 30px", display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="kicker" style={{ fontSize: 24 }}>Where does the price of a product go?</div>

              {/* stacked bar */}
              <div style={{ display: "flex", height: 54, border: "1px solid var(--ink)", overflow: "hidden" }}>
                {costBreakdown.map((c, i) => (
                  <div key={i} title={`${c.label} — ${c.pct}%`}
                    style={{
                      width: `${c.pct}%`,
                      background: c.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: i === 1 ? "var(--paper)" : "var(--paper)",
                      fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 600,
                      borderRight: i < costBreakdown.length - 1 ? "1px solid rgba(255,255,255,0.25)" : "none",
                    }}>
                    {c.pct}%
                  </div>
                ))}
              </div>

              {/* legend */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 20, rowGap: 10 }}>
                {costBreakdown.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 22, color: "var(--ink-2)" }}>
                    <span style={{ display: "inline-block", width: 14, height: 14, background: c.color, border: "1px solid var(--ink)" }}/>
                    <span style={{ fontFamily: i === 1 ? "var(--font-body)" : "var(--font-body)", fontWeight: i === 1 ? 600 : 400, color: i === 1 ? "var(--ink)" : "var(--ink-2)" }}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 20, color: "var(--ink-3)", fontStyle: "italic", lineHeight: 1.4 }}>
                Illustrative split averaged across sectors. Distribution alone is typically 10–20%.
              </div>
            </div>

            {/* Leverage stat */}
            <div style={{
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "28px 32px",
              display: "flex", flexDirection: "column", gap: 10,
              flex: 1,
            }}>
              <div className="kicker" style={{ fontSize: 22, color: "var(--paper-2)" }}>The lever</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1.15 }}>
                A <span style={{ color: "var(--accent-2)" }}>1%</span> cut on a{" "}
                <span style={{ color: "var(--accent-2)" }}>$1 B</span> logistics budget{" "}
                = <span style={{ color: "var(--accent-2)" }}>$10 M / year</span>.
              </div>
              <div style={{ fontSize: 22, color: "#d9d3c3", lineHeight: 1.4, marginTop: 4 }}>
                At industrial scale, even marginal improvements in routing algorithms pay off enormously — which is why logistics giants still invest in optimization research sixty years after Dantzig & Ramser.
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-3)", letterSpacing: "0.04em" }}>
          SOURCE · Toth & Vigo (2002), Preface · industry surveys (Armstrong & Assoc., World Bank).
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 4 — Dantzig & Ramser, 1959 -----
function Slide04() {
  return (
    <section className="slide" data-label="Dantzig & Ramser 1959">
      <SlideFrame>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 100, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="tag">Origins</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 260, lineHeight: 0.85, letterSpacing: "-0.03em", marginTop: 24 }}>
              <span style={{ color: "var(--accent)" }}>1959</span>
            </div>
            <div className="lede" style={{ marginTop: 40, maxWidth: 720 }}>
              Dantzig and Ramser introduce <em>The Truck Dispatching Problem</em> — the first mathematical formulation of a VRP.
            </div>
            <div className="body small" style={{ marginTop: 28, color: "var(--ink-3)", maxWidth: 720 }}>
              The setting: delivering gasoline from a bulk terminal to service stations. The paper proposed a linear-programming-based approach; a few years later Clarke & Wright (1964) gave the first effective heuristic.
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 40, display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="kicker">Timeline</div>
            {[
              ["1954", "Dantzig–Fulkerson–Johnson solve a 49-city TSP"],
              ["1959", "Dantzig & Ramser: Truck Dispatching Problem"],
              ["1964", "Clarke & Wright: savings heuristic"],
              ["1981", "Christofides–Mingozzi–Toth: first exact B&B"],
              ["1994", "Augerat: branch-and-cut for CVRP"],
              ["2002", "Toth & Vigo (eds.) — the canonical survey"],
              ["today", "Real-time, dynamic, stochastic VRPs"],
            ].map(([y, t], i) => (
              <div key={i} style={{ display: "flex", gap: 24, alignItems: "baseline", borderBottom: i < 6 ? "1px solid var(--line)" : "none", paddingBottom: 14 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 34, color: "var(--accent)", width: 80 }}>{y}</div>
                <div style={{ fontSize: 34, color: "var(--ink-2)", lineHeight: 1.3 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 5 — Section I -----
function Slide05() {
  return (
    <section className="slide section-slide" data-label="Part II — Graph Theory">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part II of IX</div>
        <div>Slides 9 — 16</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Two</div>
        <div className="hero" style={{ fontSize: 240 }}>Graph Theory</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          Vertices, edges, arcs, simple graphs, digraphs and networks — the mathematical language every VRP model is written in.
        </div>
      </div>
    </section>
  );
}

// ----- SECTION HEADER — Part III: VRP elements -----
function SlideVRPElementsSection() {
  return (
    <section className="slide section-slide" data-label="Part III — VRP elements">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part III of IX</div>
        <div>Slides 18 — 20</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Three</div>
        <div className="hero" style={{ fontSize: 240 }}>VRP elements</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          The ingredients of every routing problem — road graph, customers, depot, vehicles — and the TSP as their common ancestor.
        </div>
      </div>
    </section>
  );
}

// ----- SLIDE 6 — Anatomy -----
function Slide06() {
  const ic = { fill: "none", stroke: "var(--accent)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const parts = [
    {
      k: "Road network", d: "Graph of streets & junctions; arcs carry cost and travel time.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} {...ic}>
          <circle cx={10} cy={10} r={5}/><circle cx={38} cy={10} r={5}/><circle cx={24} cy={40} r={5}/>
          <line x1={15} y1={10} x2={33} y2={10}/>
          <line x1={12} y1={14} x2={22} y2={36}/>
          <line x1={36} y1={14} x2={26} y2={36}/>
        </svg>
      ),
    },
    {
      k: "Customers", d: "Located at vertices; have demand, service time, possible time windows.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} {...ic}>
          <path d="M24 44 C24 44 8 30 8 18 C8 10.3 15.2 4 24 4 C32.8 4 40 10.3 40 18 C40 30 24 44 24 44Z"/>
          <circle cx={24} cy={18} r={6}/>
        </svg>
      ),
    },
    {
      k: "Depots", d: "Origin/destination of routes; hold the vehicle fleet.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} {...ic}>
          <path d="M4 22 L24 6 L44 22"/>
          <rect x={8} y={22} width={32} height={20} rx={1}/>
          <rect x={19} y={30} width={10} height={12}/>
        </svg>
      ),
    },
    {
      k: "Vehicles", d: "Capacity, costs, allowed arcs. Homogeneous or heterogeneous fleet.",
      icon: (
        <svg viewBox="0 0 52 48" width={56} height={52} {...ic}>
          <rect x={2} y={12} width={26} height={22} rx={2}/>
          <path d="M28 16 L28 34 L48 34 L48 24 L40 16 Z"/>
          <circle cx={10} cy={38} r={4}/><circle cx={38} cy={38} r={4}/>
          <line x1={14} y1={34} x2={34} y2={34}/>
          <line x1={28} y1={24} x2={48} y2={24}/>
        </svg>
      ),
    },
    {
      k: "Drivers", d: "Working hours, breaks — usually absorbed into vehicle constraints.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx={24} cy={9} r={6}/>
          {/* Shoulders */}
          <path d="M10 24 Q10 17 24 17 Q38 17 38 24"/>
          {/* Steering wheel rim */}
          <circle cx={24} cy={36} r={10}/>
          {/* Hub */}
          <circle cx={24} cy={36} r={2.5} fill="var(--accent)"/>
          {/* 3 spokes */}
          <line x1={24} y1={26} x2={24} y2={33.5}/>
          <line x1={15.3} y1={41} x2={21.3} y2={37.2}/>
          <line x1={32.7} y1={41} x2={26.7} y2={37.2}/>
        </svg>
      ),
    },
    {
      k: "Objective", d: "Minimise total cost, number of vehicles, or a weighted combination.",
      icon: (
        <svg viewBox="0 0 48 48" width={52} height={52} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer frame */}
          <rect x={3} y={3} width={42} height={42} rx={3} stroke="var(--accent)" strokeWidth={1.5}/>
          {/* "min" label */}
          <text x={24} y={18} textAnchor="middle" fontSize={11} fontFamily="monospace" fill="var(--accent)" letterSpacing="1.5">min</text>
          {/* Separator */}
          <line x1={7} y1={22} x2={41} y2={22} stroke="var(--accent)" strokeWidth={1}/>
          {/* Dollar sign */}
          <text x={13} y={39} textAnchor="middle" fontSize={15} fontFamily="serif" fill="var(--accent)">$</text>
          {/* Clock */}
          <circle cx={24} cy={34} r={5} stroke="var(--accent)" strokeWidth={1.5}/>
          <line x1={24} y1={30} x2={24} y2={34} stroke="var(--accent)" strokeWidth={1.5}/>
          <line x1={24} y1={34} x2={27} y2={34} stroke="var(--accent)" strokeWidth={1.5}/>
          {/* Mini truck */}
          <rect x={33} y={30} width={10} height={7} rx={1} stroke="var(--accent)" strokeWidth={1.5}/>
          <circle cx={35} cy={38.5} r={2} stroke="var(--accent)" strokeWidth={1.5}/>
          <circle cx={41} cy={38.5} r={2} stroke="var(--accent)" strokeWidth={1.5}/>
        </svg>
      ),
    },
  ];
  return (
    <section className="slide" data-label="Anatomy of a routing problem">
      <SlideFrame>
        <div className="tag">VRP elements</div>
        <h2 className="title" style={{ marginTop: 28 }}>The anatomy of a routing problem.</h2>
        <div className="body" style={{ marginTop: 28, color: "var(--ink-3)", maxWidth: 1300 }}>
          Every VRP instance is built from the same six components. Different variants just tune which constraints apply to each.
        </div>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {parts.map((p, i) => (
            <div key={i} style={{
              padding: "28px 32px 32px", minHeight: 250,
              borderRight: (i % 3 !== 2) ? "1px solid var(--line)" : "none",
              borderBottom: i < 3 ? "1px solid var(--line)" : "none",
              background: "var(--paper-2)",
            }}>
              {p.icon}
              <div className="kicker" style={{ fontSize: 22, color: "var(--accent)", marginTop: 12 }}>0{i+1}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 38, marginTop: 6, lineHeight: 1 }}>{p.k}</div>
              <div className="body small" style={{ marginTop: 12, color: "var(--ink-3)" }}>{p.d}</div>
            </div>
          ))}
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 7 — Road as a graph (button-triggered animation) -----
function Slide07() {
  const [phase, setPhase] = React.useState(0); // 0=road, 1=animating
  const [animKey, setAnimKey] = React.useState(0);
  const sectionRef = React.useRef(null);
  const btnRef = React.useRef(null);

  // Reset to static road view whenever the slide becomes active
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) { setPhase(0); setAnimKey(k => k + 1); }
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // Native click: React event delegation breaks after section is moved in the DOM
  React.useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const handler = () => { setPhase(1); setAnimKey(k => k + 1); };
    btn.addEventListener('click', handler);
    return () => btn.removeEventListener('click', handler);
  }, []);

  const roadNodes = [
    { x: 400, y: 170 },  // 0  C₁
    { x: 560, y: 115 },  // 1  junction
    { x: 730, y: 155 },  // 2  C₂
    { x: 900, y: 130 },  // 3  junction
    { x: 990, y: 265 },  // 4  C₃
    { x: 1060, y: 390 }, // 5  junction
    { x: 910, y: 480 },  // 6  C₄
    { x: 720, y: 520 },  // 7  junction
    { x: 535, y: 490 },  // 8  C₅
    { x: 360, y: 375 },  // 9  junction
    { x: 510, y: 285 },  // 10 junction
    { x: 740, y: 330 },  // 11 junction
  ];
  const roadEdges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],
    [0,10],[1,10],[2,11],[4,11],[5,11],[7,11],[10,11],[10,8],[11,6],
  ];
  const customers  = [0, 2, 4, 6, 8];
  const custLabels = ["C₁","C₂","C₃","C₄","C₅"];
  const hlEdgeSet  = new Set(["0-1","1-2"]); // path C₁ → junction → C₂

  // Timing for phase-1 animation (ms)
  const DUR        = 12000;
  const T_DRAW1    = 800;   // C₁→junc arc turns blue
  const T_DRAW2    = 2000;  // junc→C₂ arc turns blue (after first finishes)
  const T_CALLOUT  = 3400;  // callout "shortest path C₁→C₂" appears
  const T_REPLACE1 = 4800;  // path arcs replaced by direct C₁→C₂ edge; cost label appears
  const T_COLLAPSE = 6500;  // rest of road collapses; all remaining complete-graph edges draw in
  const T_GONE     = 8800;  // everything road-related fully gone

  const pD1    = (T_DRAW1/DUR*100).toFixed(1),       pD1e   = ((T_DRAW1+900)/DUR*100).toFixed(1);
  const pD2    = (T_DRAW2/DUR*100).toFixed(1),       pD2e   = ((T_DRAW2+900)/DUR*100).toFixed(1);
  const pCout  = (T_CALLOUT/DUR*100).toFixed(1),     pCoute = ((T_CALLOUT+700)/DUR*100).toFixed(1);
  const pRepl  = (T_REPLACE1/DUR*100).toFixed(1),    pReple = ((T_REPLACE1+900)/DUR*100).toFixed(1);
  const pColl  = (T_COLLAPSE/DUR*100).toFixed(1),    pGone  = (T_GONE/DUR*100).toFixed(1);
  const pCostEnd = ((T_REPLACE1+1200)/DUR*100).toFixed(1);
  const pLbl2End = ((T_GONE+1400)/DUR*100).toFixed(1);

  // Highlighted path segment lengths
  const seg01 = Math.hypot(roadNodes[1].x-roadNodes[0].x, roadNodes[1].y-roadNodes[0].y);
  const seg12 = Math.hypot(roadNodes[2].x-roadNodes[1].x, roadNodes[2].y-roadNodes[1].y);

  return (
    <section ref={sectionRef} className="slide" data-label="The road as a graph">
      <style>{`
        /* Rest of road: fades at T_COLLAPSE */
        @keyframes s07-road      { 0%,${pColl}%{opacity:.32} ${pGone}%,100%{opacity:0} }
        /* Path edges base: fades earlier at T_REPLACE1 */
        @keyframes s07-road-path { 0%,${pRepl}%{opacity:.32} ${pReple}%,100%{opacity:0} }
        /* Other junctions: fade at T_COLLAPSE */
        @keyframes s07-junc      { 0%{opacity:.6} ${pColl}%{opacity:.6} ${pGone}%,100%{opacity:0} }
        /* Path junction (node 1): fades at T_REPLACE1 */
        @keyframes s07-junc-path { 0%{opacity:.6} ${pRepl}%{opacity:.6} ${pReple}%,100%{opacity:0} }
        /* ROAD NETWORK label: fades at T_COLLAPSE */
        @keyframes s07-rl        { 0%,${pColl}%{opacity:1} ${pGone}%,100%{opacity:0} }
        /* Highlighted path arcs: draw then fade at T_REPLACE1 */
        @keyframes s07-hlp1      { 0%,${pD1}%{stroke-dashoffset:var(--len);opacity:1} ${pD1e}%,${pRepl}%{stroke-dashoffset:0;opacity:1} ${pReple}%,100%{stroke-dashoffset:0;opacity:0} }
        @keyframes s07-hlp2      { 0%,${pD2}%{stroke-dashoffset:var(--len);opacity:1} ${pD2e}%,${pRepl}%{stroke-dashoffset:0;opacity:1} ${pReple}%,100%{stroke-dashoffset:0;opacity:0} }
        /* Callout: appears at T_CALLOUT, fades at T_REPLACE1 */
        @keyframes s07-callout   { 0%,${pCout}%{opacity:0;transform:translateY(6px)} ${pCoute}%,${pRepl}%{opacity:1;transform:translateY(0)} ${pReple}%,100%{opacity:0;transform:translateY(0)} }
        /* COMPLETE GRAPH label: fades in after road is gone */
        @keyframes s07-lbl2      { 0%,${pGone}%{opacity:0;transform:translateY(8px)} ${pLbl2End}%,100%{opacity:1;transform:translateY(0)} }
      `}</style>
      <SlideFrame>
        <div className="tag">VRP elements</div>
        <h2 className="title" style={{ marginTop: 20 }}>From the road network to a complete graph.</h2>
        <div className="body" style={{ marginTop: 14, color: "var(--ink-3)", maxWidth: 1500, fontSize: 28 }}>
          Roads are sparse — you can't drive directly between any two customers. VRP needs the travel cost for <em>every</em> pair.
          A shortest-path computation collapses the network: junctions disappear and only customers remain, connected by a <em>complete graph</em> whose edge weights are the minimum road distances.
        </div>

        <div style={{ marginTop: 20, flex: 1, position: "relative", background: "var(--paper-2)", border: "1px solid var(--line)", padding: 20 }}>
          {/* Always in DOM so btnRef stays stable; hidden once animation starts */}
          <button ref={btnRef} style={{
            position: "absolute", top: 20, right: 20, zIndex: 10,
            background: "var(--accent)", color: "#fff",
            border: "none", borderRadius: 8, padding: "12px 28px",
            fontFamily: "var(--font-mono)", fontSize: 18, letterSpacing: "0.06em",
            cursor: "pointer", textTransform: "uppercase",
            visibility: phase === 0 ? "visible" : "hidden"
          }}>Network collapsing →</button>

          <svg viewBox="0 0 1400 540" style={{ width: "100%", height: "100%", display: "block" }}>
            <defs>
              <pattern id="dotgrid-s07" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="var(--line)"/>
              </pattern>
            </defs>
            <rect width={1400} height={540} fill="url(#dotgrid-s07)" opacity={0.5}/>

            {phase === 0 ? (
              /* ── Static road network ── */
              <>
                <text x={30} y={32} fontFamily="var(--font-mono)" fontSize={18} letterSpacing="0.1em"
                      fill="var(--ink-3)">ROAD NETWORK</text>
                {roadEdges.map(([a,b], i) => (
                  <line key={i} x1={roadNodes[a].x} y1={roadNodes[a].y} x2={roadNodes[b].x} y2={roadNodes[b].y}
                        stroke="var(--ink-3)" strokeWidth={2} opacity={0.32}/>
                ))}
                {roadNodes.map((n, i) => customers.includes(i) ? null : (
                  <circle key={i} cx={n.x} cy={n.y} r={7} fill="var(--ink-3)" opacity={0.6}/>
                ))}
                {customers.map((ci, i) => (
                  <g key={i}>
                    <circle cx={roadNodes[ci].x} cy={roadNodes[ci].y} r={22}
                            fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                    <text x={roadNodes[ci].x} y={roadNodes[ci].y+7} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={16} fontWeight={600} fill="var(--ink)">{custLabels[i]}</text>
                  </g>
                ))}
              </>
            ) : (
              /* ── Animated collapse ── */
              <g key={animKey}>
                {/* "ROAD NETWORK" label fades out at full opacity */}
                <text x={30} y={32} fontFamily="var(--font-mono)" fontSize={18} letterSpacing="0.1em" fill="var(--ink-3)"
                      style={{ animation: `s07-rl ${DUR}ms both ease-in-out` }}>ROAD NETWORK</text>
                {/* "COMPLETE GRAPH" label fades in */}
                <text x={30} y={32} fontFamily="var(--font-mono)" fontSize={18} letterSpacing="0.1em" fill="var(--accent)"
                      style={{ animation: `s07-lbl2 ${DUR}ms both ease-in-out` }}>COMPLETE GRAPH  G = (V, E)</text>

                {/* Road edges: base layer fades at T_REPLACE1 for path, T_COLLAPSE for rest */}
                {roadEdges.map(([a,b], i) => {
                  const k = `${Math.min(a,b)}-${Math.max(a,b)}`;
                  const hl = hlEdgeSet.has(k);
                  const seg = k === "0-1" ? seg01 : k === "1-2" ? seg12 : null;
                  // Edges touching the path junction (node 1) must also fade at T_REPLACE1
                  const baseKf = (hl || a === 1 || b === 1) ? "s07-road-path" : "s07-road";
                  return (
                    <React.Fragment key={i}>
                      {/* Muted base — path edges fade at T_REPLACE1, others at T_COLLAPSE */}
                      <line x1={roadNodes[a].x} y1={roadNodes[a].y} x2={roadNodes[b].x} y2={roadNodes[b].y}
                            stroke="var(--ink-3)" strokeWidth={2}
                            style={{ animation: `${baseKf} ${DUR}ms both ease-in-out` }}/>
                      {/* Accent overlay — C₁→junc first (s07-hlp1), junc→C₂ second (s07-hlp2) */}
                      {hl && (
                        <line x1={roadNodes[a].x} y1={roadNodes[a].y} x2={roadNodes[b].x} y2={roadNodes[b].y}
                              stroke="var(--accent)" strokeWidth={5}
                              style={{ '--len': seg, strokeDasharray: seg, strokeDashoffset: seg,
                                       animation: `${k === "0-1" ? "s07-hlp1" : "s07-hlp2"} ${DUR}ms both ease-in-out` }}/>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Junction nodes — path junction (node 1) fades at T_REPLACE1, others at T_COLLAPSE */}
                {roadNodes.map((n, i) => customers.includes(i) ? null : (
                  <circle key={i} cx={n.x} cy={n.y} r={7} fill="var(--ink-3)"
                          style={{ animation: `${i === 1 ? "s07-junc-path" : "s07-junc"} ${DUR}ms both ease-in-out` }}/>
                ))}

                {/* Callout: appears at T_CALL, fades with road */}
                {(() => {
                  const mx = (roadNodes[0].x + roadNodes[2].x) / 2;
                  const my = roadNodes[1].y - 52;
                  return (
                    <g style={{ animation: `s07-callout ${DUR}ms both ease-in-out` }}>
                      <rect x={mx-160} y={my-20} width={320} height={58} rx={4}
                            fill="var(--paper)" stroke="var(--accent)" strokeWidth={1.5}/>
                      <text x={mx} y={my+6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--accent)">shortest path C₁ → C₂</text>
                      <text x={mx} y={my+26} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">via 1 junction  ·  cost = 5.2 km</text>
                    </g>
                  );
                })()}

                {/* Complete graph edges:
                     C₁→C₂ (ii=0,jj=0) draws at T_REPLACE1 — replaces the path arcs
                     All others draw at T_COLLAPSE + stagger — replace the rest of the road */}
                {customers.map((ci, ii) =>
                  customers.slice(ii+1).map((cj, jj) => {
                    const hlE = ii===0 && jj===0;
                    const len = Math.hypot(roadNodes[cj].x-roadNodes[ci].x, roadNodes[cj].y-roadNodes[ci].y);
                    const delay = hlE ? T_REPLACE1 : T_COLLAPSE + (ii*5+jj)*140;
                    return (
                      <line key={`e${ii}-${jj}`} x1={roadNodes[ci].x} y1={roadNodes[ci].y}
                            x2={roadNodes[cj].x} y2={roadNodes[cj].y}
                            stroke="var(--accent)" strokeWidth={hlE ? 3.5 : 1.5}
                            style={{ '--len': len, strokeDasharray: len, strokeDashoffset: len,
                                     opacity: hlE ? 1 : 0.35,
                                     animation: `drawPath 800ms both ease-out`,
                                     animationDelay: `${delay}ms` }}/>
                    );
                  })
                )}

                {/* Cost label on C₁–C₂ edge — appears with the direct edge at T_REPLACE1 */}
                {(() => {
                  const mx = (roadNodes[0].x + roadNodes[2].x) / 2;
                  const my = (roadNodes[0].y + roadNodes[2].y) / 2 - 32;
                  return (
                    <g style={{ opacity: 0, animation: `fadeUp 600ms both ease-out`,
                                animationDelay: `${T_REPLACE1 + 600}ms` }}>
                      <rect x={mx-72} y={my-16} width={144} height={34} rx={4}
                            fill="var(--paper)" stroke="var(--accent)" strokeWidth={1.5}/>
                      <text x={mx} y={my+7} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--accent)">c₁₂ = 5.2 km</text>
                    </g>
                  );
                })()}

                {/* Customer nodes — always visible */}
                {customers.map((ci, i) => (
                  <g key={i}>
                    <circle cx={roadNodes[ci].x} cy={roadNodes[ci].y} r={22}
                            fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                    <text x={roadNodes[ci].x} y={roadNodes[ci].y+7} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={16} fontWeight={600} fill="var(--ink)">{custLabels[i]}</text>
                  </g>
                ))}
              </g>
            )}

            {/* Legend */}
            <g transform="translate(30,516)">
              <circle cx={8} cy={-2} r={7} fill="var(--ink-3)" opacity={0.5}/>
              <text x={24} y={4} fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)">junction (disappears)</text>
              <circle cx={230} cy={-2} r={10} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
              <text x={250} y={4} fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)">customer (stays)</text>
            </g>
          </svg>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 8 — Graph definitions (formal) -----
function Slide08() {
  return (
    <section className="slide" data-label="Vertices and arcs">
      <SlideFrame>
        <div className="tag">VRP elements · Notation</div>
        <h2 className="title" style={{ marginTop: 28 }}>The basic graph-theoretic notation.</h2>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", alignContent: "center" }}>
            {[
              ["G = (V, A)", "directed complete graph (undirected: E)"],
              ["V = {0, 1, …, n}", "vertex 0 is the depot; 1…n are the customers"],
              ["cᵢⱼ ≥ 0", "travel cost on arc (i, j)"],
              ["dᵢ", "demand of customer i; d₀ = 0"],
              ["δ⁺(i), δ⁻(i)", "forward / backward star of vertex i"],
              ["cᵢⱼ = cⱼᵢ ?", "symmetric (SCVRP) vs asymmetric (ACVRP) cost matrix"],
              ["cᵢⱼ ≤ cᵢₖ + cₖⱼ", "triangle inequality — automatic when cᵢⱼ is a shortest path"],
            ].map(([k, v], i) => (
              <React.Fragment key={i}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink)", borderBottom: "1px solid var(--line)", paddingBottom: 9, paddingTop: i === 0 ? 0 : 9, paddingRight: 16 }}>{k}</div>
                <div style={{ fontSize: 21, color: "var(--ink-3)", borderBottom: "1px solid var(--line)", paddingBottom: 9, paddingTop: i === 0 ? 0 : 9, lineHeight: 1.25 }}>{v}</div>
              </React.Fragment>
            ))}
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24 }}>
            <VRPGraph
              nodes={EX_NODES.slice(0, 8)}
              routes={[]}
              showEdges
              edgeOpacity={0.45}
              showLabels
              width={800} height={560}
              nodeRadius={14}
              depotRadius={16}
              labelFontSize={15}
              viewBoxOverride="160 55 620 510"
            />
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SECTION HEADER — TSP -----
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

// ----- SLIDE 9 — TSP informal definition -----
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

// ----- SLIDE TSP — HAMILTONIAN CIRCUIT -----
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

// ----- SLIDE TSP — DEGREE CONSTRAINTS -----
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

// ----- SLIDE TSP — ILP FORMULATION -----
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

// ----- SLIDE TSP — SUBTOUR PROBLEM -----
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

// ----- SLIDE TSP — DFJ SUBTOUR ELIMINATION -----
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

// ----- SLIDE TSP — EXPONENTIAL BLOW-UP -----
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
              <TeX display>{String.raw`\#\{S \subsetneq V : 2 \leq |S| \leq n-1\} \;=\; 2^{n} - n - 2`}</TeX>
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 23, lineHeight: 1.35 }}>
              Already unmanageable at n ≈ 30. For realistic instances — hundreds of customers — the full model <em>cannot even be written down</em>, let alone passed to a solver.
            </div>
            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "18px 22px" }}>
              <div className="kicker" style={{ fontSize: 20, color: "var(--paper-deep)", marginBottom: 8 }}>How it is solved in practice</div>
              <div style={{ fontSize: 22, lineHeight: 1.4 }}>
                Subtour cuts are <em>never enumerated</em>: they are added <em>lazily</em> during branch-and-cut, triggered by a separation oracle only when the current fractional solution violates one.
              </div>
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

// ----- SLIDE 10 — TSP → VRP bridge -----
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

// ----- SLIDE 11 — Section II -----
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

// ----- SLIDE 12 — CVRP informal -----
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

// ----- SLIDE 13 — Three constraints -----
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

// ----- SLIDE 14 — Two-index formulation -----
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

// ----- SLIDE 15 — Capacity cut explained -----
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
  Slide01, Slide02, Slide03, Slide04, Slide05, SlideVRPElementsSection,
  Slide06, Slide07, Slide08, SlideTSPSection, Slide09,
  SlideTSPHamiltonian, SlideTSPDegree, SlideTSPFormulation, SlideTSPSubtourProblem, SlideTSPDFJ, SlideTSPExponential,
  Slide10,
  Slide11, Slide12, Slide13, Slide14, Slide15,
  EX_NODES, EX_ROUTES,
});
