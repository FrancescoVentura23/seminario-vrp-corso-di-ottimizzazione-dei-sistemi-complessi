/* =========================================================================
   VRP Seminar — Part IV: Complexity
   Slides: section header, computational complexity intro, problem classes,
           exact algorithms, CVRP is NP-hard, why heuristics
   ========================================================================= */

function Slide16() {
  return (
    <section className="slide section-slide" data-label="Part IV — Complexity">
      <div style={{ position: "absolute", top: 80, left: 120, right: 120, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 31, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-deep)" }}>
        <div>Part IV of IX</div>
        <div>Slides 22 — 26</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 40 }}>Part Four</div>
        <div className="hero" style={{ fontSize: 240 }}>Complexity</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginTop: 40, maxWidth: 1400, lineHeight: 1.15, color: "var(--paper)" }}>
          Why the VRP is hard — and why heuristics matter in practice.
        </div>
      </div>
    </section>
  );
}


// -----------------------------------------------------------------------------
// Slide 22 — What is computational complexity?
// -----------------------------------------------------------------------------
function Slide17A() {
  // ---------------------------------------------------------------------------
  // Asymptotic upper bound chart — illustrates T(n) = O(f(n)) visually.
  // T(n) is a slightly noisy quadratic; c·f(n) = c · n² with c chosen so the
  // two curves cross around n = N0 = 14. For n < N0, T may sit ABOVE c·f(n);
  // for n ≥ N0 we have T(n) ≤ c·f(n) — that's the formal definition.
  // ---------------------------------------------------------------------------
  const T = (n) => 0.4 * n * n + 4 * n + 3 * Math.sin(0.6 * n);
  const F = (n) => 0.7 * n * n;            // c · f(n) with c = 0.7, f(n) = n²
  const N0   = 14;
  const nMax = 30;
  const yMax = 700;
  // Plot area inside the 400×280 viewBox: x ∈ [60, 380], y ∈ [20, 230].
  const xMap = (n) => 60 + (320 / nMax) * n;
  const yMap = (v) => 230 - (210 / yMax) * v;

  const samples = [];
  for (let i = 0; i <= 60; i++) samples.push(i * 0.5);   // n = 0, 0.5, …, 30

  const fmt   = (a, b) => `${a.toFixed(1)},${b.toFixed(1)}`;
  const tPath = samples.map(n => fmt(xMap(n), yMap(T(n)))).join(" ");
  const fPath = samples.map(n => fmt(xMap(n), yMap(F(n)))).join(" ");

  // Shaded region (n ≥ N0, where c·f(n) ≥ T(n)) — forward along T, back along F.
  const shadeS   = samples.filter(n => n >= N0);
  const shadeFwd = shadeS.map(n => fmt(xMap(n), yMap(T(n))));
  const shadeBwd = [...shadeS].reverse().map(n => fmt(xMap(n), yMap(F(n))));
  const shadePts = [...shadeFwd, ...shadeBwd].join(" ");

  const n0X = xMap(N0);

  return (
    <section className="slide" data-label="Computational complexity — Big-O">
      <SlideFrame>
        <div className="tag">Complexity · concepts</div>
        <h2 className="title" style={{ marginTop: 28 }}>How fast is "fast"? Measuring algorithms with Big-O.</h2>

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, flex: 1 }}>

          {/* Col 1 — definitions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 26, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 32, lineHeight: 1.3 }}>
              The <em>computational complexity</em> of an algorithm describes how the <em>number of elementary operations</em> it performs <em>grows</em> with the size of the input n.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 28px" }}>
              <div className="kicker" style={{ color: "var(--accent)", marginBottom: 10 }}>Big-O notation</div>
              <div style={{ fontSize: 26, lineHeight: 1.35 }}>
                We write <span style={{ fontFamily: "var(--font-mono)" }}>T(n) = O(f(n))</span> when the number of operations T(n) grows <em>no faster than</em> f(n), up to constants, as n → ∞.
              </div>
              {/* Legend — what each symbol means */}
              <div style={{
                marginTop: 16, paddingTop: 14,
                borderTop: "1px dashed var(--line)",
                display: "grid", gridTemplateColumns: "auto 1fr",
                columnGap: 18, rowGap: 8,
                fontSize: 24, lineHeight: 1.4,
              }}>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--ink)", fontWeight: 600 }}>n</div>
                <div style={{ color: "var(--ink-2)" }}>input size of the problem (e.g. for VRP / TSP, the number of nodes)</div>

                <div style={{ fontFamily: "var(--font-mono)", color: "var(--ink)", fontWeight: 600 }}>T(n)</div>
                <div style={{ color: "var(--ink-2)" }}>number of elementary operations the algorithm performs as a function of n</div>

                <div style={{ fontFamily: "var(--font-mono)", color: "var(--ink)", fontWeight: 600 }}>f(n)</div>
                <div style={{ color: "var(--ink-2)" }}>simple reference function that names the growth class — e.g. f(n) = n² means quadratic, f(n) = 2ⁿ means exponential. We never care about its constant: what matters is its shape.</div>
              </div>
              <div style={{ fontSize: 20, lineHeight: 1.4, color: "var(--ink-3)", marginTop: 14, fontStyle: "italic" }}>
                Constants and lower-order terms are ignored — what matters is the asymptotic shape of the curve.
              </div>
            </div>
          </div>

          {/* Col 2 — illustrative chart: asymptotic upper bound */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="kicker" style={{ color: "var(--accent)", marginBottom: 10 }}>Asymptotic upper bound — visual</div>
            <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet"
                 style={{ width: "100%", height: "auto", display: "block" }}>
              {/* Left zone (n < n₀) — neutral grey wash: bound may fail here */}
              <rect x={60} y={20} width={n0X - 60} height={210}
                    fill="var(--ink-3)" fillOpacity={0.07}/>
              {/* Right-zone shaded region (n ≥ n₀, c·f(n) ≥ T(n)) */}
              <polygon points={shadePts} fill="var(--accent)" fillOpacity={0.10}/>

              {/* Axes */}
              <line x1={60} y1={230} x2={380} y2={230} stroke="var(--ink-3)" strokeWidth={1.5}/>
              <line x1={60} y1={20}  x2={60}  y2={230} stroke="var(--ink-3)" strokeWidth={1.5}/>
              <polygon points="386,230 376,226 376,234" fill="var(--ink-3)"/>
              <polygon points="60,14 56,24 64,24"       fill="var(--ink-3)"/>

              {/* Axis labels */}
              <text x={388} y={246} fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-2)">n</text>
              <text x={68}  y={18}  fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-2)">T(n)</text>

              {/* n₀ marker */}
              <line x1={n0X} y1={20} x2={n0X} y2={230} stroke="var(--ink-3)" strokeWidth={1} strokeDasharray="4 4"/>
              <text x={n0X} y={250} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={15} fill="var(--ink-2)">n₀</text>

              {/* c·f(n) — dashed grey upper bound */}
              <polyline points={fPath} fill="none" stroke="var(--ink-2)" strokeWidth={2.2}
                        strokeDasharray="6 4" strokeLinejoin="round" strokeLinecap="round"/>
              {/* T(n) — solid coloured curve */}
              <polyline points={tPath} fill="none" stroke="var(--route-1)" strokeWidth={2.6}
                        strokeLinejoin="round" strokeLinecap="round"/>

              {/* Zone annotations — what the two regions mean */}
              <text x={(60 + n0X) / 2} y={34} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={11} fontStyle="italic"
                    fill="var(--ink-3)">small n — bound may not hold</text>
              <text x={(n0X + 380) / 2} y={34} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={11} fontWeight={500}
                    fill="var(--accent)">n ≥ n₀ — T ≤ c · f forever</text>

              {/* Legend (moved to bottom-right of the plot to leave the top
                  free for the zone annotations) */}
              <g transform="translate(238, 180)">
                <rect x={0} y={0} width={140} height={42} fill="var(--paper)" stroke="var(--line)" strokeWidth={1} rx={3}/>
                <line x1={10} y1={14} x2={36} y2={14} stroke="var(--route-1)" strokeWidth={2.6}/>
                <text x={44} y={18} fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink)">T(n)</text>
                <line x1={10} y1={32} x2={36} y2={32} stroke="var(--ink-2)"   strokeWidth={2.2} strokeDasharray="4 3"/>
                <text x={44} y={36} fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink)">c · f(n)</text>
              </g>
            </svg>
            <div style={{ fontSize: 20, color: "var(--ink-3)", marginTop: 12, fontStyle: "italic", lineHeight: 1.35 }}>
              For all <span style={{ fontFamily: "var(--font-mono)" }}>n ≥ n₀</span>, T(n) ≤ c · f(n) — the dashed curve <em>dominates</em> from there on. The behaviour for small n does not matter.
            </div>
          </div>

        </div>
      </SlideFrame>
    </section>
  );
}


