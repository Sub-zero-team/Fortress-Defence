/*jslint browser: true*/
function Point(initX, initY) {
    this.x = initX;
    this.y = initY;
}

function Projectile(initX, initY, initAngle, initPower, layer, stage) {
    var G = 9.80665, // Acceleration due to gravity at the Earth's surface
        RADIUS = 5,
        velocityX = null,
        velocityY = null,
        collissionBody = null,
        path = [],
        pathIndex = 0,
        self = this;

    /*collissionBody = new Kinetic.Circle({
        radius: RADIUS,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2
    });*/

    self.positionX = initX;
    self.positionY = initY;
    self.radius = RADIUS;

    self.isExploding = false;

    //layer.add(collissionBody);

    function createPath() {
        var x = 0,
            y = 0,
            STEP = 0.02,
            t = STEP;

        while (x <= 800 || y <= 600) {
            /* x = x0 + velocity * time * cos(angle),
             * y = y0 + velocity * time * sin(angle) - 1/2 * G time^2 */
            x = initX + velocityX * t;
            y = initY - velocityY * t +
                (0.5 * G * t * t);
            t += STEP;
            path.push(new Point(x, y));
        }
    }

    function initAnimation() {
        var imageObj = null,
            EXPLOSION_HEIGHT = 42,
            FIRST_ROW_Y = 1,
            SECOND_ROW_Y = 45,
            THIRD_ROW_Y = 89,
            animations = {
                fly: [{
                    x: 50,
                    y: 90,
                    width: 10,
                    height: 10
                }],
                explode: [{
                    x: 1,
                    y: FIRST_ROW_Y,
                    width: 9,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 10,
                    y: FIRST_ROW_Y,
                    width: 10,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 21,
                    y: FIRST_ROW_Y,
                    width: 10,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 32,
                    y: FIRST_ROW_Y,
                    width: 12,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 45,
                    y: FIRST_ROW_Y,
                    width: 14,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 60,
                    y: FIRST_ROW_Y,
                    width: 16,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 76,
                    y: FIRST_ROW_Y,
                    width: 14,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 90,
                    y: FIRST_ROW_Y,
                    width: 17,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 108,
                    y: FIRST_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 128,
                    y: FIRST_ROW_Y,
                    width: 19,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 147,
                    y: FIRST_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 167,
                    y: FIRST_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 187,
                    y: FIRST_ROW_Y,
                    width: 19,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 207,
                    y: FIRST_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 1,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 21,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 41,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 61,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 81,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 101,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 121,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 141,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 161,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 181,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 201,
                    y: SECOND_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 2,
                    y: THIRD_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }, {
                    x: 24,
                    y: THIRD_ROW_Y,
                    width: 20,
                    height: EXPLOSION_HEIGHT
                }]
            };

        imageObj = new Image();

        imageObj.onload = function() {
            var sprite = new Kinetic.Sprite({
                x: initX - RADIUS,
                y: initY - RADIUS,
                image: this,
                animation: 'fly',
                animations: animations,
                frameRate: 7,
                frameIndex: 0
            });

            layer.add(sprite);
            stage.add(layer);
            sprite.start();
            sprite.on('frameIndexChange', function() {
                if (self.isExploding) {
                    sprite.setAnimation('explode');
                } else {
                    sprite.setX(self.positionX - RADIUS);
                    sprite.setY(self.positionY - RADIUS);
                }
            });
        };

        imageObj.src = 'file:///D:/JavaScriptDOMandUI/TeamWork/Teamwork%20-%20The%20Game/images/cannonball.png';
    }

    function initialize() {
        velocityX = initPower * Math.cos(initAngle);
        velocityY = initPower * Math.sin(initAngle);
        self.reset();
        self.isExploding = false;
        createPath();
        initAnimation();
    }

    self.reset = function resetPosition() {
        self.positionY = initY;
        self.positionX = initX;
        pathIndex = 0;
    };

    self.update = function updateProjectile(boost) {
        if (self.positionY < 600 && self.positionX < 800) {
            self.positionX = path[pathIndex].x;
            self.positionY = path[pathIndex].y;
            pathIndex += (boost || 2);
        } else {
            self.reset();
            //anim.stop();
        }
    };

    self.draw = function drawProjectile() {
        /*var anim = new Kinetic.Animation(function() {
            if (self.positionY < 600 && self.positionX < 800) {
                collissionBody.setX(self.positionX);
                collissionBody.setY(self.positionY);
            } else {
                self.reset();
                //anim.stop();
            }
        }, layer);

        anim.start();*/
    };

    initialize();
}