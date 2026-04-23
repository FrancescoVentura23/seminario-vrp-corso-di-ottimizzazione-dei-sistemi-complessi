/* =========================================================================
   Sailing English Course — Part II: The day at a glance
   Slides: SlideDaySection, SlideDayGrid, SlideMorning, SlideSailing,
           SlideLunch, SlideAfternoon, SlideFreeTime, SlideEvening
   ========================================================================= */

function SlideDaySection() {
  return (
    <section className="slide section-slide" data-label="The day at a glance">
      <Topline left="Part II of III" right="Daily structure"/>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker anim-fade" style={{ marginBottom: 36 }}>Part Two</div>
        <div className="hero anim-fade-1" style={{ fontSize: 240 }}>
          The day,<br/>
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>at a glance.</em>
        </div>
        <div className="anim-fade-2" style={{ fontFamily: "var(--font-display)", fontSize: 46, marginTop: 48, maxWidth: 1400, lineHeight: 1.18, color: "var(--paper)" }}>
          Each day follows a consistent and carefully planned routine — six time-blocks, from breakfast on board to evening games on deck.
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideDayGrid() {
  const blocks = [
    { n: "01", title: "Morning",   time: "~07:30", h: "Breakfast on board",    sub: "Students help prepare and tidy up." },
    { n: "02", title: "Sailing",   time: "~09:30", h: "Sailing session",       sub: "1–2 h to the next island. Skipper instruction.", accent: true },
    { n: "03", title: "Lunch",     time: "~13:00", h: "Lunch & social",        sub: "On board or at a local restaurant." },
    { n: "04", title: "Afternoon", time: "~15:00", h: "Speaking activities",   sub: "Role-plays, group tasks, confidence building." },
    { n: "05", title: "Free time", time: "~17:30", h: "Swim & relax",          sub: "Supervised, English used naturally." },
    { n: "06", title: "Evening",   time: "~20:00", h: "Dinner & games",        sub: "Storytelling, light group activities." },
  ];

  return (
    <section className="slide" data-label="Daily structure">
      <Topline left="Sailing English Course · II" right="Daily structure"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Daily structure · Six blocks</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1500 }}>
          Six time-blocks, repeated every day. <em className="acc">English throughout</em> — with one short, well-defined exception.
        </h2>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, border: "1px solid var(--line)", flex: 1 }}>
        {blocks.map((b, i) => {
          const row = i < 3 ? 0 : 1;
          const col = i % 3;
          const stripe = (row + col) % 2 === 1;
          return (
            <div key={i} className={`anim-fade-${Math.min(4, Math.floor(i / 2) + 2)}`}
                 style={{
                   padding: "36px 36px",
                   borderRight: col < 2 ? "1px solid var(--line)" : "none",
                   borderBottom: row === 0 ? "1px solid var(--line)" : "none",
                   background: stripe ? "var(--paper-2)" : "transparent",
                   display: "flex", flexDirection: "column", gap: 14,
                 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div className="kicker" style={{ fontSize: 22, color: b.accent ? "var(--accent)" : "var(--ink-3)" }}>
                  {b.n} · {b.title}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--ink-3)" }}>{b.time}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 42, lineHeight: 1.1, color: "var(--ink)" }}>{b.h}</div>
              <div className="body small" style={{ color: "var(--ink-2)", fontSize: 22 }}>{b.sub}</div>
            </div>
          );
        })}
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideMorning() {
  return (
    <section className="slide" data-label="Morning">
      <Topline left="Sailing English Course · II" right="01 · Morning"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Block 01 · Morning</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1500 }}>
          The day begins with <em className="acc">breakfast on board</em>.
        </h2>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, flex: 1, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div className="lede anim-fade-2" style={{ fontSize: 40 }}>
            Students help prepare and tidy up — encouraging <em className="sea">responsibility</em> and <em className="sea">teamwork</em> from the very first moments of the day.
          </div>
          <div className="body anim-fade-3" style={{ fontSize: 30, maxWidth: 760 }}>
            All communication happens in English: setting the table, asking for the milk, planning the day ahead. The boat is small enough that everyone is part of the conversation.
          </div>

          <div className="card anim-fade-4">
            <div className="kicker" style={{ fontSize: 22, marginBottom: 16 }}>What students do</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 32px", fontSize: 24, color: "var(--ink-2)" }}>
              <div>· Set the table together</div>
              <div>· Plan the day in English</div>
              <div>· Tidy up after eating</div>
              <div>· Check in with the teacher</div>
            </div>
          </div>
        </div>

        <div className="anim-fade-3" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SunriseCup/>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideSailing() {
  return (
    <section className="slide" data-label="Sailing session">
      <Topline left="Sailing English Course · II" right="02 · Sailing"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Block 02 · Sailing</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1600 }}>
          After breakfast, we sail to the <em className="sea">next destination</em> — about one to two hours.
        </h2>
      </div>

      <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, flex: 1, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div className="lede anim-fade-2" style={{ fontSize: 36 }}>
            The skipper gives sailing instruction — knots, points of sail, how to read the wind. Students take real turns at the helm.
          </div>

          <div className="anim-fade-3" style={{ background: "var(--ink)", color: "var(--paper)", padding: "32px 36px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="kicker" style={{ fontSize: 22, color: "var(--accent)" }}>An important note</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 38, lineHeight: 1.2 }}>
              For <em style={{ color: "var(--accent)" }}>safety and clarity</em>, the sailing session is the only time of day when <em style={{ color: "var(--accent)" }}>Italian may be used</em>.
            </div>
            <div className="body small" style={{ color: "#cfdff0", fontSize: 22, marginTop: 6 }}>
              When commands need to be unambiguous and instant, no one is asked to translate first. The rest of the day stays in English.
            </div>
          </div>
        </div>

        <div className="anim-fade-2" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 30, display: "flex", flexDirection: "column" }}>
          <div className="kicker" style={{ fontSize: 22, marginBottom: 14 }}>A sailing leg</div>
          <TackingPath/>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideLunch() {
  return (
    <section className="slide" data-label="Lunch & social">
      <Topline left="Sailing English Course · II" right="03 · Lunch & social"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Block 03 · Lunch &amp; social</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1600 }}>
          Students prepare and share <em className="acc">lunch together</em> on board, communicating in English.
        </h2>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, flex: 1, minHeight: 0 }}>
        <div className="anim-fade-2" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 48, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="kicker" style={{ fontSize: 22 }}>On board</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 1.05, color: "var(--ink)" }}>A galley meal, prepared together.</div>
          <div className="body" style={{ fontSize: 28 }}>
            Cooking, plating, washing up — every step is a chance to use functional English in context: <em className="sea">ingredients, requests, instructions, opinions</em>.
          </div>
        </div>

        <div className="anim-fade-3" style={{ background: "var(--ink)", color: "var(--paper)", padding: 48, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="kicker" style={{ fontSize: 22, color: "var(--accent)" }}>Some days</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 1.05 }}>A taverna ashore.</div>
          <div className="body" style={{ fontSize: 28, color: "#cfdff0" }}>
            On selected days we eat in a local restaurant — students order, ask questions, and practise English in a <em style={{ color: "var(--accent)" }}>real, public context</em>.
          </div>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideAfternoon() {
  const cards = [
    { n: "01", h: "Role-plays",         t: "Ordering at a taverna, asking for directions in the harbour, introducing yourself to a new group — short scenarios, real situations." },
    { n: "02", h: "Group tasks",        t: "Small-team challenges that require negotiation and shared decisions in English — planning the next stop, designing a menu, building a story." },
    { n: "03", h: "Confidence building", t: "Short, low-stakes presentations to the rest of the group: a place visited, a meal cooked, a story made up. Speaking out loud, every day." },
  ];
  return (
    <section className="slide" data-label="Afternoon activities">
      <Topline left="Sailing English Course · II" right="04 · Afternoon"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Block 04 · Afternoon</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1500 }}>
          Structured activities focused on <em className="acc">speaking</em>, practical use, and <em className="acc">confidence</em>.
        </h2>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, border: "1px solid var(--line)", flex: 1 }}>
        {cards.map((c, i) => (
          <div key={i} className={`anim-fade-${i + 2}`}
               style={{
                 padding: 40,
                 borderRight: i < 2 ? "1px solid var(--line)" : "none",
                 background: i === 1 ? "var(--paper-2)" : "transparent",
                 display: "flex", flexDirection: "column", gap: 18,
               }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 80, lineHeight: 1, color: "var(--accent)" }}>{c.n}</div>
            <div className="kicker" style={{ fontSize: 22 }}>{c.h}</div>
            <div className="body" style={{ fontSize: 26 }}>{c.t}</div>
          </div>
        ))}
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideFreeTime() {
  return (
    <section className="slide" data-label="Free time">
      <Topline left="Sailing English Course · II" right="05 · Free time"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Block 05 · Free time</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1600 }}>
          Students <em className="sea">relax, swim, and socialise</em> — in a supervised environment, continuing to use English naturally.
        </h2>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, flex: 1, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div className="lede anim-fade-2" style={{ fontSize: 36 }}>
            Free time isn't a break <em>from</em> learning — it's the moment when language becomes <em className="sea">effortless</em>.
          </div>
          <div className="body anim-fade-3" style={{ fontSize: 28 }}>
            When teenagers laugh, argue about music, plan a swim or compare snorkelling finds, they stop translating in their heads. That's where fluency is built.
          </div>

          <div className="card anim-fade-4">
            <div className="kicker" style={{ fontSize: 22, marginBottom: 14 }}>Always supervised</div>
            <div className="body small" style={{ fontSize: 24 }}>
              Every swim and every shore visit happens within sight of the teacher and skipper, with clearly defined boundaries and times.
            </div>
          </div>
        </div>

        <div className="anim-fade-3" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SwimmerScene/>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


