// Integration test suite
const path = require("path");
const spectron = require("spectron");
const electronPath = require("electron");

const app = new spectron.Application({
    path: electronPath,
    args: [path.join(__dirname, "..")]   
});

jest.setTimeout(30000); // Set to 30s since starting up electron takes time, more than the default 5s.

beforeAll(() => {
    return app.start();
});

test("Title is word game!", async () => {
    var title = await app.client.waitUntilWindowLoaded().getTitle();
    expect(title).toBe("Word Game!");
});

afterAll(() => {
    if (app != null && app.isRunning()) {
        return app.stop();
    }
});
