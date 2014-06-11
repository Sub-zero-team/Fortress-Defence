/*jslint browser: true*/

var levels = [];

// 7 levels (without parameters) just for example
var someLevel = {};
for (var i = 0; i < 7; i++) {
    levels.push(someLevel);
}

window.onload = function main() {
    var canvas = null;
    var context = null;
    var projectile = null;
    var time = null;
    var rand;
    var shipsLayer = new Kinetic.Layer();
    var ships = [];

<<<<<<< HEAD
    init();

    function init() {
        var elements = document.getElementsByClassName('gamelayer');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        document.getElementById('gamestartscreen').style.display = 'block';

        // Create buttons for all levels
        var html = '';
        for (var i = 0; i < levels.length; i++) {
            var level = levels[i];
            html += '<input type="button" value="' + (i + 1) + '">';
        };

        document.getElementById('levelselectscreen').innerHTML = html;

        // Set the button click event handlers to load some level
        $('#levelselectscreen input').click(function () {
            document.getElementById('levelselectscreen').style.display = 'none';
            document.getElementById('gamestartscreen').style.display = 'none';
            document.getElementById('gamecontainer').style.background = "none";

            // Start some level
            initialize();
        });
=======
        rand = Math.random(),
            y = rand*(530-400)+400;
        ship = new Ship(720,y,'images/ships.png',stage,shipsLayer,0.5,30,1);
        ships.push(ship);
        ship.draw();
>>>>>>> origin/master
    }

    function initialize() {
        // canvas = document.getElementById('the-canvas');
        // context = canvas.getContext('2d');

        // Initializes needed content in the beginning
        // Invoked once

        //projectile = new Projectile(new Point(10, 300), 30 * Math.PI / 180, 50);

        time = 0.5;

        setInterval(animation, 15);
    }

    function generateShips() {
        var stage = new Kinetic.Stage({
            container: 'canvas-container',
            width: 800,
            height: 600
        });
        var y,
        rand = Math.random(),
            y = rand * (530 - 400) + 400;
        ship = new Ship(720, y, 'images/ships.png', stage, shipsLayer, 0.5, 30);
        ships.push(ship);
        ship.draw();
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
    }

    function animation() {
        //context.clearRect(0, 0, canvas.width, canvas.height);

        if (time % 100 === 0) {
            generateShips();
        }

        update();
        draw();
    }
};

function showLevelScreen() {
    document.getElementById('levelselectscreen').style.display = 'block';
}

function showGameSettings() {
    //
}
