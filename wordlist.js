const wordlist_eng = require("wordlist-english");

const BASELENGTH = 6;
var basewords = null;  // List of words from which games will be picked.

exports.init = function() {
    if (basewords != null) {
        return;
    }

    basewords = new Array();
    var commonwords = wordlist_eng["english/10"];
    
    for (var i = 0; i < commonwords.length; i++) {
        if (commonwords[i].length == BASELENGTH) {
            basewords.push(commonwords[i]);
        }
    }
}

