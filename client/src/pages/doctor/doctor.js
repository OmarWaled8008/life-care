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
const searchV = document.getElementById("search");
const searchBtn = document.getElementById("searchbtn");
let docNames = document.querySelectorAll(".doctor__div h2");
let docspecializations = document.querySelectorAll(".doctor__div h4");
let docNamesArr = Array.from(docNames);
let docspecializationsArr = Array.from(docspecializations);

searchV.addEventListener("keyup", function () {
  search(searchV);
});
searchBtn.addEventListener("click", function () {
  search(searchV);
});
function search(search) {
  let sValue = search.value;
  let ele = "";
  if (document.getElementById("doccontainer").innerHTML !== null) {
    document.getElementById("doccontainer").innerHTML = "";
    for (let i = 0; i < docNamesArr.length; i++) {
      if (
        docNamesArr[i].innerText.toLowerCase().includes(sValue.toLowerCase())
      ) {
        ele += `<div class="doctor__div col-4 gy-5 rounded-2xl wow bounceIn">
                    <div class="text-main1 rounded-2xl text-center bg-white">
                      <img class="rounded-2xl d-block" src="../../assets/pics/des1.jpg" alt="">
                      <div class="doctor__details p-4">
                        <h2>${docNamesArr[i].innerText}</h2>
                        <h4>${docspecializationsArr[i].innerText}</h4>
                        <div class="doctor_btns row justify-between mt-3">
                          <a id="docappointmentbtn" class="d-block text-center p-2 rounded-lg"
                            href="../appointment/appointment.html">Book</a>
                          <a id="notbtn" class="d-block text-center p-2 rounded-lg">Profile</a>
                        </div>
                      </div>
                    </div>
                  </div>`;
      }
    }
    document.getElementById("doccontainer").innerHTML = ele;
  }
}
