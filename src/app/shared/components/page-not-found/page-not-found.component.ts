import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { SpinnerService } from 'ra-ng/navigation';
import { UserContextService } from 'ra-ng/env/user-context';
import { EventBusService, BroadcastEvent, ClearMessagesEventType } from 'ra-ng/event';

import { ErrorManagerService, ElementEventsBusService } from 'app/core';
import { BaseComponent } from '../base.component';

@Component({
    templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent extends BaseComponent implements OnInit {
    public linkInici: string;

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected zone: NgZone,
        protected context: UserContextService,
        protected errorService: ErrorManagerService,
        protected eventBus: EventBusService,
        private spinner: SpinnerService,
        protected log: RaNgLoggerI18nService,
        protected elementEventBus: ElementEventsBusService
    ) {
        super(router, route, zone, context, errorService, eventBus, log, elementEventBus);
    }

    public ngOnInit() {
        this.linkInici = '/';
        this.eventBus.dispatch(new BroadcastEvent(ClearMessagesEventType, null));
        this.spinner.toggle(false);
    }
}
