import { TipusCodiDescripcio } from './tipus-codi-descripcio';
import { TipusMestreListMetadata } from './tipus-mestre-list-metadata';

export interface TipusMestreList {
    list?: Array<TipusCodiDescripcio>;
    metadata?: TipusMestreListMetadata;
}

