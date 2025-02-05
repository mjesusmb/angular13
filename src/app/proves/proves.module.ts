import { NgModule } from '@angular/core';
import { AppSharedModule } from 'app/shared';

import { PrTaulaComponent } from './components/taula/taula.component';
import { PrTabletComponent } from './components/pr-tablet/pr-tablet.component';
import { PrMissatgesComponent } from './components/missatges/missatges.component';
import { PrInputsComponent } from './components/inputs/inputs.component';
import { PrFileUploadComponent } from './components/fileinputs/fileinputs.component';
import { ProvesRoutingModule } from './proves-routing.module';


@NgModule({
    imports: [AppSharedModule, ProvesRoutingModule],
    declarations: [PrTaulaComponent, PrMissatgesComponent, PrInputsComponent,PrTabletComponent, PrFileUploadComponent],
    exports: [PrTaulaComponent, PrMissatgesComponent, PrInputsComponent,PrTabletComponent, PrFileUploadComponent],
    providers: []
})
export class ProvesModule { }
