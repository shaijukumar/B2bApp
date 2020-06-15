export interface IUser {
  username: string;
  displayName: string;
  token: string;
  email: string;
  image?: string;
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
