document.addEventListener('DOMContentLoaded', function() {
	// URL para obter o idioma
	var urlGetLang = window.location.protocol + '//' + window.location.hostname;
	if (window.location.port) {
		urlGetLang += ':' + window.location.port;
	}
	urlGetLang += '/' + 'cgi-bin/get-lang.py';

	// Função para redirecionar com base no idioma retornado
	function redirectBasedOnLanguage(lang) {
		// Constrói a URL de redirecionamento
		var redirectUrl = window.location.protocol + '//' + window.location.hostname;
		if (window.location.port) {
			redirectUrl += ':' + window.location.port;
		}
		redirectUrl += '/lang/' + lang + '/';

		// Redireciona para a URL construída
		window.location.href = redirectUrl;
	}

	// Faz uma requisição AJAX para obter o idioma
	fetch(urlGetLang)
		.then(function(response) {
			if (!response.ok) {
				throw new Error('Erro ao obter o idioma');
			}
			return response.text();
		})
		.then(function(lang) {
			// Redireciona com base no idioma retornado
			redirectBasedOnLanguage(lang.trim());
		})
		.catch(function(error) {
			console.error('Erro:', error);
			// Lida com o erro de forma apropriada, se necessário
		});
})