import { Client, SocketServer } from './socket-server';
import { SocketClient } from './socket-client';
import serversList from '../../local-ws-servers.json';

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
        const servers = serversList as Client[];
        for (const server of servers) {
            new SocketClient(server);
        }
    }
}

export { Socket };
