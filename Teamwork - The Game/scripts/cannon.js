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
            cannon = new Kinetic.Image({
                x: cannonX,
                y: cannonY,
                image: image,
                width: 60,
                height: 30,
                offset:{x:0,y:15}
            }).rotate(self.angleDegrees); //slight rotation so the fortress is straight

            layer.add(cannon);
            stage.add(layer);
        }
    };
    image.src = 'images/gun.png';

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
            }
        }
        layer.add(cannon);
        stage.add(layer);

    });
}
