import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProgressInfo } from '../model/rest/progress-info';

@Injectable({ providedIn: 'root' })
export class ProgressService {
    private bus: Subject<ProgressInfo> = new Subject<ProgressInfo>();

    public start() {
        if (this.bus === null || this.bus.isStopped) {
            this.bus = new Subject<ProgressInfo>();
        }
    }

    public showProgress(event: ProgressInfo) {
        this.bus.next(event);
    }

    public complete() {
        this.bus.complete();
    }

    public listen(handler: (event: ProgressInfo) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.bus.subscribe(handler, error, complete);
    }
}
