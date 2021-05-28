document.addEventListener('keydown', keypush);

const body = document.querySelector("body")
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const score = document.querySelector("#showScore");
const topScore = document.querySelector("#topScore")
const gameoverHTML = document.querySelector("#gameover")

const restartButton = document.querySelector("button")

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

restartButton.onclick = function restart() {
    snake_length = 4;
    set_score = 0;
    score.textContent = "Score: 0"
    body.style.backgroundColor = "white"
    gameoverHTML.style.display = "none"
    canvas.style.display = "inline"
}