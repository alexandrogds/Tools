(()=> {
var navbarBrand = document.createElement("a");
navbarBrand.className = "navbar-brand";
navbarBrand.href = aux;
navbarBrand.title = "Go to home page.";

var img = document.createElement("img");
img.src = "/images/logo.png";
img.alt = "Website logo.";
img.className = "img-fluid";

navbarBrand.appendChild(img);

document.getElementById("menu").appendChild(navbarBrand)
})()