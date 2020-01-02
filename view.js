var word = new Vue({
    el: '#word',
    data: {
      message: 'Word will come here'
    }
});

var wordperms = new Vue({
    el: '#wordperms',
    data: {
      message: 'Word perms will come here'
    }
});

var start = new Vue({
    el: '#startbtn',
    methods: {
        startGame: function() {
            alert('Start the game');
        }
    }
});





