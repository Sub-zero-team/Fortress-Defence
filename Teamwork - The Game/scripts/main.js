/*jslint browser: true*/
$(document).ready(function() {
    var projectiles = [],
        time = null,
        rand,
        shipsLayer = new Kinetic.Layer(),
        projectileLayer = new Kinetic.Layer(),
        fortressLayer = new Kinetic.Layer(),
        stage = new Kinetic.Stage({
            container: 'canvas-container',
            width: 800,
            height: 600
        }),
        ships = [];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    function startGame() {
        // Initializes needed content in the beginning
        // Invoked once
        fortress = new Fortress(30, 160, 'images/tower.png', stage, fortressLayer, 20, 100);

        time = 0.5;

        setInterval(animation, 15);
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

            newProjectile = new Projectile(70, 300, angle, power, projectileLayer, stage);

            projectiles.push(newProjectile);
        }
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
                            projectiles[projCount].isExploding = true;
                            ships[shipCount].health -= projectiles[projCount].damage;
                        }
                    }
                }
            }
        }

        /*
        ships.forEach(function(ship) {
            if (ship.isRemoved) {
                var index = ships.indexOf(ship);
                ships.splice(index, 1);
            }
        });*/

        ships.forEach(function(ship) {
            ship.update();
        });

        projectiles.forEach(function(proj) {
            proj.update();
        });
    }

    function animation() {
        if (time % 100 === 0) {
            generateShip('images/ships2.png', 2, 10, 2);
        }

        if (time % 500 === 0) {
            generateShip('images/ships3.png', 1, 30, 5);
        }

        update();
        draw();
    }

    backgroundMusic.play();
    backgroundHandler(stage);

    initializeMenu();

    // Set the button click event handlers to load some level
    $('#levelselectscreen input').click(function() {
        document.getElementById('gamecontainer').style.background = "none";
        document.getElementById('music').style.display = "block";
        $('#levelselectscreen').hide('slow');
        $('#gamestartscreen').hide('slow');
        $('#title').hide('slow');
        backgroundMusic.pause();

        // Start some level
        levelMusic.play();
        startGame();
    });
});