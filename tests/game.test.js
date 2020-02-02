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
    expect(game.getGameState().baseword.perms.length).toBe(14);
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
