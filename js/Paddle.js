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

function movePaddle(x) {

    var leftPaddle = x - (paddleWidth / 2);
    var rightPaddle = x + (paddleWidth / 2);

    if (leftPaddle > 0 && rightPaddle < canvas.width) {
        paddleX = leftPaddle;
    } else if (x < paddleWidth / 2) {
        paddleX = 0;
    } else if (x > canvas.width - (paddleWidth / 2)) {
        paddleX = canvas.width - paddleWidth;
    }
}