import { ServiceCarousel } from "./slider.js";

const cards = [
  {
    title: "精神科訪問看護事業",
    text: "訪問看護ステーションを通じて、地域で暮らす方々の支援を行います。",
    img: "image/螢幕擷取畫面 2025-12-15 103504.png",
    alt: "精神科訪問看護のスタッフが笑顔で訪問する写真",
  },
  {
    title: "自立生活援助事業",
    text: "自立した生活を支援するためのプログラムと相談支援を実施します。",
    img: "image/螢幕擷取畫面 2025-12-15 103513.png",
    alt: "自立生活援助のイメージ写真",
  },
];

function init() {
  const card = document.getElementById("service-card");
  const nextBtn = document.getElementById("next-btn");
  if (card && nextBtn) {
    const carousel = new ServiceCarousel({
      container: card,
      button: nextBtn,
      data: cards,
      autoplayInterval: 4000,
    });
    carousel.init();
  }

  // Mobile nav toggle
  document.querySelectorAll(".hamburger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = btn.getAttribute("data-target");
      if (!targetId) return;
      const nav = document.getElementById(targetId);
      if (!nav) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
      nav.setAttribute("aria-hidden", String(expanded));
    });
  });

  // Highlight active nav link based on current path
  (function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-pill a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href === "#" && (path === "" || path === "index.html")) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      } else {
        const hrefBase = href.split("/").pop();
        if (hrefBase === path) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        }
      }
    });
  })();
}

init();
