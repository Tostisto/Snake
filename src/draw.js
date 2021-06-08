function draw_rectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBackground() {
    draw_rectangle(0, 0, canvas.width, canvas.height, "lightgray")

    for (let i = 0; i < block_cout_x; i++) {
        for (let j = 0; j < block_cout_y; j++) {
            draw_rectangle(block_size * i, block_size * j, block_size - 1, block_size - 1, "white")
        }
    }
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

function drawFruit() {

    for (let i = 0; i < tail_x.length; i++) {
        if (food_x == tail_x[i] && food_y == tail_y[i]) {
            random_fruit();
        }
    }

    draw_rectangle(food_x, food_y, block_size - 1, block_size - 1, "#ebb515")

    eat();
}