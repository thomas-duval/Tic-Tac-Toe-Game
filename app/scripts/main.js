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
    // tl = $grid.find('#tl'),
    // tc = $grid.find('#tc'),
    // tr = $grid.find('#tr'),
    // ml = $grid.find('#ml'),
    // mc = $grid.find('#mc'),
    // mr = $grid.find('#mr'),
    // bl = $grid.find('#bl'),
    // bc = $grid.find('#bc'),
    // br = $grid.find('#br')


    // Bind events
    $button.on('click', setSide);
    $box.on('click', renderPlayer)

    function delayedModal() { timeOutModal = window.setTimeout(modal, 1000); }

    function modal() { $modal.modal('show'); }

    function setSide() {
        var data = $(this).html();
        cpu = data === 'X' ? 'O' : 'X';
        player = data;
    }

    function renderPlayer() {
        var index = grid.location.indexOf($(this).attr('id'));
        if (grid.value[index] === 'E') {
            $(this).html(player);
            grid.value[index] = player;
            checkWin(player, grid.value);
        }
    }

    function checkWin(side, grid) {
        for (var i = 0; i < 3; i++) {
            if (grid[i] === side && grid[i + 3] === side && grid[i + 6] === side) {
                alert('You Won !');
            }
        }
        for (var i = 0; i < 9; i = i + 3) {
            if (grid[i] === side && grid[i + 1] === side && grid[i + 2] === side) {
                alert('You Won !');
            }
        }
        if (grid[0] === side && grid[4] === side && grid[8] === side) {
            alert('You Won !');
        }
        if (grid[2] === side && grid[4] === side && grid[6] === side) {
            alert('You Won !');
        }

    }





    delayedModal();



    return;
})();


