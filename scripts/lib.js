function changeLanguage(lang) {
    var url = new URL(window.location.href);
    var folderPath = url.pathname;
    var segments = folderPath.split('/');
    segments.shift();
    var destiny = window.location.protocol + '//' + window.location.hostname;
	if (window.location.port) {
		destiny += ':' + window.location.port;
	}
	destiny += "/lang/" + lang;
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