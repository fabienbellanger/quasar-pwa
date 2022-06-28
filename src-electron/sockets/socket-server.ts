import { Server, Socket } from 'socket.io';

/**
 * Client class
 *
 * @author Fabien Bellanger
 */
class Client {
    public ip: string;
    public port: number;
    public name: string;
    public type: string;
    public useSSL: boolean;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     * @param {string} ip IP
     * @param {number} port Port
     * @param {string} name Name
     */
    constructor(ip: string, port: number, name: string, useSSL: boolean) {
        this.ip = ip;
        this.port = port;
        this.name = name;
        this.type = 'pos';
        this.useSSL = useSSL;
    }
}

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
            console.log('======> [get_client_info] Receive client info...');
            this.clients[socket.id] = client;

            console.log(this.clients);
        });
    }
}

export { Client, Clients, SocketServer };