// -----------------------------------------------------------------------------
// Slide 23 — Growth rates in practice
// -----------------------------------------------------------------------------
function Slide17AGrowth() {
  const rows = [
    { name: "O(log n)",  n10: "3",       n50: "6",        n100: "7",        n1000: "10",        verdict: "trivial",  color: "#16a34a" },
    { name: "O(n)",      n10: "10",      n50: "50",       n100: "100",      n1000: "10³",        verdict: "fast",     color: "#65a30d" },
    { name: "O(n²)",     n10: "10²",     n50: "2.5·10³",  n100: "10⁴",      n1000: "10⁶",        verdict: "ok",       color: "#ca8a04" },
    { name: "O(n³)",     n10: "10³",     n50: "1.3·10⁵",  n100: "10⁶",      n1000: "10⁹",        verdict: "slow",     color: "#ea580c" },
    { name: "O(2ⁿ)",     n10: "10³",     n50: "10¹⁵",     n100: "10³⁰",     n1000: "10³⁰¹",      verdict: "explodes", color: "#dc2626" },
    { name: "O(n!)",     n10: "3.6·10⁶", n50: "3·10⁶⁴",   n100: "9·10¹⁵⁷",  n1000: "10²⁵⁶⁷",     verdict: "explodes", color: "#9f1239" },
  ];

  return (
    <section className="slide" data-label="Complexity — growth rates">
      <SlideFrame>
        <div className="tag">Complexity · growth rates</div>
        <h2 className="title" style={{ marginTop: 28 }}>From trivial to impossible — how fast does complexity blow up?</h2>

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 50, flex: 1 }}>

          {/* Left — explanatory text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 26, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 32, lineHeight: 1.35 }}>
              Each cell shows the <em>number of elementary operations</em> an algorithm needs for that input size.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "22px 28px" }}>
              <div className="kicker" style={{ color: "var(--accent)", marginBottom: 10 }}>Reading the table</div>
              <div style={{ fontSize: 26, lineHeight: 1.4 }}>
                At <span style={{ fontFamily: "var(--font-mono)" }}>10<sup>9</sup></span> operations per second, anything up to <span style={{ fontFamily: "var(--font-mono)" }}>~10<sup>10</sup></span> is feasible in seconds. Beyond that, no hardware upgrade can save you — the problem is in the growth rate itself.
              </div>
            </div>

            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "18px 24px" }}>
              <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 8 }}>Why it matters</div>
              <div style={{ fontSize: 24, lineHeight: 1.35 }}>
                A polynomial-time algorithm scales to large instances. An exponential-time algorithm becomes <em>useless</em> beyond ~30–50 inputs — the constant factor cannot save you.
              </div>
            </div>
          </div>

          {/* Right — growth table */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ border: "1px solid var(--line)", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.8fr 0.9fr 0.9fr 0.9fr 1fr", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: 20, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                <div style={{ padding: "13px 16px" }}>complexity</div>
                <div style={{ padding: "13px 16px", textAlign: "right" }}>n=10</div>
                <div style={{ padding: "13px 16px", textAlign: "right" }}>n=50</div>
                <div style={{ padding: "13px 16px", textAlign: "right" }}>n=100</div>
                <div style={{ padding: "13px 16px", textAlign: "right" }}>n=1000</div>
                <div style={{ padding: "13px 16px", textAlign: "right" }}>verdict</div>
              </div>
              {rows.map((r, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1.1fr 0.8fr 0.9fr 0.9fr 0.9fr 1fr",
                  background: i % 2 === 0 ? "var(--paper-2)" : "var(--paper)",
                  borderTop: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 26,
                  borderLeft: `4px solid ${r.color}`,
                }}>
                  <div style={{ padding: "14px 16px", color: r.color, fontWeight: 600 }}>{renderNum(r.name)}</div>
                  <div style={{ padding: "14px 16px", textAlign: "right" }}>{renderNum(r.n10)}</div>
                  <div style={{ padding: "14px 16px", textAlign: "right" }}>{renderNum(r.n50)}</div>
                  <div style={{ padding: "14px 16px", textAlign: "right" }}>{renderNum(r.n100)}</div>
                  <div style={{ padding: "14px 16px", textAlign: "right" }}>{renderNum(r.n1000)}</div>
                  <div style={{ padding: "14px 16px", textAlign: "right", color: r.color, fontStyle: "italic" }}>{r.verdict}</div>
                </div>
              ))}
              <div style={{ padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-3)", borderTop: "1px solid var(--line)", background: "var(--paper-2)" }}>
                number of operations (≈ time at 10<sup>9</sup> ops/s — feasible up to ~10<sup>10</sup>)
              </div>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// -----------------------------------------------------------------------------
// Slide 24 — Classes of problems: P, NP, NP-hard, NP-complete
// -----------------------------------------------------------------------------
function Slide17B() {
  const classes = [
    {
      tag: "P",
      title: "Polynomial",
      desc: "Solvable in O(nᵏ) time for some constant k.",
      ex: "shortest path · sorting · linear programming",
      bg: "rgba(56,161,105,0.15)", border: "#38a169", tagColor: "#2d6a4f", text: "var(--ink)",
    },
    {
      tag: "NP",
      title: "Non-deterministic Polynomial",
      desc: "A candidate solution can be verified in polynomial time.",
      ex: "TSP · CVRP · SAT · graph colouring",
      bg: "rgba(107,74,245,0.10)", border: "var(--accent)", tagColor: "var(--accent)", text: "var(--ink)",
    },
    {
      tag: "NP-hard",
      title: "At least as hard as any NP problem",
      desc: "If solved in polynomial time, every NP problem could be too.",
      ex: "halting problem · bin packing · TSP · CVRP",
      bg: "rgba(217,70,89,0.10)", border: "var(--accent-2)", tagColor: "var(--accent-2)", text: "var(--ink)",
    },
    {
      tag: "NP-complete",
      title: "NP ∩ NP-hard",
      desc: "The hardest problems that still belong to NP.",
      ex: "SAT · TSP (decision) · CVRP (decision)",
      bg: "var(--ink)", border: "var(--ink)", tagColor: "var(--paper)", text: "var(--paper)",
    },
  ];

  return (
    <section className="slide" data-label="Complexity classes — P, NP, NP-hard">
      <SlideFrame>
        <div className="tag">Complexity · classes</div>
        <h2 className="title" style={{ marginTop: 28 }}>Not all problems are created equal.</h2>

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, flex: 1, alignItems: "stretch" }}>

          {/* Left — class cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
            {classes.map((c) => (
              <div key={c.tag} style={{
                background: c.bg, color: c.text,
                border: `1px solid ${c.border}`,
                borderLeft: `4px solid ${c.border}`,
                padding: "14px 22px",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 6 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: c.tagColor }}>{c.tag}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: c.tag === "NP-complete" ? "var(--paper-deep)" : "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.title}</div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1.3 }}>{c.desc}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: c.tag === "NP-complete" ? "var(--paper-deep)" : "var(--ink-3)", marginTop: 8, fontStyle: "italic" }}>e.g. {c.ex}</div>
              </div>
            ))}
          </div>

          {/* Right — Venn diagram */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "14px 20px 18px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 10 620 430" style={{ width: "100%", height: "auto" }}>
              {/* NP-hard ellipse — drawn first so NP overlays the intersection.
                  NP-hard leftmost: cx=420-rx=195 → x=225. */}
              <ellipse cx={420} cy={220} rx={195} ry={195}
                       fill="rgba(217, 70, 89, 0.10)"
                       stroke="var(--accent-2)" strokeWidth={2.5}/>
              {/* NP ellipse */}
              <ellipse cx={200} cy={220} rx={195} ry={195}
                       fill="rgba(107, 74, 245, 0.10)"
                       stroke="var(--accent)" strokeWidth={2.5}/>
              {/* P circle — inside NP only.
                  P rightmost: 95+85=180 < 225 (NP-hard leftmost) ✓
                  P leftmost: 10 → ((10-200)/195)²=0.95 < 1 ✓ inside NP */}
              <circle cx={95} cy={220} r={85}
                      fill="rgba(56, 161, 105, 0.18)"
                      stroke="#38a169" strokeWidth={2.5}/>

              {/* Labels */}
              <text x={200} y={140} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={32} fontWeight="bold"
                    fill="var(--accent)">NP</text>
              <text x={505} y={140} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={28} fontWeight="bold"
                    fill="var(--accent-2)">NP-hard</text>
              <text x={95} y={227} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={36} fontWeight="bold"
                    fill="#2d6a4f">P</text>
              <text x={320} y={213} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={20} fontWeight="bold"
                    fill="var(--ink)">NP-</text>
              <text x={320} y={240} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={20} fontWeight="bold"
                    fill="var(--ink)">complete</text>

              {/* Examples */}
              <text x={95} y={270} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13} fill="#2d6a4f"
                    fontStyle="italic">shortest path</text>
              <text x={320} y={284} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-2)"
                    fontStyle="italic">TSP · CVRP · SAT</text>
              <text x={510} y={227} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13} fill="var(--accent-2)"
                    fontStyle="italic">halting problem</text>
            </svg>

            {/* P=NP caption — outside SVG so the diagram fills the full height */}
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontStyle: "italic", color: "var(--ink-2)" }}>
                The famous open question: is{" "}
                <span style={{ color: "var(--accent)", fontWeight: "bold" }}>P = NP</span>?
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>
                Clay Mathematics Institute · $1 000 000 prize · open since 1971
              </div>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// -----------------------------------------------------------------------------
