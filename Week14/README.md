# Week14 — M.cares Landing (復刻)

簡短說明

- 依據 `todo.md` 製作的簡易 Landing Page（Hero + Service 區塊），以 Desktop 為主、做了三個斷點的 RWD 支援。
- 已完成：視覺樣式、設計變數、可及性改善（skip link / aria / focus-visible）、一個可鍵盤操作與自動播放的 Carousel（含 prev / indicators / aria-live）。

快速預覽

- 啟動本機靜態伺服器（在 `Week14` 目錄執行）：

```bash
# 開啟瀏覽器： http://localhost:8000
```

主要檔案說明

- `index.html`：首頁（Hero + Service + Carousel）
- `about.html`：關於頁（View more 的目的地）
- `careers.html`：採用資訊頁（文字 + Numbers 區塊）
- `styles/variables.css`：所有顏色、圓角、陰影與容器寬度的變數
- `styles/styles.css`：頁面全部樣式（含 RWD 規則）
- `scripts/slider.js`：輪播元件 `ServiceCarousel`
- `scripts/main.js`：頁面初始化（漢堡選單、輪播 init、active nav 標示）

設計與可及性要點

- 設計 tokens：使用 `--*` 變數集中管理配色與圓角，方便全局調整。
- RWD：已實作多個斷點（手機、平板、筆電、桌機），視窗超寬展示會擴展容器寬度。
- 可及性：加入 `skip link`、按鈕 focus-visible 樣式、ARIA 屬性（nav、carousel 狀態）與可鍵盤操作。
