
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

import { logLog, Appender } from 'log4javascript';

import { Logger, LoggerFactory, AjaxAppenderBatch, AjaxAppenderImmediate } from 'ra-ng/log';
import { fromUri2Url } from 'ra-ng/http';
import { ConfigurationLoaderService,ConfigurationService } from 'ra-ng/config';
import { TranslateService, LanguageConfigurationService } from 'ra-ng/i18n';

import { Config } from '../config/config';
import { environment } from 'environments/environment';

const CONSOLE_STYLE = 'background: #222; color: #bada55';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    public get environmentName(): string {
        return this.innetEnvironmentName;
    }

    private innetEnvironmentName: string = 'DEVELOPMENT';

    constructor(private i18n: TranslateService, private configurationService: ConfigurationService) { }

    public loadConfiguration(): Promise<void> {
        console.log('%cLOADING MFE-APP CONFIGURATION', CONSOLE_STYLE);

        if (environment.production) {
            this.innetEnvironmentName = 'PRODUCTION';
        }

        const selector = location.hostname;
        const baseURI: string = this.getBaseHref();
        const scritpElement = document.getElementById(Config.appElementTag);
        const baseUrl = scritpElement ? scritpElement.getAttribute('data-baseUrl')+'/' || '/' : baseURI;
        console.log("baseUrl");
        console.log(baseUrl);
        const cfgUrl = fromUri2Url(`${baseUrl}environments/${selector}.json`);

        console.log('%cCurrent baseUrl: [' + baseUrl + ']', CONSOLE_STYLE);

        console.log('%cUsing configuration selector: [' + selector + ']', CONSOLE_STYLE);
        console.log('%cUsing configuration URL: [' + cfgUrl + ']', CONSOLE_STYLE);
        console.log('%cStarting environment: [' + this.environmentName + ']', CONSOLE_STYLE);

        Config.baseUrl = baseUrl;

        return ConfigurationLoaderService.bootstrap(cfgUrl, Config, baseUrl)
            .pipe(
                switchMap((configurationsLoaded) => {
                    console.log('%cImported JSON configuration for modules: ', CONSOLE_STYLE, configurationsLoaded);
                    this.setupLog();
                    return this.setupTranslations();
                })
            ).toPromise();
    }

    private setupTranslations(): Observable<any> {
        let sources = [];
        this.i18n.currentLoader = new LanguageConfigurationService(this.configurationService, 'i18n_');
        Config.availableLangs.map((l) => sources.push(this.i18n.reloadLang(l.value)));

        return forkJoin(sources);
    }

    private setupLog() {
        this.setupAjaxAppenderEndpoint();
        LoggerFactory.configure(Config);
        this.setupAjaxAppender();
    }

    private setupAjaxAppenderEndpoint() {
        const logEndpoint = Config.api.logs.baseUrl + Config.api.logs.report;
        const logConfig = (Config as any).log;
        if (logConfig) {
            for (const logger of logConfig) {
                if (logger.ajax) {
                    logger.ajax.endpoint = logEndpoint;
                }
            }
        }
    }

    private setupAjaxAppender() {
        logLog.setQuietMode(true);
        const APPLOG: Logger = LoggerFactory.getLogger('app');

        if (APPLOG) {
            const appenders: Appender[] = APPLOG.getEffectiveAppenders();

            if (appenders) {
                for (const appender of appenders) {
                    if (appender instanceof AjaxAppenderBatch) {
                        appender.addHeader('Content-Type', 'application/json');
                        appender.setSendAllOnUnload(false);
                        appender.setWaitForResponse(false);
                        appender.setFailCallback((message) => {
                            console.error('[log4javascript fail callback] ' + message);
                        });
                        break;
                    }
                }
            }
        }

        const APPLOG_FATAL: Logger = LoggerFactory.getLogger('appFatal');

        if (APPLOG_FATAL) {
            const appendersFatal: Appender[] = APPLOG_FATAL.getEffectiveAppenders();
            if (appendersFatal) {
                for (const appender of appendersFatal) {
                    if (appender instanceof AjaxAppenderImmediate) {
                        appender.addHeader('Content-Type', 'application/json');
                        appender.setSendAllOnUnload(false);
                        appender.setWaitForResponse(false);
                        appender.setFailCallback((message) => {
                            console.error('[log4javascript fail callback FATAL] ' + message);
                        });
                        break;
                    }
                }
            }
        }
    }

    private getBaseHref() {
        if (document.baseURI) {
            return document.baseURI;
        }

        // IE 11
        const baseTags = document.getElementsByTagName('base');
        if (baseTags && baseTags.length > 0) {
            return baseTags[0].href;
        }

        return window.location.href;
    }
}
