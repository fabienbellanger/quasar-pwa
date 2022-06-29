import { ipcMain } from 'electron';
import ip from 'ip';

/**
 * IPC class
 *
 * @author Fabien Bellanger
 */
class IPC {
    /**
     * Start IPC
     *
     * @author Fabien Bellanger
     * @static
     */
    static start() {
        ipcMain.handle('printAPI:test', () => {
            console.log('============> [IPC][printAPI] TEST PRINT');

            return {};
        });

        ipcMain.handle('saleAPI:test', () => {
            console.log('============> [IPC][saleAPI] TEST SALE');

            return {};
        });

        ipcMain.handle('appAPI:ip', () => {
            return ip.address();
        });
    }
}

export { IPC };
