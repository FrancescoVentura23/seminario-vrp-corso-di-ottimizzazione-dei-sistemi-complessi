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
// ==========================================================
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
// ==========================================================
function SlideNode() {
  // Five sample nodes, spread out so annotations have room
  const nodes = [
    { x: 220, y: 220, label: "v₁" },
    { x: 560, y: 180, label: "v₂" },
    { x: 820, y: 340, label: "v₃" },
    { x: 340, y: 500, label: "v₄" },
    { x: 680, y: 560, label: "v₅" },
  ];
  return (
    <section className="slide" data-label="Graph concepts — Node">
      <SlideFrame>
        <div className="tag">Graph theory · Vertex (node)</div>
        <h2 className="title" style={{ marginTop: 28 }}>A <em style={{ color: "var(--accent)" }}>vertex</em> is an element of the graph.</h2>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, flex: 1, alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 38, lineHeight: 1.22 }}>
              A graph <em>G</em> has a finite, non-empty <em>vertex set</em> <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>V(G)</span> — its elements are called <em>vertices</em> (or, informally, <em>nodes</em>).
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 26 }}>
              In a VRP, every vertex is either a <em>customer</em> to serve or a <em>depot</em> where vehicles start and end.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px" }}>
              <div className="kicker" style={{ fontSize: 22, marginBottom: 8 }}>Notation</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, lineHeight: 1.55 }}>
                V(G) = {"{"} v₀, v₁, v₂, …, vₙ {"}"}<br/>
                <span style={{ color: "var(--ink-3)" }}>|V(G)| = n + 1 &nbsp;— the</span> order <span style={{ color: "var(--ink-3)" }}>of G</span>
              </div>
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
                <g key={i} className="anim-fade-1">
                  <circle cx={n.x} cy={n.y} r={36}
                          fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                  <text x={n.x} y={n.y + 10} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={28} fontWeight={600}
                        fill="var(--ink)">
                    {n.label}
                  </text>
                </g>
              ))}
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
// NODE ATTRIBUTES — cycle through service time / time window / profit-cost
// ==========================================================
function SlideNodeAttributes() {
  // Identical positions to SlideNode — nodes appear to stay on screen across the transition
  const nodes = [
    { x: 220, y: 220, label: "v₁" },
    { x: 560, y: 180, label: "v₂" },
    { x: 820, y: 340, label: "v₃" },
    { x: 340, y: 500, label: "v₄" },
    { x: 680, y: 560, label: "v₅" },
  ];

  const attributes = [
    {
      key: "demand",
      name: "Demand",
      mono: "dᵢ",
      desc: "Amount of goods to be delivered or collected at node i. The depot carries no demand: d₀ = 0.",
      color: "var(--accent-2)",
      values: [
        { display: "4 units" },
        { display: "3 units" },
        { display: "2 units" },
        { display: "5 units" },
        { display: "3 units" },
      ],
    },
    {
      key: "service",
      name: "Service time",
      mono: "sᵢ",
      desc: "How long the vehicle must stay at node i — unloading, paperwork, handover.",
      color: "var(--ink)",
      values: [
        { display: "0.25 h" },
        { display: "0.50 h" },
        { display: "0.15 h" },
        { display: "0.40 h" },
        { display: "0.30 h" },
      ],
    },
    {
      key: "window",
      name: "Time window",
      mono: "[aᵢ, bᵢ]",
      desc: "Earliest and latest arrival times allowed at node i (in hours of the day).",
      color: "var(--accent)",
      values: [
        { display: "[8, 12]" },
        { display: "[9, 13]" },
        { display: "[10, 14]" },
        { display: "[8, 11]" },
        { display: "[13, 17]" },
      ],
    },
    {
      key: "price",
      name: "Profit or cost",
      mono: "pᵢ",
      desc: "Revenue for serving i (green) or penalty that applies if i is visited (red).",
      color: "var(--accent-3)",
      values: [
        { display: "+€40", color: "#2b7a5e" },
        { display: "−€15", color: "#c14f3c" },
        { display: "+€28", color: "#2b7a5e" },
        { display: "−€22", color: "#c14f3c" },
        { display: "+€35", color: "#2b7a5e" },
      ],
    },
  ];

  const [activeIdx, setActiveIdx] = React.useState(0);
  const [animKey, setAnimKey] = React.useState(0);
  const listRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  // Restart zoom animation every time this slide becomes active
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.hasAttribute('data-deck-active')) setAnimKey(k => k + 1);
    });
    obs.observe(el, { attributes: true, attributeFilter: ['data-deck-active'] });
    return () => obs.disconnect();
  }, []);

  // React's event delegation breaks when the <section> is moved out of the
  // host div where createRoot() was called. Attach a native click listener
  // on the list container instead, and dispatch via data-attr-idx.
  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const handler = (e) => {
      const card = e.target.closest("[data-attr-idx]");
      if (!card || !el.contains(card)) return;
      const idx = parseInt(card.getAttribute("data-attr-idx"), 10);
      if (!Number.isNaN(idx)) setActiveIdx(idx);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, []);

  const active = attributes[activeIdx];

  return (
    <section ref={sectionRef} className="slide" data-label="Graph concepts — Node attributes">
      <SlideFrame>
        <div className="tag">Graph theory · Node attributes</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          Each node carries its own <em style={{ color: "var(--accent)" }}>attributes</em>.
        </h2>

        <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, flex: 1, alignItems: "stretch" }}>
          {/* Left — list of attributes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "space-between" }}>
            <div className="lede" style={{ fontSize: 30, lineHeight: 1.25, color: "var(--ink-2)" }}>
              In a VRP instance, every customer carries application-specific data. The four most common attributes:
            </div>
            <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {attributes.map((a, i) => {
                const isActive = i === activeIdx;
                return (
                  <div key={a.key} data-attr-idx={i} style={{
                    padding: "18px 22px",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--line)"}`,
                    borderLeft: `${isActive ? 4 : 1}px solid ${isActive ? "var(--accent)" : "var(--line)"}`,
                    background: isActive ? "rgba(107,74,245,0.08)" : "var(--paper-2)",
                    transform: isActive ? "translateX(6px)" : "translateX(0)",
                    transition: "all 420ms ease",
                    cursor: "pointer",
                    userSelect: "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                      <div style={{ fontSize: 28, fontWeight: 600, color: isActive ? "var(--accent)" : "var(--ink)" }}>
                        {a.name}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-3)" }}>
                        {a.mono}
                      </div>
                    </div>
                    <div style={{ fontSize: 21, color: "var(--ink-2)", marginTop: 6, lineHeight: 1.3 }}>
                      {a.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — same layout as SlideNode so nodes look continuous across the transition */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 700" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-nodeattr" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect x={0} y={0} width={1000} height={700} fill="url(#dotgrid-nodeattr)" opacity={0.5}/>

              {nodes.map((n, i) => {
                const value = active.values[i];
                const labelColor = value.color || active.color;
                return (
                  <g key={i}>
                    {/* Node circle — no animation, same as SlideNode (visual continuity) */}
                    <circle cx={n.x} cy={n.y} r={36}
                            fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                    <text x={n.x} y={n.y + 10} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={28} fontWeight={600}
                          fill="var(--ink)">
                      {n.label}
                    </text>
                    {/* Attribute pill — fades in staggered after slide becomes active */}
                    <g key={`${active.key}-${i}-${animKey}`}
                       style={{ animation: "fadeUp 520ms both ease-out", animationDelay: `${200 + i * 100}ms` }}>
                      <line x1={n.x} y1={n.y - 54} x2={n.x} y2={n.y - 38}
                            stroke={labelColor} strokeWidth={1.5} strokeDasharray="3 3"/>
                      <rect x={n.x - 68} y={n.y - 104} width={136} height={48}
                            fill="var(--paper)" stroke={labelColor} strokeWidth={2} rx={6}/>
                      <text x={n.x} y={n.y - 72} textAnchor="middle"
                            fontFamily="var(--font-mono)" fontSize={24} fontWeight={600}
                            fill={labelColor}>
                        {value.display}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
            <div style={{ position: "absolute", bottom: 18, left: 30, fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
              FIG. — same five nodes, attribute <span style={{ color: active.color, fontFamily: "var(--font-mono)" }}>{active.mono}</span> shown above each.
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
        <div className="tag">Graph theory · Edge</div>
        <h2 className="title" style={{ marginTop: 28 }}>An <em style={{ color: "var(--accent)" }}>edge</em> joins two vertices.</h2>

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

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div className="lede" style={{ fontSize: 36, lineHeight: 1.22 }}>
              An edge is an <em>unordered pair</em> <span style={{ fontFamily: "var(--font-mono)" }}>e = {"{"}i, j{"}"}</span> of distinct vertices. We say <em>e joins i and j</em>, and that i and j are <em>adjacent</em>. The set of all edges of G is written <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>E(G)</span>.
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 26 }}>
              In a VRP an edge says: <em>you can travel between i and j</em>, and travelling costs the same either way.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px" }}>
              <div className="kicker" style={{ fontSize: 22, marginBottom: 8 }}>Notation</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, lineHeight: 1.55 }}>
                E(G) = {"{"} e₁, e₂, …, eₘ {"}"}<br/>
                <span style={{ color: "var(--ink-3)" }}>|E(G)| = m —</span> size of G<br/>
                <span style={{ color: "var(--ink-3)" }}>cost symmetry:</span> cᵢⱼ = cⱼᵢ
              </div>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// GRAPH CONCEPT — SIMPLE GRAPH (no loops, no multiple edges)
// ==========================================================
function SlideSimpleGraph() {
  // Bad example (top-right): two vertices with a loop on v₁ and two parallel edges between v₁–v₂.
  // Coordinates live inside a viewBox 1000×460.
  const BAD = { A: { x: 330, y: 290 }, B: { x: 720, y: 290 } };
  // Good example (bottom-right): triangle inside viewBox 1000×460.
  const GOOD = {
    A: { x: 260, y: 160 },
    B: { x: 740, y: 160 },
    C: { x: 500, y: 370 },
  };
  return (
    <section className="slide" data-label="Graph concepts — Simple graph">
      <SlideFrame>
        <div className="tag">Graph theory · Simple graph</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          A <em style={{ color: "var(--accent)" }}>simple graph</em> has no loops and no multiple edges.
        </h2>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 70, flex: 1, alignItems: "stretch", minHeight: 0 }}>
          {/* Left — definition */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 34, lineHeight: 1.22 }}>
              A graph is <em>simple</em> when two conditions hold:
            </div>
            <ul style={{ margin: 0, paddingLeft: 36, display: "flex", flexDirection: "column", gap: 14 }}>
              <li style={{ fontSize: 30, lineHeight: 1.35, color: "var(--ink-2)" }}>no edge joins a vertex to itself;</li>
              <li style={{ fontSize: 30, lineHeight: 1.35, color: "var(--ink-2)" }}>no pair of vertices is connected by more than one edge.</li>
            </ul>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 24px" }}>
              <div className="kicker" style={{ fontSize: 22, marginBottom: 10 }}>Two forbidden patterns</div>
              <div style={{ fontSize: 24, lineHeight: 1.4, color: "var(--ink-2)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "#c14f3c", fontWeight: 600, minWidth: 140 }}>loop</span>
                  <span>an edge <span style={{ fontFamily: "var(--font-mono)" }}>{"{i, i}"}</span> from a vertex to itself.</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "#c14f3c", fontWeight: 600, minWidth: 140 }}>multi-edge</span>
                  <span>two or more edges sharing the same endpoints.</span>
                </div>
              </div>
            </div>

            <div className="body" style={{ color: "var(--ink-2)", fontSize: 25, lineHeight: 1.35 }}>
              The assumption is <em>without loss of generality</em>:
              <ul style={{ margin: "10px 0 0 0", paddingLeft: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                <li>A loop has cost 0 and is never part of an optimal tour — it can always be removed.</li>
                <li>If two parallel edges connect the same pair, only the one with <em>minimum cost</em> is ever used — the other is redundant and can be dropped.</li>
              </ul>
            </div>
            <div className="body small" style={{ color: "var(--ink-3)", fontSize: 22, lineHeight: 1.35 }}>
              Throughout this seminar, every <span style={{ fontFamily: "var(--font-mono)" }}>G = (V, E)</span> is assumed simple.
            </div>
          </div>

          {/* Right — forbidden vs allowed, each panel is a flex-column so the SVG fills the leftover space */}
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 18, minHeight: 0 }}>
            {/* Forbidden */}
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 20, position: "relative", display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div className="kicker" style={{ fontSize: 20, color: "#c14f3c", marginBottom: 6 }}>Not a simple graph</div>
              <svg viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", flex: 1, minHeight: 0, display: "block" }}>
                <defs>
                  <pattern id="dotgrid-simplebad" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                  </pattern>
                </defs>
                <rect width={1000} height={460} fill="url(#dotgrid-simplebad)" opacity={0.5}/>

                {/* Loop on v₁ — blinks to highlight it as a forbidden pattern */}
                <g className="anim-blink">
                  <circle cx={BAD.A.x - 48} cy={BAD.A.y - 48} r={42}
                          fill="none" stroke="#c14f3c" strokeWidth={4}/>
                  <text x={BAD.A.x - 90} y={BAD.A.y - 110} fontFamily="var(--font-mono)" fontSize={22} fill="#c14f3c">
                    loop {"{v₁, v₁}"}
                  </text>
                </g>

                {/* Two parallel edges — blink offset so loop and edges alternate */}
                <g className="anim-blink-2">
                  <path d={`M ${BAD.A.x + 30} ${BAD.A.y} Q ${(BAD.A.x + BAD.B.x)/2} ${BAD.A.y - 110} ${BAD.B.x - 30} ${BAD.B.y}`}
                        fill="none" stroke="#c14f3c" strokeWidth={4}/>
                  <path d={`M ${BAD.A.x + 30} ${BAD.A.y} Q ${(BAD.A.x + BAD.B.x)/2} ${BAD.A.y + 110} ${BAD.B.x - 30} ${BAD.B.y}`}
                        fill="none" stroke="#c14f3c" strokeWidth={4}/>
                  <text x={(BAD.A.x + BAD.B.x)/2} y={BAD.B.y + 140} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="#c14f3c">
                    two parallel edges {"{v₁, v₂}"}
                  </text>
                </g>

                {/* Nodes on top of edges */}
                {[[BAD.A, "v₁"], [BAD.B, "v₂"]].map(([n, l], i) => (
                  <g key={i}>
                    <circle cx={n.x} cy={n.y} r={28} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                    <text x={n.x} y={n.y + 9} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fontWeight={600} fill="var(--ink)">
                      {l}
                    </text>
                  </g>
                ))}

                {/* Red cross in upper-right corner */}
                <g transform="translate(930, 55)">
                  <circle r={26} fill="#c14f3c"/>
                  <line x1={-12} y1={-12} x2={12} y2={12} stroke="var(--paper)" strokeWidth={4} strokeLinecap="round"/>
                  <line x1={-12} y1={12} x2={12} y2={-12} stroke="var(--paper)" strokeWidth={4} strokeLinecap="round"/>
                </g>
              </svg>
            </div>

            {/* Allowed */}
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 20, position: "relative", display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div className="kicker" style={{ fontSize: 20, color: "#2b7a5e", marginBottom: 6 }}>Simple graph</div>
              <svg viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", flex: 1, minHeight: 0, display: "block" }}>
                <defs>
                  <pattern id="dotgrid-simplegood" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                  </pattern>
                </defs>
                <rect width={1000} height={460} fill="url(#dotgrid-simplegood)" opacity={0.5}/>

                {/* Three edges, one per pair */}
                {[[GOOD.A, GOOD.B], [GOOD.B, GOOD.C], [GOOD.C, GOOD.A]].map(([p, q], i) => (
                  <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                        stroke="var(--accent)" strokeWidth={4} strokeLinecap="round"/>
                ))}

                {/* Nodes */}
                {[[GOOD.A, "v₁"], [GOOD.B, "v₂"], [GOOD.C, "v₃"]].map(([n, l], i) => (
                  <g key={i}>
                    <circle cx={n.x} cy={n.y} r={28} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                    <text x={n.x} y={n.y + 9} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fontWeight={600} fill="var(--ink)">
                      {l}
                    </text>
                  </g>
                ))}

                {/* Green check in upper-right corner */}
                <g transform="translate(930, 55)">
                  <circle r={26} fill="#2b7a5e"/>
                  <polyline points="-12,0 -3,10 13,-10" fill="none" stroke="var(--paper)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
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
        <div className="tag">Graph theory · Digraph · Arc</div>
        <h2 className="title" style={{ marginTop: 28 }}>A <em style={{ color: "var(--accent)" }}>directed arc</em> has a tail, a head, and a direction.</h2>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 70, flex: 1, alignItems: "center" }}>
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 760" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-dir" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect width={1000} height={760} fill="url(#dotgrid-dir)" opacity={0.5}/>

              {/* Arc 1: i -> j — straight. Line draws first, tip appears after. */}
              <line className="anim-draw anim-draw-1"
                    x1={A.x + 30} y1={A.y} x2={B.x - 30} y2={B.y}
                    stroke="var(--accent)" strokeWidth={5} strokeLinecap="round"
                    style={{ "--len": 450 }}/>
              <g className="anim-appear" style={{ "--appear-delay": "1350ms" }}
                 transform={`translate(${B.x - 28}, ${B.y})`}>
                <polygon points="-16,-10 0,0 -16,10" fill="var(--accent)"/>
              </g>
              <text className="anim-fade-2" x={(A.x + B.x)/2} y={A.y - 40} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--accent)">
                arc (i, j) → cost cᵢⱼ = 7.3
              </text>

              {/* Two arcs opposite direction, different costs */}
              <path className="anim-draw anim-draw-3"
                    d={`M ${C.x + 30} ${C.y - 14} Q ${(C.x+D.x)/2} ${C.y - 60} ${D.x - 36} ${D.y - 14}`}
                    fill="none" stroke="var(--accent)" strokeWidth={5} strokeLinecap="round"
                    style={{ "--len": 520 }}/>
              <g className="anim-appear" style={{ "--appear-delay": "1950ms" }}
                 transform={`translate(${D.x - 36}, ${D.y - 14}) rotate(13.3)`}>
                <polygon points="-16,-10 0,0 -16,10" fill="var(--accent)"/>
              </g>
              <text className="anim-fade-2" x={(C.x + D.x)/2} y={C.y - 80} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fill="var(--accent)">
                (i, j) → cᵢⱼ = 7.3
              </text>

              <path className="anim-draw anim-draw-4"
                    d={`M ${D.x - 36} ${D.y + 14} Q ${(C.x+D.x)/2} ${D.y + 60} ${C.x + 30} ${C.y + 14}`}
                    fill="none" stroke="var(--accent-2)" strokeWidth={5} strokeLinecap="round"
                    style={{ "--len": 520 }}/>
              <g className="anim-appear" style={{ "--appear-delay": "2200ms" }}
                 transform={`translate(${C.x + 30}, ${C.y + 14}) rotate(193.3)`}>
                <polygon points="-16,-10 0,0 -16,10" fill="var(--accent-2)"/>
              </g>
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

          <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 32, lineHeight: 1.22 }}>
              An <em>arc</em> is an <em>ordered pair</em> <span style={{ fontFamily: "var(--font-mono)" }}>a = (i, j)</span>: <em>i</em> is the <em>tail</em>, <em>j</em> is the <em>head</em>. A graph whose links are arcs is a <em>directed graph</em> — or <em>digraph</em>. The set of all arcs is written <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>A(G)</span>, and replaces <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>E(G)</span>: the difference is that here order matters — <span style={{ fontFamily: "var(--font-mono)" }}>(i, j)</span> and <span style={{ fontFamily: "var(--font-mono)" }}>(j, i)</span> are two distinct arcs.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 24px" }}>
              <div className="kicker" style={{ fontSize: 22, marginBottom: 8 }}>Notation</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, lineHeight: 1.55 }}>
                A(G) ⊆ V × V &nbsp;<span style={{ color: "var(--ink-3)" }}>(ordered pairs)</span><br/>
                (i, j) ≠ (j, i) &nbsp;<span style={{ color: "var(--ink-3)" }}>and in general</span> cᵢⱼ ≠ cⱼᵢ
              </div>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// GRAPH CONCEPT — DIGRAPH (directed graph)
