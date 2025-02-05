import { Injectable } from '@angular/core';
import { Config } from '../config/config';
import { SecurityTokenRequestService, JwtAuthInfo, JwtHelper } from 'ra-ng/security';

@Injectable({ providedIn: 'root' })
export class FakeAuthService {
    private jwtHelper: JwtHelper = new JwtHelper();
    private tokenConf: any;

    constructor(private securityService: SecurityTokenRequestService) {
        this.setup();
    }

    public authenticateFake(loginInfo: any): boolean {
        if (this.isAuthenticated(true)) {
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

    public isAuthenticated(checkExpired: boolean = false): boolean {
        let authInfo: JwtAuthInfo = this.getAuthInfo();

        if (authInfo !== null) {
            let jwtToken: string = null;

            try {
                jwtToken = this.jwtHelper.decodeToken(authInfo.id_token);

                if (checkExpired) {
                    return !this.jwtHelper.isTokenExpired(authInfo.id_token);
                } else {
                    return true;
                }
            } catch (error) {}

            return jwtToken !== null;
        } else {
            return false;
        }
    }

    private getAuthInfo(): JwtAuthInfo {
        let token = this.tokenConf.storage.provider.getItem(this.tokenConf.storage.key);
        if (token !== undefined && token !== null) {
            let jwtHelper: JwtHelper = new JwtHelper();
            return jwtHelper.parse(token, this.tokenConf.jwt) as JwtAuthInfo;
        }

        return null;
    }

    private setup() {
        if (!Config.security.token) {
            return false;
        } else {
            if (!Config.security.token.storage || !Config.security.token.storage.provider || !Config.security.token.storage.key) {
                return false;
            }
        }

        this.tokenConf = Config.security.token;
    }
}
