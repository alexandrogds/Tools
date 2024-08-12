(()=>{
    var newDiv = document.createElement('div');
    newDiv.className = 'mt-3';

    var newLink = document.createElement('a');
    newLink.className = 'btn btn-gradient me-2';
    newLink.title = 'Go to tool 3 Buttons.';
    newLink.textContent = '3 Buttons';
    newLink.href = aux + 'buttons';
    
    newDiv.appendChild(newLink);

    document.getElementById("container").appendChild(newDiv)
})()