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
  // Practical reach (number of operations) at ~10⁹ ops/s; "feasible" up to ~10¹⁰.
  const rows = [
    { name: "O(log n)",  big: "\\log n",  n10: "3",         n50: "6",          n100: "7",          n1000: "10",          verdict: "trivial",   tone: "ok"   },
    { name: "O(n)",      big: "n",        n10: "10",        n50: "50",         n100: "100",        n1000: "10³",         verdict: "fast",      tone: "ok"   },
    { name: "O(n²)",     big: "n^2",      n10: "10²",       n50: "2.5·10³",    n100: "10⁴",        n1000: "10⁶",         verdict: "ok",        tone: "ok"   },
    { name: "O(n³)",     big: "n^3",      n10: "10³",       n50: "1.3·10⁵",    n100: "10⁶",        n1000: "10⁹",         verdict: "slow",      tone: "warn" },
    { name: "O(2ⁿ)",     big: "2^n",      n10: "10³",       n50: "10¹⁵",       n100: "10³⁰",       n1000: "10³⁰¹",       verdict: "explodes",  tone: "bad"  },
    { name: "O(n!)",     big: "n!",       n10: "3.6·10⁶",   n50: "3·10⁶⁴",     n100: "9·10¹⁵⁷",    n1000: "10²⁵⁶⁷",      verdict: "explodes",  tone: "bad"  },
  ];
  const toneColor = (t) => t === "bad" ? "var(--accent-2)" : t === "warn" ? "var(--accent)" : "var(--ink-3)";

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

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: 36, flex: 1 }}>

          {/* Col 1 — definitions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 26, lineHeight: 1.3 }}>
              The <em>computational complexity</em> of an algorithm describes how its running time <em>grows</em> with the size of the input n.
            </div>

            <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 22px" }}>
              <div className="kicker" style={{ color: "var(--accent)", marginBottom: 8 }}>Big-O notation</div>
              <div style={{ fontSize: 21, lineHeight: 1.35 }}>
                We write <span style={{ fontFamily: "var(--font-mono)" }}>T(n) = O(f(n))</span> when the running time T(n) grows <em>no faster than</em> f(n), up to constants, as n → ∞.
              </div>
              {/* Legend — what each symbol means */}
              <div style={{
                marginTop: 12, paddingTop: 10,
                borderTop: "1px dashed var(--line)",
                display: "grid", gridTemplateColumns: "auto 1fr",
                columnGap: 14, rowGap: 5,
                fontSize: 16, lineHeight: 1.35,
              }}>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--ink)", fontWeight: 600 }}>n</div>
                <div style={{ color: "var(--ink-2)" }}>input size of the problem (e.g. for VRP / TSP, the number of nodes)</div>

                <div style={{ fontFamily: "var(--font-mono)", color: "var(--ink)", fontWeight: 600 }}>T(n)</div>
                <div style={{ color: "var(--ink-2)" }}>number of operations (or running time) the algorithm performs as a function of n</div>

                <div style={{ fontFamily: "var(--font-mono)", color: "var(--ink)", fontWeight: 600 }}>f(n)</div>
                <div style={{ color: "var(--ink-2)" }}>comparison curve — the asymptotic upper bound we measure T(n) against (e.g. n, n², n log n, 2ⁿ)</div>
              </div>
              <div style={{ fontSize: 17, lineHeight: 1.4, color: "var(--ink-3)", marginTop: 12, fontStyle: "italic" }}>
                Constants and lower-order terms are ignored — what matters is the asymptotic shape of the curve.
              </div>
            </div>
          </div>

          {/* Col 2 — illustrative chart: asymptotic upper bound */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: "18px 22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
            <div style={{ fontSize: 16, color: "var(--ink-3)", marginTop: 10, fontStyle: "italic", lineHeight: 1.35 }}>
              For all <span style={{ fontFamily: "var(--font-mono)" }}>n ≥ n₀</span>, T(n) ≤ c · f(n) — the dashed curve <em>dominates</em> from there on. The behaviour for small n does not matter.
            </div>
          </div>

          {/* Col 3 — growth table + Why it matters */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div style={{ border: "1px solid var(--line)", overflow: "hidden", display: "flex", flexDirection: "column", width: "100%" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.8fr 0.9fr 0.9fr 0.9fr 1fr", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                <div style={{ padding: "9px 11px" }}>complexity</div>
                <div style={{ padding: "9px 11px", textAlign: "right" }}>n=10</div>
                <div style={{ padding: "9px 11px", textAlign: "right" }}>n=50</div>
                <div style={{ padding: "9px 11px", textAlign: "right" }}>n=100</div>
                <div style={{ padding: "9px 11px", textAlign: "right" }}>n=1000</div>
                <div style={{ padding: "9px 11px", textAlign: "right" }}>verdict</div>
              </div>
              {rows.map((r, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1.1fr 0.8fr 0.9fr 0.9fr 0.9fr 1fr",
                  background: i % 2 === 0 ? "var(--paper-2)" : "var(--paper)",
                  borderTop: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 17,
                }}>
                  <div style={{ padding: "9px 11px", color: toneColor(r.tone), fontWeight: 600 }}>{r.name}</div>
                  <div style={{ padding: "9px 11px", textAlign: "right" }}>{r.n10}</div>
                  <div style={{ padding: "9px 11px", textAlign: "right" }}>{r.n50}</div>
                  <div style={{ padding: "9px 11px", textAlign: "right" }}>{r.n100}</div>
                  <div style={{ padding: "9px 11px", textAlign: "right" }}>{r.n1000}</div>
                  <div style={{ padding: "9px 11px", textAlign: "right", color: toneColor(r.tone), fontStyle: "italic" }}>{r.verdict}</div>
                </div>
              ))}
              <div style={{ padding: "9px 12px", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-3)", borderTop: "1px solid var(--line)", background: "var(--paper-2)" }}>
                number of operations (≈ time at 10⁹ ops/s — feasible up to ~10¹⁰)
              </div>
            </div>

            <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "14px 20px" }}>
              <div className="kicker" style={{ color: "var(--paper-deep)", marginBottom: 6 }}>Why it matters</div>
              <div style={{ fontSize: 20, lineHeight: 1.35 }}>
                A polynomial-time algorithm scales to large instances. An exponential-time algorithm becomes <em>useless</em> beyond ~30–50 inputs — the constant factor cannot save you.
              </div>
            </div>
          </div>
        </div>
      </SlideFrame>
    </section>
  );
}


