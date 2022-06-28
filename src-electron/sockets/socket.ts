import { Client, SocketServer } from './socket-server';
import { SocketClient } from './socket-client';

/**
 * Socket class
 *
 * @author Fabien Bellanger
 */
class Socket {
    private _configFile: string;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     * @param {string} configFile Config file path
     */
    constructor(configFile: string) {
        this._configFile = configFile;
    }

    start() {
        // Start server
        new SocketServer(3333);

        // Start clients
        // Liste des clients issue d'un fichier de config
        for (let i = 0; i < 3; i++) {
            new SocketClient(
                new Client('127.0.0.1', 3333, `Self ${i + 1}`, false)
            );
        }
    }
}

export { Socket };
