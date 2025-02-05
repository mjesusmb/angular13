import { Pipe, PipeTransform } from '@angular/core';
import { DateUtil } from 'app/core/utils/date-util';

@Pipe({
    name: 'asFormattedDate'
})
export class AsFormattedDatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            return DateUtil.stringJsonToStringDate(value);
        } else {
            return '--';
        }
    }
}
