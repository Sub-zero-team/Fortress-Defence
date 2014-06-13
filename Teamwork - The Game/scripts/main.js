/*jslint browser: true*/
$(document).ready(function () {
    var canvas = null,
        context = null,
        projectile = null,
        time = null,
        rand,
        shipsLayer = new Kinetic.Layer(),
        ships = [];

    backgroundMusic.play();

    function generateShip(sprite, speed, damage, health) {
        var y,
            ship,
            stage = new Kinetic.Stage({
                container: 'canvas-container',
                width: 800,
                height: 600
            });

        rand = Math.random();
        y = rand * 200 + 290;
        ship = new Ship(760, y, sprite, stage, shipsLayer, speed, damage, health);
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
            generateShip('images/ships2.png', 2, 10, 2);
        }
        if(time % 150===0){
            generateShip('images/ships3.png', 1, 30, 5);
        }

        update();
        draw();
    }

    initializeMenu();

    // Set the button click event handlers to load some level
    $('#levelselectscreen input').click(function () {
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

    //Temporary for test
    testFunction(ships)
});


//Remove on release
function testFunction(ships) {
    var i = 0;
    $(document).click(
        function () {
            if (ships && ships.length > i) {
                ships[i].health--;
                if( ships[i].health<=0) {
                    i++;
                }
            }
        }
    )
}

