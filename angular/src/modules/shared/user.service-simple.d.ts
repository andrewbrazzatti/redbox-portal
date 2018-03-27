import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BaseService } from '../shared/base-service';
import { User } from './user-models';
import { ConfigService } from '../shared/config-service';
/**
 * User related service...
 *
 * Author: <a href='https://github.com/shilob' target='_blank'>Shilo Banihit</a>
 *
 */
export declare class UserSimpleService extends BaseService {
    protected configService: ConfigService;
    protected baseUrl: any;
    protected config: any;
    protected headers: any;
    constructor(http: Http, configService: ConfigService);
    getInfo(): Promise<User>;
    loginLocal(username: string, password: string): Promise<any>;
    getUsers(): Promise<User[]>;
    updateUserDetails(userid: any, details: any): any;
    addLocalUser(username: any, details: any): any;
    genKey(userid: any): any;
    revokeKey(userid: any): any;
    updateUserProfile(details: any): any;
    genUserKey(): any;
    revokeUserKey(): any;
}
