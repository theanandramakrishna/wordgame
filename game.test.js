const game = require("./game");

beforeAll(() => {
    game.init();
});

test("First word is accept", () => {
    game.setBaseword(0);
    expect(game.getBaseword().word).toBe("accept");
});

test("accept has 26 perms", () => {
    game.setBaseword(0);
    expect(game.getBaseword().perms.length).toBe(26);
});

test("First perm of accept is ace", () => {
    game.setBaseword(0);
    expect(game.getBaseword().perms[0]).toBe("ace");
});

test("Second word is access", () => {
    game.setBaseword(1);
    expect(game.getBaseword().word).toBe("access");
});
test("After 5 seconds, baseword is null", () => {
    game.setBaseword(0);
    expect(game.getBaseword()).not.toBe(null);
    game.countdown(5);
    setTimeout(() => {
        expect(game.getBaseword()).toBe(null);
    }, 5000);
});
