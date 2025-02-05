
import { NgModule } from '@angular/core';
import { AppSharedModule } from 'app/shared';

import { HomeComponent } from './components/home/home.component';
import { FooComponent } from './components/foo/foo.component';

@NgModule({
    declarations: [HomeComponent, FooComponent],
    imports: [
        AppSharedModule
    ],
    exports: [HomeComponent, FooComponent]
})
export class HomeModule { }
