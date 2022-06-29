/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron/renderer';

contextBridge.exposeInMainWorld('appAPI', {
    ip: () =>
        ipcRenderer
            .invoke('appAPI:ip')
            .then((ip: string | undefined) => {
                return ip;
            })
            .catch((error) => {
                return error;
            }),
});

contextBridge.exposeInMainWorld('printAPI', {
    test: () =>
        ipcRenderer
            .invoke('printAPI:test')
            .then(() => {
                console.log('Print OK');
            })
            .catch((error) => {
                console.error(error);
            }),
});

contextBridge.exposeInMainWorld('saleAPI', {
    test: () =>
        ipcRenderer
            .invoke('saleAPI:test')
            .then(() => {
                console.log('Sale OK');
            })
            .catch((error) => {
                console.error(error);
            }),
});
