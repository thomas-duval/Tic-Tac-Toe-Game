var State = function (old) {
    this.turn = '';
    this.AIMovesCount = 0;
    this.result = 'still running';
    this.grid = [];

    if (typeof old !== 'undefined') {
        var length = old.grid.length;
        this.grid = new Array(length);
        for (var i = 0; i < length; i++) {
            this.grid[i] = old.grid[i];
        }
        this.AIMovesCount = old.AIMovesCount;
        this.result = old.result;
        this.turn = old.turn;
    }
    this.advanceTurn = function () {
        this.turn = this.turn === 'X' ? 'O' : 'X';
    }
    this.emptyCells = function () {
        var index = [];
        for (var i = 0; i < 9; i++) {
            if (this.grid[i] === 'E') {
                index.push(i);
            }
        }
        return index;
    }
    this.checkWin = function () {
        var G = this.grid;

        for (var i = 0; i < 3; i++) {
            if (G[i] !== 'E' && G[i + 3] === G[i] && G[i + 6] === G[i + 3]) {
                this.result = G[i] + ' won !';
                return true;
            }
        }
        for (var i = 0; i < 9; i = i + 3) {
            if (G[i] !== 'E' && G[i + 1] === G[i] && G[i + 2] === G[i]) {
                this.result = G[i] + ' won !';
                return true;
            }
        }
        if (G[0] !== 'E' && G[4] === G[0] && G[8] === G[0]) {
            this.result = G[0] + ' won !';
            return true;
        }
        if (G[2] !== 'E' && G[4] === G[2] && G[6] === G[2]) {
            this.result = G[2] + ' won !';
            return true;
        }
        var available = this.emptyCells;
        if (available.length === 0) {
            this.result = 'draw';
            return true;
        } else {
            return false;
        }
    }
};

var AI = function () {
    var game = {};

    function minimaxValue(state) {
        if (state.checkWin()) {
            return Game.score(state);
        }
        else {
            var stateScore; // this stores the minimax value we'll compute

            if (state.turn === UI.player)
                stateScore = -1000;
            else
                stateScore = 1000;

            var availablePositions = state.emptyCells();
            var availableNextStates = availablePositions.map(function (pos) {
                var action = new AIAction(pos);
                var nextState = action.applyTo(state);
                return nextState;
            });

            availableNextStates.forEach(function (nextState) {
                var nextScore = minimaxValue(nextState); //recursive call
                if (state.turn === UI.player) {
                    if (nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    if (nextScore < stateScore)
                        stateScore = nextScore;
                }
            });
            return stateScore;
        }
    }

    function takeAMove(turn) {
        var available = game.currentState.emptyCells();
        var availableActions = available.map(function (pos) {
            var action = new AIAction(pos);
            var next = action.applyTo(game.currentState);
            action.minimaxVal = minimaxValue(next);
            return action;
        });
        //sort the enumerated actions list by score
        if (turn === UI.player)
            //X maximizes --> descend sort the actions to have the largest minimax at first
            availableActions.sort(AIAction.DESCENDING);
        else
            //O minimizes --> acend sort the actions to have the smallest minimax at first
            availableActions.sort(AIAction.ASCENDING);

        //take the first action as it's the optimal
        var chosenAction = availableActions[0];
        var next = chosenAction.applyTo(game.currentState);

        // this just adds an X or an O at the chosen position on the board in the UI
        UI.insertAt(chosenAction.movePosition, turn);

        // take the game to the next state
        game.advanceTo(next);
    }
    // public method: specify the game the ai player will play
    this.plays = function (_game) {
        game = _game;
    }
    // public function: notify the ai player that it's its turn
    this.notify = function (turn) {
        return takeAMove(turn);
    }
};

var AIAction = function (pos) {
    this.position = pos;
    this.minimaxVal = 0;
    this.applyTo = function (state) {
        var next = new State(state);
        next.grid[this.position] = state.turn;
        if (state.turn === UI.AI) {
            next.AIMovesCount++;
        }
        next.advanceTurn;
        return next;
    }
    this.ASCENDING = function (firstAction, secondAction) {
        if (firstAction.minimaxVal < secondAction.minimaxVal)
            return -1;
        if (fistAction.minimaxVal > secondAction.minimaxVal)
            return 1;
        else
            return 0;
    }

    this.DESCENDING = function (firstAction, secondAction) {
        if (firstAction.minimaxVal > secondAction.minimaxVal)
            return -1;
        if (fistAction.minimaxVal < secondAction.minimaxVal)
            return 1;
        else
            return 0;
    }
};



var Game = function (autoPlayer) {
    this.ai = autoPlayer;
    this.currentState = new State;
    this.currentState.grid = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
    this.currentState.turn = 'X';
    this.status = 'Beginning';
    this.advanceTo = function (_state) {
        this.currentState = _state
        if (checkWin()) {
            this.status = 'ended';
            if (_state.result === 'X won !') {
                UI.switchView('X won !');
            } else if (_state.result === 'O won !') {
                UI.switchView('O won !');
            } else {
                UI.switchView('Draw');
            }
        } else {
            if (this.currentState.turn === "X") {
                ui.switchViewTo("human");
            }
            else {
                ui.switchViewTo("robot");
                this.ai.notify("O");
            }
        }
    };
    this.start = function () {
        if (this.status = "beginning") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

    this.score = function (_state) {
        if (_state.result !== "still running") {
            if (_state.result === (UI.player + " won !")) {
                return 10 - _state.aiMovesCount;
            }
            else if (_state.result === (UI.AI + " won !")) {
                return -10 + _state.aiMovesCount;
            }
            else {
                return 0;
            }
        }
    }
}

var UI = function () {
    var
        grid = {
            value: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            location: ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br']
        },
        AI, player, timeOutModal;

    var
        $grid = $('#grid'),
        $box = $grid.find('.col-xs-6.col-sm-4'),
        $modal = $('#myModal'),
        $button = $('.modal-footer').find('.sideButton');

    // Bind events
    $button.on('click', setSide);
    $box.on('click', playerTurn)

    function init() {
        delayedModal();
    }

    function delayedModal() {
        timeOutModal = window.setTimeout(modal, 1000);
    }

    function modal() {
        $modal.modal('show');
    }

    function setSide() {
        var data = $(this).html();
        AI = data === 'X' ? 'O' : 'X';
        player = data;
        grid.value[0] = AI;
        var id = '#' + grid.location[0];
        $grid.find(id).html(AI);
    }

    function playerTurn() {
        renderPlayer.call(this);
        checkWin(player, grid.value);
    }

    function renderPlayer() {
        var index = grid.location.indexOf($(this).attr('id'));
        if (grid.value[index] === 'E') {
            $(this).html(player);
            grid.value[index] = player;
        }
    }

    function insertAt(position, player) {
        if (grid.value[position] === 'E') {
            grid.value[position] = player;
            var id = '#' + grid.location[position];
            $grid.find(id).html(player);
        }

    }
    
    function reset() {
        grid.value = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
        for (var i = 0; i < grid.location.length; i++) {
            var location = '#' + grid.location[i];
            $grid.find(location).html('');
        }
        modal();
    }

    function switchView(message) {
        if (message = (player + ' won !')) {
            
        }
    }

}

UI.init();




