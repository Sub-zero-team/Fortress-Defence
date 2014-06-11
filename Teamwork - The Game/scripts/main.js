/*jslint browser: true*/
window.onload = function main() {
    var canvas = null,
        context = null,
        projectile = null,
        time = null,
        rand,
        stage = new Kinetic.Stage({
            container:'canvas-container',
            width:800,
            height:600
        }),
        shipsLayer = new Kinetic.Layer(),
        ships=[];


    function generateShips(){
        var y,

        rand = Math.random(),
            y = rand*(530-400)+400;
        ship = new Ship(720,y,'images/ships.png',stage,shipsLayer,0.5,30);
        ships.push(ship);
        ship.draw();
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

        if(time%100===0){
            generateShips();
        }
        update();
        draw();
    }

    initialize();
};