// Slide 24 — Exact algorithms
// -----------------------------------------------------------------------------
function Slide17C() {
  const methods = [
    {
      name: "Brute-force enumeration",
      desc: "Try every feasible solution and keep the best one.",
      cost: "factorial / exponential",
      use: "tiny instances only (n ≤ 10)",
    },
    {
      name: "Branch-and-bound",
      desc: "Implicit enumeration: prune subtrees whose lower bound already exceeds the incumbent.",
      cost: "exponential worst case · much better in practice",
      use: "small to medium combinatorial problems",
    },
    {
      name: "Branch-and-cut",
      desc: "B&B + cutting planes: tighten the LP relaxation by adding violated valid inequalities lazily.",
      cost: "depends on bound quality · state of the art for ILPs",
      use: "TSP / CVRP up to ≈ 100–200 vertices",
    },
    {
      name: "Dynamic programming",
      desc: "Bellman recursion over subproblems with overlapping structure.",
      cost: "e.g. O(n²·2ⁿ) for TSP (Held–Karp)",
      use: "when a state space can be defined cleanly",
    },
  ];

  return (
    <section className="slide" data-label="Exact algorithms">
      <SlideFrame>
        <div className="tag">Complexity · algorithms</div>
        <h2 className="title" style={{ marginTop: 28 }}>Exact algorithms — guaranteed optimum, at a price.</h2>

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 50, flex: 1 }}>

          {/* Left — definition + key consequence */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 28, lineHeight: 1.3 }}>
              An <em>exact algorithm</em> always returns the <em>optimal</em> solution — or proves that no feasible solution exists.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 24px" }}>
              <div className="kicker" style={{ color: "var(--accent)", marginBottom: 8 }}>The fundamental trade-off</div>
              <div style={{ fontSize: 22, lineHeight: 1.35 }}>
                For an NP-hard problem, every known exact algorithm has <em>super-polynomial</em> worst-case running time — and no polynomial one will ever exist <em>unless</em> P = NP.
              </div>
            </div>

            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "16px 22px" }}>
              <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 6 }}>Optimality vs. tractability</div>
              <div style={{ fontSize: 22, lineHeight: 1.35 }}>
                Exact methods give a <em>certificate</em> of optimality. The price is that running time grows badly with n — beyond a problem-specific threshold the method becomes impractical.
              </div>
            </div>
          </div>

          {/* Right — list of methods */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
            {methods.map((m, i) => (
              <div key={i} style={{
                background: "var(--paper-2)", border: "1px solid var(--line)",
                borderLeft: "4px solid var(--accent)", padding: "14px 22px",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--ink)", fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--ink-2)", lineHeight: 1.3, marginTop: 6 }}>{m.desc}</div>
                <div style={{ display: "flex", gap: 24, marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--ink-3)", flexWrap: "wrap" }}>
                  <div><span style={{ color: "var(--accent-2)" }}>cost:</span> {m.cost}</div>
                  <div><span style={{ color: "var(--accent)" }}>use:</span> {m.use}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// -----------------------------------------------------------------------------
// Slide 25 — CVRP is NP-hard (the conclusion)
// -----------------------------------------------------------------------------
function Slide17() {
  const rows = [
    ["5",  "60",            "instant"],
    ["10", "3.6 · 10⁶",     "ms"],
    ["15", "8.7 · 10¹¹",    "minutes"],
    ["20", "1.2 · 10¹⁷",    "centuries"],
    ["25", "3.1 · 10²²",    "→ heat death"],
  ];
  // Green → amber → red, matching the gradient used in Slide17AGrowth (slide 23)
  const rowColors = ["#16a34a", "#65a30d", "#ca8a04", "#ea580c", "#b8322e"];
  return (
    <section className="slide" data-label="CVRP is NP-hard">
      <SlideFrame>
        <div className="tag">Complexity · CVRP</div>
        <h2 className="title" style={{ marginTop: 28 }}>And so… the CVRP is NP-hard.</h2>

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, flex: 1 }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 28, lineHeight: 1.3 }}>
              The CVRP is <em style={{ color: "var(--accent)" }}>NP-hard in the strong sense</em> — it generalises both the <em>Traveling Salesman Problem</em> (Part V, just covered) and the <em>Bin Packing Problem</em>, each NP-hard on its own.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 24px" }}>
              <div className="kicker" style={{ color: "var(--accent)", marginBottom: 8 }}>The combinatorial explosion</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--ink-2)", marginBottom: 6 }}>
                Hamiltonian circuits on n vertices:
              </div>
              <div style={{ fontSize: 32 }}>
                <TeX display>{"\\frac{(n-1)!}{2}"}</TeX>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: "var(--ink-3)", marginTop: 6 }}>
                factorial growth — already worse than 2ⁿ
              </div>
            </div>

            <div className="body small" style={{ color: "var(--ink-3)", lineHeight: 1.4 }}>
              Adding capacity, time windows, multiple depots or pickup-and-delivery only makes it worse — any exact method has super-polynomial worst-case running time. And as the next slide shows, even just <em>writing down</em> the standard ILP relaxation requires exponentially many capacity-cut constraints.
            </div>
          </div>

          <div style={{ border: "1px solid var(--line)", display: "flex", flexDirection: "column", alignSelf: "center" }}>
            <div style={{ padding: "14px 20px", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              brute-force TSP enumeration
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: 26 }}>
              <thead>
                <tr style={{ background: "var(--paper-2)" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 18, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-3)" }}>n</th>
                  <th style={{ padding: "14px 20px", textAlign: "right", fontSize: 18, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-3)" }}>tours</th>
                  <th style={{ padding: "14px 20px", textAlign: "right", fontSize: 18, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-3)" }}>@ 1 μs / tour</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "14px 20px", color: "var(--ink)", borderLeft: `4px solid ${rowColors[i]}` }}>{r[0]}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>{renderNum(r[1])}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", color: rowColors[i], fontWeight: 600 }}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "12px 20px", borderTop: "1px solid var(--line)", background: "var(--paper-2)", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-3)", fontStyle: "italic" }}>
              for n &gt; ~20 vertices, even pure enumeration is physically impossible — and the CVRP is <em>strictly harder</em> than this.
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// -----------------------------------------------------------------------------
// Slide 26 — Why heuristics
// -----------------------------------------------------------------------------
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


