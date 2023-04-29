export declare function postLogin(request: LoginRequest): Promise<boolean>;
export declare function login(username: string, password: string): void;
interface LoginRequest {
    username: string;
    password: string;
}
export {};
