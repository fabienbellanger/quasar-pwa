import { app, BrowserWindow, nativeTheme } from 'electron';
import path from 'path';
import os from 'os';
import { Socket } from './sockets/socket';
import { IPC } from './ipc/ipc';
import { DB } from './database';

// Needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
    if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
        require('fs').unlinkSync(
            path.join(app.getPath('userData'), 'DevTools Extensions')
        );
    }
} catch (_) {}

let mainWindow;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
        width: 1400,
        height: 800,
        useContentSize: true,
        webPreferences: {
            contextIsolation: true,
            // More info: /quasar-cli/developing-electron-apps/electron-preload-script
            preload: path.resolve(
                __dirname,
                process.env.QUASAR_ELECTRON_PRELOAD || ''
            ),
        },
    });

    mainWindow.loadURL(process.env.APP_URL);

    if (process.env.DEBUGGING) {
        // If on DEV or Production with debug enabled
        mainWindow.webContents.openDevTools();
    } else {
        // We're on production; no access to devtools pls
        mainWindow.webContents.on('devtools-opened', () => {
            mainWindow.webContents.closeDevTools();
        });
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // WebSockets
    // ----------
    const socket = new Socket();
    socket.start();

    // IPC
    // ---
    IPC.start(socket);

    // Database
    // --------
    const db = new DB();
    db.test();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
