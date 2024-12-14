class GameModel {
    constructor() {
        this.currentLevel = 1;
        this.player = {
            x: 135,
            y: 360,
            width: 30,
            height: 30,
            imageSrc: 'player.png',
        };
        this.bullets = [];
        this.aliens = [];
        this.baseAlienRows = 2;
        this.baseAlienCols = 4;
        this.alienSpeedX = 1; // Rychlost pohybu mimozemšťanů do stran
        this.alienDirection = 1; // 1 = doprava, -1 = doleva
        this.score = 0;
        this.highScores = this.getHighScores();
        this.createAliens();
    }

    createAliens() {
        this.aliens = [];
        const alienRows = this.baseAlienRows + (this.currentLevel - 1);
        const alienCols = this.baseAlienCols + (this.currentLevel - 1);
        for (let row = 0; row < alienRows; row++) {
            for (let col = 0; col < alienCols; col++) {
                this.aliens.push({
                    x: col * 40 + 25,
                    y: row * 30 + 20,
                    width: 25,
                    height: 25,
                    imageSrc: 'alien.png',
                    alive: true,
                });
            }
        }
    }

    updateAliens() {
        let reachedEdge = false;

        this.aliens.forEach((alien) => {
            if (alien.alive) {
                alien.x += this.alienSpeedX * this.alienDirection;

                // Kontrola dosažení okraje
                if (alien.x <= 0 || alien.x + alien.width >= 300) {
                    reachedEdge = true;
                }
            }
        });

        // Pokud mimozemšťané dosáhli okraje, posun dolů
        if (reachedEdge) {
            this.alienDirection *= -1; // Změna směru
            this.aliens.forEach((alien) => {
                if (alien.alive) {
                    alien.y += 30; // Posun dolů
                }
            });
        }
    }

    checkCollisionWithPlayer() {
        return this.aliens.some((alien) => {
            return (
                alien.alive &&
                alien.x < this.player.x + this.player.width &&
                alien.x + alien.width > this.player.x &&
                alien.y < this.player.y + this.player.height &&
                alien.y + alien.height > this.player.y
            );
        });
    }

    getHighScores() {
        return JSON.parse(localStorage.getItem('highScores')) || [];
    }

    saveHighScore(name, score) {
        const highScores = this.getHighScores();
        highScores.push({ name, score });
        highScores.sort((a, b) => b.score - a.score); // Seřadit dle skóre
        highScores.splice(10); // Omezit na top 10
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
}
