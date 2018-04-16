const possibleY=[57, 140, 223];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    const randY=1;
    this.x=520;
    this.y="";
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x<520){
      this.x+=dt*150*this.speed;
    }else{
      this.x=-105
      randY=Math.random()*2.99;
      this.speed=1+Math.random()*2.99;
      this.y=possibleY[Math.floor(randY)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
var Player = function() {
    this.x=202;
    this.y=389;
    this.sprite = 'images/char-boy.png';
};

// Update the player position
Player.prototype.update = function(dt) {
  if(this.y<57)
    this.start();
  allEnemies.forEach(function (enemie) {
    if(enemie.y==this.y && enemie.x>(this.x-50) && enemie.x<(this.x+50)){
      this.start();
    }
  }, this);
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle input for player's movement
Player.prototype.handleInput = function(direction) {
  console.log(this.x  + "/" + this.y);
    switch(direction){
      case "left":
        if(this.x>0)
          this.x-=101;
        break;
      case "right":
        if(this.x<404)
          this.x+=101;
        break;
      case "up":
        if(this.y>0)
          this.y-=83;
        break;
      case "down":
        if(this.y<389)
          this.y+=83;
        break;
    }
};

Player.prototype.start = function() {
  this.x=202;
  this.y=389;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = declareEnemies(3);
var player = new Player();

// Function that get the number of enemis and return an array of "Enemy"s
function declareEnemies(size) {
  let enArray = new Array(size);
  for(let i=0; i<size; i++)
    enArray[i] = new Enemy();
  return enArray;
}

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
