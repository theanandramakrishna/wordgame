// Integration test suite
const path = require("path");
const spectron = require("spectron");
const electronPath = require("electron");

const app = new spectron.Application({
    path: electronPath,
    args: [path.join(__dirname, "..")]   
});

const WORD_DEFAULT_VAL = "word";
const PERMS_DEFAULT_VAL = "perm1\n\perm2";

// Set to 30s since starting up electron takes time, more than the default 5s.
jest.setTimeout(30000); 

beforeAll(() => {
    return app.start();
});

test("Title is word game!", async () => {
    var title = await app.client.waitUntilWindowLoaded().getTitle();
    expect(title).toBe("Word Game!");
});

test("Start button exists", async () => {
    var buttonText = await app.client.getText("#startbtn");
    expect(buttonText).toBe("Start");
});

test("word is set to default value", async () => {
    var word = await app.client.getText("#word");
    expect(word).toBe(WORD_DEFAULT_VAL);
});

test("perms are default values", async () => {
    var perms = await app.client.getText("#wordperms");
    expect(perms).toBe(PERMS_DEFAULT_VAL);
});

test ("word is changed after clicking start", async () => {
    await app.client.click("#startbtn");
    var word = await app.client.getText("#word");
    expect(word).not.toBe(WORD_DEFAULT_VAL);
});

test("perms are changed after clicking start", async () => {
    await app.client.click("#startbtn");
    var perms = await app.client.getText("#wordperms");
    expect(perms).not.toBe(PERMS_DEFAULT_VAL);
});

afterAll(() => {
    if (app != null && app.isRunning()) {
        return app.stop();
    }
});