// -----------------------------------------------------------------------------
// Slide 23 — Classes of problems: P, NP, NP-hard, NP-complete
// -----------------------------------------------------------------------------
function Slide17B() {
  const classes = [
    {
      tag: "P",
      title: "Polynomial",
      desc: "Solvable in O(nᵏ) time for some constant k.",
      ex: "shortest path · sorting · linear programming",
      bg: "rgba(107,74,245,0.10)", border: "var(--accent)", text: "var(--ink)",
    },
    {
      tag: "NP",
      title: "Non-deterministic Polynomial",
      desc: "A candidate solution can be verified in polynomial time.",
      ex: "TSP · CVRP · SAT · graph colouring",
      bg: "var(--paper-2)", border: "var(--line)", text: "var(--ink)",
    },
    {
      tag: "NP-hard",
      title: "At least as hard as any NP problem",
      desc: "If solved in polynomial time, every NP problem could be too.",
      ex: "halting problem · bin packing · TSP · CVRP",
      bg: "var(--paper-2)", border: "var(--line)", text: "var(--ink)",
    },
    {
      tag: "NP-complete",
      title: "NP ∩ NP-hard",
      desc: "The hardest problems that still belong to NP.",
      ex: "SAT · TSP (decision) · CVRP (decision)",
      bg: "var(--ink)", border: "var(--ink)", text: "var(--paper)",
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
                padding: "12px 18px",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 4 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: c.tag === "NP-complete" ? "var(--paper)" : "var(--accent)" }}>{c.tag}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, color: c.tag === "NP-complete" ? "var(--paper-deep)" : "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.title}</div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 21, lineHeight: 1.3 }}>{c.desc}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: c.tag === "NP-complete" ? "var(--paper-deep)" : "var(--ink-3)", marginTop: 6, fontStyle: "italic" }}>e.g. {c.ex}</div>
              </div>
            ))}
          </div>

          {/* Right — Venn diagram */}
          <div style={{ background: "var(--paper-2)", border: "1px solid var(--line)", padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 620 460" style={{ width: "100%", height: "auto", maxHeight: 460 }}>
              {/* NP-hard ellipse (right) — drawn first so the NP ellipse overlays the intersection */}
              <ellipse cx={400} cy={230} rx={195} ry={150}
                       fill="rgba(217, 70, 89, 0.10)"
                       stroke="var(--accent-2)" strokeWidth={2.5}/>
              {/* NP ellipse (left) */}
              <ellipse cx={245} cy={230} rx={195} ry={150}
                       fill="rgba(107, 74, 245, 0.10)"
                       stroke="var(--accent)" strokeWidth={2.5}/>
              {/* P circle (inside NP, away from intersection) */}
              <circle cx={170} cy={230} r={75}
                      fill="rgba(56, 161, 105, 0.18)"
                      stroke="#38a169" strokeWidth={2.5}/>

              {/* Labels — class names */}
              <text x={245} y={120} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={32} fontWeight="bold"
                    fill="var(--accent)">NP</text>
              <text x={520} y={120} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={32} fontWeight="bold"
                    fill="var(--accent-2)">NP-hard</text>
              <text x={170} y={235} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={36} fontWeight="bold"
                    fill="#2d6a4f">P</text>
              <text x={325} y={225} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={20} fontWeight="bold"
                    fill="var(--ink)">NP-</text>
              <text x={325} y={250} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={20} fontWeight="bold"
                    fill="var(--ink)">complete</text>

              {/* Markers — concrete problems */}
              <text x={170} y={275} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13} fill="#2d6a4f"
                    fontStyle="italic">shortest path</text>
              <text x={325} y={285} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-2)"
                    fontStyle="italic">TSP · CVRP · SAT</text>
              <text x={500} y={235} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13} fill="var(--accent-2)"
                    fontStyle="italic">halting problem</text>

              {/* P =? NP arrow/caption */}
              <text x={310} y={420} textAnchor="middle"
                    fontFamily="var(--font-display)" fontSize={22} fontStyle="italic"
                    fill="var(--ink-2)">
                The famous open question: is <tspan fill="var(--accent)" fontWeight="bold">P = NP</tspan>?
              </text>
              <text x={310} y={444} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize={13} fill="var(--ink-3)">
                Clay Mathematics Institute · $1 000 000 prize · open since 1971
              </text>
            </svg>
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
                borderLeft: "4px solid var(--accent)", padding: "12px 18px",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--ink)", fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--ink-2)", lineHeight: 1.3, marginTop: 4 }}>{m.desc}</div>
                <div style={{ display: "flex", gap: 24, marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-3)", flexWrap: "wrap" }}>
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
  return (
    <section className="slide" data-label="CVRP is NP-hard">
      <SlideFrame>
        <div className="tag">Complexity · CVRP</div>
        <h2 className="title" style={{ marginTop: 28 }}>And so… the CVRP is NP-hard.</h2>

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, flex: 1 }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
            <div className="lede" style={{ fontSize: 28, lineHeight: 1.3 }}>
              The CVRP is <em style={{ color: "var(--accent)" }}>NP-hard in the strong sense</em> — it generalises both the <em>Traveling Salesman Problem</em> (covered next, in Part V) and the <em>Bin Packing Problem</em>, each NP-hard on its own.
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
              Adding capacity, time windows, multiple depots or pickup-and-delivery only makes it worse. Any exact method must therefore have super-polynomial worst-case running time.
            </div>
          </div>

          <div style={{ border: "1px solid var(--line)", display: "flex", flexDirection: "column" }}>
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
                    <td style={{ padding: "14px 20px", color: "var(--ink)" }}>{r[0]}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>{r[1]}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", color: i >= 3 ? "var(--accent-2)" : "var(--ink-3)" }}>{r[2]}</td>
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


Object.assign(window, { Slide16, Slide17A, Slide17B, Slide17C, Slide17, Slide18 });
