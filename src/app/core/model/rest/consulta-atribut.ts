import { Traduccio } from "./consulta-traduccio";

export interface Atribut {
    codiUsuari?: string;
    dataModificacio?: string;
    id?: string;
    indVigencia?: string;
    tipusAtribut: string;
    trad?: Traduccio[];
}