const list_colors = ['red', 'blue', 'aqua', 'yellow', 'orange', 'white'];
let listToWin = [];
let current_attemp = 0;

let mainMatrix = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
]

window.onload = function () {
    for (let i = 0; i < 7; i++) {
        addElement(i);
        allColors(i)
    }
    listToWin = randomColors();
    console.log(getCurrentPieces());
}

function addElement(index) {
    let contentDiv = document.getElementById('div_content_attempts');
    let parent_div = document.createElement('div');

    parent_div.id = 'div_attemp' + index;
    parent_div.className = 'div_attemps';

    for (let i = 0; i <= 3; i++) {
        let subDiv = createsSubDivs(i, 'btn_pieces');

        subDiv.setAttribute("onclick", "eraseColor(this);");
        parent_div.appendChild(subDiv);
    }

    contentDiv.appendChild(parent_div);
}

function createsSubDivs(index, clsName) {
    let div = document.createElement('div');

    div.id = 'btn_' + index
    div.className = clsName;

    return div;
}

function allColors(index) {
    let cluesDiv = document.getElementById('div_clues');

    let colorsDiv = document.createElement('div');
    colorsDiv.id = 'attemp_clue' + index;
    colorsDiv.className = 'attemp_clues';

    for (let i = 0; i <= 3; i++) {
        colorsDiv.appendChild(createsSubDivs(i, 'attemps'));
    }
    cluesDiv.appendChild(colorsDiv);
}

function puttingColor (element) {
    let currentPieces = getCurrentPieces();
    let get_color = getClassColor(element);
    let indexM = mainMatrix[current_attemp];
    let color_index = 0;

    for (let i = 0; i < indexM.length; i++) {
        if (indexM[i] == '') {
            color_index = i;
            break
        }
        if (i == indexM.length - 1) {
            return;
        }
    }

    let piece = currentPieces[color_index];
    piece.className = "btn_pieces " + get_color;
    indexM[color_index] = get_color
}

function randomColors() {
    const arr = new Array();

    for (let step = 0; step < 4; step++) {
        let random = Math.floor(Math.random() * 6);
        arr.push(list_colors[random]);
    }

    return arr;
}


function getCurrentPieces() {
    var x = document.getElementById("div_attemp" + current_attemp);
    var subDivs = x.getElementsByClassName("btn_pieces");
    let color_list = [];

    for (let i = 0; i < 4; i++) {
        color_list.push(subDivs[i]);
    }

    return color_list;
}

function getClassColor(element) {
    let res = element.className.split(" ");
    let color = res[res.length - 1]

    if (list_colors.includes(color)) {
        return color
    }
    return null
}

function eraseColor(element) {
    let res = element.className.split(" ");
    let valueColor = res[1];
    element.classList.remove(valueColor);

    let spl_child = element.id.split("_");
    let ValueIndex = spl_child[1];
    mainMatrix[current_attemp][ValueIndex] = "";
}
