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
// /////////////////////////////////////////////////////
let tabs = document.querySelectorAll(".tabsul li");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".seccontent div");
let divsArray = Array.from(divs);

tabsArray.forEach(function (tab) {
  tab.addEventListener("click", function (e) {
    tabsArray.forEach(function (tab) {
      tab.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    divsArray.forEach(function (div) {
      div.style.display = "none";
    });
    document.querySelector(e.currentTarget.dataset.con).style.display = "block";
  });
});
