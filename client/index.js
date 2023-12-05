$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});
$(".owl-carousel").owlCarousel({
  autoplay: true,
  autoplayTimeout: 3000,
  loop: true,
  margin: -1,
  items: 1,
  mouseDrag: false,
});
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
let spans = document.querySelectorAll(".owl-theme .owl-dots .owl-dot span");
spans.forEach(function (span, idx) {
  span.innerHTML = idx + 1;
});
// /////////////////////////////////////////////////////////////////////////
let nums = document.querySelectorAll(
  " div > div.mr-12 > span.num.d-block.text-main1.text-4xl"
);
window.addEventListener("scroll", () => {
  let topY = window.scrollY;
  let offSetInterval = $("#interval").offset().top;
  if (topY > offSetInterval - $("#interval").height()) {
    nums.forEach((num) => {
      intervalcount(num);
    });
    $("#underline").attr("width", "175");
  }
});
function intervalcount(ele) {
  let goal = ele.dataset.goal;
  let conunter = Number(ele.innerText);
  const intervalclr = setInterval(() => {
    ele.innerText = conunter++;
    if (conunter > goal) {
      clearInterval(intervalclr);
    }
  }, 0 / goal);
}
