function initializeMenu() {
    var levels = [],
        elements = $('#levelselectscreen'),
        html = '';

    function Level(level, isLocked) {
        this.level = level;
        this.isLocked = isLocked;
    }

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    $('#gamestartscreen').show();

    // Temporary: 15 levels (without parameters) just for example
    {
        levels.push(new Level(1, false));
        for (var i = 2; i < 16; i++) {
            var someLevel = new Level(i, true);
            levels.push(someLevel);
        }
    }

    // Creates a button for each one level
    for (var i = 0; i < levels.length; i++) {
        html += '<input type="button" ' +
            ((levels[i].isLocked) ? 'disabled' : '') +
            ' value="' + (i + 1) + '">';
    }

    $('#levelselectscreen').html(html);
}

function showLevelScreen() {
    $('#levelselectscreen').hide();
    $('#gamestartscreen').hide();
    $('#levelselectscreen').show('slow');
}

function showGameSettings() {
    //
}

function back() {
    //
}