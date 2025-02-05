export class Cif {
    public static validate(cif: string): boolean {
        if (!cif) {
            return false;
        }

        if (cif.length !== 9) {
            return false;
        }

        // Sumamos los A y B
        let a: number = 0;
        let b: number = 0;
        let calculo = new Array(0, 2, 4, 6, 8, 1, 3, 5, 7, 9);
        let x: number;

        for (x = 2; x <= 6; x += 2) {
            a = a + Number(cif.substr(x, 1));
            b = b + calculo[Number(cif.substr(x - 1, 1))];
        }

        b += calculo[Number(cif.substr(x - 1, 1))];

        // C como suma de a+b
        let c: number = a + b;

        // El calculo de D
        let d: number = 10 - (c % 10);
        let codigos = new Array('J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');

        let dc = cif.substr(cif.length - 1, 1);

        return dc === d.toString() || dc === codigos[d];
    }
}
