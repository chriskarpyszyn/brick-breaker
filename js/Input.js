function initHandlers() {
    canvas.addEventListener("mousemove", mouseMoveHandler);
    canvas.addEventListener("mouseup", mouseUpHandler);
    canvas.addEventListener("keydown", keyDownHandler);
}

function mouseMoveHandler(evt) {
    const mousePos = calculateMousePos(evt);
    movePaddle(mousePos.x);

    if (debug) {
        ballX = mousePos.x;
        ballY = mousePos.y;
    }
}

function mouseUpHandler() {
    ballHeldByPaddle = false;
}

function keyDownHandler(evt) {
    var keyCode = evt.keyCode;
    //keycode 81 = q
    if (keyCode === 81) {
        if (debug === true) {
            debug = false;
        } else {
            debug = true;
        }
    }
}

function calculateMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;

    //account for margins, canvas position on page, scroll amount
    const mouseX = evt.clientX - rect.left - root.scrollLeft;
    const mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

