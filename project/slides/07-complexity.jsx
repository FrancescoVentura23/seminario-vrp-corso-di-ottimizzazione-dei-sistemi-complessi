/* =========================================================================
   VRP Seminar — Part VI: Complexity
   Slides: section header, NP-hardness & explosion, Why heuristics
   ========================================================================= */

function Slide16() {
  return (
    <section className="slide section-slide" data-label="Part IV — Complexity">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part VI of IX</div>
        <div>Slides 28 — 29</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Six</div>
        <div className="hero" style={{ fontSize: 240 }}>Complexity</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          Why the VRP is hard — and why heuristics matter in practice.
        </div>
      </div>
    </section>
  );
}


function Slide17() {
  const rows = [
    ["5", "60", "instant"],
    ["10", "3.6 · 10⁶", "ms"],
    ["15", "8.7 · 10¹¹", "minutes"],
    ["20", "1.2 · 10¹⁷", "centuries"],
    ["25", "3.1 · 10²²", "→ heat death"],
  ];
  return (
    <section className="slide" data-label="NP-hardness and explosion">
      <SlideFrame>
        <div className="tag">Complexity</div>
        <h2 className="title" style={{ marginTop: 28 }}>CVRP is NP-hard — enumeration doesn't scale.</h2>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, justifyContent: "center" }}>
            <div className="lede">
              The CVRP generalises the TSP — which is already NP-hard in the strong sense. Every known exact algorithm is, in the worst case, super-polynomial.
            </div>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 26px", fontFamily: "var(--font-mono)", fontSize: 24 }}>
              Hamiltonian circuits on n vertices:<br/>
              <span style={{ color: "var(--accent)" }}>{"(n - 1)! / 2"}</span> — factorial growth.
            </div>
            <div className="body small" style={{ color: "var(--ink-3)" }}>
              Adding capacity, time windows, or multiple vehicles only makes things worse.
            </div>
          </div>

          <div style={{ border: "1px solid var(--line)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: 34 }}>
              <thead>
                <tr style={{ background: "var(--ink)", color: "var(--paper)" }}>
                  <th style={{ padding: "18px 20px", textAlign: "left", fontSize: 25, letterSpacing: "0.1em", textTransform: "uppercase" }}>n</th>
                  <th style={{ padding: "18px 20px", textAlign: "right", fontSize: 25, letterSpacing: "0.1em", textTransform: "uppercase" }}>tours</th>
                  <th style={{ padding: "18px 20px", textAlign: "right", fontSize: 25, letterSpacing: "0.1em", textTransform: "uppercase" }}>@ 1 μs/tour</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "18px 20px", color: "var(--ink)" }}>{r[0]}</td>
                    <td style={{ padding: "18px 20px", textAlign: "right" }}>{r[1]}</td>
                    <td style={{ padding: "18px 20px", textAlign: "right", color: i >= 3 ? "var(--accent-2)" : "var(--ink-3)" }}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


function Slide18() {
  return (
    <section className="slide" data-label="Exact vs heuristic">
      <SlideFrame>
        <div className="tag">Complexity</div>
        <h2 className="title" style={{ marginTop: 28 }}>Two families of algorithms — two different promises.</h2>

        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, flex: 1 }}>
          {[
            {
              name: "Exact methods",
              sub: "Branch-and-bound · branch-and-cut · set covering",
              pros: ["Certificate of optimality", "Tight lower bounds via LP", "Benchmark results for research"],
              cons: ["Hundreds of vertices at most", "Minutes → hours per instance", "Brittle with added constraints"],
              bg: "var(--paper-2)", color: "var(--ink)",
            },
            {
              name: "Heuristics & metaheuristics",
              sub: "Clarke-Wright · Tabu · LNS · Genetic · ALNS",
              pros: ["Thousands of vertices, seconds", "Handle messy real constraints", "Re-optimise dynamically"],
              cons: ["No optimality guarantee", "Tuning required", "Quality varies by instance"],
              bg: "var(--ink)", color: "var(--paper)",
            },
          ].map((c, i) => (
            <div key={i} style={{ background: c.bg, color: c.color, padding: "44px 40px", border: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <div className="kicker" style={{ color: i === 1 ? "var(--paper-deep)" : "var(--ink-3)" }}>Approach {i+1}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 56, marginTop: 10 }}>{c.name}</div>
                <div className="body small" style={{ color: i === 1 ? "var(--paper-deep)" : "var(--ink-3)", marginTop: 8 }}>{c.sub}</div>
              </div>
              <div className="rule" style={{ background: i === 1 ? "rgba(255,255,255,0.15)" : "var(--line)" }}/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div className="kicker" style={{ color: "var(--accent-3)", marginBottom: 12 }}>+ strengths</div>
                  {c.pros.map((p, k) => <div key={k} style={{ fontSize: 34, lineHeight: 1.3, marginBottom: 8 }}>— {p}</div>)}
                </div>
                <div>
                  <div className="kicker" style={{ color: "var(--accent-2)", marginBottom: 12 }}>− limits</div>
                  {c.cons.map((p, k) => <div key={k} style={{ fontSize: 34, lineHeight: 1.3, marginBottom: 8 }}>— {p}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlideFrame>
    </section>
  );
}


Object.assign(window, { Slide16, Slide17, Slide18 });
