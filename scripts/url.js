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
