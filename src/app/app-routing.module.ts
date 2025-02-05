import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent, PageNotFoundComponent, UnauthenticatedComponent } from 'app/shared';
import { HomeComponent } from 'app/home';
import { LoginComponent } from 'app/login';
import { ListadoComponent } from './listado/listado/listado.component';

const routes: Routes = [
    { path: '', redirectTo: 'inici', pathMatch: 'full' },
    { path: 'inici', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'listado', component: ListadoComponent },
    { path: 'no-autoritzat', component: ForbiddenComponent },
    { path: 'no-autenticat', component: UnauthenticatedComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }