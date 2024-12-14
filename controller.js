class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.keys = { left: false, right: false, fire: false };

        this.bindEvents();
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        document.getElementById('leftButton').addEventListener('mousedown', () => (this.keys.left = true));
        document.getElementById('leftButton').addEventListener('mouseup', () => (this.keys.left = false));
        document.getElementById('rightButton').addEventListener('mousedown', () => (this.keys.right = true));
        document.getElementById('rightButton').addEventListener('mouseup', () => (this.keys.right = false));
        document.getElementById('fireButton').addEventListener('mousedown', () => (this.keys.fire = true));
        document.getElementById('fireButton').addEventListener('mouseup', () => (this.keys.fire = false));
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
        const { player, bullets, aliens } = this.model;

        if (this.keys.left) player.x -= 5;
        if (this.keys.right) player.x += 5;
        if (player.x < 0) player.x = 0;
        if (player.x > this.view.width - player.width) player.x = this.view.width - player.width;

        if (this.keys.fire) {
            bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y - 10, width: 5, height: 10, color: 'red' });
            this.keys.fire = false;
        }

        bullets.forEach((bullet, index) => {
            bullet.y -= 5;
            if (bullet.y + bullet.height < 0) bullets.splice(index, 1);
        });

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
                    this.model.setHighScore(this.model.score);
                }
            });
        });
    }

    draw() {
        const { player, bullets, aliens, score, highScore } = this.model;

        this.view.clear();
        this.view.drawPlayer(player);
        this.view.drawBullets(bullets);
        this.view.drawAliens(aliens);
        this.view.displayScore(score, highScore);
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.gameLoop);
    }
}

const model = new GameModel();
const view = new GameView('gameCanvas');
new GameController(model, view);
