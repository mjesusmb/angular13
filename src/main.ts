import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'environments/environment';

import { AppModule } from 'app/app.module';

if (environment.production) {
    enableProdMode();
}

// Fer servir ngZone si ja està definit per l'aplicació principal
const ngZone = (Window as any).Zone;

platformBrowserDynamic().bootstrapModule(AppModule, {
    ngZone: ngZone || 'zone.js'
});
