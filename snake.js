var canvas;
var context;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;  // The snake begins the game going only to the right direction
var upDirection = false;
var downDirection = false;

var inGame = true;    // Indicates whether game is still active or should terminate

var head;
var apple;
var ball;

const DOT_SIZE = 10;
const ALL_DOTS = 900;   // The highest number of 10x10-sized dots on the 300 x 300 area is 900.
const MAX_RAND = 29;    
const DELAY = 150;      // Sets the pace of the game
const C_HEIGHT = 300;
const C_WIDTH = 300;    

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);   

function init(){   // This function is called when the game begins
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);   // Keeps the game running
}    

function loadImages(){     // This function finds the images in the directory and assigns them to variables
    head = new Image();
    head.src = 'head.png';    
    
    ball = new Image();
    ball.src = 'dot.png'; 
    
    apple = new Image();
    apple.src = 'apple.png'; 
}

function createSnake(){    // This function sets the x and y coordinates for the dots of the snake, which starts with three dots
    dots = 3;

    for (var z = 0; z < dots; z++){
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function checkApple(){     // This function checks if the head of the snake is at the apple's position
    if ((x[0] == apple_x) && (y[0] == apple_y)){   // Add 1 to number of dots and move apple to other spot if snake eats apple
        dots++;
        locateApple();
    }
}    

function doDrawing(){  // This function illustrates changes onto the canvas
    
    context.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (inGame){
        context.drawImage(apple, apple_x, apple_y); // Draws apple

        for (var z = 0; z < dots; z++){    // Draws all dots of snake
            
            if (z == 0) {
                context.drawImage(head, x[z], y[z]);
            } else {
                context.drawImage(ball, x[z], y[z]);
            }
        }    
    } else{
        gameOver();
    }        
}

function gameOver(){   // This function changes the screen to a "Game Over" screen when relevant
    context.fillStyle = 'white';
    context.textBaseline = 'middle'; 
    context.textAlign = 'center'; 
    context.font = 'normal bold 18px serif';
    
    context.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

function move(){    // This function moves the positions of the dots that make up the snake

    for (var z = dots; z > 0; z--){    // Shifts positions of all dots to previous position
    
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    // This block of code determines the value of the head of the snake

    if (leftDirection){
        x[0] -= DOT_SIZE;
    }

    if (rightDirection){
        x[0] += DOT_SIZE;
    }

    if (upDirection){
        y[0] -= DOT_SIZE;
    }

    if (downDirection){
        y[0] += DOT_SIZE;
    }
}    

function checkCollision(){ // This function checks to see if the snake bumps out of bounds
    for (var z = dots; z > 0; z--){
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])){  // If the snake bumps into itself when turning
            inGame = false;
        }
    }

    // This block of code checks to see if the snake bumps into any of the 4 walls
    
    if (y[0] >= C_HEIGHT){
        inGame = false;
    }

    if (y[0] < 0){
       inGame = false;
    }

    if (x[0] >= C_WIDTH){
      inGame = false;
    }

    if (x[0] < 0){
      inGame = false;
    }
}

function locateApple(){    // This function sets the coordinates of the apple. 
    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}    

function gameCycle(){  // This function is the main driver of the game
    if (inGame){
        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e){   // Thsi function is called anytime a key is pressed
    var key = e.keyCode;
    
    // This block of code sets the boolean values of direction to be processed in the move function

    if((key == LEFT_KEY) && (!rightDirection)){    
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if((key == RIGHT_KEY) && (!leftDirection)){
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if((key == UP_KEY) && (!downDirection)){        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if((key == DOWN_KEY) && (!upDirection)){
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};