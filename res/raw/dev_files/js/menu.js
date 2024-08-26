(()=>{
    fun func
    let navbarNav = document.createElement('ul');
    navbarNav.className = 'navbar-nav ms-auto';

    let navItemHome = document.createElement('li');
    navItemHome.className = 'nav-item';
    let navLinkHome = document.createElement('a');
    navLinkHome.className = 'nav-link active';
    navLinkHome.id = 'menu-item-home';
    navLinkHome.setAttribute('aria-current', 'page');
    navLinkHome.href = aux;
    navLinkHome.title = 'Go to Home Page (website home page)';
    navLinkHome.textContent = 'Home Page';
    navItemHome.appendChild(navLinkHome);

    let navItem3Buttons
    if (segments.length != 1) {
        navItem3Buttons = document.createElement('li');
        navItem3Buttons.className = 'nav-item';
        let navLink3Buttons = document.createElement('a');
        navLink3Buttons.className = 'nav-link';
        navLink3Buttons.textContent = 'Create Buttons';

        if (segments.length == 1) {
            aux = base
        } else if (segments.length == 2) {
            aux = '/' + segments[0]
        } else if (segments.length == 3) {
            aux = '/' + segments[0] + '/' + segments[1] + '/' + segments[2] + '.html'
        }
        // else if (!segments[1]) {
        //     console.log(!segments[1], 'cond')
        //     aux = base + '/' + segments[1]
        //     console.log(aux ,'aux')
        // } else {
        //     aux = base + '/' + segments[0] + '/' + segments[1]
        //     console.log(aux, 'aux')
        // }
        base = null

        navLink3Buttons.href = aux
        navLink3Buttons.title = 'Go to tool 3 buttons';
        navItem3Buttons.appendChild(navLink3Buttons);
    }

    navbarNav.appendChild(navItemHome);
    if (segments.length != 1) {
       navbarNav.appendChild(navItem3Buttons);
    }

    document.getElementById("menu").appendChild(navbarNav)
})()