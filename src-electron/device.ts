/**
 * Device class
 *
 * @author Fabien Bellanger
 */
export default class Device {
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
     * @param {boolean} useSSL Use SSL?
     */
    constructor(ip: string, port: number, name: string, useSSL: boolean) {
        this.ip = ip;
        this.port = port;
        this.name = name;
        this.type = 'pos';
        this.useSSL = useSSL;
    }
}
