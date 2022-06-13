/* eslint-disable @typescript-eslint/no-explicit-any */

import { date } from 'quasar';

const CACHE_DURATION = 24; // In hour

/**
 * Storage class
 *
 * @author Fabien Bellanger
 */
export default class Storage {
    private _data: any | null;
    private _validityDatetime: Date;

    /**
     * Constructor
     *
     * @author Fabien Bellanger
     */
    constructor(d?: any | null) {
        const now = new Date();

        this._validityDatetime = date.addToDate(now, { hours: CACHE_DURATION });
        this._data = d;
    }

    /**
     * Set validy date
     *
     * @author Fabien Bellanger
     * @param d Date
     */
    set validity(d: Date) {
        this._validityDatetime = d;
    }

    /**
     * Get data
     *
     * @author Fabien Bellanger
     * @return any | null
     */
    get data(): any | null {
        const now = new Date();

        if (now <= this._validityDatetime) {
            return this._data;
        }
        return null;
    }

    /**
     * Set data
     *
     * @author Fabien Bellanger
     * @param data any
     */
    set data(data: any | null) {
        this.data = data;
    }
}
