function changeLanguage(lang) {
    var url = new URL(window.location.href);
    var folderPath = url.pathname;
    var segments = folderPath.split('/');
    segments.shift();
    var destiny = window.location.protocol + '//' + window.location.hostname;
	if (window.location.port) {
		destiny += ':' + window.location.port;
	}
    // agora deve ser #/(iso idioma duas letras)/(nome do idioma em language nativa)

    // const baseURL = '/get.php';
    // let params = {'idioma': lang}
    // const queryString = new URLSearchParams(params).toString();

    // // Combine a URL base com a string de query
    // const urlComParams = `${baseURL}?${queryString}`;
    // fetch(urlComParams)
    // .then(response => {
    //     if (!response.ok) {
    //     throw new Error('Erro na requisição: ' + response.status);
    //     }
    //     return response.text(); // converte a resposta em JSON
    // })
    // .then(data => {
    //     let lang_in_native = data
    //     destiny += "/#/" + lang + '/' + lang_in_native;
    //     window.location.href = destiny;
    // })
    // .catch(error => {
    //     console.error('Erro ao buscar os dados:', error);
    // });
        destiny += "/!/" + lang.replace(/_/g, '/');
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