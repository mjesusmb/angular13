import { Component, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';
import { UserContextService } from 'ra-ng/env/user-context';
import { EventBusService } from 'ra-ng/event';

import { BaseComponent } from './base.component';
import { ErrorManagerService } from 'app/core/services/error-manager.service';
import { JusTipusCapcaleraEnum } from 'justicia-ng';
import { ElementEventsBusService } from 'app/core';

@Component({
    moduleId: module.id,
    template: '<form #formRMA="ngForm" id="formRMA" role="form" name="formRMA" (keydown)="onKeyDown($event)"></form>'
})
export class FormBaseComponent extends BaseComponent {
    @ViewChild('formRMA') public form!: NgForm;
    public tipusCapcalera: JusTipusCapcaleraEnum = JusTipusCapcaleraEnum.Cerca;
    public filtresCollapsed: boolean = false;
    public animacioShrinkInOut: string = 'in';
    public llistaInputs: string[] = [];
    public nameSubmitButton: string = 'bot-cercar';

    public get submitted(): boolean {
        return this._submitted;
    }

    public set submitted(isSubmitted: boolean) {
        if (this.form) {
            let keyArr: any[] = Object.keys(this.form.controls);

            if (isSubmitted) {
                keyArr.forEach((key: any) => {
                    let control = this.form.form.get(key);
                    if (control.invalid) {
                        control.markAsDirty({ onlySelf: false });
                        control.markAsTouched({ onlySelf: false });
                    }
                });
            } else {
                keyArr.forEach((key: any) => {
                    let control = this.form.form.get(key);
                    control.markAsPristine({ onlySelf: false });
                    control.markAsUntouched({ onlySelf: false });
                });
            }
        }
    }

    private _submitted: boolean = false;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected zone: NgZone,
        protected context: UserContextService,
        protected errorService: ErrorManagerService,
        protected eventBus: EventBusService,
        protected i18n: TranslateService,
        protected log: RaNgLoggerI18nService,
        protected elementEventBus: ElementEventsBusService
    ) {
        super(router, route, zone, context, errorService, eventBus, log, elementEventBus);
    }

    public onKeyDown(event) {
        // Perquè es cerqui quan es presiona 'enter' amb els llistats dropdown
        let id: string = null;

        if (event.keyCode === 13) {
            id = event.target.id ? event.target.id : event.target.name;
        }

        if (event.keyCode === 13 && id && this.llistaInputs.indexOf(id) > -1) {
            document.getElementsByName(this.nameSubmitButton)[0].click();
        }
    }

    public animacioToogle(event: boolean) {
        if (event === true) {
            this.animacioShrinkInOut = 'out';
        } else {
            this.animacioShrinkInOut = 'in';
        }
    }

    protected setControlInvalid(name: string, error: string = 'error') {
        if (this.form) {
            let formControl = this.form.controls[name];
            if (formControl) {
                formControl.markAsDirty({ onlySelf: true });
                formControl.markAsTouched({ onlySelf: true });
                formControl.setErrors(null);
                formControl.setErrors({ taxError: error });
            }
        }
    }

    protected setControlPristine(name: string) {
        if (this.form) {
            let formControl = this.form.controls[name];
            if (formControl) {
                formControl.markAsUntouched({ onlySelf: true });
                formControl.markAsPristine({ onlySelf: true });
                formControl.setErrors({ taxError: 'error' });
                formControl.setErrors(null);
            }
        }
    }

    protected omplirFiltreValorsDefecte(selectOption: SelectItem[]): SelectItem[] {
        selectOption = [];
        selectOption.push({ label: this.i18n.instant('lblSeleccionar'), value: null });
        return selectOption;
    }
}
