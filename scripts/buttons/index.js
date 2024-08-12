const Config = {
    domain: window.location.hostname || 'localhost',
    base: `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`,
    colors: ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'],
    user: localStorage.getItem('user') || generateId(),
    voting: localStorage.getItem('voting') || generateId(),
};

function initialize() {
    if (parseInt(getQueryParam('share'), 2)) {
        localStorage.setItem('shared_user', getQueryParam('user'))
        localStorage.setItem('shared_voting', getQueryParam('voting'))
        let urlSemParametros = window.location.origin + window.location.pathname;
        history.replaceState(null, '', urlSemParametros);
        addVoting(localStorage.getItem('shared_voting'), 0, 'shared_voting')
        Config.voting = localStorage.getItem('shared_voting')
        let data = { user: localStorage.getItem('shared_user'), voting: Config.voting }
        const queryString = new URLSearchParams(data).toString();
        fetch(`/buttons/get.php?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(Config.voting + '_buttons', data)
        })
        .catch(err => console.log(1))
    }
    localStorage.setItem('user', Config.user)
    localStorage.setItem('voting', Config.voting);
    if (localStorage.getItem('votings') === null) {
        localStorage.setItem('votings', JSON.stringify([Config.voting]));
    }
    populateVotings();
    populateButtons(Config.voting)
}

document.addEventListener('DOMContentLoaded', initialize);

function populateVotings() {
    const votings = JSON.parse(localStorage.getItem('votings'));
    votings.forEach((voting_local, index) => {
        addVoting(voting_local, index+1, 'saveContainer');
    });
}

function addVoting(voting_local, index, container_id) {
    let saveContainer = document.getElementById(container_id);
    let saveButton = document.createElement('a');
    saveButton.className = localStorage.getItem('voting') === voting_local ? 
        'btn btn-success mx-2 my-2' : 'btn btn-primary mx-2 my-2';
    saveButton.textContent = `${document.getElementById('voting').innerText} ${index}`;
    saveButton.onclick = () => {
        // Atualiza o botão selecionado
        document.querySelectorAll('#saveContainer a').forEach(btn => btn.className = 'btn btn-primary mx-2 my-2');
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
    const saveButton = createSaveButton(voting_local, JSON.parse(localStorage.getItem('votings')).length);
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
    if (localStorage.getItem(Config.voting + '_buttons') === null) {
        addNewButton(0, 'btn-danger', 0);
        addNewButton(1, 'btn-primary', 0);
        console.log('ok2')
    } else {
        let buttons = JSON.parse(localStorage.getItem(voting + '_buttons')) || [];
        buttons.forEach((buttonData) => {
            addNewButton2(buttonData.button, buttonData.color, buttonData.clicks);
        });
    }
    let buttons = JSON.parse(localStorage.getItem(voting + '_buttons')) || [];
    document.getElementById('buttonCount').value = buttons.length
}

function addNewButton(button, button_color, clicks = 0) {
    const container = document.getElementById('buttonsContainer');
    const buttonDiv = createButtonElement(button, button_color, clicks);
    container.appendChild(buttonDiv);
}

function addNewButton2(button, button_color, clicks = 0) {
    const container = document.getElementById('buttonsContainer');
    const buttonDiv = createButtonElement2(button, button_color, clicks);
    container.appendChild(buttonDiv);
}

function createButtons() {
    const container = document.getElementById('buttonsContainer');
    const buttonCount = parseInt(document.getElementById('buttonCount').value);
    const currentButtonDivs = container.querySelectorAll('.button-container');

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
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function createSaveButton(voting_local, index) {
    const saveButton = document.createElement('a');
    saveButton.className = (localStorage.getItem('voting') === voting_local) ? 'btn btn-success mx-2 my-2' : 'btn btn-primary mx-2 my-2';
    saveButton.textContent = `${document.getElementById('voting').innerText} ${index}`;
    saveButton.onclick = () => handleSaveButtonClick(voting_local);
    saveButton.id = voting_local;
    return saveButton;
}

function createButtonElement2(button, button_color, clicks) {
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button-container mb-2';
    buttonDiv.style.display = 'inline-block';
    buttonDiv.style.marginRight = '10px';

    const anchor = document.createElement('a');
    anchor.className = `btn ${button_color} me-2`;
    anchor.innerHTML = `Botão ${button + 1} <span id="counter${button}" class="badge bg-secondary">${clicks}</span>`;
    anchor.onclick = () => sendPostRequest(button, incrementCounter(button));

    const colorSelect = createColorSelect(button_color);

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
    console.log(button)
    let buttons = JSON.parse(localStorage.getItem(Config.voting + '_buttons')) || [];
    let buttonIndex = buttons.findIndex(b => b.button === button);
    console.log(buttons[buttonIndex]['color'])
    buttons[buttonIndex]['color'] = color;
    console.log(buttons[buttonIndex]['color'])
    localStorage.setItem(Config.voting + '_buttons', JSON.stringify(buttons));
}

function sendPostRequest(button, clicks, color = null) {
    let data = { user: Config.user, voting: Config.voting, button: button, clicks: clicks, color: color };

    let buttons = JSON.parse(localStorage.getItem(Config.voting + '_buttons')) || [];
    let buttonIndex = buttons.findIndex(b => b.button === button);

    if (buttonIndex >= 0) {
        buttons[buttonIndex]['clicks'] = clicks
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
    .then(data => console.log(data))
    // .catch(err => console.log(err))
}

function createColorSelect(button_color) {
    const colorSelect = document.createElement('select');
    colorSelect.className = 'form-select d-inline-block w-auto me-2';
    // colorSelect.id = generateId()
    colorSelect.onchange = function() {
        this.nextElementSibling.className = `btn ${this.value} me-2`;
        let index = Array.prototype.indexOf.call(this.parentNode.parentNode.children, this.parentNode)
        save_color_of_button(this.value, index)
    };

    Config.colors.forEach(color => {
        const option = document.createElement('option');
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
    const url = `${Config.base}/buttons?user=${localStorage.getItem('user')}&voting=${localStorage.getItem('voting')}&share=1`;
    navigator.clipboard.writeText(url)
        .then(() => alert('Link copiado!'))
        .catch(err => console.error('Erro ao copiar:', err));
}

function alert(message, type = 'success') {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    alertPlaceholder.append(wrapper);
}

