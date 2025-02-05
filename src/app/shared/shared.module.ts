import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { JusticiaNGModule } from 'justicia-ng';
import { FormBaseComponent } from './components/form-base.component';
import { CercaBaseComponent } from './components/cerca-base.component';
import { BlankComponent } from './components/blank/blank.component';
import { UnauthenticatedComponent } from './components/unauthenticated/unauthenticated.component';
import { AsFormattedDatePipe } from './pipes/asFormattedDatePipe';
import { NumberAsCurrencyPipe } from './pipes/numberAsCurrencyPipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BaseUnauthenticatedComponent } from './components/base-unauthenticated.component';
import { BaseComponent } from './components/base.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { ProgressDialogComponent } from './components/progress-dialog/progress-dialog.component';
import { SharedAvisGeneralComponent } from './components/shared-avis-general/shared-avis-general.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {TableModule} from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        JusticiaNGModule,
        SharedModule,
        MenubarModule,
        MessagesModule,
        MessageModule,
        ButtonModule,
        CalendarModule,
        InputTextModule,
        BreadcrumbModule,
        PanelMenuModule,
        CheckboxModule,
        DialogModule,
        ProgressBarModule,
        TableModule
    ],
    declarations: [
        AsFormattedDatePipe,
        NumberAsCurrencyPipe,
        FormBaseComponent,
        SidebarComponent,
        BaseUnauthenticatedComponent,
        BaseComponent,
        PdfViewerComponent,
        ProgressDialogComponent,
        SharedAvisGeneralComponent,
        CercaBaseComponent,
        BlankComponent,
        PageNotFoundComponent,
        ForbiddenComponent,
        UnauthenticatedComponent],
    exports: [
        CommonModule,
        FormsModule,
        SharedModule,
        MenubarModule,
        MessagesModule,
        MessageModule,
        ButtonModule,
        CalendarModule,
        InputTextModule,
        BreadcrumbModule,
        PanelMenuModule,
        CheckboxModule,
        TranslateModule,
        JusticiaNGModule,
        DialogModule,
        TableModule,
        ProgressBarModule,
        SidebarComponent,
        BaseUnauthenticatedComponent,
        BaseComponent,
        PdfViewerComponent,
        ProgressDialogComponent,
        SharedAvisGeneralComponent,
        FormBaseComponent,
        PageNotFoundComponent,
        ForbiddenComponent,
        UnauthenticatedComponent,
        BlankComponent,
        AsFormattedDatePipe,
        NumberAsCurrencyPipe
    ],
    schemas: []
})
export class AppSharedModule { }
