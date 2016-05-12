var game = (function () {
    // variable
    var
        grid = [[, , ,], [, , ,], [, , ,]],
        cpu, player, timeOutModal;

    // Cache DOM
    var
        $grid = $('#grid'),
        $modal = $('#myModal'),
        $button = $('.modal-footer').find('.sideButton');

    // Bind events
    $button.on('click', setSide);


    function delayedModal() {
        timeOutModal = window.setTimeout(modal, 1000);
    }

    function modal() {
        $modal.modal('show');
    }

    function setSide() {
        var data = $(this).html();
        if (data === 'X') {
            player = 'X';
            cpu = 'O';
        } else {
            player = 'O';
            cpu = 'X';
        }
        console.log(('Player = ' + player + ' & CPU = ' + cpu));
    }




    console.log($button);

    delayedModal();

    return ;





})();


