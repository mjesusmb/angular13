import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Config, FakeAuthService } from 'app/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public userName: string;
    public password: string;
    public userProfile: any;

    constructor(private router: Router, private http: HttpClient, private authService: FakeAuthService) {}

    public submitLogin() {
        let accessTokenEndpoint: string = (Config.security.token as any).fakeEnpoint;

        if (accessTokenEndpoint) {
            this.http.post(accessTokenEndpoint, { gicarId: this.userName }).subscribe(
                (response) => {
                    console.log('Fake login', response);
                    if (this.authService.authenticateFake(response)) {
                        this.router.navigate([Config.security.authenticatedDefaultView]);
                    } else {
                        console.log("Error autentificant l'usuari");
                        this.router.navigate([Config.security.unauthorizedView]);
                    }
                },
                (error) => {
                    console.log('LOGIN ERROR', error);
                    this.router.navigate([Config.security.unauthorizedView]);
                }
            );
        }
    }
}
