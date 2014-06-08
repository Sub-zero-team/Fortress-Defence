window.onload = function () {
    game();
}

function game() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    animation();

    function animation() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        //...

        requestAnimationFrame(animation);
    }
}