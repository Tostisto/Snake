canvas.addEventListener("touchstart", startTouch, false);
canvas.addEventListener("touchmove", moveTouch, false);

var init_x = null;
var init_y = null;


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