var game = (function () {
    var // variable
        grid = {
            value: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            location: ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br']
        },
        cpu, player, timeOutModal;

    var // Cache DOM
        $grid = $('#grid'),
        $box = $grid.find('.col-xs-6.col-sm-4'),
        $modal = $('#myModal'),
        $button = $('.modal-footer').find('.sideButton');

    // Bind events
    $button.on('click', setSide);
    $box.on('click', playerTurn)

    function delayedModal() { timeOutModal = window.setTimeout(modal, 1000); }

    function modal() { $modal.modal('show'); }

    function setSide() {
        var data = $(this).html();
        cpu = data === 'X' ? 'O' : 'X';
        player = data;
    }

    function playerTurn() {
        renderPlayer.call(this)
        checkWin(player, grid.value);
    }

    function renderPlayer() {
        var index = grid.location.indexOf($(this).attr('id'));
        if (grid.value[index] === 'E') {
            $(this).html(player);
            grid.value[index] = player;
        }
    }

    function checkWin(side, grid) {
        for (var i = 0; i < 3; i++) {
            if (grid[i] === side && grid[i + 3] === side && grid[i + 6] === side) {
                alert('You Won !');
                reset();
            }
        }
        for (var i = 0; i < 9; i = i + 3) {
            if (grid[i] === side && grid[i + 1] === side && grid[i + 2] === side) {
                alert('You Won !');
                reset();
            }
        }
        if (grid[0] === side && grid[4] === side && grid[8] === side) {
            alert('You Won !');
            reset();
        }
        if (grid[2] === side && grid[4] === side && grid[6] === side) {
            alert('You Won !');
            reset();
        }
    }

    function reset() {
        grid.value = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
        for (var i = 0; i < grid.location.length; i++) {
            var location = '#' + grid.location[i];
            $grid.find(location).html('');
        }
    }

    delayedModal();

    return;
})();


