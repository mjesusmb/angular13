import { ConsultaBaseFiltre } from "./consulta-base-filtre";

export interface ReservaFiltre extends ConsultaBaseFiltre {
    filtres?:{
        codiIdioma?: string;
        dataResIni?: string;
        dataResFi?: string;
        idRecurs?: string;
        idUnitat?: string;
    }

}