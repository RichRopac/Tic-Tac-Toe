//Tic Tac Toe by Rich Ropac


const squares = document.querySelectorAll('.square') ;
const setBoard = Array(squares.length).fill(null);
const winningLine = document.getElementById("winLine");
const gameState = {
     numOfPlayers: "0",
     player1: "",
     player2: "2",
     status: "play",
     xTurn: true,};
const winningCombos = [                                                         //All winning combinations
  { theCombo: [0, 1, 2], winLine: "winLineRow1"},
  { theCombo: [3, 4, 5], winLine: "winLineRow2"},
  { theCombo: [6, 7, 8], winLine: "winLineRow3"},

  { theCombo: [0, 3, 6], winLine: "winLineCol1"},
  { theCombo: [1, 4, 7], winLine: "winLineCol2"},
  { theCombo: [2, 5, 8], winLine: "winLineCol3"},

  { theCombo: [0, 4, 8], winLine: "winLineDiagForward"},
  { theCombo: [2, 4, 6], winLine: "winLineDiagBack"}]
const players = document.getElementById("players")
const player1Text = document.getElementById("playerOneText");
const player2Text = document.getElementById("playerTwoText");
const gameOverBox = document.getElementById("gameOver");
const gameIsOverText = document.getElementById("gameOverText");
const playAgainBtn = document.getElementById("playAgain");
  playAgainBtn.addEventListener("click", playAgain);
const quitBtn = document.getElementById("quit");
  quitBtn.addEventListener("click", allDone);

function assignPlayers(){                                                     //Sets up the game based upon user input for number of users and names.
  while (gameState.numOfPlayers != "1" && gameState.numOfPlayers != "2"){
    gameState.numOfPlayers = prompt("Welcome to Tic-Tac-Toe!! How Many Players (1 or 2)");
  }
  gameState.player1 = window.prompt("Enter Player One's Name: ");
  str1 = " " + gameState.player1
  if (gameState.numOfPlayers == "2"){
    gameState.player2 = window.prompt("Enter Player Two's Name: ");   
     }else {
    gameState.player2 = "Computer"
  }
  str2 = " " + gameState.player2
  player1Text.innerText=player1Text.innerText+str1;
  player2Text.innerText=player2Text.innerText+str2;
  players.className = "show"
}

assignPlayers();

function allDone(){
  location.reload();
}
function playAgain (){
  winLine.className = "winLine";
  gameOverBox.className = "hide"
  setBoard.fill(null);
  squares.forEach((square) => (square.innerText = ""));
  gameState.xTurn = true;
  gameState.status = "play"
  gameIsOverText.innerText = "Game Over: ";
  squares.forEach((square) => square.addEventListener("click", clickBtn));
  hoverText();
}

squares.forEach((square) => square.addEventListener("click", clickBtn));

function hoverText(){                                                         //When the pointer hovers over a square it will show the players letter "X" or "O"
  squares.forEach((square) => {
    square.classList.remove("hoverButtonX");
    square.classList.remove("hoverButtonO");
    }
  )
  squares.forEach((square) => {
    if (square.innerText === ""){
        if (gameState.xTurn){
          square.classList.add("hoverButtonX")
        } else {
          square.classList.add("hoverButtonO")     
        }
    }
   } 
  )
}


hoverText();
                                           
function clickBtn(theEvent){                                                               //Area for events to happen when a player clicks on a square.
    const square = theEvent.target 
    const squareNum = square.dataset.index;
    console.log(theEvent.target)
    if(square.innerText != "") {
      return;
    }   
    if (gameState.numOfPlayers==="2"){
      if (gameState.xTurn){
        square.innerText = "X";
        setBoard[squareNum] = "X"
        gameState.xTurn = false; 
      } else {
         square.innerText = "O";
         setBoard[squareNum] = "O"
         gameState.xTurn = true;
      }
    }
    
    if (gameState.numOfPlayers==="1"){
      if (gameState.xTurn){
        square.innerText = "X";
        setBoard[squareNum] = "X"
        gameState.xTurn = true; 
        ComputersMove();
      }
    }
    
    hoverText();
    checkForWinner();

}

function checkForWinner(){                                                                  //Are to check the board for any winning combinations.
  for (const winningCombo of winningCombos){
    const theCombo = winningCombo.theCombo;
    const whichLine = winningCombo.winLine
    const sqVal1 = setBoard[theCombo[0]];
    const sqVal2 = setBoard[theCombo[1]];
    const sqVal3 = setBoard[theCombo[2]];
  
    if(sqVal1 !=null && sqVal1 === sqVal2 && sqVal1 === sqVal3){
      winningLine.classList.add(whichLine)
      gameState.status="win"
      gameIsOverBox(); 
      return;
    }}

    if(setBoard.includes(null) === false){
     gameState.status="draw"
     gameIsOverBox();
    
    }
  
}

function gameIsOverBox(){                                                                    //Game Over Box and allows a user(s) to play again or "Quit"
 
  gameOverBox.classList.add("show")
  str = ""  
  if (gameState.status === "win" && !gameState.xTurn){
    str = '  Winner is '+gameState.player1;
    gameIsOverText.innerText=gameIsOverText.innerText+str;
  }
  if (gameState.status === "win" && gameState.xTurn){
      str = "  Winner is "+gameState.player2;
      gameIsOverText.innerText=gameIsOverText.innerText+str;
  }
  if (gameState.status === "draw"){
    str = "  It's a Draw";
    gameIsOverText.innerText=gameIsOverText.innerText+str;
  }
 
  squares.forEach((square) => {
   square.classList.remove("hoverButtonX");
   square.classList.remove("hoverButtonO");
   square.removeEventListener("click", clickBtn);
   })

}

function ComputersMove(){                                                                    // Area for the Computer's move when only one player
  const squares = document.querySelectorAll('.square') ;
  
  emptyArray = Array(9)
  placement = 0;

  for (let i = 0; i<setBoard.length; i++){
    if (setBoard[i] === null){
      emptyArray[i] = "empty";
    } else {
      emptyArray[i] = "taken";
    }
  placement = emptyArray.indexOf("empty");

    // console.log(emptyArray)
    // console.log("Place is"+placement)
  }

       squares.dataset.indexNumber = "O"
       setBoard[placement] = "O"
      //  console.log(setBoard);1
       console.log(squares.innerText)
       console.log(setBoard)

  gameState.xTurn = true;
 
  
  return;
}
  