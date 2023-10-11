export declare function postLogin(request: AuthRequest): Promise<any>;
export declare function postRegister(request: AuthRequest): Promise<any>;
export declare function postCreateUser(request: AuthRequest): Promise<any>;
export declare function login(username: string, password: string): void;
export declare function register(username: string, password: string): void;
export declare function logout(): void;
export declare function createNewUser(username: string, password: string): void;
interface AuthRequest {
    username: string;
    password: string;
}
export {};
