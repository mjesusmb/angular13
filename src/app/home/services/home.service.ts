import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomeService {
    constructor() {}

    public obteParamsCCMfe(request: any): Observable<any> {
        return of({
            paramsCC: {
                esMfe: true,
                routeTo: '/feature-a/feature-y',
                mfeRouteTo: '/second/feature-z',
                param1: "hola que tal des d'app AVS"
            }
        }).pipe(delay(500));
    }
}
