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
            canvas.style.display = "none";
            body.style.background = "#eba834";
            velocity_x = 0;
            velocity_y = 0;
            snake_x = 0;
            snake_y = 0;
            tail_x, tail_y = [];
        }
    }
}
