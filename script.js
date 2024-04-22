document.addEventListener('DOMContentLoaded', function () {
    addTitleElement();  // Adiciona um elemento de título inicial
});

let elementOrder = [];

function addTopic() {
    let topicContainer = document.getElementById('topicContainer');
    let newTopic = document.createElement('div');
    newTopic.classList.add("topic");
    newTopic.setAttribute('data-order', elementOrder.length + 1);
    newTopic.innerHTML = `
        <textarea placeholder="Texto do tópico" class="topic-desc" required></textarea>
        <button class="move-btn" onclick="moveUp(this)"><i class="fas fa-arrow-up"></i></button>
        <button class="move-btn" onclick="moveDown(this)"><i class="fas fa-arrow-down"></i></button>
        <button class="delete-btn" onclick="deleteElement(this)"><i class="fas fa-trash"></i></button>
    `;
    let header = document.createElement('h3');
    header.innerText = "Texto";  // Altere conforme o tipo de elemento
    newTopic.insertBefore(header, newTopic.firstChild);
    topicContainer.appendChild(newTopic);
    elementOrder.push('topic');
}


function addAvatar() {
    let topicContainer = document.getElementById('topicContainer');
    let newAvatar = document.createElement('div');
    newAvatar.classList.add("avatar");
    newAvatar.setAttribute('data-order', elementOrder.length + 1);
    newAvatar.innerHTML = `
    <input type="url" placeholder="Nick do Habbo" class="avatar-url" required>
        <input type="text" placeholder="Título" class="avatar-title" required>
        <textarea placeholder="Descrição" class="avatar-desc" required></textarea>
        <button class="move-btn" onclick="moveUp(this)"><i class="fas fa-arrow-up"></i></button>
        <button class="move-btn" onclick="moveDown(this)"><i class="fas fa-arrow-down"></i></button>
        <button class="delete-btn" onclick="deleteElement(this)"><i class="fas fa-trash"></i></button>
    `;
    let header = document.createElement('h3');
    header.innerText = "Habbo";  // Altere conforme o tipo de elemento
    newAvatar.insertBefore(header, newAvatar.firstChild);
    topicContainer.appendChild(newAvatar);
    elementOrder.push('avatar');
}

function addTitleElement() {
    let topicContainer = document.getElementById('topicContainer');
    let newTitle = document.createElement('div');
    newTitle.classList.add("title-element");
    newTitle.setAttribute('data-order', elementOrder.length + 1);
    newTitle.innerHTML = `
        <input type="text" placeholder="Título" class="title-input" required>
        <button class="move-btn" onclick="moveUp(this)"><i class="fas fa-arrow-up"></i></button>
        <button class="move-btn" onclick="moveDown(this)"><i class="fas fa-arrow-down"></i></button>
        <button class="delete-btn" onclick="deleteElement(this)"><i class="fas fa-trash"></i></button>`;
    let header = document.createElement('h3');
    header.innerText = "Título";  // Altere conforme o tipo de elemento
    newTitle.insertBefore(header, newTitle.firstChild);
    topicContainer.appendChild(newTitle);
    elementOrder.push('title');
}

function moveUp(element) {
    let currentElement = element.parentNode;
    if (currentElement.previousElementSibling) {
        currentElement.parentNode.insertBefore(currentElement, currentElement.previousElementSibling);
    }
}

function moveDown(element) {
    let currentElement = element.parentNode;
    if (currentElement.nextElementSibling) {
        currentElement.parentNode.insertBefore(currentElement.nextElementSibling, currentElement);
    }
}

function updateColorPreview(color) {
    document.getElementById('colorPreview').style.backgroundColor = color;
}

function copyBBCode() {
    let bbCodeTextarea = document.getElementById('readOnlyArea');
    bbCodeTextarea.select();
    document.execCommand('copy');
    alert('BBCode copiado para a área de transferência!');
}

