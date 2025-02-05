import { UrlUtil } from './../utils/url-util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { ContextChangeState, ContextChangeStateData } from 'justicia-ng';
import { ElementEventsBusService } from './element-events-bus.service';
import { ElementEventType } from '../model/element-event-type.model';
import { Config } from '../config/config';
import { CacheService, Cache } from 'ra-ng/cache';

import * as moment_ from 'moment';
const moment = moment_;

@Injectable({ providedIn: 'root' })
export class CanviContextMfeService {
    private readonly CACHE_KEY: string = `${Config.appElementTag}.context.change.state`;

    constructor(private router: Router, protected elementEventBus: ElementEventsBusService, private cacheService: CacheService) { }

    public canviContext(targetApp: string, paramsCC: any, data: ContextChangeStateData[]): Observable<any> {
        if (!paramsCC) {
            return throwError(new Error("No s'ha proporcionat el paràmetre paramsCC"));
        }

        const state: ContextChangeState = {
            currentAppName: Config.appElementTag,
            returnRoute: UrlUtil.cleanQueryString(this.router.url),
            data
        };

        this.saveState(Config.appElementTag, state);

        this.elementEventBus.dispatch({
            type: ElementEventType.CanviContext,
            data: {
                mfeTagName: Config.appElementTag,
                mfeReturnRoute: state.returnRoute,
                targetApp,
                paramsCC
            }
        });

        return of({
            result: 'OK'
        });
    }

    public getCCState(appName: string, returnRoute: string): any {
        if (!returnRoute) {
            return null;
        }

        let state = this.recoverState(appName);

        if (state && state.returnRoute && returnRoute) {
            let cachedRoute = UrlUtil.cleanQueryString(state.returnRoute).toLocaleLowerCase();
            let currentRoute = UrlUtil.cleanQueryString(returnRoute).toLocaleLowerCase();

            return cachedRoute === currentRoute ? state : null;
        }

        return null;
    }

    public removeCCState(appName: string) {
        return this.removeState(appName);
    }

    private saveState(appName: string, state: ContextChangeState) {
        let appCache: Cache = this.cacheService.get(appName);
        if (appCache) {
            console.log('SAVING CC STATE', appName);
            appCache.put(this.CACHE_KEY, JSON.stringify(state));
        }
    }

    private recoverState(appName: string): ContextChangeState {
        let appCache: Cache = this.cacheService.get(appName);

        if (appCache) {
            let cacheData = appCache.get(this.CACHE_KEY);

            if (cacheData) {
                return this.parseDataFromState(JSON.parse(appCache.get(this.CACHE_KEY)) as ContextChangeState);
            }
        }

        return null;
    }

    private removeState(appName: string) {
        let appCache: Cache = this.cacheService.get(appName);

        if (appCache) {
            appCache.remove(this.CACHE_KEY);
        }
    }

    private parseDataFromState(state: ContextChangeState): any {
        if (state && state.data && Array.isArray(state.data)) {
            for (let data of state.data) {
                let parsedData: any;

                if (typeof data.cacheData === 'string') {
                    parsedData = JSON.parse(data.cacheData);
                } else {
                    parsedData = data.cacheData;
                }

                for (let prop in parsedData) {
                    if (parsedData.hasOwnProperty(prop)) {
                        let value = parsedData[prop];
                        if (moment(value, 'YYYY-MM-DDTHH:mm:ss.SSSSZ', true).isValid()) {
                            parsedData[prop] = new Date(value);
                        }
                    }
                }
                data.cacheData = parsedData;
            }
            return state;
        }

        return null;
    }
}
