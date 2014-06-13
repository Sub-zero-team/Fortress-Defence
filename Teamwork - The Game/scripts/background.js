var stage = new Kinetic.Stage({
    container: 'background-container',
    width: 800,
    height: 600
});
var imgLayer = new Kinetic.Layer();
var imageObj = new Image();
imageObj.src='images/background.png'
imageObj.onload = function () {
    var background = new Kinetic.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: 800,
        height: 600
    });

    // add the shape to the layer
    imgLayer.add(background);

    // add the layer to the stage
    stage.add(imgLayer);
};

