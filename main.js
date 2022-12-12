let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let box = 20;
let snake = [];
snake[0] = {
    x: 15 * box,
    y: 15 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 29 + 1) * box,
    y: Math.floor(Math.random() * 29 + 1) * box
}


function crairArea() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 30 * box, 30 * box);
}

function criarSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function comida() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}


function iniciarJogo() {
    if(snake[0].x > 29 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 30 * box;
    if(snake[0].y > 29 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 30 * box;

    crairArea();
    criarSnake();
    comida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 29 + 1) * box;
        food.y = Math.floor(Math.random() * 29 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("game over");
        }
    }
}

let jogo = setInterval(iniciarJogo, 70);