import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BaseService } from '../shared/base-service';
import { ConfigService } from '../shared/config-service';
/**
 * User related service...
 *
 * @author <a target='_' href='https://github.com/thomcuddihy'>Thom Cuddihy</a>
 *
 */
export declare class EmailNotificationService extends BaseService {
    protected configService: ConfigService;
    protected baseUrl: any;
    protected config: any;
    protected headers: any;
    constructor(http: Http, configService: ConfigService);
    sendNotification(to: string, template: string, data?: any, subject?: string, from?: string): Promise<any>;
}
