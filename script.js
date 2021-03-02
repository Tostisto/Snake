document.addEventListener('keydown', keypush);

const canvas = document.querySelector("canvas");
const score = document.querySelector("h1");
const ctx = canvas.getContext("2d");

const block_size = 50;
const snake_speed = 50;
let set_score = 0;
let snake_x = 50;
let snake_y = canvas.height / 2;

let velocity_x = 0;
let velocity_y = 0;

const block_cout_x = canvas.width / block_size;
const block_cout_y = canvas.height / block_size;

random_fruit();

gameLoop();

function gameLoop() {

    drawBackground();

    drawFruit();

    drawSnake();

    colision();

    move();

    setTimeout(gameLoop, 90);
}

function move() {
    snake_x += snake_speed * velocity_x;
    snake_y += snake_speed * velocity_y;
}

function drawFruit() {
    ctx.fillStyle = "#ebb515";
    ctx.fillRect(food_x, food_y, block_size - 1, block_size - 1);

    if (snake_x == food_x && snake_y == food_y) {
        score.textContent = ++set_score;
        random_fruit();
    }
}

function random_fruit() {
    food_x = Math.floor(Math.random() * block_cout_x) * block_size;
    food_y = Math.floor(Math.random() * block_cout_y) * block_size;
}

function colision() {
    if (snake_x > canvas.width - block_size) {
        snake_x = 0;
    }
    if (snake_x < 0) {
        snake_x = canvas.width;
    }
    if (snake_y > canvas.height - block_size) {
        snake_y = 0;
    }
    if (snake_y < 0) {
        snake_y = canvas.height;
    }
}


function drawSnake() {
    ctx.fillStyle = "black";
    ctx.fillRect(snake_x, snake_y, block_size, block_size);
}

function drawBackground() {
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < block_cout_x; i++) {
        for (let j = 0; j < block_cout_y; j++) {
            ctx.fillStyle = "white";
            ctx.fillRect(block_size * i, block_size * j, block_size - 1, block_size - 1);
        }
    }
}

function keypush(event) {
    if (event.key == 'ArrowUp') {
        velocity_x = 0;
        velocity_y = -1;
    }
    if (event.key == 'ArrowDown') {
        velocity_x = 0;
        velocity_y = 1;
    }
    if (event.key == 'ArrowLeft') {
        velocity_x = -1;
        velocity_y = 0;
    }
    if (event.key == 'ArrowRight') {
        velocity_x = 1;
        velocity_y = 0;
    }

}
