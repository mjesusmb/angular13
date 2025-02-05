import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MessageService, ConfirmationService } from 'primeng/api';

import { SpinnerService } from 'ra-ng/navigation';
import { EventBusService} from 'ra-ng/event';
import { UncontrolledErrorsHandlerService } from 'ra-ng/error';
import { ConfigurationService } from 'ra-ng/config';
import { TranslateService } from 'ra-ng/i18n';
import { CacheService } from 'ra-ng/cache';
import { UserContextService } from 'ra-ng/env/user-context';
import { TokenJwtRequestService, 
         SecurityTokenRequestService, 
         EtagTokenJwtRequestService,
         SecurityAuthorizationService,
         TokenAuthorizationService,
         ProfileManagerService,
         CachedSecurityTokenRequestService,
         CachedTokenJwtRequestService,
         EtagSecurityTokenRequestService } from 'ra-ng/security';
import { RaNgLoggerI18nService, RaNgLoggerService, RaNgLoggerModule} from 'ra-ng/logger';


import { JusAccessibilitatService, JusEnterDirective, JusEnterPipe, JusTraduirCalendariPipe } from 'justicia-ng';

import { Constants } from './constants';
import { Config } from './config/config';

export function ConfigurationServiceFactory() {
    return new ConfigurationService(Config);
}


export function CacheServiceFactory(cfgService: ConfigurationService, log: RaNgLoggerI18nService) {
    return new CacheService(cfgService, log, ['memory', 'session', Constants.appName]);
}

export function TokenJwtRequestServiceFactory(cfg: ConfigurationService, log: RaNgLoggerI18nService, i18n: TranslateService, http: HttpClient) {
    const defaultOptions = {
        headers: new HttpHeaders().append('Cache-control', 'no-cache, no-store'),
        reportProgress: false,
        withCredentials: false,
        responseType: 'json' as 'json'
    };

    const requestService = new TokenJwtRequestService(cfg, log, i18n, http, defaultOptions);
    return requestService;
}

export function cachedTokenJwtRequestServiceFactory(
    cfgService: ConfigurationService,
    log: RaNgLoggerI18nService,
    i18n: TranslateService,
    cacheService: CacheService,
    http: HttpClient
) {
    let cache = cacheService.get(Constants.appName);

    return new CachedTokenJwtRequestService(cfgService, log, i18n, http, cache, null);
}

export function EtagTokenJwtRequestServiceFactory(
    cfgService: ConfigurationService,
    log: RaNgLoggerI18nService,
    i18n: TranslateService,
    cacheService: CacheService,
    http: HttpClient
) {
    let cache = cacheService.get(Constants.appName);

    return new EtagTokenJwtRequestService(cfgService, log, i18n, http, cache, null);
}

@NgModule({
    imports: [CommonModule, RaNgLoggerModule],
    declarations: [],
    providers: [
        { provide: SecurityAuthorizationService, useClass: TokenAuthorizationService },
        { provide: ConfigurationService, useFactory: ConfigurationServiceFactory },
        {
            provide: ErrorHandler,
            useClass: UncontrolledErrorsHandlerService,
            deps: [RaNgLoggerService]
        },
        {
            provide: SecurityTokenRequestService,
            useFactory: TokenJwtRequestServiceFactory,
            deps: [ConfigurationService, RaNgLoggerI18nService, TranslateService, HttpClient]
        },
        {
            provide: EtagSecurityTokenRequestService,
            useFactory: EtagTokenJwtRequestServiceFactory,
            deps: [ConfigurationService, RaNgLoggerI18nService, TranslateService, CacheService, HttpClient]
        },
        {
            provide: CacheService,
            useFactory: CacheServiceFactory,
            deps: [ConfigurationService, RaNgLoggerI18nService]
        },
        {
            provide: CachedSecurityTokenRequestService,
            useFactory: cachedTokenJwtRequestServiceFactory,
            deps: [ConfigurationService, RaNgLoggerI18nService, TranslateService, CacheService, HttpClient]
        },
        TranslateService,
        MessageService,
        ProfileManagerService,
        JusAccessibilitatService,
        JusEnterDirective,
        JusEnterPipe,
        JusTraduirCalendariPipe,
        UserContextService,
        ConfirmationService,
        EventBusService,
        SpinnerService,
        ToastrService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import it in the AppModule only.`);
    }
}