// ==========================================================
// CLOTHING METAPHOR — exact algorithm vs heuristic, framed as
// off-the-rack vs bespoke. ISO-7010 / signage-style pictogram
// silhouettes (woman + man casual on the left, bride + groom
// on the right). A full-width disambiguator at the bottom is
// the only place that uses the accent colour, because the
// metaphor is dangerously close to inverting the "quality"
// axis ("fit" must be read as computational efficiency, not
// as solution quality).

const PEOPLE_VB = "0 0 100 180";

function PicWomanCasual() {
  return (
    <svg viewBox={PEOPLE_VB} width={100} height={180}>
      <g fill="var(--ink)">
        {/* head with hair (slightly oval to suggest a bob) */}
        <ellipse cx={50} cy={22} rx={15} ry={16}/>
        {/* A-line dress / skirt */}
        <path d="M 38,38 L 62,38 L 78,150 L 22,150 Z"/>
        {/* arms */}
        <polygon points="32,38 38,38 32,90 26,88"/>
        <polygon points="62,38 68,38 74,88 68,90"/>
        {/* legs poking below the skirt hem */}
        <rect x={37} y={150} width={11} height={25}/>
        <rect x={52} y={150} width={11} height={25}/>
      </g>
    </svg>
  );
}

function PicManCasual() {
  return (
    <svg viewBox={PEOPLE_VB} width={100} height={180}>
      <g fill="var(--ink)">
        {/* head */}
        <circle cx={50} cy={22} r={13}/>
        {/* rectangular shirt / torso */}
        <rect x={32} y={38} width={36} height={62}/>
        {/* arms (a touch wider than woman's, square shoulders) */}
        <rect x={22} y={38} width={10} height={62}/>
        <rect x={68} y={38} width={10} height={62}/>
        {/* trousers — two distinct legs */}
        <rect x={33} y={100} width={15} height={75}/>
        <rect x={52} y={100} width={15} height={75}/>
      </g>
    </svg>
  );
}

