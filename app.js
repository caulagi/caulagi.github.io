function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// app-v5.jsx — Pradip Caulagi, v5 (Material 3 + playful)

const {
  useState,
  useMemo,
  useEffect
} = React;

/* ─────────────────────────── moods ─────────────────────────── */
const moodSrc = n => {
  const k = "m" + n;
  return typeof window !== "undefined" && window.__resources && window.__resources[k] || "assets/mood-" + String(n).padStart(2, "0") + ".jpg";
};
const MOODS = [{
  src: moodSrc(1),
  caption: "deploy succeeded",
  code: "OK"
}, {
  src: moodSrc(3),
  caption: "this stack trace makes no sense",
  code: "???"
}, {
  src: moodSrc(6),
  caption: "told you the cache was the problem",
  code: "RCA"
}, {
  src: moodSrc(9),
  caption: "who pushed to main?",
  code: "WTF"
}, {
  src: moodSrc(10),
  caption: "shipped on a friday",
  code: "YOLO"
}, {
  src: moodSrc(12),
  caption: "drafting the post-mortem",
  code: "P1"
}];

/* Inline SVG icon library — Material-style line icons (avoids ligature font issues). */
const ICONS = {
  waving_hand: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 11V6a2 2 0 0 0-4 0v5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 10V4a2 2 0 0 0-4 0v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 10.5V6a2 2 0 0 0-4 0v8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
  })),
  open_in_new: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 3h6v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 14 21 3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  })),
  arrow_forward: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 5 7 7-7 7"
  })),
  description: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v4a2 2 0 0 0 2 2h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 13h8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 17h6"
  })),
  auto_awesome: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3 13.8 9.2 20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 3v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 5h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 17v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18h2"
  })),
  build: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
  })),
  health_and_safety: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  email: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "16",
    x: "2",
    y: "4",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
  })),
  family_restroom: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })),
  chess: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 21h14"
  })),
  music_note: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18V5l12-2v13"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "16",
    r: "3"
  })),
  directions_walk: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 17h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 13h4"
  }))
};
const M = ({
  name,
  style,
  className
}) => {
  const svg = ICONS[name];
  if (!svg) return null;
  return React.cloneElement(svg, {
    className: ("msym " + (className || "")).trim(),
    style: {
      width: "1em",
      height: "1em",
      ...style
    },
    "aria-hidden": "true"
  });
};

/* Brand SVGs that aren't in Material Symbols */
const SocialIcon = {
  GitHub: p => /*#__PURE__*/React.createElement("svg", _extends({}, p, {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 18c-4.51 2-5-2-7-2"
  })),
  LinkedIn: p => /*#__PURE__*/React.createElement("svg", _extends({}, p, {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "4",
    height: "12",
    x: "2",
    y: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "4",
    cy: "4",
    r: "2"
  })),
  Mastodon: p => /*#__PURE__*/React.createElement("svg", _extends({}, p, {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21.58 13.913c-.29 1.469-2.592 3.121-5.238 3.396-1.379.143-2.737.275-4.185.215-2.368-.099-4.237-.487-4.237-.487 0 .231.014.451.043.659.308 2.339 2.319 2.478 4.224 2.541 1.923.065 3.638-.473 3.638-.473l.078 1.736s-1.345.722-3.742.853c-1.323.072-2.965-.034-4.875-.541-4.143-1.098-4.857-5.514-4.966-9.997-.033-1.331-.012-2.587-.012-3.638 0-4.585 3.006-5.93 3.006-5.93C6.83.948 9.43.768 12.131.748h.066c2.703.02 5.304.2 6.823.898 0 0 3.006 1.346 3.006 5.93 0 0 .038 3.383-.422 5.737M18.41 7.838v6.027h-2.39V8.017c0-1.227-.514-1.85-1.546-1.85-1.142 0-1.713.737-1.713 2.197v3.183h-2.374V8.363c0-1.46-.572-2.197-1.713-2.197-1.032 0-1.546.623-1.546 1.85v5.85H4.74V7.84c0-1.225.313-2.199.94-2.92.646-.72 1.49-1.09 2.538-1.09 1.213 0 2.13.466 2.738 1.398l.594.996.594-.996c.609-.932 1.526-1.398 2.738-1.398 1.048 0 1.892.37 2.538 1.09.627.72.94 1.694.94 2.918"
  })),
  Rss: p => /*#__PURE__*/React.createElement("svg", _extends({}, p, {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 11a9 9 0 0 1 9 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 4a16 16 0 0 1 16 16"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "19",
    r: "1"
  })),
  ArrowUpRight: p => /*#__PURE__*/React.createElement("svg", _extends({}, p, {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 7h10v10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 17 17 7"
  }))
};

