const possibleY = [57, 140, 223];
const possibleX = [0, 101, 202, 303, 404];
const possibleGem = ["images/Gem Green.png" , "images/Gem Blue.png" , "images/Gem Orange.png"];

let gemPoints = 0;
let result = 0;
let lifes = 3;
let block_game = false;

const result_box = document.querySelector(".result");

const score = document.querySelector(".score_value");
const lifes_value = document.querySelector(".lifes_value");
const bugs_value = document.querySelector(".bugs_value");

const result_score_value = document.querySelector(".result_score_value");
const result_lifes_value = document.querySelector(".result_lifes_value");
const result_bugs_value = document.querySelector(".result_bugs_value");

// Enemies our player must avoid
const Enemy = function() {
    let randY = 1;
    this.x = 520;
    this.y = "";
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 520) {
        this.x += dt * 150 * this.speed;
    } else {
        this.x = -105
        randY = Math.random() * 2.99;
        this.speed = 1 + Math.random() * 2.99;
        this.y = possibleY[Math.floor(randY)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
const Player = function() {
    this.sprite = 'images/char-boy.png';
};

// Update the player position  when arrive at the water or hit a bug
Player.prototype.update = function() {
    if (this.y < 57) {
        this.start();
        result += gemPoints;
        gemPoints = 0;
        score.textContent = result;
        allGem.forEach(function(gem) {
            gem.start();
        });
        if (result > 25 && allEnemies.length < 4) {
            bugs_value.textContent++;
            allEnemies.push(new Enemy());
        } else if (result > 60 && allEnemies.length < 5) {
            bugs_value.textContent++;
            allEnemies.push(new Enemy());
        } else if (result > 100 && allEnemies.length < 6) {
            bugs_value.textContent++;
            allEnemies.push(new Enemy());
        }
    }

    allEnemies.forEach(function(enemie) {
        if(enemie.y == this.y && enemie.x > (this.x - 50) && enemie.x < (this.x + 50)){
            this.start();
            result = result > 0 ? result - 1 : 0;
            score.textContent = result;
            gemPoints = 0;
            lifes--;
            lifes_value.textContent = lifes;
            if (lifes == 0) {
                result_score_value.textContent = result;
                cover.style.display = "block";
                result_box.style.display = "block";
                block_game = true;
            }
        }
    }, this);
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle input for player's movement
// Parameter: direction, a string with the direction clicked
Player.prototype.handleInput = function(direction) {
    if (block_game == false) {
        switch(direction) {
            case "left":
                if (this.x > 0)
                    this.x -= 101;
                break;
            case "right":
                if (this.x < 404)
                    this.x += 101;
                break;
            case "up":
                if (this.y > 0)
                    this.y -= 83;
                break;
            case "down":
                if (this.y < 389)
                    this.y += 83;
                break;
        }
    }
};

// Place player in the start position
Player.prototype.start = function() {
    this.x = 202;
    this.y = 389;
};

// Cristals
const Gem = function() {
    this.start();
};

// Place the cristals
Gem.prototype.update = function() {
    if (allGem[0].x == allGem[1].x && allGem[0].y == allGem[1].y) {
        this.start();
    }
    if (allGem[1].y < allGem[0].y) {
        let tmpGem = allGem[0];
        allGem[0] = allGem[1];
        allGem[1] = tmpGem;
    }
    if (this.x == player.x && this.y == player.y) {
        switch(this.sprite) {
            case possibleGem[0]:
                gemPoints += 1;
                break;
            case possibleGem[1]:
                gemPoints += 3;
                break;
            case possibleGem[2]:
                gemPoints += 8;
                break;
        }
        this.x += 1000;
        this.y += 1000;
    }
};

// Draw the Cristals on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Choose ramdomly the cristals
Gem.prototype.start = function() {
    randGem = Math.random();
    if (randGem < 0.9) {
        this.sprite = randGem < 0.6 ? possibleGem[0] : possibleGem[1];
    } else {
        this.sprite = possibleGem[2];
    }
    randY = Math.random() * 2.99;
    randX = Math.random() * 4.99;
    this.y = possibleY[Math.floor(randY)];
    this.x = possibleX[Math.floor(randX)];
};

let allEnemies = declareEnemies(3);
const player = new Player();
let allGem = [new Gem(), new Gem()];

// Function that get the number of enemis and return an array of Enemys
function declareEnemies(size) {
    let enArray = new Array(size);
    for(let i = 0; i < size; i++)
        enArray[i] = new Enemy();
    return enArray;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let avatarSelector = document.querySelector(".avatars");
let cover = document.querySelector(".cover");

// Listener for the choice of the avatar
avatarSelector.addEventListener('click', function(e) {
    player.sprite = e.path[0].getAttribute("src");
    player.start();
    cover.style.display = "none";
    this.style.display = "none";
});
