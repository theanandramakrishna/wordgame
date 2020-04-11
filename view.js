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

var wordVue = new Vue({
    el: '#word',
    data: {
      message: DEFAULT_WORD
    }
});

var wordpermsVue = new Vue({
    el: '#wordperms',
    data: {
      perms: DEFAULT_PERMS
    }
});

var timeremainingVue = new Vue({
    el: '#timeremaining',
    data: {
        timeremaining: 'Timer Value'
    }
});

var startVue = new Vue({
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
            wordEntryVue.$el.focus();
            updateState();
        }
    }
});

var stopVue = new Vue({
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

var wordEntryVue = new Vue({
    el: '#entrytext',
    data: {
        entryText: ""
    },
    methods: {
        onEnter: function() {
            addwordVue.addWord();
        }
    }
});

var addwordVue = new Vue({ 
    el: '#addwordbtn',
    methods: {
        addWord: function() {
            game.addWord(wordEntryVue.entryText);
            wordEntryVue.entryText = "";
            updateState();
        }
    }
});

var pointsVue = new Vue({
    el: '#pointscount',
    data: {
        points: 0
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
    startVue.isStopped = !isGameRunning();
    stopVue.isRunning = isGameRunning();

    if (timeremainingVue.timeremaining != gamestate.timeremaining) {
        timeremainingVue.timeremaining = gamestate.timeremaining;
    }
    if (pointsVue.points != gamestate.points) {
        pointsVue.points = gamestate.points;
    }
    
    if (!gamestate.baseword) {
        for (var j = 0; j < wordpermsVue.perms.length; j++) {
            wordpermsVue.perms[j].guessed = true;
        }
    }
    else if (wordVue.message != gamestate.baseword.scrambled) {
        wordVue.message = gamestate.baseword.scrambled;
        wordpermsVue.perms = new Array();
        for (var i = 0; i < gamestate.baseword.perms.length; i++) {
            var emptyword = "";
            for (var x = 0; x < gamestate.baseword.perms[i].perm.length; x++) {
                emptyword = emptyword + "_ ";
            }

            wordpermsVue.perms.push({ 
                text: gamestate.baseword.perms[i].perm,
                hiddentext: emptyword,
                guessed: gamestate.baseword.perms[i].guessed
            });
        }
    }
    else {
        for (var k = 0; k < gamestate.baseword.perms.length; k++) {
            wordpermsVue.perms[k].guessed = gamestate.baseword.perms[k].guessed;
        }
    }
    
}
updateState();
setInterval(updateState, 500);





