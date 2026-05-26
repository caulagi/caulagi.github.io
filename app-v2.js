// Three interactive bits: hero photo cycle, email copy, random footer quote.

(() => {
  const card = document.getElementById("hero-card");
  if (card) {
    const imgs = Array.from(card.querySelectorAll(".photo-card__img"));
    const counter = document.getElementById("hero-counter");
    const badge = document.getElementById("hero-badge");
    const caption = document.getElementById("hero-caption");
    const total = String(imgs.length).padStart(2, "0");

    const show = (i) => {
      imgs.forEach((img, j) => img.classList.toggle("is-active", j === i));
      const img = imgs[i];
      counter.textContent = String(i + 1).padStart(2, "0") + "/" + total;
      badge.textContent = img.dataset.code;
      caption.textContent = img.dataset.caption;
    };

    let idx = Math.floor(Math.random() * imgs.length);
    show(idx);

    const advance = () => { idx = (idx + 1) % imgs.length; show(idx); };
    card.addEventListener("click", advance);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); advance(); }
    });
  }

  const copyBtn = document.getElementById("email-copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard?.writeText("caulagi@gmail.com").then(() => {
        copyBtn.textContent = "copied ✓";
        setTimeout(() => { copyBtn.textContent = "copy"; }, 1600);
      });
    });
  }

  const QUOTES = [
    { q: "Everything fails all the time.", a: "Werner Vogels" },
    { q: "Simplicity is prerequisite for reliability.", a: "Edsger W. Dijkstra" },
    { q: "Those who do not understand Unix are condemned to reinvent it, poorly.", a: "Henry Spencer" },
    { q: "Hope is not a strategy.", a: "Google SRE" },
    { q: "Make it work, make it right, make it fast.", a: "Kent Beck" },
    { q: "Worse is better.", a: "Richard P. Gabriel" },
  ];
  const quoteEl = document.getElementById("footer-quote");
  if (quoteEl) {
    const p = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    quoteEl.innerHTML = "“" + p.q + "” <span class=\"footer__motto-author\">— " + p.a + "</span>";
  }

  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
