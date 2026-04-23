/* =========================================================================
   Sailing English Course — Part I: Cover & introduction
   Slides: SlideCover, SlideLetter, SlideOverview, SlideRoute
   ========================================================================= */

function SlideCover() {
  return (
    <section className="slide" data-label="Cover">
      <Topline left="Sailing English Course · 2026" right="Athens · Saronic Islands"/>

      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 80, marginTop: 80 }}>
        <div style={{ flex: 1.15 }}>
          <div className="kicker anim-fade" style={{ marginBottom: 24 }}>A ten-day programme</div>
          <h1 className="hero anim-fade-1" style={{ fontSize: 170 }}>
            Ten<br/>days<br/><em className="acc" style={{ fontStyle: "italic" }}>at sea.</em>
          </h1>
          <div className="anim-fade-2" style={{ marginTop: 36, fontSize: 30, color: "var(--ink-2)", maxWidth: 820, lineHeight: 1.32, fontFamily: "var(--font-display)" }}>
            English in full immersion, on board a sailing boat between the islands of the Saronic Gulf.
          </div>

          <div className="anim-fade-3" style={{ marginTop: 44, paddingTop: 26, borderTop: "1px solid var(--line)" }}>
            <div className="kicker" style={{ fontSize: 22, marginBottom: 10 }}>Your teacher</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, color: "var(--ink)" }}>Chets</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, letterSpacing: "0.06em", color: "var(--ink-3)", marginTop: 10, textTransform: "uppercase" }}>
              English Teacher · A letter to parents
            </div>
          </div>
        </div>

        <div className="anim-fade-2" style={{ flex: 1, height: 620, background: "var(--paper-2)", border: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
          <SailingBoat/>
        </div>
      </div>

      <div className="slide-chrome">
        <div className="left">
          <span>Sailing Course</span>
          <span>·</span>
          <span>2026</span>
        </div>
        <div className="pg" data-chrome-pg>00 / 00</div>
      </div>
    </section>
  );
}


function SlideLetter() {
  return (
    <section className="slide" data-label="A letter to parents">
      <Topline left="Sailing English Course · I" right="A letter to parents"/>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1500, marginTop: 80 }}>
        <div className="tag anim-fade">Welcome aboard</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 30, fontSize: 96 }}>
          Dear parents,<br/>
          <em className="acc">a few words</em> before we set sail.
        </h2>

        <div className="anim-fade-2" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div className="lede" style={{ fontSize: 38, lineHeight: 1.32 }}>
            My name is Chets, and I will be the English teacher accompanying your children on the upcoming
            ten-day sailing course in Greece, departing from Athens.
          </div>
          <div className="body" style={{ fontSize: 30, color: "var(--ink-3)", lineHeight: 1.42 }}>
            I would like to take this opportunity to introduce the structure of the programme and to
            reassure you about the learning environment your children will experience — what each
            day looks like, how English is used, and how safety is handled at every step.
          </div>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideOverview() {
  return (
    <section className="slide" data-label="Programme overview">
      <Topline left="Sailing English Course · I" right="Programme overview"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Programme · Overview</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1500 }}>
          A ten-day course that combines <em className="acc">English language learning</em> with a
          structured daily routine — in a unique, engaging environment.
        </h2>
      </div>

      <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, border: "1px solid var(--line)", flex: 1 }}>
        <div className="anim-fade-2" style={{ padding: "48px 44px", borderRight: "1px solid var(--line)", background: "var(--paper-2)", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 96, lineHeight: 1, color: "var(--accent)" }}>10</div>
          <div className="kicker" style={{ fontSize: 22 }}>Days on the water</div>
          <div className="body" style={{ fontSize: 28 }}>
            Students live on board a sailing boat for the entire course, returning to Athens at the end.
          </div>
        </div>
        <div className="anim-fade-3" style={{ padding: "48px 44px", borderRight: "1px solid var(--line)", background: "var(--paper-2)", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 96, lineHeight: 1, color: "var(--accent)" }}>100<span style={{ fontSize: 48 }}>%</span></div>
          <div className="kicker" style={{ fontSize: 22 }}>English, all day</div>
          <div className="body" style={{ fontSize: 28 }}>
            Full immersion: English is the language of the boat, the meals, the games and the islands.
          </div>
        </div>
        <div className="anim-fade-4" style={{ padding: "48px 44px", background: "var(--paper-2)", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 96, lineHeight: 1, color: "var(--accent)" }}>Σ<span style={{ fontSize: 42, fontStyle: "italic" }}>aronic</span></div>
          <div className="kicker" style={{ fontSize: 22 }}>A Greek itinerary</div>
          <div className="body" style={{ fontSize: 28 }}>
            We sail between the islands of the Saronic Gulf, just south of Athens — short, calm legs.
          </div>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideRoute() {
  const stops = [
    ["DAY 1",     "Athens — boarding",    "Welcome on board, safety briefing, first dinner."],
    ["DAYS 2–3",  "Aegina",               "Pistachio town, harbour walks, first immersion days."],
    ["DAYS 4–6",  "Poros & Hydra",        "Quiet anchorages, role-plays in tavernas, swims."],
    ["DAYS 7–8",  "Spetses",              "Group projects, presentations on board."],
    ["DAYS 9–10", "Return to Athens",     "Final dinner, hand-off to families."],
  ];

  return (
    <section className="slide" data-label="The route">
      <Topline left="Sailing English Course · I" right="The route"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Programme · The route</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1500 }}>
          From Athens, looping through the <em className="sea">Saronic Gulf</em> — short hops between
          islands, protected waters, gentle winds.
        </h2>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, flex: 1, minHeight: 0 }}>
        <div className="anim-fade-2" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, position: "relative" }}>
          <SaronicMap/>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="kicker anim-fade-2" style={{ fontSize: 22 }}>Indicative stops</div>
          {stops.map(([when, where, note], i) => (
            <div key={i} className={`anim-fade-${Math.min(6, i + 3)}`}
                 style={{
                   display: "grid", gridTemplateColumns: "auto 1fr", gap: 22, alignItems: "baseline",
                   paddingBottom: 18,
                   borderBottom: i < stops.length - 1 ? "1px solid var(--line)" : "none",
                 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--accent)", width: 120 }}>{when}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--ink)" }}>{where}</div>
                <div className="body small" style={{ color: "var(--ink-3)" }}>{note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


Object.assign(window, { SlideCover, SlideLetter, SlideOverview, SlideRoute });
