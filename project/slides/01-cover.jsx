/* =========================================================================
   VRP Seminar — Slide 01: Cover
   ========================================================================= */

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


Object.assign(window, { Slide01 });
