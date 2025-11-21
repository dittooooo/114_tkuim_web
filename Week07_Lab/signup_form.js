const form = document.querySelector("form");
const statusBox = document.getElementById("form_status");
const submitBtn = document.getElementById("submitBtn");
const interestsBox = document.getElementById("interests");

const fields = {
  name: document.getElementById("name"),
  phone: document.getElementById("phone"),
  email: document.getElementById("email_address"),
  password: document.getElementById("password"),
  confirm: document.getElementById("confirm_password"),
  terms: document.getElementById("service_terms"),
};

const touched = new Set();

function setFieldVisualState(el, ok) {
  const hasValue = el.type === "checkbox" ? el.checked : el.value.trim() !== "";
  el.classList.remove("is-valid", "is-invalid");
  if (ok && hasValue) {
    el.classList.add("is-valid");
  } else if (!ok) {
    el.classList.add("is-invalid");
  }
}

function setError(el, msg, errorId) {
  const p = document.getElementById(errorId);
  if (!p) return;
  p.textContent = msg || " ";
  p.style.display = msg ? "block" : "none";
}

function validateName(showMsg = false) {
  const el = fields.name;
  el.setCustomValidity("");
  let msg = "";
  if (el.value.trim() === "") msg = "請輸入您的姓名";
  el.setCustomValidity(msg);
  if (showMsg) setError(el, msg, "name_error");
  return !msg;
}

function validatePhone(showMsg = false) {
  const el = fields.phone;
  el.setCustomValidity("");
  let msg = "";
  if (el.value.trim() === "") msg = "請輸入您的手機號碼";
  else if (!/^09\d{8}$/.test(el.value.trim()))
    msg = "手機格式錯誤，請輸入09開頭共10碼";
  el.setCustomValidity(msg);
  if (showMsg) setError(el, msg, "phone_error");
  return !msg;
}

function validateEmail(showMsg = false) {
  const el = fields.email;
  el.setCustomValidity("");
  let msg = "";
  const value = el.value.trim();
  if (value === "") msg = "請輸入電子郵件地址";
  else if (!el.checkValidity()) msg = "請輸入有效的電子郵件地址";
  el.setCustomValidity(msg);
  if (showMsg) setError(el, msg, "email_error");
  return !msg;
}

function validatePassword(showMsg = false) {
  const el = fields.password;
  el.setCustomValidity("");
  let msg = "";
  if (el.value.trim() === "") msg = "請輸入您的密碼";
  else if (el.value.length < 8) msg = "請輸入至少 8 碼的密碼";
  el.setCustomValidity(msg);
  if (showMsg) {
    setError(el, msg, "password_error");
  }
  return !msg;
}

function validateConfirm(showMsg = false) {
  const el = fields.confirm;
  const pwd = fields.password.value;
  el.setCustomValidity("");
  let msg = "";
  if (el.value.trim() === "") msg = "請再次輸入密碼";
  else if (el.value !== pwd) msg = "兩次密碼不一致";
  el.setCustomValidity(msg);
  if (showMsg) setError(el, msg, "confirm_password_error");
  return !msg;
}

function validateInterests(showMsg = false) {
  const boxes = interestsBox.querySelectorAll('input[name="interests"]');
  const anyChecked = Array.from(boxes).some((cb) => cb.checked);
  const msg = anyChecked ? "" : "請至少選擇一個興趣";

  // 設定所有 checkbox 的驗證狀態
  boxes.forEach((cb) => {
    cb.setCustomValidity(msg);
    cb.classList.remove("is-valid", "is-invalid");
    cb.classList.add(anyChecked ? "is-valid" : "is-invalid");
  });

  // 更新錯誤提示
  if (showMsg || touched.has("interests")) {
    setError(boxes[0], msg, "interests_error");
  }

  return anyChecked;
}

function validateTerms(showMsg = false) {
  const el = fields.terms;
  el.setCustomValidity("");
  let msg = "";
  if (!el.checked) msg = "請勾選以確認您已閱讀並同意服務條款";
  el.setCustomValidity(msg);
  if (showMsg) setError(el, msg, "terms_error");
  setFieldVisualState(el, !msg);
  return !msg;
}

function attachFieldValidation(id, validator) {
  const el = fields[id];
  el.addEventListener("blur", () => {
    touched.add(id);
    const ok = validator(true);
    setFieldVisualState(el, ok);
  });
  el.addEventListener("input", () => {
    setFieldVisualState(el, ok);
  });
}

attachFieldValidation("name", validateName);
attachFieldValidation("phone", validatePhone);
attachFieldValidation("email", validateEmail);
attachFieldValidation("password", () => {
  const okPwd = validatePassword(true);
  if (fields.confirm.value !== "") {
    validateConfirm(true);
  }
  return okPwd;
});
attachFieldValidation("confirm", validateConfirm);
attachFieldValidation("terms", validateTerms);

interestsBox.addEventListener("change", (e) => {
  if (e.target.matches('input[name="interests"]')) {
    touched.add("interests");
    validateInterests(true); // 強制顯示/隱藏錯誤訊息

    const wrapper = e.target.closest(".form-check");
    if (wrapper) {
      wrapper.classList.toggle("is-checked", e.target.checked);
    }
  }
});

function setLoading(state) {
  if (state) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        處理中...
      `;
  } else {
    submitBtn.disabled = false;
    submitBtn.textContent = "註冊";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const results = [
    { ok: validateName(true), el: fields.name },
    { ok: validatePhone(true), el: fields.phone },
    { ok: validateEmail(true), el: fields.email },
    { ok: validatePassword(true), el: fields.password },
    { ok: validateConfirm(true), el: fields.confirm },
    { ok: validateInterests(true), el: interestsBox },
    { ok: validateTerms(true), el: fields.terms },
  ];

  const firstBad = results.find((r) => !r.ok);
  if (firstBad) {
    firstBad.el.focus();
    return;
  }

  setLoading(true);
  setTimeout(() => {
    setLoading(false);

    form.reset();
    form.classList.remove("was-validated");

    Object.values(fields).forEach((el) => {
      el.classList.remove("is-valid", "is-invalid");
    });
    const boxes = interestsBox.querySelectorAll("input[name='interests']");
    boxes.forEach((cb) => cb.classList.remove("is-valid", "is-invalid"));

    const successAlert = document.createElement("div");
    successAlert.className = "alert alert-success mt-3";
    successAlert.role = "alert";
    successAlert.textContent = "註冊成功";

    form.insertAdjacentElement("afterend", successAlert);

    setTimeout(() => {
      successAlert.remove();
    }, 3000);
  }, 1000);
});
