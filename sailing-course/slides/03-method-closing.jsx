/* =========================================================================
   Sailing English Course — Part III: Method & closing
   Slides: SlideLearning, SlideSafety, SlideClosing
   ========================================================================= */

function SlideLearning() {
  const cols = [
    { n: "01", h: "Confidence",    t: "Speaking up early, often, and without fear of mistakes — in a small, supportive group." },
    { n: "02", h: "Fluency",       t: "Built through repetition in real contexts — meals, sailing, errands ashore, evening games." },
    { n: "03", h: "Communication", t: "Listening, asking, negotiating, telling a story — the skills that outlast any grammar drill." },
  ];
  return (
    <section className="slide" data-label="Learning approach">
      <Topline left="Sailing English Course · III" right="Learning approach"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Method · Learning approach</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1600 }}>
          The course is built on <em className="acc">full immersion</em> — English used all day, in real, meaningful situations.
        </h2>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 60, flex: 1 }}>
        {cols.map((c, i) => (
          <div key={i} className={`anim-fade-${i + 2}`}
               style={{
                 display: "flex", flexDirection: "column", gap: 18,
                 paddingRight: i < 2 ? 50 : 0,
                 borderRight: i < 2 ? "1px solid var(--line)" : "none",
               }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 140, lineHeight: 0.9, color: "var(--accent)" }}>{c.n}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 42, lineHeight: 1.05, color: "var(--ink)" }}>{c.h}</div>
            <div className="body" style={{ fontSize: 26 }}>{c.t}</div>
          </div>
        ))}
      </div>

      <div className="anim-fade-5"
           style={{
             marginTop: 48, padding: "30px 36px", background: "var(--paper-2)",
             borderLeft: "4px solid var(--accent)",
             fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1.3,
             color: "var(--ink-2)", maxWidth: 1500,
           }}>
        The aim is to build confidence, fluency, and communication skills in a <em style={{ color: "var(--accent)" }}>natural way</em> — by living in English, not by studying it.
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideSafety() {
  const rows = [
    ["Skipper",   "A licensed professional in command of the boat, present 24/7."],
    ["Teacher",   "Constantly with the group, on board and ashore."],
    ["Equipment", "Life jackets, harnesses, briefings; sheltered Saronic waters."],
    ["Routine",   "Predictable schedule, defined boundaries, daily check-ins."],
  ];
  return (
    <section className="slide" data-label="Safety and supervision">
      <Topline left="Sailing English Course · III" right="Safety & supervision"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Method · Safety</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1600 }}>
          Students are <em className="acc">supervised at all times</em>, in a structured and carefully managed environment.
        </h2>
      </div>

      <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 70, flex: 1, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div className="lede anim-fade-2" style={{ fontSize: 36 }}>
            I understand the importance of reassurance in this kind of experience. Every part of the day is planned with safety as the first constraint.
          </div>

          <div className="anim-fade-3" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px 28px", alignItems: "baseline" }}>
            {rows.map(([k, v], i) => (
              <React.Fragment key={i}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</div>
                <div className="body" style={{ fontSize: 26 }}>{v}</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="anim-fade-3" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 42, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="kicker" style={{ fontSize: 22 }}>A light note</div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <LifeRing/>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1.25, color: "var(--ink)" }}>
              I'm Australian and a confident swimmer — but naturally, all precautions are in place to keep that <em className="acc">purely theoretical</em>.
            </div>
          </div>
          <div className="rule"/>
          <div className="body small" style={{ fontSize: 22, color: "var(--ink-3)" }}>
            Reassurance comes first. Adventure stays within the lines we draw around it.
          </div>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideClosing() {
  return (
    <section className="slide section-slide" data-label="Get in touch">
      <Topline left="Sailing English Course · III" right="Get in touch"/>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1700 }}>
        <div className="kicker anim-fade" style={{ marginBottom: 28 }}>In closing</div>
        <h2 className="hero anim-fade-1" style={{ fontSize: 170 }}>
          Any questions?<br/>
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Please ask.</em>
        </h2>

        <div className="anim-fade-2" style={{ marginTop: 56, fontFamily: "var(--font-display)", fontSize: 42, lineHeight: 1.3, color: "var(--paper)", maxWidth: 1400 }}>
          Should you require any further information, please do not hesitate to contact me.
          I look forward to meeting your children and supporting them throughout this unique experience.
        </div>

        <div className="anim-fade-3" style={{ marginTop: 60, paddingTop: 30, borderTop: "1px solid rgba(243,236,219,0.25)", display: "flex", gap: 80, alignItems: "flex-end" }}>
          <div>
            <div className="kicker" style={{ fontSize: 22, color: "var(--paper-deep)", marginBottom: 8 }}>Kind regards</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 80, lineHeight: 1, color: "var(--paper)" }}>Chets</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--paper-deep)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 12 }}>
              English Teacher · Ten Days at Sea
            </div>
          </div>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


Object.assign(window, { SlideLearning, SlideSafety, SlideClosing });
