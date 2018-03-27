import { Response } from '@angular/http';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
/**
 * Handles client-side global configuration
 *
 * Author: <a href='https://github.com/shilob' target='_blank'>Shilo Banihit</a>
 *
 */
export declare class ConfigService {
    protected http: any;
    protected config: any;
    protected subjects: any;
    constructor(http: any);
    getConfig(handler: any): any;
    emitConfig(): void;
    initConfig(): void;
    protected extractData(res: Response, parentField?: any): any;
}
