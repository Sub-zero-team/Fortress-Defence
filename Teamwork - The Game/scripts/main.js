/*jslint browser: true*/
window.onload = function main() {
    var canvas = null,
        context = null;

    function initialize() {
        canvas = document.getElementById('the-canvas');
        context = canvas.getContext('2d');

        // Initializes needed content in the beginning
        // Invoked once

        animation();
    }

    function draw() {
        // Calls drawing functions of the objects
        // Invoked every frame
    }

    function update() {
        // Updates objects state
        // Invoked every frame
    }

    function animation() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        //...

        requestAnimationFrame(animation);
    }

    initialize();
};