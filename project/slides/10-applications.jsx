/* =========================================================================
   VRP Seminar — Part IX: Applications & closing
   Slides: section header, Case studies, Takeaways, Closing / references
   ========================================================================= */


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
  Slide29, Slide30,
});