function PicBride() {
  return (
    <svg viewBox={PEOPLE_VB} width={100} height={180}>
      {/* veil — drapes from above the head, behind everything else */}
      <path d="M 30,15 Q 50,-5 70,15 L 90,140 Q 50,150 10,140 Z"
            fill="var(--ink)" opacity={0.18}/>
      <g fill="var(--ink)">
        {/* head */}
        <circle cx={50} cy={20} r={12}/>
        {/* fitted bodice */}
        <path d="M 40,32 L 60,32 L 64,55 L 62,80 L 38,80 L 36,55 Z"/>
        {/* full ball-gown skirt — markedly wider flare than the casual woman */}
        <path d="M 38,80 L 62,80 L 92,160 L 8,160 Z"/>
        {/* bouquet held in front (subtle ink-3 sphere) */}
        <circle cx={50} cy={90} r={6} fill="var(--ink-3)" stroke="var(--ink)" strokeWidth={1.2}/>
      </g>
    </svg>
  );
}

function PicGroom() {
  return (
    <svg viewBox={PEOPLE_VB} width={100} height={180}>
      <g fill="var(--ink)">
        {/* tuxedo tails — coat panel extending behind the legs */}
        <polygon points="32,90 68,90 60,160 40,160"/>
        {/* head */}
        <circle cx={50} cy={20} r={13}/>
        {/* tuxedo jacket */}
        <rect x={32} y={38} width={36} height={62}/>
        {/* arms */}
        <rect x={22} y={38} width={10} height={62}/>
        <rect x={68} y={38} width={10} height={62}/>
        {/* tuxedo trousers — slightly slimmer than casual man */}
        <rect x={34} y={100} width={13} height={75}/>
        <rect x={53} y={100} width={13} height={75}/>
      </g>
      {/* bow tie — paper-2 fill so it reads as a separate accessory */}
      <polygon points="44,40 50,43 56,40 56,49 50,46 44,49"
               fill="var(--paper-2)" stroke="var(--ink)" strokeWidth={1.2}/>
    </svg>
  );
}

