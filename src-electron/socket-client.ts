import { io, Socket } from 'socket.io-client';
import { Client } from './socket-server';

/**
 * SocketClient class
 *
 * @author Fabien Bellanger
 */
export class SocketClient {
    private _socket: Socket;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     * @param url: string Server URL
     */
    constructor(url: string) {
        console.log(`===> Connecting Socket Client to server on ${url}...`);

        this._socket = io(url);

        this._socket.on('connect', () => {
            console.log(`===> Connect to server with ID ${this._socket.id}`);
        });

        this._socket.on('disconnect', () => {
            console.log('===> Disonnect from server');
        });

        this._socket.on('get_client', () => {
            console.log('======> [get_client] Received from server');

            this._socket.emit(
                'get_client_info',
                new Client('127.0.0.1', 3333, 'Terminal 2')
            );
        });
    }
}
