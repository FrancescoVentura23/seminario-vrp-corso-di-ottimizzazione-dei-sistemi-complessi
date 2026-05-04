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
        <div>Slides 55 — 58</div>
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
                <svg viewBox="0 0 600 400" style={{ width: "100%", height: 260, display: "block" }}>
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


Object.assign(window, { Slide24, Slide25, Slide26 });
