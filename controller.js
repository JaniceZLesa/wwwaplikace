class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.keys = { left: false, right: false, fire: false };
        this.gameOver = false;

        this.bindEvents();
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowLeft') this.keys.left = true;
        if (e.key === 'ArrowRight') this.keys.right = true;
        if (e.key === ' ') this.keys.fire = true;
    }

    handleKeyUp(e) {
        if (e.key === 'ArrowLeft') this.keys.left = false;
        if (e.key === 'ArrowRight') this.keys.right = false;
        if (e.key === ' ') this.keys.fire = false;
    }

    update() {
        if (this.gameOver) return;

        const { player, bullets, aliens } = this.model;

        // Pohyb hráče
        if (this.keys.left) player.x -= 4;
        if (this.keys.right) player.x += 4;
        if (player.x < 0) player.x = 0;
        if (player.x > this.view.width - player.width) player.x = this.view.width - player.width;

        // Střelba
        if (this.keys.fire) {
            bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y - 10, width: 5, height: 10, color: 'red' });
            this.keys.fire = false;
        }

        // Pohyb střel
        bullets.forEach((bullet, index) => {
            bullet.y -= 5;
            if (bullet.y + bullet.height < 0) bullets.splice(index, 1);
        });

        // Pohyb mimozemšťanů
        this.model.updateAliens();

        // Kolize střel a mimozemšťanů
        bullets.forEach((bullet, bIndex) => {
            aliens.forEach((alien, aIndex) => {
                if (
                    alien.alive &&
                    bullet.x < alien.x + alien.width &&
                    bullet.x + bullet.width > alien.x &&
                    bullet.y < alien.y + alien.height &&
                    bullet.y + bullet.height > alien.y
                ) {
                    alien.alive = false;
                    bullets.splice(bIndex, 1);
                    this.model.score += 10;
                }
            });
        });

        // Kontrola, zda mimozemšťané dosáhli hráče
        if (this.model.checkCollisionWithPlayer()) {
            this.endGame();
        }
    }

    draw() {
        const { player, bullets, aliens, score, highScores } = this.model;

        this.view.clear();
        this.view.drawPlayer(player);
        this.view.drawBullets(bullets);
        this.view.drawAliens(aliens);
        this.view.displayScore(score, highScores);
    }

    endGame() {
        this.gameOver = true;
        const name = prompt("KONEC HRY! Nové nejvyšší skóre. Napiš své jméno:");
        if (name) {
            this.model.saveHighScore(name, this.model.score);
        }
        alert("KONEC HRY! Obnov stránku a začni znovu.");
    }

    gameLoop() {
        this.update();
        this.draw();
        if (!this.gameOver) {
            requestAnimationFrame(this.gameLoop);
        }
    }
}

const model = new GameModel();
const view = new GameView('gameCanvas');
new GameController(model, view);
