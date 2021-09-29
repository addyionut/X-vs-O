const gameStatusMessage = document.getElementById('gameMessage');
const pressedButton = document.getElementsByTagName('button');
var playerTurn = "X";
var gameOver = false;
var charNumbers = 0;
var buttons = [["", "", ""], 
	       ["", "", ""], 
	       ["", "", ""]];
gameStatusMessage.innerHTML = "It's player " + playerTurn + "'s turn";

function currentPlayer() {
	if (playerTurn === "X") {
		playerTurn = "O";
		return playerTurn;
	}
	playerTurn = "X";
	return playerTurn;
}

function winningCases() {
	for (let i = 0, j = 0; i < 3 && gameOver === false; ++i) {
		if (((i === 1 && buttons[i][i] === "X") || (i === 1 && buttons[i][i] === "O")) && 
		((buttons[i - 1][i - 1] === buttons[i][i] && buttons[i][i] === buttons[i + 1][i + 1]) ||
		(buttons[i - 1][i + 1] === buttons[i][i] && buttons[i][i] === buttons[i + 1][i - 1]))) {
			gameStatusMessage.innerHTML = "The player " + playerTurn + " won!";
			document.querySelectorAll('.box').forEach(cell => cell.disabled = true);
			gameOver = true;
		}
		else if (buttons[i][i] === "X" || buttons[i][i] === "O") {
			if ((buttons[i][j] == buttons[i][j + 1] && buttons[i][j + 1] == buttons[i][j + 2]) ||
			(buttons[j][i] == buttons[j + 1][i] && buttons[j + 1][i] == buttons[j + 2][i])) {
				gameStatusMessage.innerHTML = "The player " + playerTurn + " won!";
				document.querySelectorAll('.box').forEach(cell => cell.disabled = true);
				gameOver = true;
			}
		}
	}
	if (charNumbers === 9 && gameOver === false) {
		gameStatusMessage.innerHTML = "It's a draw!";
		gameOver = true;
	}
}

function managePressedButtons(id) {	
	document.getElementById(id).innerHTML = playerTurn;
	document.getElementById(id).disabled = 'true';
	buttons[id[0]][id[2]] = playerTurn;
	++charNumbers;
	winningCases();
	if (gameOver) {
		return;
	}
	else {
		currentPlayer();
		gameStatusMessage.innerHTML = "It's player " + playerTurn + "'s turn";
	}
}  

function restartGame() {
	gameOver = false;
	playerTurn = "X";
	gameStatusMessage.innerHTML = "It's player " + playerTurn + "'s turn";
	buttons = [["", "", ""], 
		   ["", "", ""], 
	           ["", "", ""]];
	charNumbers = 0;
	document.querySelectorAll('.box').forEach(cell => cell.innerHTML = "");
	document.querySelectorAll('.box').forEach(cell => cell.disabled = false);
}
