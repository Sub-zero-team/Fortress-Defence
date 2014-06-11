/**
 * Created by ShOnZi on 6/11/2014.
 */
function Ship(x,y,sprite,stage,layer,speed,damage,health) {

    'use strict';
    var image = new Image(),
        ship,
        self=this;
    this.damage=damage;
    this.x=x;
    this.y=y;
    this.health=health;
    this.speed=speed;
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
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
                        0, 0, 100, 100,
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
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100,
                        0, 2, 100, 100
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
                self.x-=speed;
            });
        };
        image.src=sprite;
    };
    this.remove=function(){
        ship.destroy();
    }
}