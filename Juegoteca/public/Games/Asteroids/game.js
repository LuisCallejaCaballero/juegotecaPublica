// Configuración del juego
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Variables del juego
let particles = [];
let bullets = [];
let asteroids = [];
let score = 0;
let gameOver = false;
let asteroidSpawnInterval = 2000;
let lastAsteroidSpawn = 0;

// Jugador
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 0,
    maxSpeed: 5,
    acceleration: 0.1,
    turningSpeed: 0.05,
    lives: 3,
    alive: true,
    blink: 0,
    invulnerable: 0,
    canShoot: true,
    update: function() {
        if (keys.up) this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        if (keys.down) this.speed = Math.max(this.speed - this.acceleration, 0);
        if (keys.left) this.angle -= this.turningSpeed;
        if (keys.right) this.angle += this.turningSpeed;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Reaparecer en bordes
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
};

// Controles
let keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    shoot: false
};

// Dibujar icono de vida (triángulo como la nave)
function drawLifeIcon(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-Math.PI/2); // Rotamos para que apunte hacia arriba
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size/2, -size/1.5);
    ctx.lineTo(-size/2, size/1.5);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
}

// Actualizar visualización de vidas
function updateLivesDisplay() {
    livesElement.innerHTML = '';
    for (let i = 0; i < player.lives; i++) {
        const lifeIcon = document.createElement('canvas');
        lifeIcon.width = 30;
        lifeIcon.height = 30;
        const lifeCtx = lifeIcon.getContext('2d');
        
        // Dibujar el icono de vida en el canvas pequeño
        lifeCtx.save();
        lifeCtx.translate(15, 15);
        lifeCtx.rotate(-Math.PI/2);
        
        lifeCtx.fillStyle = 'white';
        lifeCtx.beginPath();
        lifeCtx.moveTo(10, 0);
        lifeCtx.lineTo(-5, -8);
        lifeCtx.lineTo(-5, 8);
        lifeCtx.closePath();
        lifeCtx.fill();
        
        lifeCtx.restore();
        
        livesElement.appendChild(lifeIcon);
    }
}

// Inicializar el juego
function initGame() {
    player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: 0,
        speed: 0,
        maxSpeed: 5,
        acceleration: 0.1,
        turningSpeed: 0.05,
        lives: 3,
        alive: true,
        blink: 0,
        invulnerable: 0,
        canShoot: true,
        update: function() {
            if (keys.up) this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
            if (keys.down) this.speed = Math.max(this.speed - this.acceleration, 0);
            if (keys.left) this.angle -= this.turningSpeed;
            if (keys.right) this.angle += this.turningSpeed;

            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
    };
    
    particles = [];
    bullets = [];
    asteroids = [];
    score = 0;
    gameOver = false;
    lastAsteroidSpawn = 0;
    
    updateUI();
    gameOverElement.style.display = 'none';
    startScreen.style.display = 'none';
    
    gameLoop();
}

// Eventos de teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = true;
    if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') keys.up = true;
    if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') keys.down = true;
    if (e.key === ' ' && player.canShoot) {
        keys.shoot = true;
        player.canShoot = false;
    }
    if (gameOver && e.key.toLowerCase() === 'r') resetGame();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = false;
    if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') keys.up = false;
    if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') keys.down = false;
    if (e.key === ' ') player.canShoot = true;
});

// Botones de la interfaz
startButton.addEventListener('click', initGame);
restartButton.addEventListener('click', resetGame);

// Función de colisión
function checkCollision(obj1, obj2, radius) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    return Math.sqrt(dx * dx + dy * dy) < radius;
}

// Crear explosión
function createExplosion(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            size: Math.random() * 5 + 2,
            color: color,
            speed: Math.random() * 3 + 1,
            angle: Math.random() * Math.PI * 2,
            life: 30 + Math.random() * 20,
            decay: 0.9 + Math.random() * 0.1
        });
    }
}

