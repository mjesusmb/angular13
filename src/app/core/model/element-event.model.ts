import { ElementEventType } from './element-event-type.model';
export interface ElementEvent {
    data: any;
    type: ElementEventType;
}
