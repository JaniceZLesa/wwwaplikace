export class GameView {
    constructor(context, board, shipImgSrc, alienImgSrc) {
        this.context = context;
        this.board = board;

        this.shipImg = new Image();
        this.shipImg.src = shipImgSrc;

        this.alienImg = new Image();
        this.alienImg.src = alienImgSrc;
    }

    drawShip(ship) {
        this.context.drawImage(this.shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    drawAliens(aliens) {
        aliens.forEach((alien) => {
            if (alien.alive) {
                this.context.drawImage(this.alienImg, alien.x, alien.y, alien.width, alien.height);
            }
        });
    }

    drawBullets(bullets) {
        this.context.fillStyle = "white";
        bullets.forEach((bullet) => {
            this.context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    clearBoard() {
        this.context.clearRect(0, 0, this.board.width, this.board.height);
    }

    drawScore(score) {
        this.context.fillStyle = "white";
        this.context.font = "16px courier";
        this.context.fillText(score, 5, 20);
    }
}
