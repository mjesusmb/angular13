import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { UserContextService } from 'ra-ng/env/user-context';
import { EventBusService, BroadcastMessage, BroadcastEvent, ClearMessagesEventType } from 'ra-ng/event';

import { JusTipusMissatgeEnum, JusMissatgeModel } from 'justicia-ng';
import { ElementEventsBusService, ErrorManagerService, ElementEventType } from 'app/core';


@Component({
    template: `<!--void-->`
})
export class BaseUnauthenticatedComponent {
    protected queryParamMap: ParamMap;

    constructor(
        protected route: ActivatedRoute,
        protected zone: NgZone,
        protected context: UserContextService,
        protected errorService: ErrorManagerService,
        protected eventBus: EventBusService,
        protected log: RaNgLoggerI18nService,
        protected elementEventBus: ElementEventsBusService
    ) {
        this.queryParamMap = this.route.snapshot.queryParamMap;
    }

    protected netejaMissatges(toastr: boolean = false, normal: boolean = true, groupId: string = null) {
        this.log.debug('> BaseComponent.netejaMissatges toastr=' + toastr + '; normal=' + normal + '; groupId=' + groupId);
        let propietats: any = {};
        if (groupId && groupId !== null && groupId !== '') {
            propietats.groupId = groupId;
        }
        if (toastr) {
            if (normal) {
                this.eventBus.dispatch(new BroadcastEvent(ClearMessagesEventType, propietats));
            } else {
                propietats.toastr = true;
                this.eventBus.dispatch(new BroadcastEvent(ClearMessagesEventType, propietats));
            }
        } else if (normal) {
            propietats.toastr = false;
            this.eventBus.dispatch(new BroadcastEvent(ClearMessagesEventType, propietats));
        }
    }

    protected mostraMissatge(
        severity: JusTipusMissatgeEnum,
        resum: string,
        missatge: string,
        collapsedMissatge: string = null,
        esToastr: boolean = false,
        codiGrup: string = null
    ) {
        this.log.debug('> BaseComponent.mostraMissatge');

        let jusMissatge: JusMissatgeModel = {
            tipusMissatge: severity,
            summary: resum,
            detail: missatge,
            collapsedDetail: collapsedMissatge,
            toastr: esToastr,
            groupId: codiGrup
        };
        // this.elementEventBus.dispatch({
        //     type: ElementEventType.Missatge,
        //     data: { missatge: jusMissatge }
        // });
        this.eventBus.dispatch(new BroadcastMessage(jusMissatge));
    }

    protected getSnapshotParam(paramName: string): string {
        let param: string;

        param = this.route.snapshot.params[paramName];
        if (!param) {
            param = this.route.snapshot.queryParams[paramName];
        }
        return param;
    }
}
