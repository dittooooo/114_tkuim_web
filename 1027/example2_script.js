// example2_script.js
// 驗證 Email 與手機欄位，拋出自訂訊息後再提示使用者

// 延伸練習: 驗證 Email，裡面一定要是 o365.tku.edu.tw 結尾的信箱

const form = document.getElementById('contact-form');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const emailPattern = /^[a-zA-Z0-9]*@o365\.tku\.edu\.tw$/;

function showValidity(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('這個欄位必填');
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity('格式不正確，請確認輸入內容');
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.title || '格式不正確');
  } else {
    input.setCustomValidity('');
  }
  return input.reportValidity();
}

function emailPatternValidate(input){
    if(!emailPattern.test(input.value)){
        input.setCustomValidity('請輸入 o365.tku.edu.tw 結尾的信箱');
    }else{
        input.setCustomValidity('');
    }
    return input.reportValidity();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailOk = showValidity(email);
  const phoneOk = showValidity(phone);
  if (emailOk && phoneOk) {
    alert('表單驗證成功，準備送出資料');
    form.reset();
  }
});

email.addEventListener('blur', () => {
  showValidity(email);
  emailPatternValidate(email);
});

phone.addEventListener('blur', () => {
  showValidity(phone);
});
