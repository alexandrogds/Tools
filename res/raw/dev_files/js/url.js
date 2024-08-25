let url = new URL(window.location.href);
let folderPath = url.pathname;
let segments = folderPath.split('/');
segments.shift();

domain = window.location.host
if (!domain) {
    domain = 'localhost'
}

let base = window.location.protocol + "//" + domain
if (window.location.port) {
    base += ':' + window.location.port;
}

if (segments.length == 1) {
    aux = base
} else if (!segments[1]) {
    aux = base + '/' + segments[1]
} else {
    aux = base + '/' + segments[1] + '/' + segments[2]
}

folderPath = null
domain = null
base = null