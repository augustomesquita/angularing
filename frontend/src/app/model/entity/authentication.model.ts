import { User } from './user.model';

export class AuthUser {
    user: User;
    token: string;

    constructor(user: User, token: string) {
        this.user = user;
        this.token = token;
    }
}

export class AuthData {
  token: string;
  user: User;
}

export class AuthResponse {
  data: AuthData;
  errors: any[];
}
