document.addEventListener('keydown', keypush);

const body = document.querySelector("body")
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const score = document.querySelector("#showScore");
const topScore = document.querySelector("#topScore")
const gameoverHTML = document.querySelector("#gameover")

let scoreLS = localStorage.getItem("score")

score.textContent = "Score: 0"

if (scoreLS === null) {
    topScore.textContent = "Your top score: 0"
}
else {
    topScore.textContent = "Your top score: " + scoreLS
}

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
        score.textContent = "Score: " + ++set_score;

        if (set_score > scoreLS) {
            localStorage.setItem("score", set_score)
        }

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
            gameoverHTML.style.display = "block";
            body.style.background = "#eba834"
            canvas.remove();
        }
    }
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

canvas.addEventListener("touchstart", startTouch, false);
canvas.addEventListener("touchmove", moveTouch, false);

var init_x = null;
var init_y = null;

function startTouch(event) {
    init_x = event.touches[0].clientX;
    init_y = event.touches[0].clientY;
};

function moveTouch(event) {
    if (init_x === null) {
        return 0;
    }

    if (init_y === null) {
        return 0;
    }

    var curr_x = event.touches[0].clientX;
    var curr_y = event.touches[0].clientY;

    var control_x = init_x - curr_x;
    var control_y = init_y - curr_y;

    if (Math.abs(control_x) > Math.abs(control_y)) {
        if (control_x < 0) {
            moveright();
        }
        else {
            moveleft();
        }
    }
    else {
        if (control_y < 0) {
            movedown();
        }
        else {
            moveup();
        }
    }

    init_x = null;
    init_y = null;

    event.preventDefault();
};
