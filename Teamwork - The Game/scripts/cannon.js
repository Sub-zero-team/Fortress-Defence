function Cannon(cannonX, cannonY, stage, layer) {

    'use strict';

    var INITIAL_ANGLE = 0,
        image = new Image(),
        cannon = null,
        self = this;

    self.x = cannonX;
    self.y = cannonY;
    self.angleDegrees = INITIAL_ANGLE;

    self.draw = new function() {
        image.onload = function() {
            cannon = new Kinetic.Image({
                x: cannonX,
                y: cannonY,
                image: image,
                width: 60,
                height: 30,
                offset: {
                    x: 2,
                    y: 20
                }
            }).rotate(self.angleDegrees); //slight rotation so the fortress is straight

            layer.add(cannon);
            stage.add(layer);
        }
    };
    image.src = 'images/gun.png';

    $(document).keydown(function(e) {
        if (e.keyCode == 38) {
            if (self.angleDegrees < 60) {
                cannon.rotate(-1);
                self.angleDegrees += 1;
            }
        }
        if (e.keyCode == 40) {
            if (self.angleDegrees > 0) {
                cannon.rotate(1);
                self.angleDegrees -= 1;
            }
        }
        layer.add(cannon);
        stage.add(layer);

    });
}