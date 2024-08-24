let Config = {
    domain: window.location.hostname || 'localhost',
    base: `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`,
    colors: ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'],
    user: localStorage.getItem('user') || generateId(),
    voting: localStorage.getItem('voting') || generateId(),
    pass: '',
    shared_voting: localStorage.getItem('shared_voting') || getQueryParam('voting')
};

function initialize() {
    localStorage.setItem('user', Config.user)
    localStorage.setItem('voting', Config.voting);
    console.log(Config.voting)
    if (localStorage.getItem('votings') === null) {
        localStorage.setItem('votings', JSON.stringify([Config.voting]));
    } else if (localStorage.getItem('votings') !== null 
            && localStorage.getItem(Config.voting + '_buttons') !== null) {
        let data = { user: Config.user }
        let queryString = new URLSearchParams(data).toString();
        fetch(`/buttons/get.php?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, 'data')
            let keys = Object.keys(data)
            console.log(keys, 'keys')
            keys.forEach((key, index) => {
                let aux = key + '_buttons';
                console.log(aux, 'aux')
                console.log(data[key], 'data[key]')
                localStorage.setItem(aux, JSON.stringify(data[key]));
                populateButtons(Config.voting);
            });
        })
    }
    if (localStorage.getItem(Config.voting + '_buttons') === null) {
        addNewButton(0, 'btn-danger', 0);
        addNewButton(1, 'btn-primary', 0);
    }
    if (parseInt(getQueryParam('share'), 2) || localStorage.getItem('shared_user') != null) {
        let user = getQueryParam('user') || localStorage.getItem('shared_user')
        let voting = getQueryParam('voting') || localStorage.getItem('shared_voting')
        localStorage.setItem('shared_user', user)
        localStorage.setItem('shared_voting', voting)
        let urlSemParametros = window.location.origin + window.location.pathname;
        history.replaceState(null, '', urlSemParametros);
        Config.voting = voting
        localStorage.setItem('voting', Config.voting);
        console.log(Config.voting, 3)
        addVoting(localStorage.getItem('shared_voting'), 1, 'shared_voting')
        let data = { user: localStorage.getItem('shared_user'), voting: localStorage.getItem('shared_voting') }
        let queryString = new URLSearchParams(data).toString();
        fetch(`/buttons/get.php?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(localStorage.getItem('shared_voting') + '_buttons', JSON.stringify(data))
            populateButtons(Config.voting)
        })
    } else {
        populateButtons(Config.voting)
    }
    populateVotings();
}

document.addEventListener('DOMContentLoaded', initialize);

function populateVotings() {
    let votings = JSON.parse(localStorage.getItem('votings'));
    votings.forEach((voting_local, index) => {
        addVoting(voting_local, index+1, 'saveContainer');
    });
}

function addVoting(voting_local, index, container_id) {
    let saveContainer = document.getElementById(container_id);
    let saveButton = document.createElement('a');
    saveButton.className = Config.voting === voting_local ? 
        'btn btn-success mx-2 my-2' : 'btn btn-primary mx-2 my-2';
    saveButton.textContent = `${document.getElementById('voting').innerText} ${index}`;
    saveButton.onclick = () => {
        // Atualiza o botão selecionado
        document.querySelectorAll('#saveContainer a').forEach(btn => btn.className = 'btn btn-primary mx-2 my-2');
        document.querySelectorAll('#shared_voting a').forEach(btn => btn.className = 'btn btn-primary mx-2 my-2');
        saveButton.className = 'btn btn-success mx-2 my-2';
        
        // Atualiza o voting atual
        localStorage.setItem('voting', voting_local);
        
        // Limpa os botões atuais
        document.getElementById('buttonsContainer').innerHTML = '';

        // Popula os botões correspondentes ao voting selecionado
        populateButtons(voting_local);
    }
    saveButton.id = voting_local;
    saveContainer.appendChild(saveButton);
}

function updateSaveButtons(voting_local) {
    // Cria e configura o novo botão de votação
    let saveButton = createSaveButton(voting_local, JSON.parse(localStorage.getItem('votings')).length);
    document.getElementById('saveContainer').appendChild(saveButton);

    // Define o botão como 'btn-success' se for a votação atual
    if (localStorage.getItem('voting') === voting_local) {
        saveButton.className = 'btn btn-success mx-2 my-2';
    } else {
        saveButton.className = 'btn btn-primary mx-2 my-2';
    }
}

function populateButtons(voting) {
    document.getElementById('buttonsContainer').innerHTML = ''
    let buttons = JSON.parse(localStorage.getItem(voting + '_buttons')) || [];
    buttons.forEach((buttonData) => {
        addNewButton2(buttonData.button, buttonData.color, buttonData.clicks);
    });
    document.getElementById('buttonCount').value = buttons.length
}

function addNewButton(button, button_color, clicks = 0) {
    let container = document.getElementById('buttonsContainer');
    let buttonDiv = createButtonElement(button, button_color, clicks);
    container.appendChild(buttonDiv);
}

function addNewButton2(button, button_color, clicks = 0) {
    let container = document.getElementById('buttonsContainer');
    let buttonDiv = createButtonElement2(button, button_color, clicks);
    container.appendChild(buttonDiv);
}

