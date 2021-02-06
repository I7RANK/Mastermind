const list_colors = ['red', 'blue', 'aqua', 'yellow', 'orange', 'white'];
let listToWin = randomColors();
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
        addBtnClues(i)
    }
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

function addBtnClues(index) {
    let cluesDiv = document.getElementById('div_clues');

    let colorsDiv = document.createElement('div');
    colorsDiv.id = 'attemp_clue' + index;
    colorsDiv.className = 'attemp_clues';

    for (let i = 0; i <= 3; i++) {
        colorsDiv.appendChild(createsSubDivs(i, 'clue_attemps'));
    }
    cluesDiv.appendChild(colorsDiv);
}


function checker() {
    let pieces = getCurrentPieces();
    let pieceColors = mainMatrix[current_attemp];
    let copyListToWin = listToWin.slice(0);
    let len = copyListToWin.length;
    let list_clues = [0, 0, 0, 0];

    if (pieceColors.includes('')){
        alert("Row is incomplete! 🙄")
        return
    }

    for (let i = 0; i < len; i++) {
        if (pieceColors[i] == copyListToWin[i]) {
            list_clues[i] = 2;
            copyListToWin[i] = "";
        }
    }

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (pieceColors[i] == copyListToWin[j] && list_clues[i] == 0) {
                if (list_clues[j] != 2)
                {
                    list_clues[i] = 1;
                    copyListToWin[i] = "";
                }
            }
        }
    }

    colorCheck(list_clues);

    dontGoBack();
    current_attemp++;
    win_or_lose(list_clues);
}

function dontGoBack() {
    var x = document.getElementById("div_attemp" + current_attemp);
    let color_list = getCurrentPieces();

    for(let i = 0; i < color_list.length; i++){
        color_list[i].removeAttribute('onclick');
    }

    x.style = "opacity: 50%;"
}


function win_or_lose(list_clues) {
    let i;
    for (i = 0; i < list_clues.length; i++) {
        if (list_clues[i] != 2) {
            break
        }
    }

    if (i == 4) {
        endMessage(1);
        return
    }

    if (current_attemp > 6) {
        endMessage(0);
    }
}

function endMessage(win) {
    let showDiv = document.getElementById('div_end');
    let message = document.getElementById('result_message');

    showDiv.style = 'display: block;'
    if (win) {
        showDiv.className = 'background_win'
        message.textContent = 'You win!\nYou\'re a Mastermind';
        return
    }
    showDiv.className = 'background_lose';
    message.textContent = 'Game Over, try again!';
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

function colorCheck (numberList) {
    let temp = getBtnClue();
    for (let chek = 0; chek < numberList.length; chek++) {
        if (numberList[chek] == 1) {
            temp[chek].className = 'clue_attemps clue_white';
        }
        if (numberList[chek] == 2) {
            temp[chek].className = 'clue_attemps clue_red';
        }
    }
}

function getBtnClue() {
    var x = document.getElementById("attemp_clue" + current_attemp);
    var subDivs = x.getElementsByClassName("clue_attemps");
    let color_list = [];

    for (let i = 0; i < 4; i++) {
        color_list.push(subDivs[i]);
    }

    return color_list;
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

let countInfo = 0;
function showInfo() {
    let x = document.getElementById("rules_info");

    if (countInfo) {
        x.style = "display: none;";
        countInfo = 0;
    }
    else {
        x.style = "display: block;";
        countInfo = 1;
    }
}
