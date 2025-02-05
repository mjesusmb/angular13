
import { NgModule } from '@angular/core';
import { AppSharedModule } from 'app/shared';
import { LoginComponent } from './components/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        AppSharedModule
    ],
    exports: [LoginComponent]
})
export class LoginModule { }
