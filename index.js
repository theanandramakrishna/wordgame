const electron = require("electron");
const game = require("./game");

var win;

function createWindow() {
    if (win != null)
    {
        return;
    }

    win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences : {
            nodeIntegration: true
        }
    });

    win.loadFile("index.html");
    win.on("closed", () => {
        win = null;
    });
}

electron.app.on("ready", createWindow);
electron.app.on("activate", createWindow);

game.init();


