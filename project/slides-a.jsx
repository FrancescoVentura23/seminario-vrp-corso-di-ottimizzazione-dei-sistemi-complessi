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
        <h2 className="title" style={{ marginTop: 32, maxWidth: 1400 }}>
          Every time a vehicle leaves a depot to serve multiple customers, someone is solving a VRP.
        </h2>

        <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {examples.map((ex, i) => (
            <div key={i} style={{
              padding: "28px 26px",
              borderRight: (i % 4 !== 3) ? "1px solid var(--line)" : "none",
              borderBottom: i < 4 ? "1px solid var(--line)" : "none",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 64, height: 64,
                  background: "var(--paper-2)",
                  border: "1px solid var(--line)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon name={ex.icon} size={40}/>
                </div>
                <div className="kicker" style={{ fontSize: 22, lineHeight: 1.25 }}>{ex.k}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 30, lineHeight: 1.18, color: "var(--ink)" }}>
                {ex.v}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div className="body" style={{ maxWidth: 900, color: "var(--ink-3)" }}>
            The problem is universal because most goods and services are delivered through a hub-and-spoke pattern.
          </div>
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
            <div className="tag">01 · Origins</div>
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
    <section className="slide section-slide" data-label="Part II — Foundations">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part II of V</div>
        <div>Slides 9 — 17</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Two</div>
        <div className="hero" style={{ fontSize: 240 }}>Foundations.</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper-deep)" }}>
          The ingredients of every routing problem — road graph, customers, depot, vehicles — and the TSP as their common ancestor.
        </div>
      </div>
    </section>
  );
}

// ----- SLIDE 6 — Anatomy -----
function Slide06() {
  const parts = [
    { k: "Road network", d: "Graph of streets & junctions; arcs carry cost and travel time." },
    { k: "Customers", d: "Located at vertices; have demand, service time, possible time windows." },
    { k: "Depots", d: "Origin/destination of routes; hold the vehicle fleet." },
    { k: "Vehicles", d: "Capacity, costs, allowed arcs. Homogeneous or heterogeneous fleet." },
    { k: "Drivers", d: "Working hours, breaks — usually absorbed into vehicle constraints." },
    { k: "Objective", d: "Minimise total cost, number of vehicles, or a weighted combination." },
  ];
  return (
    <section className="slide" data-label="Anatomy of a routing problem">
      <SlideFrame>
        <div className="tag">02 · Foundations</div>
        <h2 className="title" style={{ marginTop: 28 }}>The anatomy of a routing problem.</h2>
        <div className="body" style={{ marginTop: 28, color: "var(--ink-3)", maxWidth: 1300 }}>
          Every VRP instance is built from the same six components. Different variants just tune which constraints apply to each.
        </div>

        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {parts.map((p, i) => (
            <div key={i} style={{
              padding: "36px 32px", minHeight: 240,
              borderRight: (i % 3 !== 2) ? "1px solid var(--line)" : "none",
              borderBottom: i < 3 ? "1px solid var(--line)" : "none",
              background: i === 0 ? "var(--paper-2)" : "transparent",
            }}>
              <div className="kicker" style={{ fontSize: 25, color: "var(--accent)" }}>0{i+1}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 42, marginTop: 10, lineHeight: 1 }}>{p.k}</div>
              <div className="body small" style={{ marginTop: 14, color: "var(--ink-3)" }}>{p.d}</div>
            </div>
          ))}
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 7 — Road as a graph -----
function Slide07() {
  // Sparse road graph (left) -> complete graph (right)
  const roadNodes = [
    { x:120, y:140 }, { x:260, y:90 },  { x:420, y:130 }, { x:560, y:110 },
    { x:640, y:240 }, { x:720, y:370 }, { x:580, y:450 }, { x:400, y:490 },
    { x:260, y:460 }, { x:120, y:340 }, { x:240, y:250 }, { x:450, y:300 },
  ];
  const roadEdges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],
    [0,10],[1,10],[2,11],[3,4],[4,11],[5,11],[7,11],[10,11],[10,8],[11,6],
  ];
  const customers = [0,2,4,6,8];

  return (
    <section className="slide" data-label="The road as a graph">
      <SlideFrame>
        <div className="tag">02 · Foundations</div>
        <h2 className="title" style={{ marginTop: 28 }}>From the road network to a complete graph.</h2>
        <div className="body" style={{ marginTop: 18, color: "var(--ink-3)", maxWidth: 1400 }}>
          The sparse road graph is preprocessed by shortest-path computation into a complete graph whose vertices are only depots and customers.
        </div>

        <div style={{ marginTop: 40, flex: 1, display: "grid", gridTemplateColumns: "1fr 140px 1fr", gap: 20 }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 20, display: "flex", flexDirection: "column" }}>
            <div className="kicker" style={{ marginBottom: 8 }}>Road network</div>
            <svg viewBox="0 0 820 580" style={{ flex: 1, width: "100%" }}>
              {roadEdges.map(([a,b], i) => (
                <line key={i} x1={roadNodes[a].x} y1={roadNodes[a].y} x2={roadNodes[b].x} y2={roadNodes[b].y}
                      stroke="var(--ink-3)" strokeWidth={2} opacity={0.5}/>
              ))}
              {roadNodes.map((n, i) => (
                <circle key={i} cx={n.x} cy={n.y} r={customers.includes(i) ? 11 : 5}
                        fill={customers.includes(i) ? "var(--paper)" : "var(--ink-3)"}
                        stroke={customers.includes(i) ? "var(--ink)" : "none"} strokeWidth={2} />
              ))}
              <text x={20} y={560} fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">sparse · junctions = small dots · customers = circles</text>
            </svg>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 40, color: "var(--accent)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, lineHeight: 1 }}>→</div>
              <div style={{ fontSize: 24, marginTop: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>shortest paths</div>
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 20, display: "flex", flexDirection: "column" }}>
            <div className="kicker" style={{ marginBottom: 8 }}>Complete graph G = (V, A)</div>
            <svg viewBox="0 0 820 580" style={{ flex: 1, width: "100%" }}>
              {customers.map((ci, i) =>
                customers.slice(i+1).map((cj, j) => (
                  <line key={`${i}-${j}`} x1={roadNodes[ci].x} y1={roadNodes[ci].y}
                        x2={roadNodes[cj].x} y2={roadNodes[cj].y}
                        stroke="var(--accent)" strokeWidth={1.8} opacity={0.45} />
                ))
              )}
              {customers.map((ci, i) => (
                <g key={i}>
                  {i === 0 ? (
                    <rect x={roadNodes[ci].x-12} y={roadNodes[ci].y-12} width={24} height={24} fill="var(--ink)"/>
                  ) : (
                    <circle cx={roadNodes[ci].x} cy={roadNodes[ci].y} r={12} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2} />
                  )}
                </g>
              ))}
              <text x={20} y={560} fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">complete · cost cᵢⱼ = shortest-path cost between i and j</text>
            </svg>
          </div>
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
        <div className="tag">02 · Foundations · Notation</div>
        <h2 className="title" style={{ marginTop: 28 }}>The basic graph-theoretic notation.</h2>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {[
              ["G = (V, A)", "directed complete graph (undirected: E)"],
              ["V = {0, 1, …, n}", "vertex 0 is the depot; 1…n are the customers"],
              ["cᵢⱼ ≥ 0", "travel cost on arc (i, j)"],
              ["dᵢ", "demand of customer i; d₀ = 0"],
              ["K identical vehicles", "each with capacity C"],
              ["δ⁺(i), δ⁻(i)", "forward / backward star of vertex i"],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", gap: 30, alignItems: "baseline", borderBottom: "1px solid var(--line)", paddingBottom: 16 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, color: "var(--ink)", minWidth: 280 }}>{k}</div>
                <div style={{ fontSize: 34, color: "var(--ink-3)" }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24 }}>
            <VRPGraph
              nodes={EX_NODES.slice(0, 8)}
              routes={[]}
              showEdges
              showLabels
              width={800} height={560}
              nodeRadius={14}
              depotRadius={16}
              labelFontSize={15}
            />
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}

