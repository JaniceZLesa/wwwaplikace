import { GameModel } from './model.js';
import { GameView } from './view.js';

window.onload = () => {
    const tileSize = 32;
    const rows = 16;
    const columns = 16;

    const board = document.getElementById("board");
    const context = board.getContext("2d");

    const model = new GameModel(tileSize, rows, columns);
    const view = new GameView(context, board, "./ship.png", "./alien.png");

    board.width = model.boardWidth;
    board.height = model.boardHeight;

    model.createAliens(view.alienImg);

    document.addEventListener("keydown", (e) => moveShip(e, model));
    document.addEventListener("keyup", (e) => shoot(e, model));

    function update() {
        if (model.gameOver) return;

        view.clearBoard();
        view.drawShip(model.ship);
        view.drawAliens(model.aliens);
        view.drawBullets(model.bullets);
        view.drawScore(model.score);

        updateAliens(model);
        updateBullets(model);

        if (model.alienCount === 0) nextLevel(model);
        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
};

function moveShip(e, model) {
    if (model.gameOver) return;
    const { ship, tileSize, boardWidth } = model;

    if (e.code === "ArrowLeft" && ship.x - ship.velocityX >= 0) {
        ship.x -= ship.velocityX;
    } else if (e.code === "ArrowRight" && ship.x + ship.velocityX + ship.width <= boardWidth) {
        ship.x += ship.velocityX;
    }
}

function shoot(e, model) {
    if (model.gameOver || e.code !== "Space") return;

    const { ship, bullets, tileSize } = model;
    bullets.push({
        x: ship.x + (ship.width * 15) / 32,
        y: ship.y,
        width: tileSize / 8,
        height: tileSize / 2,
        used: false
    });
}

function updateAliens(model) {
    const { aliens, alien, boardWidth, ship } = model;

    aliens.forEach((alienObj) => {
        if (alienObj.alive) {
            alienObj.x += alien.velocityX;

            if (alienObj.x + alienObj.width >= boardWidth || alienObj.x <= 0) {
                alien.velocityX *= -1;
                aliens.forEach((a) => (a.y += alien.height));
            }

            if (alienObj.y >= ship.y) model.gameOver = true;
        }
    });
}

function updateBullets(model) {
    const { bullets, aliens, bulletVelocityY } = model;

    bullets.forEach((bullet) => {
        bullet.y += bulletVelocityY;

        aliens.forEach((alien) => {
            if (!bullet.used && alien.alive && model.detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                model.alienCount--;
                model.score += 100;
            }
        });
    });

    model.bullets = bullets.filter((bullet) => !bullet.used && bullet.y > 0);
}

function nextLevel(model) {
    model.score += model.alienColumns * model.alienRows * 100;
    model.alienColumns = Math.min(model.alienColumns + 1, model.columns / 2 - 2);
    model.alienRows = Math.min(model.alienRows + 1, model.rows - 4);

    model.alien.velocityX += model.alien.velocityX > 0 ? 0.2 : -0.2;
    model.createAliens(model.alien.img);
}
