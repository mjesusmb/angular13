
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { ToastrModule } from 'ngx-toastr';

import { ConfigurationService } from 'ra-ng/config';
import { LanguageConfigurationService } from 'ra-ng/i18n';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule, AppConfigService } from 'app/core';

import {
    AppSharedModule
} from 'app/shared';

import { FooComponent, HomeModule } from 'app/home';

import { LoginModule } from 'app/login';
import { AppInjector } from './app-injector';
import { environment } from 'environments/environment';
import { ProvesModule } from './proves/proves.module';
import { JusticiaNGModule } from 'justicia-ng';

export function TranslateLoaderFactory(cfgService: ConfigurationService) {
    return new LanguageConfigurationService(cfgService, 'i18n_');
}

export function LoadConfiguration(appConfigService: AppConfigService) {
    return () => appConfigService.loadConfiguration();
}

const MFE_ELEMENTS: any[] = [{ component: AppComponent, tag: 'app' }, { component: FooComponent, tag: 'mj-mfe-foo' }];

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslateLoaderFactory,
                deps: [ConfigurationService]
            }
        }),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            enableHtml: true,
            progressBar: true,
            closeButton: true
        }),
        JusticiaNGModule,
        CoreModule,
        AppSharedModule,
        HomeModule,
        LoginModule,
        ProvesModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: LoadConfiguration,
            deps: [AppConfigService],
            multi: true
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
    constructor(private injector: Injector) {
        AppInjector.setInjector(this.injector);
    }

    ngDoBootstrap(appRef: ApplicationRef) {
        if (environment.isMfe) {
            for (const el of MFE_ELEMENTS) {
                const customElement = createCustomElement(el.component, { injector: this.injector });
                customElements.define(el.tag, customElement);
            }
        } else {
            appRef.bootstrap(AppComponent);

        }
    }
}
