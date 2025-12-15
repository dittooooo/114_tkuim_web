const cards = [
  {
    title: "精神科訪問看護事業",
    text: "訪問看護ステーションを通じて、地域で暮らす方々の支援を行います。",
    img: "image/螢幕擷取畫面 2025-12-15 103504.png",
  },
  {
    title: "自立生活援助事業",
    text: "自立した生活を支援するためのプログラムと相談支援を実施します。",
    img: "image/螢幕擷取畫面 2025-12-15 103513.png",
  },
];

let idx = 0;
const nextBtn = document.getElementById("next-btn");
const card = document.getElementById("service-card");

function render() {
  const imgEl = card.querySelector(".service-card-media img");
  const titleEl = card.querySelector(".card-title");
  const textEl = card.querySelector(".card-text");
  const item = cards[idx];
  imgEl.style.opacity = 0;
  setTimeout(() => {
    imgEl.src = item.img;
    titleEl.textContent = item.title;
    textEl.textContent = item.text;
    imgEl.style.opacity = 1;
  }, 160);
}

nextBtn.addEventListener("click", () => {
  idx = (idx + 1) % cards.length;
  render();
});

// initial
render();
