const wordlist_eng = require("wordlist-english");

const BASELENGTH = 6;

var basewords = null;

exports.init = function() {
    if (basewords != null) {
        return;
    }

    // Build base words
    var basewords = buildBasewords();
}

exports.getBasewords = function() {
    return basewords;
}

var lists;

exports.isWord = function(word) {
    var listLength = lists.length;
    while (listLength != -1) {
        if (lists[listLength-1].indexOf(word) != -1) {
            return true;
        } else {
            listLength = listLength - 1;
        }
    }
    return false;
    /*
    if (wordlist_eng["english"].indexOf(word) != -1) {
        return true;
    }
    return false;
    */
}

exports.BASELENGTH = BASELENGTH;


function buildBasewords() {
    lists = [
        wordlist_eng["english/10"],    // Common words
        wordlist_eng["english/20"],
        wordlist_eng["english/35"],
        wordlist_eng["english/40"],
        wordlist_eng["english/50"],
        wordlist_eng["english/55"],
        wordlist_eng["english/60"]
        // wordlist_eng["english/70"]   // Exclude bizarre words
    ];
    basewords = new Array();
    for (var i = 0; i < lists.length; i++) {
        for (var j = 0; j < lists[i].length; j++) {
            if (lists[i][j].length == BASELENGTH) {
                basewords.push(lists[i][j]);
            }
        }
    }

    return basewords;
}
