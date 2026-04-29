/* =========================================================================
   VRP Seminar — Part IX: Applications & closing
   Slides: section header, Case studies, Takeaways, Closing / references
   ========================================================================= */

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

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {cases.map((c, i) => (
            <div key={i} style={{
              padding: "22px 28px",
              borderRight: (i % 2 === 0) ? "1px solid var(--line)" : "none",
              borderBottom: i < 4 ? "1px solid var(--line)" : "none",
              display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start",
              minHeight: 168,
            }}>
              <div>
                <div className="kicker" style={{ color: "var(--accent)" }}>{String(i+1).padStart(2,"0")}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 34, marginTop: 4, lineHeight: 1.05 }}>{c.t}</div>
                <div className="body small" style={{ color: "var(--ink-3)", marginTop: 8 }}>{c.v}</div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, letterSpacing: "0.08em", color: "var(--paper)", background: "var(--ink)", padding: "5px 10px", whiteSpace: "nowrap" }}>{c.model}</div>
            </div>
          ))}
        </div>
      </SlideFrame>
    </section>
  );
}


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

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 0 }}>
          {pts.map(([h, d], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 32, padding: "20px 0", borderTop: "1px solid var(--line)", alignItems: "baseline" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 64, color: "var(--accent)", lineHeight: 1 }}>{String(i+1).padStart(2,"0")}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 38, lineHeight: 1.1 }}>{h}</div>
                <div className="body" style={{ color: "var(--ink-3)", marginTop: 6, fontSize: 26, lineHeight: 1.35 }}>{d}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }}/>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide30() {
  return (
    <section className="slide section-slide" data-label="Thank you">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ marginBottom: 24 }}>End of lecture</div>
        <div className="hero" style={{ fontSize: 220 }}>Questions?</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 40, marginTop: 32, maxWidth: 1400, lineHeight: 1.2 }}>
          Further reading — P. Toth & D. Vigo (eds.), <em>The Vehicle Routing Problem</em>, SIAM Monographs on Discrete Math., 2002.
        </div>

        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48, fontFamily: "var(--font-mono)", fontSize: 26, letterSpacing: "0.04em" }}>
          <div>
            <div style={{ color: "var(--paper-deep)", marginBottom: 8, fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase" }}>Course</div>
            <div>Optimization of Complex Systems</div>
            <div style={{ color: "var(--paper-deep)" }}>MSc Management Engineering</div>
          </div>
          <div>
            <div style={{ color: "var(--paper-deep)", marginBottom: 8, fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase" }}>Next lecture</div>
            <div>Exact methods — branch-and-cut for CVRP</div>
          </div>
          <div>
            <div style={{ color: "var(--paper-deep)", marginBottom: 8, fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase" }}>Try it yourself</div>
            <div>VRPLIB benchmarks · OR-Tools · PyVRP</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Register slides B

Object.assign(window, {
  Slide27, Slide28, Slide29, Slide30,
});
