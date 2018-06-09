export class User {
    constructor(public name: string, public email: string, public photoUrl) { }
}

export class Data {
  token: string;
  user: User;
}

export class ResponseUtil {
  data: Data;
  errors: any[];
}