// Crear partículas del motor
function createEngineParticles() {
    if (keys.up && player.alive) {
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: player.x - 15 * Math.cos(player.angle),
                y: player.y - 15 * Math.sin(player.angle),
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 30 + 20}, 100%, 50%)`,
                speed: Math.random() * 2 + player.speed * 0.5,
                angle: player.angle + (Math.random() * 0.6 - 0.3),
                life: 15 + Math.random() * 10,
                decay: 0.85 + Math.random() * 0.1
            });
        }
    }
}

// Disparar
function shootBullet() {
    bullets.push({
        x: player.x + 20 * Math.cos(player.angle),
        y: player.y + 20 * Math.sin(player.angle),
        angle: player.angle,
        speed: 7
    });
    
    // Efecto de retroceso
    for (let i = 0; i < 5; i++) {
        particles.push({
            x: player.x + 15 * Math.cos(player.angle + Math.PI),
            y: player.y + 15 * Math.sin(player.angle + Math.PI),
            size: Math.random() * 2 + 1,
            color: 'rgba(255, 200, 50, 0.8)',
            speed: Math.random() * 1 + 0.5,
            angle: player.angle + Math.PI + (Math.random() * 0.4 - 0.2),
            life: 10 + Math.random() * 10,
            decay: 0.9
        });
    }
}

// Crear asteroides
function spawnAsteroid() {
    const now = Date.now();
    if (now - lastAsteroidSpawn < asteroidSpawnInterval) return;
    
    lastAsteroidSpawn = now;
    
    let x, y;
    if (Math.random() > 0.5) {
        x = Math.random() * canvas.width;
        y = Math.random() > 0.5 ? 0 : canvas.height;
    } else {
        x = Math.random() > 0.5 ? 0 : canvas.width;
        y = Math.random() * canvas.height;
    }

    const angle = Math.random() * Math.PI * 2;
    asteroids.push({
        x,
        y,
        angle,
        speed: 2 + Math.random() * 3,
        size: 30 + Math.random() * 20,
        rotation: Math.random() * Math.PI * 2
    });
}

// Actualizar UI
function updateUI() {
    scoreElement.textContent = score;
    updateLivesDisplay();
}

// Actualizar partículas
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
        p.size *= p.decay;
        
        if (p.life <= 0 || p.size < 0.1) {
            particles.splice(i, 1);
        } else {
            ctx.globalAlpha = p.life / 30;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
}

// Dibujar nave
function drawSpaceship() {
    if (player.blink > 0) {
        player.blink--;
        if (Math.floor(player.blink / 3) % 2 === 0) return;
    }
    
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);
    
    // Cuerpo de la nave
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-10, -8);
    ctx.lineTo(-10, 8);
    ctx.closePath();
    ctx.fill();
    
    // Motor cuando se acelera
    if (keys.up && player.alive) {
        ctx.fillStyle = `hsl(${Math.random() * 30 + 20}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(-10, -5);
        ctx.lineTo(-15 - Math.random() * 5, 0);
        ctx.lineTo(-10, 5);
        ctx.closePath();
        ctx.fill();
    }
    
    ctx.restore();
}

// Dibujar asteroides
function drawAsteroids() {
    asteroids.forEach((asteroid, index) => {
        asteroid.x += Math.cos(asteroid.angle) * asteroid.speed;
        asteroid.y += Math.sin(asteroid.angle) * asteroid.speed;
        asteroid.rotation += 0.01;
        
        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.rotation);
        
        // Dibujar asteroide
        ctx.fillStyle = '#aaa';
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = asteroid.size * (0.8 + Math.random() * 0.2);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#888';
        ctx.stroke();
        
        ctx.restore();

        // Reaparecer en bordes
        if (asteroid.x < 0) asteroid.x = canvas.width;
        if (asteroid.x > canvas.width) asteroid.x = 0;
        if (asteroid.y < 0) asteroid.y = canvas.height;
        if (asteroid.y > canvas.height) asteroid.y = 0;
    });
}

// Dibujar balas
function drawBullets() {
    bullets.forEach((bullet, index) => {
        bullet.x += Math.cos(bullet.angle) * bullet.speed;
        bullet.y += Math.sin(bullet.angle) * bullet.speed;

        // Efecto de estela
        ctx.fillStyle = 'rgba(255, 50, 50, 0.3)';
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Bala
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Eliminar balas fuera de pantalla
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });
}

// Detección de colisiones
function checkCollisions() {
    // Colisiones bala-asteroide
    asteroids.forEach((asteroid, aIndex) => {
        bullets.forEach((bullet, bIndex) => {
            if (checkCollision(bullet, asteroid, asteroid.size)) {
                createExplosion(asteroid.x, asteroid.y, 'orange', 15);
                asteroids.splice(aIndex, 1);
                bullets.splice(bIndex, 1);
                score += 100;
                updateUI();
            }
        });

        // Colisión nave-asteroide
        if (player.alive && player.invulnerable <= 0 && 
            checkCollision(player, asteroid, asteroid.size)) {
            createExplosion(player.x, player.y, 'white', 20);
            asteroids.splice(aIndex, 1);
            player.lives--;
            player.blink = 30;
            player.invulnerable = 60;
            
            if (player.lives <= 0) {
                player.alive = false;
                gameOver = true;
                createExplosion(player.x, player.y, 'red', 50);
                showGameOver();
            }
            updateUI();
        }
    });
}

// Mostrar pantalla de Game Over
function showGameOver() {
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
}

// Reiniciar juego
function resetGame() {
    initGame();
}

// Dibujar fondo estrellado
function drawStarfield() {
    ctx.fillStyle = 'white';
    for (let i = 0; i < 100; i++) {
        if (Math.random() > 0.99) {
            const size = Math.random() * 2 + 0.5;
            ctx.globalAlpha = Math.random();
            ctx.fillRect(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                size, size
            );
        }
    }
    ctx.globalAlpha = 1;
}

// Bucle principal del juego
function gameLoop() {
    if (gameOver) return;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar fondo
    drawStarfield();
    
    // Actualizar jugador
    if (player.alive) {
        player.update();
        
        // Disparar
        if (keys.shoot) {
            shootBullet();
            keys.shoot = false;
        }

        // Partículas del motor
        createEngineParticles();
    }

    // Dibujar nave
    if (player.alive) {
        drawSpaceship();
    }

    // Generar asteroides
    spawnAsteroid();

    // Dibujar y actualizar elementos
    drawAsteroids();
    drawBullets();
    updateParticles();
    
    // Comprobar colisiones
    checkCollisions();

    // Tiempo de invulnerabilidad
    if (player.invulnerable > 0) {
        player.invulnerable--;
    }

    requestAnimationFrame(gameLoop);
}

// Iniciar pantalla de inicio
startScreen.style.display = 'flex';