"use strict";

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
var mainWordList;
exports.isWord = function(word) {
    if (word.length < 6) {
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].indexOf(word) != -1) {
                return true;
            }
        }
    } else if (word.length == 6) {
        for (var j = 0; j < mainWordList.length; j++) {
            if (mainWordList[j].indexOf(word) != -1) {
                return true;
            }
        }
    }
    return false;
}

exports.BASELENGTH = BASELENGTH;


function buildBasewords() {
    basewords = new Array();
    
    lists = [
        wordlist_eng["english/10"],    // Common words
        wordlist_eng["english/20"],
        wordlist_eng["english/35"]
        //wordlist_eng["english/40"],
        //wordlist_eng["english/50"],
        //wordlist_eng["english/55"],
        //wordlist_eng["english/60"]
        // wordlist_eng["english/70"]   // Exclude bizarre words
    ];

    mainWordList = [
        wordlist_eng["english/10"],
        wordlist_eng["english/20"]
    ];

    for (var i = 0; i < mainWordList.length; i++) {
        for (var j = 0; j < mainWordList[i].length; j++) {
            if (mainWordList[i][j].length == BASELENGTH) {
                basewords.push(mainWordList[i][j]);
            }
        }
    }

    return basewords;
}
