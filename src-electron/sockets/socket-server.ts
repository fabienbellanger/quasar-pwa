import { Server, Socket } from 'socket.io';
import { Client } from './socket';

/**
 * HashMap of Client
 *
 * @author Fabien Bellanger
 */
interface Clients {
    [socketId: string]: Client;
}

/**
 * SocketServer class
 *
 * @author Fabien Bellanger
 */
class SocketServer {
    private _io: Server;
    clients: Clients;

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

        this.clients = {};

        this._io.on('connection', (socket) => {
            console.log('======> Client connected... | ID: ', socket.id);

            socket.on('disconnect', (reason) => {
                console.log(`===> Client disconnected for reason: ${reason}`);

                delete this.clients[socket.id];
            });

            this.addClient(socket);
        });
    }

    /**
     * Add client clients list
     *
     * @author Fabien Bellanger
     * @param {Socket} socket Socket
     */
    private addClient(socket: Socket) {
        socket.emit('get_client');
        socket.on('get_client_info', (client: Client) => {
            console.log(
                '======> [get_client_info] Receive client info...' + client.ip
            );
            this.clients[socket.id] = client;

            // console.log(this.clients);
        });
    }
}

export { Client, Clients, SocketServer };
