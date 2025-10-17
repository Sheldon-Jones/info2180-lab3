let player = 'X'; // Tracks the current player; starts with 'X'.
let boardValues = Array(9).fill(null); // Array to store the state of the 9 board squares (0-8); initialized as empty
let msgDisplay; // decalares variable to store display message
let gameActive = true; // boolean for game status

// These are the possible winning combinations in the array
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

// Exercise 1: Layout the Board 

document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements
    const gameboard = document.getElementById('board');
    const squares = gameboard.querySelectorAll('div');
    msgDisplay = document.getElementById('status');
    const newGameButton = document.querySelector('.btn'); 
       
    msgDisplay.textContent = `Move your mouse over a square and click to play an X.`; // Initialize the display message

    // iterates through the each square and adds each to the gameboard
    squares.forEach(square => {
        square.classList.add('square');

        // Attach event listeners
        square.addEventListener('click', clickAction);
        square.addEventListener('mouseenter', mouseClick);
        square.addEventListener('mouseleave', mouseLeave);
    });

    // Setup the New Game button listener
    newGameButton.addEventListener('click', resetGame);
});


// Exercise 2: Add an X or O to a Square when Clicked

/**
 * Handles the click event on any square of the board.
 * @param {Event} event - The click event object.
 */
function clickAction(event) {
    const square = event.target;
    const index = Array.from(square.parentNode.children).indexOf(square);// Determine the index of the clicked square (0 through 8).

    if (boardValues[index] !== null || !gameActive) {
        return; 
    }

    square.textContent = player;
    square.classList.add(player); // Adds 'X' or 'O' class for styling
    square.classList.remove('hover'); // Remove hover style once played

    //Update the game status array
    boardValues[index] = player;

    //Check for win/draw
    const winner = checkWinner(); //checkWinner function runs and stores result in winner variable

    if (winner === 'X' || winner === 'O') {  //checks if there is a winner
        gameActive = false;
        msgDisplay.textContent = `Congratulations! ${winner} is the Winner!`;
        msgDisplay.classList.add('you-won');
    } else if (winner === 'Draw') {   //checks if there is a draw
        gameActive = false;
        msgDisplay.textContent = `It's a Draw! Game Over.`;
    } else {
        player = player === 'X' ? 'O' : 'X';//Switches the player player if there is no winner or draw
        
        msgDisplay.textContent = `It is now player ${player}'s turn.`; // Update the status message
    }
}


// Exercise 3: Change the Style When You Move Your Mouse Over a Square
/**
 * Handles the mouseenter event to apply hover styling for the current player.
 * @param {Event} event - The mouseenter event object.
 */
function mouseClick(event) {
    const square = event.target;
    
    if (gameActive && square.textContent === "") { //hover applied only if game is active and there is no content in the square
        square.classList.add('hover', player);
    }
}

/**
 * Handles the mouseleave event to remove hover styling.
 * @param {Event} event - The mouseleave event object.
 */
function mouseLeave(event) {
    const square = event.target;
    // Remove the hover class and the temporary player class
    square.classList.remove('hover', 'X', 'O');
}




// Exercise 4: Check for the Winner and Update the Status
/**
 * Checks the current board state for a winner or a draw.
 * @returns {string|null} - Returns 'X', 'O', or 'Draw' if the game is over, otherwise returns null.
 */
function checkWinner() {
    // Check for a win
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        const valueA = boardValues[a];

        // Check if the three spots are occupied by the same player
        if (valueA !== null && valueA === boardValues[b] && valueA === boardValues[c]) {
            return valueA; // Return 'X' or 'O' which is the winner
        }
    }

    if (!boardValues.includes(null)) { //checks is array is full where there is no winner; a Draw
        return 'Draw';
    }

    return null; // if no winner or no draw then game continues
}


// Exercise 5: Restart the Game

function resetGame() { //resetGame function is triggered when button is clicked
   
    player = 'X'; //  Reset player to 'X' (first player)
    boardValues = Array(9).fill(null);  //clears board value array
    gameActive = true; //set game status to true

    // Clears game board
    const gameboard = document.getElementById('board');
    const squares = gameboard.querySelectorAll('.square'); 

    squares.forEach(square => {
        square.textContent = ''; // Clear 'X' or 'O' text
        square.classList.remove('X', 'O', 'hover'); 
    });

    //Reset Status Message
    msgDisplay.classList.remove('you-won'); 
    msgDisplay.textContent = `Move your mouse over a square and click to play an X.`;
}





