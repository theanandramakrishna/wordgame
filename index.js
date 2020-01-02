const electron = require("electron");
const wordlist = require("./game");

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

    win.loadFile("index.html")
    .onload = function() {
        display = document.querySelector('#time');
        wordlist.startTimer(120, display);
    }
    win.on("closed", () => {
        win = null;
    });
}

electron.app.on("ready", createWindow);
electron.app.on("activate", createWindow);
wordlist.init();


