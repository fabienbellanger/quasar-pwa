import { Database } from 'sqlite3';
import Config from './config';

/**
 * Database class
 *
 * @author Fabien Bellanger
 */
class DB {
    private _db: Database;
    private _path: string;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     * @param path string Database path file
     */
    constructor(path?: string) {
        // Configuration
        // -------------
        const configFile = Config.getInstance();
        this._path = configFile.database.path ?? path;

        console.log(`===> Connecting sqlite database '${this._path}'...`);
        this._db = new Database(this._path);
    }

    /**
     * Get database path
     *
     * @author Fabien Bellanger
     * return string
     */
    get path(): string {
        return this._path;
    }

    /**
     * Test
     *
     * @author Fabien Bellanger
     */
    test() {
        this._db.serialize(() => {
            this._db.each('SELECT * FROM test', (err, row) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(row);
                }
            });
        });

        this._db.close();
    }
}

export { DB };
