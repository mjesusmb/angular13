import { ConsultaBaseFiltre } from 'app/core/model/rest/consulta-base-filtre';
import { Component, OnInit, NgZone } from '@angular/core';
import { JusTaulaDadesComponent, JusTaulaDadesPagina, JusTaulaDadesColumnes, JusBotoneraTaulaModel, JusSpinnerService } from 'justicia-ng';
import { ActivatedRoute, Router } from '@angular/router';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';
import { UserContextService } from 'ra-ng/env/user-context';
import { EventBusService} from 'ra-ng/event';
import { SaveProperty, recoverState, saveState, removeState } from 'ra-ng/navigation';

import { Cache } from 'ra-ng/cache';
import { ErrorManagerService } from 'app/core//services/error-manager.service';

import { SelectItem } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { FormBaseComponent } from './form-base.component';
import { LazyLoadEvent } from 'justicia-ng';
import { ElementEventsBusService } from 'app/core';

@Component({
    template: `<!--void-->`
})
export class CercaBaseComponent extends FormBaseComponent implements OnInit {
    @ViewChild('taulaDades') public taulaDades: JusTaulaDadesComponent;

    public totalRecords: number = 0;
    @SaveProperty public rowsPerPagina: number = 10;
    @SaveProperty public paginaActual: JusTaulaDadesPagina = { first: 0, rows: this.rowsPerPagina };
    @SaveProperty public columnaOrdenacio: string;
    @SaveProperty public ordreOrdenacio: number = 1;

    @SaveProperty public cercaRealitzada: boolean = true;

    public resultatLlistat: any[];
    public cols: JusTaulaDadesColumnes[];
    public jusBotoneraAccio: JusBotoneraTaulaModel;
    public columnOptions: JusTaulaDadesColumnes[];

    @SaveProperty public filtresSeleccionats: any = {};
    @SaveProperty public filtresSeleccionats_aplicats: any = {};

    public filtresCollapsed: boolean = false;

    public cacheKeyConfiguracio: string;

    constructor(
        protected translate: TranslateService,
        protected router: Router,
        protected route: ActivatedRoute,
        protected zone: NgZone,
        protected context: UserContextService,
        protected cache: Cache,
        protected errorService: ErrorManagerService,
        protected eventBus: EventBusService,
        protected log: RaNgLoggerI18nService,
        protected spinner: JusSpinnerService,
        protected elementEventBus: ElementEventsBusService
    ) {
        super(router, route, zone, context,  errorService, eventBus, translate, log, elementEventBus);
    }

    public onCanviPagina(event: JusTaulaDadesPagina) {
        this.log.debug('> CercaBaseComponent.onCanviPagina event=' + event);
        this.paginaActual = event;
        if (event.rows) {
            this.rowsPerPagina = event.rows;
        }
    }

    public cercaLazy(event: LazyLoadEvent) {
        if (this.cercaRealitzada === true) {
            this.log.debug('> CercaBaseComponent.cercaLazy cercaRealitzada=' + this.cercaRealitzada);
            this.cercaRealitzada = false;
            if (event.rows) {
                this.rowsPerPagina = event.rows;
            }
            if (!event.sortField && this.columnaOrdenacio) {
                event.sortField = this.columnaOrdenacio;
                event.sortOrder = this.ordreOrdenacio;
                this.taulaDades.setOrdre(this.columnaOrdenacio, this.ordreOrdenacio);
            }
            this.columnaOrdenacio = event.sortField;
            this.ordreOrdenacio = event.sortOrder;
            this.cercaRealitzada = true;
            this.cridaServeiCerca(event.first, event.sortField, event.sortOrder);
        }
    }

    public recoverState(esborra: boolean = false) {
        this.log.debug('> CercaBaseComponent.recoverState');
        recoverState(this, this.cache, this.cacheKeyConfiguracio);
        if (esborra === true) {
            this.removeState();
        }
    }

    public removeState() {
        this.log.debug('> CercaBaseComponent.removeState');
        removeState(this, this.cache, this.cacheKeyConfiguracio);
    }

    public saveState() {
        this.log.debug('> CercaBaseComponent.saveState');
        saveState(this, this.cache, this.cacheKeyConfiguracio);
    }

    protected cridaServeiCerca(firstRecord: number = 0, sortField: string, sortOrder: number = 1) {
        this.log.debug('> CercaBaseComponent.cridaServeiCerca firstRecord=' + firstRecord + '; sortField=' + sortField + '; sortOrder=' + sortOrder);
        if (Number.isNaN(firstRecord)) {
            firstRecord = 0;
        }
    }

    protected aplicaFiltres() {
        this.log.debug('> CercaBaseComponent.aplicaFiltres');
        if (this.filtresSeleccionats && this.filtresSeleccionats_aplicats) {
            Object.keys(this.filtresSeleccionats).forEach((filtre) => {
                this.filtresSeleccionats_aplicats[filtre] = this.filtresSeleccionats[filtre];
            });
        }
    }

    protected mapFiltreBase(firstRecord: number, sortField: string, sortOrder: number): ConsultaBaseFiltre {
        this.log.debug('> CercaBaseComponent.mapFiltreBase firstRecord=' + firstRecord + '; sortField=' + sortField + '; sortOrder=' + sortOrder);
        let filtre: ConsultaBaseFiltre = {
            paginador: {
                firstRecord: firstRecord,
                rpp: this.rowsPerPagina,
                sortColumn: '',
                sortDirection: 'ASC'
            }
        };

        filtre.paginador.sortColumn = sortField;

        sortOrder === 1 ? (filtre.paginador.sortDirection = 'ASC') : (filtre.paginador.sortDirection = 'DESC');

        this.log.debug('< CercaBaseComponent.mapFiltreBase filtre=' + JSON.stringify(filtre));
        return filtre;
    }

    protected omplirFiltreValorsDefecte(selectOption: SelectItem[]): SelectItem[] {
        this.log.debug('> CercaBaseComponent.omplirFiltreValorsDefecte selectOption:' + selectOption);
        selectOption = [];
        selectOption.push({ label: this.translate.instant('lblSeleccionar'), value: null });
        return selectOption;
    }
}
