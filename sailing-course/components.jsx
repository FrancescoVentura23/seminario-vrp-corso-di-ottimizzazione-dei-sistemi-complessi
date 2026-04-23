/* =========================================================================
   Sailing English Course — Reusable visual components
   Exposes globals on window. Mirrors the VRP seminar's components.jsx
   so the deck-stage web component picks them up the same way.
   ========================================================================= */

const { useState, useEffect, useRef } = React;

// -----------------------------------------------------------
// SlideFrame — standard chrome (brand mark + page number).
// The page number is filled in by the host script via the
// data-chrome-pg attribute every time the slide changes.
// -----------------------------------------------------------
function SlideFrame({ children }) {
  return (
    <>
      {children}
      <div className="slide-chrome">
        <div className="left">
          <span>Sailing Course</span>
          <span>·</span>
          <span>2026</span>
        </div>
        <div className="pg" data-chrome-pg>00 / 00</div>
      </div>
    </>
  );
}

// -----------------------------------------------------------
// Topline — short uppercase label across the top of a slide
// -----------------------------------------------------------
function Topline({ left, right }) {
  return (
    <div className="topline">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// -----------------------------------------------------------
// SailingBoat — animated boat illustration (used on cover)
// -----------------------------------------------------------
function SailingBoat({ width = 800, height = 620 }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "100%" }}>
      {/* horizon */}
      <line x1={0} y1={380} x2={width} y2={380} stroke="var(--line)" strokeWidth={1}/>
      {/* sun */}
      <circle cx={width - 160} cy={180} r={50} fill="none" stroke="var(--accent)" strokeWidth={2}/>
      {/* distant islands */}
      <path d="M 50 380 Q 130 340 210 380 Z" fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1}/>
      <path d="M 250 380 Q 360 320 470 380 Z" fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1}/>
      {/* boat */}
      <g className="bob" transform="translate(330 240)">
        <line x1={60} y1={180} x2={60} y2={0} stroke="var(--ink)" strokeWidth={2.5}/>
        <path className="anim-draw anim-draw-1" style={{ "--len": 600 }}
              d="M 60 0 L 60 160 L 165 170 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
        <path className="anim-draw anim-draw-2" style={{ "--len": 400 }}
              d="M 60 12 L 60 130 L -10 175 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.5}/>
        <path d="M -25 180 L 175 180 L 155 220 L -5 220 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth={2}/>
        <line x1={-25} y1={180} x2={175} y2={180} stroke="var(--accent)" strokeWidth={3}/>
      </g>
      {/* waves */}
      {[470, 510, 550].map((y, i) => (
        <path key={i}
              d={`M 0 ${y} Q 50 ${y - 10} 100 ${y} T 200 ${y} T 300 ${y} T 400 ${y} T 500 ${y} T 600 ${y} T 700 ${y} T 800 ${y}`}
              fill="none" stroke="var(--ink-3)" strokeWidth={1.5}
              opacity={1 - i * 0.25}/>
      ))}
    </svg>
  );
}

// -----------------------------------------------------------
// SaronicMap — sketch of the Saronic Gulf with a drawn route
// -----------------------------------------------------------
function SaronicMap() {
  return (
    <svg viewBox="0 0 900 660" style={{ width: "100%", height: "100%" }}>
      <defs>
        <pattern id="seagrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx={1} cy={1} r={1} fill="var(--line)"/>
        </pattern>
      </defs>
      <rect width={900} height={660} fill="url(#seagrid)" opacity={0.6}/>

      {/* Compass */}
      <g transform="translate(820 80)" opacity={0.7}>
        <circle r={28} fill="none" stroke="var(--ink-3)" strokeWidth={1}/>
        <path d="M 0 -28 L 6 0 L 0 28 L -6 0 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth={1}/>
        <text y={-38} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink-3)">N</text>
      </g>

      {/* Athens (mainland) */}
      <path d="M 50 90 L 280 70 L 340 130 L 360 200 L 280 240 L 100 220 Z"
            fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1.5}/>
      <circle cx={220} cy={160} r={8} fill="var(--ink)"/>
      <text x={220} y={138} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={20} fill="var(--ink)" fontWeight={600}>ATHENS</text>
      <text x={220} y={195} textAnchor="middle" fontFamily="var(--font-display)" fontSize={22} fontStyle="italic" fill="var(--ink-3)">start &amp; finish</text>

      {/* Aegina */}
      <path d="M 220 320 Q 280 300 310 350 Q 320 400 270 410 Q 220 405 215 360 Z"
            fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1.5}/>
      <text x={265} y={370} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink)">AEGINA</text>

      {/* Poros */}
      <path d="M 460 380 Q 510 365 520 410 Q 510 440 470 435 Q 450 420 460 380 Z"
            fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1.5}/>
      <text x={485} y={408} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--ink)">POROS</text>

      {/* Hydra */}
      <path d="M 560 480 Q 660 465 700 510 Q 690 540 590 535 Q 545 515 560 480 Z"
            fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1.5}/>
      <text x={625} y={510} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={18} fill="var(--ink)">HYDRA</text>

      {/* Spetses */}
      <path d="M 380 560 Q 450 545 470 590 Q 460 615 400 610 Q 365 590 380 560 Z"
            fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1.5}/>
      <text x={420} y={588} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={16} fill="var(--ink)">SPETSES</text>

      {/* Route — animated */}
      <path className="anim-draw anim-draw-1" style={{ "--len": 1800 }}
            d="M 220 170 Q 240 250 265 360 Q 360 400 485 405 Q 570 460 625 505 Q 510 580 420 588 Q 320 460 265 360 Q 230 260 220 170"
            fill="none" stroke="var(--accent)" strokeWidth={3}
            strokeDasharray="8 6" strokeLinecap="round"/>

      <text x={450} y={40} textAnchor="middle" fontFamily="var(--font-display)" fontSize={28} fontStyle="italic" fill="var(--ink-2)">Saronic Gulf</text>
    </svg>
  );
}

