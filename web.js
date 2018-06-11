
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Initialize the starting state
let currentState = initialState;

/* Convert from xy coordinates to pixels */
function pixelsX(x){
    return Math.round((canvas.width/COLS) * x);
}
function pixelsY(y){
    return Math.round((canvas.height/ROWS) * y);
}

function draw() {
    //Background
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Snake
    ctx.fillStyle = '#519548';
    currentState.snake.forEach(function(bodyPart){
        ctx.fillRect(pixelsX(bodyPart.x), pixelsY(bodyPart.y), pixelsX(1), pixelsY(1));
    });
    //Apple
    ctx.fillStyle = '#FF3D3D';
    let apple = currentState.apple;
    ctx.fillRect(pixelsX(apple.x), pixelsY(apple.y), pixelsX(1), pixelsY(1));
}

function step(t1){
    return function(t2){
        if (willCrash(currentState)){
            document.querySelector('.bg-modal').style.display = 'flex';
            document.querySelector('.close').addEventListener('click', function(){
                document.querySelector('.bg-modal').style.display = 'none';
            });
            document.getElementById('close').addEventListener('click', function(){
                window.close();
            });   
        }
        else {
            if (t2-t1 > 100) {
                currentState = nextState(currentState);
                draw();
                window.requestAnimationFrame(step(t2));
            }
            else {
                window.requestAnimationFrame(step(t1));
            }
        }
    }
}

window.addEventListener('keydown', keyPressed);

function keyPressed(e){
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    switch(e.key){
        // space and arrow keys
        case 'w': case 'ArrowUp': 
        if (validMove(currentState, NORTH)){
            currentState = addMove(currentState, NORTH);
        } break;
        case 'a': case 'ArrowLeft':
        if (validMove(currentState, WEST)){
            currentState = addMove(currentState, WEST);
        } break;
        case 's': case 'ArrowDown':
        if (validMove(currentState, SOUTH)){
            currentState = addMove(currentState, SOUTH);
        } break;
        case 'd': case 'ArrowRight':
        if (validMove(currentState, EAST)){
            currentState = addMove(currentState, EAST);
        } break;
        
        default: break;
    }
}

draw();
window.requestAnimationFrame(step(0));
