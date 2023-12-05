new WOW().init();
// /////////////////////////////////////////////////////////////////////////
const hideNav = document.getElementById("hideNav");
const collapse = document.getElementById("collapse");
hideNav.addEventListener("click", function () {
  collapse.classList.toggle("show");
});
const navbarDropdown = document.getElementById("navbarr__dropdown");
const navbarLinkdrop = document.getElementById("navbarr__linkdrop");
let toggle = true;
navbarLinkdrop.addEventListener("click", function () {
  navbarDropdown.classList.toggle("navbarr__dropdownshow");
});
// /////////////////////////////////////////////////////////////////////////
let fName = document.getElementById("fname");
let lName = document.getElementById("lname");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let date = document.getElementById("date");
let time = document.getElementById("time");
const submitBtnAppoinment = document.getElementById("submitbtnappoinment");
const formError = document.getElementById("formerror");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const error3 = document.getElementById("error3");
const error4 = document.getElementById("error4");
const error5 = document.getElementById("error5");
const error6 = document.getElementById("error6");
const error7 = document.getElementById("error7");
// ////
const arabicRegex = /^[\u0600-\u06FF\s]{2,}$/;
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
fName.addEventListener("keyup", () => {
  validationName(fName, arabicRegex, error1);
});
lName.addEventListener("keyup", () => {
  validationName(lName, arabicRegex, error2);
});
email.addEventListener("keyup", () => {
  validationName(email, emailRegex, error4);
});
// ////
const phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
phone.addEventListener("keyup", () => {
  validatephone();
});
function validatephone() {
  if (phone.value.length < 13) {
    error3.style.display = "block";
    setTimeout(function () {
      error3.style.display = "none";
    }, 10000);
    return false;
  } else if (phoneRegex.test(phone.value) === false) {
    error3.style.display = "block";
    setTimeout(function () {
      error3.style.display = "none";
    }, 10000);
    return false;
  }
  error3.style.display = "none";
  return true;
}
// ////
function checkRadio() {
  let gender = document.querySelector("input[name='gender']:checked");

  if (gender != null) {
    error5.style.display = "none";
  } else {
    error5.style.display = "block";
    setTimeout(function () {
      error5.style.display = "none";
    }, 10000);
  }
} // ////
appointmentform.addEventListener("submit", function (e) {
  if (
    fName.value.length === 0 ||
    lName.value.length === 0 ||
    phone.value.length === 0 ||
    email.value.length === 0 ||
    date.value.length === 0 ||
    time.value.length === 0 ||
    male.value === false ||
    female.value === false
  ) {
    e.preventDefault();
    checkRadio();
    validationName(fName, arabicRegex, error1);
    validationName(lName, arabicRegex, error2);
    validationName(email, emailRegex, error4);
    error6.style.display = "block";
    error7.style.display = "block";
    validatephone();
    formError.innerHTML =
      "<div class='bg-danger rounded-5 p-3 text-center'>Please fill in the data</div>";
    setTimeout(function () {
      formError.innerHTML = "";
      error6.style.display = "none";
      error7.style.display = "none";
    }, 10000);
  }
});
// ////
function validationName(input, regex, error) {
  if (input.value.length === 0) {
    error.style.display = "block";
    setTimeout(function () {
      error.style.display = "none";
    }, 10000);
    return false;
  } else if (regex.test(input.value) === false) {
    error.style.display = "block";
    setTimeout(function () {
      error.style.display = "none";
    }, 10000);
    return false;
  }
  error.style.display = "none";
  return true;
}
// //////////////////////////////////////////////////////////////
