import { ModuleWithProviders } from '@angular/core';
import { Routes, ExtraOptions, RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

export class MicrofrontendsRoutingModule {
    public static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders<any> {
        return environment.isMfe ? RouterTestingModule.withRoutes(routes, config) : RouterModule.forRoot(routes, config);
    }

    public static forChild(routes: Routes): ModuleWithProviders<any> {
        return environment.isMfe ? RouterTestingModule.withRoutes(routes) : RouterModule.forChild(routes);
    }

    public static getModule() {
        return environment.isMfe ? RouterTestingModule : RouterModule;
    }
}
