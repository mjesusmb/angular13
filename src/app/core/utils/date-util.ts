import { Config } from '../config/config';

import * as moment_ from 'moment';
const moment = moment_;

export class DateUtil {
    public static stringJsonToDate(data: string): Date {
        return moment(data, Config.api.formatData).toDate();
    }

    public static dateToStringJson(data: Date): string {
        return moment(data).format(Config.api.formatData);
    }

    public static dateToString(data: Date): string {
        return moment(data).format(Config.ui.formatData);
    }

    public static dateToStringDataHora(data: Date): string {
        return moment(data).format(Config.ui.formatDataHora);
    }

    public static dateToStringHora(data: Date): string {
        /*HH:mm*/
        return moment(data).format(Config.ui.formatHora);
    }

    public static dateToStringJsonFormat(data: Date, format: string): string {
        return moment(data).format(format);
    }

    public static stringFormatToStringJson(data: string, format: string): string {
        return moment(data, format).format(Config.api.formatDataHora);
    }

    public static stringJsonToStringDate(data: string): string {
        return moment(data).format(Config.ui.formatData);
    }

    public static stringJsonToDateTime(data: string): Date {
        return moment(data, Config.api.formatDataHora).toDate();
    }

    public static dateTimeToStringJson(data: Date): string {
        return moment(data).format(Config.api.formatDataHora);
    }

    public static stringJsonToStringDateTime(data: string): string {
        return moment(data, Config.api.formatDataHora).format(Config.ui.formatDataHora);
    }

    public static stringDateToStringJson(data: string): string {
        return moment(data, Config.ui.formatData).format(Config.api.formatData);
    }

    public static toEpoch(date: Date): number {
        return moment(date).valueOf();
    }

    public static fromEpoch(epoch: number): Date {
        return moment(epoch).toDate();
    }
}
