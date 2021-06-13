var audio = new Audio('../src/Sound/eat.mp3');

function random_fruit() {
    food_x = Math.floor(Math.random() * block_cout_x) * block_size;
    food_y = Math.floor(Math.random() * block_cout_y) * block_size;
}

function eat() {
    if (snake_x < food_x + block_size &&
        snake_x + block_size > food_x &&
        snake_y < food_y + block_size &&
        snake_y + block_size > food_y) {
        score.textContent = "Score: " + ++set_score;

        if (set_score > scoreLS) {
            localStorage.setItem("score", set_score)
            topScore.textContent = "Your top score: " + set_score
        }

        snake_length++;
        audio.play();
        random_fruit();
    }
}