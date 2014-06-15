/*jslint browser: true*/
$(document).ready(function () {
    var stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: 800,
        height: 600
    }),
    shipsLayer = new Kinetic.Layer(),
    projectileLayer = new Kinetic.Layer(),
    fortressLayer = new Kinetic.Layer(),
    canonLayer = new Kinetic.Layer(),
    canvas = document.getElementById('myCanvas'),
    context = canvas.getContext('2d'),
    ships = [],
    level = null,
    projectiles = [],
    time = null,
    rand,
    fortress,
    canon,
    maxHealth = 100;

    backgroundMusic.play();
    backgroundHandler(stage);
    initializeMenu();

    // Set the button click event handlers to load some level
    $('#levelselectscreen input').click(function (e) {
        level = e.target.value;
        document.getElementById('gamecontainer').style.background = "none";
        $('#levelselectscreen').hide('slow');
        $('#gamestartscreen').hide('slow');
        $('#title').hide('slow');
        backgroundMusic.pause();

        // Start some level
        document.getElementById('myCanvas').style.display = "block";
        document.getElementById('back').style.display = "block";
        document.getElementById('music').style.display = "block";
        levelMusic.play();
        startGame();
    });

    function startGame() {
        // Initializes needed content in the beginning
        // Invoked once
        fortress = new Fortress(30, 160, 'images/tower.png', stage, fortressLayer, 20, maxHealth);

        time = 0.5;
        canon = new Cannon(100, 200, stage, canonLayer);
        animateInterval = setInterval(animation, 15);
    }

    function animation() {
        if (time % 100 === 0) {
            generateShip('images/sprites/ship1.png', 2, 10, 2);
        }

        if (time % 500 === 0) {
            generateShip('images/sprites/ship2.png', 1, 30, 5);
        }

        update();
        draw();
        progressBar(context, 200, 60, 400, 16, fortress.health, maxHealth);
    }

    function generateShip(sprite, speed, damage, health) {
        var y,
            ship;

        rand = Math.random();
        y = rand * 200 + 290;
        ship = new Ship(760, y, sprite, stage, shipsLayer, speed, damage, health);
        ships.push(ship);
        ship.draw();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function update() {
        var projCount = 0,
            shipCount = 0;

        // Updates objects state
        // Invoked every frame
        time += 0.5;
        time %= 10000000; // Prevents time from overflow

        for (projCount = projectiles.length - 1; projCount >= 0; projCount -= 1) {
            if (projectiles[projCount].isExploding) { // Removes blown projectiles
                projectiles.splice(projCount, 1);
            } else {
                for (shipCount = ships.length - 1; shipCount >= 0; shipCount -= 1) {
                    if (ships[shipCount].isDestroyed) { // Removes destroyed ships
                        ships.splice(shipCount, 1);
                    } else {
                        if (doObjectsCollide(projectiles[projCount], ships[shipCount])) {
                            bombSound.play();
                            projectiles[projCount].isExploding = true;
                            ships[shipCount].health -= projectiles[projCount].damage;
                        }
                    }
                }
            }
        }
        fortress.update();

        ships.forEach(function (ship) {
            ship.update();
            shipsTowerCollision(ship);
        });

        projectiles.forEach(function (proj) {
            proj.update();
        });

        // projectile and ship collision detection
        function doObjectsCollide(projectile, ship) {
            var SHIP_SPRITE_OFFSET_Y = 46,
                SHIP_SPRITE_OFFSET_X = 22,
                SHIP_HEIGHT = 13,
                SHIP_WIDTH = 58,
                bulletY = projectile.positionY,
                bulletX = projectile.positionX,
                shipX = ship.x + SHIP_SPRITE_OFFSET_X,
                shipY = ship.y + SHIP_SPRITE_OFFSET_Y,
                doCollide = false,
                isTopHit = null,
                isBottomHit = null,
                isFrontHit = null,
                isBackHit = null;

            isTopHit = (bulletY + projectile.radius) > shipY; // &&
            isBottomHit = (bulletY - projectile.radius) < (shipY + SHIP_HEIGHT); // &&
            isFrontHit = (bulletX + projectile.radius) > shipX; // &&
            isBackHit = (bulletX - projectile.radius) < (shipX + SHIP_WIDTH);

            doCollide = isTopHit && isBottomHit && isFrontHit && isBackHit;

            return doCollide;
        }

        function shipsTowerCollision(ship) {
            if (((ship.x <= 150 && ship.y < 400) || (ship.x <= 0 && ship.y >= 400)) && !ship.isCollided) {
                ship.isCollided = true;
                fortress.health -= ship.damage;
                if (ship.x <= 0 && ship.y >= 400) {
                    missSound.play();
                }
                else {
                    hitSound.play();
                }
            }
        }

        if (fortress.isDestroyed) {
            initializeMenu();
        }
    }

    function draw() {
        // Calls drawing functions of the objects
        // Invoked every frame

        // Returns a random integer between min and max
        // Using Math.round() will give you a non - uniform distribution!
        if (time > 50 && time % 10 === 0 && projectiles.length < 8) {
            var newProjectile = null,
                angle = getRandomInt(10, 60),
                power = getRandomInt(40, 80);

            angle *= Math.PI / 180;

            newProjectile = new Projectile(155, 245, angle, power, projectileLayer, stage);

            projectiles.push(newProjectile);
        }
    }
});