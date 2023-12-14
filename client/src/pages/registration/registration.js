const signbtn = document.getElementById("signbtn");
const btnlogin = document.getElementById("btnlogin");
const imgoverlay = document.querySelector(".div-img");
signbtn.addEventListener("click", function () {
  imgoverlay.style.left = "50%";
});
btnlogin.addEventListener("click", function () {
  imgoverlay.style.left = "0%";
});
