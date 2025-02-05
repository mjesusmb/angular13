import { TipusIncidenciaFrontendDadesContexte } from './tipus-incidencia-frontend-dades-context';

export interface TipusIncidenciaFrontend {
    /**
     * Identificador de l'entitat. Quan es fa un POST, aquesta propietat,
     * s'envia a servidor buida i torna de servidor informada si no hi ha hagut error
     * en la inserció. Quan es fa un GET o un PUT aquest valor ha d'anar informat.
     */
    id?: number;

    /**
     * Missatge descriptiu de l'error
     */
    missatge?: string;

    /**
     * La stack trace capturada pel client
     */
    stackTrace?: string;

    /**
     * El user agent del navegador web del client.
     */
    userAgent?: string;

    /**
     * La url de la petició
     */
    urlPeticio?: string;

    /**
     * El método de la petició (GET,POST,PUT,DELETE)
     */
    metodePeticio?: string;

    /**
     * Els noms i valors del paràmetres de la petición tant del header, de la query o del body.
     */
    parametresPeticio?: Array<TipusIncidenciaFrontendDadesContexte>;

    /**
     * El codi HTTP de la resposta (Exemples 400,404,422,500,...)
     */
    codiResposta?: string;

    /**
     * El continugt HTTP de la resposta.
     */
    contingutResposta?: string;

    /**
     * Codi de la incidència generat per l'acplicació i que s’envia al client.
     * ( Es genera en el moment de desar la incidència i el retorna. Es composa
     * de MODUL_CAS_US_<DATA:170101><Numero sequencial de 6 digits>
     */
    codiIncidencia?: string;

    /**
     * El nif de l'usuari que ha fet la petició. Es informat per l'aplicació.
     */
    usuari?: string;

    /**
     * Data de creació de la incidència en format DD/MM/YYYY HH:MM. Es informat per l'aplicació.
     */
    dataPeticio?: string;
}
