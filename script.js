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

// CREAR FUNCION PARA AÑADIR BOLITA AL ARRAY DE LOS QUE TOCA COLOCAR LOS COLORES
// VERIFICAR LA MATRIZ EN CADA SUBMATRIX.... EN CURRENT ATTEMP
// SI HAY ALGO PASA A LA SIGUIENTE
// PRIMERO RECUPERAR EL COLOR QUE SE ENCUENTRA EN LA CLASE
function puttingColor (element) {
    let currentPieces = getCurrentPieces()
    for (let i in currentcurrentPieces) {
        console.log(i)
    }
}


/* ==== OSCAR ==== */


/* OSCAR RANDOM */
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

    if (color in list_colors)
        return color
    return null
}
