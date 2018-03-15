import { User } from './user.model';

export class AuthenticateUser {
    user: User;
    token: string;

    constructor(user: User, token: string) {
        this.user = user;
        this.token = token;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getToken(): string {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }

}