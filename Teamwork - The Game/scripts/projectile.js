/*jslint browser: true*/
function Point(initX, initY) {
    this.x = initX;
    this.y = initY;
}

function Projectile(layer, stage) {
    var G = 9.80665, // Acceleration due to gravity at the Earth's surface
        RADIUS = 5,
        DAMAGE = 2,
        anim = null,
        velocityX = null,
        velocityY = null,
        path = [],
        pathIndex = 0,
        frameCount = 0,
        self = this;

    self.radius = RADIUS;
    self.damage = DAMAGE;

    self.isActive = false;
    self.isExploding = false;

    function createPath() {
        var x = self.positionX,
            y = self.positionY,
            STEP = 0.02,
            t = STEP;

        while (x <= 800 || y <= 600) {
            /* x = x0 + velocity * time * cos(angle),
             * y = y0 + velocity * time * sin(angle) - 1/2 * G time^2 */
            x = self.positionX + velocityX * t;
            y = self.positionY - velocityY * t +
                (0.5 * G * t * t);
            t += STEP;
            path.push(new Point(x, y));
        }
    }

    function initAnimation(spriteAnimations) {
        var imageObj = null,
            FRAME_RATE = 23,
            EXPLOSION_FRAME_COUNT = 27;

        imageObj = new Image();

        imageObj.onload = function() {
            anim = new Kinetic.Sprite({
                x: 0,
                y: 0,
                image: imageObj,
                animation: 'fly',
                animations: spriteAnimations,
                frameRate: FRAME_RATE,
                frameIndex: 0
            });

            layer.add(anim);
            stage.add(layer);
            anim.start();

            anim.on('frameIndexChange', function(evt) {
                if (anim.animation() === 'explode') {
                    anim.setX(self.positionX - 5);
                    anim.setY(self.positionY - 37);
                    if (frameCount > EXPLOSION_FRAME_COUNT) {
                        anim.hide();
                        self.isActive = false;
                        frameCount = 0;
                    } else {
                        frameCount += 1;
                    }
                } else {
                    anim.setX(self.positionX);
                    anim.setY(self.positionY);
                }
            });
        };

        imageObj.src = 'images/sprites/cannonball.png';
    }

    function initialize() {
        var spriteAnimations = null,
            EXPLOSION_HEIGHT = 42,
            FIRST_ROW_Y = 1,
            SECOND_ROW_Y = 45,
            THIRD_ROW_Y = 89;

        spriteAnimations = {
            fly: [50, 90, 10, 10],
            explode: [
                1, FIRST_ROW_Y, 9, EXPLOSION_HEIGHT,
                10, FIRST_ROW_Y, 10, EXPLOSION_HEIGHT,
                21, FIRST_ROW_Y, 10, EXPLOSION_HEIGHT,
                32, FIRST_ROW_Y, 12, EXPLOSION_HEIGHT,
                45, FIRST_ROW_Y, 14, EXPLOSION_HEIGHT,
                60, FIRST_ROW_Y, 16, EXPLOSION_HEIGHT,
                76, FIRST_ROW_Y, 14, EXPLOSION_HEIGHT,
                90, FIRST_ROW_Y, 17, EXPLOSION_HEIGHT,
                108, FIRST_ROW_Y, 20, EXPLOSION_HEIGHT,
                128, FIRST_ROW_Y, 19, EXPLOSION_HEIGHT,
                147, FIRST_ROW_Y, 20, EXPLOSION_HEIGHT,
                167, FIRST_ROW_Y, 20, EXPLOSION_HEIGHT,
                187, FIRST_ROW_Y, 19, EXPLOSION_HEIGHT,
                207, FIRST_ROW_Y, 20, EXPLOSION_HEIGHT,
                1, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                21, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                41, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                61, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                81, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                101, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                121, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                141, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                161, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                181, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                201, SECOND_ROW_Y, 20, EXPLOSION_HEIGHT,
                2, THIRD_ROW_Y, 20, EXPLOSION_HEIGHT,
                24, THIRD_ROW_Y, 20, EXPLOSION_HEIGHT
            ]
        };

        initAnimation(spriteAnimations);
    }

    self.reset = function resetPosition(initX, initY, initAngle, initPower) {
        velocityX = initPower * Math.cos(initAngle);
        velocityY = initPower * Math.sin(initAngle);
        self.positionY = initY;
        self.positionX = initX;
        path = null;
        path = [];
        createPath();
        pathIndex = 0;
        anim.setAnimation('fly');
        anim.show();
        self.isExploding = false;
        self.isActive = true;
    };

    self.update = function updateProjectile(boost) {
        if (self.isActive) {
            if (!self.isExploding && self.positionY <= 600 && self.positionX <= 800) {
                self.positionX = path[pathIndex].x;
                self.positionY = path[pathIndex].y;
                pathIndex += (boost || 2);
            } else {
                self.isExploding = true;
            }

            if (self.isExploding && anim.animation() !== 'explode') {
                anim.setAnimation('explode');
                frameCount = 0;
            }
        }
    };

    initialize();
}