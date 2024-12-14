class GameModel {
    constructor() {
        this.player = { x: 135, y: 360, width: 30, height: 10, color: 'white' };
        this.bullets = [];
        this.aliens = [];
        this.alienRowCount = 3;
        this.alienColCount = 5;
        this.score = 0;
        this.highScore = this.getHighScore();
        this.createAliens();
    }

    createAliens() {
        for (let row = 0; row < this.alienRowCount; row++) {
            for (let col = 0; col < this.alienColCount; col++) {
                this.aliens.push({
                    x: col * 50 + 25,
                    y: row * 30 + 20,
                    width: 30,
                    height: 20,
                    color: 'green',
                    alive: true,
                });
            }
        }
    }

    getHighScore() {
        return parseInt(localStorage.getItem('highScore')) || 0;
    }

    setHighScore(score) {
        if (score > this.highScore) {
            this.highScore = score;
            localStorage.setItem('highScore', score);
        }
    }
}
