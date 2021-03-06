"use strict";

/* eslint-env jest */

const game = require("../game");

beforeAll(() => {
    game.init();
});

test("First word is accept", () => {
    game.setBaseword(0);
    expect(game.getGameState().baseword.word).toBe("accept");
});

test("accept has 14 perms", () => {
    game.setBaseword(0);
    expect(game.getGameState().baseword.perms.length).toBe(20);
});

test("First perm of accept is ace", () => {
    game.setBaseword(0);
    expect(game.getGameState().baseword.perms[0].perm).toBe("ace");
});

test("Second word is access", () => {
    game.setBaseword(1);
    expect(game.getGameState().baseword.word).toBe("access");
});

test("Last word is yields", () => {
    game.setBaseword(1640);
    expect(game.getGameState().baseword.word).toBe("yields");
 });

test("After 5 seconds, baseword is null", () => {
    game.setBaseword(0);
    expect(game.getGameState().baseword).not.toBe(null);
    game.countdown(5);
    setTimeout(() => {
        expect(game.getGameState().baseword).toBe(null);
    }, 5000);
});
test("Points system works", () => {
    game.setBaseword(0);
    expect(game.getGameState().baseword.word).toBe("accept");
    game.addWord("accept");
    expect(game.getGameState().points).toBe(4);

    game.addWord("pact");
    expect(game.getGameState().points).toBe(6);

    game.addWord("pet");
    expect(game.getGameState().points).toBe(7);

 });
test("Game ends when all words are entered", () => {
    game.setBaseword(0);
    expect(game.getGameState().baseword.word).toBe("accept");
    game.addWord("ace");
    game.addWord("act");
    game.addWord("ape");
    game.addWord("apt");
    game.addWord("ate");
    game.addWord("cap");
    game.addWord("cat");
    game.addWord("eat");
    game.addWord("pat");
    game.addWord("pea");
    game.addWord("pet");
    game.addWord("tap");
    game.addWord("tea");
    game.addWord("cape");
    game.addWord("pace");
    game.addWord("pact");
    game.addWord("pate");
    game.addWord("peat");
    game.addWord("tape");
    game.addWord("accept");
    expect(game.getGameState().state).toBe("stopped");
});
test("Game stats are updated after game play", () => {
    game.initStats();
    game.setBaseword(0);
    expect(game.getGameState().stats.gamecount).toBe(0);
    expect(game.getGameState().stats.threeltrcount).toBe(0);
    expect(game.getGameState().stats.fourltrcount).toBe(0);
    expect(game.getGameState().stats.fiveltrcount).toBe(0);
    expect(game.getGameState().stats.sixltrcount).toBe(0);
    game.addWord("cap");
    game.addWord("pate");
    game.addWord("tape");
    game.addWord("accept");
    game.countdown(1);
    setTimeout(() => {
        expect(game.getGameState().stats.gamecount).toBe(1);
        expect(game.getGameState().stats.threeltrcount).toBe(1);
        expect(game.getGameState().stats.fourltrcount).toBe(2);
        expect(game.getGameState().stats.fiveltrcount).toBe(0);
        expect(game.getGameState().stats.sixltrcount).toBe(1);
    }, 1500);
});
test("Game stats are preserved through multiple games", () => {
    game.initStats();
    game.setBaseword(0);
    game.countdown(1);
    setTimeout(() => {
        expect(game.getGameState().stats.gamecount).toBe(1);
        game.setBaseword(0);
        game.countdown(1);
        setTimeout(() => {
            expect(game.getGameState().stats.gamecount).toBe(2);
        }, 1500);
    }, 1500);
});