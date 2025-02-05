import { Component, OnInit, AfterViewInit, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { RaNgLoggerI18nService } from 'ra-ng/logger';
import { TranslateService } from 'ra-ng/i18n';

@Component({
    selector: 'mfe-foo',
    templateUrl: './foo.component.html',
    styleUrls: ['./foo.component.scss']
})

export class FooComponent implements OnInit, AfterViewInit {

    @Input()
    public set lang(value: string) {
        console.log('SET lang', value);
        this.zone.run(() => {
            if (value) {
                console.log('this.i18n.use', value);
                this.i18n.use(value);
            }
        });
    }

    public get lang(): string {
        return this.innerLang;
    }

    @Output()
    public loaded: EventEmitter<any> = new EventEmitter();


    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    public esMfeContext = environment.isMfe;

    private innerLang: string;

    constructor(private logService: RaNgLoggerI18nService, private i18n: TranslateService, private zone: NgZone, private router: Router) { }

    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.router.initialNavigation();
            this.logService.info('[mj-mfe-foo] LOADED');
            this.loaded.emit({ tag: 'mj-mfe-foo' });
        });
    }

    response(value: boolean) {
        console.log('Response from Dialog', value);
        this.action.emit({
            response: value
        });
    }
}
