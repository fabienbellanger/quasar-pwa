import { SocketServer } from './socket-server';
import { SocketClient } from './socket-client';
import Device from '../device';

/**
 * Socket class
 *
 * @author Fabien Bellanger
 */
class Socket {
    private _configFile: string;
    private _server: SocketServer;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     * @param {string} configFile Config file path
     */
    constructor(configFile: string) {
        this._configFile = configFile;
    }

    /**
     * Start server
     *
     * @author Fabien Bellanger
     */
    start() {
        // Start server
        this._server = new SocketServer(3333);

        // TODO: Start clients
        // Liste des clients issue d'un fichier de config
        // const servers = serversList as Client[];
        // for (const server of servers) {
        //     new SocketClient(server);
        // }
    }

    /**
     * Returns connected devices
     *
     * @author Fabien Bellanger
     * @returns {Client[]}
     */
    devices() {
        const devices: Device[] = [];

        for (const id in this._server.devices) {
            devices.push(this._server.devices[id]);
        }

        return devices;
    }
}

export { Socket };
