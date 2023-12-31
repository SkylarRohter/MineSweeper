const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const nRows = 8;
const nCols = 10;
const nMines = 10;
const totalCells = nCols * nRows;

canvas.addEventListener('mousedown', function (event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (event.button === 0) {
        checkUpdate(mouseX, mouseY, true);
    } else if (event.button === 2) {
        checkUpdate(mouseX, mouseY, false);
    }
    console.log('Mouse Click at (' + mouseX + ', ' + mouseY + ') ' + event.button);
    drawMap();
});

function drawRect (x, y, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height, color);
}

const blockSize = 50;
const tileColor = ["#b0d860", "#9aca53"];

// function clickSquare(event, cell) {

// }

function isOddDuplicate(mineNumbers, minePosition) {
    if (minePosition < 10) {
        if (mineNumbers.includes(minePosition * 10)) {
            return true;
        } else if (minePosition > 7) {
            return true;
        }
    } else if (minePosition > 10 && minePosition % 10 === 0) {
        if (mineNumbers.includes(minePosition / 10)) {
            return true;
        }
    }
    return false;
}

let map = [];
let mineNumbers = [], generatedMinesX = [], generatedMinesY = [];
function init() {
    initMines();
    drawMap();
}
function initMines() {
    remainingMines = nMines;
    while (remainingMines > 0) {
        let minePosition;
        do {
            minePosition = Math.random() * (totalCells - 1) + 1;
            console.log(minePosition)
            minePosition = Math.floor(minePosition);
            console.log(minePosition)
        } while (mineNumbers.includes(minePosition) || isOddDuplicate(mineNumbers, minePosition));
        mineNumbers.push(minePosition);
        if (minePosition < 10) {
            generatedMinesX.push(0);
            generatedMinesY.push(minePosition);
        } else {
            let positionString = minePosition.toString();
            let digits = positionString.split("");
            generatedMinesX.push(parseInt(digits[1]));
            generatedMinesY.push(parseInt(digits[0]));
        }
        remainingMines--;
    }
    console.log(generatedMinesX);
    console.log(generatedMinesY);
    let count = 0;

    for (let r = 0; r < nRows; r++) {
        let row = [];
        for (let c = 0; c < nCols; c++) {
            for (let i = 0; i < nMines; i++) {
                //console.log(r + " : " + c + " | Gen -> | " + generatedMinesY[i] + " : " + generatedMinesX[i])
                if (generatedMinesY[i] === r && generatedMinesX[i] === c) {
                    console.log(generatedMinesY[i] + " " + generatedMinesX[i] + " !!! " + r + " " + c);
                    count++;
                    row.push(new cell(true, false, false));
                }
            }
            row.push(new cell(false, false, false));
        }
        map.push(row);
    }
    console.log("Conut Logged: " + count)
}

function drawMap() {
    let drawn = 0;
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            if (map[i][j].isMine && map[i][j].isOpened) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    "red"
                );
                drawn++;
                console.log("logged" + i + " " + j + " | " + drawn + " / 10");
            }
            else if (!map[i][j].isOpened && i % 2 == 0) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    tileColor[1]
                );
            } else if (!map[i][j].isOpened && j % 2 == 0) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    tileColor[1]
                );
            } else if (!map[i][j].isOpened) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    tileColor[0]
                );
            }
            if (!map[i][j].isOpened && i % 2 == 0 && j % 2 == 0) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    tileColor[0]
                );
            }
            //else if (map[i][j] == 1) {
            //     drawRect(
            //         j * blockSize,
            //         i * blockSize,
            //         blockSize,
            //         blockSize,
            //         "black"
            //     );
            // } else if (map[i][j] == 2) {
            //     drawRect(
            //         j * blockSize,
            //         i * blockSize,
            //         blockSize,
            //         blockSize,
            //         "red"
            //     );
            // }
        }
    }
}

function checkUpdate (mouseX, mouseY, isLeftClick) {
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            if (
                mouseX >= blockSize * j && mouseX < (blockSize * j) + blockSize &&
                mouseY >= blockSize * i && mouseY < (blockSize * i) + blockSize &&
                isLeftClick
            ) {
                if (!map[i][j].isOpened) {
                    if (map[i][j].isMine) {
                        map[i][j].changeOpenedState(true);
                        console.log("Hello")
                    }
                }
            } else if (
                mouseX >= blockSize * j && mouseX < (blockSize * j) + blockSize &&
                mouseY >= blockSize * i && mouseY < (blockSize * i) + blockSize &&
                !isLeftClick
            ) {
                // map[i][j] = 2;
            }
        }
    }
}