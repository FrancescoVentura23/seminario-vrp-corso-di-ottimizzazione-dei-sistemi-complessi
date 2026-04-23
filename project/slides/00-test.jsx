/* =========================================================================
   VRP Seminar — Slide 00: Test placeholder ("SLIDE DI PROVA")
   ========================================================================= */

function SlideTestProva() {
  return (
    <section className="slide" data-label="Test">
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1
          className="hero"
          style={{
            fontSize: "clamp(96px, 14vw, 260px)",
            lineHeight: 0.95,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          SLIDE DI PROVA
        </h1>
      </div>
    </section>
  );
}


Object.assign(window, { SlideTestProva });
