# Responsive Space Invaders

## Overview
Responsivní Space Invaders is a browser-based game inspired by the classic arcade game. The game is written in JavaScript using object-oriented programming (OOP) principles and consists of three main components: **Model**, **View**, and **Controller**. The game includes dynamic gameplay with increasing difficulty levels, responsive design for different screen sizes, and high-score functionality using local storage.

---

## Features

1. **Responsive Design**:
   - The game canvas automatically adjusts to fit various screen sizes using CSS and JavaScript.

2. **Player Controls**:
   - Move the spaceship (player) using the left and right arrow keys.
   - Shoot bullets with the spacebar.

3. **Dynamic Levels**:
   - The game consists of 5 levels, each with an increasing number of alien rows and columns.
   - Aliens move horizontally and descend toward the player when they reach the screen's edges.

4. **Game Over Logic**:
   - The game ends if any alien collides with the player or reaches the bottom of the canvas.

5. **High Score Table**:
   - Players can enter their name after losing the game.
   - High scores are saved in the browser's `localStorage` and displayed in a ranked table.

---

## Project Structure

The project follows the **Model-View-Controller (MVC)** design pattern to separate concerns and improve maintainability:

### 1. **HTML**

The `index.html` file provides the basic structure of the game:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Space Invaders</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <script src="model.js"></script>
    <script src="view.js"></script>
    <script src="controller.js"></script>
</body>
</html>
```

### 2. **CSS (styles.css)**

The `styles.css` file ensures the canvas is properly styled and responsive:
```css
body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: black;
    color: white;
}

canvas {
    border: 2px solid white;
    display: block;
    background-color: #000;
    max-width: 100%;
    height: auto;
}
```

### 3. **JavaScript**

#### a) **Model (model.js)**
- Represents the game state, including player position, alien positions, bullets, and levels.
- Manages game logic such as alien movement, collision detection, and level progression.

Key methods and attributes:
- `createAliens()` - Dynamically generates aliens based on the current level.
- `updateAliens()` - Moves aliens horizontally and descends them if they hit the screen edge.
- `checkCollisionWithPlayer()` - Checks if any alien collides with the player.
- `saveHighScore(name, score)` - Saves player scores to local storage.

#### b) **View (view.js)**
- Handles rendering of game elements on the canvas, including:
  - Drawing the player, bullets, and aliens.
  - Displaying scores and high scores.

Key methods:
- `drawPlayer(player)` - Draws the player's spaceship.
- `drawAliens(aliens)` - Draws the alien invaders.
- `displayScore(score, highScore)` - Updates the score and high score display.

#### c) **Controller (controller.js)**
- Handles user input (keyboard controls) and orchestrates updates between the model and view.

Key methods:
- `handleKeyDown(e)` / `handleKeyUp(e)` - Detects arrow keys and spacebar for player movement and shooting.
- `update()` - Updates game logic, including player movement, bullets, and alien collisions.
- `endGame()` - Ends the game, prompts for the player name, and saves the score.

---

## How to Play

1. Open the `index.html` file in a modern web browser.
2. Use the following controls:
   - **Arrow Left/Right**: Move the spaceship left or right.
   - **Spacebar**: Shoot bullets at the alien invaders.
3. Progress through levels by destroying all aliens.
4. Avoid collisions with aliens or letting them reach the bottom.
5. When the game ends, enter your name to save your score.

---

## High Score Table

- High scores are saved in the browser's local storage.
- Up to 10 high scores are displayed in descending order.

---

## Dependencies

- No external libraries are used. The game relies on native HTML5 Canvas and JavaScript.

---

## Future Improvements

1. Add sound effects for shooting and collisions.
2. Include power-ups or special abilities for the player.
3. Create additional levels with unique enemy behaviors.
4. Implement a restart button after game over.

---

Enjoy the game!

