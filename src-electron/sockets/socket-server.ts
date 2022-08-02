import { Server, Socket } from 'socket.io';
import Config from '../config';
import Device from '../device';

/**
 * HashMap of Device
 *
 * @author Fabien Bellanger
 */
interface Devices {
    [socketId: string]: Device;
}

/**
 * SocketServer class
 *
 * @author Fabien Bellanger
 */
class SocketServer {
    private _io: Server;
    devices: Devices;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     * @param {number} port Server port
     */
    constructor(port: number) {
        // Configuration
        // -------------
        const configFile = Config.getInstance();
        console.log(configFile);

        // Lancement serveur
        // -----------------
        port = configFile.device.port ?? port;
        console.log(`===> Starting Socket Server on port ${port}...`);
        this._io = new Server(port, {
            /* options */
        });

        // Récupération des devices
        // ------------------------
        this.devices = {};

        this._io.on('connection', (socket) => {
            console.log('======> Client connected... | ID: ', socket.id);

            socket.on('disconnect', (reason) => {
                console.log(`===> Client disconnected for reason: ${reason}`);

                delete this.devices[socket.id];
            });

            this.addDevice(socket);
        });
    }

    /**
     * Add device to devices list
     *
     * @author Fabien Bellanger
     * @param {Socket} socket Socket
     */
    private addDevice(socket: Socket) {
        socket.emit('get_device');
        socket.on('get_device_info', (device: Device) => {
            console.log(
                '======> [get_device_info] Receive device info...' + device.ip
            );
            this.devices[socket.id] = device;

            console.log(this.devices);
        });
    }
}

export { Devices, SocketServer };
