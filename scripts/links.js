document.addEventListener('DOMContentLoaded', function() {
    var url = new URL(window.location.href);
    var folderPath = url.pathname;
    var segments = folderPath.split('/');
    segments.shift();

    domain = window.location.domain
    if (!domain) {
        domain = 'localhost'
    }

    var base = window.location.protocol + "//" + domain
    if (window.location.port) {
		base += ':' + window.location.port;
	}

    if (!segments[1]) {
        aux = base + '/'
    } else {
        aux = base + '/' + segments[1] + '/'
    }

    // Cria a lista de navegação
    var navbarNav = document.createElement('ul');
    navbarNav.className = 'navbar-nav ms-auto';

    // Cria o item de navegação para Página Principal
    var navItemHome = document.createElement('li');
    navItemHome.className = 'nav-item';

    var navLinkHome = document.createElement('a');
    navLinkHome.className = 'nav-link active';
    navLinkHome.id = 'menu-item-home';
    navLinkHome.setAttribute('aria-current', 'page');
    navLinkHome.href = aux;
    navLinkHome.title = 'Ir para a Home Page (página inicial do site)';
    navLinkHome.textContent = 'Página Principal';

    navItemHome.appendChild(navLinkHome);

    // Cria o item de navegação para 3 Botões
    var navItem3Buttons = document.createElement('li');
    navItem3Buttons.className = 'nav-item';

    var navLink3Buttons = document.createElement('a');
    navLink3Buttons.className = 'nav-link';
    navLink3Buttons.id = 'menu-item-3-buttons';
    navLink3Buttons.textContent = 'Criar Botões';
    navLink3Buttons.href = aux + 'buttons'
    navLink3Buttons.title = 'Ir para a ferramenta 3 botões';

    navItem3Buttons.appendChild(navLink3Buttons);

    // Adiciona os itens de navegação à lista
    navbarNav.appendChild(navItemHome);
    navbarNav.appendChild(navItem3Buttons);

    // Seleciona a div com id="navbarNav"
    var navbarNavContainer = document.getElementById('navbarNav');

    // Adiciona a lista de navegação ao início da div
    navbarNavContainer.insertBefore(navbarNav, navbarNavContainer.firstChild);

    var link = document.getElementById("logo");
    link.href = aux;
})
