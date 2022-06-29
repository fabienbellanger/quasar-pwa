import { SocketServer } from './socket-server';
import { SocketClient } from './socket-client';
import serversList from '../../local-ws-servers.json';

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

        // Start clients
        // Liste des clients issue d'un fichier de config
        const servers = serversList as Client[];
        for (const server of servers) {
            console.log('------', server);
            new SocketClient(server);
        }
    }

    /**
     * Returns connected clients
     *
     * @author Fabien Bellanger
     * @returns {Client[]}
     */
    servers() {
        const servers: Client[] = [];

        for (const id in this._server.clients) {
            servers.push(this._server.clients[id]);
        }

        return servers;
    }
}

export { Client, Socket };
