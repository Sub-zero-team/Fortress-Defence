function Fortress(x, y, sprite, stage, layer, damage, health) {
    'use strict';
    var image = new Image(),
        fortress,
        self = this;

<<<<<<< HEAD
    this.isDestroyed = false;
    this.health = health;
    this.damage = damage;
    this.draw = new function() {
        image.onload = function() {
=======
    this.isDestroyed = false,
        this.health = health;
    this.damage = damage;
    this.draw = new function () {
        image.onload = function () {
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
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
    };

    image.src = sprite;
<<<<<<< HEAD
    this.update = function() {
=======
    this.update = function () {
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b

        if ((this.health <= 0) && !isDestroyed) {
            isDestroyed = true;
        }
    }
}