// ==========================================================
function SlideDigraph() {
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

  // Four nodes forming a small digraph with asymmetric costs
  const nodes = [
    { x: 260, y: 220, label: "A" },
    { x: 740, y: 220, label: "B" },
    { x: 740, y: 560, label: "C" },
    { x: 260, y: 560, label: "D" },
  ];
  // Arcs: [from, to, cost, curveDir] — curveDir shifts the label above or below
  const arcs = [
    [0, 1, "4.2", -1],
    [1, 0, "7.8", +1],
    [1, 2, "3.1", -1],
    [2, 3, "5.5", -1],
    [3, 0, "2.9", -1],
    [0, 2, "9.0",  0],
  ];

  const r = 30;

  // Returns { d, mx, my, ax, ay, angle } for both straight and curved arcs
  function computeArc(a, b, curve) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    const x1 = a.x + ux * r, y1 = a.y + uy * r;
    const x2 = b.x - ux * r, y2 = b.y - uy * r;
    if (curve === 0) {
      return {
        d: `M ${x1} ${y1} L ${x2} ${y2}`,
        mx: (x1 + x2) / 2, my: (y1 + y2) / 2,
        ax: x2, ay: y2,
        angle: Math.atan2(dy, dx) * 180 / Math.PI,
      };
    }
    // Canonical perpendicular (same node-order regardless of direction → A→B and B→A curve apart)
    const [p, q] = (a.x < b.x || (a.x === b.x && a.y < b.y)) ? [a, b] : [b, a];
    const cl = Math.hypot(q.x - p.x, q.y - p.y);
    const cpx = -(q.y - p.y) / cl, cpy = (q.x - p.x) / cl;
    const cx = (a.x + b.x) / 2 + cpx * 60 * curve;
    const cy = (a.y + b.y) / 2 + cpy * 60 * curve;
    // Tangent at bezier endpoint = direction from control point to endpoint
    return {
      d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`,
      mx: cx, my: cy,
      ax: x2, ay: y2,
      angle: Math.atan2(y2 - cy, x2 - cx) * 180 / Math.PI,
    };
  }

  return (
    <section ref={sectionRef} className="slide" data-label="Graph concepts — Digraph">
      <SlideFrame>
        <div className="tag">Graph theory · Digraph</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          A <em style={{ color: "var(--accent)" }}>digraph</em> models asymmetric travel costs.
        </h2>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 70, flex: 1, alignItems: "center" }}>
          {/* Left — definition */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 33, lineHeight: 1.25 }}>
              A <em>directed graph</em> — or <em>digraph</em> — replaces edges with arcs. The arc set <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>A(G)</span> collects ordered pairs: going from i to j is a different arc than going from j to i, and the two costs need not be equal.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 24px" }}>
              <div className="kicker" style={{ fontSize: 20, marginBottom: 8 }}>When to use a digraph in VRP</div>
              <ul style={{ margin: 0, paddingLeft: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                <li style={{ fontSize: 24, color: "var(--ink-2)", lineHeight: 1.35 }}><em>One-way streets</em> — arc (i, j) exists but (j, i) does not.</li>
                <li style={{ fontSize: 24, color: "var(--ink-2)", lineHeight: 1.35 }}><em>Asymmetric road times</em> — uphill vs. downhill, traffic direction.</li>
                <li style={{ fontSize: 24, color: "var(--ink-2)", lineHeight: 1.35 }}><em>Pickup-and-delivery</em> — precedence forces a specific arc direction.</li>
              </ul>
            </div>

            <div className="body small" style={{ color: "var(--ink-3)", fontSize: 22, lineHeight: 1.35 }}>
              When cᵢⱼ = cⱼᵢ for all pairs the digraph reduces to an undirected graph — the two representations are equivalent.
            </div>
          </div>

          {/* Right — digraph SVG */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 780" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-dig" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect width={1000} height={780} fill="url(#dotgrid-dig)" opacity={0.5}/>

              <g key={animKey}>
              {/* Phase 2 — arcs draw in after nodes */}
              {arcs.map(([ai, bi, cost, curve], i) => {
                const a = nodes[ai], b = nodes[bi];
                const { d, mx, my, ax, ay, angle: aAngle } = computeArc(a, b, curve);
                const arcDelay = 2800 + i * 700;
                const arrowDelay = arcDelay + 1100;
                const costDelay = arcDelay + 1200;
                return (
                  <g key={i}>
                    {/* Body draws first */}
                    <path d={d} fill="none" stroke="var(--accent)" strokeWidth={3}
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: 2000,
                            strokeDashoffset: 2000,
                            animation: "drawPath 1200ms both ease-in-out",
                            animationDelay: `${arcDelay}ms`,
                          }}/>
                    {/* Arrowhead appears after body finishes */}
                    <g transform={`translate(${ax}, ${ay}) rotate(${aAngle})`}>
                      <g style={{ animation: "fadeUp 150ms both ease-out", animationDelay: `${arrowDelay}ms` }}>
                        <polygon points="-13,-8 0,0 -13,8" fill="var(--accent)"/>
                      </g>
                    </g>
                    {/* Phase 3 — cost labels appear when their arc finishes */}
                    <g style={{ animation: "fadeUp 600ms both ease-out", animationDelay: `${costDelay}ms` }}>
                      <rect x={mx - 34} y={my - 18} width={68} height={32}
                            fill="var(--paper)" stroke="var(--accent)" strokeWidth={1.5} rx={4}/>
                      <text x={mx} y={my + 6} textAnchor="middle"
                            fontFamily="var(--font-mono)" fontSize={20} fill="var(--accent)">{cost}</text>
                    </g>
                  </g>
                );
              })}

              {/* Phase 1 — nodes appear first, staggered */}
              {nodes.map((n, i) => (
                <g key={i} style={{ animation: "fadeUp 800ms both ease-out", animationDelay: `${i * 600}ms` }}>
                  <circle cx={n.x} cy={n.y} r={r} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                  <text x={n.x} y={n.y + 10} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={26} fontWeight={600} fill="var(--ink)">
                    {n.label}
                  </text>
                </g>
              ))}

              </g>{/* end animKey group */}

              <text x={500} y={745} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-3)">
                FIG. — A→B costs 4.2, but B→A costs 7.8 (e.g. different road times).
              </text>
            </svg>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// ==========================================================
// GRAPH CONCEPT — FORWARD / BACKWARD STAR
// ==========================================================
function SlideStarNotation() {
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

  const r = 28;
  const ci = { x: 500, y: 390 };

  const surrounding = [
    { x: 200, y: 175, label: "a" },
    { x: 500, y: 105, label: "b" },
    { x: 820, y: 480, label: "c" },
    { x: 830, y: 195, label: "d" },
    { x: 720, y: 655, label: "e" },
    { x: 148, y: 615, label: "f" },
  ];
  const outIdx = [0, 1, 2];
  const inIdx  = [3, 4, 5];

  function computeStraightArc(from, to) {
    const dx = to.x - from.x, dy = to.y - from.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    const x1 = from.x + ux * r, y1 = from.y + uy * r;
    const x2 = to.x  - ux * r, y2 = to.y  - uy * r;
    return { x1, y1, x2, y2, arcLen: Math.hypot(x2 - x1, y2 - y1), angle: Math.atan2(dy, dx) * 180 / Math.PI };
  }

  // Timing
  const surroundStagger = 210;
  const nodesEnd = 400 + (surrounding.length - 1) * surroundStagger + 500 + 250;
  const arcDraw = 520, arcGap = 370, arrowOff = arcDraw - 70;
  const outStart = nodesEnd;
  const labelPlusDelay = outStart + outIdx.length * arcGap + arcDraw + 180;
  const inStart = labelPlusDelay + 550;
  const labelMinusDelay = inStart + inIdx.length * arcGap + arcDraw + 180;

  return (
    <section ref={sectionRef} className="slide" data-label="Graph concepts — Star notation">
      <SlideFrame>
        <div className="tag">Graph theory · Digraph · Star notation</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          <em style={{ color: "var(--accent)" }}>Forward</em> and{" "}
          <em style={{ color: "var(--accent-2)" }}>backward</em> star of a vertex.
        </h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 70, flex: 1, alignItems: "center" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 32, lineHeight: 1.25 }}>
              For a vertex <span style={{ fontFamily: "var(--font-mono)" }}>i</span> in a digraph, its incident arcs split into two <em>stars</em>.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderLeft: "6px solid var(--accent)", padding: "18px 24px", fontFamily: "var(--font-mono)", fontSize: 24, lineHeight: 1.65 }}>
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>δ⁺(i)</span>
              <span style={{ color: "var(--ink-2)" }}> = forward star</span><br/>
              <span style={{ color: "var(--ink-3)", fontSize: 19 }}>all arcs <em>leaving</em> i &nbsp;=&nbsp; {"{ (i,j) ∈ A }"}</span>
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderLeft: "6px solid var(--accent-2)", padding: "18px 24px", fontFamily: "var(--font-mono)", fontSize: 24, lineHeight: 1.65 }}>
              <span style={{ color: "var(--accent-2)", fontWeight: 700 }}>δ⁻(i)</span>
              <span style={{ color: "var(--ink-2)" }}> = backward star</span><br/>
              <span style={{ color: "var(--ink-3)", fontSize: 19 }}>all arcs <em>entering</em> i &nbsp;=&nbsp; {"{ (j,i) ∈ A }"}</span>
            </div>

            <div className="body small" style={{ color: "var(--ink-3)", fontSize: 20, lineHeight: 1.4 }}>
              Flow conservation at <span style={{ fontFamily: "var(--font-mono)" }}>i</span>:<br/>
              <span style={{ fontFamily: "var(--font-mono)" }}>
                Σ<sub>δ⁺(i)</sub> x<sub>ij</sub> &minus; Σ<sub>δ⁻(i)</sub> x<sub>ji</sub> = b<sub>i</sub>
              </span>
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 780" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-star" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect width={1000} height={780} fill="url(#dotgrid-star)" opacity={0.5}/>

              <g key={animKey}>

                {/* Outgoing arcs — δ⁺(i) */}
                {outIdx.map((ni, i) => {
                  const { x1, y1, x2, y2, arcLen, angle } = computeStraightArc(ci, surrounding[ni]);
                  const delay = outStart + i * arcGap;
                  return (
                    <g key={`out-${i}`}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="var(--accent)" strokeWidth={3.5} strokeLinecap="round"
                            style={{ "--len": arcLen, strokeDasharray: arcLen, strokeDashoffset: arcLen,
                                     animation: `drawPath ${arcDraw}ms both ease-out`,
                                     animationDelay: `${delay}ms` }}/>
                      <g transform={`translate(${x2},${y2}) rotate(${angle})`}>
                        <g style={{ animation: "fadeUp 150ms both ease-out", animationDelay: `${delay + arrowOff}ms` }}>
                          <polygon points="-14,-8 0,0 -14,8" fill="var(--accent)"/>
                        </g>
                      </g>
                    </g>
                  );
                })}

                {/* δ⁺(i) badge */}
                <g style={{ animation: "fadeUp 500ms both ease-out", animationDelay: `${labelPlusDelay}ms` }}>
                  <rect x={310} y={262} width={154} height={44} rx={8}
                        fill="var(--paper)" stroke="var(--accent)" strokeWidth={2.5}/>
                  <text x={387} y={290} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={24} fontWeight={700} fill="var(--accent)">δ⁺(i)</text>
                </g>

                {/* Incoming arcs — δ⁻(i) */}
                {inIdx.map((ni, i) => {
                  const { x1, y1, x2, y2, arcLen, angle } = computeStraightArc(surrounding[ni], ci);
                  const delay = inStart + i * arcGap;
                  return (
                    <g key={`in-${i}`}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="var(--accent-2)" strokeWidth={3.5} strokeLinecap="round"
                            style={{ "--len": arcLen, strokeDasharray: arcLen, strokeDashoffset: arcLen,
                                     animation: `drawPath ${arcDraw}ms both ease-out`,
                                     animationDelay: `${delay}ms` }}/>
                      <g transform={`translate(${x2},${y2}) rotate(${angle})`}>
                        <g style={{ animation: "fadeUp 150ms both ease-out", animationDelay: `${delay + arrowOff}ms` }}>
                          <polygon points="-14,-8 0,0 -14,8" fill="var(--accent-2)"/>
                        </g>
                      </g>
                    </g>
                  );
                })}

                {/* δ⁻(i) badge */}
                <g style={{ animation: "fadeUp 500ms both ease-out", animationDelay: `${labelMinusDelay}ms` }}>
                  <rect x={536} y={474} width={154} height={44} rx={8}
                        fill="var(--paper)" stroke="var(--accent-2)" strokeWidth={2.5}/>
                  <text x={613} y={502} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={24} fontWeight={700} fill="var(--accent-2)">δ⁻(i)</text>
                </g>

                {/* Central node i — rendered on top of arcs */}
                <g style={{ animation: "fadeUp 600ms both ease-out", animationDelay: "0ms" }}>
                  <circle cx={ci.x} cy={ci.y} r={r + 4} fill="var(--ink)" stroke="var(--ink)" strokeWidth={3}/>
                  <text x={ci.x} y={ci.y + 10} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize={26} fontWeight={700} fill="var(--paper)">i</text>
                </g>

                {/* Surrounding nodes */}
                {surrounding.map((n, i) => (
                  <g key={i} style={{ animation: "fadeUp 500ms both ease-out", animationDelay: `${400 + i * surroundStagger}ms` }}>
                    <circle cx={n.x} cy={n.y} r={r} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
                    <text x={n.x} y={n.y + 9} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={22} fontWeight={600} fill="var(--ink)">
                      {n.label}
                    </text>
                  </g>
                ))}

                {/* Legend */}
                <g transform="translate(60, 734)">
                  <line x1={0} y1={-4} x2={36} y2={-4} stroke="var(--accent)" strokeWidth={3}/>
                  <polygon points="34,-12 46,-4 34,4" fill="var(--accent)"/>
                  <text x={54} y={2} fontFamily="var(--font-mono)" fontSize={19} fill="var(--ink-2)">δ⁺(i) — forward star</text>
                  <line x1={440} y1={-4} x2={476} y2={-4} stroke="var(--accent-2)" strokeWidth={3}/>
                  <polygon points="474,-12 486,-4 474,4" fill="var(--accent-2)"/>
                  <text x={494} y={2} fontFamily="var(--font-mono)" fontSize={19} fill="var(--ink-2)">δ⁻(i) — backward star</text>
                </g>

              </g>
            </svg>
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
  // A subset of edges — looks like a plausible road network [from, to, cost]
  const edges = [
    [0,1,3.2],[0,2,4.7],[0,3,5.1],[0,4,6.3],[0,5,5.8],[0,6,4.4],[0,7,3.9],[0,8,2.8],
    [1,2,2.1],[2,3,3.4],[3,4,2.9],[4,5,3.1],[5,6,2.5],[6,7,3.7],[7,8,2.3],[8,1,4.0],
  ];
  return (
    <section ref={sectionRef} className="slide" data-label="Graph concepts — Network">
      <SlideFrame>
        <div className="tag">Graph theory · Network</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          A <em style={{ color: "var(--accent)" }}>network</em> is a graph with a cost on every edge.
        </h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 70, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 34, lineHeight: 1.22 }}>
              A <em>weighted graph</em> — or <em>network</em> — is a graph &nbsp;
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>G = (V, E)</span> equipped with a <em>cost function</em> <span style={{ fontFamily: "var(--font-mono)" }}>c: E → ℝ</span>.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "20px 24px", fontFamily: "var(--font-mono)", fontSize: 22, lineHeight: 1.55 }}>
              V &nbsp; = &nbsp; vertex set &nbsp; <span style={{ color: "var(--ink-3)" }}>(|V| = n + 1)</span><br/>
              E &nbsp; = &nbsp; edge set &nbsp; <span style={{ color: "var(--ink-3)" }}>(A for arcs, if directed)</span><br/>
              cᵢⱼ &nbsp; = &nbsp; cost of edge (i, j)
            </div>
            <div className="body" style={{ color: "var(--ink-2)", fontSize: 25, lineHeight: 1.35 }}>
              In a VRP, <span style={{ fontFamily: "var(--font-mono)" }}>G</span> is typically the <em>complete graph</em> <span style={{ fontFamily: "var(--font-mono)" }}>Kₙ₊₁</span>: every pair of vertices is connected, and <span style={{ fontFamily: "var(--font-mono)" }}>cᵢⱼ</span> is the travel distance or time.
            </div>
            <div className="body small" style={{ color: "var(--ink-3)", fontSize: 20 }}>
              From the triple <span style={{ fontFamily: "var(--font-mono)" }}>(V, E, c)</span> an entire family of optimisation problems springs: TSP, CVRP, VRPTW, PDP…
            </div>
          </div>

          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
            <svg viewBox="0 0 1000 780" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="dotgrid-net" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="var(--line)"/>
                </pattern>
              </defs>
              <rect width={1000} height={780} fill="url(#dotgrid-net)" opacity={0.5}/>

              <g key={animKey}>
                {/* Phase 1 — tutti i nodi appaiono staggered (300ms l'uno) */}
                {N.map((n, i) => (
                  <g key={i} style={{ animation: "fadeUp 600ms both ease-out", animationDelay: `${i * 300}ms` }}>
                    <circle cx={n.x} cy={n.y} r={24} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3}/>
                    <text x={n.x} y={n.y + 8} textAnchor="middle"
                          fontFamily="var(--font-mono)" fontSize={22} fontWeight={600}
                          fill="var(--ink)">
                      {n.label}
                    </text>
                  </g>
                ))}

                {/* Phase 2 — edges + cost labels, dopo che tutti i nodi sono apparsi */}
                {edges.map(([a, b, cost], i) => {
                  const na = N[a], nb = N[b];
                  const len = Math.hypot(nb.x - na.x, nb.y - na.y);
                  const nodeR = 24;
                  const dx = (nb.x - na.x) / len, dy = (nb.y - na.y) / len;
                  const x1 = na.x + dx * nodeR, y1 = na.y + dy * nodeR;
                  const x2 = nb.x - dx * nodeR, y2 = nb.y - dy * nodeR;
                  const mx = (na.x + nb.x) / 2, my = (na.y + nb.y) / 2;
                  const nodesEnd = (N.length - 1) * 300 + 600;
                  const edgeDelay = nodesEnd + i * 120;
                  const costDelay = edgeDelay + 500;
                  return (
                    <g key={i}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="var(--accent)" strokeOpacity={0.55} strokeWidth={2.5}
                            style={{
                              strokeDasharray: len, strokeDashoffset: len, "--len": len,
                              animation: "drawPath 500ms both ease-out",
                              animationDelay: `${edgeDelay}ms`,
                            }}/>
                      <g style={{ animation: "fadeUp 400ms both ease-out", animationDelay: `${costDelay}ms` }}>
                        <rect x={mx - 24} y={my - 14} width={48} height={26}
                              fill="var(--paper)" stroke="var(--accent)" strokeWidth={1} rx={3}
                              opacity={0.9}/>
                        <text x={mx} y={my + 5} textAnchor="middle"
                              fontFamily="var(--font-mono)" fontSize={16} fill="var(--accent)">
                          {cost.toFixed(1)}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>

              {/* Legend */}
              <g transform="translate(40, 720)">
                <circle cx={12} cy={-4} r={12} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                <text x={34} y={3} fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-2)">node</text>
                <line x1={120} y1={-4} x2={180} y2={-4} stroke="var(--accent)" strokeWidth={2.5} opacity={0.7}/>
                <text x={192} y={3} fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink-2)">edge {"{"} i, j {"}"}</text>
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
  SlideIntroSection, SlideHistory, SlideWhoUsesIt, SlideNode, SlideNodeAttributes, SlideEdge, SlideSimpleGraph, SlideDirectedArc, SlideDigraph, SlideStarNotation, SlideNetwork,
});
