import { Traduccio } from "./consulta-traduccio";
import { ConsultaBaseResultat } from "./consulta-base-resultat";
import { Atribut } from "./consulta-atribut";
import { recursUnitat } from "./consulta-recursUnitat";



export interface CercaReservaResultat  {
    data: CercaReservaResultatResum;
    
}

export interface CercaReservaResultatResum extends ConsultaBaseResultat{
    included:CercaReservaResultatData[]
}


export interface CercaReservaResultatData {
    id?: string;
    dataReserva?: string;
    horaFi ?: string;
    horaInici?: string;
    descRecurs?: string;
    valor?: string;
}

