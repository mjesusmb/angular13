import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from 'ra-ng/i18n';
import { RaNgLoggerI18nService} from 'ra-ng/logger';
import { EventBusService, BroadcastMessage } from 'ra-ng/event';

import { TipusError400 } from '../model/rest/tipus-error-400';
import { TipusExcepcioEnum } from '../model/rest/tipus-excepcio';
import { TipusError500 } from '../model/rest/tipus-error-500';
import { TipusError } from '../model/rest/tipus-error';

import { Router } from '@angular/router';
import { Config } from '../config/config';
import { MessageModel, MessageTypeEnum } from '../model/message-model';

@Injectable({ providedIn: 'root' })
export class ErrorManagerService {
    constructor(private translate: TranslateService, private log: RaNgLoggerI18nService, private eventBus: EventBusService, private router: Router) { }

    public process(response: HttpErrorResponse, defaultMessage: string = null, errorTitle: string = null) {
        switch (response.status) {
            case 400:
                let error400 = response.error;

                if (error400) {
                    let err: TipusError400 = this.mapTipusError(error400);

                    if (err && err.type) {
                        switch (err.type) {
                            case TipusExcepcioEnum.Validacio:
                                this.notifyWarning(this.translate.instant(err.key), errorTitle);
                                break;
                            case TipusExcepcioEnum.Negoci:
                            case TipusExcepcioEnum.BaseDeDades:
                                this.notifyError(this.translate.instant(err.key), errorTitle);
                                break;
                            case TipusExcepcioEnum.Desconegut:
                                if (err.key) {
                                    this.notifyError(this.translate.instant(err.key), errorTitle);
                                } else if (defaultMessage) {
                                    this.notifyError(defaultMessage, errorTitle);
                                } else {
                                    this.notifyError(this.translate.instant('ui.errors.server.400', { desc: err.message }), errorTitle);
                                }
                                break;
                        }
                    } else {
                        if (defaultMessage) {
                            this.notifyError(defaultMessage, errorTitle);
                        } else {
                            this.notifyError(response.statusText, errorTitle);
                        }
                    }
                } else {
                    if (defaultMessage) {
                        this.notifyError(defaultMessage, errorTitle);
                    } else {
                        this.notifyError(response.statusText, errorTitle);
                    }
                }

                break;

            case 401:
                // this.loginService.notAuthorized();
                this.router.navigate([Config.security.unauthenticatedView]);
                break;
            case 403:
                let error403 = response.error as TipusError;
                this.notifyError(error403.desc, errorTitle);
                break;
            case 404:
                let error404 = this.translate.instant('ui.errors.server.404');
                this.notifyError(error404, errorTitle);
                break;
            case 500:
                let error500 = response.error as TipusError500;
                let errorMessage = '';
                if (error500.message || error500.desc) {
                    errorMessage = this.translate.instant('ui.errors.server.500', { desc: error500.message || error500.desc, id: error500.code || '' });
                } else {
                    let genericErrorMessage = this.translate.instant('ui.errors.server.unknown');
                    errorMessage = this.translate.instant('ui.errors.server.500', { desc: genericErrorMessage || '', id: error500.code || '' });
                }

                this.log.error('[ErrorManagerService]: ' + JSON.stringify(errorMessage));
                this.notifyError(errorMessage, errorTitle);

                break;
            default:
                if (defaultMessage) {
                    this.notifyError(defaultMessage, errorTitle);
                } else {
                    this.notifyError(this.translate.instant('ui.errors.server.unknown'), errorTitle);
                }
        }
    }

    public notifyError(message: any, errorTitle: string = 'Error') {
        let missatge: MessageModel = {
            messageType: MessageTypeEnum.Error,
            summary: errorTitle,
            detail: message,
            toastr: false
        };
        this.eventBus.dispatch(new BroadcastMessage(missatge));
        window.scrollTo(0, 0);
    }

    public notifyWarning(message: any, warningTitle: string = 'Avís') {
        let jusMissatge: MessageModel = {
            messageType: MessageTypeEnum.Warning,
            summary: warningTitle,
            detail: message,
            toastr: false
        };
        this.eventBus.dispatch(new BroadcastMessage(jusMissatge));
        window.scrollTo(0, 0);
    }

    public notifyOk(message: any, notifyTitle: string = 'Resultat') {
        let jusMissatge: MessageModel = {
            messageType: MessageTypeEnum.Info,
            summary: notifyTitle,
            detail: message,
            toastr: false
        };
        this.eventBus.dispatch(new BroadcastMessage(jusMissatge));
        window.scrollTo(0, 0);
    }

    private mapTipusError(error: any): TipusError400 {
        let err400: TipusError400 = {
            code: error.code,
            message: error.message,
            type: <TipusExcepcioEnum>+error.type,
            key: error.key ? error.key : error.message ? error.message : 'ui.errors.server.unknown',
            params: error.params
        };

        return err400;
    }
}
