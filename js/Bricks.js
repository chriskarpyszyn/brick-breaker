const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;

var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

var brickCounter = 0;

function drawBricks() {
    for (var i = 0; i < BRICK_COLS; i++) {
        for (var j = 0; j < BRICK_ROWS; j++) {

            if (isBrickAtTileCoord(i, j)) {
                colorRect((i * BRICK_WIDTH), (j * BRICK_HEIGHT), BRICK_WIDTH - BRICK_GAP,
                BRICK_HEIGHT - BRICK_GAP, '#A1DAED');
                //drawBitmapCenteredAtLocationWithRotation(brickPic,
                //i*BRICK_WIDTH, j*BRICK_HEIGHT, 0);
            }
        }
    }
}

function resetBricks() {
    for (let i = 0; i < brickGrid.length; i++) {
        //brickGrid[i] = 1;
        if (i < BRICK_COLS * 3) {
            brickGrid[i] = 0;
        }
        else if (Math.random() < 0.5) {
            brickGrid[i] = 1;
            brickCounter++;
        } else {
            brickGrid[i] = 0;
        }
    }
}

function brickTileToIndex(tileCol, tileRow) {
    return tileCol + tileRow * BRICK_COLS;
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
    var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
    return (brickGrid[brickIndex] === 1);
}

function breakAndBounceOffBrickAtPixelCoord(pixelX, pixelY) {
    var tileCol = Math.floor(pixelX / BRICK_WIDTH);
    var tileRow = Math.floor(pixelY / BRICK_HEIGHT);

    if (tileCol < 0 || tileCol >= BRICK_COLS || tileRow < 0 || tileRow >= BRICK_ROWS) {
        return;
    }

    var brickIndex = brickTileToIndex(tileCol, tileRow);

    if (brickGrid[brickIndex] === 1) {
        var prevBallX = pixelX - ballSpeedX;
        var prevBallY = pixelY - ballSpeedY;
        var prevTileCol = Math.floor(prevBallX / BRICK_WIDTH);
        var prevTileRow = Math.floor(prevBallY / BRICK_HEIGHT);

        var bothTestFailed = true;

        ///todo: getting weird bounces where both tileCol!=prevtilecol and tileRow!=prevtilerow
        var adjacentBrickIndex;
        if (tileCol !== prevTileCol) {
            adjacentBrickIndex = brickTileToIndex(prevTileCol, tileRow);
            if (brickIndex[adjacentBrickIndex] !== 1) {
                ballSpeedX *= -1;
                bothTestFailed = false;
            }
        }
        if (tileRow !== prevTileRow) {
            adjacentBrickIndex = brickTileToIndex(tileCol, prevTileRow);
            if (brickIndex[adjacentBrickIndex] !== 1) {
                ballSpeedY *= -1;
                bothTestFailed = false;
            }
        }

        if (bothTestFailed) {
            ballSpeedX *= -1;
            ballSpeedY *= -1;
        }

        brickGrid[brickIndex] = 0;
        brickCounter--;
        score += 100;

        if (score % SCORE_FOR_NEW_LIFE === 0) {
            ballLives++;
        }
    }
}