// -----------------------------------------------------------
// SunriseCup — morning illustration (sun + horizon + cup)
// -----------------------------------------------------------
function SunriseCup() {
  return (
    <svg viewBox="0 0 500 500" style={{ width: "80%", height: "80%" }}>
      {/* sunrise */}
      <circle cx={250} cy={280} r={80} fill="none" stroke="var(--accent)" strokeWidth={2}/>
      <line x1={250} y1={170} x2={250} y2={140} stroke="var(--accent)" strokeWidth={2}/>
      <line x1={335} y1={200} x2={360} y2={180} stroke="var(--accent)" strokeWidth={2}/>
      <line x1={165} y1={200} x2={140} y2={180} stroke="var(--accent)" strokeWidth={2}/>
      <line x1={370} y1={280} x2={400} y2={280} stroke="var(--accent)" strokeWidth={2}/>
      <line x1={130} y1={280} x2={100} y2={280} stroke="var(--accent)" strokeWidth={2}/>

      <line x1={60} y1={360} x2={440} y2={360} stroke="var(--ink)" strokeWidth={2}/>

      {/* coffee cup */}
      <g transform="translate(180 380)">
        <path d="M 0 0 L 0 60 Q 0 80 20 80 L 100 80 Q 120 80 120 60 L 120 0 Z" fill="none" stroke="var(--ink)" strokeWidth={2.5}/>
        <path d="M 120 15 Q 145 15 145 40 Q 145 60 120 60" fill="none" stroke="var(--ink)" strokeWidth={2.5}/>
        <path d="M 25 -20 Q 30 -32 25 -42" fill="none" stroke="var(--ink-3)" strokeWidth={2}/>
        <path d="M 60 -20 Q 65 -32 60 -42" fill="none" stroke="var(--ink-3)" strokeWidth={2}/>
        <path d="M 95 -20 Q 100 -32 95 -42" fill="none" stroke="var(--ink-3)" strokeWidth={2}/>
      </g>
    </svg>
  );
}

// -----------------------------------------------------------
// TackingPath — animated tacking diagram between two islands
// -----------------------------------------------------------
function TackingPath() {
  return (
    <svg viewBox="0 0 600 480" style={{ flex: 1, width: "100%" }}>
      <g transform="translate(60 60)">
        <path d="M 0 0 L 0 50" stroke="var(--ink-3)" strokeWidth={2}/>
        <path d="M -8 8 L 0 0 L 8 8" fill="none" stroke="var(--ink-3)" strokeWidth={2}/>
        <text x={20} y={25} fontFamily="var(--font-mono)" fontSize={16} fill="var(--ink-3)">WIND</text>
      </g>

      <path d="M 60 360 Q 110 340 150 380 Q 140 410 90 405 Q 55 390 60 360 Z"
            fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1.5}/>
      <text x={100} y={385} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink)">A</text>

      <path d="M 470 380 Q 530 365 555 405 Q 545 435 490 430 Q 460 415 470 380 Z"
            fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1.5}/>
      <text x={510} y={408} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="var(--ink)">B</text>

      <path className="anim-draw anim-draw-1" style={{ "--len": 900 }}
            d="M 105 370 L 200 240 L 320 320 L 410 200 L 500 390"
            fill="none" stroke="var(--accent)" strokeWidth={3}
            strokeLinecap="round" strokeLinejoin="round"/>

      <circle cx={200} cy={240} r={5} fill="var(--accent)"/>
      <circle cx={320} cy={320} r={5} fill="var(--accent)"/>
      <circle cx={410} cy={200} r={5} fill="var(--accent)"/>

      <text x={300} y={450} textAnchor="middle" fontFamily="var(--font-display)" fontSize={26} fontStyle="italic" fill="var(--ink-2)">≈ 1–2 hours under sail</text>
    </svg>
  );
}

