domain = window.location.domain
if (!domain) {
    domain = 'localhost'
}
var base = window.location.protocol + "//" + domain
if (window.location.port) {
    base += ':' + window.location.port;
}
let colors = ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'];
let voting = localStorage.getItem('voting') || generateId();
localStorage.setItem('voting', voting);
if(localStorage.getItem('votings')==null) {
    let votings = [voting]
    localStorage.setItem('votings', JSON.stringify(votings));
}
function populateVotings() {
    let votings = JSON.parse(localStorage.getItem('votings'))
    votings.forEach((voting_local, index) => {
        addVolting(voting_local, index)
    })
}
function addVolting(voting_local, index) {
    let saveContainer = document.getElementById('saveContainer');
    let saveButton = document.createElement('a');
    if(localStorage.getItem('voting')==voting_local){
        saveButton.className = 'btn btn-success mx-2 my-2';
    } else{
        saveButton.className = 'btn btn-primary mx-2 my-2';
    }
    saveButton.textContent = `${document.getElementById('voting').innerText} ${index}`
    saveButton.onclick = () => {
        let saveButton_old = document.getElementById(voting_local);
        saveButton_old.className = 'btn btn-primary mx-2 my-2';
        localStorage.setItem('voting', voting);
        let saveButton_new = document.getElementById(voting);
        saveButton_new.className = 'btn btn-success mx-2 my-2';
        populateButtons(voting)
    }
    saveButton.id = voting_local
    saveContainer.appendChild(saveButton);
}
function populateButtons(voting) {
    if(localStorage.getItem(voting +  '_buttons')==null) { return }
    let buttons = JSON.parse(localStorage.getItem(voting + '_buttons'))
    buttons.forEach((button)=> {
        addNewButtons(button['button'], button['color'], button['clicks'])
    })
    return

    let url = `${base}/buttons/get.php?user=${localStorage.getItem('user')}&voting=${localStorage.getItem('voting')}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                let container = document.getElementById('buttonsContainer');
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
                    let { id, color, clicks } = buttonData;
                    let icon = getIconByColor(color);

                    let button = document.createElement('a');
                    button.className = `btn ${color} me-2`;
                    button.innerHTML = `Botão <span id="counter${id}" class="badge bg-secondary">${clicks}</span>`;
                    button.onclick = function() {
                        incrementCounter(clicks);
                        sendPostRequest(id, clicks);
                    };

                    let colorSelect = document.createElement('select');
                    colorSelect.className = 'form-select d-inline-block w-auto me-2';
                    colorSelect.onchange = function() {
                        button.className = `btn ${this.value} me-2`;
                        // button.querySelector('i').className = `fas ${getIconByColor(this.value)}`;
                    };

                    colorsAndIcons.forEach(({ color, icon }) => {
                        let option = document.createElement('option');
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
}
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function updateSaveButton(voting_local) {
    let saveContainer = document.getElementById('saveContainer');
    let saveButton = document.createElement('a');
    saveButton.className = 'btn btn-primary mx-2 my-2';
    saveButton.textContent = `${document.getElementById('voting').innerText} ${JSON.parse(localStorage.getItem('votings')).length}`
    saveButton.onclick = () => {
        let saveButton_old = document.getElementById(voting_local);
        saveButton_old.className = 'btn btn-primary mx-2 my-2';
        localStorage.setItem('voting', voting);
        let saveButton_new = document.getElementById(voting);
        saveButton_new.className = 'btn btn-success mx-2 my-2';
        populateButtons(voting)
    }
    saveButton.id = voting_local
    saveContainer.appendChild(saveButton);
    return
    addVolting(voting, JSON.parse(localStorage.getItem('votings')).length)
    return
    console.log(voting)
    if(!document.getElementById(voting)){
        let saveContainer = document.getElementById('saveContainer');
        let saveButton = document.createElement('a');
        if(localStorage.getItem('voting')==voting){
            saveButton.className = 'btn btn-success mx-2 my-2';
        } else{
            saveButton.className = 'btn btn-primary mx-2 my-2';
        }
        saveButton.textContent = `${document.getElementById('voting').innerText} ${JSON.parse(localStorage.getItem('votings')).length}`
        saveButton.onclick = () => {populateButtons(voting)}
        saveButton.id = voting
        saveContainer.appendChild(saveButton);
    }
}

function addNewButtons(button, button_color, clicks=0) {
    let container = document.getElementById('buttonsContainer');

    let buttonId = `button${button}`;

    sendPostRequest(button, 0, button_color)

    let buttonDiv = document.createElement('div');
    buttonDiv.className = 'button-container mb-2';
    buttonDiv.style.display = 'inline-block'; // Exibe as divs lado a lado
    buttonDiv.style.marginRight = '10px'; // Espaçamento entre as divs

    let anchor = document.createElement('a');
    anchor.className = `btn ${button_color} me-2`;
    anchor.id = buttonId;
    anchor.innerHTML = `Botão ${button + 1} <span id="counter${button}" class="badge bg-secondary">${clicks}</span>`;
    anchor.onclick = function () {
        sendPostRequest(button, incrementCounter(button));
    };

    let colorSelect = document.createElement('select');
    colorSelect.className = 'form-select d-inline-block w-auto me-2';
    colorSelect.onchange = function () {
        button.className = `btn ${this.value} me-2`;
    };

    colors.forEach(color => {
        let option = document.createElement('option');
        option.value = color;
        option.text = color.replace('btn-', '').toUpperCase();
        option.selected = (color === button_color); // Seleciona a cor atual
        colorSelect.appendChild(option);
    });

    buttonDiv.appendChild(colorSelect);
    buttonDiv.appendChild(anchor);

    container.appendChild(buttonDiv);
}

function createButtons() {
    let container = document.getElementById('buttonsContainer');
    console.log('start create buttons', 'child de container', document.getElementById('buttonsContainer').childElementCount)
    let buttonCount = document.getElementById('buttonCount').value;
    let currentButtonDivs = container.querySelectorAll('.button-container');

    // Armazena a quantidade atual de botões antes de qualquer alteração
    let previousButtonCount = currentButtonDivs.length;
    console.log(previousButtonCount, 'filhos do container')

    // Função para remover os botões excedentes
    function removeExcessButtons() {
        console.log('start de remove buttons', 'child de container', document.getElementById('buttonsContainer').childElementCount)
        console.log(buttonCount, 'button content')
        console.log(currentButtonDivs.length - 1, 'filhos')
        for (let i = currentButtonDivs.length - 1; i >= buttonCount; i--) {
            console.log(i, 'i')
            container.removeChild(currentButtonDivs[i]);
        }
    }

    // Verifica se a quantidade de botões é menor que a atual
    if (buttonCount < currentButtonDivs.length) {
        // Mostra o modal de confirmação
        let confirmRemoveButton = document.getElementById('confirmRemove');
        let cancelRemoveButton = document.getElementById('cancelRemove');
        let modal = new bootstrap.Modal(document.getElementById('confirmModal'));

        confirmRemoveButton.onclick =  function () {
            console.log(document.getElementById('buttonCount').value, 'input de buttons')
            removeExcessButtons();
            modal.hide();
        };
        confirmRemoveButton.onclick =  function () {
            console.log(document.getElementById('buttonCount').value, 'input de buttons')
            removeExcessButtons();
            modal.hide();
        };

        cancelRemoveButton.addEventListener('click', function () {
            modal.hide();
            document.getElementById('buttonCount').value = previousButtonCount;
        });

        modal.show();
    } else {
        // Adiciona novos botões se o buttonCount for maior que o número atual de botões
        if (buttonCount > currentButtonDivs.length) {
            for (let i = currentButtonDivs.length; i < buttonCount; i++) {
                addNewButtons(i, colors[i%colors.length])
            }
        }
    }
}

function incrementCounter(buttonIndex) {
    let counter = document.getElementById(`counter${buttonIndex}`);
    counter.textContent = parseInt(counter.textContent) + 1;
    return counter.textContent;
}

function sendPostRequest(button, clicks, color=null) {
    let user = localStorage.getItem('user') || generateId();

    let data = { user: user, voting: voting, button: button, clicks: clicks, color: color };
    if(localStorage.getItem(voting + '_buttons')==null) {
        localStorage.setItem(voting + '_buttons', JSON.stringify([data]));
    } else {
        let buttons = JSON.parse(localStorage.getItem(voting + '_buttons'));
        buttons.push(data)
        localStorage.setItem(voting + '_buttons', JSON.stringify(buttons));
    }

    localStorage.setItem('user', user);
    fetch('/buttons/post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
}

function novel() {
    document.getElementById('buttonCount').value = 0;
    document.getElementById('buttonsContainer').innerHTML = ''
    let saveButton = document.getElementById(voting);
    saveButton.className = 'btn btn-primary mx-2 my-2';
    voting = generateId();
    localStorage.setItem('voting', voting);
    let votings = JSON.parse(localStorage.getItem('votings'));
    votings.push(voting)
    localStorage.setItem('votings', JSON.stringify(votings));
    updateSaveButton(voting)
}
function shared() {
    navigator.clipboard.writeText(`${base}/buttons/get.php?user=${localStorage.getItem('user')}&voting=${localStorage.getItem('voting')}`)
    .then(() => {}).catch(err => {});
    alert();
}
function alert() {
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    let appendAlert = (message, type) => {
        let wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')
        alertPlaceholder.append(wrapper)
    }
    appendAlert(document.getElementById('alert').innerText, 'success')
}
// Ao carregar a página, popular os botões com os cliques do banco de dados
document.addEventListener('DOMContentLoaded', function() {
    // createButtons(); // Chamada inicial para criar os botões com o valor padrão
    // populateButtons();
    populateVotings(voting)
});