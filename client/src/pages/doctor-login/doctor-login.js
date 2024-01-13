const loginDocForm = document.getElementById("loginDocForm");
const userDoctor = document.getElementById("userDoctor");
const passwordDoctor = document.getElementById("passwordDoctor");
const formError = document.getElementById("formError");
const passwordEyeLogin = document.getElementById("passwordeyelogin");

loginDocForm.addEventListener("submit", function (e) {
  if (userDoctor.value.length === 0 || passwordDoctor.value.length === 0) {
    e.preventDefault();
    formError.classList.replace("d-none", "d-block");
  }
});
// /////////////////////////////////
passwordEyeLogin.addEventListener("click", function () {
  showHidePasswor(passwordDoctor, passwordEyeLogin);
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
// /////////////////////////////////
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
