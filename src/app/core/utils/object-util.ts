import { get as _get } from 'lodash';

export abstract class Obj {
    public static clone(target: any): any {
        if (!target) {
            return null;
        }

        let str: string = JSON.stringify(target);

        return JSON.parse(str);
    }

    public static notNull(target: any, props: any = null): boolean {
        if (target === null || typeof target === 'undefined') {
            return false;
        }

        if (props) {
            const value: any = _get(target, props);
            return value !== null && typeof value !== 'undefined';
        }
    }
}
