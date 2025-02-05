import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { UserContextService } from 'ra-ng/env/user-context';
import { EventBusService} from 'ra-ng/event';


import { ElementEventsBusService, ErrorManagerService } from 'app/core';
import { BaseUnauthenticatedComponent } from './base-unauthenticated.component';

@Component({
    template: `<!--void-->`
})
export class BaseComponent extends BaseUnauthenticatedComponent implements OnInit {
    protected queryParamMap: ParamMap;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected zone: NgZone,
        protected context: UserContextService,
        protected errorService: ErrorManagerService,
        protected eventBus: EventBusService,
        protected log: RaNgLoggerI18nService,
        protected elementEventBus: ElementEventsBusService
    ) {
        super(route, zone, context, errorService, eventBus, log, elementEventBus);
    }

    public goTo(route: string) {
        this.router.navigate([route]);
    }

    public ngOnInit() {
        this.log.debug('> BaseComponent.ngOnInit');
    }
}
