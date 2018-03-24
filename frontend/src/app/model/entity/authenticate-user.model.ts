import { User } from './user.model';

export class AuthenticateUser {
    user: User;
    token: string;

    constructor(user: User, token: string) {
        this.user = user;
        this.token = token;
    }
}
