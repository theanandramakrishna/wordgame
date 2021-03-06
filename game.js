"use strict";

const wordlist = require("./wordlist");
const MINWORDLENGTH = 3;
const MINPERMUTATIONS = 10;

var gamestate = {
    state:  "stopped",  // Can be either stopped or running
    baseword: null,
    timeremaining: null,
    points: 0,
    stats: null
};

exports.init = function() {
    wordlist.init();
    initStats();
}

function initStats() {
    gamestate.stats = {
        gamecount: 0,
        threeltrcount: 0,
        fourltrcount: 0,
        fiveltrcount: 0,
        sixltrcount: 0,
        totalpoints: 0
    }
}
exports.initStats = initStats;

exports.start = function(dontpickword) {
    gamestate.state = "running";
    if (!dontpickword)
    {
        pickBaseword();
    }
    countdown(2 * 60);    // Countdown for 2 minutes
}

function reset() {
    gamestate.state = "stopped";
    gamestate.points = 0;
    gamestate.baseword = null;
    gamestate.timeremaining = 0;
}
exports.reset = reset;

function normalreset() {
    if (gamestate.baseword) {
        gamestate.stats.gamecount = gamestate.stats.gamecount + 1;
        gamestate.stats.totalpoints = gamestate.stats.totalpoints + gamestate.points;
        for (var i = 0; i < gamestate.baseword.perms.length; i++) {
            if (gamestate.baseword.perms[i].guessed) {
                switch (gamestate.baseword.perms[i].perm.length) {
                    case 3: 
                        gamestate.stats.threeltrcount = gamestate.stats.threeltrcount + 1;
                        break;
                    case 4:
                        gamestate.stats.fourltrcount = gamestate.stats.fourltrcount + 1;
                        break;
                    case 5: 
                        gamestate.stats.fiveltrcount = gamestate.stats.fiveltrcount + 1;
                        break;
                    case 6:
                        gamestate.stats.sixltrcount = gamestate.stats.sixltrcount + 1;
                        break;
                    default:
                        break;
                }
            }
        }
    }
    reset();
}

// Just a test mock
exports.setBaseword = setBaseword; 
function setBaseword(num) {
    gamestate.baseword = new Object();
    gamestate.baseword.word = wordlist.getBasewords()[num];
    var perms = permuteWord(wordlist.getBasewords()[num]);
    gamestate.baseword.perms = new Array();
    for (var i = 0; i < perms.length; i++) {
        gamestate.baseword.perms.push({
            perm: perms[i],
            guessed: false
        });
    }
    gamestate.baseword.scrambled = scrambleWord(gamestate.baseword.word);
    return gamestate.baseword;
}

exports.getGameState = function() {
    return gamestate;
}

exports.addWord = function(word) {
    for (var i = 0; i < gamestate.baseword.perms.length; i++) {
        if (gamestate.baseword.perms[i].perm === word) {
            gamestate.baseword.perms[i].guessed = true;
            gamestate.points = gamestate.points + gamestate.baseword.perms[i].perm.length - 2;
            return true;
        }
    }
    if (areWordsGuessed() == true) {
        normalreset();
    }
    return false;
}

function areWordsGuessed() {
    for (var i = 0; i < gamestate.baseword.perms.length; i++) {
        if (gamestate.baseword.perms[i].guessed == false) {
            return false;
        }
    }
    return true;
}


function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

function pickBaseword() {
    var basewords = wordlist.getBasewords();

    while (true) {
        setBaseword(getRandomNum(basewords.length));

        if (gamestate.baseword.perms.length >= MINPERMUTATIONS) {
            break;
        }
    }
}

//
// Take in a string.
// Return a list of possible permutations of the string that are also words
//

function permuteWord(word) {
    var perms = new Array();

    for (var subwordLength = MINWORDLENGTH; 
        subwordLength <= wordlist.BASELENGTH; 
        subwordLength++) {
        permuteWordRecurse(word, new Array(), subwordLength, perms);
    }
    return perms;
}

//
// word
// indexChoices is list of indices that have been chosen so far
// count is total number of indices to choose
//

function permuteWordRecurse(word, indexChoices, count, perms) {
    for (var i = 0; i < word.length; i++) {
        if (indexChoices.indexOf(i) != -1) {
            continue;
        }

        indexChoices.push(i);

        if (indexChoices.length != count) {
            permuteWordRecurse(word, indexChoices, count, perms);
        }
        else {
            var permWord = "";
            for (var j = 0; j < indexChoices.length; j++) {
                permWord = permWord.concat(word[indexChoices[j]]);
            }

            if (wordlist.isWord(permWord)) {
                // legit word
                if (perms.indexOf(permWord) == -1) {
                    // Only add if not already a dupe of something already there.
                    // this can happen in a word like "accept", where there are
                    // two ways to spell "ace".
                    perms.push(permWord);
                }
            }
        }
        indexChoices.pop();
    }
}

function countdown(seconds) {
    gamestate.timeremaining = seconds;
    function tick() {
        gamestate.timeremaining = gamestate.timeremaining - 1;
        if (gamestate.timeremaining > 0) { 
            //keep running tick function every second until second reaches 0
            setTimeout(tick, 1000);
        } else {
            normalreset();
      }
    }
    tick();
}
function scrambleWord(word) {
    var wordArray = word.split('');
    var scrambledWord = '';
    while (wordArray.length > 0) {
        var i = wordArray.splice(wordArray.length * Math.random(), 1);
        scrambledWord = scrambledWord + i;
    }
    if (scrambledWord == word) {
        scrambleWord(scrambledWord)
    }
    return scrambledWord;
}
exports.countdown = countdown;
