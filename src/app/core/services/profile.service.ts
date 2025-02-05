import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { contentHttpHeaders, HttpClientRequestOptions } from 'ra-ng/http';
import { ConfigurationService } from 'ra-ng/config';
import { TranslateService } from 'ra-ng/i18n';
import { ProfileManagerService, SecuredObject, SecurityTokenRequestService, CryptoService } from 'ra-ng/security';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends ProfileManagerService {
    public onProfileChange: Subject<any>;
    public onLanguageChange: Subject<any>;
    private currentClassName = 'AtriProfileService';
    private profileConfiguration: any;

    constructor(private cfg: ConfigurationService, private logService: RaNgLoggerI18nService, private i18: TranslateService, private authHttp: SecurityTokenRequestService) {
        super(cfg, logService);

        if (this.cfg.conf.security && this.cfg.conf.security.profile) {
            this.profileConfiguration = this.cfg.conf.security.profile;
            if (this.profileConfiguration && this.profileConfiguration.storage && this.profileConfiguration.storage.provider && this.profileConfiguration.storage.key) {
                this.onProfileChange = new Subject<any>();
                this.onLanguageChange = new Subject<any>();
            } else {
                const error: string = this.i18.instant('log.rang.conf.error', { class: this.currentClassName, detail: 'security.profile' });
                this.logService.error(error);
                throw new Error(error);
            }
        } else {
            const error: string = this.i18.instant('log.rang.conf.error', { class: this.currentClassName, detail: 'security.profile' });
            this.logService.error(error);
            throw new Error(error);
        }
    }

    public loadProfile(extraParams: HttpParams): Observable<any> {
        let url: string = this.profileConfiguration.endpoint;

        let options: HttpClientRequestOptions = { headers: contentHttpHeaders, params: extraParams };

        return this.authHttp.get<any>(url, options);
    }

    public getProfile(): any {
        return this.getDecodedProfile();
    }

    public setUserProfile(profile: any) {
        if (profile) {
            this.setEncodedProfile(profile);

            this.emmitProfileChange(profile);
        }
    }

    public removeProfile() {
        this.profileConfiguration.storage.provider.removeItem(this.profileConfiguration.storage.key);

        this.emmitProfileChange(null);
    }

    public getUserRoles(): string[] {
        let roles: string[] = [];

        let profile = this.getProfile();

        if (profile) {
            if (this.profileConfiguration.rolesProperty) {
                roles = profile[this.profileConfiguration.rolesProperty];
            } else {
                roles = profile;
            }
        }

        return roles;
    }

    public setUserRoles(roles: string[], append: boolean) {
        if (roles) {
            let profile = this.getProfile();

            if (profile && this.profileConfiguration.rolesProperty) {
                if (!profile[this.profileConfiguration.rolesProperty] || !append) {
                    profile[this.profileConfiguration.rolesProperty] = [];
                }

                profile[this.profileConfiguration.rolesProperty].push(...roles);
            } else {
                if (!profile || !append) {
                    profile = [];
                }

                profile.push(...roles);
            }

            this.setEncodedProfile(profile);
        }
    }

    public getUserPerms(): { [id: string]: any[] } {
        let perms: { [id: string]: any[] } = {};

        if (!this.profileConfiguration.permsProperty) {
            this.logService.error('jus-ng.log.rang.conf.error', { class: this.currentClassName, detail: 'security.profile.permsProperty' });
            return;
        }

        let profile = this.getProfile();

        if (profile) {
            perms['*'] = profile[this.profileConfiguration.permsProperty];
        }

        return perms;
    }

    public setUserPerms(perms: { [id: string]: string[] }) {
        if (perms) {
            let profile = this.getProfile();

            if (profile) {
                if (!profile[this.profileConfiguration.permsProperty]) {
                    profile[this.profileConfiguration.permsProperty] = {};
                }
                profile[this.profileConfiguration.permsProperty] = perms;

                this.setEncodedProfile(profile);
            }
        }
    }

    public setUserInstancePerms(perms: string[], instance?: SecuredObject) {
        if (perms) {
            let profile = this.getProfile();

            if (profile) {
                if (!profile[this.profileConfiguration.permsProperty]) {
                    profile[this.profileConfiguration.permsProperty] = {};
                }
                if (instance) {
                    profile[this.profileConfiguration.permsProperty][instance.id] = perms;
                } else {
                    profile[this.profileConfiguration.permsProperty]['*'] = perms;
                }

                this.setEncodedProfile(profile);
            }
        }
    }

    public removeUserInstancePerms(instance: SecuredObject) {
        if (instance) {
            let profile = this.getProfile();

            if (profile && profile[this.profileConfiguration.permsProperty]) {
                delete profile[this.profileConfiguration.permsProperty][instance.id];

                this.setEncodedProfile(profile);
            }
        }
    }

    public savePortalLanguage(idioma: string = 'ca'): Observable<any> {
        let endpoint = this.cfg.conf.api.configuracio['baseUrl'] + this.cfg.conf.api.configuracio.Idioma;

        let options: HttpClientRequestOptions = { headers: contentHttpHeaders };

        let body: { codiIdioma: string } = {
            codiIdioma: idioma
        };

        return this.authHttp.post<any>(endpoint, body, options);
    }

    public emmitLanguageChange() {
        if (this.onLanguageChange) {
            this.onLanguageChange.next(true);
        }
    }

    protected getDecodedProfile(): any {
        let encodedStringProfile = this.profileConfiguration.storage.provider.getItem(this.profileConfiguration.storage.key);

        if (encodedStringProfile) {
            // let profile = JSON.parse(B64Helper.decode(encodedStringProfile));
            let profile = JSON.parse(CryptoService.decrypt(encodedStringProfile));

            if (profile) {
                return profile;
            } else {
                return {};
            }
        } else {
            return {};
        }
    }

    protected setEncodedProfile(profile: any) {
        if (this.profileConfiguration && this.profileConfiguration.storage && this.profileConfiguration.storage.provider && this.profileConfiguration.storage.key) {
            // B64Helper.encode(JSON.stringify(profile));
            let encodedString = CryptoService.encrypt(JSON.stringify(profile));

            this.profileConfiguration.storage.provider.setItem(this.profileConfiguration.storage.key, encodedString);
        }
    }

    private emmitProfileChange(profile: any) {
        if (this.onProfileChange) {
            this.onProfileChange.next(profile);
        }
    }
}
