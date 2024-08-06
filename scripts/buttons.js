domain = window.location.domain
if (!domain) {
    domain = 'localhost'
}
var base = window.location.protocol + "//" + domain
if (window.location.port) {
    base += ':' + window.location.port;
}
const colors = ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'];
// Função para obter o ícone correspondente à cor
function getIconByColor(color) {
    const item = colorsAndIcons.find(item => item.color === color);
    return item ? item.icon : 'fa-question'; // Retorna um ícone padrão se não encontrar
}
// Função para popular os botões com cliques do banco de dados ao carregar a página
function populateButtons() {
    const url = `${base}/buttons/get.php?user=${getQueryParam('user')}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                const container = document.getElementById('buttonsContainer');
                if (!container) {
                    console.error('Container not found');
                    return;
                }

                // Estilo para garantir que os botões fiquem em linha e centralizados
                container.style.display = 'flex';
                container.style.flexWrap = 'wrap';
                container.style.justifyContent = 'center';
                container.style.gap = '10px'; // Espaçamento entre os botões

                data.forEach(buttonData => {
                    const { id, color, clicks } = buttonData;
                    const icon = getIconByColor(color);

                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = `btn ${color} me-2`;
                    button.innerHTML = `<i class="fas ${icon}"></i> Botão <span id="counter${id}" class="badge bg-secondary">${clicks}</span>`;
                    button.onclick = function() {
                        incrementCounter(clicks);
                        sendPostRequest(id, clicks);
                    };

                    const colorSelect = document.createElement('select');
                    colorSelect.className = 'form-select d-inline-block w-auto me-2';
                    colorSelect.onchange = function() {
                        button.className = `btn ${this.value} me-2`;
                        // button.querySelector('i').className = `fas ${getIconByColor(this.value)}`;
                    };

                    colorsAndIcons.forEach(({ color, icon }) => {
                        const option = document.createElement('option');
                        option.value = color;
                        option.text = color.replace('btn-', '').toUpperCase();
                        colorSelect.appendChild(option);
                    });

                    container.appendChild(colorSelect);
                    container.appendChild(button);
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

function getRandomColor() {
    const colors = ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'];
    return colors[Math.floor(Math.random() * colors.length)];
}
function createButtons() {
    const buttonCount = document.getElementById('buttonCount').value;
    console.log(buttonCount)
    const container = document.getElementById('buttonsContainer');
    let currentButtonDivs = container.querySelectorAll('.button-container');

    // Armazena a quantidade atual de botões antes de qualquer alteração
    let previousButtonCount = currentButtonDivs.length;

    // Função para remover os botões excedentes
    function removeExcessButtons() {
        for (let i = currentButtonDivs.length - 1; i >= buttonCount; i--) {
            container.removeChild(currentButtonDivs[i]);
        }
    }

    // Função para adicionar novos botões
    function addNewButtons(startIndex) {
        for (let i = startIndex; i < buttonCount; i++) {
            const button_color = colors[i % colors.length]; // Usa a cor de maneira cíclica
            const buttonId = `button${i}`;

            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button-container mb-2';
            buttonDiv.style.display = 'inline-block'; // Exibe as divs lado a lado
            buttonDiv.style.marginRight = '10px'; // Espaçamento entre as divs

            const button = document.createElement('button');
            button.type = 'button';
            button.className = `btn ${button_color} me-2`;
            button.id = buttonId;
            button.innerHTML = `Botão ${i + 1} <span id="counter${i}" class="badge bg-secondary">0</span>`;
            button.onclick = function () {
                incrementCounter(i);
                sendPostRequest(buttonId, i);
            };

            const colorSelect = document.createElement('select');
            colorSelect.className = 'form-select d-inline-block w-auto me-2';
            colorSelect.onchange = function () {
                button.className = `btn ${this.value} me-2`;
            };

            colors.forEach(color => {
                const option = document.createElement('option');
                option.value = color;
                option.text = color.replace('btn-', '').toUpperCase();
                option.selected = (color === button_color); // Seleciona a cor atual
                colorSelect.appendChild(option);
            });

            buttonDiv.appendChild(colorSelect);
            buttonDiv.appendChild(button);

            container.appendChild(buttonDiv);
        }
    }

    // Verifica se a quantidade de botões é menor que a atual
    if (buttonCount < currentButtonDivs.length) {
        // Mostra o modal de confirmação
        const confirmRemoveButton = document.getElementById('confirmRemove');
        const cancelRemoveButton = document.getElementById('cancelRemove');
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'));

        confirmRemoveButton.addEventListener('click', function () {
            removeExcessButtons();
            modal.hide();
        });

        cancelRemoveButton.addEventListener('click', function () {
            modal.hide();
            document.getElementById('buttonCount').value = previousButtonCount;
        });

        modal.show();
    } else {
        // Adiciona novos botões se o buttonCount for maior que o número atual de botões
        if (buttonCount > currentButtonDivs.length) {
            addNewButtons(currentButtonDivs.length);
        }
    }
}

function incrementCounter(buttonIndex) {
    const counter = document.getElementById(`counter${buttonIndex}`);
    counter.textContent = parseInt(counter.textContent) + 1;
}

function sendPostRequest(buttonId, buttonIndex) {
    const userId = localStorage.getItem('userId') || generateUserId(); // Obtém ou gera o ID do usuário
    localStorage.setItem('userId', userId); // Salva o ID do usuário no localStorage
    const url = '/cgi-bin/buttons/post.py';
    const data = { userId: userId, buttonId: buttonIndex };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

// Ao carregar a página, popular os botões com os cliques do banco de dados
document.addEventListener('DOMContentLoaded', function() {
    // createButtons(); // Chamada inicial para criar os botões com o valor padrão
    populateButtons();
});