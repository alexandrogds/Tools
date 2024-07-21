domain = window.location.domain
if (!domain) {
    domain = 'localhost'
}
var base = window.location.protocol + "//" + domain
if (window.location.port) {
    base += ':' + window.location.port;
}
function populateButtons() {
    let url = `${base}/buttons/get.php?user=${getQueryParam('user')}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                document.getElementById('buttonCount').value = data.length;
                let 
                container = document.getElementById('buttonsContainer');
                container.innerHTML = '';
                // Estilo para garantir que os botões fiquem em linha e centralizados
                container.style.display = 'flex';
                container.style.flexWrap = 'wrap';
                container.style.justifyContent = 'center';
                container.style.gap = '10px'; // Espaçamento entre os botões
                    data.forEach(buttonData => {
                    let{
                    button, 
                        color, 
                            clicks } = buttonData;
                                let 
                                aux_button = document.createElement('button');
                                aux_button.type = 'button';
                                aux_button.className = `btn ${color} me-2`;
                                aux_button.innerHTML = `Botão <span id="counter${button}" class="badge bg-secondary">${clicks}</span>`;
                                aux_button.onclick = function() {
                                    let 
                                    clicks = incrementCounter(button);
                                            sendPostRequest(`${getQueryParam('user')}`, 
                    button, 
                                    clicks, 
                        color);     };
                                        let
                                        colorSelect = document.createElement('select');
                                        colorSelect.className = 'form-select d-inline-block w-auto me-2';
                                        colorSelect.onchange = function() {
                                aux_button.className = `btn ${this.value} me-2`;
                                            sendPostRequest(`${getQueryParam('user')}`, button, clicks, this.value);
                                            };
                                            ['btn-danger','btn-primary','btn-success','btn-warning','btn-info','btn-dark']
                                            .forEach((
                                            color_option) => {
                                                let 
                                                option = document.createElement('option');
                                                option.selected = (color === color_option);
                                                option.value = color_option;
                                                option.text = color_option.replace('btn-', '').toUpperCase();
                                        colorSelect.appendChild(option);});
                container.appendChild(colorSelect);
                container.appendChild(aux_button);
                });
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => console.error('Error fetching buttons data:', error));
}
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
function getRandomHex() {
    let letters = '0123456789ABCDEF';
    let hex = '';
    for (let i = 0; i < 6; i++) {
        hex += letters[Math.floor(Math.random() * 16)];
    }
    return hex;
}
function createButtons() {
    let buttonCount = document.getElementById('buttonCount').value;
    let container = document.getElementById('buttonsContainer');
    if (container.innerHTML == '') { return }
    for (let i = buttonCount; i < buttonCount + 1; i++) {
        let color = getRandomColor();
        let user = getRandomHex();
        let buttonId = `button${i}`;
        let button = document.createElement('button');
        button.type = 'button';
        button.className = `btn ${color} me-2`;
        button.id = buttonId;
        button.innerHTML = `Botão ${i + 1} <span id="counter${i}" class="badge bg-secondary">0</span>`;
        button.onclick = function() {
            let clicks = incrementCounter(i);
            sendPostRequest(user, button, clicks, color);
        };

        let colorSelect = document.createElement('select');
        colorSelect.className = 'form-select d-inline-block w-auto me-2';
        colorSelect.onchange = function() {
            button.className = `btn ${this.value} me-2`;
        };

        colors.forEach(color_option => {
            let option = document.createElement('option');
            option.selected = (color === color_option);
            option.value = color_option;
            option.text = color_option.replace('btn-', '').toUpperCase();
            colorSelect.appendChild(option);
        });

        container.appendChild(colorSelect);
        container.appendChild(button);
    }
}
function incrementCounter(buttonIndex) {
    let counter = document.getElementById(`counter${buttonIndex}`);
    counter.textContent = parseInt(counter.textContent) + 1;
    return counter.textContent;
}
// let userId = localStorage.getItem('userId') || generateUserId(); // Obtém ou gera o ID do usuário
// localStorage.setItem('userId', userId); // Salva o ID do usuário no localStorage
function sendPostRequest(user, button, clicks, color) {
    let url = '/buttons/post.php';
    let data = { user: user, button: button, clicks: clicks, color: color };
    console.log(data);
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}
document.addEventListener('DOMContentLoaded', function() {
    createButtons(); // Chamada inicial para criar os botões com o valor padrão
    populateButtons();
});
