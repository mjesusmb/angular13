import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { SecurityTokenRequestService } from 'ra-ng/security';
import { RaNgLoggerI18nService } from 'ra-ng/logger';

import { ErrorManagerService } from './error-manager.service';

import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class DownloadFileService {
    constructor(private authHttp: SecurityTokenRequestService, private log: RaNgLoggerI18nService, private errors: ErrorManagerService) { }

    public descarrega(url: string, mimeType: string, params: HttpParams = null): Observable<Blob> {
        let headers = new HttpHeaders();
        headers.append('accept', mimeType);

        return this.authHttp
            .get<Blob>(url, { headers, params, responseType: 'blob' })
            .pipe(
                map((response) => {
                    let fileBlob: Blob = response;
                    let blob = new Blob([fileBlob], { type: mimeType });
                    return blob;
                }),
                catchError((error) => {
                    this.errors.process(error);
                    return of(null);
                })
            );
    }

    public descarregaAmbNom(url: string, mimeType: string, params: HttpParams = null, body: any): Observable<Blob> {
        let headers = new HttpHeaders();
        headers.append('accept', mimeType);

        return this.authHttp
            .post<Blob>(url, body, { headers, params, responseType: 'blob' })
            .pipe(
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    this.errors.process(error);
                    return of(null);
                })
            );
    }

    public descarregaCSV(body: any, url: string): Observable<boolean> {
        let headers = new HttpHeaders();
        headers.append('accept', '*/*');

        return this.authHttp
            .post<Blob>(url, body, { headers, responseType: 'blob' })
            .pipe(
                map((res: any) => {
                    let resBlob: Blob = new Blob([res.body], { type: res.headers.get('Content-Type') });
                    saveAs(resBlob, res.headers.get('Content-Disposition').split('=')[1]);
                    return true;
                }),
                catchError((error) => {
                    if (error && error.status && error.status === 400) {
                        let fileAsTextObservable = new Observable<string>((observer) => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                let responseText = (<any>e.target).result;

                                observer.next(responseText);
                                observer.complete();
                            };
                        });

                        return fileAsTextObservable.pipe(
                            switchMap((errMsgJsonAsText) => {
                                let resError = new HttpResponse<string>({
                                    body: JSON.parse(errMsgJsonAsText),
                                    headers: error.headers,
                                    status: error.status,
                                    url: error.url
                                });

                                return observableThrowError(resError);
                            })
                        );
                    } else {
                        return observableThrowError(error);
                    }
                })
            );
    }
}
