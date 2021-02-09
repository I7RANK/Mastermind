const list_colors = ['red', 'blue', 'aqua', 'yellow', 'orange', 'white'];
let listToWin = randomColors();

/* the current attemp of the player, increase whit every attemp*/
let current_attemp = 0;

/* the rows of tries that can make the player
each array is an attemp
*/
let mainMatrix = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
]

/**
 * onload - the inicializator
 * this function runs after HTML is completely load
 */
window.onload = function () {
    for (let i = 0; i < 7; i++) {
        addElement(i);
        addBtnClues(i)
    }
    let hgh = window.screen.availHeight;
    let wth = window.screen.availWidth;
    /* verify the height and width of the screen */
    if (hgh < 760 || hgh < 1260) {
        alert("Please zoom out of your browser for a better experience.");
    }
}

/**
 * addElement - creates and adds the divs attemps of the player
 *
 * @param  {Int} index - the number for the unique id of each div attempt
 */
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

/**
 * createsSubDivs - creates a new div
 *
 * @param  {Int} index - the number for the unique id of each div attempt
 * @param  {String} clsName - the class name for the new div
 */
function createsSubDivs(index, clsName) {
    let div = document.createElement('div');

    div.id = 'btn_' + index
    div.className = clsName;

    return div;
}

/**
 * addBtnClues - creates and adds the divs to show the clues
 *
 * @param  {} index - the number for the unique id of each div attempt
 */
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

/**
 * checker - generates a list with the hints if the attempt it's accurate
 * if the color is correct and it's in the correct position,
 * the value in the list will be 2
 *
 * if the color only is correct the value will be 1
 *
 * and 0 otherwise
 */
function checker() {
    let pieces = getCurrentPieces();
    let pieceColors = mainMatrix[current_attemp];

    /*
    * Copy of the array with the code to guess
    * because this array will be modified
    */
    let copyListToWin = listToWin.slice(0);

    let len = copyListToWin.length;
    let list_clues = [0, 0, 0, 0];

    if (pieceColors.includes('')){
        alert("Row is incomplete! 🙄")
        return
    }

    /*
    * This loop first find the correct color in the correct position
    * and deletes if there is a coincidence
    * the red clue in the game
    */
    for (let i = 0; i < len; i++) {
        if (pieceColors[i] == copyListToWin[i]) {
            list_clues[i] = 2;
            copyListToWin[i] = "";
        }
    }

    /*
    * and this loop it's to find the correct color
    * but in the incorrect position
    * the white clue in the game
    */
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (pieceColors[i] == copyListToWin[j] && list_clues[i] == 0) {
                if (list_clues[j] != 2)
                {
                    list_clues[i] = 1;
                    copyListToWin[j] = "";
                }
            }
        }
    }

    colorCheck(list_clues);

    dontGoBack();
    current_attemp++;
    win_or_lose(list_clues);
}

/**
 * dontGoBack - blocks the attemps after the check.
 */
function dontGoBack() {
    var x = document.getElementById("div_attemp" + current_attemp);
    let color_list = getCurrentPieces();

    for(let i = 0; i < color_list.length; i++){
        color_list[i].removeAttribute('onclick');
    }

    x.style = "opacity: 50%;"
}

/**
 * win_or_lose - call a corresponding function to show
 * if the player win or loose the game with a message.
 *
 * @param  {Array} list_clues - contain the code to change color to the clues
 * in the div_clues
 */
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

/**
 * endMessage - unlock the correct code combination and
 *block the screen to show if the user win o loose the game
 *
 * @param  {Int} win - number that indicate if the user win
 */
function endMessage(win) {
    let showDiv = document.getElementById('div_end');
    let message = document.getElementById('result_message');

    showDiv.style = 'display: block;'
    let divCode = document.getElementById('div_code');
    let divSon = divCode.getElementsByClassName('btn_interrogation');
    for (let i = 0; i < 4; i++) {
        divSon[i].className = 'btn_interrogation ' + listToWin[i];
    }
    if (win) {
        message.textContent = 'You win!\nYou\'re a Mastermind';
        return
    }
    showDiv.className = 'background_lose';
    message.textContent = 'Game Over, try again!';
}


/**
 * puttingColor - insert a color in each attemp of the row
 *
 * @param  {HTMLElement} element - the div that contains the color selected
 * in her className
 */
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

/**
 * colorCheck - show the hints in white or red of the row
 *
 * @param {Array} numberList - is the listed code to put the color clues
 */
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

/**
 * getBtnClue - returns the divs where will be shown the clue color
 */
function getBtnClue() {
    var x = document.getElementById("attemp_clue" + current_attemp);
    var subDivs = x.getElementsByClassName("clue_attemps");
    let color_list = [];

    for (let i = 0; i < 4; i++) {
        color_list.push(subDivs[i]);
    }

    return color_list;
}

/**
 * randomColors - returns the list with the code to guess by the player
 */
function randomColors() {
    const arr = new Array();

    for (let step = 0; step < 4; step++) {
        let random = Math.floor(Math.random() * 6);
        arr.push(list_colors[random]);
    }

    return arr;
}

/**
 * getCurrentPieces - get the current row attempt
 */
function getCurrentPieces() {
    var x = document.getElementById("div_attemp" + current_attemp);
    var subDivs = x.getElementsByClassName("btn_pieces");
    let color_list = [];

    for (let i = 0; i < 4; i++) {
        color_list.push(subDivs[i]);
    }

    return color_list;
}

/**
 * getClassColor - obtain the color of the class
 * @param {HTMLElement} element - the div that contains the color selected
 */
function getClassColor(element) {
    let res = element.className.split(" ");
    let color = res[res.length - 1]

    if (list_colors.includes(color)) {
        return color
    }
    return null
}
/**
 * eraseColor - delete a previus selection attemp of the player
 * @param {HTMLElement} element - the div that contains the color selected
 */
function eraseColor(element) {
    let res = element.className.split(" ");
    let valueColor = res[1];
    element.classList.remove(valueColor);

    let spl_child = element.id.split("_");
    let ValueIndex = spl_child[1];
    mainMatrix[current_attemp][ValueIndex] = "";
}

/**
 * showInfo - is to show the div with the game rules
 */
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
