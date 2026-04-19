/* =========================================================================
   VRP Seminar — New intro slides (history, who uses it, graph concepts)
   These slots fit between Slide01 (cover) and the rest of the deck.
   ========================================================================= */

// ==========================================================
// SECTION HEADER — Part I: Introduction
// ==========================================================
function SlideIntroSection() {
  return (
    <section className="slide section-slide" data-label="Part I — Introduction">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part I of V</div>
        <div>Slides 3 — 7</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part One</div>
        <div className="hero" style={{ fontSize: 240 }}>Introduction.</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper-deep)" }}>
          Where the VRP came from, who uses it today, and why it matters — the problem you meet every day and its economic scale.
        </div>
      </div>
    </section>
  );
}

// ==========================================================
// HISTORY — when the term was coined & why
// ==========================================================
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
          {/* Left — the why */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <div className="lede" style={{ fontSize: 34, lineHeight: 1.35, maxWidth: 900 }}>
              <span style={{ color: "var(--accent)" }}>George Dantzig</span> and <span style={{ color: "var(--accent)" }}>John Ramser</span> published <em>The Truck Dispatching Problem</em> in <em>Management Science</em>, October 1959.
            </div>

            <div className="body" style={{ color: "var(--ink-2)", maxWidth: 900, fontSize: 28, lineHeight: 1.4 }}>
              The question was practical: how should a fleet of tanker trucks deliver gasoline from a bulk terminal to a scattered set of service stations, at minimum cost?
            </div>

            <div className="body" style={{ color: "var(--ink-3)", maxWidth: 900, fontSize: 26, lineHeight: 1.4 }}>
              They generalised the Traveling Salesman Problem — one tour, one vehicle — to <em>many tours, many vehicles, with capacity</em>. The paper gave the problem its first formal name and its first linear-programming treatment.
            </div>
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
// ==========================================================
function SlideWhoUsesIt() {
  // Brand wordmarks — stylized text-only representations, academic context.
  // Colors approximate each brand's primary hue.
  const companies = [
    { name: "amazon",       brand: "#FF9900", sector: "E-commerce · last mile",    scale: "~6 B parcels / yr",   font: "'Inter', sans-serif", weight: 700, tracking: "-0.04em", style: "lower", swoop: true },
    { name: "UPS",          brand: "#644117", sector: "Parcel delivery",           scale: "22 M pkgs / day",     logoImg: "assets/kisspng-united-parcel-service-united-states-postal-service-5b2d5c802e9631.4646807015296994561908.jpg" },
    { name: "FedEx",        brand: "#4D148C", brand2: "#FF6600", sector: "Express logistics",         scale: "16 M shipments / day",font: "'Inter', sans-serif", weight: 800, tracking: "-0.03em", style: "mixed-fedex" },
    { name: "DHL",          brand: "#D40511", sector: "International freight",     scale: "1.8 B shipments / yr",font: "'Inter', sans-serif", weight: 800, tracking: "0.04em", style: "upper" },
    { name: "MAERSK",       brand: "#42B0D5", sector: "Container shipping",        scale: "4 M TEU fleet",       font: "'Inter', sans-serif", weight: 700, tracking: "0.02em", style: "upper" },
    { name: "Walmart",      brand: "#0071CE", sector: "Store replenishment",       scale: "12 k US stores",      font: "'Inter', sans-serif", weight: 700, tracking: "-0.03em", style: "mixed", spark: "#FFC220" },
    { name: "Uber Eats",    brand: "#06C167", sector: "On-demand food",            scale: "~2 B orders / yr",    logoImg: "assets/ubereats-logo.png" },
    { name: "WM",           brand: "#00843D", sector: "Waste collection",          scale: "21 M customers",      font: "'Inter', sans-serif", weight: 800, tracking: "-0.02em", style: "upper", subtitle: "Waste Management" },
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
            ≈ 2023–2024 reported metrics.
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// GRAPH CONCEPT — NODE (vertex)
// ==========================================================
function SlideNode() {
  // Five sample nodes, spread out so annotations have room
  const nodes = [
    { x: 220, y: 220, label: "1" },
    { x: 560, y: 180, label: "2" },
    { x: 820, y: 340, label: "3" },
    { x: 340, y: 500, label: "4" },
    { x: 680, y: 560, label: "5" },
  ];
  return (
    <section className="slide" data-label="Graph concepts — Node">
      <SlideFrame>
        <div className="tag">02 · Graph theory · Node</div>
        <h2 className="title" style={{ marginTop: 28 }}>A <em style={{ color: "var(--accent)" }}>node</em> is a point of interest.</h2>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="lede" style={{ fontSize: 44 }}>
              In graph theory, a <em style={{ color: "var(--accent)" }}>node</em> (or <em>vertex</em>) represents an entity we care about.
            </div>
            <div className="body" style={{ color: "var(--ink-2)" }}>
              In a VRP, every node is either a <em>customer</em> to serve or a <em>depot</em> where vehicles start and end.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px" }}>
              <div className="kicker" style={{ fontSize: 22, marginBottom: 8 }}>Notation</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 30, lineHeight: 1.5 }}>
                V = {"{"} 0, 1, 2, …, n {"}"}<br/>
                <span style={{ color: "var(--ink-3)" }}>with</span> vᵢ ∈ V <span style={{ color: "var(--ink-3)" }}>a single node</span>
              </div>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              Each node can carry <em>attributes</em>: coordinates (x, y), demand dᵢ, service time sᵢ, a time window [aᵢ, bᵢ]…
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 700" style={{ width: "100%", height: "100%", display: "block" }}>
              {/* dotted grid */}
              <defs>
                <pattern id="dotgrid-node" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect x={0} y={0} width={1000} height={700} fill="url(#dotgrid-node)" opacity={0.5}/>

              {nodes.map((n, i) => (
                <g key={i} className={i === 0 ? "anim-pulse" : ""} style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: "fill-box" }}>
                  <circle cx={n.x} cy={n.y} r={i === 0 ? 32 : 24}
                          fill={i === 0 ? "var(--accent)" : "var(--paper)"}
                          stroke={i === 0 ? "var(--accent)" : "var(--ink)"}
                          strokeWidth={i === 0 ? 0 : 3}/>
                  <text x={n.x} y={n.y + 9} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={24} fontWeight={600}
                        fill={i === 0 ? "var(--paper)" : "var(--ink)"}>
                    {n.label}
                  </text>
                </g>
              ))}
              {/* Annotation on node 1 — leader line goes up-left to an open area */}
              <g className="anim-fade-2">
                <line x1={220} y1={188} x2={220} y2={120} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="4 4"/>
                <text x={220} y={100} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={24} fill="var(--accent)">node v₁</text>
              </g>
              {/* Annotation on node 3 — leader line goes right into empty margin */}
              <g className="anim-fade-3">
                <line x1={844} y1={340} x2={920} y2={340} stroke="var(--ink-3)" strokeWidth={1.2} strokeDasharray="4 4"/>
                <text x={924} y={346} fontFamily="var(--font-mono)" fontSize={24} fill="var(--ink-3)" textAnchor="start">vⱼ</text>
              </g>
            </svg>
            <div style={{ position: "absolute", bottom: 16, left: 30, fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
              FIG. — a set of five isolated nodes — no connections yet.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// GRAPH CONCEPT — EDGE (undirected)
// ==========================================================
function SlideEdge() {
  const A = { x: 300, y: 340 };
  const B = { x: 700, y: 340 };
  return (
    <section className="slide" data-label="Graph concepts — Edge">
      <SlideFrame>
        <div className="tag">02 · Graph theory · Edge</div>
        <h2 className="title" style={{ marginTop: 28 }}>An <em style={{ color: "var(--accent)" }}>edge</em> is a bidirectional link between two nodes.</h2>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, flex: 1, alignItems: "center" }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 680" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-edge" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect width={1000} height={680} fill="url(#dotgrid-edge)" opacity={0.5}/>

              {/* Edge — drawn line */}
              <line className="anim-draw anim-draw-1"
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke="var(--accent)" strokeWidth={5}
                    strokeLinecap="round"
                    style={{ "--len": 400 }}/>

              {/* Midpoint label (cost) */}
              <g transform={`translate(${(A.x + B.x)/2} ${(A.y + B.y)/2 - 32})`}>
                <rect x={-48} y={-22} width={96} height={38} fill="var(--paper)" stroke="var(--accent)" strokeWidth={1.5} rx={4}/>
                <text x={0} y={5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--accent)">c = 7.3</text>
              </g>

              {/* Nodes on top */}
              {[A, B].map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r={30} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                  <text x={n.x} y={n.y + 9} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={24} fontWeight={600} fill="var(--ink)">
                    {i === 0 ? "i" : "j"}
                  </text>
                </g>
              ))}

              {/* Two-way indicator */}
              <g className="anim-fade-3">
                <text x={(A.x + B.x)/2} y={(A.y + B.y)/2 + 60} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={28} fill="var(--ink-3)">
                  i ↔ j
                </text>
                <text x={(A.x + B.x)/2} y={(A.y + B.y)/2 + 95} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-3)">
                  same cost both ways
                </text>
              </g>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div className="lede" style={{ fontSize: 42 }}>
              An <em style={{ color: "var(--accent)" }}>edge</em> <span style={{ fontFamily: "var(--font-mono)" }}>e = {"{"} i, j {"}"}</span> connects two nodes with no preferred direction.
            </div>
            <div className="body" style={{ color: "var(--ink-2)" }}>
              In a VRP, an edge says: <em>you can travel between i and j</em>, and travelling costs the same either way.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px" }}>
              <div className="kicker" style={{ fontSize: 22, marginBottom: 8 }}>Notation</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, lineHeight: 1.55 }}>
                E = {"{"} e₁, e₂, …, eₘ {"}"}<br/>
                <span style={{ color: "var(--ink-3)" }}>with</span> cᵢⱼ = cⱼᵢ
              </div>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              Undirected edges are the right model for Euclidean distances or symmetric street costs.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// GRAPH CONCEPT — DIRECTED ARC