// -----------------------------------------------------------
// SwimmerScene — sun, horizon, waves and a swimmer (free time)
// -----------------------------------------------------------
function SwimmerScene() {
  return (
    <svg viewBox="0 0 500 500" style={{ width: "85%", height: "85%" }}>
      <circle cx={380} cy={120} r={40} fill="none" stroke="var(--accent)" strokeWidth={2}/>
      <line x1={40} y1={240} x2={460} y2={240} stroke="var(--ink)" strokeWidth={1.5}/>
      <path d="M 40 240 Q 100 215 160 240 Z" fill="var(--paper-deep)" stroke="var(--ink-3)" strokeWidth={1.5}/>

      {[290, 330, 380, 430].map((y, i) => (
        <path key={i}
              d={`M 0 ${y} Q 50 ${y - 10} 100 ${y} T 200 ${y} T 300 ${y} T 400 ${y} T 500 ${y}`}
              fill="none" stroke="var(--ink-3)" strokeWidth={1.5}/>
      ))}

      <g transform="translate(220 260)">
        <circle cx={0} cy={0} r={14} fill="none" stroke="var(--ink)" strokeWidth={2.5}/>
        <path d="M -50 6 Q -10 16 30 6" fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round"/>
        <path d="M 28 -6 L 56 -16" stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round"/>
      </g>

      <circle cx={60}  cy={270} r={3} fill="var(--ink-3)"/>
      <circle cx={100} cy={278} r={2} fill="var(--ink-3)"/>
      <circle cx={350} cy={284} r={3} fill="var(--ink-3)"/>
    </svg>
  );
}

// -----------------------------------------------------------
// MoonNightScene — boat under moonlight (evening slide)
// -----------------------------------------------------------
function MoonNightScene() {
  return (
    <svg viewBox="0 0 500 500" style={{ width: "85%", height: "85%" }}>
      {/* stars */}
      {[[80,80,2],[160,50,1.5],[240,100,2],[350,60,1.5],[430,90,2],[120,160,1],[380,180,1.5]].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={p[2]} fill="var(--paper)"/>
      ))}
      {/* moon (crescent) */}
      <circle cx={380} cy={120} r={40} fill="var(--paper)" opacity={0.95}/>
      <circle cx={365} cy={115} r={38} fill="var(--ink)"/>
      {/* horizon */}
      <line x1={20} y1={320} x2={480} y2={320} stroke="var(--paper-deep)" strokeWidth={1.5}/>
      {/* boat silhouette */}
      <g className="bob" transform="translate(180 230)">
        <line x1={60} y1={90} x2={60} y2={0} stroke="var(--paper)" strokeWidth={2}/>
        <path d="M 60 0 L 60 80 L 130 85 Z" fill="var(--paper)" opacity={0.9}/>
        <path d="M 30 90 L 130 90 L 110 110 L 50 110 Z" fill="var(--paper)"/>
      </g>
      {/* ripples */}
      {[360, 400].map((y, i) => (
        <path key={i}
              d={`M 0 ${y} Q 50 ${y - 10} 100 ${y} T 200 ${y} T 300 ${y} T 400 ${y} T 500 ${y}`}
              fill="none" stroke="var(--paper-deep)" strokeWidth={1} opacity={0.6 - i * 0.2}/>
      ))}
    </svg>
  );
}

// -----------------------------------------------------------
// LifeRing — orange/white life ring (safety slide)
// -----------------------------------------------------------
function LifeRing({ size = 160 }) {
  return (
    <svg viewBox="0 0 200 200" style={{ width: size, height: size, flexShrink: 0 }}>
      <circle cx={100} cy={100} r={75} fill="none" stroke="var(--ink)" strokeWidth={14}/>
      <circle cx={100} cy={100} r={75} fill="none" stroke="var(--accent-3)" strokeWidth={14} strokeDasharray="50 50"/>
      <circle cx={100} cy={100} r={40} fill="none" stroke="var(--ink)" strokeWidth={2}/>
    </svg>
  );
}

// Expose globals so Babel-compiled slide files can reference them.
Object.assign(window, {
  SlideFrame, Topline,
  SailingBoat, SaronicMap, SunriseCup, TackingPath,
  SwimmerScene, MoonNightScene, LifeRing,
});
