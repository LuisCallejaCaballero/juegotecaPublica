import { saveScoreToSupabase } from './supabaseTetris.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const nextPieceCanvas = document.getElementById('next-piece');
const nextCtx = nextPieceCanvas.getContext('2d');
const holdPieceCanvas = document.getElementById('hold-piece');
const holdCtx = holdPieceCanvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const linesElement = document.getElementById('lines');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const gameOverModal = document.getElementById('game-over-modal');
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const SHAPES = [
    { shape: [[1, 1, 1, 1]], color: '#00FFFF' },   
    { shape: [[1, 1, 1], [0, 1, 0]], color: '#800080' },  
    { shape: [[1, 1, 1], [1, 0, 0]], color: '#FF7F00' },  
    { shape: [[1, 1, 1], [0, 0, 1]], color: '#0000FF' },  
    { shape: [[1, 1], [1, 1]], color: '#FFFF00' },        
    { shape: [[0, 1, 1], [1, 1, 0]], color: '#00FF00' },  
    { shape: [[1, 1, 0], [0, 1, 1]], color: '#FF0000' }   
];

let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
let currentPiece = null;
let nextPiece = null;
let holdPiece = null;
let canHold = true;
let score = 0;
let finalScore;
let level = 1;
let lines = 0;
let gameOver = false;
let isPaused = false;
let dropInterval = 1000;
let gameInterval = null;

function initSizes() {
    const maxWidth = Math.min(window.innerWidth * 0.8, 300);
    const maxHeight = Math.min(window.innerHeight * 0.7, 600);

    if (maxHeight / 2 > maxWidth) {
        canvas.width = maxWidth;
        canvas.height = maxWidth * 2;
    } else {
        canvas.height = maxHeight;
        canvas.width = maxHeight / 2;
    }

    const smallCanvasSize = Math.min(100, window.innerWidth * 0.15);
    nextPieceCanvas.width = smallCanvasSize;
    nextPieceCanvas.height = smallCanvasSize;
    holdPieceCanvas.width = smallCanvasSize;
    holdPieceCanvas.height = smallCanvasSize;

    const dynamicBlockSize = canvas.width / COLS;

    ctx.scale(1, 1);
    nextCtx.scale(1, 1);
    holdCtx.scale(1, 1);
}

function init() {
    initSizes();
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    score = 0;
    level = 1;
    lines = 0;
    gameOver = false;
    isPaused = false;
    updateScore();
    generateNextPiece();
    generatePiece();
    draw();
    startGame();
}

function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    dropInterval = Math.max(100, 1000 - (level - 1) * 100);
    gameInterval = setInterval(() => {
        if (!isPaused && !gameOver) {
            moveDown();
        }
    }, dropInterval);
}

function generatePiece() {
    if (nextPiece) {
        currentPiece = {
            shape: nextPiece.shape,
            color: nextPiece.color,
            x: Math.floor(COLS / 2) - Math.floor(nextPiece.shape[0].length / 2),
            y: 0
        };
    }
    generateNextPiece();
    canHold = true;

    if (checkCollision()) {
        gameOver = true;
        clearInterval(gameInterval);
        finalScoreElement.textContent = score;
        finalScore = score;
        gameOverModal.classList.remove('hidden');
    
        // Guardar puntuación en Supabase
        const username = prompt("Introduce tu nombre para guardar tu puntuación:");
        saveScoreToSupabase(username);
    }
    
}

function generateNextPiece() {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    nextPiece = {
        shape: SHAPES[randomIndex].shape,
        color: SHAPES[randomIndex].color
    };
    drawNextPiece();
}

function holdCurrentPiece() {
    if (!canHold || isPaused || gameOver) return;

    if (!holdPiece) {
        holdPiece = {
            shape: currentPiece.shape,
            color: currentPiece.color
        };
        generatePiece();
    } else {
        const tempShape = currentPiece.shape;
        const tempColor = currentPiece.color;
        
        currentPiece.shape = holdPiece.shape;
        currentPiece.color = holdPiece.color;
        currentPiece.x = Math.floor(COLS / 2) - Math.floor(currentPiece.shape[0].length / 2);
        currentPiece.y = 0;
        
        holdPiece.shape = tempShape;
        holdPiece.color = tempColor;
    }
    canHold = false;
    drawHoldPiece();
    draw();
}

function draw() {

    const blockSize = canvas.width / COLS;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                ctx.fillStyle = value;
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                ctx.strokeStyle = '#000';
                ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
        });
    });

    if (currentPiece) {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    ctx.fillStyle = currentPiece.color;
                    ctx.fillRect(
                        (currentPiece.x + x) * blockSize,
                        (currentPiece.y + y) * blockSize,
                        blockSize, blockSize
                    );
                    ctx.strokeStyle = '#000';
                    ctx.strokeRect(
                        (currentPiece.x + x) * blockSize,
                        (currentPiece.y + y) * blockSize,
                        blockSize, blockSize
                    );
                }
            });
        });
    }
}

