var canvas;
var canvasContext;

var debug = false;

var score = 0;

var SCORE_FOR_NEW_LIFE = 5000;

    const fps = 30;

window.onload = function () {

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    initHandlers();


    initBall();
    resetBricks();

    initPaddle();

    loadImages();

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

    drawScore();
}

function startGame() {
    setInterval(function () {
        move();
        draw();
    }, 1000 / fps);
}

function drawScore() {
    drawText(score, 5, 30, "#FFFFFF", "20px Consolas", "left");
}
