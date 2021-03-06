"use strict";

/* eslint-env jest */
/* eslint-env browser */

// Integration test suite
const path = require("path");
const spectron = require("spectron");
const electronPath = require("electron");

const app = new spectron.Application({
    path: electronPath,
    args: [path.join(__dirname, "..")]   
});

const WORD_DEFAULT_VAL = "empty";
const PERMS_DEFAULT_VAL = "perm1\nperm2";

// Set to 30s since starting up electron takes time, more than the default 5s.
jest.setTimeout(30000); 

beforeAll(() => app.start());

beforeEach(async () => {
    // Make sure that the game is not running before each test
    var stop = await app.client.$("#stopbtn"); 
    if (stop.type == "NoSuchElement") {
        return;
    }
    await app.client.click("#stopbtn");
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

test("stop button should not exist when game is stopped", async () => {
    var stop = await app.client.$("#stopbtn"); 
    expect(stop.type).toBe("NoSuchElement");
});

test("word and perms changed after clicking start", async () => {
    await app.client.click("#startbtn");
    var word = await app.client.getText("#word");
    expect(word).not.toBe(WORD_DEFAULT_VAL);
    var perms = await app.client.getText("#wordperms");
    expect(perms).not.toBe(PERMS_DEFAULT_VAL);
    var start = await app.client.$("#startBtn"); 
    expect(start.type).toBe("NoSuchElement"); // Start should not exist while game running
});

test("stop should exist while game running", async () => {
    await app.client.click("#startbtn");
    var stop = await app.client.getText("#stopbtn");
    expect(stop).toBe("Stop");
});

test("Stop should stop game and enable start", async () => {
    await startGame();
    await stopGame();
    var start = await app.client.getText("#startbtn");
    expect(start).toBe("Start");
});

test("Start game with baseword=access", async () => {
    await app.client.execute(() => {
        window.test_basewordnum = "1";
    });
    //await sleep(100);
    await startGame();
    var word = await app.client.getText("#word");
    word = word.split('').sort().
        join('');
    expect(word).toBe("access");
});

test("Add word 'case' with baseword=access", async () => {
    await app.client.execute(() => {
        window.test_basewordnum = "1";
    });
    await sleep(100);
    await startGame();
    var word = await app.client.getText("#word");
    word = word.split('').sort().
        join('');
    expect(word).toBe("access");

    var hiddenperm = await app.client.getText("#hiddenperm");
    expect(hiddenperm).toEqual([
        "_ _ _", 
        "_ _ _", 
        "_ _ _",
        "_ _ _",
        "_ _ _ _",
        "_ _ _ _",
        "_ _ _ _", 
        "_ _ _ _", 
        "_ _ _ _ _", 
        "_ _ _ _ _ _"
    ]);

    await addWord("case");

    var guessedperm = await app.client.getText("#guessedperm");
    expect(guessedperm).toBe("case");
    var points = await app.client.getText("#pointscount");
    expect(points).toBe("2 points");
});

async function startGame() {
    await app.client.click("#startbtn");
    await sleep(1000);
}

async function stopGame() {
    await app.client.click("#stopbtn");
    await sleep(1000);
}

async function addWord(word) {
    await app.client.setValue("#entrytext", word);
    await app.client.click("#addwordbtn");
    await sleep(1000);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

afterAll(() => {
    if (app != null && app.isRunning()) {
        return app.stop();
    }
    return true;
});
