export declare class User {
    id: string;
    username: string;
    password: string;
    type: string;
    name: string;
    email: string;
    token: string;
    roles: Role[];
}
export declare class LoginResult {
    id: string;
    message: string;
    user: User;
    url: string;
}
export declare class Role {
    id: string;
    name: string;
    users: User[];
}
export declare class SaveResult {
    status: boolean;
    message: string;
}
