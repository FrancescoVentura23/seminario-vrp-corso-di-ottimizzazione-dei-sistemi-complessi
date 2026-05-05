/* =========================================================================
   VRP Seminar — Part VIII: Live demo
   Slides: section header, Clarke-Wright idea, Interactive demo
   (ClarkeWrightDemo component lives in demo.jsx)
   ========================================================================= */

function Slide24() {
  return (
    <section className="slide section-slide" data-label="Part VIII — Live demo">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part VIII of IX</div>
        <div>Slides 57 — 60</div>
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


function SlideClarkeWrightIntro() {
  const steps = [
    {
      n: "01",
      h: "Setting",
      b: "CVRP: n customers, one depot. The number of vehicles K is a decision variable — not fixed in advance. The algorithm works for both symmetric and asymmetric distance matrices.",
    },
    {
      n: "02",
      h: "Initial solution — n dedicated round-trips",
      b: "Create one route (0, i, 0) per customer i = 1, …, n. Every customer is served by its own vehicle. Feasible, but maximally wasteful — no shared legs.",
    },
    {
      n: "03",
      h: "Savings — the key quantity",
      b: "Merging (0, …, i, 0) with (0, j, …, 0) into one route (0, …, i, j, …, 0) eliminates two depot legs and generates a saving s(i, j) = c(i,0) + c(0,j) − c(i,j). Compute all savings, sort in non-increasing order.",
    },
    {
      n: "04",
      h: "Greedy merge — parallel version (dominant in practice)",
      b: "Scan the savings list from the top. For each s(i,j): if the route containing arc (i,0) and the route containing arc (0,j) can be feasibly merged — combined load ≤ Q, both i and j are at depot-adjacent endpoints — merge them by deleting (i,0) and (0,j) and introducing (i,j). Repeat until no feasible merge remains.",
    },
  ];

  return (
    <section className="slide" data-label="Clarke-Wright — what and why">
      <SlideFrame>
        <div className="tag">Clarke–Wright (1964) · Laporte &amp; Semet in Toth &amp; Vigo §5.2.1</div>
        <h2 className="title" style={{ marginTop: 20 }}>
          The savings algorithm — builds CVRP routes by merging round-trips greedily.
        </h2>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
          {steps.map(({ n, h, b }) => (
            <div key={n} style={{
              display: "grid",
              gridTemplateColumns: "64px 1fr",
              gap: 24,
              padding: "14px 0",
              borderTop: "1px solid var(--line)",
              alignItems: "start",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 46,
                lineHeight: 1,
                color: "var(--accent)",
              }}>{n}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.1 }}>{h}</div>
                <div style={{ fontSize: 21, color: "var(--ink-2)", marginTop: 5, lineHeight: 1.45 }}>{b}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }}/>
        </div>

        <div style={{
          marginTop: 16,
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "12px 20px",
          fontFamily: "var(--font-mono)",
          fontSize: 20,
          lineHeight: 1.4,
        }}>
          Step 1 complexity: <span style={{ color: "var(--accent-2)" }}>O(n²)</span> savings to compute
          &nbsp;+&nbsp;<span style={{ color: "var(--accent-2)" }}>O(n² log n)</span> to sort.
          &nbsp;·&nbsp; A sequential version also exists — parallel dominates (Toth &amp; Vigo, Table 5.1).
        </div>

      </SlideFrame>
    </section>
  );
}


function Slide25() {
  return (
    <section className="slide" data-label="Clarke-Wright idea">
      <SlideFrame>
        <div className="tag">Clarke–Wright (1964)</div>
        <h2 className="title" style={{ marginTop: 28 }}>The savings idea — merge two round-trips if it shortens the total.</h2>

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {[
            {
              t: "Before merging",
              desc: "Two separate round-trips: 0 → i → 0 and 0 → j → 0.",
              svg: (
                <svg viewBox="0 0 600 400" style={{ width: "100%", height: 260, display: "block" }}>
                  <rect x={300-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
                  {/* Two round-trips, each is depot → customer → depot. Arrows
                      on every leg make the round-trip nature explicit. back=18
                      clears node r=14 and depot half-side=16. */}
                  <polyline points="300,320 150,120 300,320" fill="none" stroke="var(--route-1)" strokeWidth={3.5} strokeDasharray="6 6"/>
                  <polyline points="300,320 470,120 300,320" fill="none" stroke="var(--route-1)" strokeWidth={3.5} strokeDasharray="6 6"/>
                  {(() => {
                    // Edges: depot→i, i→depot, depot→j, j→depot
                    const edges = [[300,320,150,120],[150,120,300,320],[300,320,470,120],[470,120,300,320]];
                    return edges.map(([x1,y1,x2,y2], k) => {
                      const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy);
                      const ux=dx/L, uy=dy/L;
                      const back=18, aw=6, al=12;
                      const tipX=x2-ux*back, tipY=y2-uy*back;
                      const bx=tipX-ux*al, by=tipY-uy*al;
                      const pts=`${tipX.toFixed(1)},${tipY.toFixed(1)} ${(bx-uy*aw).toFixed(1)},${(by+ux*aw).toFixed(1)} ${(bx+uy*aw).toFixed(1)},${(by-ux*aw).toFixed(1)}`;
                      return <polygon key={k} points={pts} fill="var(--route-1)"/>;
                    });
                  })()}
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
                <svg viewBox="0 0 600 400" style={{ width: "100%", height: 260, display: "block" }}>
                  <rect x={300-16} y={320-16} width={32} height={32} fill="var(--depot)"/>
                  <polyline points="300,320 150,120 470,120 300,320" fill="none" stroke="var(--route-2)" strokeWidth={4}/>
                  {(() => {
                    // Single merged route 0 → i → j → 0
                    const edges = [[300,320,150,120],[150,120,470,120],[470,120,300,320]];
                    return edges.map(([x1,y1,x2,y2], k) => {
                      const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy);
                      const ux=dx/L, uy=dy/L;
                      const back=18, aw=6, al=12;
                      const tipX=x2-ux*back, tipY=y2-uy*back;
                      const bx=tipX-ux*al, by=tipY-uy*al;
                      const pts=`${tipX.toFixed(1)},${tipY.toFixed(1)} ${(bx-uy*aw).toFixed(1)},${(by+ux*aw).toFixed(1)} ${(bx+uy*aw).toFixed(1)},${(by-ux*aw).toFixed(1)}`;
                      return <polygon key={k} points={pts} fill="var(--route-2)"/>;
                    });
                  })()}
                  <circle cx={150} cy={120} r={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={150} y={125} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600}>i</text>
                  <circle cx={470} cy={120} r={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2}/>
                  <text x={470} y={125} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fontWeight={600}>j</text>
                </svg>
              ),
              cost: <>c(0,i) + c(i,j) + c(j,0)</>
            },
          ].map((c, i) => (
            <div key={i} style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="kicker">{c.t}</div>
              <div>{c.svg}</div>
              <div className="body small" style={{ color: "var(--ink-3)" }}>{c.desc}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, background: "var(--paper)", border: "1px solid var(--line)", padding: "10px 14px" }}>{c.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: "var(--ink)", color: "var(--paper)", padding: "18px 24px", fontFamily: "var(--font-mono)", fontSize: 26 }}>
          savings &nbsp;<span style={{ color: "var(--accent-2)" }}>s(i, j) = c(0, i) + c(0, j) − c(i, j)</span> &nbsp; → merge pair with largest positive saving that remains feasible.
        </div>
      </SlideFrame>
    </section>
  );
}


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


Object.assign(window, { Slide24, SlideClarkeWrightIntro, Slide25, Slide26 });
