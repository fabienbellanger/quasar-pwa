import { Server, Socket } from 'socket.io';
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
        console.log(`===> Starting Socket Server on port ${port}...`);

        this._io = new Server(port, {
            /* options */
        });

        this.devices = {};

        this._io.on('connection', (socket) => {
            console.log('======> Client connected... | ID: ', socket.id);

            socket.on('disconnect', (reason) => {
                console.log(`===> Client disconnected for reason: ${reason}`);

                delete this.devices[socket.id];
            });

            this.addClient(socket);
        });
    }

    /**
     * Add client devices list
     *
     * @author Fabien Bellanger
     * @param {Socket} socket Socket
     */
    private addClient(socket: Socket) {
        socket.emit('get_client');
        socket.on('get_client_info', (client: Device) => {
            console.log(
                '======> [get_client_info] Receive client info...' + client.ip
            );
            this.devices[socket.id] = client;

            // console.log(this.devices);
        });
    }
}

export { Devices, SocketServer };
