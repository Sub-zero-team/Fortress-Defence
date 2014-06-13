function initializeMenu() {
    var levels = [],
        elements = document.getElementsByClassName('gamelayer'),
        html = '';

    // 9 levels (without parameters) just for example
    {
        var someLevel = {};
        for (var i = 0; i < 9; i++) {
            levels.push(someLevel);
        }
    }

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    document.getElementById('gamestartscreen').style.display = 'block';

    // Create buttons for all levels

    for (var i = 0; i < levels.length; i++) {
        var level = levels[i];
        html += '<input type="button" value="' + (i + 1) + '">';
    }

    document.getElementById('levelselectscreen').innerHTML = html;
}

function showLevelScreen() {
    $('.gamelayer').hide();
    $('#levelselectscreen').show('slow');
}

function showGameSettings() {
    //
}