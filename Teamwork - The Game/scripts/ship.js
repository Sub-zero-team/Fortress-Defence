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
	this.isRemoved=false;
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
                        180, 0, 60, 100,
                        180, 0, 60, 100,
                        180, 0, 60, 100,
                        180, 0, 60, 100,
                        180, 0, 60, 100,
                        180, 0, 60, 100,
                        180, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100,
                        240, 0, 60, 100
                    ],
                    destroyed:[
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
        if ((this.health <= 0 || (this.x<=150 && (200< this.y && this.y <400)) || this.x===0 )&& !isDestroyed ) {
			isDestroyed = true;
            speed=0;
            ship.attrs.animation = "destroying";
            setTimeout(function () {
                ship.attrs.animation='destroyed';
            },800);
            setTimeout(function () {
                ship.remove();		
				self.isRemoved=true;
            }, 5000);			 
        }
    }
}