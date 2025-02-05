import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { SpinnerService } from 'ra-ng/navigation';
import { UserContextService } from 'ra-ng/env/user-context';
import { EventBusService, BroadcastEvent, ClearMessagesEventType } from 'ra-ng/event';

import { BaseUnauthenticatedComponent } from '../base-unauthenticated.component';
import { ErrorManagerService, ElementEventsBusService } from 'app/core';

@Component({
    selector: 'jus-base-unauthenticated',
    templateUrl: './unauthenticated.component.html'
})
export class UnauthenticatedComponent extends BaseUnauthenticatedComponent implements OnInit {
    public linkInici: string;

    constructor(
        protected route: ActivatedRoute,
        protected zone: NgZone,
        protected context: UserContextService,
        protected errorService: ErrorManagerService,
        protected eventBus: EventBusService,
        protected log: RaNgLoggerI18nService,
        private spinner: SpinnerService,
        protected elementEventBus: ElementEventsBusService
    ) {
        super(route, zone, context, errorService, eventBus, log, elementEventBus);
    }

    public ngOnInit() {
        this.linkInici = '/';
        this.netejaMissatges(true, true);
        this.eventBus.dispatch(new BroadcastEvent(ClearMessagesEventType, null));
        this.spinner.toggle(false);
    }
}
