import { io, Socket } from 'socket.io-client';
import Device from '../device';

/**
 * SocketClient class
 *
 * @author Fabien Bellanger
 */
export class SocketClient {
    private _socket: Socket;
    private _device: Device;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     * @param {Device} device Device
     */
    constructor(device: Device) {
        this._device = device;

        const url = this._getURL();
        console.log(`===> Connecting Socket Client to server on ${url}...`);

        this._socket = io(url);

        this._socket.on('connect', () => {
            console.log(`===> Connect to server with ID ${this._socket.id}`);
        });

        this._socket.on('disconnect', () => {
            console.log('===> Disconnect from server');
        });

        // this._socket.on('connect_error', () => {
        //     //
        //     console.log('===> Error when connecting to the server');
        // });

        this.sendDeviceInfo();
    }

    /**
     * Construct URL
     *
     * @author Fabien Bellanger
     * @private
     * @returns {string} URL
     */
    private _getURL(): string {
        let url = this._device.useSSL ? 'wss://' : 'ws://';

        url += `${this._device.ip}:${this._device.port}`;

        return url;
    }

    /**
     * Send device info to the server
     *
     * @author Fabien Bellanger
     */
    sendDeviceInfo() {
        this._socket.on('add_device', () => {
            console.log(
                '======> [get_device] Received from server ' + this._device.ip
            );

            this._socket.emit('get_device_info', this._device);
        });
    }
}
