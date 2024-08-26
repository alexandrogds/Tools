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
let aux;
// if (segments.length == 1) {
//     aux = base
// } else if (!segments[1]) {
//     console.log(!segments[1], 'cond')
//     aux = base + '/' + segments[1]
//     console.log(aux ,'aux')
// } else {
//     aux = base + '/' + segments[0] + '/' + segments[1]
//     console.log(aux, 'aux')
// }

folderPath = null
domain = null
// base = null
