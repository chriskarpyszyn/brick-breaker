function colorRect(topLeftX, topRightY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topRightY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawDebug() {
    if (debug) {

        var ballSize = 2.5;

        colorCircle(ballX, ballY - ballRadius, ballSize, 'red');
        colorCircle(ballX, ballY + ballRadius, ballSize, 'green');
        colorCircle(ballX - ballRadius, ballY, ballSize, 'blue');
        colorCircle(ballX + ballRadius, ballY, ballSize, 'cyan');

        colorCircle(paddleX, paddleY, ballSize, 'red');
        colorCircle(paddleX, paddleY + paddleHeight, ballSize, 'pink');
        colorCircle(paddleX + paddleWidth, paddleY, ballSize, 'blue');
        colorCircle(paddleX + paddleWidth, paddleY + paddleHeight, ballSize, 'cyan');

    }
}

function drawText(text, x, y, color, font, textAlign) {
    canvasContext.fillStyle = color;
    canvasContext.font = font;
    canvasContext.textAlign = textAlign;
    canvasContext.fillText(text, x, y);
}