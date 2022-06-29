import { io, Socket } from 'socket.io-client';
import { Client } from './socket';

/**
 * SocketClient class
 *
 * @author Fabien Bellanger
 */
export class SocketClient {
    private _socket: Socket;
    private _client: Client;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     * @param {Client} client Client
     */
    constructor(client: Client) {
        this._client = client;

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

        this.sendClientInfo();
    }

    /**
     * Construct URL from Client
     *
     * @author Fabien Bellanger
     * @private
     * @returns {string} URL
     */
    private _getURL(): string {
        let url = this._client.useSSL ? 'wss://' : 'ws://';

        url += `${this._client.ip}:${this._client.port}`;

        return url;
    }

    /**
     * Send Client info to the server
     *
     * @author Fabien Bellanger
     */
    sendClientInfo() {
        this._socket.on('get_client', () => {
            console.log('======> [get_client] Received from server');

            this._socket.emit('get_client_info', this._client);
        });
    }
}
