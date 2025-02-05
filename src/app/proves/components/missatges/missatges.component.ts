import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem, Message } from 'primeng/api';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';
import { UserContextService } from 'ra-ng/env/user-context';
import { ConfigurationService } from 'ra-ng/config';
import { EventBusService, BroadcastMessage, BroadcastEvent, ClearMessagesEventType } from 'ra-ng/event';


import { JusTipusCapcaleraEnum, JusBotoModel, JusCalendariLiterals, JusTraduirCalendariPipe, JusMissatgeModel, JusTipusMissatgeEnum, broadcastMissatgesType } from 'justicia-ng';
import { ErrorManagerService, ElementEventType } from 'app/core';

@Component({
    templateUrl: './missatges.component.html'
})
export class PrMissatgesComponent implements OnInit {
    public msgs: Message[] = [];
    public textAjuda: string;
    public jusBotons: JusBotoModel[];
    public JusTipusCapcaleraEnum = JusTipusCapcaleraEnum;
    public dataAltaDesDe: Date;
    public dataAltaFinsA: Date;
    public codiUnitatRegistre: string;
    public numSollicitudRemota: string;
    public indSollicitudRemota: boolean;
    public optUnitatsRegistre: SelectItem[];
    public filtresCollapsed: boolean = false;
    public animacioShrinkInOut: string = 'in';
    public cal: JusCalendariLiterals;

    constructor(protected translate: TranslateService,
        protected router: Router,
        protected context: UserContextService,
        protected errorService: ErrorManagerService,
        protected cfg: ConfigurationService,
        protected log: RaNgLoggerI18nService,
        protected route: ActivatedRoute,
        protected zone: NgZone,
        protected eventBus: EventBusService,
        private messages: MessageService,
        private traduirCalendari: JusTraduirCalendariPipe,
        private toastr: ToastrService,
        protected elementEventBus: EventBusService
    ) {
    }

    ngOnInit() {
        this.cal = this.traduirCalendari.transform();
        this.textAjuda = this.translate.instant('ajuda.modificacioSollicitud');
        this.jusBotons = [];
        this.jusBotons.push(
            {
                icon: 'fa fa-bell',
                label: 'Toastr', visible: true, disabled: false, iconPos: 'left', name: 'butToastr', typeSubmit: false
            });
        this.jusBotons.push(
            {
                icon: 'fa fa-bell',
                label: 'Missatge', visible: true, disabled: false, iconPos: 'left', name: 'butMissatge', typeSubmit: false
            });
        this.jusBotons.push(
            { icon: 'fa fa-eraser', label: this.translate.instant('ui.comu.neteja'), visible: true, disabled: false, name: 'butNeteja', typeSubmit: false });

    }

    public clickBotonera(event) {
        this.log.debug('clickBotonera event=' + JSON.stringify(event, null, ' '));
        switch (event.boto.name) {
            case 'butToastr':
                // this.toastr.success('Order submitted', 'Success Message');
                let jusMissatgeToastr: JusMissatgeModel = {
                    tipusMissatge: JusTipusMissatgeEnum.Informacio,
                    summary: 'Això és el summary',
                    detail: 'Això és més text',
                    collapsedDetail: 'Això és el collapsed detail',
                    toastr: true
                };
                this.elementEventBus.dispatch({
                    type: broadcastMissatgesType,
                    data: jusMissatgeToastr
                });
                this.eventBus.dispatch(new BroadcastMessage(jusMissatgeToastr));
                break;
            case 'butMissatge':

                // this.messages.add({ key: 'info', summary: 'Info Message', detail: 'Info message details' });
                // this.messages.add({ key: 'error', summary: 'Error Message', detail: 'Error message details' });

                let jusMissatge: JusMissatgeModel = {
                    tipusMissatge: JusTipusMissatgeEnum.Informacio,
                    summary: 'Això és el summary',
                    detail: 'Això és més text de descripció del missatge',
                    collapsedDetail: 'Això és el collapsed detail',
                    toastr: false,
                    groupId: 'id0001'
                };
                this.elementEventBus.dispatch({
                    type: broadcastMissatgesType,
                    data: jusMissatge
                });
                this.eventBus.dispatch(new BroadcastMessage(jusMissatge));


                break;
            case 'butNeteja':
                this.eventBus.dispatch(new BroadcastEvent(ClearMessagesEventType, {
                    toastr: false,
                    groupId: 'id0001'
                }));
                break;
            default:
                break;
        }

    }

    public onKeyDown() {
    }
}
export enum Severity {
    Success = 'success',
    Information = 'info',
    Warning = 'warn',
    Error = 'error'
}
