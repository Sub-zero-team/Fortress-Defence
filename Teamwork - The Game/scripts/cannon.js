<<<<<<< HEAD
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
=======
function Cannon(cannonX, cannonY,stage,layer){

    'use strict';

    var image=new Image(),
        cannon,
        self=this;

    self.x=cannonX;
    self.y=cannonY;
    self.angleDegrees=330;

    self.draw = new function () {
        image.onload = function () {
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
            cannon = new Kinetic.Image({
                x: cannonX,
                y: cannonY,
                image: image,
                width: 60,
                height: 30,
<<<<<<< HEAD
                offset: {
                    x: 2,
                    y: 20
                }
=======
                offset:{x:0,y:15}
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
            }).rotate(self.angleDegrees); //slight rotation so the fortress is straight

            layer.add(cannon);
            stage.add(layer);
        }
    };
    image.src = 'images/gun.png';

<<<<<<< HEAD
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
=======
    $(document).keydown(function(e){
        if (e.keyCode == 38) {
            if(self.angleDegrees<340) {
                cannon.rotate(-1);
                self.angleDegrees++;
            }
        }
        if (e.keyCode == 40) {
            if(self.angleDegrees>310)
            {
                cannon.rotate(1);
                self.angleDegrees--;
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
            }
        }
        layer.add(cannon);
        stage.add(layer);

    });
<<<<<<< HEAD
}
=======
}
>>>>>>> 859bfd55e6cf796fcc914b7b45800c0190e3954b