function SlideClothingMetaphor() {
  return (
    <section className="slide" data-label="Exact vs heuristic — clothing metaphor">
      <SlideFrame>
        <div className="tag">Algorithms · Metaphor</div>
        <h2 className="title" style={{ marginTop: 28 }}>
          Off-the-rack vs bespoke — a metaphor for exact vs heuristic.
        </h2>

        <div style={{
          marginTop: 14,
          fontFamily: "var(--font-display)",
          fontSize: 22,
          color: "var(--ink-2)",
          lineHeight: 1.4,
        }}>
          Why an exact algorithm is general but slow, and a heuristic is fast but fragile.
        </div>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, flex: 1 }}>

          {/* === LEFT — EXACT ALGORITHM (off-the-rack) === */}
          <div style={{
            border: "1px solid var(--line)",
            background: "var(--paper-2)",
            padding: "22px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: "0.1em", color: "var(--ink-3)" }}>
                EXACT ALGORITHM
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, color: "var(--ink-2)", marginTop: 2 }}>
                off-the-rack · ready-to-wear
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", padding: "6px 0" }}>
              <PicWomanCasual/>
              <PicManCasual/>
            </div>

            <ul style={{ margin: 0, padding: 0, fontSize: 20, lineHeight: 1.4, color: "var(--ink)", listStyle: "none" }}>
              <li>
                <strong>One pattern, many sizes</strong>
                <div style={{ fontSize: 17, color: "var(--ink-3)", marginTop: 2 }}>↳ one MILP solver, many problem instances</div>
              </li>
              <li style={{ marginTop: 10 }}>
                <strong>Cheap off the shelf</strong>
                <div style={{ fontSize: 17, color: "var(--ink-3)", marginTop: 2 }}>↳ no R&amp;D per instance — just feed the model</div>
              </li>
              <li style={{ marginTop: 10 }}>
                <strong>Rarely a perfect fit</strong>
                <div style={{ fontSize: 17, color: "var(--ink-3)", marginTop: 2 }}>↳ exponential worst-case → too slow on big inputs</div>
              </li>
            </ul>
          </div>

          {/* === RIGHT — HEURISTIC (bespoke) === */}
          <div style={{
            border: "1px solid var(--line)",
            background: "var(--paper-2)",
            padding: "22px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: "0.1em", color: "var(--ink-3)" }}>
                HEURISTIC
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, color: "var(--ink-2)", marginTop: 2 }}>
                bespoke · made-to-measure
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", padding: "6px 0" }}>
              <PicBride/>
              <PicGroom/>
            </div>

            <ul style={{ margin: 0, padding: 0, fontSize: 20, lineHeight: 1.4, color: "var(--ink)", listStyle: "none" }}>
              <li>
                <strong>Tailored for ONE instance</strong>
                <div style={{ fontSize: 17, color: "var(--ink-3)", marginTop: 2 }}>↳ Clarke-Wright, designed around CVRP structure</div>
              </li>
              <li style={{ marginTop: 10 }}>
                <strong>Expensive to design and tune</strong>
                <div style={{ fontSize: 17, color: "var(--ink-3)", marginTop: 2 }}>↳ research effort, parameter tuning</div>
              </li>
              <li style={{ marginTop: 10 }}>
                <strong>Perfect for THAT instance</strong>
                <div style={{ fontSize: 17, color: "var(--ink-3)", marginTop: 2 }}>↳ runs fast on the target problem class</div>
              </li>
              <li style={{ marginTop: 10 }}>
                <strong>Fragile — gain or lose weight, fit broken</strong>
                <div style={{ fontSize: 17, color: "var(--ink-3)", marginTop: 2 }}>↳ change problem class → heuristic degrades</div>
              </li>
            </ul>
          </div>

        </div>

        {/* === DISAMBIGUATOR — full-width, only accent-coloured element on the slide === */}
        <div style={{
          marginTop: 22,
          border: "1.5px solid var(--accent)",
          background: "rgba(107,74,245,0.06)",
          padding: "16px 26px",
          fontSize: 20,
          lineHeight: 1.5,
          color: "var(--ink)",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            letterSpacing: "0.08em",
            color: "var(--accent)",
            marginBottom: 4,
          }}>
            DISAMBIGUATION
          </div>
          <div>
            <strong>"Fit"</strong> in this metaphor maps to <strong>computational efficiency</strong>, <strong>not</strong> solution quality.
          </div>
          <div style={{ marginTop: 4, color: "var(--ink-2)" }}>
            The exact algorithm still <em>guarantees</em> the optimal solution; the heuristic only finds a good one — fast, but with no proof.
          </div>
        </div>

      </SlideFrame>
    </section>
  );
}


Object.assign(window, { Slide16, Slide17A, Slide17AGrowth, Slide17B, Slide17C, Slide17, Slide18, SlideClothingMetaphor });
