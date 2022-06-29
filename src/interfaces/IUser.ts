export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  msisdn: string;
  username: string;
  active: true;
  role: string;
}

export interface ILoginInput {
  username: string;
  password: string;
}

export interface IUserResponse {
  user: IUser;
}
