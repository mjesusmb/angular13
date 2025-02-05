import { Constants } from '../constants';

export abstract class Num {
    public static modulo(target: string, divisor: number): number {
        let resto = 0;
        for (let i = 0; i < target.length; i += 10) {
            let dividendo: any = resto + '' + target.substr(i, 10);
            resto = dividendo % divisor;
        }

        return resto;
    }

    public static asCurrency(num: number): string {
        return num.toLocaleString(Constants.appLocale, { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }

    public static asPercent(num: number): string {
        return num.toLocaleString(Constants.appLocale, { style: 'decimal', maximumFractionDigits: 1, minimumFractionDigits: 1 });
    }
}
