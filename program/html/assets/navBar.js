var navBar = document.getElementsByClassName("navitems");

for (var i = 0; i < navBar.length; i++) {
  if (navBar[i].href == window.location.pathname)
    navBar[i].classList.add("active");
}

console.log(navBar);
console.log(navBar.length);
