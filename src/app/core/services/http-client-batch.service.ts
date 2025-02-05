import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export abstract class HttpClientBatchService {
    private batchSize = 100;
    private debounceTimespan = 10 * 1000;
    private flushNextBatchTimespan = 10 * 60 * 1000;
    private dataQueue: any[] = [];
    private queueSubject = new Subject<any[]>();
    private queue$: Observable<any>;
    private flushNextBatchTimer: any;

    constructor() {
        this.queue$ = this.queueSubject.pipe(
            debounceTime(this.debounceTimespan),
            switchMap((batchToSend) => {
                return this.sendToServer(batchToSend);
            })
        );

        this.queue$.subscribe((response) => {
            console.log('Returned data from Backend server', response);
        });
    }

    public addToQueue(data: any) {
        if (!this.flushNextBatchTimer) {
            // console.log('CREATING INTERVAL ', new Date());
            this.flushNextBatchTimer = setInterval(() => {
                // console.log('FLUSHING QUEUE', new Date());
                this.sendNextBatch(true);
            }, this.flushNextBatchTimespan);
        }

        if (this.batchSize > 0) {
            // console.log('HttpClientBatchService - ADDING DATA TO THE QUEUE', data);
            this.dataQueue.push(data);
            // console.log('HttpClientBatchService - CURRENT QUEUE', this.dataQueue);
            this.sendNextBatch();
        } else {
            this.queueSubject.next([data]);
        }
    }

    protected abstract sendToServer(data: any): Observable<any>;

    private sendNextBatch(force: boolean = false) {
        if (force || this.dataQueue.length >= this.batchSize) {
            const batchToSend = this.dataQueue.splice(0, this.batchSize);

            // console.log('HttpClientBatchService - BATCH TO SEND', batchToSend);
            // console.log('HttpClientBatchService - CURRENT QUEUE', this.dataQueue);

            if (batchToSend && batchToSend.length > 0) {
                this.queueSubject.next(batchToSend);
            } else {
                clearInterval(this.flushNextBatchTimer);
                this.flushNextBatchTimer = null;
            }
        }
    }
}
