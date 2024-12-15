class GameModel {
    constructor() {
        this.player = { x: 250, y: 550, width: 50, height: 50, lives: 3 };
        this.bullets = [];
        this.aliens = [];
        this.level = 1;
        this.score = 0;
        this.gameOver = false;
        this.gameWon = false;
    }

    createAliens() {
        const rows = 2 + this.level - 1;
        const cols = 4 + this.level - 1;
        this.aliens = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.aliens.push({
                    x: 50 + col * 50,
                    y: 50 + row * 50,
                    width: 40,
                    height: 40,
                    dx: 1,
                    dy: 0
                });
            }
        }
    }

    updateAliens() {
        let moveDown = false;
        for (let alien of this.aliens) {
            alien.x += alien.dx;
            if (alien.x <= 0 || alien.x + alien.width >= 500) {
                moveDown = true;
            }
        }

        if (moveDown) {
            for (let alien of this.aliens) {
                alien.dx *= -1;
                alien.y += 20;
            }
        }
    }

    checkCollisionWithPlayer() {
        for (let alien of this.aliens) {
            if (
                alien.y + alien.height >= this.player.y &&
                alien.x < this.player.x + this.player.width &&
                alien.x + alien.width > this.player.x
            ) {
                this.gameOver = true;
            }
        }
    }

    saveHighScore(name, score) {
        let scores = JSON.parse(localStorage.getItem("highScores")) || [];
        scores.push({ name, score });
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 5);
        localStorage.setItem("highScores", JSON.stringify(scores));
    }

    getHighScores() {
        return JSON.parse(localStorage.getItem("highScores")) || [];
    }
}
