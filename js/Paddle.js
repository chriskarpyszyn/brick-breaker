var paddleWidth = 100;
var paddleHeight = 10;
var paddleX, paddleY;

function initPaddle() {
    paddleX = canvas.width / 2 - paddleWidth / 2;
    paddleY = canvas.height * .9 - paddleHeight;
}

function drawPaddle() {
    colorRect(paddleX, paddleY, paddleWidth, paddleHeight, '#FFFFFF');
}