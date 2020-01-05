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
    methods: {
        startGame: function() {
            game.start();
            var baseword = game.getBaseword();
            word.message = baseword.word;
            wordperms.perms = new Array();
            for (var i = 0; i < baseword.perms.length; i++) {
                wordperms.perms.push({ text: baseword.perms[i]});
            }
        }
    }
});





