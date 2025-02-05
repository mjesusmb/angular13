import { Traduccio } from "./consulta-traduccio";
import { ConsultaBaseResultat } from "./consulta-base-resultat";
import { Atribut } from "./consulta-atribut";
import { recursUnitat } from "./consulta-recursUnitat";



export interface CercaRecursResultat  {
    data: CercaRecursResultatResum;
    
}

export interface CercaRecursResultatResum extends ConsultaBaseResultat{
    included:CercaRecursResultatData[]
}


export interface CercaRecursResultatData {
    id?: string;
    codiInventari?: string;
    descRecurs ?: string;
    descTipus?: string;
}

