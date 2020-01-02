const wordlist = require("./wordlist");
const MINWORDLENGTH = 3;
const MINPERMUTATIONS = 10;

var baseword = null;

exports.init = function() {
    wordlist.init();
}

exports.start = function() {
    pickBaseword();
}

exports.reset = function() {
    baseword = null;
}

function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

function pickBaseword() {
    var basewords = wordlist.getBasewords();

    while (true) {
        baseword = new Object();
        baseword.word = basewords[getRandomNum(basewords.length)];
        baseword.perms = permuteWord(basewords[i]);

        if (perms.length >= MINPERMUTATIONS) {
            break;
        }
    }
}

// Just a test mock
exports.setBaseword = function(num) {
    baseword = new Object();
    baseword.word = wordlist.getBasewords()[num];
    baseword.perms = permuteWord(wordlist.getBasewords()[num]);

    return baseword;
}

exports.getBaseword = function() {
    return baseword;
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
            for (j = 0; j < indexChoices.length; j++) {
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
exports.countdown = function(seconds) {
    var seconds = seconds;
    function tick() {
      seconds = seconds - 1;
      if (seconds > 0) { 
        //keep running tick function every second until second reaches 0
        setTimeout(tick, 1000);
      } else {
        exports.reset();
      }
    }
    tick();
}