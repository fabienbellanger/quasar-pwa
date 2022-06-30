import Device from './device';
import config from './config.json';

/**
 * Config class
 *
 * @author Fabien Bellanger
 */
export default class Config {
    devices: Device[];

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     */
    constructor() {
        this.devices = [];
    }
}
