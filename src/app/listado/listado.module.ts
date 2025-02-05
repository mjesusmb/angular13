import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { ProvesModule } from '../proves/proves.module';

@NgModule({
  declarations: [
    ListadoComponent
  ],
  imports: [
    CommonModule,
    ProvesModule
  ]
})
export class ListadoModule { }