function createButtons() {
    let container = document.getElementById('buttonsContainer');
    let buttonCount = parseInt(document.getElementById('buttonCount').value);
    let currentButtonDivs = container.querySelectorAll('.button-container');

    if (buttonCount < currentButtonDivs.length) {
        handleExcessButtons(buttonCount, currentButtonDivs);
    } else if (buttonCount > currentButtonDivs.length) {
        for (let i = currentButtonDivs.length; i < buttonCount; i++) {
            addNewButton(i, Config.colors[i % Config.colors.length]);
        }
    }
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function createSaveButton(voting_local, index) {
    let saveButton = document.createElement('a');
    saveButton.className = (localStorage.getItem('voting') === voting_local) ? 'btn btn-success mx-2 my-2' : 'btn btn-primary mx-2 my-2';
    saveButton.textContent = `${document.getElementById('voting').innerText} ${index}`;
    saveButton.onclick = () => handleSaveButtonClick(voting_local);
    saveButton.id = voting_local;
    return saveButton;
}

function createButtonElement2(button, button_color, clicks) {
    console.log('createButtonElement2')
    let buttonDiv = document.createElement('div');
    buttonDiv.className = 'button-container mb-2';
    buttonDiv.style.display = 'inline-block';
    buttonDiv.style.marginRight = '10px';

    let anchor = document.createElement('a');
    anchor.className = `btn ${button_color} me-2`;
    anchor.innerHTML = `Botão ${parseInt(button, 10) + 1} <span id="counter${button}" class="badge bg-secondary">${clicks}</span>`;
    anchor.onclick = () => sendPostRequest(button, incrementCounter(button), null);

    let colorSelect = createColorSelect(button_color);

    buttonDiv.appendChild(colorSelect);
    buttonDiv.appendChild(anchor);
    return buttonDiv
}

function createButtonElement(button, button_color, clicks) {
    saveButtonToLocalStorage(button, button_color, clicks)
    return createButtonElement2(button, button_color, clicks)
}

function saveButtonToLocalStorage(button, color, clicks) {
    let data = { button: button, clicks: clicks, color: color };
    let buttons = JSON.parse(localStorage.getItem(Config.voting + '_buttons')) || [];
    buttons.push(data);
    localStorage.setItem(Config.voting + '_buttons', JSON.stringify(buttons));
    sendPostRequest(button, clicks, color)
}

function save_color_of_button(color, button) {
    let buttons = JSON.parse(localStorage.getItem(Config.voting + '_buttons')) || [];
    let buttonIndex = buttons.findIndex(b => parseInt(b.button, 10) === button);
    console.log(buttonIndex, 11)
    console.log(button, 11)
    buttons[buttonIndex]['color'] = color;
    localStorage.setItem(Config.voting + '_buttons', JSON.stringify(buttons));
    sendPostRequest(button, null, color)
}

function sendPostRequest(button, clicks, color = null) {
    let buttons = JSON.parse(localStorage.getItem(Config.voting + '_buttons')) || [];
    let buttonIndex = buttons.findIndex(b => b.button === button);
    let data = { user: Config.user, voting: Config.voting, 
        button: button, clicks: clicks, color: color, pass: Config.pass };
   
    if (buttonIndex >= 0) {
        if (clicks != null ) {
            buttons[buttonIndex]['clicks'] = clicks
        }   
        if (color != null ) {
            buttons[buttonIndex]['color'] = color
        }
    } else {
        buttons.push(data);
    }

    localStorage.setItem(Config.voting + '_buttons', JSON.stringify(buttons));

    console.log(data)
    fetch('/buttons/post.php', {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // .then(response => response.json())
    .then(response => response.text())
    .then(data => console.log(data, 0))
    .catch(err => console.log(err))
}

function createColorSelect(button_color) {
    let colorSelect = document.createElement('select');
    colorSelect.className = 'form-select d-inline-block w-auto me-2';
    // colorSelect.id = generateId()
    colorSelect.onchange = function() {
        this.nextElementSibling.className = `btn ${this.value} me-2`;
        let index = Array.prototype.indexOf.call(this.parentNode.parentNode.children, this.parentNode)
        save_color_of_button(this.value, index)
    };

    Config.colors.forEach(color => {
        let option = document.createElement('option');
        option.value = color;
        option.text = color.replace('btn-', '').toUpperCase();
        option.selected = (color === button_color);
        colorSelect.appendChild(option);
    });

    return colorSelect;
}

function incrementCounter(buttonIndex) {
    let counter = document.getElementById(`counter${buttonIndex}`);
    let newCount = parseInt(counter.textContent) + 1;
    counter.textContent = newCount;
    return newCount;
}

function handleSaveButtonClick(voting_local) {
    document.getElementById(voting_local).className = 'btn btn-primary mx-2 my-2';
    localStorage.setItem('voting', voting_local);
    document.getElementById(Config.voting).className = 'btn btn-success mx-2 my-2';
    populateButtons(voting_local);
}

function novel() {
    // Atualiza o botão anterior para 'btn-primary'
    let oldVotingButton = document.getElementById(Config.voting);
    if (oldVotingButton) {
        oldVotingButton.className = 'btn btn-primary mx-2 my-2';
    }

    // Gera um novo ID de votação e atualiza no localStorage
    let newVotingId = generateId();
    localStorage.setItem('voting', newVotingId)

    // Adiciona a nova votação à lista de votações
    let votings = JSON.parse(localStorage.getItem('votings'));
    votings.push(newVotingId);
    localStorage.setItem('votings', JSON.stringify(votings));

    // Adiciona o novo botão de votação e define como 'btn-success'
    updateSaveButtons(newVotingId);
    Config.voting = newVotingId
    populateButtons(newVotingId)
}

function share() {
    let url = `${Config.base}/buttons?user=${localStorage.getItem('user')}&voting=${localStorage.getItem('voting')}&share=1`;
    navigator.clipboard.writeText(url)
        .then(() => alert('Link copiado! Se você não definir uma senha e compartilha alguém pode modificar os outros dados não compartilhados.'))
        .catch(err => console.error('Erro ao copiar:', err));
}

function alert(message, type = 'success') {
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    let wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    alertPlaceholder.append(wrapper);
}

