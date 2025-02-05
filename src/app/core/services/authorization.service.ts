import { Injectable } from '@angular/core';

import { ConfigurationService } from 'ra-ng/config';
import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TokenAuthorizationService, JwtHelper, JwtAuthInfo } from 'ra-ng/security';


import { ProfileService } from './profile.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationService extends TokenAuthorizationService {
    private atriClassName = 'AuthorizationService';
    private jwtHelper: JwtHelper = new JwtHelper();
    private tokenConf: any;

    constructor(private cfg: ConfigurationService, private logService: RaNgLoggerI18nService, profileMgr: ProfileService) {
        super(cfg, logService, profileMgr);
        this.setup();
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

    public isSessionActive(): boolean {
        return this.isAuthenticated(true);
    }

    private setup() {
        if (!this.cfg.conf.security.token) {
            this.logService.error('log.rang.conf.error', { class: this.atriClassName, detail: 'security.token' });
            return false;
        } else {
            if (!this.cfg.conf.security.token.storage || !this.cfg.conf.security.token.storage.provider || !this.cfg.conf.security.token.storage.key) {
                this.logService.error('log.rang.conf.error', { class: this.atriClassName, detail: 'security.token.storage' });
                return false;
            }
        }

        this.tokenConf = this.cfg.conf.security.token;
    }

    private getAuthInfo(): JwtAuthInfo {
        let token = this.tokenConf.storage.provider.getItem(this.tokenConf.storage.key);
        if (token !== undefined && token !== null) {
            let jwtHelper: JwtHelper = new JwtHelper();
            return jwtHelper.parse(token, this.tokenConf.jwt) as JwtAuthInfo;
        }

        return null;
    }
}
