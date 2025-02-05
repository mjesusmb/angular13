import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { RaNgLoggerI18nService } from 'ra-ng/logger';

import { Constants } from 'app/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    @Input() enabled: boolean = true;
    jusElementsMenuVertical: MenuItem[];
    appVersion: string;

    constructor(
        protected log: RaNgLoggerI18nService) {
        this.appVersion = Constants.appName + ' ' + Constants.appVersion;
        console.log(this.appVersion);
    }

    ngOnInit() {
        this.jusElementsMenuVertical = [
            {
                label: 'Inici',
                icon: 'fa fa-home',
                routerLink: ['/inici'],
            },
            {
                label: 'Proves',
                icon: 'fa fa-database',

                items: [
                    {
                        label: 'Inputs',
                        icon: 'fa fa-book',
                        routerLink: ['/proves/inputs']
                    },
                    {
                        label: 'Missatges',
                        icon: 'fa fa-book',
                        routerLink: ['/proves/missatges']
                    },
                    {
                        label: 'Taules',
                        icon: 'fa fa-book',
                        routerLink: ['/proves/taules']
                    },
                    {
                        label: 'Input fitxer',
                        icon: 'fa fa-book',
                        routerLink: ['/proves/fileinputs']
                    }
                ]
            },
            {
                label: 'Listado',
                icon: 'fa fa-database',
                routerLink: ['/listado'],
            }
        ];
    }
}