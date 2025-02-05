import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, NgZone, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationCancel } from '@angular/router';
import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';

import { ElementEventsBusService, CanviContextMfeService, Config } from 'app/core';
import { ElementEvent } from 'app/core/model';
import { JusMissatgesComponent } from 'justicia-ng';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss',
    ],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('jusMissatges') public jusMissatges: JusMissatgesComponent;

    @Input()
    public set initialState(value: any) {
        this.zone.run(() => {
            this.innerInitialState = value;

            if (this.innerInitialState) {

                if (this.innerInitialState.route) {
                    this.cleanContextChangeState(this.innerInitialState.route);

                    console.log('SET initialState: Initial Route:', this.innerInitialState.route);
                    console.log('SET initialState: Initial State:', this.innerInitialState.state);

                    setTimeout(() => {
                        this.router.navigate([this.innerInitialState.route], { state: this.innerInitialState.state });
                    });
                }
            }

        });
    }

    public get initialState(): any {
        return this.innerInitialState;
    }

    @Input()
    public set lang(value: string) {
        console.log('SET lang', value);
        this.zone.run(() => {
            if (value) {
                console.log('this.i18n.use', value);
                this.i18n.use(value);
                this.innerLang = value;
            }
        });
    }

    public get lang(): string {
        return this.innerLang;
    }

    @Input()
    public set sideMenuVisible(value: boolean) {
        console.log('SET sideMenuVisible', value);
        this.zone.run(() => {
            this.innerSideMenuVisible = value;
        });
    }

    public get sideMenuVisible(): boolean {
        return this.innerSideMenuVisible;
    }

    @Output()
    public loaded: EventEmitter<any> = new EventEmitter();

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    public config = Config;

    private subscriptions: Subscription = new Subscription();
    private elementBusSubscription: Subscription = new Subscription();
    private innerInitialState: any;
    private innerLang: string;
    private innerSideMenuVisible: boolean = true;
    private noSidebarRoutes: string[] = ['/login', '/no-autoritzat', '/no-autenticat', '/ruta-no-valida'];

    constructor(
        private zone: NgZone,
        private router: Router,
        private logService: RaNgLoggerI18nService,
        private i18n: TranslateService,
        private elementEventsBus: ElementEventsBusService,
        private ccMfeService: CanviContextMfeService
    ) { }

    get showHeader(): boolean {
        return false;
    }

    get showSidebar(): boolean {
        return false;
    }

    ngOnInit() {
        this.subscribeToRouterEvents();
        this.subscribeToElementEvents();
        this.handleInitialNavigation();
        if (!this.i18n.currentLang) {
            this.i18n.use(Config.appLang);
          }
    }

    ngAfterViewInit() {


        setTimeout(() => {
            this.logService.info('[AVS] LOADED');

            this.loaded.emit({ tag: Config.appElementTag });
        });

        this.jusMissatges.subscribeToBusEvents(this.subscriptions);


    }

    ngOnDestroy(): void {
        console.log('AppComponent.ngOnDestroy');
        if (this.elementBusSubscription) {
            this.elementBusSubscription.unsubscribe();
        }

        // HACK PER IE 11
        this.router.navigate(['blank']);
    }

    private subscribeToElementEvents() {
        this.elementBusSubscription = this.elementEventsBus.listen((event: ElementEvent) => {
            console.log('POC-MFE-APP CUSTOM EVENT', event);
            this.action.emit(event);
        });
    }

    private handleInitialNavigation() {
        this.zone.run(() => {
            setTimeout(() => {
                console.log('handleInitialNavigation (this.innerInitialState)', this.initialState);
                if (this.innerInitialState && this.innerInitialState.route) {
                    return;
                }

                this.router.navigate(['inici']);
            });
        });
    }
    private cleanContextChangeState(routeTo: string) {
        if (!this.ccMfeService.getCCState(Config.appElementTag, routeTo)) {
            this.ccMfeService.removeCCState(Config.appElementTag);
        }
    }


    private subscribeToRouterEvents() {
        this.router.events.subscribe((event) => {

            switch (true) {
                case event instanceof NavigationStart:
                    let url: string = event['url'];

                    if (url.indexOf('#') > -1) {
                        url = url.substring(0, url.indexOf('#'));
                    }

                    setTimeout(() => {
                        this.sideMenuVisible = this.noSidebarRoutes.indexOf(url) === -1;
                    }, 10);

                    break;

                case event instanceof NavigationCancel:
                    setTimeout(() => {
                        this.sideMenuVisible = this.noSidebarRoutes.indexOf(this.router.url) === -1;
                    }, 10);

                    break;

                default:
                    break;
            }
        });
    }
}
