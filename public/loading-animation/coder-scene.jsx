const { Stage, useTime } = window;

const C = {
  kw: "#c792ea",   // keyword purple
  fn: "#82aaff",   // function blue
  var: "#f2b56b",  // variable / arg
  st: "#c3e88d",   // string green
  cm: "#5c6488",   // comment muted
  def: "#b7bce0",  // default
};

// Each line = array of [text, colorKey]
const CODE = [
  [["const ", "kw"], ["ship", "fn"], [" = ", "def"], ["await ", "kw"], ["cosmos", "fn"], [".", "def"], ["boot", "fn"], ["()", "def"]],
  [],
  [["function ", "kw"], ["render", "fn"], ["(", "def"], ["stars", "var"], [") {", "def"]],
  [["  return ", "kw"], ["stars", "var"], [".", "def"], ["map", "fn"], ["(", "def"], ["twinkle", "fn"], [")", "def"]],
  [["}", "def"]],
  [],
  [["// compiling the universe", "cm"]],
  [["deploy", "fn"], ["(", "def"], ["'", "st"], ["/magic", "st"], ["'", "st"], [")", "def"]],
];

const GAP = 4; // pause chars between lines
function lineLen(line) { return line.reduce((n, t) => n + t[0].length, 0); }
const TOTAL = CODE.reduce((n, l) => n + lineLen(l) + GAP, 0);

function CodeBlock({ shown, caretOn }) {
  let cursor = 0;
  const rows = CODE.map((line, li) => {
    const ll = lineLen(line);
    const lineStart = cursor;
    const lineEnd = cursor + ll;
    const active = shown > lineStart && shown <= lineEnd + GAP;
    let consumed = 0;
    const spans = line.map((tok, ti) => {
      const [txt, key] = tok;
      const startAbs = lineStart + consumed;
      const vis = Math.max(0, Math.min(txt.length, shown - startAbs));
      consumed += txt.length;
      return React.createElement("span", { key: ti, style: { color: C[key] } }, txt.slice(0, vis));
    });
    cursor = lineEnd + GAP;
    const showCaret = active && caretOn;
    return React.createElement(
      "div",
      { key: li, style: { minHeight: 30, whiteSpace: "pre", display: "flex", alignItems: "center" } },
      spans,
      showCaret ? React.createElement("span", {
        style: { display: "inline-block", width: 11, height: 22, background: "#a78bff", marginLeft: 2, boxShadow: "0 0 10px #a78bff", borderRadius: 1 }
      }) : null
    );
  });
  return rows;
}

