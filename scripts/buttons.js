domain = window.location.domain
if (!domain) {
    domain = 'localhost'
}
var base = window.location.protocol + "//" + domain
if (window.location.port) {
    base += ':' + window.location.port;
}
const colorsAndIcons = ['btn-danger','btn-primary','btn-success','btn-warning','btn-info','btn-dark'];
// Função para popular os botões com cliques do banco de dados ao carregar a página
function populateButtons() {
    const url = `${base}/buttons/get.php?user=${getQueryParam('user')}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                const container = document.getElementById('buttonsContainer');
                // Estilo para garantir que os botões fiquem em linha e centralizados
                container.style.display = 'flex';
                container.style.flexWrap = 'wrap';
                container.style.justifyContent = 'center';
                container.style.gap = '10px'; // Espaçamento entre os botões

                data.forEach(buttonData => {
                    const { button, color, clicks } = buttonData;
                    const aux_button = document.createElement('button');
                    aux_button.type = 'button';
                    aux_button.className = `btn ${color} me-2`;
                    aux_button.innerHTML = `Botão <span id="counter${button}" class="badge bg-secondary">${clicks}</span>`;
                    aux_button.onclick = function() {
                        let clicks = incrementCounter(button);
                        sendPostRequest(`${getQueryParam('user')}`, button, clicks, color);
                    };

                    const colorSelect = document.createElement('select');
                    colorSelect.className = 'form-select d-inline-block w-auto me-2';
                    colorSelect.onchange = function() {
                        aux_button.className = `btn ${this.value} me-2`;
                        sendPostRequest(`${getQueryParam('user')}`, button, clicks, this.value);
                    };

                    colorsAndIcons.forEach((color) => {
                        const option = document.createElement('option');
                        option.value = color;
                        option.text = color.replace('btn-', '').toUpperCase();
                        colorSelect.appendChild(option);
                    });

                    container.appendChild(colorSelect);
                    container.appendChild(aux_button);
                });
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => console.error('Error fetching buttons data:', error));
}
function generateUserId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
// Função para obter uma cor e ícone únicos que não tenham sido usados anteriormente
function getUniqueColorAndIcon(usedColors) {
    let index = 0;
    while (true) {
        const { color, icon } = colorsAndIcons[index];
        if (!usedColors.has(color)) {
            usedColors.add(color);
            return { color, icon };
        }
        index = (index + 1) % colorsAndIcons.length;
    }
}

function getRandomColor() {
    const colors = ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createButtons() {
    const buttonCount = document.getElementById('buttonCount').value;
    const container = document.getElementById('buttonsContainer');
    container.innerHTML = '';

    const usedColors = new Set(); // Conjunto para rastrear cores já usadas

    for (let i = 0; i < buttonCount; i++) {
        // const buttonColor = getRandomColor();
        const { color, icon } = getUniqueColorAndIcon(usedColors); // Obter cor e ícone únicos
        const buttonId = `button${i}`;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = `btn ${color} me-2`;
        button.id = buttonId;
        button.innerHTML = `<i class="fas ${icon}"></i> Botão ${i + 1} <span id="counter${i}" class="badge bg-secondary">0</span>`;
        // button.innerHTML = `Botão ${i + 1} <span id="counter${i}" class="badge bg-secondary">0</span>`;
        button.onclick = function() {
            incrementCounter(i);
            sendPostRequest(buttonId, i);
        };

        const colorSelect = document.createElement('select');
        colorSelect.className = 'form-select d-inline-block w-auto me-2';
        colorSelect.onchange = function() {
            button.className = `btn ${this.value} me-2`;
        };

        const colors = ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'];
        colors.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.text = color.replace('btn-', '').toUpperCase();
            colorSelect.appendChild(option);
        });

        container.appendChild(colorSelect);
        container.appendChild(button);
    }
}
function incrementCounter(buttonIndex) {
    const counter = document.getElementById(`counter${buttonIndex}`);
    counter.textContent = parseInt(counter.textContent) + 1;
    return counter.textContent;
}
    // const userId = localStorage.getItem('userId') || generateUserId(); // Obtém ou gera o ID do usuário
    // localStorage.setItem('userId', userId); // Salva o ID do usuário no localStorage
function sendPostRequest(user, button, clicks, color) {
    const url = '/buttons/post.php';
    const data = { user: user, button: button, clicks: clicks, color: color };
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
    // createButtons(); // Chamada inicial para criar os botões com o valor padrão
    populateButtons();
});