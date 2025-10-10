document.addEventListener ('DOMContentLoaded', () => {
    // 1. Get the main game board container element.
    const board = document.getElementById('board');

    // 2. Get all the direct child <div> elements inside the board.
    // These are the nine squares of the Tic-Tac-Toe grid.
    const squares = board.querySelectorAll('div');

    // 3. Iterate over the collection of squares.
    squares.forEach(square => {
        // 4. Add the 'square' CSS class to each <div> element.
        // This applies all the base styling (size, background, centering) defined in tic-tac-toe.css.
        square.classList.add('square');
    })
})

// --- Game State Variables ---
// Tracks the current player ('X' starts first).
let currentPlayer = 'X'; 
// Array to store the state of the 9 board squares (0-8). null means empty.
let boardState = Array(9).fill(null);
// Reference to the status message element
let statusDiv;

/**
 * Handles the click event on any square of the board.
 * @param {Event} event - The click event object.
 */
function handleClick(event) {
    const square = event.target;
    
    // Determine the index of the clicked square (0 through 8).
    // This is done by finding the square's position relative to its siblings inside the #board parent.
    const index = Array.from(square.parentNode.children).indexOf(square);

    // 1. Check if the square is already played. If occupied, ignore the click.
    if (boardState[index] !== null) {
        return; 
    }

    // 2. Mark the square in the UI
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer); // Adds 'X' or 'O' class for styling (color)
    square.classList.remove('hover'); // Remove hover style once played

    // 3. Update the game state array
    boardState[index] = currentPlayer;

    // 4. Check for a win (This logic would be implemented in a later step)
    
    // 5. Switch the player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    // 6. Update the status message to show whose turn it is
    statusDiv.textContent = `It is now Player ${currentPlayer}'s turn.`;
}

/**
 * Handles the mouseenter event to apply hover styling for the current player.
 * @param {Event} event - The mouseenter event object.
 */
function handleMouseEnter(event) {
    const square = event.target;
    // Only apply hover if the square is empty and the game is active (not implemented yet, but good practice)
    if (square.textContent === "") {
        square.classList.add('hover', currentPlayer);
    }
}

/**
 * Handles the mouseleave event to remove hover styling.
 * @param {Event} event - The mouseleave event object.
 */
function handleMouseLeave(event) {
    const square = event.target;
    // Remove the hover class and the temporary player class
    square.classList.remove('hover', 'X', 'O');
}

/**
 * Runs when the HTML document is fully loaded. Sets up the board and event listeners.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    statusDiv = document.getElementById('status');
    
    // Initialize the status message
    statusDiv.textContent = `Move your mouse over a square and click to play an X.`;

    // 1. Setup each square
    squares.forEach(square => {
        // Add the base styling class (Task 1)
        square.classList.add('square');

        // Add the click listener (Task 2)
        square.addEventListener('click', handleClick);

        // Add hover listeners (for visual feedback)
        square.addEventListener('mouseenter', handleMouseEnter);
        square.addEventListener('mouseleave', handleMouseLeave);
    });
});



currentPlayer = 'X'; 
// Array to store the state of the 9 board squares (0-8). null means empty.
boardState = Array(9).fill(null);
// Reference to the status message element
statusDiv;
// Flag to control if the game is still active
let gameActive = true; 

// Define all possible winning combinations (indices of the boardState array)
const WINNING_COMBINATIONS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];


/**
 * Checks the current board state for a winner or a draw.
 * @returns {string|null} - Returns 'X', 'O', or 'Draw' if the game is over, otherwise returns null.
 */
function checkWinner() {
    // 1. Check for a win
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        const valueA = boardState[a];

        // Check if the three spots are occupied by the same player
        if (valueA !== null && valueA === boardState[b] && valueA === boardState[c]) {
            return valueA; // Return 'X' or 'O' (the winner)
        }
    }

    // 2. Check for a draw (if no winner and no empty spots left)
    if (!boardState.includes(null)) {
        return 'Draw';
    }

    return null; // Game is ongoing
}


/**
 * Handles the click event on any square of the board.
 * @param {Event} event - The click event object.
 */
function handleClick(event) {
    const square = event.target;
    
    // Determine the index of the clicked square (0 through 8).
    const index = Array.from(square.parentNode.children).indexOf(square);

    // 1. Check if the square is already played OR if the game is over
    if (boardState[index] !== null || !gameActive) {
        return; 
    }

    // 2. Mark the square in the UI
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer); // Adds 'X' or 'O' class for styling (color)
    square.classList.remove('hover'); // Remove hover style once played

    // 3. Update the game state array
    boardState[index] = currentPlayer;

    // 4. Check for a win/draw
    const winner = checkWinner();

    if (winner === 'X' || winner === 'O') {
        // Game Over - Winner Found!
        gameActive = false;
        statusDiv.textContent = `Congratulations! ${winner} is the Winner!`;
        statusDiv.classList.add('you-won');
    } else if (winner === 'Draw') {
        // Game Over - Draw
        gameActive = false;
        statusDiv.textContent = `It's a Draw! Game Over.`;
        // Note: The 'you-won' class is only for winners, per the prompt.
    } else {
        // 5. Switch the player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
        // 6. Update the status message
        statusDiv.textContent = `It is now Player ${currentPlayer}'s turn.`;
    }
}

