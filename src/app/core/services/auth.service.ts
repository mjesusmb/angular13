import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SecurityTokenRequestService } from 'ra-ng/security';
import { Config } from './../config/config';
import { AuthorizationService } from './authorization.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private securityService: SecurityTokenRequestService, private authz: AuthorizationService, private router: Router) {}

    public login() {
        if (Config.appId.endsWith('.local')) {
            this.router.navigate(['login']);
        } else {
            const endpoint = (Config.security.token as any).endpoint;

            if (endpoint) {
                location.href = `${endpoint}?return-app=${Config.appId}`;
            }
        }
    }

    public authenticateFake(loginInfo: any): boolean {
        if (this.authz.isAuthenticated(true)) {
            return true;
        }

        if (loginInfo && loginInfo.accessToken && loginInfo.refreshToken) {
            let authInfo = {};
            authInfo[Config.security.token.jwt.key] = loginInfo.accessToken;
            authInfo[Config.security.token.jwt.checkToken.key] = loginInfo.refreshToken;

            this.securityService.saveAuthInfo(authInfo);
            return true;
        }

        return false;
    }

    public logout() {
        this.securityService.removeAuthInfo();
    }

    public userIsLoggedIn(): boolean {
        return this.authz.isAuthenticated(false);
    }
}
