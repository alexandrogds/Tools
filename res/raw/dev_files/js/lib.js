function changeLanguage(lang) {
    var url = new URL(window.location.href);
    var folderPath = url.pathname;
    var segments = folderPath.split('/');
    segments.shift();
    var destiny = window.location.protocol + '//' + window.location.hostname;
	if (window.location.port) {
		destiny += ':' + window.location.port;
	}
    console.log(lang)
    const a90 = {}
    a90.c = lang.replace(/_/, '/')
    a90.a = a90.c.replace(/_/, ' ')
    destiny += "/" + a90.a;
    console.log(destiny)
    window.location.href = destiny;
}

function getOptionTextByValue(selectId, value) {
    var select = document.getElementById(selectId);
    var options = select.options;
    
    for (var i = 0; i < options.length; i++) {
        if (options[i].value == value) {
            return options[i].text;
        }
    }
    return null
}