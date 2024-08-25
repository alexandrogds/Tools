(()=>{
    var navbarBrand = document.createElement("a");
    navbarBrand.className = "navbar-brand";
    navbarBrand.href = "#";
    navbarBrand.title = "Ir para a página inicial.";
    navbarBrand.href = aux + 'buttons';

    var img = document.createElement("img");
    img.src = "/images/3-buttons-e.png";
    img.alt = "Logo da sua empresa";
    img.className = "img-fluid";

    navbarBrand.appendChild(img);

    document.getElementById("menu").appendChild(navbarBrand)
})()