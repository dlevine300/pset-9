///////////////////// CONSTANTS /////////////////////////////////////

const winningConditions = [

  [0, 1, 2],

  [3, 4, 5],

  [6, 7, 8],

  [0, 3, 6],

  [1, 4, 7],

  [2, 5, 8],

  [0, 4, 8],

  [2, 4, 6]

];



///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;

let turn;

let win;

let determine_first_player;

let x_wins = 0;

let o_wins = 0;

let ties= 0



///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));

const message = document.querySelector("h2");



///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;

document.getElementById("board").onclick = takeTurn;

document.getElementById("reset-button").onclick = init;

document.getElementById("reset-scoreboard").onclick = resetScoreboard;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {

  board = [

    "", "", "",

    "", "", "",

    "", "", ""

  ];



  do {

    var first_Player = prompt("Enter X or O to determine who goes first: ");

    if (first_Player === null) {

      turn = "X";

      break;

    } else if (first_Player === "X" || first_Player === "x") {

      turn = "X";

    } else if (first_Player === "O" || first_Player === "o") {

      turn = "O";

    } else {

      determine_first_player = L;

    }

  } while (first_Player !== "X" && first_Player !== "x" && first_Player !== "O" && first_Player !== "o");



  win = null;



  render();

}



function render() {

  board.forEach(function(mark, index) {

    squares[index].textContent = mark;

  });

  if (win === "X") {

    x_wins = x_wins + 1

  }

  else if (win === "O") {

    o_wins = o_wins + 1

  }

  else if (win === "T") {

    ties = ties + 1

  }

  x_score.innerHTML = x_wins

  o_score.innerHTML = o_wins

  tie_score.innerHTML = ties

  message.textContent =

    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;

}



function takeTurn(e) {

  if (!win) {

    let index = squares.findIndex(function(square) {

      return square === e.target;

    });



    if (board[index] === "") {

      board[index] = turn;

      turn = turn === "X" ? "O" : "X";

      win = getWinner();



      render();

    }

  }

}



function getWinner() {

  let winner = null;



  winningConditions.forEach(function(condition, index) {

    if (

      board[condition[0]] &&

      board[condition[0]] === board[condition[1]] &&

      board[condition[0]] === board[condition[2]]

    ){

        winner = board[condition[0]];

    }

  });



  return winner ? winner : board.includes("") ? null : "T";

}



function resetScoreboard() {

    x_wins = 0;

    o_wins = 0;

    ties = 0;



    x_score.innerHTML = x_wins

    o_score.innerHTML = o_wins

    tie_score.innerHTML = ties

}
