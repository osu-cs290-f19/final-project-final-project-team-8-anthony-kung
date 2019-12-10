var navBar = document.getElementsByClassName("navitems");

console.log(navBar);
console.log(navBar.length);

console.log(document.getElementsByClassName("navitems")[0]);
//console.log(navBar[1].href);

for (var i = 0; i < navBar.length; i++) {
  if (navBar[i].href == window.location.href) {
    navBar[i].classList.add("active");
  }
}

console.log(navBar);
console.log(navBar.length);

function navBarResClick() {
  var x = document.getElementById("navbar");
  if (x.className === "navbarctn") {
    x.className += " resnav";
  } else {
    x.className = "navbarctn";
  }
}
