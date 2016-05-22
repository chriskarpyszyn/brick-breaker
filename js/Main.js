var canvas;
var canvasContext;

var debug = false;

window.onload = function () {
    const fps = 30;
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    initHandlers();

    resetBall();
    resetBricks();

    initPaddle();

    setInterval(function () {
        move();
        draw();
    }, 1000 / fps);
};

function move() {
    moveBall();
}

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, '#000000');

    drawPaddle();

    drawBricks();

    drawBall();

    drawDebug();
}













