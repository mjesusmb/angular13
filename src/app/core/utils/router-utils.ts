import { Config } from '../config/config';

export class RouterUtils {
    public static routerLink(routes: string[]): any[] {
        const namedOutlet = {};
        namedOutlet[Config.appElementTag] = routes;
        return ['/', { outlets: namedOutlet }];
    }
}