/* ─────────────────────────── App bar ─────────────────────────── */
function AppBar() {
  return /*#__PURE__*/React.createElement("nav", {
    className: "appbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "appbar__links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "appbar__link",
    href: "#profile"
  }, "Profile"), /*#__PURE__*/React.createElement("a", {
    className: "appbar__link",
    href: "#moods"
  }, "Field manual"), /*#__PURE__*/React.createElement("a", {
    className: "appbar__link",
    href: "#contact"
  }, "Say hi")));
}

/* ─────────────────────────── Hero ─────────────────────────── */
function Hero() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * MOODS.length));
  const advance = () => setIdx(i => (i + 1) % MOODS.length);
  const m = MOODS[idx];
  const num = String(idx + 1).padStart(2, "0");
  const total = String(MOODS.length).padStart(2, "0");
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__greet"
  }, "hi ", /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC4B"), " \xA0 i'm"), /*#__PURE__*/React.createElement("h1", {
    className: "md-display-lg"
  }, "Pradip ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "normal",
      color: "var(--md-primary)"
    }
  }, "Caulagi.")), /*#__PURE__*/React.createElement("p", {
    className: "hero__lead"
  }, "Developer and platform engineer. I ", /*#__PURE__*/React.createElement("strong", null, "build & fix things in production"), " \u2014 distributed systems, idiomatic code, and a calm pager."), /*#__PURE__*/React.createElement("div", {
    className: "hero__cta-row"
  }, /*#__PURE__*/React.createElement("a", {
    className: "md-btn md-btn--filled",
    href: "#contact"
  }, /*#__PURE__*/React.createElement(M, {
    name: "waving_hand",
    style: {
      fontSize: 18
    }
  }), "Say hi"), /*#__PURE__*/React.createElement("a", {
    className: "md-btn md-btn--outlined",
    href: "https://github.com/caulagi",
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement(M, {
    name: "open_in_new",
    style: {
      fontSize: 18
    }
  }), "GitHub"))), /*#__PURE__*/React.createElement("div", {
    className: "hero__photo-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo-card__hint"
  }, "tap to cycle ", /*#__PURE__*/React.createElement(M, {
    name: "arrow_forward"
  })), /*#__PURE__*/React.createElement("div", {
    className: "photo-card",
    onClick: advance,
    role: "button",
    tabIndex: 0,
    "aria-label": "Next mood",
    onKeyDown: e => (e.key === "Enter" || e.key === " ") && advance()
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo-card__media"
  }, MOODS.map((mm, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: mm.src,
    alt: "",
    className: "photo-card__img" + (i === idx ? " is-active" : ""),
    loading: i === 0 ? "eager" : "lazy"
  })), /*#__PURE__*/React.createElement("span", {
    className: "photo-card__counter"
  }, num, "/", total), /*#__PURE__*/React.createElement("span", {
    className: "photo-card__badge"
  }, m.code)), /*#__PURE__*/React.createElement("div", {
    className: "photo-card__caption",
    key: idx
  }, m.caption)))));
}

/* ─────────────────────────── Profile ─────────────────────────── */
const SHEET = [{
  label: "Role",
  kind: "text",
  value: "Platform / Systems Developer"
}, {
  label: "Focus",
  kind: "text",
  value: "Distributed systems · Production reliability"
}, {
  label: "Track",
  kind: "text",
  value: "Startups → mid-size → large"
}, {
  label: "Languages",
  kind: "chips",
  chips: [{
    label: "python",
    primary: true
  }, {
    label: "go",
    primary: true
  }, {
    label: "rust",
    primary: true
  }, {
    label: "sql"
  }]
}, {
  label: "Infra",
  kind: "chips",
  chips: [{
    label: "kubernetes",
    primary: true
  }, {
    label: "terraform"
  }, {
    label: "gcp"
  }, {
    label: "prometheus"
  }, {
    label: "grafana"
  }]
}, {
  label: "I build",
  kind: "chips",
  chips: [{
    label: "gRPC services",
    primary: true
  }, {
    label: "backend APIs"
  }, {
    label: "platforms"
  }, {
    label: "internal tools"
  }]
}];
function Profile() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--container",
    id: "profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "md-label"
  }, "01 / Profile"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title"
  }, "A developer who lives close to the ", /*#__PURE__*/React.createElement("em", null, "production floor"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile__intro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile__current"
  }, /*#__PURE__*/React.createElement(M, {
    name: "auto_awesome",
    style: {
      fontSize: 22
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "profile__current-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "profile__current-label"
  }, "currently into"), /*#__PURE__*/React.createElement("span", {
    className: "profile__current-value"
  }, "Kubernetes, Rust, WASM & Nix")))), /*#__PURE__*/React.createElement("div", {
    className: "profile__sheet"
  }, /*#__PURE__*/React.createElement("span", {
    className: "profile__sheet-tag"
  }, /*#__PURE__*/React.createElement(M, {
    name: "description"
  }), " Spec sheet"), SHEET.map((row, i) => /*#__PURE__*/React.createElement("div", {
    className: "profile__row",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "profile__row-label"
  }, row.label), row.kind === "text" ? /*#__PURE__*/React.createElement("span", {
    className: "profile__row-value"
  }, row.value) : /*#__PURE__*/React.createElement("div", {
    className: "profile__row-chips"
  }, row.chips.map((c, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    className: "md-chip" + (c.primary ? " md-chip--primary" : "")
  }, c.label)))))))));
}

