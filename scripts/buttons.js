const Config = {
    domain: window.location.hostname || 'localhost',
    base: `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`,
    colors: ['btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'],
    voting: localStorage.getItem('voting') || generateId(),
    user: localStorage.getItem('user') || generateId(),
};

function initialize() {
    localStorage.setItem('voting', Config.voting);
    if (localStorage.getItem('votings') === null) {
        localStorage.setItem('votings', JSON.stringify([Config.voting]));
    }
    populateVotings();
    localStorage.setItem('user', Config.user)
}

document.addEventListener('DOMContentLoaded', initialize);

function populateVotings() {
    const votings = JSON.parse(localStorage.getItem('votings'));
    votings.forEach((voting_local, index) => {
        addVoting(voting_local, index+1);
    });
}

function addVoting(voting_local, index) {
    let saveContainer = document.getElementById('saveContainer');
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

function updateSaveButton(voting_local) {
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
    let buttons = JSON.parse(localStorage.getItem(voting + '_buttons')) || [];

    buttons.forEach((buttonData) => {
        addNewButtons(buttonData.button, buttonData.color, buttonData.clicks);
    });
}

function addNewButton(button, button_color, clicks = 0) {
    const container = document.getElementById('buttonsContainer');
    const buttonDiv = createButtonElement(button, button_color, clicks);
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

function createSaveButton(voting_local, index) {
    const saveButton = document.createElement('a');
    saveButton.className = (localStorage.getItem('voting') === voting_local) ? 'btn btn-success mx-2 my-2' : 'btn btn-primary mx-2 my-2';
    saveButton.textContent = `${document.getElementById('voting').innerText} ${index}`;
    saveButton.onclick = () => handleSaveButtonClick(voting_local);
    saveButton.id = voting_local;
    return saveButton;
}

function createButtonElement(button, button_color, clicks) {
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

    return buttonDiv;
}

function sendPostRequest(button, clicks, color = null) {
    let data = { user: user, voting: voting, button: button, clicks: clicks, color: color };

    let buttons = JSON.parse(localStorage.getItem(voting + '_buttons')) || [];
    let buttonIndex = buttons.findIndex(b => b.button === button);

    if (buttonIndex >= 0) {
        buttons[buttonIndex] = data;
    } else {
        buttons.push(data);
    }

    localStorage.setItem(voting + '_buttons', JSON.stringify(buttons));

    fetch('/buttons/post.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data));
}

function createColorSelect(button_color) {
    const colorSelect = document.createElement('select');
    colorSelect.className = 'form-select d-inline-block w-auto me-2';
    colorSelect.onchange = function() {
        this.nextElementSibling.className = `btn ${this.value} me-2`;
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

    // Salvar no localStorage
    // let buttons = JSON.parse(localStorage.getItem(voting + '_buttons')) || [];
    // buttons = buttons.map(button => {
    //     if (button.button === buttonIndex) {
    //         button.clicks = newCount;
    //     }
    //     return button;
    // });
    // localStorage.setItem(voting + '_buttons', JSON.stringify(buttons));

    return newCount;
}

function handleSaveButtonClick(voting_local) {
    document.getElementById(voting_local).className = 'btn btn-primary mx-2 my-2';
    localStorage.setItem('voting', voting_local);
    document.getElementById(Config.voting).className = 'btn btn-success mx-2 my-2';
    populateButtons(voting_local);
}

function novel() {
    // Zera os botões atuais
    document.getElementById('buttonCount').value = 0;
    document.getElementById('buttonsContainer').innerHTML = '';

    // Atualiza o botão anterior para 'btn-primary'
    let oldVotingButton = document.getElementById(localStorage.getItem('voting'));
    if (oldVotingButton) {
        oldVotingButton.className = 'btn btn-primary mx-2 my-2';
    }

    // Gera um novo ID de votação e atualiza no localStorage
    let newVotingId = generateId();
    localStorage.setItem('voting', newVotingId);

    // Adiciona a nova votação à lista de votações
    let votings = JSON.parse(localStorage.getItem('votings')) || [];
    votings.push(newVotingId);
    localStorage.setItem('votings', JSON.stringify(votings));

    // Adiciona o novo botão de votação e define como 'btn-success'
    updateSaveButton(newVotingId);

    // Atualiza o ID global de votação para o novo
    Config.voting = newVotingId;
}

function shared() {
    const url = `${Config.base}/buttons/get.php?user=${localStorage.getItem('user')}&voting=${localStorage.getItem('voting')}`;
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
