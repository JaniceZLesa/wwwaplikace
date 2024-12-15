class GameView {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    drawPlayer(player) {
        const playerImage = new Image();
        playerImage.src = "player.png";
        this.ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    }

    drawAliens(aliens) {
        const alienImage = new Image();
        alienImage.src = "alien.png";
        for (let alien of aliens) {
            this.ctx.drawImage(alienImage, alien.x, alien.y, alien.width, alien.height);
        }
    }

    drawBullets(bullets) {
        this.ctx.fillStyle = "red";
        for (let bullet of bullets) {
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
    }

    displayText(message) {
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(message, this.canvas.width / 2, this.canvas.height / 2);
    }

    updateHighScoreTable(highScores) {
        const scoreList = document.getElementById("scoreList");
        scoreList.innerHTML = "";
        highScores.forEach((score) => {
            const li = document.createElement("li");
            li.textContent = `${score.name}: ${score.score}`;
            scoreList.appendChild(li);
        });
    }
}
