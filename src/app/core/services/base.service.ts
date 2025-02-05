import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SecurityTokenRequestService } from 'ra-ng/security';
import { UserContextService } from 'ra-ng/env/user-context';
import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { contentHttpHeaders } from 'ra-ng/http';

import { ErrorManagerService } from './error-manager.service';

import { NameValue } from 'app/core/model/name-value';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class BaseService {
    protected className = 'baseService';

    constructor(
        protected log: RaNgLoggerI18nService,
        protected errors: ErrorManagerService,
        protected context: UserContextService,
        protected router: Router,
        protected authHttp: SecurityTokenRequestService // ,protected authEtagHttp: EtagSecurityTokenRequestService
    ) {}

    protected send<T>(urlApi: string, extraParams?: NameValue[], body: any = null, put: boolean = false): Observable<T> {
        let params: HttpParams = this.setFixedParams();

        if (extraParams) {
            extraParams.forEach((extra) => (params = params.append(extra.name, extra.value)));
        }
        const httpOptions = {
            headers: contentHttpHeaders,
            params: params
        };

        if (!body) {
            body = {};
        }

        if (put === true) {
            return this.authHttp.put<T>(urlApi, body, httpOptions);
        } else {
            console.log('send', urlApi);
            return this.authHttp.post<T>(urlApi, body, httpOptions);
        }
    }

    protected carregaCombos<T>(urlApi: string, extraParams?: NameValue[]): Observable<any> {
        let params: HttpParams = this.setFixedParams();

        if (extraParams) {
            extraParams.forEach((extra) => (params = params.append(extra.name, extra.value)));
        }

        this.log.debug('[' + this.className + '] params: ' + params.toString());
        let options = { headers: contentHttpHeaders, params: params };

        /* if (useEtagCache) {
            return this.authEtagHttp.get<T>(urlApi, options);

        } else {*/
        return this.authHttp.get<any>(urlApi, options);
        // }
    }

    protected setFixedParams(): HttpParams {
        let queryParameters = new HttpParams();
        // TODO De moment agafem el idioma indicat per el config, queda carregar usuari
        //   if (this.context.profile) {s

        // let codiIdioma = this.context.profile.dadesUsuari.usuariNegoci.idiomaDefecto;
        let codiIdioma = Config.appLang;

        Config.availableLangs.forEach((lang) => {
            if (lang.value === codiIdioma) {
                codiIdioma = lang.label;
            }
        });

        if (codiIdioma === null || codiIdioma === undefined) {
            throw new Error('El paràmetre requerit codiIdioma es null o undefined cridant a ' + this.className + '.');
        }
        queryParameters = queryParameters.set('codiIdioma', <string>codiIdioma);
        return queryParameters;
        /*      } else {
            this.router.navigate(['inici']);
        }*/
    }

    protected addParam(nameParam: string, valueParam: any, params: NameValue[]) {
        if (valueParam !== null && typeof valueParam !== 'undefined') {
            console.log(nameParam + '-' + valueParam);
            params.push({ name: nameParam, value: valueParam });
        }
    }

    protected addFilter(paramsCerca: NameValue[], body: any, filtre: any) {
        if (filtre) {
            if (filtre.paginador) {
                for (let property in filtre.paginador) {
                    if (filtre.paginador.hasOwnProperty(property)) {
                        this.addParam(property, filtre.paginador[property], paramsCerca);
                    }
                }
            }
            if (filtre.filtres) {
                for (let property in filtre.filtres) {
                    if (filtre.filtres.hasOwnProperty(property)) {
                        body[property] = filtre.filtres[property];
                    }
                }
            }
        }
    }

    public esborraDades<T>(
        params: HttpParams,
        urlApi: string // , useEtagCache: boolean = true
    ): Observable<T> {
        let options = { headers: contentHttpHeaders, params: params };

        /*  if (useEtagCache) {
            return this.authEtagHttp.delete<T>(urlApi, options);
        } else {*/
        return this.authHttp.delete<T>(urlApi, options);
        //  }
    }
}
