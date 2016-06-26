var ballX, ballY;
var ballSpeedX = 0;
var ballSpeedY = 0;
var ballSpeedXMultipler = 0.35;

var ballRadius = 10;

const INITIAL_BALL_SPEED_X = 5;
const INITIAL_BALL_SPEED_Y = 8;

const INITIAL_BALL_LIVES = 3;
var ballLives = INITIAL_BALL_LIVES;

var ballHeldByPaddle = true;


function moveBall() {
    const ballLeft = ballX - ballRadius;
    const ballRight = ballX + ballRadius;
    const ballTop = ballY - ballRadius;
    const ballBottom = ballY + ballRadius;

    if (ballHeldByPaddle) {
        ballX = paddleX + 30;
        ballY = paddleY - ballRadius;
    } else {

        if (ballLeft < 0 && ballSpeedX < 0) {
            ballSpeedX *= -1;
        }

        if (ballRight > canvas.width && ballSpeedX > 0) {
            ballSpeedX *= -1;
        }

        if (ballTop < 0 && ballSpeedY < 0) {
            ballSpeedY *= -1;
        }

        if (ballTop >= canvas.height) {
            resetBall();
        }

        //collision with bottom or top of the ball
        if (ballSpeedY > 0) {
            if (ballBottom >= paddleY && ballBottom <= paddleY + paddleHeight
                || ballTop >= paddleY && ballTop <= paddleY + paddleHeight) { //Not sure if this makes sense, but allows for extreme side hits.
                if (ballX >= paddleX && ballX < paddleX + paddleWidth) {
                    const delta = ballX - (paddleX + paddleWidth / 2);
                    ballSpeedX = delta * ballSpeedXMultipler;
                    ballSpeedY *= -1;
                    if (brickCounter === 0) {
                        resetBricks();
                    }
                }
            }
        }

        //collision with left or right of ball
        if (ballSpeedY > 0) {
            if (ballRight >= paddleX && ballRight <= paddleX + paddleWidth
                || ballLeft >= paddleX && ballLeft <= paddleX + paddleWidth) {
                if (ballY >= paddleY && ballY < paddleY + paddleHeight) {
                    const delta = ballX - (paddleX + paddleWidth / 2);
                    ballSpeedX = delta * ballSpeedXMultipler;
                    ballSpeedY *= -1;
                    if (brickCounter === 0) {
                        resetBricks();
                    }
                }
            }
        }

        ///todo: need to fix ballX, ballY to detect at outer edge of circle and not center (clipping issues)
        breakAndBounceOffBrickAtPixelCoord(ballX, ballY);

        ballX += ballSpeedX;
        ballY += ballSpeedY;
    }
}

function drawBall() {

    colorCircle(ballX, ballY, ballRadius, "#FFFFFF");
    //drawBitmapCenteredAtLocationWithRotation(ballPic, ballX, ballY, 0);

    drawBallLives();
}

function drawBallLives() {

    var offset = 0;
    for (var i = 0; i < ballLives; i++) {
        colorCircle(canvas.width - 10 - offset, 8, 6, "#FFFFFF");
        offset += 15;
    }


}

function resetBall() {
    //ballX = canvas.width / 2;
    //ballY = canvas.height / 2;
    ballSpeedX = INITIAL_BALL_SPEED_X;
    ballSpeedY = INITIAL_BALL_SPEED_Y;

    ballHeldByPaddle = true;

    if (ballLives > 0) {
        ballLives -= 1;
    } else {
        score = 0;
        resetBricks();
        ballLives = INITIAL_BALL_LIVES;
    }


}

function initBall() {
    //ballX = canvas.width / 2;
    //ballY = canvas.height / 2;
    ballSpeedX = INITIAL_BALL_SPEED_X;
    ballSpeedY = INITIAL_BALL_SPEED_Y;
}
