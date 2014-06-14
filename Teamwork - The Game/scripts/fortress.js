function Fortress(x, y, sprite, stage, layer, damage, health) {
    'use strict';
    var image = new Image(),
    fortress,
        isDestroyed = false,
        self = this;

    this.health = health;
    this.damage = damage;
    this.draw = new function () {
        image.onload = function () {
            fortress = new Kinetic.Image({
                x: x,
                y: y,
                image: image,
                width: 250,
                height: 330
            }).rotate(3); //slight rotation so the fortress is straight

            layer.add(fortress);
            stage.add(layer);
        }
    }
    image.src = sprite;
    this.update = function () {

        if ((this.health <= 0) && !isDestroyed) {
            isDestroyed = true;
        }
    }
}