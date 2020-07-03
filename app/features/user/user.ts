export interface IUser {
  Username: string;
  DisplayName: string;
  Token: string;
  Email: string;
  Image?: string;
  UserRoles: string[];
}

export interface IUserFormValues {
  email: string;
  password: string;
  // displayName?: string;
  // username?: string;
}

export interface IUserRegister {
  username: string;
  displayName: string;
  userType: string;
  password: string;
  mobile?: string;
  email?: string;
}

export class UserRegister implements IUserRegister {
  username: string = "";
  displayName: string = "";
  userType: string = "";
  password: string = "";
  mobile: string = "";
  email: string = "";
  constructor(init?: IUserRegister) {
    Object.assign(this, init);
  }
}
