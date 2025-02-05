import { Component, Input } from '@angular/core';
import { AvisGeneral } from 'app/core/model/avis-general';

@Component({
    selector: 'app-shared-avis-general',
    templateUrl: './shared-avis-general.component.html'
})
export class SharedAvisGeneralComponent {
    tipusCapcalera;
    @Input() public avisos: AvisGeneral[];
}
