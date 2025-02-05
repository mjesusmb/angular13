import { TipusExcepcioEnum } from './tipus-excepcio';

export interface TipusError400 {
    /**
     * El códi de l'error.
     */
    code?: string;

    /**
     * La descripció de l'error.
     */
    message?: string;

    /**
     * La categoria de l'error (validacio, negoci)
     */
    type?: TipusExcepcioEnum;

    key?: string;

    params?: any[];
}

