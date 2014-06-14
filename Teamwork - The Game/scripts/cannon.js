function Cannon(cannonX, cannonY,stage,layer){
    var image=new Image(),
        cannon,
        self=this;

    self.x=cannonX;
    self.y=cannonY;
    self.angleDegrees=320;

    self.draw = new function () {
        image.onload = function () {
            cannon = new Kinetic.Image({
                x: cannonX,
                y: cannonY,
                image: image,
                width: 100,
                height: 30,
                offset:{x:0,y:5}
            }).rotate(self.angleDegrees); //slight rotation so the fortress is straight

            layer.add(cannon);
            stage.add(layer);
        }
    };
    image.src = 'images/gun.png';

}