function SlideEvening() {
  const rows = [
    ["Games",        "Card games, charades, word games — always in English."],
    ["Storytelling", "Group story-building under the stars: each student adds a sentence."],
    ["Reflection",   "A short closing of the day — what we learned, what we said for the first time."],
  ];
  return (
    <section className="slide" data-label="Evening">
      <Topline left="Sailing English Course · II" right="06 · Evening"/>

      <div style={{ marginTop: 80 }}>
        <div className="tag anim-fade">Block 06 · Evening</div>
        <h2 className="title anim-fade-1" style={{ marginTop: 24, maxWidth: 1600 }}>
          Dinner together, then <em className="acc">light group activities</em> on deck.
        </h2>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, flex: 1, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div className="lede anim-fade-2" style={{ fontSize: 36 }}>
            Dinner is prepared together on board, or — on selected evenings — taken at a local restaurant.
          </div>

          <div className="anim-fade-3" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px 32px", alignItems: "baseline" }}>
            {rows.map(([k, v], i) => (
              <React.Fragment key={i}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</div>
                <div className="body" style={{ fontSize: 26 }}>{v}</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="anim-fade-3" style={{ background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <MoonNightScene/>
        </div>
      </div>

      <SlideFrame/>
    </section>
  );
}


Object.assign(window, {
  SlideDaySection, SlideDayGrid,
  SlideMorning, SlideSailing, SlideLunch, SlideAfternoon, SlideFreeTime, SlideEvening,
});