/* ─────────────────────────── Production ─────────────────────────── */
function Production() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "md-label"
  }, "02 / In production"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title"
  }, "I build and I fix \u2014 ", /*#__PURE__*/React.createElement("em", null, "usually on the same day"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "prod"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prod__col prod__col--build"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prod__col-eyebrow prod__col-eyebrow--build"
  }, /*#__PURE__*/React.createElement(M, {
    name: "build"
  }), " Build"), /*#__PURE__*/React.createElement("h3", {
    className: "prod__col-title"
  }, "Backends that hold up under load."), /*#__PURE__*/React.createElement("ul", {
    className: "prod__col-list"
  }, /*#__PURE__*/React.createElement("li", null, "Designing and shipping backend APIs and gRPC services."), /*#__PURE__*/React.createElement("li", null, "Idiomatic, well-tested code \u2014 reviewed by humans, exercised by CI."), /*#__PURE__*/React.createElement("li", null, "Internal platforms that get out of developers' way."), /*#__PURE__*/React.createElement("li", null, "Contributing back to the open-source projects I depend on."))), /*#__PURE__*/React.createElement("div", {
    className: "prod__col prod__col--ops"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prod__col-eyebrow prod__col-eyebrow--ops"
  }, /*#__PURE__*/React.createElement(M, {
    name: "health_and_safety"
  }), " Operate"), /*#__PURE__*/React.createElement("h3", {
    className: "prod__col-title"
  }, "A calm pager, a quiet on-call."), /*#__PURE__*/React.createElement("ul", {
    className: "prod__col-list"
  }, /*#__PURE__*/React.createElement("li", null, "Running production systems on Kubernetes across cloud providers."), /*#__PURE__*/React.createElement("li", null, "Diagnosing the gnarly stuff \u2014 latency, throughput, weird tail behaviour."), /*#__PURE__*/React.createElement("li", null, "Helping teammates daily: code review, design review, the occasional rubber duck."), /*#__PURE__*/React.createElement("li", null, "Turning incidents into runbooks, alerts, and tests so they don't come back."))))));
}

/* ─────────────────────────── Field Manual ─────────────────────────── */
function FieldManual() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--container",
    id: "moods"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "md-label"
  }, "03 / Field manual"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title"
  }, "A platform engineer's ", /*#__PURE__*/React.createElement("em", null, "emotional dashboard"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, MOODS.map((m, i) => /*#__PURE__*/React.createElement("div", {
    className: "field__cell",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo-card__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: m.src,
    alt: "",
    loading: "lazy",
    className: "photo-card__img is-active"
  }), /*#__PURE__*/React.createElement("span", {
    className: "photo-card__counter"
  }, String(i + 1).padStart(2, "0"), "/", String(MOODS.length).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "photo-card__badge"
  }, m.code)), /*#__PURE__*/React.createElement("div", {
    className: "photo-card__caption"
  }, m.caption)))))));
}

/* ─────────────────────────── Outside ─────────────────────────── */
const OUTSIDE = [{
  label: "Family",
  title: "Girlfriend & two kids.",
  body: "The most distributed system I help maintain.",
  icon: "family_restroom"
}, {
  label: "Game",
  title: "Chess.",
  body: "I watch and play. Tactics over openings, endgames over both.",
  icon: "chess"
}, {
  label: "Listening",
  title: "Indian classical.",
  body: "Hindustani and Carnatic both. Ask me what to start with.",
  icon: "music_note"
}, {
  label: "Lately",
  title: "Long walks.",
  body: "Found in 2026. Best debugging tool I've added in years.",
  icon: "directions_walk"
}];
function Outside() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "md-label"
  }, "04 / Outside the terminal"), /*#__PURE__*/React.createElement("h2", {
    className: "section__title"
  }, "When the laptop ", /*#__PURE__*/React.createElement("em", null, "closes"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "outside"
  }, OUTSIDE.map((o, i) => /*#__PURE__*/React.createElement("div", {
    className: "outside-card",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "outside-card__icon"
  }, /*#__PURE__*/React.createElement(M, {
    name: o.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "outside-card__label"
  }, o.label), /*#__PURE__*/React.createElement("span", {
    className: "outside-card__title"
  }, o.title), /*#__PURE__*/React.createElement("p", {
    className: "outside-card__body"
  }, o.body))))));
}

