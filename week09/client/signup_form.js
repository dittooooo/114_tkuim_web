const form = document.querySelector("#signup-form");
const resultEl = document.querySelector("#result");
const submitBtn = document.querySelector("#submit-btn");
const listBtn = document.querySelector("#view-list");

listBtn.addEventListener("click", async () => {
  try {
    console.log("list registrations");
    listBtn.disabled = true;
    resultEl.textContent = "載入中...";

    const res = await fetch("http://localhost:3001/api/signup");
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "載入失敗");

    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultEl.textContent = `錯誤: ${error.message}`;
  } finally {
    listBtn.disabled = false;
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.password = payload.confirmPassword = "demoPass88";
  payload.interests = ["後端入門"];
  payload.terms = true;

  try {
    submitBtn.disabled = true;

    resultEl.textContent = "送出中...";
    const res = await fetch("http://localhost:3001/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "失敗");
    }
    resultEl.textContent = JSON.stringify(data, null, 2);
    form.reset();
  } catch (error) {
    resultEl.textContent = `錯誤：${error.message}`;
  } finally {
    submitBtn.disabled = false;
  }
});
