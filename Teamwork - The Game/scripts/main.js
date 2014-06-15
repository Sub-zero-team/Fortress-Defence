/*jslint browser: true*/
<<<<<<< HEAD
$(document).ready(function() {
    'use strict';
=======
$(document).ready(function () {
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
    var stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: 800,
        height: 600
    }),
<<<<<<< HEAD
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
        maxHealth = 100,
        MAX_PROJECTILES = 8;
=======
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
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b

    backgroundMusic.play();
    backgroundHandler(stage);
    initializeMenu();

<<<<<<< HEAD
    // Helper function shows current mouse cursor coordinates;
    document.onmousemove = function(e) {
        var x = e.pageX - 550;
        var y = e.pageY - 70;
        e.target.title = "X: " + x + " Y: " + y;
    };

    // Set the button click event handlers to load some level
    $('#levelselectscreen input').click(function(e) {
=======
    // Set the button click event handlers to load some level
    $('#levelselectscreen input').click(function (e) {
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
        level = e.target.value;
        document.getElementById('gamecontainer').style.background = "none";
        $('#levelselectscreen').hide('slow');
        $('#gamestartscreen').hide('slow');
        $('#title').hide('slow');
        backgroundMusic.pause();

<<<<<<< HEAD
=======

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

>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
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
<<<<<<< HEAD
        var newProjectile = null,
            i = 0;

        time = 0.5;

        canon = new Cannon(30, 160, stage, canonLayer);
        fortress = new Fortress(30, 160, 'images/tower.png', stage, fortressLayer, 20, maxHealth);

        // Creates projectiles list
        for (i = 0; i < MAX_PROJECTILES; i += 1) {
            newProjectile = new Projectile(projectileLayer, stage);
            projectiles.push(newProjectile);
        }

        $(document).on('keyup', (function(evt) {
            if (evt.keyCode === 32) {
                var i = 0,
                    angle = canon.angleDegrees,
                    power = getRandomInt(10, 80),
                    x = 0,
                    y = 0;

                angle *= Math.PI / 180;
                x = canon.x + 60 * Math.cos(angle);
                y = canon.y - 60 * Math.sin(angle);
                for (i = 0; i < MAX_PROJECTILES; i += 1) {
                    if (!projectiles[i].isActive) {
                        projectiles[i].reset(x, y, angle, power);
                        break;
                    }
                }
            }
        }));

=======
        fortress = new Fortress(30, 160, 'images/tower.png', stage, fortressLayer, 20, maxHealth);

        time = 0.5;
        canon = new Cannon(135, 240, stage, canonLayer);
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
        setInterval(animation, 15);
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

<<<<<<< HEAD
        for (projCount = MAX_PROJECTILES - 1; projCount >= 0; projCount -= 1) {
            // Checks for collission only if current projectile is active
            if (projectiles[projCount].isActive) {
=======
        for (projCount = projectiles.length - 1; projCount >= 0; projCount -= 1) {
            if (projectiles[projCount].isExploding) { // Removes blown projectiles
                projectiles.splice(projCount, 1);
            } else {
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
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
<<<<<<< HEAD
        fortress.update();

        ships.forEach(function(ship) {
=======

        fortress.update();
        ships.forEach(function (ship) {
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
            ship.update();
            shipsTowerCollision(ship);
        });

<<<<<<< HEAD
        projectiles.forEach(function(proj) {
            proj.update();
        });

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

    function shipsTowerCollision(ship) {
        if (((ship.x <= 150 && ship.y < 400) || (ship.x <= 0 && ship.y >= 400)) && !ship.isCollided) {
            ship.isCollided = true;
            fortress.health -= ship.damage;
            if (ship.x <= 0 && ship.y >= 400) {
                missSound.play();
            } else {
                hitSound.play();
=======
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
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
            }
        }

        if (fortress.isDestroyed) {
            initializeMenu();
        }
    }

    function draw() {
        // Calls drawing functions of the objects
        // Invoked every frame
<<<<<<< HEAD
=======

        // Returns a random integer between min and max
        // Using Math.round() will give you a non - uniform distribution!
        $(document).keyup(function (evt) {
            if (evt.keyCode===32 && projectiles.length < 3) {
                var newProjectile = null,
                    angle = canon.angleDegrees + 65,
                    power = getRandomInt(10, 80),
                    x,
                    y;

                angle *= Math.PI / 180;
                x = canon.x - 5 + 60 * Math.cos(-angle);
                y = canon.y + 10 + 60 * Math.sin(-angle);
                newProjectile = new Projectile(x, y, angle, power, projectileLayer, stage);

                projectiles.push(newProjectile);
            }
        });
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
    }
});