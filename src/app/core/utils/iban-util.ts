import { Str } from './string-util';
import { Num } from './number-util';

export class Iban {
    public static verificarDc(maskedCC: string): boolean {
        let calculatedDc: string = '';
        let checkDc: string = 'XX';

        if (maskedCC) {
            let accountNumber: string = Iban.cc(maskedCC);
            let bankAndbranch: string = Iban.banc(maskedCC) + Iban.sucursal(maskedCC);
            checkDc = Iban.dc(maskedCC);
            calculatedDc = Iban.calculaDCParcial(bankAndbranch) + Iban.calculaDCParcial(accountNumber);
        }

        return calculatedDc === checkDc;
    }

    public static calculaDCParcial(cadena) {
        // https://es.wikipedia.org/wiki/C%C3%B3digo_cuenta_cliente#D%C3%ADgitos_de_control
        let dcParcial: number = 0;
        let tablaPesos: number[] = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        let suma: number = 0;
        let i: number;

        for (i = 0; i < cadena.length; i++) {
            suma = suma + cadena.charAt(cadena.length - 1 - i) * tablaPesos[i];
        }

        dcParcial = 11 - (suma % 11);

        if (dcParcial === 11) {
            dcParcial = 0;
        } else if (dcParcial === 10) {
            dcParcial = 1;
        }

        return dcParcial.toString();
    }

    public static calculateIbanCheckCode(cc: string): string {
        let kk: string = '??';

        if (cc) {
            const E: string = '14';
            const S: string = '28';
            let suffix = E + S + '00'; // '142800'
            let toMod: string = cc + suffix;
            let modResult: number = Num.modulo(toMod, 97);
            let intKk: number = 98 - modResult;
            kk = intKk.toString();
            kk = Str.padStart(kk, 2, '0');
        }

        return kk;
    }

    public static buildIban(maskedCc: string): string {
        let unmaskedCc: string = Iban.unMask(maskedCc);

        return (
            'ES' +
            Iban.calculateIbanCheckCode(unmaskedCc) +
            ' ' +
            Iban.banc(maskedCc) +
            ' ' +
            Iban.sucursal(maskedCc) +
            ' ' +
            Iban.dc(maskedCc) +
            Iban.cc(maskedCc).substr(0, 2) +
            ' ' +
            Iban.cc(maskedCc).substr(2, 8)
        );
    }

    public static banc(maskedCc): string {
        let unmaskedCc: string = Iban.unMask(maskedCc);
        return Str.padEnd(unmaskedCc.substr(0, 4), 4, '0');
    }

    public static sucursal(maskedCc): string {
        let unmaskedCc: string = Iban.unMask(maskedCc);
        return Str.padEnd(unmaskedCc.substr(4, 4), 4, '0');
    }

    public static dc(maskedCc): string {
        let unmaskedCc: string = Iban.unMask(maskedCc);
        return Str.padEnd(unmaskedCc.substr(8, 2), 2, '0');
    }

    public static cc(maskedCc): string {
        let unmaskedCc: string = Str.replaceAll(Str.replaceAll(maskedCc, '_', '0'), '-', '');
        return Str.padEnd(unmaskedCc.substr(10, 10), 10, '0');
    }

    public static unMask(maskedCc: string): string {
        if (maskedCc) {
            return Str.replaceAll(Str.replaceAll(maskedCc, '_', '0'), '-', '');
        }

        return '';
    }
}
