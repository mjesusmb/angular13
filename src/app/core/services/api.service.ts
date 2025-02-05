import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SecurityTokenRequestService, EtagSecurityTokenRequestService, CachedSecurityTokenRequestService, JwtAuthInfo } from 'ra-ng/security';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(
        private http: HttpClient,
        private securedService: SecurityTokenRequestService,
        private etagService: EtagSecurityTokenRequestService,
        private cachedService: CachedSecurityTokenRequestService
    ) {}

    public auth(): Observable<any> {
        const url = '/api/auth/token';

        return this.http
            .post<JwtAuthInfo>(url, { user: 'israel', pass: '$3KR3T' })
            .pipe(
                map((authData) => {
                    this.securedService.saveAuthInfo(authData);
                    return authData;
                })
            );
    }

    public refreshToken(): Observable<any> {
        const url = '/api/auth/refresh';
        const authInfo: JwtAuthInfo = JSON.parse(this.securedService.getAuthInfo());
        return this.securedService
            .post<JwtAuthInfo>(url, { refresh_token: authInfo.refresh_token })
            .pipe(
                map((refreshResponse: any) => {
                    authInfo.id_token = refreshResponse.id_token;
                    this.securedService.saveAuthInfo(authInfo);
                    return authInfo;
                })
            );
    }

    public getComments(): Observable<Comment[]> {
        const url = '/api/secured/comments';
        return this.securedService.get<Comment[]>(url);
        // return this.etagService.get<Comment[]>(url);
        // return this.cachedService.get<Comment[]>(url);
    }

    public getByRequest(): Observable<Comment[]> {
        const url = '/secured/comments';
        let req = new HttpRequest<Comment[]>('GET', url);
        return this.securedService.request(req).pipe(
            map((response: HttpResponse<any>) => {
                console.log('HTTP RESPONSE HEADERS', response.headers);
                return response.body;
            })
        );
    }

    public getCommentsByEtag(): Observable<Comment[]> {
        const url = '/api/secured/comments';
        return this.etagService.get<Comment[]>(url);
    }

    public getCommentsByCache(): Observable<Comment[]> {
        const url = '/api/secured/comments';
        return this.cachedService.get<Comment[]>(url);
    }
}

// http://justicia-agenda-service-justicia.si-origin-cluster.t-systems.es/swagger-ui.html#/recursos-controller
