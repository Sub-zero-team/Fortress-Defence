/*jslint browser: true*/
$(document).ready(function () {
    var canvas = null,
        context = null,
        projectile = null,
        time = null,
        rand,
        shipsLayer = new Kinetic.Layer(),
        ships = [];


    function generateShip(sprite, speed, health) {
        var y,
            ship,
            stage = new Kinetic.Stage({
                container: 'canvas-container',
                width: 800,
                height: 600
            });

        rand = Math.random();
        y = rand * (530 - 400) + 400;
        ship = new Ship(720, y, sprite, stage, shipsLayer, speed, health);
        ships.push(ship);
        ship.draw();
    }

    function startGame() {
        // canvas = document.getElementById('the-canvas');
        // context = canvas.getContext('2d');

        // Initializes needed content in the beginning
        // Invoked once

        //projectile = new Projectile(new Point(10, 300), 30 * Math.PI / 180, 50);

        time = 0.5;

        setInterval(animation, 15);
    }

    function draw() {
        // Calls drawing functions of the objects
        // Invoked every frame

        //projectile.draw(context);

    }

    function update() {
        // Updates objects state
        // Invoked every frame
        time += 0.5;

        //projectile.update(time);
        ships.forEach(function (ship) {
            ship.update();
        });
    }

    function animation() {
        //context.clearRect(0, 0, canvas.width, canvas.height);

        if (time % 100 === 0) {
            generateShip('images/ships.png', 0.5, 1);
        }

        update();
        draw();
    }

    initializeMenu();

    // Set the button click event handlers to load some level
    $('#levelselectscreen input').click(function () {
        document.getElementById('levelselectscreen').style.display = 'none';
        document.getElementById('gamestartscreen').style.display = 'none';
        document.getElementById('gamecontainer').style.background = "none";

        // Start some level
        startGame();
    });

});


