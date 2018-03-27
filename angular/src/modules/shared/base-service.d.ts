import { Response, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
/**
 * Base class for all client-side services...
 *
 * Author: <a href='https://github.com/shilob' target='_blank'>Shilo Banihit</a>
 *
 */
export declare class BaseService {
    protected http: any;
    protected config: any;
    protected configService: any;
    protected baseUrl: string;
    protected brandingAndPortalUrl: string;
    protected options: any;
    protected static __config: any;
    protected initSubject: any;
    constructor(http: any, configService: any);
    readonly getBrandingAndPortalUrl: string;
    readonly getBaseUrl: string;
    waitForInit(handler: any): any;
    protected emitInit(): void;
    getConfig(): any;
    protected extractData(res: Response, parentField?: any): any;
    protected getOptions(headersObj: any): RequestOptions;
    protected getOptionsClient(headersObj?: any): RequestOptions;
}
