(()=>{
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    var newDiv = document.createElement('div');
    newDiv.className = 'mt-3';

    var newLink = document.createElement('a');
    newLink.className = 'btn me-2';
    newLink.title = 'Go to tool 3 Buttons.';
    newLink.textContent = '3 Buttons';
    newLink.href = aux + '/buttons';
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    newLink.style.background = `linear-gradient(${Math.floor(Math.random() * 360)}deg, ${color1}, ${color2})`;
    newLink.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.6)';
    newLink.style.color = '#ffffff';
    
    newDiv.appendChild(newLink);

    document.getElementById("container").appendChild(newDiv)
})()