class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.running = false;
        this.playButton = document.getElementById("playButton");
        this.playButton.addEventListener("click", () => this.startGame());
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    }

    startGame() {
        this.running = true;
        this.model.createAliens();
        this.nextLevel();
    }

    nextLevel() {
        if (this.model.level > 5) {
            this.endGame(true);
            return;
        }

        this.view.displayText(`Úroveň ${this.model.level}`);
        setTimeout(() => {
            this.view.displayText("");
            this.gameLoop();
        }, 3000);
    }

    endGame(won) {
        this.running = false;
        const message = won ? "Zachránil jsi planetu!" : "Konec hry!";
        this.view.displayText(message);
        if (!won) {
            const playerName = prompt("Zadejte své jméno:");
            this.model.saveHighScore(playerName, this.model.score);
            this.view.updateHighScoreTable(this.model.getHighScores());
        }
    }

    gameLoop() {
        if (!this.running) return;

        // Game logic here (moving aliens, bullets, collisions, etc.)

        if (this.model.aliens.length === 0) {
            this.model.level++;
            this.model.createAliens();
            this.nextLevel();
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    handleKeyDown(e) {
        if (e.key === "ArrowLeft") {
            this.model.player.x -= 10;
        } else if (e.key === "ArrowRight") {
            this.model.player.x += 10;
        } else if (e.key === " ") {
            // Fire bullet logic
        }
    }
}