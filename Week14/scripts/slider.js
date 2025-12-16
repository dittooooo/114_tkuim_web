export class ServiceCarousel {
  constructor(options) {
    this.container = options.container; // element
    this.button = options.button; // element
    this.data = options.data || [];
    this.index = 0;
    this.imgEl = this.container.querySelector(".service-card-media img");
    this.titleEl = this.container.querySelector(".card-title");
    this.textEl = this.container.querySelector(".card-text");
    this.prevBtn = this.container.querySelector(".prev-btn");
    this.indicatorsEl = this.container.querySelector(".indicators");
    this.statusEl = this.container.querySelector(".carousel-status");
    this.autoplayInterval = options.autoplayInterval || 5000;
    this.autoplayTimer = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleIndicatorKey = this.handleIndicatorKey?.bind(this);
  }

  init() {
    if (!this.container || !this.button) return;
    this.button.addEventListener("click", this.handleClick);
    this.button.addEventListener("keydown", this.handleKey);
    this.button.tabIndex = 0;
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.prev();
        this.prevBtn.focus();
      });
      this.prevBtn.addEventListener("keydown", this.handleKey);
    }

    // build indicators
    if (this.indicatorsEl && this.data.length) {
      this.indicatorsEl.innerHTML = "";
      this.indicatorButtons = [];
      this.data.forEach((d, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "indicator";
        btn.setAttribute("aria-label", `Slide ${i + 1}`);
        btn.dataset.index = String(i);
        btn.addEventListener("click", () => {
          this.goto(i);
        });
        btn.addEventListener("keydown", (e) => this.handleIndicatorKey(e));
        this.indicatorsEl.appendChild(btn);
        this.indicatorButtons.push(btn);
      });
    }

    // pause on hover/focus
    this.container.addEventListener("mouseenter", () => this.stopAutoplay());
    this.container.addEventListener("mouseleave", () => this.startAutoplay());
    this.container.addEventListener("focusin", () => this.stopAutoplay());
    this.container.addEventListener("focusout", () => this.startAutoplay());

    // start autoplay
    this.startAutoplay();
    this.render();
  }

  destroy() {
    this.button.removeEventListener("click", this.handleClick);
    this.button.removeEventListener("keydown", this.handleKey);
  }

  handleClick() {
    this.next();
    this.button.focus();
    this.restartAutoplay();
  }

  handleKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.next();
    }
    if (e.key === "ArrowRight") this.next();
    if (e.key === "ArrowLeft") this.prev();
  }

  handleIndicatorKey(e) {
    const tgt = e.target;
    if (!tgt || !tgt.dataset) return;
    let idx = Number(tgt.dataset.index);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      idx = (idx + 1) % this.data.length;
      this.indicatorButtons[idx].focus();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      idx = (idx - 1 + this.data.length) % this.data.length;
      this.indicatorButtons[idx].focus();
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.goto(Number(tgt.dataset.index));
    }
  }

  next() {
    this.index = (this.index + 1) % this.data.length;
    this.render();
  }

  prev() {
    this.index = (this.index - 1 + this.data.length) % this.data.length;
    this.render();
    this.restartAutoplay();
  }

  render() {
    const item = this.data[this.index];
    if (!item) return;
    // fade effect
    if (this.imgEl) {
      this.imgEl.style.opacity = 0;
      setTimeout(() => {
        this.imgEl.src = item.img;
        this.imgEl.alt = item.alt || this.imgEl.alt;
        this.titleEl.textContent = item.title;
        this.textEl.textContent = item.text;
        this.imgEl.style.opacity = 1;
        // update indicators
        if (this.indicatorButtons) {
          this.indicatorButtons.forEach((b, i) => {
            b.classList.toggle("active", i === this.index);
            b.setAttribute("aria-pressed", String(i === this.index));
            if (i === this.index) b.setAttribute("aria-current", "true");
            else b.removeAttribute("aria-current");
          });
        }
        // announce status for screen readers
        if (this.statusEl) {
          this.statusEl.textContent = `${this.index + 1} / ${
            this.data.length
          } — ${item.title}`;
        }
      }, 160);
    }
  }

  goto(i) {
    if (typeof i !== "number") return;
    this.index = ((i % this.data.length) + this.data.length) % this.data.length;
    this.render();
    this.restartAutoplay();
  }

  restartAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  startAutoplay() {
    if (this.autoplayTimer) return;
    this.autoplayTimer = setInterval(() => this.next(), this.autoplayInterval);
  }

  stopAutoplay() {
    if (!this.autoplayTimer) return;
    clearInterval(this.autoplayTimer);
    this.autoplayTimer = null;
  }
}
