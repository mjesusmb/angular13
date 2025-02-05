import { Component, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';
import { UserContextService } from 'ra-ng/env/user-context';
import { ConfigurationService } from 'ra-ng/config';
import { EventBusService } from 'ra-ng/event';

import {
    JusTaulaDadesComponent,
    JusTaulaDadesColumnes,
    JusTaulaDadesPagina,
    JusBotoModel,
    JusTaulaDadesCapcalera,
    JusBotoneraTaulaModel,
    JusExportacioUtilsService
} from 'justicia-ng';
import { ErrorManagerService } from 'app/core';

@Component({
    templateUrl: './taula.component.html'
})
export class PrTaulaComponent implements OnInit {
    @ViewChild('taulaDades') taulaDades!: JusTaulaDadesComponent;
    @ViewChild('taulaDades2') taulaDades2!: JusTaulaDadesComponent;
    @Input() public enabled: boolean = true;

    public resultatLlistat: any[] = [];
    public datasource: any[] = [];
    public cols: JusTaulaDadesColumnes[];
    public jusBotoneraAccio: JusBotoneraTaulaModel;
    public columnOptions: JusTaulaDadesColumnes[];
    public jusBotons: JusBotoModel[];
    public totalRecords: number = 0;
    public rowsPerPagina: number = 5;
    public paginaActual: JusTaulaDadesPagina = { first: 0, rows: this.rowsPerPagina };
    public columnaOrdenacio: string;
    public ordreOrdenacio: number = 1;
    public capcaleraTaula: JusTaulaDadesCapcalera = { botoPdf: true, botoCsv: true, titol: 'Taula' };
    public loading: boolean = false;

    public resultatLlistat2: any[] = [];
    public cols2: JusTaulaDadesColumnes[];
    public jusBotoneraAccio2: JusBotoneraTaulaModel;
    public columnOptions2: JusTaulaDadesColumnes[];
    public jusBotons2: JusBotoModel[];
    public totalRecords2: number = 0;
    public rowsPerPagina2: number = 10;
    public paginaActual2: JusTaulaDadesPagina = { first: 0, rows: this.rowsPerPagina2 };
    public columnaOrdenacio2: string;
    public ordreOrdenacio2: number = 0;
    public capcaleraTaula2: JusTaulaDadesCapcalera = { botoPdf: true, botoCsv: true, titol: 'Taula' };

    constructor(
        private translate: TranslateService,
        protected router: Router,
        // protected jsonService: JusDataUtilsService,
        protected context: UserContextService,
        // protected profileService: JusPerfilService,
        // protected layoutService: LayoutService,
        protected errorService: ErrorManagerService,
        protected cfg: ConfigurationService,
        protected log: RaNgLoggerI18nService,
        protected route: ActivatedRoute,
        protected zone: NgZone,
        protected eventBus: EventBusService, // private sharedLayoutService: SharedLayoutService,
        private exportService: JusExportacioUtilsService
    ) {}

    ngOnInit() {
        this.translate.use(this.translate.store.currentLang);
        this.log.debug('1' + this.taulaDades);
        this.datasource = [
            // tslint:disable-next-line:max-line-length
            {
                idSollicitud: 't/VNxfm9+fF2sb3%5RtW',
                numSollicitudRemota: 'SR201800000077',
                dataIniciSollicitud: '30102018 13:28:16',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: 't/VNxfm9+fEF6>[]kJAU',
                numSollicitudRemota: 'SR201800000076',
                dataIniciSollicitud: '30102018 13:27:49',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: 't/VNxfm9+f([q)jL&zmB',
                numSollicitudRemota: 'SR201800000075',
                dataIniciSollicitud: '30102018 13:26:51',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: 't/VNxfm9,<U[[~{RGW5L',
                dataIniciSollicitud: '15102018 16:18:06',
                classeRegistre: 'Declaratiu estat civil i capacitat',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: 't/VNxfm9+f6ZdNt0n#-V',
                dataIniciSollicitud: '10102018 15:13:12',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: 't/VNxfm9,<)AUzD/gKjE',
                dataIniciSollicitud: '03102018 10:53:23',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Executòria'
            },
            {
                idSollicitud: 't/VNxfm9,<CSYn&+~AtF',
                dataIniciSollicitud: '29082018 14:03:18',
                classeRegistre: 'Mesures cautelars prèvies a la demanda competència mercantil',
                codiUnitatRegistre: '22936',
                unitatRegistre: '(INVALID) Secció Mercantil del Servei comú de registre de Barcelona',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: 't/VNxfm9+fb)J.ln!9jW',
                numSollicitudRemota: 'SR201800000071',
                dataIniciSollicitud: '28062018 11:50:13',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: 't/VNxfm9+fD/,tbZJN4T',
                dataIniciSollicitud: '27062018 11:58:38',
                classeRegistre: 'Conciliació',
                codiUnitatRegistre: '22330',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de El Prat de Llobregat',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: 't/VNxfm9+fhrp?0jST~D',
                dataIniciSollicitud: '27062018 11:44:12',
                classeRegistre: 'Demandes sobre defensa de competència',
                codiUnitatRegistre: '22936',
                unitatRegistre: '(INVALID) Secció Mercantil del Servei comú de registre de Barcelona',
                assumpte: 'Demanda'
            },
            // tslint:disable-next-line:max-line-length
            {
                idSollicitud: '1',
                dataIniciSollicitud: '13/02/2019',
                classeRegistre: 'Incidents: jurament comptes, terceries,declinatòries, impugn. costes,impugn. liq. interessos ,etc. ',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: '2',
                numSollicitudRemota: 'DISABLED',
                disableCheck: true,
                dataIniciSollicitud: '30/10/2018',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: '3',
                numSollicitudRemota: 'SR201800000076',
                dataIniciSollicitud: '30/10/2018',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: '4',
                numSollicitudRemota: 'SR201800000075',
                dataIniciSollicitud: '30102018 13:26:51',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: '5',
                dataIniciSollicitud: '15102018 16:18:06',
                classeRegistre: 'Declaratiu estat civil i capacitat',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: '6',
                dataIniciSollicitud: '10102018 15:13:12',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: '7',
                dataIniciSollicitud: '03102018 10:53:23',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Executòria'
            },
            {
                idSollicitud: '8',
                dataIniciSollicitud: '29082018 14:03:18',
                classeRegistre: 'Mesures cautelars prèvies a la demanda competència mercantil',
                codiUnitatRegistre: '22936',
                unitatRegistre: '(INVALID) Secció Mercantil del Servei comú de registre de Barcelona',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: '9',
                numSollicitudRemota: 'SR201800000071',
                dataIniciSollicitud: '28062018 11:50:13',
                classeRegistre: 'Concurs de creditors',
                codiUnitatRegistre: '22882',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de Zyxzyx',
                assumpte: 'Demanda'
            },
            {
                idSollicitud: '10',
                dataIniciSollicitud: '27062018 11:58:38',
                classeRegistre: 'Conciliació',
                codiUnitatRegistre: '22330',
                unitatRegistre: '(INVALID) Secció Civil del Servei comú de registre de El Prat de Llobregat',
                assumpte: 'Demanda'
            },
            { idSollicitud: '11', dataIniciSollicitud: '-', classeRegistre: 'classe', codiUnitatRegistre: '11', unitatRegistre: 'Zyx', assumpte: 'Demanda' },
            { idSollicitud: '12', dataIniciSollicitud: '-', classeRegistre: 'classe', codiUnitatRegistre: '12', unitatRegistre: 'Zyx', assumpte: 'Demanda' }
        ];
        this.log.debug('2' + this.taulaDades);
        this.inicialitzaTaula();
        // this.log.debug("3"+this.taulaDades);
        // this.taulaDades.onLazyLoad.emit({ first: this.paginaActual.first, rows: this.paginaActual.rows, sortField: this.columnaOrdenacio, sortOrder: this.ordreOrdenacio });
    }

    public onClickExportaPDF() {
        let title = 'Resolutions (Desglosament per Secretari) des de 01/07/2010 fis a 30/09/2022';
        let unit = 'UPSD: (INVALID) Secció Civil Jutjat de Primera Instància i instrucció nº1 de Blanes';
        this.exportService.generaPDF_taulaDades(title, unit, this.cols2, this.datasource, false, 'Format-amb-títol-i-subtítol');
        // this.exportacioService.generaPDF_taulaDades('',unit, this.cols2, this.datasource,false, "Format-sense-títol");
        // this.exportacioService.generaPDF_taulaDades(title,'', this.cols2, this.datasource,false, "Format-amb-títol");
        // this.exportacioService.generaPDF_taulaDades('','', this.cols2, this.datasource,false, "Format-sense-títol");
    }

    public onClickExportaCSV1() {
        this.log.debug('> tauleComponent.onClickExportaPDF');
        this.exportService.generaCSV_taulaDades('TITOL', this.cols, this.resultatLlistat);
    }

    public onClickExportaCSV11() {
        this.log.debug('> tauleComponent.onClickExportaPDF');
        this.exportService.generaCSV('TITOL', this.cols, this.resultatLlistat);
    }

    public onClickExportaCSV2() {
        this.log.debug('> tauleComponent.onClickExportaPDF');
        this.exportService.generaCSV('TITOL2', this.cols2, this.resultatLlistat2);
    }

    private inicialitzaTaula() {
        this.cols = [
            {
                field: 'numSollicitudRemota',
                header: 'Col 1',
                sortable: true,
                hidden: true,
                styleField: 'style',
                styleColumn: { width: '150px', 'max-width': '150px', 'text-align': 'center' }
            },
            {
                field: 'dataIniciSollicitud',
                header: 'Columna 2',
                sortable: true,
                styleField: 'style',
                styleColumn: { width: '140px', 'max-width': '140px', 'text-align': 'center' }
            },
            {
                field: 'classeRegistre',
                header: 'Col. 3',
                sortable: true,
                styleField: 'style' /*, styleColumn: { 'width': '225px', 'min-width': '225px' }*/
            },
            {
                field: 'unitatRegistre',
                header: 'Darrera',
                sortable: true,
                styleField: 'style' /*, styleColumn: { 'width': '225px', 'min-width': '225px' }*/
            } /*,
            { field: 'assumpte', header: this.translate.instant('ui.presentades.i18n05'), sortable: true, styleField: 'style', styleColumn: { 'text-align': 'center' } }*/
        ];

        this.cols2 = [
            {
                field: 'numSollicitudRemota',
                header: 'T2 Col 1',
                sortable: true,
                styleField: 'style',
                styleColumn: { width: '150px', 'max-width': '150px', 'text-align': 'center' }
            },
            {
                field: 'dataIniciSollicitud',
                header: 'T2 Columna 2',
                sortable: true,
                styleField: 'style',
                styleColumn: { width: '140px', 'max-width': '140px', 'text-align': 'center' }
            },
            {
                field: 'classeRegistre',
                header: 'T2 Col. 3',
                sortable: true,
                styleField: 'style' /*, styleColumn: { 'width': '225px', 'min-width': '225px' }*/
            },
            {
                field: 'unitatRegistre',
                header: 'T2 Darrera',
                sortable: true,
                styleField: 'style' /*, styleColumn: { 'width': '225px', 'min-width': '225px' }*/
            } /*,
            { field: 'assumpte', header: this.translate.instant('ui.presentades.i18n05'), sortable: true, styleField: 'style', styleColumn: { 'text-align': 'center' } }*/
        ];

        this.jusBotoneraAccio = {
            styleHeaderColumn: { width: '90px', 'min-width': '90px' },
            botons: [
                {
                    icon: 'fa fa-search',
                    label: this.translate.instant('ui.comu.modificar'),
                    name: 'bot-edita'
                },
                {
                    icon: 'fa fa-file-o',
                    label: this.translate.instant('ui.consultaSollicitud.sol.rem.liurar'),
                    name: 'bot-lliurar'
                },
                {
                    icon: 'fa fa-times',
                    label: this.translate.instant('ui.comu.i18n31'),
                    name: 'bot-suprimir'
                }
            ]
        };

        this.jusBotoneraAccio2 = {
            styleHeaderColumn: { width: '90px', 'min-width': '90px' },
            botons: [
                {
                    icon: 'fa fa-search',
                    label: this.translate.instant('ui.comu.modificar'),
                    name: 'bot-edita'
                },
                {
                    icon: 'fa fa-file-o',
                    label: this.translate.instant('ui.consultaSollicitud.sol.rem.liurar'),
                    name: 'bot-lliurar'
                },
                {
                    icon: 'fa fa-times',
                    label: this.translate.instant('ui.comu.i18n31'),
                    name: 'bot-suprimir'
                }
            ]
        };

        this.columnOptions = [];
        this.columnOptions = this.cols;

        this.columnOptions2 = [];
        this.columnOptions2 = this.cols2;

        // this.recoverState();

        if (!this.columnaOrdenacio) {
            this.columnaOrdenacio = this.cols[1].field;
        }

        this.ordreOrdenacio = -1;

        if (this.paginaActual) {
            // this.taulaDades.setCurrentPage(this.paginaActual);
        }

        this.jusBotons = [];
        this.jusBotons.push({
            icon: 'fa fa-angle-double-left',
            label: this.translate.instant('ui.common.text.sortir'),
            visible: true,
            disabled: false,
            iconPos: 'left',
            name: 'butSortir',
            typeSubmit: false
        });
        this.jusBotons.push({ label: this.translate.instant('ui.comu.neteja'), visible: true, disabled: false, name: 'butNeteja', typeSubmit: false });
        this.jusBotons.push({
            icon: 'fa fa-search',
            label: this.translate.instant('ui.comu.cercar'),
            visible: true,
            disabled: false,
            iconPos: 'left',
            name: 'butCerca',
            typeSubmit: true
        });
    }

    onLazy(event: LazyLoadEvent) {
        // this.loading = true;
        setTimeout(() => {
            if (this.datasource) {
                this.resultatLlistat = this.datasource.slice(event.first, event.first + event.rows);
                this.totalRecords = this.datasource.length;
            }
            // this.loading = false;
        }, 1000);
    }

    onLazy2(event: LazyLoadEvent) {
        // this.loading = true;
        setTimeout(() => {
            if (this.datasource) {
                console.log('onLazy2 datasource:' + this.datasource.length);
                this.resultatLlistat2 = this.datasource.slice(event.first, event.first + event.rows);
                console.log('Reading onLazy2 datasource.length:' + this.datasource.length);
                this.totalRecords2 = this.datasource.length;
            }
            // this.loading = false;
        }, 1000);
    }

    onHeaderCheckboxToggle(event) {
        this.log.debug('pr-taula.onHeaderCheckboxToggle');
        this.log.debug('pr-taula.selection=' + this.taulaDades.selection.length);
        /*let selection = this.taulaDades.selection.map((x) => Object.assign({}, x));
        this.taulaDades.selection = selection;*/
    }

    onHeaderCheckboxToggle2(event) {
        this.log.debug('pr-taula22222.onHeaderCheckboxToggle');
        this.log.debug('pr-taula22222.selection=' + this.taulaDades2.selection.length);
        /*let selection = this.taulaDades.selection.map((x) => Object.assign({}, x));
        this.taulaDades.selection = selection;*/
    }

    onCanviSeleccio(event) {
        this.log.debug('pr-taula.onCanviSeleccio');
    }

    onCanviSeleccio2(event) {
        this.log.debug('pr-taula22222.onCanviSeleccio');
    }
}