function CoderLoader() {
  const t = useTime();
  const LOOP = 6.5;
  const tt = t % LOOP;

  // typing reveal
  const typeDur = 5.0;
  const shown = Math.min(TOTAL, Math.floor((tt / typeDur) * TOTAL));
  const caretOn = Math.floor(t * 1.6) % 2 === 0;

  // ambient
  const bob = Math.sin(t * 1.15) * 6;
  const ring = (t / 8) * 360;
  const capeSway = Math.sin(t * 0.9) * 2.5;

  // loading dots
  const dots = Math.floor((t % 1.6) / 0.4); // 0..3
  const dotStr = ".".repeat(dots);

  return React.createElement(
    "div",
    { style: { position: "absolute", inset: 0, background: "#08070f", overflow: "hidden", fontFamily: "'DM Sans', system-ui, sans-serif" } },

    // ---- ambient radial glow behind monitor ----
    React.createElement("div", { style: {
      position: "absolute", left: "50%", top: 300, width: 760, height: 620,
      transform: "translateX(-50%)",
      background: "radial-gradient(ellipse at center, rgba(96,74,220,0.30), rgba(60,40,150,0.10) 45%, transparent 68%)",
    } }),

    // faint stars
    ...Array.from({ length: 40 }, (_, i) => {
      const seed = (i * 928371) % 1000 / 1000;
      const seed2 = (i * 573913) % 1000 / 1000;
      const x = seed * 1000, y = seed2 * 640;
      const s = 1 + ((i * 7) % 3);
      const tw = 0.35 + 0.55 * Math.abs(Math.sin(t * (0.8 + seed) + i));
      return React.createElement("div", { key: "st" + i, style: {
        position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%",
        background: "#cdd3ff", opacity: tw, boxShadow: "0 0 4px #9aa4ff",
      } });
    }),

    // ================= MONITOR =================
    React.createElement("div", { style: {
      position: "absolute", left: "50%", top: 92, width: 640, height: 430,
      transform: "translateX(-50%)",
      borderRadius: 22, padding: 12,
      background: "linear-gradient(160deg,#1b1830,#100e1e)",
      boxShadow: "0 0 0 2px rgba(140,110,255,0.35), 0 0 60px rgba(110,80,230,0.30), inset 0 0 0 1px rgba(255,255,255,0.05)",
    } },
      // screen
      React.createElement("div", { style: {
        width: "100%", height: "100%", borderRadius: 12, overflow: "hidden",
        background: "linear-gradient(180deg,#14121f,#0f0d1a)",
        boxShadow: "inset 0 0 40px rgba(90,60,200,0.25)",
        display: "flex", flexDirection: "column",
      } },
        // title bar
        React.createElement("div", { style: {
          height: 40, display: "flex", alignItems: "center", gap: 8, padding: "0 16px",
          borderBottom: "1px solid rgba(140,110,255,0.14)", background: "rgba(255,255,255,0.02)",
        } },
          React.createElement("div", { style: { width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" } }),
          React.createElement("div", { style: { width: 11, height: 11, borderRadius: "50%", background: "#febc2e" } }),
          React.createElement("div", { style: { width: 11, height: 11, borderRadius: "50%", background: "#28c840" } }),
          React.createElement("span", { style: { marginLeft: 12, color: "#7b82ad", fontSize: 14, fontFamily: "'JetBrains Mono', monospace" } }, "cosmos.js"),
          React.createElement("span", { style: { marginLeft: "auto", color: "#8b5cf6", fontSize: 15, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 } }, "</>")
        ),
        // code area
        React.createElement("div", { style: {
          flex: 1, padding: "18px 22px", fontFamily: "'JetBrains Mono', monospace",
          fontSize: 19, lineHeight: "30px", color: C.def,
        } },
          React.createElement(CodeBlock, { shown, caretOn })
        )
      )
    ),
    // monitor stand
    React.createElement("div", { style: { position: "absolute", left: "50%", top: 522, width: 90, height: 26, transform: "translateX(-50%)", background: "linear-gradient(#211d38,#15121f)", borderRadius: "0 0 6px 6px" } }),
    React.createElement("div", { style: { position: "absolute", left: "50%", top: 546, width: 190, height: 12, transform: "translateX(-50%)", background: "#191527", borderRadius: 8, boxShadow: "0 0 20px rgba(120,90,240,0.25)" } }),

    // ================= CHARACTER (from behind) =================
    React.createElement("div", { style: {
      position: "absolute", left: "50%", bottom: 92, transform: `translateX(-50%) translateY(${bob}px)`,
      width: 520, height: 560,
    } },

      // ---- body / shoulders (mostly hidden behind the chair) ----
      React.createElement("div", { style: {
        position: "absolute", left: "50%", top: 232, width: 210, height: 150,
        transform: "translateX(-50%)",
        background: "linear-gradient(180deg,#241f3a,#171326)",
        borderRadius: "90px 90px 0 0",
        boxShadow: "inset 0 3px 0 rgba(150,120,255,0.12), inset -22px 0 34px rgba(0,0,0,0.35), inset 22px 0 34px rgba(0,0,0,0.35)",
      } },
        // collar / back seam
        React.createElement("div", { style: { position: "absolute", left: "50%", top: 18, width: 2, height: 120, transform: "translateX(-50%)", background: "linear-gradient(rgba(150,120,255,0.3),rgba(150,120,255,0.03))" } })
      ),

      // ---- chair back (in front of the body — only shoulders peek above it) ----
      React.createElement("div", { style: {
        position: "absolute", left: "50%", top: 268, width: 296, height: 290,
        transform: "translateX(-50%)", background: "linear-gradient(180deg,#171426,#0f0c18)",
        borderRadius: "60px 60px 24px 24px",
        boxShadow: "inset 0 0 0 2px rgba(130,100,240,0.18), 0 0 30px rgba(0,0,0,0.5)",
      } }),

      // ---- Saturn ring : BACK half (behind the head) ----
      React.createElement("div", { style: {
        position: "absolute", left: "50%", top: 128, width: 340, height: 86,
        transform: `translateX(-50%) rotate(-14deg)`, borderRadius: "50%",
        border: "7px solid rgba(150,110,255,0.85)",
        boxShadow: "0 0 24px rgba(140,100,255,0.55)",
        clipPath: "polygon(0 0,100% 0,100% 52%,0 52%)",
        opacity: 0.85,
      } }),

      // ---- planet head ----
      React.createElement("div", { style: {
        position: "absolute", left: "50%", top: 40, width: 226, height: 226,
        transform: "translateX(-50%)", borderRadius: "50%",
        background: "radial-gradient(circle at 42% 36%, #8f9dff, #5a58d6 44%, #332c90 78%, #221a72)",
        boxShadow: "0 0 58px rgba(110,95,240,0.5), inset -20px -20px 46px rgba(0,0,0,0.4), inset 14px 12px 34px rgba(190,200,255,0.3)",
        overflow: "hidden",
      } },
        // subtle bands
        React.createElement("div", { style: { position: "absolute", top: "38%", left: "-10%", width: "120%", height: 14, background: "rgba(40,30,110,0.6)", filter: "blur(3px)", transform: "rotate(-6deg)" } }),
        React.createElement("div", { style: { position: "absolute", top: "60%", left: "-10%", width: "120%", height: 20, background: "rgba(120,130,255,0.25)", filter: "blur(4px)", transform: "rotate(-6deg)" } })
      ),

      // ---- Saturn ring : FRONT half (in front of the head) ----
      React.createElement("div", { style: {
        position: "absolute", left: "50%", top: 128, width: 340, height: 86,
        transform: `translateX(-50%) rotate(-14deg)`, borderRadius: "50%",
        border: "7px solid rgba(168,132,255,0.95)",
        boxShadow: "0 0 26px rgba(150,110,255,0.7), inset 0 0 18px rgba(150,110,255,0.4)",
        clipPath: "polygon(0 48%,100% 48%,100% 100%,0 100%)",
      } }),

      // ---- wizard hat (single triangle, above the head) ----
      React.createElement("div", { style: {
        position: "absolute", left: "50%", top: -150, width: 280, height: 210,
        transform: "translateX(-50%)",
      } },
        // single cone triangle
        React.createElement("div", { style: {
          position: "absolute", left: "50%", top: 0, width: 180, height: 168,
          transform: "translateX(-50%)", transformOrigin: "bottom center",
          background: "linear-gradient(102deg,#2b2542 42%,#161222)",
          clipPath: "polygon(50% 0,100% 100%,0 100%)",
          boxShadow: "-4px 0 14px rgba(150,120,255,0.22)",
        } },
          // </> glowing on the hat back
          React.createElement("div", { style: {
            position: "absolute", left: "50%", top: 92, transform: "translateX(-50%)",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 800, color: "#c3a9ff",
            textShadow: "0 0 14px rgba(160,120,255,0.95)",
          } }, "</>")
        ),
        // gold band with buckle (above the brim base)
        React.createElement("div", { style: {
          position: "absolute", left: "50%", top: 152, width: 178, height: 26,
          transform: "translateX(-50%)",
          background: "linear-gradient(#f0c257,#c08c2c)", borderRadius: 5,
          boxShadow: "0 0 12px rgba(235,185,85,0.55), inset 0 1px 0 rgba(255,240,200,0.6)",
        } },
          React.createElement("div", { style: { position: "absolute", left: "50%", top: 4, width: 20, height: 18, transform: "translateX(-50%)", border: "3px solid #6f4a0e", borderRadius: 4, background: "rgba(40,32,60,0.4)" } })
        ),
        // wide brim (base)
        React.createElement("div", { style: {
          position: "absolute", left: "50%", top: 168, width: 272, height: 58,
          transform: "translateX(-50%)", borderRadius: "50%",
          background: "linear-gradient(180deg,#322a4c,#161221 70%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.55), inset 0 2px 0 rgba(160,130,255,0.22)",
        } })
      )
    ),

    // ================= DESK =================
    React.createElement("div", { style: {
      position: "absolute", left: 0, bottom: 0, width: "100%", height: 96,
      background: "linear-gradient(180deg,#141021,#0a0812)",
      boxShadow: "inset 0 2px 0 rgba(140,110,255,0.35), inset 0 3px 24px rgba(110,80,230,0.15)",
    } }),
    React.createElement("div", { style: {
      position: "absolute", left: 0, bottom: 94, width: "100%", height: 2,
      background: "linear-gradient(90deg,transparent,rgba(150,110,255,0.7),transparent)",
    } }),

    // ================= LOADING TEXT =================
    React.createElement("div", { style: {
      position: "absolute", left: "50%", bottom: 30, transform: "translateX(-50%)",
      display: "flex", alignItems: "baseline",
      fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 600,
      color: "#c9c3f0", letterSpacing: 3, textShadow: "0 0 16px rgba(120,90,240,0.5)",
    } },
      React.createElement("span", null, "LOADING"),
      React.createElement("span", { style: { display: "inline-block", width: 40, textAlign: "left", color: "#a78bff" } }, dotStr)
    )
  );
}

function Scene() {
  return React.createElement(
    Stage,
    { width: 1000, height: 1000, duration: 6.5, background: "#08070f", loop: true, autoplay: true },
    React.createElement(CoderLoader, null)
  );
}

window.Scene = Scene;