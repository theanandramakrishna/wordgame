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
test("Last word is zounds", () => {
    game.setBaseword(8100);
    expect(game.getBaseword().word).toBe("zounds");
});
