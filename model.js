export class GameModel {
    constructor(tileSize, rows, columns) {
        this.tileSize = tileSize;
        this.rows = rows;
        this.columns = columns;

        this.boardWidth = tileSize * columns;
        this.boardHeight = tileSize * rows;

        this.ship = {
            x: tileSize * columns / 2 - tileSize,
            y: tileSize * rows - tileSize * 2,
            width: tileSize * 2,
            height: tileSize,
            velocityX: tileSize
        };

        this.aliens = [];
        this.alien = {
            width: tileSize * 2,
            height: tileSize,
            velocityX: 1
        };
        this.alienRows = 2;
        this.alienColumns = 3;
        this.alienCount = 0;

        this.bullets = [];
        this.bulletVelocityY = -10;

        this.score = 0;
        this.highScores = this.loadHighScores();
        this.gameOver = false;
    }

    createAliens(alienImg) {
        this.aliens = [];
        for (let c = 0; c < this.alienColumns; c++) {
            for (let r = 0; r < this.alienRows; r++) {
                this.aliens.push({
                    img: alienImg,
                    x: this.tileSize + c * this.alien.width,
                    y: this.tileSize + r * this.alien.height,
                    width: this.alien.width,
                    height: this.alien.height,
                    alive: true
                });
            }
        }
        this.alienCount = this.aliens.length;
    }

    detectCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    saveHighScore(name, score) {
        const newEntry = { name, score };
        this.highScores.push(newEntry);
        this.highScores.sort((a, b) => b.score - a.score);
        if (this.highScores.length > 5) {
            this.highScores.pop();
        }
        localStorage.setItem("highScores", JSON.stringify(this.highScores));
    }

    loadHighScores() {
        const savedScores = localStorage.getItem("highScores");
        return savedScores ? JSON.parse(savedScores) : [];
    }

    getHighScores() {
        return this.highScores;
    }
}