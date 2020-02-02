"use strict";

/* eslint-env browser */

const electron = require("electron");
const game = electron.remote.require("./game");

const DEFAULT_WORD = "empty";
const DEFAULT_PERMS = [ 
  { 
      text: 'perm1', 
      hiddentext: '- - - - -',
      guessed: false
  },
  {
      text: 'perm2',
      hiddentext: '- - - - -',
      guessed: false 
  }
];

var word = new Vue({
    el: '#word',
    data: {
      message: DEFAULT_WORD
    }
});

var wordperms = new Vue({
    el: '#wordperms',
    data: {
      perms: DEFAULT_PERMS
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
            var dontpickword = false;
            if (window.test_basewordnum != null && window.test_basewordnum != "") {
                game.setBaseword(window.test_basewordnum);
                dontpickword = true;
            }
            game.start(dontpickword);
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

var wordEntry = new Vue({
    el: '#entrytext',
    data: {
        entryText: ""
    }
});

var addword = new Vue({ // eslint-disable-line no-unused-vars
    el: '#addwordbtn',
    methods: {
        addWord: function() {
            game.addWord(wordEntry.entryText);
            wordEntry.entryText = "";
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
        for (var j = 0; j < wordperms.perms.length; j++) {
            wordperms.perms[j].guessed = true;
        }
    }
    else if (word.message != gamestate.baseword.word) {
        //word.message = gamestate.baseword.scramble;
        wordperms.perms = new Array();
        for (var i = 0; i < gamestate.baseword.perms.length; i++) {
            var emptyword = "";
            for (var x = 0; x < gamestate.baseword.perms[i].perm.length; x++) {
                emptyword = emptyword + "_ ";
            }

            wordperms.perms.push({ 
                text: gamestate.baseword.perms[i].perm,
                hiddentext: emptyword,
                guessed: gamestate.baseword.perms[i].guessed
            });
        }
    }
    else {
        for (var k = 0; k < gamestate.baseword.perms.length; k++) {
            wordperms.perms[k].guessed = gamestate.baseword.perms[k].guessed;
        }
    }
}
updateState();
setInterval(updateState, 500);





