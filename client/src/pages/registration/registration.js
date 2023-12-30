// ////////////////////////////////////////////
const signupUserName = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupTel = document.getElementById("signupTel");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");
const age = document.getElementById("signupAge");
const signupErrors = document.querySelectorAll(".errormessage");
const passwordEye = document.querySelectorAll(".passwordeye");

const userNameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const ageRegex = /^(0?[1-9]|[1-9][0-9]+)$/;
const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

signupUserName.addEventListener("keyup", function () {
  validationText(signupUserName, userNameRegex, signupErrors[0]);
});
signupEmail.addEventListener("keyup", function () {
  validationText(signupEmail, emailRegex, signupErrors[1]);
});
signupTel.addEventListener("keyup", function () {
  validationText(signupTel, phoneRegex, signupErrors[2]);
});
age.addEventListener("keyup", function () {
  validationText(age, ageRegex, signupErrors[5]);
});
signupPassword.addEventListener("keyup", function () {
  if (signupPassword.value.length === 0 || signupPassword.value.length < 8) {
    signupErrors[3].innerHTML =
      '<i class="fa-solid fa-circle-xmark text-red-500 wrong"></i>';
    return false;
  } else {
    signupErrors[3].innerHTML =
      '<i class="fas fa-check-circle text-green-600 right"></i>';
    return true;
  }
});
confirmPassword.addEventListener("keyup", function () {
  if ((confirmPassword.value === signupPassword.value) === false) {
    signupErrors[4].innerHTML =
      '<i class="fa-solid fa-circle-xmark text-red-500 wrong"></i>';
    return false;
  } else {
    signupErrors[4].innerHTML =
      '<i class="fas fa-check-circle text-green-600 right"></i>';
    return true;
  }
});

function showHidePasswor(input, button) {
  if (input.type === "password") {
    input.type = "text";
    button.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    input.type = "password";
    button.classList.replace("fa-eye", "fa-eye-slash");
  }
}
passwordEye[0].addEventListener("click", function () {
  showHidePasswor(signupPassword, passwordEye[0]);
});
passwordEye[1].addEventListener("click", function () {
  showHidePasswor(confirmPassword, passwordEye[1]);
});

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
signupForm.addEventListener("submit", function (e) {
  if (
    signupUserName.value.length === 0 ||
    signupEmail.value.length === 0 ||
    signupPassword.value.length === 0 ||
    confirmPassword.value.length === 0 ||
    age.value.length === 0 ||
    (confirmPassword.value === signupPassword.value) === false
  ) {
    e.preventDefault();
    const formError = document.getElementById("formError");
    formError.classList.replace("d-none", "d-block");
  }
});
// /////////////////////////////////
const signbtn = document.getElementById("signbtn");
const btnlogin = document.getElementById("btnlogin");
const imgoverlay = document.querySelector(".div-img");
signbtn.addEventListener("click", function () {
  imgoverlay.style.left = "0%";
  loginForm.style.opacity = "0%";
  signupForm.style.opacity = "100%";
});
btnlogin.addEventListener("click", function () {
  imgoverlay.style.left = "50%";
  signupForm.style.opacity = "0%";
  loginForm.style.opacity = "100%";
});

function validationText(input, regex, error) {
  if (input.value.length === 0) {
    error.innerHTML =
      '<i class="fa-solid fa-circle-xmark text-red-500 wrong"></i>';
    return false;
  } else if (regex.test(input.value) === false) {
    error.innerHTML =
      '<i class="fa-solid fa-circle-xmark text-red-500 wrong"></i>';
    return false;
  }
  error.innerHTML = '<i class="fas fa-check-circle text-green-600 right"></i>';
  return true;
}

let errorMessage = 0;
const messageOverlay = document.getElementById("messageoverlay");
const message = document.getElementById("message");
const signupSubmitBtn = document.getElementById("signup_submit");
const closeMessage = document.getElementById("closeMessage");
const spanMessage = document.getElementById("spanMessage");

spanMessage.innerText = "Message";
closeMessage.addEventListener("click", function () {
  messageOverlay.style.display = "none";
});
messageOverlay.addEventListener("click", function () {
  messageOverlay.style.display = "none";
});
message.addEventListener("click", function (e) {
  e.stopPropagation();
});
if (errorMessage == 1) {
  messageOverlay.style.display = "flex";
}
