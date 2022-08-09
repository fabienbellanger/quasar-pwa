import Device from './device';
import configFile from './config.json';
import ip from 'ip';

interface Database {
    path: string;
}

/**
 * Config class
 *
 * @author Fabien Bellanger
 */
export default class Config {
    private static instance: Config;
    device: Device;
    devicesIP: string[];
    database: Database;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     */
    private constructor() {
        this.device =
            configFile.device !== undefined
                ? new Device(
                      ip.address(),
                      configFile.device.port ?? 0,
                      configFile.device.name ?? '',
                      configFile.device.type ?? '',
                      configFile.device.useSSL ?? false
                  )
                : new Device(ip.address(), 0, '', '', false);
        this.devicesIP = configFile.devicesIPList ?? [];
        this.database = { path: configFile.database.path ?? '' };
    }

    /**
     * Return a unique instance of Config class
     *
     * @author Fabien Bellanger
     * @return Config instance
     */
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }

        return Config.instance;
    }
}
