
// Directions of Snake (constants)
const NORTH = {x: 0, y: -1};
const EAST = {x: 1, y: 0};
const SOUTH = {x: 0, y: 1};
const WEST = {x: -1, y: 0};

// Number of rows and columns in the grid (constants)
const ROWS = 14;
const COLS = 20;

// Initial State of Game (an object)
const initialState = {
    moves: [EAST], //array of moves (a.k.a. directions)
    snake: [{x: 2, y: 2}], //array of points where the snake is
    apple: randomPosition(), //point where apple is
    gameOver: false //boolean whether game is over or not
}

/*  Next Moves (a function)
    Params: a state 
    Returns: an array of moves
*/
function nextMoves(state){
    const moves = state.moves;
    if (moves.length > 1){
        moves.shift();
    }
    return moves;
}

// Checks if two points are equal
function pEqual(point1, point2){
    if (point1.x == point2.x && point1.y == point2.y){
        return true;
    }
    else {
        return false;
    }
}

// Modulo function corrected for when num1 is negative
function modulo(num1, num2){
    return (((num1 % num2) + num2) % num2);
}

/*  Where will the next head of the snake be? (a function)
    Params: a state
    Returns: a point
*/
function nextHead(state){
    let head = {};
    // If there is a snake already
    if (state.snake.length > 0){
        // Add the first element in snake array with the first 
        // element in moves array, then mod with COLS/ROWS
        head = {
            x: modulo(state.snake[0].x + state.moves[0].x, COLS),
            y: modulo(state.snake[0].y + state.moves[0].y, ROWS)
        };
    }
    // Otherwise, initialize the snake's head
    else {
        head = {x: 2, y: 2};
    }
    return head;
}

/*  Will the apple be eaten by the snake? (a function)
    Params: a state
    Returns: a boolean
*/
function willEat(state){
    if (pEqual(nextHead(state),state.apple)){
        return true;
    }
    return false;
}

/*  Will the snake crash? (a function)
    Params: a state
    Returns: a boolean
*/
function willCrash(state){
    let i;
    //Snake's body not including last point
    for (i = 0; i < (state.snake.length-1); i++){
        if (pEqual(nextHead(state),state.snake[i])){
            return true;
        }
    }
    //If we also need to check the last point
    if (willEat(state)){
        if (pEqual(nextHead(state),state.snake[state.snake.length-1])){
            return true;
        }
    }
    return false;
}

/*  Where will the next snake be? (a function)
    Params: a state
    Returns: an array of points
*/
function nextSnake(state){
    if (willCrash(state)){
        state.gameOver = true;
        return state.snake;
    }
    let newArr = [nextHead(state)];
    if (!willEat(state)){
        state.snake.pop();
    }
    return newArr.concat(state.snake);
}

//Returns a random number between 0 (inclusive) and lessThan (not inclusive)
function randomInt(lessThan){
    return Math.floor(Math.random() * lessThan);
}

//Returns a random position (a point) in the game grid
function randomPosition(){
    const rndPos = {
        x: randomInt(COLS),
        y: randomInt(ROWS)
    };
    return rndPos;
}

/*  Where will the next apple be? (a function)
    Params: a state
    Returns: a point
*/
function nextApple(state){
    if (willEat(state)){
        return randomPosition();
    }
    else {
        return state.apple;
    }
}

/*  Next State (a function)
    Params: a state 
    Returns: a new state
*/
function nextState(state){
    let newState = {
        moves: nextMoves(state),
        snake: nextSnake(state),
        apple: nextApple(state)
    };
    return newState;
}

function validMove(state, move){
    if (state.moves[0].x + move.x == 0 || state.moves[0].y + move.y == 0){
        return false;
    }
    return true;
}

function addMove(state, move){
    const mymoves = state.moves;
    state.moves = mymoves.concat([move]);
    return state;
}

module.exports = {NORTH, EAST, SOUTH, WEST, ROWS, COLS, initialState, nextState, validMove, addMove}