// ----- SLIDE 9 — TSP definition -----
function Slide09() {
  // Single TSP tour through all customers
  const tspRoute = [1,2,3,4,10,5,6,11,7,8,9]; // indices into EX_NODES
  return (
    <section className="slide" data-label="The Traveling Salesman Problem">
      <SlideFrame>
        <div className="tag">02 · Foundations · TSP</div>
        <h2 className="title" style={{ marginTop: 28 }}>The Traveling Salesman Problem — one vehicle, one tour.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, flex: 1 }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 28 }}>
            <VRPGraph
              nodes={EX_NODES}
              routes={[tspRoute]}
              width={900} height={600}
              strokeWidth={4}
              nodeRadius={11}
              depotRadius={15}
              routeColors={["var(--ink)"]}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
            <div className="lede">
              Find the minimum-cost Hamiltonian circuit visiting every vertex exactly once.
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--ink-2)", lineHeight: 1.5, background: "var(--paper-2)", padding: "22px 26px", border: "1px solid var(--line)" }}>
              <div>TSP = VRP with</div>
              <div style={{ marginTop: 6, color: "var(--accent)" }}>K = 1 &nbsp;and&nbsp; C ≥ d(V)</div>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              Every VRP can be seen as a set of coupled TSPs, one per vehicle — subject to capacity, time, and precedence constraints.
            </div>
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
        <div className="tag">02 · Foundations</div>
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
    <section className="slide section-slide variant-violet" data-label="Part III — CVRP">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <div>Part III of V</div>
        <div>Slides 19 — 22</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ marginBottom: 40 }}>Part Three</div>
        <div className="hero" style={{ fontSize: 240 }}>The CVRP.</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15 }}>
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
        <div className="tag">03 · CVRP</div>
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
        <div className="tag">03 · CVRP</div>
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
        <div className="tag">03 · CVRP · Model VRP1</div>
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
        <div className="tag">03 · CVRP · Valid inequality</div>
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
  Slide01, Slide02, Slide03, Slide04, Slide05,
  Slide06, Slide07, Slide08, Slide09, Slide10,
  Slide11, Slide12, Slide13, Slide14, Slide15,
  EX_NODES, EX_ROUTES,
});
