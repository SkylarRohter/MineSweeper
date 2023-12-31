const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
canvas.addEventListener('mousedown', function (event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
    //checkUpdate(mouseX, mouseY);
    drawMap();
    console.log('Mouse Click at (' + mouseX + ', ' + mouseY + ')');
});

let drawRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height, color);
};

const blockSize = 50;
const tileColor = ["#b0d860", "#9aca53"];

let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let gameLoop = () => {
    // checkUpdate();
    drawMap();
}

let draw = () => {
    //drawRect(0, 0, canvas.width, canvas.hieght, "black");
    drawMap();
}

draw()
//let init = (setInterval(gameLoop, 1000 / 30));

let drawMap = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 0 && i % 2 == 0 && j % 2 == 0) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    tileColor[0]
                );
            } else if (map[i][j] == 0 && i % 2 == 0) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    tileColor[1]
                );
            } else if (map[i][j] == 0 && j % 2 == 0) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    tileColor[1]
                );
            } else if (map[i][j] == 0) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    tileColor[0]
                );
            } else if (map[i][j] == 1) {
                drawRect(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    "black"
                );
            }
        }
    }
};

let checkUpdate = (mouseX, mouseY) => {
    console.log('meow');
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            map[i][j] = 1;
            // if(mouseX >= blockSize*j && mouseX <= (blockSize*j)+blockSize){
            //     map[i][j] = 1;
            // }
        }
    }
};