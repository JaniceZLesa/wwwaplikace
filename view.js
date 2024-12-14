class GameView {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = 300;
        this.height = 400;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawImage(entity) {
        const img = new Image();
        img.src = entity.imageSrc;
        this.ctx.drawImage(img, entity.x, entity.y, entity.width, entity.height);
    }

    drawPlayer(player) {
        this.drawImage(player);
    }

    drawBullets(bullets) {
        bullets.forEach((bullet) => {
            this.ctx.fillStyle = bullet.color;
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    drawAliens(aliens) {
        aliens.forEach((alien) => {
            if (alien.alive) {
                this.drawImage(alien);
            }
        });
    }

    displayScore(score, highScore) {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '10px Arial';
        this.ctx.fillText(`Score: ${score}`, 10, 20);
        this.ctx.fillText(`High Score: ${highScore}`, 10, 40);
    }
}
