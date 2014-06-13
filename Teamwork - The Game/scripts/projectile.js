/*jslint browser: true*/
/*function Point(initX, initY) {
    this.x = initX;
    this.y = initY;
}*/

function Projectile(initX, initY, initAngle, initVelocity, layer) {
    var G = 9.80665, // Acceleration due to gravity at the Earth's surface
        RADIUS = 5,
        time = 0.5,
        velocity = null,
        angle = null,
        startPositionX = null,
        startPositionY = null,
        cannonball = null;

    startPositionX = initX;
    startPositionY = initY;
    angle = initAngle;
    velocity = initVelocity;
    cannonball = new Kinetic.Circle({
        radius: RADIUS,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2
    });

    this.positionX = initX;
    this.positionY = initY;

    layer.add(cannonball);

    this.update = function updateProjectile(boost) {
        /*x = x0 + velocity * time * cos(angle),
        y = y0 + velocity * time * sin(angle) - 1/2 * G time^2 */
        this.positionX = startPositionX +
            velocity * time * Math.cos(angle);
        this.positionY = startPositionY -
            (velocity * time * Math.sin(angle) - (G * Math.pow(time, 2)) / 2);
        time += (boost || 0.5);
    };

    this.draw = function drawProjectile(layer) {
        var anim = new Kinetic.Animation(function(frame) {
            if (this.positionY < 800) {
                cannonball.setX(this.positionX);
                cannonball.setY(this.positionY);
            } else {
                anim.stop();
            }
        }, layer);

        anim.start();
    };
}