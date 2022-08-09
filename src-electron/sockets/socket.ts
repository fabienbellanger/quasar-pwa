import { SocketServer } from './socket-server';
import { SocketClient } from './socket-client';
import Device from '../device';
import Config from '../config';

/**
 * Socket class
 *
 * @author Fabien Bellanger
 */
class Socket {
    private _server: SocketServer;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     */
    // constructor() {}

    /**
     * Start server
     *
     * @author Fabien Bellanger
     */
    start() {
        // Configuration
        // -------------
        const configFile = Config.getInstance();

        // Start server
        // ------------
        // TODO: Cover port = 0 case
        this._server = new SocketServer(configFile.device.port);

        // TODO: Connect application to others servers
        // Liste des clients issue d'un fichier de config (auto ?)
        const devices = this._server.devices;
        console.log('Devices :', devices);
        for (const id in devices) {
            new SocketClient(devices[id]);
        }
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
