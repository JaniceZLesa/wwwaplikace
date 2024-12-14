const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const width = 300;
const height = 400;
canvas.width = width;
canvas.height = height;

// Game variables
const player = {
    x: width / 2 - 15,
    y: height - 40,
    width: 30,
    height: 10,
    color: 'white',
};

const bullets = [];
const aliens = [];
const alienRowCount = 3;
const alienColCount = 5;

const keys = {
    left: false,
    right: false,
    fire: false,
};

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === ' ') keys.fire = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === ' ') keys.fire = false;
});

document.getElementById('leftButton').addEventListener('mousedown', () => (keys.left = true));
document.getElementById('leftButton').addEventListener('mouseup', () => (keys.left = false));
document.getElementById('rightButton').addEventListener('mousedown', () => (keys.right = true));
document.getElementById('rightButton').addEventListener('mouseup', () => (keys.right = false));
document.getElementById('fireButton').addEventListener('mousedown', () => (keys.fire = true));
document.getElementById('fireButton').addEventListener('mouseup', () => (keys.fire = false));

// Create aliens
for (let row = 0; row < alienRowCount; row++) {
    for (let col = 0; col < alienColCount; col++) {
        aliens.push({
            x: col * 50 + 25,
            y: row * 30 + 20,
            width: 30,
            height: 20,
            color: 'green',
            alive: true,
        });
    }
}

// Game functions
function update() {
    // Player movement
    if (keys.left) player.x -= 5;
    if (keys.right) player.x += 5;
    if (player.x < 0) player.x = 0;
    if (player.x > width - player.width) player.x = width - player.width;

    // Fire bullets
    if (keys.fire) {
        bullets.push({
            x: player.x + player.width / 2 - 2.5,
            y: player.y - 10,
            width: 5,
            height: 10,
            color: 'red',
        });
        keys.fire = false;
    }

    // Update bullets
    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        if (bullet.y + bullet.height < 0) bullets.splice(index, 1);
    });

    // Check collisions
    bullets.forEach((bullet, bIndex) => {
        aliens.forEach((alien, aIndex) => {
            if (
                alien.alive &&
                bullet.x < alien.x + alien.width &&
                bullet.x + bullet.width > alien.x &&
                bullet.y < alien.y + alien.height &&
                bullet.y + bullet.height > alien.y
            ) {
                aliens[aIndex].alive = false;
                bullets.splice(bIndex, 1);
            }
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    bullets.forEach((bullet) => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw aliens
    aliens.forEach((alien) => {
        if (alien.alive) {
            ctx.fillStyle = alien.color;
            ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
        }
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
