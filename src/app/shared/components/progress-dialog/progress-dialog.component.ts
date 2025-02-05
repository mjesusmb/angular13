import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';
import { EventBusService} from 'ra-ng/event';

import { ErrorManagerService } from 'app/core/services/error-manager.service';
import { ProgressService } from 'app/core/services/progress.service';
import { ProgressInfo } from 'app/core/model/rest/progress-info';

@Component({
    moduleId: module.id,
    selector: 'app-progress-dialog',
    templateUrl: './progress-dialog.component.html'
})
export class ProgressDialogComponent implements OnInit, OnDestroy {
    @Input() public title: string;
    @Input() public set visible(value: boolean) {
        if (value === true) {
            this.setup();
        } else {
            this.infoText = '';
            this.progressValue = 0;
        }
        this.showProgress = value;
    }
    @Output() public onTancar: EventEmitter<any> = new EventEmitter();

    public showProgress: boolean = false;
    public infoText: string = null;
    public progressValue: number = 0;

    private subscription: Subscription = null;

    constructor(
        protected errorService: ErrorManagerService,
        protected eventBus: EventBusService,
        protected i18n: TranslateService,
        protected log: RaNgLoggerI18nService,
        private progressService: ProgressService
    ) {}

    public ngOnInit() {
        this.setup();
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public setup() {
        if (this.subscription === null || (this.subscription && this.subscription.closed)) {
            this.subscription = this.progressService.listen(
                (progress: ProgressInfo) => {
                    setTimeout(() => {
                        this.progressValue = this.calcularPercent(progress.value, progress.total);
                        this.infoText = progress.informacio;
                    }, 50);
                },
                (error) => {
                    this.errorService.process(error);
                    this.visible = false;
                },
                () => {
                    this.visible = false;
                }
            );
        }
    }

    private calcularPercent(value: number, total: number): number {
        let calc: number = Math.floor((value * 100) / total);
        return calc > 100 ? 100 : calc;
    }
}