function drawNextPiece() {
    const blockSize = nextPieceCanvas.width / 4;
    nextCtx.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);
    
    if (nextPiece) {
        const offsetX = (nextPieceCanvas.width / 2) - (nextPiece.shape[0].length * blockSize / 2);
        const offsetY = (nextPieceCanvas.height / 2) - (nextPiece.shape.length * blockSize / 2);

        nextPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    nextCtx.fillStyle = nextPiece.color;
                    nextCtx.fillRect(x * blockSize + offsetX, y * blockSize + offsetY, blockSize, blockSize);
                    nextCtx.strokeStyle = '#000';
                    nextCtx.strokeRect(x * blockSize + offsetX, y * blockSize + offsetY, blockSize, blockSize);
                }
            });
        });
    }
}

function drawHoldPiece() {
    const blockSize = holdPieceCanvas.width / 4;
    holdCtx.clearRect(0, 0, holdPieceCanvas.width, holdPieceCanvas.height);
    
    if (holdPiece) {
        const offsetX = (holdPieceCanvas.width / 2) - (holdPiece.shape[0].length * blockSize / 2);
        const offsetY = (holdPieceCanvas.height / 2) - (holdPiece.shape.length * blockSize / 2);

        holdPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    holdCtx.fillStyle = holdPiece.color;
                    holdCtx.fillRect(x * blockSize + offsetX, y * blockSize + offsetY, blockSize, blockSize);
                    holdCtx.strokeStyle = '#000';
                    holdCtx.strokeRect(x * blockSize + offsetX, y * blockSize + offsetY, blockSize, blockSize);
                }
            });
        });
    }
}

function moveDown() {
    if (!currentPiece) return;
    
    currentPiece.y++;
    if (checkCollision()) {
        currentPiece.y--;
        mergePiece();
        clearLines();
        generatePiece();
    }
    draw();
}

function moveHorizontal(direction) {
    if (!currentPiece) return;
    
    currentPiece.x += direction;
    if (checkCollision()) {
        currentPiece.x -= direction;
    }
    draw();
}

function rotatePiece() {
    if (!currentPiece) return;
    
    const originalShape = currentPiece.shape;
    const rows = currentPiece.shape.length;
    const cols = currentPiece.shape[0].length;
    const rotated = Array(cols).fill().map((_, y) =>
        Array(rows).fill().map((__, x) =>
            currentPiece.shape[rows - 1 - x][y]
        )
    );

    currentPiece.shape = rotated;
    if (checkCollision()) {
        currentPiece.shape = originalShape;
    }
    draw();
}

function hardDrop() {
    if (!currentPiece || isPaused || gameOver) return;
    
    while (!checkCollision()) {
        currentPiece.y++;
    }
    currentPiece.y--;
    mergePiece();
    clearLines();
    generatePiece();
    draw();
}

function checkCollision() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x] &&
                (currentPiece.y + y >= ROWS ||
                 currentPiece.x + x < 0 ||
                 currentPiece.x + x >= COLS ||
                 board[currentPiece.y + y][currentPiece.x + x])) {
                return true;
            }
        }
    }
    return false;
}

function mergePiece() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[currentPiece.y + y][currentPiece.x + x] = currentPiece.color;
            }
        });
    });
}

function clearLines() {
    let linesCleared = 0;
    
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++;
        }
    }

    if (linesCleared > 0) {
        const points = [0, 100, 300, 500, 800][linesCleared] * level;
        score += points;
        lines += linesCleared;
        level = Math.floor(lines / 10) + 1;
        
        updateScore();
        startGame();
    }
}

function updateScore() {
    scoreElement.textContent = score;
    levelElement.textContent = level;
    linesElement.textContent = lines;
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(gameInterval);
    } else {
        startGame();
    }
}

restartButton.addEventListener('click', () => {
    gameOverModal.classList.add('hidden');
    init();
});

window.addEventListener('resize', () => {
    initSizes();
    draw();
    drawNextPiece();
    drawHoldPiece();
});

document.addEventListener('keydown', event => {
    if (gameOver && event.key !== 'Enter') return;

    switch (event.key) {
        case 'ArrowLeft':
            moveHorizontal(-1);
            break;
        case 'ArrowRight':
            moveHorizontal(1);
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
        case ' ':
            hardDrop();
            break;
        case 'c':
        case 'C':
            holdCurrentPiece();
            break;
        case 'p':
        case 'P':
            togglePause();
            break;
        case 'Enter':
            if (gameOver) init();
            break;
    }
});


init();
export { finalScore };
