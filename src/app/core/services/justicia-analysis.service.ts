import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientBatchService } from './http-client-batch.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { SkipHttpMonitorInterceptor } from 'ra-ng/monitoring';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class JusticiaAnalysisService extends HttpClientBatchService {
    constructor(private http: HttpClient) {
        super();
    }

    protected sendToServer(batchData: any): Observable<any> {
        console.log('AVS: JusticiaAnalysisService - sendToServer', batchData);
        return of({ result: 'OK' });
        /*
        const url: string = Config.api['baseUrl'] + Config.api.analytics.url;

        // IMPORTANT: S'ha d'afegir o bé un http header o un query param per dir al HttpInterceptor
        // que no faci cas d'aquesta petició sino es genera un bucle infinit
        //
        const headers = new HttpHeaders().append(SkipHttpMonitorInterceptor, '');
        // const params = new HttpParams().append(SkipHttpMonitorInterceptor, 'true');

        // TODO: Afegir informació de l'usuari loginat
        // Token Jwt, Cookie, etc.
        return this.http.post(url, batchData, { headers }).pipe(
            map((res) => {
                console.log('Monitoring data SUCCESSFULLY SENT', res);
                return res;
            }),
            catchError((error) => {
                console.error('ERROR SENDING ANALYTICS INFORMATION', error);
                return throwError(error);
            })
        );
        */
    }
}