function buildBBCode() {
    let banner = document.getElementById('bannerUrl').value;
    let color = document.getElementById('colorPicker').value;
    let includeIndex = document.querySelector('input[name="includeIndex"]:checked').value;

    let bbCode = `[center][table class="rcc-report" style="width: 90%; margin: auto; border-collapse: collapse; background-color: #f9f9f9; color: #333;"][tr][td style="padding: 20px;"]\n`;

    if (banner) {
        bbCode += `[img]${banner}[/img]\n`;
    }
    
    if (includeIndex === 'yes') {
        let titles = document.querySelectorAll('.title-element .title-input');
        bbCode += buildIndex(titles, color);
    }
    
    let elements = document.querySelectorAll('.title-element, .topic, .avatar');
    elements.forEach(element => {
        if (element.classList.contains('title-element')) {
            bbCode += buildTitle(element.querySelector('.title-input').value, color);
        } else if (element.classList.contains('topic')) {
            bbCode += buildTopic(element.querySelector('.topic-desc').value);
        } else if (element.classList.contains('avatar')) {
            bbCode += buildAvatar(
                element.querySelector('.avatar-url').value,
                element.querySelector('.avatar-title').value,
                element.querySelector('.avatar-desc').value
            );
        }
    });

    bbCode += `[/td][/tr][/table][/center]`;

    document.getElementById('readOnlyArea').value = bbCode;
}


function buildIndex(titles, color) {
    let indexTable = `
[center][table class="rank" style="border: none!important; width: 500px; margin: 0em; line-height: 1em;" bgcolor="${color}"]
[tr style="border: none;"][td style="border: none!important;"][size=18][color=white][font=Poppins][b]ÍNDICE[/b][/font][/color][/size][/td][/tr]
[/table][/center]

[center][table style="margin: 0em; width: 500px; border-radius: 12px; text-align: center; line-height: 0.5em; font-family: Roboto, sans-serif; background-color: #e6e6fa;"][tr][td][color=black][size=12][font=Poppins][center]`;

    let indexEntries = '';
    let indexCounter = 0;

    titles.forEach((title) => {
        indexCounter++;
        let romanNumeral = convertToRoman(indexCounter);
        indexEntries += `[b]${romanNumeral}[/b]. ${title.value}\n`;
    });

    indexTable += `${indexEntries}[/center][/font][/size][/color][/td][/tr][/table][/center]`;

    return indexTable;
}

// Função auxiliar para converter número arábico em romano
function convertToRoman(num) {
    const romanNumerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    let roman = '';

    for (let key in romanNumerals) {
        while (num >= romanNumerals[key]) {
            roman += key;
            num -= romanNumerals[key];
        }
    }

    return roman;
}


function buildTitle(title, color) {
    return `
[center][table class="rank" style="border: none!important; width: 930px; margin: 1em 0em; line-height: 1em;" bgcolor="${color || "#6a0dad"}"]
[tr style="border: none;"][td style="border: none!important;"][size=18][color=white][font=Poppins][b]${title}[/b][/font][/color][/size][/td][/tr]
[/table][/center]
`;
}


function buildTopic(topic) {
    return `
    [center][table style="margin: 0em; width: 930px; border-radius: 12px; text-align: center; line-height: 0.5em; font-family: Roboto, sans-serif; background-color: #e6e6fa;"][tr][td][color=black][size=12][font=Poppins][left]${topic}[/left][/font][/size][/color][/td][/tr][/table][/center]\n`;
}

function buildAvatar(url, title, desc) {
    return `
    [center][table style="margin: 0em; width: 930px; border-radius: 12px; text-align: left; line-height: 1.4em; font-family: Roboto, sans-serif; background-color: #e6e6fa;"][tr]
[td][img]https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${url}&direction=2&head_direction=3&size=l&action=std[/img][/td]
[td][color=black][size=18][font=Poppins][b]${title}[/b][/font][/size][/color]
[color=black][size=12][font=Poppins]${desc}[/font][/size][/color][/td]
[/tr][/table][/center]
\n`;
}

function deleteElement(button) {
    let element = button.parentNode;
    element.remove();  // Remove o elemento
}
