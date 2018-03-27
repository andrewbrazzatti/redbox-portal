import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BaseService } from '../shared/base-service';
import { Role } from './user-models';
import { ConfigService } from './config-service';
/**
 * Role related service
 *
 * Author: <a href='https://github.com/shilob' target='_blank'>Shilo Banihit</a>
 */
export declare class RolesService extends BaseService {
    protected configService: ConfigService;
    constructor(http: Http, configService: ConfigService);
    getBrandRoles(): Promise<Role[]>;
    updateUserRoles(userid: any, roleIds: any): any;
}
