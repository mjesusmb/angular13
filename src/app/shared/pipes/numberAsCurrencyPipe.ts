import { Pipe, PipeTransform } from '@angular/core';
import { Num } from 'app/core/utils/number-util';

@Pipe({
    name: 'asCurrency'
})
export class NumberAsCurrencyPipe implements PipeTransform {
    transform(value: number, ...args: any[]): any {
        if (!value) {
            return Num.asCurrency(0);
        }

        return Num.asCurrency(value);
    }
}
