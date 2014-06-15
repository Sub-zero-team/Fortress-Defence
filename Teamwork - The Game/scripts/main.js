/*jslint browser: true*/
$(document).ready(function () {
    'use strict';
    var stage = new Kinetic.Stage({
        container: 'kinetic-container',
        width: 800,
        height: 600
    }),
        shipsLayer = new Kinetic.Layer(),
        projectileLayer = new Kinetic.Layer(),
        fortressLayer = new Kinetic.Layer(),
        canonLayer = new Kinetic.Layer(),
        canvas = document.getElementById('canvas-container'),
        context = canvas.getContext('2d'),
        ships = [],
        level = null,
        projectiles = [],
        time = null,
        rand,
        fortress,
        canon,
        maxHealth = 100,
        frame,
        power = 1,
        score = 0,
        MAX_PROJECTILES = 8;

    backgroundMusic.play();
    backgroundHandler(stage);
    initializeMenu();

    // Helper function shows current mouse cursor coordinates;
    //    document.onmousemove = function(e) {
    //        var x = e.pageX - 550;
    //        var y = e.pageY - 70;
    //        e.target.title = "X: " + x + " Y: " + y;
    //    };

    // Set the button click event handlers to load some level
    $('#levelselectscreen input').click(function (e) {
        level = e.target.value;
        $('#game-container').css('background', 'none');
        $('#levelselectscreen').hide('slow');
        $('#gamestartscreen').hide('slow');
        $('#title').hide('slow');
        backgroundMusic.pause();

        // Start some level
        $('#canvas-container').show();
        $('nav').show();
        levelMusic.play();
        startGame();
    });

    function startGame() {
        // Initializes needed content in the beginning
        // Invoked once
        var newProjectile = null,
            i = 0;


        time = 0.5;

        canon = new Cannon(140, 240, stage, canonLayer);
        fortress = new Fortress(30, 160, 'images/tower.png', stage, fortressLayer, 20, maxHealth);

        // Creates projectiles list
        for (i = 0; i < MAX_PROJECTILES; i += 1) {
            newProjectile = new Projectile(projectileLayer, stage);
            projectiles.push(newProjectile);
        }

        $(document).on('keypress', function (evt) {
            if (evt.keyCode === 32) {
                if (power < 100) {
                    power += 10;
                }
                console.log(power);
            }
        });
        $(document).on('keyup', (function (evt) {
            if (evt.keyCode === 32) {
                var i = 0,
                    angle = canon.angleDegrees,
                    x = 0,
                    y = 0;
                angle *= Math.PI / 180;
                x = canon.x + 60 * Math.cos(angle);
                y = canon.y - 60 * Math.sin(angle);
                for (i = 0; i < MAX_PROJECTILES; i += 1) {
                    if (!projectiles[i].isActive) {
                        projectiles[i].reset(x, y, angle, power);
                        power = 1;
                        break;
                    }
                }

            }
        }));

        frame = setInterval(animation, 15);
    }

    function animation() {
        if (time % 100 === 0) {
            generateShip('images/sprites/ship1.png', 2, 10, 2);
        }

        if (time % 500 === 0) {
            generateShip('images/sprites/ship2.png', 1, 30, 5);
        }

        update();
        progressBar(context, 200, 60, 400, 16, fortress.health, maxHealth, true, 'red');
        progressBar(context, 120, 140, 100, 16, power, 100, false, 'green');
        context.fillStyle = 'black';
        context.font = '30px Gregorian';
        context.fillText('Score: ' + score, 53, 553);
        context.fillStyle = '#b1d8f5';

        context.fillText('Score: ' + score, 50, 550);
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

    function update() {
        var projCount = 0,
            shipCount = 0;

        // Updates objects state
        // Invoked every frame
        time += 0.5;
        time %= 10000000; // Prevents time from overflow

        for (projCount = MAX_PROJECTILES - 1; projCount >= 0; projCount -= 1) {
            // Checks for collision only if current projectile is active
            if (projectiles[projCount].isActive) {
                for (shipCount = ships.length - 1; shipCount >= 0; shipCount -= 1) {
                    if (ships[shipCount].isDestroyed) { // Removes destroyed ships
                        //score+=ships[shipCount].damage;
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

            }
        }

        if (fortress.isDestroyed) {
            clearInterval(frame);

            context.fillStyle = 'black';
            //context.strokeStyle = 'black';
            context.font = '60px Gregorian';
            context.fillText('GAME OVER', 253, 403);
            context.fillStyle = '#b1d8f5';
            context.fillText('GAME OVER', 250, 400);
        }
    }
});