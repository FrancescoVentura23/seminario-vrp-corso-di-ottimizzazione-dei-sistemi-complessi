/* =========================================================================
   VRP Seminar — Part I: Introduction
   Slides: section header, History, OR link, A problem you meet every day,
           Economic scale, Who uses VRP today
   ========================================================================= */

function SlideIntroSection() {
  return (
    <section className="slide section-slide" data-label="Part I — Introduction">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part I of IX</div>
        <div>Slides 3 — 7</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part One</div>
        <div className="hero" style={{ fontSize: 240 }}>Introduction</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          Where the VRP came from, who uses it today, and why it matters — the problem you meet every day and its economic scale.
        </div>
      </div>
    </section>
  );
}

// ==========================================================
// HISTORY — when the term was coined & why

function SlideHistory() {
  const timeline = [
    ["1954", "Dantzig, Fulkerson & Johnson solve a 49-city TSP."],
    ["1959", "Dantzig & Ramser publish “The Truck Dispatching Problem”.", true],
    ["1964", "Clarke & Wright introduce the savings heuristic."],
    ["1981", "Christofides, Mingozzi & Toth: first exact branch-and-bound."],
    ["1994", "Augerat et al.: branch-and-cut with capacity cuts."],
    ["2002", "Toth & Vigo edit the canonical SIAM monograph."],
  ];
  return (
    <section className="slide" data-label="History & origins">
      <SlideFrame>
        <div className="tag">Introduction · Origins</div>
        <h2 className="title" style={{ marginTop: 28, maxWidth: 1500 }}>
          The VRP was born in 1959, in a gasoline depot.
        </h2>

        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 80, flex: 1, minHeight: 0 }}>
          {/* Left — the why + image */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28, minHeight: 0 }}>
            <div className="lede" style={{ fontSize: 34, lineHeight: 1.35, maxWidth: 900 }}>
              <span style={{ color: "var(--accent)" }}>George Dantzig</span> and <span style={{ color: "var(--accent)" }}>John Ramser</span> published <em>The Truck Dispatching Problem</em> in <em>Management Science</em>, October 1959.
            </div>

            <div className="body" style={{ color: "var(--ink-2)", maxWidth: 900, fontSize: 26, lineHeight: 1.4 }}>
              The question was practical: how should a fleet of tanker trucks deliver gasoline from a bulk terminal to a scattered set of service stations, at minimum cost?
            </div>

            {/* Image — flex: 1 lets it take remaining height; objectFit contain shows it in full */}
            <img src="assets/George_Dantzig.jpg" alt="George Dantzig fun fact"
                 style={{ flex: 1, minHeight: 0, width: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}/>
          </div>

          {/* Right — timeline */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 32, display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="kicker" style={{ marginBottom: 6 }}>Timeline</div>
            {timeline.map(([y, t, hl], i) => (
              <div key={i} style={{
                display: "flex", gap: 22, alignItems: "baseline",
                borderBottom: i < timeline.length - 1 ? "1px solid var(--line)" : "none",
                paddingBottom: 14,
                background: hl ? "rgba(107,74,245,0.07)" : "transparent",
                marginLeft: hl ? -14 : 0, marginRight: hl ? -14 : 0,
                paddingLeft: hl ? 14 : 0, paddingRight: hl ? 14 : 0, paddingTop: hl ? 10 : 0,
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 30, color: hl ? "var(--accent)" : "var(--ink-2)", width: 90, fontWeight: hl ? 600 : 400 }}>{y}</div>
                <div style={{ fontSize: 26, color: "var(--ink-2)", lineHeight: 1.3 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// WHO USES IT TODAY — logistics giants

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

            <div className="body small" style={{ color: "var(--ink-3)", fontSize: 34, lineHeight: 1.3 }}>
              Like TSP, assignment, knapsack or scheduling, the VRP is a <em>discrete</em> optimization problem: we pick one configuration out of a combinatorial space — and the space grows faster than we can enumerate it.
            </div>
          </div>

          {/* RIGHT — illustrative instance */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 28, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14, gap: 16, flexWrap: "wrap" }}>
              <div className="kicker" style={{ fontSize: 24 }}>A small instance</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-3)", whiteSpace: "nowrap" }}>1 depot · 8 customers · 3 routes</div>
            </div>

            <svg viewBox="0 0 1000 680" style={{ flex: 1, width: "100%", height: "auto", maxHeight: 420 }}>
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
            <div style={{ marginTop: 10, color: "var(--ink-3)", fontSize: 26 }}>
              <TeX display={true}>{String.raw`\min \sum_{i,j} c_{ij}\, x_{ij}`}</TeX>
            </div>
            <div style={{ marginTop: 2, fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)" }}>s.t. flow conservation, capacity, covering</div>
            <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)" }}>{"xᵢⱼ ∈ {0, 1} — binary decision variables"}</div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


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


function SlideWhoUsesIt() {
  // Brand wordmarks — stylized text-only representations, academic context.
  // Colors approximate each brand's primary hue.
  const companies = [
    { name: "amazon",       brand: "#FF9900", sector: "E-commerce · last mile",    scale: "~6.3 B parcels / yr",  font: "'Inter', sans-serif", weight: 700, tracking: "-0.04em", style: "lower", swoop: true },
    { name: "UPS",          brand: "#644117", sector: "Parcel delivery",           scale: "22.4 M pkgs / day",    font: "'Inter', sans-serif", weight: 800, tracking: "0.06em", style: "upper" },
    { name: "FedEx",        brand: "#4D148C", brand2: "#FF6600", sector: "Express logistics",         scale: "16.6 M shipments / day", font: "'Inter', sans-serif", weight: 800, tracking: "-0.03em", style: "mixed-fedex" },
    { name: "DHL",          brand: "#D40511", sector: "International freight",     scale: "~1.7 B shipments / yr", font: "'Inter', sans-serif", weight: 800, tracking: "0.04em", style: "upper" },
    { name: "MAERSK",       brand: "#42B0D5", sector: "Container shipping",        scale: "~4.3 M TEU fleet",     font: "'Inter', sans-serif", weight: 700, tracking: "0.02em", style: "upper" },
    { name: "Walmart",      brand: "#0071CE", sector: "Store replenishment",       scale: "4 605 US stores",      font: "'Inter', sans-serif", weight: 700, tracking: "-0.03em", style: "mixed", spark: "#FFC220" },
    { name: "Uber Eats",    brand: "#06C167", sector: "On-demand food",            scale: "140 M active users",   font: "'Inter', sans-serif", weight: 700, tracking: "-0.02em", style: "mixed" },
    { name: "WM",           brand: "#00843D", sector: "Waste collection",          scale: "~21 M customers",      font: "'Inter', sans-serif", weight: 800, tracking: "-0.02em", style: "upper", subtitle: "Waste Management" },
  ];

  const renderLogo = (c) => {
    if (c.logoImg) {
      return (
        <img src={c.logoImg} alt={c.name} style={{ height: 64, width: "auto", objectFit: "contain", display: "block" }}/>
      );
    }
    if (c.style === "mixed-fedex") {
      // Fed (purple) + Ex (orange)
      return (
        <span style={{ fontFamily: c.font, fontWeight: c.weight, letterSpacing: c.tracking, fontSize: 52, lineHeight: 1 }}>
          <span style={{ color: c.brand }}>Fed</span><span style={{ color: c.brand2 }}>Ex</span>
        </span>
      );
    }
    if (c.name === "amazon") {
      return (
        <span style={{ fontFamily: c.font, fontWeight: c.weight, letterSpacing: c.tracking, fontSize: 54, lineHeight: 1, color: "var(--ink)", position: "relative", display: "inline-block" }}>
          amazon
          <svg viewBox="0 0 120 24" style={{ position: "absolute", left: 6, bottom: -12, width: 118, height: 22 }}>
            <path d="M 4 4 Q 60 26 116 4" fill="none" stroke={c.brand} strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M 108 2 L 116 4 L 112 11" fill="none" stroke={c.brand} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      );
    }
    if (c.name === "Walmart") {
      return (
        <span style={{ fontFamily: c.font, fontWeight: c.weight, letterSpacing: c.tracking, fontSize: 52, lineHeight: 1, color: c.brand, display: "inline-flex", alignItems: "center", gap: 10 }}>
          <svg width="26" height="26" viewBox="-12 -12 24 24">
            {[0,1,2,3,4,5].map(i => (
              <line key={i} x1={0} y1={-10} x2={0} y2={-4} stroke={c.spark} strokeWidth="2.6" strokeLinecap="round"
                    transform={`rotate(${i * 60})`}/>
            ))}
          </svg>
          Walmart
        </span>
      );
    }
    // Plain wordmark
    return (
      <span style={{ fontFamily: c.font, fontWeight: c.weight, letterSpacing: c.tracking, fontSize: 52, lineHeight: 1, color: c.brand }}>
          {c.name}
      </span>
    );
  };

  return (
    <section className="slide" data-label="Who uses VRP today">
      <SlideFrame>
        <div className="tag">Introduction · Today</div>
        <h2 className="title" style={{ marginTop: 28, maxWidth: 1500 }}>
          Today, every logistics giant runs a VRP solver under the hood.
        </h2>
        <div className="body" style={{ marginTop: 22, color: "var(--ink-3)", maxWidth: 1400, fontSize: 28 }}>
          From parcel to groceries to waste, the companies that move physical goods compete on routing quality. A 1–3% cut in route length translates, at this scale, into hundreds of millions of euros a year.
        </div>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {companies.map((c, i) => (
            <div key={i} style={{
              padding: "28px 26px", minHeight: 220,
              borderRight: (i % 4 !== 3) ? "1px solid var(--line)" : "none",
              borderBottom: i < 4 ? "1px solid var(--line)" : "none",
              background: "var(--paper-2)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ height: 72, display: "flex", alignItems: "center", marginBottom: 14 }}>
                  {renderLogo(c)}
                </div>
                <div className="body small" style={{ color: "var(--ink-3)", fontSize: 22 }}>{c.sector}</div>
                {c.subtitle && <div style={{ fontSize: 18, color: "var(--ink-3)", marginTop: 2, fontStyle: "italic" }}>{c.subtitle}</div>}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 600, color: "var(--ink)", letterSpacing: "0.03em", lineHeight: 1.2 }}>
                {c.scale}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
          <div className="body small" style={{ color: "var(--ink-3)", maxWidth: 1000, fontSize: 24, lineHeight: 1.35 }}>
            Also: <em>school bus routing, dial-a-ride, field service, telecom maintenance, vaccine cold-chain, humanitarian logistics</em>.
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-3)", letterSpacing: "0.06em", whiteSpace: "nowrap", paddingLeft: 24 }}>
            ≈ 2024–2025 reported metrics.
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// GRAPH CONCEPT — NODE (vertex)

Object.assign(window, {
  SlideIntroSection, SlideHistory, SlideORLink,
  Slide02, Slide03, SlideWhoUsesIt,
});
