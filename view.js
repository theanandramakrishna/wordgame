const electron = require("electron");
const game = electron.remote.require("./game");

var word = new Vue({
    el: '#word',
    data: {
      message: 'word'
    }
});

var wordperms = new Vue({
    el: '#wordperms',
    data: {
      perms: [
          { text: 'perm1' },
          { text: 'perm2' }
      ]
    }
});

var timeremaining = new Vue({
    el: '#timeremaining',
    data: {
        timeremaining: 'Timer Value'
    }
});

var start = new Vue({
    el: '#startbtn',
    data: {
        isStopped: !isGameRunning()
    },
    methods: {
        startGame: function() {
            game.start();
            updateState();
        }
    }
});

var stop = new Vue({
    el: '#stopbtn',
    data: {
        isRunning: isGameRunning()
    },
    methods: {
        stopGame: function() {
            game.reset();
            updateState();
        }
    }
});

var gamestate;

function isGameRunning() {
    if (gamestate != null && gamestate.state == "running") {
        return true;
    }
    return false;
}

function updateState() {
    gamestate = game.getGameState();
    start.isStopped = !isGameRunning();
    stop.isRunning = isGameRunning();

    if (timeremaining.timeremaining != gamestate.timeremaining) {
        timeremaining.timeremaining = gamestate.timeremaining;
    }
    
    if (!gamestate.baseword) {
        word.message = "empty";
        wordperms.perms = [ { text: "empty" } ];
    }
    else if (word.message != gamestate.baseword.word) {
        word.message = gamestate.baseword.word;
        wordperms.perms = new Array();
        for (var i = 0; i < gamestate.baseword.perms.length; i++) {
            wordperms.perms.push({ text: gamestate.baseword.perms[i]});
        }
    }
}
updateState();
setInterval(updateState, 500);





