var ballX, ballY;
var ballSpeedX = 0;
var ballSpeedY = 0;
var ballSpeedXMultipler = 0.35;

var ballRadius = 10;

const INITIAL_BALL_SPEED_X = 5;
const INITIAL_BALL_SPEED_Y = 5;

function moveBall() {
    const ballLeft = ballX - ballRadius;
    const ballRight = ballX + ballRadius;
    const ballTop = ballY - ballRadius;
    const ballBottom = ballY + ballRadius;

    ///todo: BUG, ball get's stuck in the side on some collisions
    if (ballLeft < 0) {
        ballSpeedX *= -1;
    }

    if (ballRight > canvas.width) {
        ballSpeedX *= -1;
    }

    if (ballTop < 0) {
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

function drawBall() {
    colorCircle(ballX, ballY, ballRadius, '#FFFFFF');
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = INITIAL_BALL_SPEED_X;
    ballSpeedY = INITIAL_BALL_SPEED_Y;

    score = 0;
}