// ==========================================================
function SlideDirectedArc() {
  const A = { x: 260, y: 260 };
  const B = { x: 720, y: 260 };
  const C = { x: 260, y: 500 };
  const D = { x: 720, y: 500 };
  return (
    <section className="slide" data-label="Graph concepts — Directed arc">
      <SlideFrame>
        <div className="tag">02 · Graph theory · Directed arc</div>
        <h2 className="title" style={{ marginTop: 28 }}>A <em style={{ color: "var(--accent)" }}>directed arc</em> has a head, a tail, and a direction.</h2>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 70, flex: 1, alignItems: "center" }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 760" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <marker id="arrow-dir" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
                  <path d="M 0 0 L 12 6 L 0 12 z" fill="var(--accent)"/>
                </marker>
                <marker id="arrow-dir-2" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
                  <path d="M 0 0 L 12 6 L 0 12 z" fill="var(--accent-2)"/>
                </marker>
                <pattern id="dotgrid-dir" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect width={1000} height={760} fill="url(#dotgrid-dir)" opacity={0.5}/>

              {/* Arc 1: i -> j */}
              <line className="anim-draw anim-draw-1"
                    x1={A.x + 30} y1={A.y} x2={B.x - 36} y2={B.y}
                    stroke="var(--accent)" strokeWidth={5} markerEnd="url(#arrow-dir)"
                    style={{ "--len": 450 }}/>
              <text className="anim-fade-2" x={(A.x + B.x)/2} y={A.y - 22} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--accent)">
                arc (i, j) → cost cᵢⱼ = 7.3
              </text>

              {/* Two arcs opposite direction, different costs */}
              <path className="anim-draw anim-draw-3"
                    d={`M ${C.x + 30} ${C.y - 14} Q ${(C.x+D.x)/2} ${C.y - 60} ${D.x - 36} ${D.y - 14}`}
                    fill="none" stroke="var(--accent)" strokeWidth={5} markerEnd="url(#arrow-dir)"
                    style={{ "--len": 520 }}/>
              <text className="anim-fade-2" x={(C.x + D.x)/2} y={C.y - 80} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--accent)">
                (i, j) → cᵢⱼ = 7.3
              </text>

              <path className="anim-draw anim-draw-4"
                    d={`M ${D.x - 36} ${D.y + 14} Q ${(C.x+D.x)/2} ${D.y + 60} ${C.x + 30} ${C.y + 14}`}
                    fill="none" stroke="var(--accent-2)" strokeWidth={5} markerEnd="url(#arrow-dir-2)"
                    style={{ "--len": 520 }}/>
              <text className="anim-fade-3" x={(C.x + D.x)/2} y={C.y + 105} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--accent-2)">
                (j, i) → cⱼᵢ = 9.8 &nbsp; (e.g. one-way street, uphill…)
              </text>

              {/* Nodes */}
              {[[A,"i"],[B,"j"],[C,"i"],[D,"j"]].map(([n, l], i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r={28} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                  <text x={n.x} y={n.y + 9} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={24} fontWeight={600} fill="var(--ink)">
                    {l}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 34, lineHeight: 1.22 }}>
              A directed arc <span style={{ fontFamily: "var(--font-mono)" }}>a = (i, j)</span> points <em>from i to j</em>. Going back the other way is a <em>different</em> arc (j, i).
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 24px" }}>
              <div className="kicker" style={{ fontSize: 22, marginBottom: 8 }}>Notation</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, lineHeight: 1.55 }}>
                A ⊆ V × V &nbsp; with &nbsp; cᵢⱼ ≠ cⱼᵢ in general
              </div>
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 26, lineHeight: 1.35 }}>
              Directed graphs are used whenever cost or feasibility of travel depends on direction: <em>one-way streets, asymmetric road networks, pickup-and-delivery precedence</em>.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// GRAPH CONCEPT — NETWORK (build-up animation)