/**
 * Handles the mouseenter event to apply hover styling for the current player.
 * @param {Event} event - The mouseenter event object.
 */
function handleMouseEnter(event) {
    const square = event.target;
    // Only apply hover if the square is empty AND the game is active
    if (gameActive && square.textContent === "") {
        square.classList.add('hover', currentPlayer);
    }
}

/**
 * Handles the mouseleave event to remove hover styling.
 * @param {Event} event - The mouseleave event object.
 */
function handleMouseLeave(event) {
    const square = event.target;
    // Remove the hover class and the temporary player class
    square.classList.remove('hover', 'X', 'O');
}

/**
 * Runs when the HTML document is fully loaded. Sets up the board and event listeners.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    statusDiv = document.getElementById('status');
    
    // Initialize the status message
    statusDiv.textContent = `Move your mouse over a square and click to play an X.`;

    // 1. Setup each square
    squares.forEach(square => {
        // Add the base styling class 
        square.classList.add('square');

        // Add the click listener
        square.addEventListener('click', handleClick);

        // Add hover listeners
        square.addEventListener('mouseenter', handleMouseEnter);
        square.addEventListener('mouseleave', handleMouseLeave);
    });
});



/**
 * Resets the game state, clears the board visually, and updates the status.
 */
function resetGame() {
    // 1. Reset Game State Variables
    currentPlayer = 'X';
    boardState = Array(9).fill(null);
    gameActive = true;

    // 2. Clear UI board
    const board = document.getElementById('board');
    // Get the current set of squares to clear their content and classes
    const squares = board.querySelectorAll('div'); 

    squares.forEach(square => {
        square.textContent = ''; // Clear 'X' or 'O' text
        // Remove all player and hover classes
        square.classList.remove('X', 'O', 'hover'); 
    });

    // 3. Reset Status Message
    statusDiv.classList.remove('you-won');
    statusDiv.textContent = `Move your mouse over a square and click to play an X.`;
}


/**
 * Checks the current board state for a winner or a draw.
 * @returns {string|null} - Returns 'X', 'O', or 'Draw' if the game is over, otherwise returns null.
 */
function checkWinner() {
    // 1. Check for a win
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        const valueA = boardState[a];

        // Check if the three spots are occupied by the same player
        if (valueA !== null && valueA === boardState[b] && valueA === boardState[c]) {
            return valueA; // Return 'X' or 'O' (the winner)
        }
    }

    // 2. Check for a draw (if no winner and no empty spots left)
    if (!boardState.includes(null)) {
        return 'Draw';
    }

    return null; // Game is ongoing
}


/**
 * Handles the click event on any square of the board.
 * @param {Event} event - The click event object.
 */
function handleClick(event) {
    const square = event.target;
    
    // Determine the index of the clicked square (0 through 8).
    const index = Array.from(square.parentNode.children).indexOf(square);

    // 1. Check if the square is already played OR if the game is over
    if (boardState[index] !== null || !gameActive) {
        return; 
    }

    // 2. Mark the square in the UI
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer); // Adds 'X' or 'O' class for styling (color)
    square.classList.remove('hover'); // Remove hover style once played

    // 3. Update the game state array
    boardState[index] = currentPlayer;

    // 4. Check for a win/draw
    const winner = checkWinner();

    if (winner === 'X' || winner === 'O') {
        // Game Over - Winner Found!
        gameActive = false;
        statusDiv.textContent = `Congratulations! ${winner} is the Winner!`;
        statusDiv.classList.add('you-won');
    } else if (winner === 'Draw') {
        // Game Over - Draw
        gameActive = false;
        statusDiv.textContent = `It's a Draw! Game Over.`;
        // Note: The 'you-won' class is only for winners, per the prompt.
    } else {
        // 5. Switch the player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
        // 6. Update the status message
        statusDiv.textContent = `It is now Player ${currentPlayer}'s turn.`;
    }
}

/**
 * Handles the mouseenter event to apply hover styling for the current player.
 * @param {Event} event - The mouseenter event object.
 */
function handleMouseEnter(event) {
    const square = event.target;
    // Only apply hover if the square is empty AND the game is active
    if (gameActive && square.textContent === "") {
        square.classList.add('hover', currentPlayer);
    }
}

/**
 * Handles the mouseleave event to remove hover styling.
 * @param {Event} event - The mouseleave event object.
 */
function handleMouseLeave(event) {
    const square = event.target;
    // Remove the hover class and the temporary player class
    square.classList.remove('hover', 'X', 'O');
}

/**
 * Runs when the HTML document is fully loaded. Sets up the board and event listeners.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements
    const board = document.getElementById('board');
    const squares = board.querySelectorAll('div');
    statusDiv = document.getElementById('status');
    const newGameButton = document.querySelector('.btn'); // Select the New Game button
    
    // Initialize the status message
    statusDiv.textContent = `Move your mouse over a square and click to play an X.`;

    // 1. Setup each square
    squares.forEach(square => {
        // Add the base styling class 
        square.classList.add('square');

        // Add the click listener
        square.addEventListener('click', handleClick);

        // Add hover listeners
        square.addEventListener('mouseenter', handleMouseEnter);
        square.addEventListener('mouseleave', handleMouseLeave);
    });

    // 2. Setup the New Game button
    newGameButton.addEventListener('click', resetGame);
});