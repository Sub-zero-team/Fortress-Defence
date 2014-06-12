function Ship(x,y,sprite,stage,layer,speed,damage,health) {

    'use strict';
    var image = new Image(),
        ship,
        isDestroyed = false,
        self = this;

    this.damage = damage;
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = speed;
    this.draw = function () {
        image.onload = function () {
            ship = new Kinetic.Sprite({
                x: x,
                y: y,
                image: image,
                animation: 'move',
                animations: {
                    move: [
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100,
                        0, 1, 100, 100
                    ],
                    destroyed: [
                        190, 0, 100, 100
                    ]
                },
                frameRate: 20,
                frameIndex: 0

            });

            layer.add(ship);
            stage.add(layer);
            ship.start();
            ship.on('frameIndexChange', function () {

                ship.setX(ship.attrs.x -= speed);
                self.x -= speed;
            });
        };
        image.src = sprite;
    };
    this.update = function () {

        if (this.health <= 0 && !isDestroyed) {
            isDestroyed = true;
            speed=0;
            ship.attrs.animation = "destroyed";
            setTimeout(function () {
                ship.remove();
            }, 5000);
        }
    }
}