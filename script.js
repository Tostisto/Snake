document.addEventListener('keydown', keypush);

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const score = document.querySelector("h1");

const block_size = 50;
const snake_speed = 50;

let set_score = 0;

let snake_length = 4;
let snake_x = 0;
let snake_y = 0;
let tail_x = [];
let tail_y = [];

let velocity_x = 0;
let velocity_y = 0;

const block_cout_x = canvas.width / block_size;
const block_cout_y = canvas.height / block_size;

var audio = new Audio('Sound/eat.mp3');

random_fruit();

gameLoop();

function gameLoop() {

    drawBackground();

    colision();

    drawFruit();

    drawSnake();

    move();

    setTimeout(gameLoop, 90);
}

function draw_rectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawSnake() {
    for (let i = 0; i < tail_y.length; i++) {
        draw_rectangle(tail_x[i], tail_y[i], block_size, block_size, "green");
    }

    tail_x.push(snake_x);
    tail_y.push(snake_y);

    tail_x = tail_x.slice(-1 * snake_length);
    tail_y = tail_y.slice(-1 * snake_length);
    draw_rectangle(snake_x, snake_y, block_size, block_size, "black");
}

function drawBackground() {
    draw_rectangle(0, 0, canvas.width, canvas.height, "lightgray")

    for (let i = 0; i < block_cout_x; i++) {
        for (let j = 0; j < block_cout_y; j++) {
            draw_rectangle(block_size * i, block_size * j, block_size - 1, block_size - 1, "white")
        }
    }
}

function drawFruit() {

    for (let i = 0; i < tail_x.length; i++) {
        if (food_x == tail_x[i] && food_y == tail_y[i]) {
            random_fruit();
        }
    }

    draw_rectangle(food_x, food_y, block_size - 1, block_size - 1, "#ebb515")

    // Food colision
    if (snake_x < food_x + block_size &&
        snake_x + block_size > food_x &&
        snake_y < food_y + block_size &&
        snake_y + block_size > food_y) {
        score.textContent = ++set_score;
        snake_length++;
        audio.play();
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
    for (let i = 0; i < tail_y.length; i++) {
        if (snake_x < tail_x[i] + block_size &&
            snake_x + block_size > tail_x[i] &&
            snake_y < tail_y[i] + block_size &&
            snake_y + block_size > tail_y[i] &&
            set_score > 0) {
            gameover();
        }
    }
}

function gameover() {
    //Background
    draw_rectangle(0, 0, canvas.width, canvas.height, "#ebb515")
    //text
    ctx.fillStyle = "black";
    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    snake_speed = 0;
}

function move() {
    snake_x += snake_speed * velocity_x;
    snake_y += snake_speed * velocity_y;
}

function moveup() {
    if (velocity_y != 1) {
        velocity_x = 0;
        velocity_y = -1;
    }
}

function movedown() {
    if (velocity_y != -1) {
        velocity_x = 0;
        velocity_y = 1;
    }
}

function moveright() {
    if (velocity_x != -1) {
        velocity_x = 1;
        velocity_y = 0;
    }
}

function moveleft() {
    if (velocity_x != 1) {
        velocity_x = -1;
        velocity_y = 0;
    }
}

function keypush(event) {
    if (event.key == 'ArrowUp' || event.key == 'w') {
        moveup();
    }
    if (event.key == 'ArrowDown' || event.key == 's') {
        movedown();
    }
    if (event.key == 'ArrowLeft' || event.key == 'a') {
        moveleft();
    }
    if (event.key == 'ArrowRight' || event.key == 'd') {
        moveright();
    }

}
