import { padEnd, padStart } from 'lodash';

export abstract class Str {
    public static replaceAll(target: string, search: string, replacement: string): string {
        return target.split(search).join(replacement);
    }

    public static padEnd(target: string, length?: number, chars?: string): string {
        return padEnd(target, length, chars);
    }

    public static padStart(target: string, length?: number, chars?: string): string {
        return padStart(target, length, chars);
    }
}
