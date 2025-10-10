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