/* ─────────────────────────── Contact ─────────────────────────── */
const LINKS = [{
  label: "GitHub",
  handle: "@caulagi",
  href: "https://github.com/caulagi",
  Icon: SocialIcon.GitHub
}, {
  label: "Mastodon",
  handle: "@caulagi@mastodon.social",
  href: "https://mastodon.social/@caulagi",
  Icon: SocialIcon.Mastodon
}, {
  label: "LinkedIn",
  handle: "in/pradipcaulagi",
  href: "https://www.linkedin.com/in/pradipcaulagi",
  Icon: SocialIcon.LinkedIn
}, {
  label: "Blog",
  handle: "blog.caulagi.com",
  href: "https://blog.caulagi.com/",
  Icon: SocialIcon.Rss
}];
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "caulagi@gmail.com";
  const copy = e => {
    e.preventDefault();
    navigator.clipboard?.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section section--container",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "md-label"
  }, "05 / Say hi")), /*#__PURE__*/React.createElement("div", {
    className: "contact"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "section__title"
  }, "Happy to ", /*#__PURE__*/React.createElement("em", null, "hear from you"), "."), /*#__PURE__*/React.createElement("p", {
    className: "hero__lead",
    style: {
      marginTop: 16
    }
  }, "Roles, side projects, ragas, a good chess puzzle \u2014 all welcome. Easiest is email. If you'd rather poke around first, I'm on the usual places."), /*#__PURE__*/React.createElement("a", {
    className: "contact__email-card",
    href: "mailto:" + email
  }, /*#__PURE__*/React.createElement(M, {
    name: "email"
  }), /*#__PURE__*/React.createElement("div", {
    className: "contact__email-card-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact__email-card-label"
  }, "Email"), /*#__PURE__*/React.createElement("span", {
    className: "contact__email-card-addr"
  }, email)), /*#__PURE__*/React.createElement("button", {
    className: "contact__email-card-copy",
    onClick: copy,
    title: "Copy email"
  }, copied ? "copied ✓" : "copy"))), /*#__PURE__*/React.createElement("div", {
    className: "contact__links"
  }, LINKS.map((l, i) => /*#__PURE__*/React.createElement("a", {
    className: "contact-link",
    key: i,
    href: l.href,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement(l.Icon, {
    className: "contact-link__icon"
  }), /*#__PURE__*/React.createElement("span", {
    className: "contact-link__label"
  }, l.label), /*#__PURE__*/React.createElement("span", {
    className: "contact-link__handle"
  }, l.handle), /*#__PURE__*/React.createElement(SocialIcon.ArrowUpRight, {
    className: "contact-link__arrow"
  })))))));
}

/* ─────────────────────────── Footer ─────────────────────────── */
const QUOTES = [{
  q: "Everything fails all the time.",
  a: "Werner Vogels"
}, {
  q: "Simplicity is prerequisite for reliability.",
  a: "Edsger W. Dijkstra"
}, {
  q: "Those who do not understand Unix are condemned to reinvent it, poorly.",
  a: "Henry Spencer"
}, {
  q: "Hope is not a strategy.",
  a: "Google SRE"
}, {
  q: "Make it work, make it right, make it fast.",
  a: "Kent Beck"
}, {
  q: "Worse is better.",
  a: "Richard P. Gabriel"
}];
function Footer() {
  const year = new Date().getFullYear();
  const pick = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer__motto"
  }, "\u201C", pick.q, "\u201D ", /*#__PURE__*/React.createElement("span", {
    className: "footer__motto-author"
  }, "\u2014 ", pick.a)), /*#__PURE__*/React.createElement("div", {
    className: "footer__meta"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", year, " \xB7 pradip caulagi"), /*#__PURE__*/React.createElement("span", {
    className: "footer__meta-dot"
  }), /*#__PURE__*/React.createElement("span", null, "built with material, coral & \u2615")))));
}

/* ─────────────────────────── FAB ─────────────────────────── */
function Fab() {
  return /*#__PURE__*/React.createElement("a", {
    className: "fab",
    href: "#contact",
    "aria-label": "Say hi"
  }, /*#__PURE__*/React.createElement(M, {
    name: "waving_hand"
  }), " Say hi");
}

/* ─────────────────────────── App ─────────────────────────── */
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Profile, null), /*#__PURE__*/React.createElement(Production, null), /*#__PURE__*/React.createElement(FieldManual, null), /*#__PURE__*/React.createElement(Outside, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(Fab, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));