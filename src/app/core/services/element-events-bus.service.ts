import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ElementEvent, ElementEventType } from '../model';

@Injectable({ providedIn: 'root' })
export class ElementEventsBusService {
    private notification$: Subject<any> = new Subject();

    constructor() {}

    public dispatch(elementEvent: ElementEvent) {
        this.notification$.next(elementEvent);
    }

    public listen(handler: (event) => any): Subscription {
        return this.notification$.subscribe(handler);
    }

    public listenByFilter(handler: (event) => any, type?: ElementEventType, source?: string, target?: string): Subscription {
        return this.notification$
            .pipe(
                filter((event) => {
                    return (event.type === type || !type) && (event.source === source || !source) && (event.target === target || !target);
                })
            )
            .subscribe(handler);
    }
}
