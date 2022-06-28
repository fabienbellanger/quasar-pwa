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
        this._data = d === undefined ? null : d;
    }

    /**
     * Return a Storage object from standard Object
     *
     * @author Fabien Bellanger
     * @param {any} obj
     * @returns
     */
    static from(obj: any): Storage {
        return Object.assign(new Storage(), obj);
    }

    /**
     * Set validy date
     *
     * @author Fabien Bellanger
     * @param {Date} date Date
     */
    set validity(date: Date) {
        this._validityDatetime = date;
    }

    /**
     * Get data
     *
     * @author Fabien Bellanger
     * @return {any | null}
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
     * @param {any} data
     */
    set data(data: any | null) {
        this.data = data;
    }
}
