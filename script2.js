// Version 2

var turnCounter = 1;
var value = "";

function turnIndicator() {
    var XO = "";
    var turn = turnCounter % 2;
    if (turn == 1) {
        XO = "❌";
    } else if (turn == 0) {
        XO = "⭕";
    }
    return XO;
}

var boardArray;

function drawBoard(size) {
    size = parseInt(size);
    if (size < 3) {
        alert("Minimum size is 3");
        size = 3;
    }
    var gameBoard = document.createElement("div");
    gameBoard.className = "board";
    gameBoard.id = "board";
    var autoTemplate = "";
    for (i = 0; i < size; i++) {
        autoTemplate += " ";
        autoTemplate += "150px";
    }
    var heightWidth = size * 150;
    var style = document.createElement('style');
    style.innerHTML = `
  .board {
  grid-template-columns:${autoTemplate}; height: ${heightWidth}px; width: ${heightWidth}px;
  }
  `;
    document.head.appendChild(style);
    var numOfTiles = size * size;
    for (i = 1; i <= numOfTiles; i++) {
        var tile = document.createElement("button");
        tile.className = "tile";
        tile.id = i;
        tile.innerHTML = "&nbsp";
        tile.addEventListener('click', onClick);
        tile.addEventListener('mouseover', onHoverIn);
        tile.addEventListener('mouseout', onHoverOut);
        gameBoard.appendChild(tile);
        var container = document.getElementById("container");
        var script = document.getElementsByTagName("script")[0];
        container.insertBefore(gameBoard, script);
    }
}

function onClick() {
    var id = this.id;
    //console.log(id);
    value = turnIndicator();
    //gameOver = winCondition();
    updateTile(id);
    mapTileGrid(id);
    updateTurn();
    console.log(value);
    turnCounter++;
}

function onHoverIn() {
    var id = this.id;
    //console.log(id);
    var tile = document.getElementById(id);
    if (tile.disabled != "disabled") {
        tile.style.background = "gold";
        tile.style.opacity = 0.4;
    }
}

function onHoverOut() {
    var id = this.id;
    //console.log(id);
    var tile = document.getElementById(id);
    if (tile.disabled != "disabled") {
        tile.style.background = "white";
        tile.style.opacity = 1;
    }
}

function generateBoardArray(size) {
    var boardStore = Array(size);
    for (i = 0; i < size; i++) {
        var array = Array(size);
        array.fill(null);
        boardStore[i] = array;
    }
    return boardStore;
}

function startGame() {
    var startButton = document.getElementById("startGame");
    boardArray = generateBoardArray(3);
    drawBoard(3);
    startButton.style.display = "none";

}
var startButton = document.getElementById("startGame");
startButton.addEventListener('click', startGame);

function updateTile(clickedId) {
    var tile = document.getElementById(clickedId);
    console.log(`${value}, Turn : ${turnCounter}, Tile ${clickedId} clicked`);
    tile.disabled = "disabled";
    value = turnIndicator();
    if (value === "⭕") {
        tile.innerText = "⭕";
        tile.style.backgroundColor = "magenta";
    } else if (value === "❌") {
        tile.innerText = "❌"
        tile.style.backgroundColor = "cyan";

    }
    console.log(boardArray);

}

function mapTileGrid(clickedId) {
    var id = clickedId;
    switch (id) {
        case "1":
            boardArray[0][0] = value;

            break;
        case "2":
            boardArray[0][1] = value;
            break;
        case "3":
            boardArray[0][2] = value;
            break;
        case "4":
            boardArray[1][0] = value;
            break;
        case "5":
            boardArray[1][1] = value;
            break;
        case "6":
            boardArray[1][2] = value;
            break;
        case "7":
            boardArray[2][0] = value;
            break;
        case "8":
            boardArray[2][1] = value;
            break;
        case "9":
            boardArray[2][2] = value;
            break;

        default:
            // statements_def
            break;
    }
}

function winCondition() {
    var win = false;
    var j = 0;
    var k = 0;
    for (i = 0; i < 3; i++) {
        // Horizontal win
        if (boardArray[i][j] == boardArray[i][j + 1] && boardArray[i][j + 1] == boardArray[i][j + 2]) {
            winner = boardArray[i][j];
            if(winner!=null){
                win = true;
            }
            //setWinnerColor(i,i+1,i+2);
            return win;
        }
        // Vertical Win
        else if (boardArray[j][i] == boardArray[j+1][i] && boardArray[j +1][i] == boardArray[j+2][i]) {
            winner = boardArray[j][i];
            if(winner!=null){
                win = true;
            }
            //setWinnerColor(i,i+1,i+2);
            return win;
        }
        else if (boardArray[j][k] == boardArray[j+1][k+1] && boardArray[j+1][k + 1] == boardArray[j+2][k+2]) {
            winner = boardArray[j][k];
            if(winner!=null){
                win = true;
            }
            //setWinnerColor(i,i+1,i+2);
            return win;
        }
        else if (boardArray[j][k+2] == boardArray[j+1][k+1] && boardArray[j+1][k+1] == boardArray[j+2][k]){
            winner = boardArray[j][k];
            if(winner!=null){
                win = true;
            }
            //setWinnerColor(i,i+1,i+2);
            return win;
        }
}
}