// ==========================================================
function SlideNetwork() {
  // Eight nodes (one depot) arranged in a plane
  const N = [
    { x: 500, y: 380, role: "depot",    label: "0" },
    { x: 240, y: 220, role: "customer", label: "1" },
    { x: 380, y: 160, role: "customer", label: "2" },
    { x: 620, y: 160, role: "customer", label: "3" },
    { x: 780, y: 280, role: "customer", label: "4" },
    { x: 760, y: 520, role: "customer", label: "5" },
    { x: 540, y: 600, role: "customer", label: "6" },
    { x: 280, y: 560, role: "customer", label: "7" },
    { x: 180, y: 400, role: "customer", label: "8" },
  ];
  // A subset of edges — looks like a plausible road network
  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
    [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1],
  ];
  return (
    <section className="slide" data-label="Graph concepts — Network">
      <SlideFrame>
        <div className="tag">02 · Graph theory · Network</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          A <em style={{ color: "var(--accent)" }}>network</em> is nodes + arcs, working together.
        </h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 70, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 42 }}>
              A <em>graph</em> (or network) is the pair &nbsp;
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>G = (V, A)</span>.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px", fontFamily: "var(--font-mono)", fontSize: 25, lineHeight: 1.55 }}>
              V &nbsp; = &nbsp; set of nodes<br/>
              A &nbsp; = &nbsp; set of arcs<br/>
              cᵢⱼ &nbsp; = &nbsp; cost on arc (i, j)
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 28 }}>
              In a VRP network the depot <span style={{ fontFamily: "var(--font-mono)" }}>v₀</span> is a square, customers are circles,
              and every arc carries a travel cost.
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              From this object, an entire family of optimisation problems springs: TSP, CVRP, VRPTW, PDP…
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 780" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-net" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
                <marker id="arrow-net" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity={0.6}/>
                </marker>
              </defs>
              <rect width={1000} height={780} fill="url(#dotgrid-net)" opacity={0.5}/>

              {/* Edges draw in sequence */}
              {edges.map(([a, b], i) => {
                const na = N[a], nb = N[b];
                const delay = 80 + i * 90;
                const len = Math.hypot(nb.x - na.x, nb.y - na.y);
                // Shorten line endpoints so arrow doesn't enter the node
                const r = 26;
                const dx = (nb.x - na.x) / len, dy = (nb.y - na.y) / len;
                const x1 = na.x + dx * r, y1 = na.y + dy * r;
                const x2 = nb.x - dx * r, y2 = nb.y - dy * r;
                return (
                  <line key={i}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="var(--accent)" strokeOpacity={0.55}
                        strokeWidth={2.5}
                        markerEnd="url(#arrow-net)"
                        style={{
                          strokeDasharray: len,
                          strokeDashoffset: len,
                          animation: "drawPath 600ms both ease-out",
                          animationDelay: `${delay}ms`,
                          "--len": len,
                        }}/>
                );
              })}

              {/* Nodes */}
              {N.map((n, i) => (
                <g key={i} className={`anim-fade-${Math.min(3, Math.floor(i / 3))}`}>
                  {n.role === "depot" ? (
                    <rect x={n.x - 26} y={n.y - 26} width={52} height={52} fill="var(--ink)"/>
                  ) : (
                    <circle cx={n.x} cy={n.y} r={24} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                  )}
                  <text x={n.x} y={n.y + 8} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={22} fontWeight={600}
                        fill={n.role === "depot" ? "var(--paper)" : "var(--ink)"}>
                    {n.label}
                  </text>
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(40, 720)">
                <rect x={0} y={-16} width={24} height={24} fill="var(--ink)"/>
                <text x={34} y={3} fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-2)">depot</text>
                <circle cx={160} cy={-4} r={12} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                <text x={180} y={3} fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-2)">customer</text>
                <line x1={320} y1={-4} x2={380} y2={-4} stroke="var(--accent)" strokeWidth={2.5} markerEnd="url(#arrow-net)" opacity={0.7}/>
                <text x={390} y={3} fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-2)">arc (i, j)</text>
              </g>
            </svg>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// Escape sequences above use real unicode so we don't need to reprocess.
// Register
Object.assign(window, {
  SlideIntroSection, SlideHistory, SlideWhoUsesIt, SlideNode, SlideEdge, SlideDirectedArc, SlideNetwork,
});
