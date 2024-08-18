var url = new URL(window.location.href);
var folderPath = url.pathname;
var segments = folderPath.split('/');
segments.shift();

domain = window.location.host
if (!domain) {
    domain = 'localhost'
}

var base = window.location.protocol + "//" + domain
if (window.location.port) {
    base += ':' + window.location.port;
}

if (segments[1].length == 1) {
    aux = base
} else if (!segments[1]) {
    aux = base + '/' + segments[1]
} else {
    aux = base + '/' + segments[1] + '/' + segments[2]
}

folderPath = null
segments = null
domain = null
base = null