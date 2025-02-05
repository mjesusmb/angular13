import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { MicrofrontendsRoutingModule } from 'app/mfe-routing.module';

import { PrInputsComponent } from './components/inputs/inputs.component';
import { PrTaulaComponent } from './components/taula/taula.component';
import { PrMissatgesComponent } from './components/missatges/missatges.component';
import { PrTabletComponent } from './components/pr-tablet/pr-tablet.component';
import { PrFileUploadComponent } from './components/fileinputs/fileinputs.component';

const routes: Routes = [
    {
        path: 'proves',
        children: [
            { path: 'inputs', component: PrInputsComponent },
            { path: 'missatges', component: PrMissatgesComponent },
            { path: 'taules', component: PrTaulaComponent },
            { path: 'pr-tablet', component: PrTabletComponent },
            { path: 'fileinputs', component: PrFileUploadComponent}
        ]
    }
];

@NgModule({
    imports: [MicrofrontendsRoutingModule.forChild(routes)],
    exports: [MicrofrontendsRoutingModule.getModule()]
})
export class ProvesRoutingModule { }
