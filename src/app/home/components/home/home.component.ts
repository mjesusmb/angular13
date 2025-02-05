
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';
import { UserContextService } from 'ra-ng/env/user-context';
import { ConfigurationService } from 'ra-ng/config';
import { EventBusService } from 'ra-ng/event';
import { SecurityTokenRequestService } from 'ra-ng/security';

import { JusTipusCapcaleraEnum, JusSpinnerService, ContextChangeState } from 'justicia-ng';
import { ElementEventsBusService, CanviContextMfeService, Config, AuthService, ErrorManagerService, ElementEventType } from 'app/core';
import { animations_shrinkInOut, BaseComponent } from 'app/shared';
import { HomeService } from '../../services/home.service';

import { environment } from 'environments/environment';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    animations: [animations_shrinkInOut]
})
export class HomeComponent extends BaseComponent implements OnInit {
    public comments: any[] = [];
    public userIsLoggedIn: boolean = false;
    public isLogged: boolean = false;
    public error: string = null;
    public tipusCapcalera: JusTipusCapcaleraEnum = JusTipusCapcaleraEnum.Cerca;
    public animacioShrinkInOut: string = 'in';
    public externalMfeVisible = false;
    public veureDialeg: boolean;
    public esMfeContext = environment.isMfe;

    constructor(
        protected translate: TranslateService,
        protected router: Router,
        protected context: UserContextService,
        protected errorService: ErrorManagerService,
        protected cfg: ConfigurationService,
        protected log: RaNgLoggerI18nService,
        protected route: ActivatedRoute,
        protected zone: NgZone,
        protected eventBus: EventBusService,
        protected elementEventBus: ElementEventsBusService,
        private spinner: JusSpinnerService,
        private homeService: HomeService,
        private authService: AuthService,
        private ccMfeService: CanviContextMfeService,
        private http: HttpClient,
        private authHttp: SecurityTokenRequestService
    ) {
        super(router, route, zone, context, errorService, eventBus, log, elementEventBus);
    }

    ngOnInit() {
        this.userIsLoggedIn = this.authService.userIsLoggedIn();
        let ccState: ContextChangeState = this.ccMfeService.getCCState(Config.appElementTag, this.router.url);

        this.ccMfeService.removeCCState(Config.appElementTag);

        if (ccState && ccState.data) {
            console.log('%cCC STATE', 'color: #fd7e14', ccState);

            const restoredData = ccState.data.find((i) => i.cacheKey === 'some-cache-key');

            if (restoredData) {
                console.log('%cCC STATE CACHE DATA SAMPLE', 'color: #fd7e14', restoredData.cacheData);
            }
        }
    }

    public goToParentRoute() {
        this.elementEventBus.dispatch({
            type: ElementEventType.Ruta,
            data: ['/inici']
        });
    }

    public toggleMFE() {
        this.externalMfeVisible = !this.externalMfeVisible;
        this.elementEventBus.dispatch({ type: ElementEventType.Visibilitat, data: { tag: 'jus-mfe', visibility: this.externalMfeVisible } });
    }

    public animacioToogle(event: boolean) {
        if (event === true) {
            this.animacioShrinkInOut = 'out';
        } else {
            this.animacioShrinkInOut = 'in';
        }
    }

    public cc() {
        this.spinner.toggle(true);

        const data = [
            {
                cacheKey: 'some-cache-key',
                cacheData: [{ field: 'some random data stored in CC state', field2: new Date() }]
            },
            {
                cacheKey: 'some-other-cache-key',
                cacheData: { col: 'some more data here stored in CC state', flag: true }
            }
        ];

        let ccSampleRequest = {
            codiIdioma: 'ca',
            idFromBussinessObject: 44444,
            idOtherBusinessStuff: 666
        };

        this.homeService
            .obteParamsCCMfe(ccSampleRequest)
            .pipe(
                switchMap((ccResponse) =>
                    this.ccMfeService.canviContext('poc-mfe-app-2', ccResponse.paramsCC, data).pipe(
                        catchError((error) => {
                            this.spinner.toggle(false);
                            this.errorService.process(error);
                            return of(null);
                        })
                    )
                )
            )
            .subscribe(
                (result) => {
                    if (!result) {
                        this.spinner.toggle(false);
                        this.errorService.notifyError(this.translate.instant('cc.parameters.error'));
                    }

                    this.spinner.toggle(false);
                },
                (error) => {
                    this.spinner.toggle(false);
                    this.errorService.process(error);
                    this.spinner.toggle(false);
                }
            );
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
        this.userIsLoggedIn = this.authService.userIsLoggedIn();
    }

    refreshToken() {
        const url: string = Config.security.token.jwt.checkToken.endpoint;
        const authInfo = JSON.parse(this.authHttp.getAuthInfo());
        console.log('AUTH INFO', authInfo);
        const accessToken = authInfo.accessToken;
        const refreshToken = authInfo.refreshToken;
        const headers = new HttpHeaders().append('authorization', `Bearer ${accessToken}`);
        this.http.post(url, { refreshToken }, { headers }).subscribe(
            (response: any) => {
                console.log('REFRESHED ACCESS TOKEN', response.accessToken);
                this.authHttp.saveAuthInfo({ refreshToken, accessToken: response.accessToken });
            },
            (error) => {
                console.log('ERROR REFRESHING ACCESS TOKEN', error);
            }
        );
    }

    obrir() {
        this.veureDialeg = true;
    }

    tancar(event) {
        console.log('tancar', event);
        this.veureDialeg = false;
    }
}
