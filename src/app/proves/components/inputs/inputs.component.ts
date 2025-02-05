import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SelectItem } from 'primeng/api';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';
import { UserContextService } from 'ra-ng/env/user-context';
import { ConfigurationService } from 'ra-ng/config';
import { EventBusService } from 'ra-ng/event';

import { JusAccessibilitatService, JusDropdownComponent, JusCalendariLiterals, JusTipusCapcaleraEnum, JusBotoModel, JusBotoEvent, JusTraduirCalendariPipe } from 'justicia-ng';

import { ErrorManagerService } from 'app/core';
import { animations_shrinkInOut } from 'app/shared';

@Component({
    templateUrl: './inputs.component.html',
    animations: [animations_shrinkInOut]
})
export class PrInputsComponent implements OnInit, AfterViewInit {
    public textAjuda: string;
    public jusBotons: JusBotoModel[];
    public JusTipusCapcaleraEnum = JusTipusCapcaleraEnum;
    public animacioShrinkInOut: string = 'in';
    public filtresCollapsed: boolean = false;
    public numSollicitudRemota: string;
    public indSollicitudRemota: boolean = false;
    public options: SelectItem[];

    public selected: string;
    public selected2: string;
    public disabledSel2: boolean = true;
    public dataAltaDesDe: Date;
    public cal: JusCalendariLiterals;
    @ViewChild('formPR') public form!: NgForm;
    @ViewChild('jusDD') public jusDD!: JusDropdownComponent;
    constructor(
        protected translate: TranslateService,
        protected router: Router,
        protected context: UserContextService,
        protected errorService: ErrorManagerService,
        protected cfg: ConfigurationService,
        protected log: RaNgLoggerI18nService,
        protected route: ActivatedRoute,
        // protected zone: NgZone,
        protected eventBus: EventBusService,
        private accessibilitatService: JusAccessibilitatService,
        private traduirCalendari: JusTraduirCalendariPipe
    ) { }

    public canviDropdown(event) {
        console.log('canviDropdown.selected=' + JSON.stringify(this.selected));
        console.log('canviDropdown.event=' + JSON.stringify(event));
    }

    ngOnInit() {
        this.cal = this.traduirCalendari.transform();
        this.textAjuda = this.translate.instant('ajuda.modificacioSollicitud');
        this.jusBotons = [];
        this.jusBotons.push({
            icon: 'fa fa-hand-pointer',
            label: 'Selecciona opció',
            visible: true,
            disabled: false,
            iconPos: 'left',
            name: 'butO1',
            typeSubmit: false
        });
        this.jusBotons.push({ icon: 'fa fa-eraser', label: 'Neteja', visible: true, disabled: false, name: 'butNetejaNull', typeSubmit: false });
        this.jusBotons.push({ icon: 'fa fa-search', label: 'Cerca', visible: true, disabled: false, iconPos: 'left', name: 'butNetejaUnd', typeSubmit: false });
        this.jusBotons.push({ icon: 'fa fa-check', label: 'Valida', visible: true, disabled: false, iconPos: 'left', name: 'butValidaForm', typeSubmit: true });

        this.options = [
            {
                label: 'opció 1',
                value: '1'
            },
            {
                label: 'opció 2',
                value: '2'
            },
            {
                label: 'opció 3',
                value: '3'
            }
        ];
        this.options.push({ label: this.translate.instant('lblSeleccionar'), value: null });
        this.selected2 = '2';
    }

    ngAfterViewInit() {
        // this.accessibilitatService.aplicaAccessibilitatPCalendars();
    }

    clickBotonera(event: JusBotoEvent) {
        if (event.boto.name === 'butO1') {
            this.selected = '1';
            this.disabledSel2 = false;
        } else if (event.boto.name === 'butNetejaNull') {
            this.selected = null;
            this.disabledSel2 = true;
        } else if (event.boto.name === 'butNetejaUnd') {
            this.selected = undefined;
        } else {
            this.log.debug('***this.form.valid=' + this.form.valid);
            this.log.debug('***this.selected=' + JSON.stringify(this.selected));
        }
    }

    public onKeyDown() { }
}
