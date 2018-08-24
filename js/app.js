// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.x > 510) { // takes bugs back to begginni
      this.x = 0
    } else {
      this.x = this.x + ((this.speed) * dt);
    }
    if (((player.y === 38) && (player.x - 64 < enemyFive.x) && (enemyFive.x < player.x + 64)) ||
      ((player.y === 123.5) && (player.x - 64 < enemyFour.x) && (enemyFour.x < player.x + 64)) ||
      ((player.y === 209) && (player.x - 64 < enemyThree.x) && (enemyThree.x < player.x + 64)) ||
      ((player.y === 123.5) && (player.x - 64 < enemyTwo.x) && (enemyTwo.x < player.x + 64)) ||
      ((player.y === 38) && (player.x - 64 < enemyOne.x) && (enemyOne.x < player.x + 64))) {
      // For each row the bug is on, if statements check if the bug assigned to that row is near the player. The player.y values here are the only values the player can land on for each row with the bugs on it.
       // Note collision occurs when the bug overlaps with the body of the avatar. There will be some overlap with the scarf of the avatar beforehand.
      player.x = 200;
      player.y = 380;

    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
  }

  update() {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {

    if ((key === 'left') && (this.x > -2)) {
      this.x -= 101;

    } else if ((key === 'right') && (this.x < 402)) {
      this.x += 101;

    } else if ((key === 'up') && (this.y > -27.5)) {
      this.y -= 85.5

      if (this.y === -47.5) { // creates new page  to tell the player they've won once player reaches water.
        const resultsPage = document.createElement('div');
        resultsPage.classList.add('resultsPage');
        const heading = document.createElement('h1');
        const congratulations = document.createTextNode("Congratulation! You've won!");
        const buttonText = document.createTextNode('Replay');
        const button = document.createElement("BUTTON");
        button.setAttribute("onClick", "window.location.reload();");

        button.appendChild(buttonText);
        heading.appendChild(congratulations);
        resultsPage.appendChild(heading);
        resultsPage.appendChild(button)

        const canvas = document.querySelector('canvas');
        canvas.remove();

        document.getElementsByTagName('body')[0].appendChild(resultsPage);

      }

    } else if ((key === 'down') && (this.y < 380)) {
      this.y += 85.5
      console.log(this.x, this.y)
    }

  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
speedOne = Math.floor((Math.random() * 120) + 90);
speedTwo = Math.floor((Math.random() * 130) + 90);
speedThree = Math.floor((Math.random() * 100) + 70);
const enemyOne = new Enemy(31, 58, speedOne);
const enemyTwo = new Enemy(30, 143.5, speedTwo);
const enemyThree = new Enemy(25, 229, speedThree);
const enemyFour = new Enemy(-200, 143.5, speedTwo);
const enemyFive = new Enemy(-250, 58, speedOne);

allEnemies.push(enemyOne);
allEnemies.push(enemyTwo);
allEnemies.push(enemyThree);
allEnemies.push(enemyFour);
allEnemies.push(enemyFive);
// Place the player object in a variable called player
const player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
