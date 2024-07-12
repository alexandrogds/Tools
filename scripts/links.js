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
        segments[1] = 'pt'
    }

    var link = document.getElementById('menu-item-home');
    link.href = base + "/lang/" + segments[1];

    var link = document.getElementById("menu-item-3-buttons");
    link.href = base + "/lang/" + segments[1] + "/" + link.innerText.toLowerCase().replace(/\s+/g, '-');

    var link = document.getElementById("button-3-buttons");
    link.href = base + "/lang/" + segments[1] + "/" + link.innerText.toLowerCase().replace(/\s+/g, '-');

    var link = document.getElementById("logo");
    link.href = base + "/lang/" + segments[1];
})