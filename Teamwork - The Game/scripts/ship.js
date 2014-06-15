function Ship(x, y, sprite, stage, layer, speed, damage, health) {
    'use strict';
    var image = new Image(),
        ship,
        self = this;

    this.damage = damage;
    this.x = x;
    this.y = y;
    this.health = health;
    this.isDestroyed = false;
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
                        0, 0, 100, 65,
                        0, 0, 100, 65,
                        0, 0, 100, 65,
                        0, 0, 100, 65,
                        0, 0, 100, 65,
                        0, 0, 100, 65,
                        0, 0, 100, 65,
                        0, 0, 100, 65,
                        0, 0, 100, 65,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 2, 100, 67,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66,
                        0, 1, 100, 66
                    ],
                    destroying: [
                        180, 0, 60, 100,
                        180, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100

                    ],
                    destroyed: [
                        300, 0, 100, 100
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
        //check for tower position to collide... for now set to 50
<<<<<<< HEAD
        if ((this.health <= 0 || (this.x <= 150 && this.y < 400)) && !self.isDestroyed) {
=======
        if ((this.health <= 0 || && this.y < 400) && !self.isDestroyed) {
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
            self.isDestroyed = true;
            speed = 0;
            ship.attrs.animation = "destroying";
            setTimeout(function () {
                ship.attrs.animation = 'destroyed';
            },300);
            setTimeout(function () {
                ship.remove();
            }, 5000);
        }
    }
}