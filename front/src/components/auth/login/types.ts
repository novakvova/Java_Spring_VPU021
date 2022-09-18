import {JwtPayload} from "jwt-decode";

export enum AuthActionTypes {
    LOGIN_AUTH = "LOGIN_AUTH",
    LOGIN_AUTH_SUCCESS = "LOGIN_AUTH_SUCCESS",
    LOGIN_AUTH_ERROR = "LOGIN_AUTH_ERROR",
    LOGOUT_AUTH = "LOGOUT_AUTH",
  }
  export interface IUser {
      email: string,
      fullName: string
      image: string
  }
  
  export interface AuthState {
    user?: IUser;
    isAuth: boolean;
  }
  
  export interface LoginAuthAction {
      type: AuthActionTypes.LOGIN_AUTH
  }
  
  export interface LoginAuthSuccessAction {
      type: AuthActionTypes.LOGIN_AUTH_SUCCESS;
      payload: IUser;
  }
  
  export interface LoginAuthErrorAction {
      type: AuthActionTypes.LOGIN_AUTH_ERROR,
      payload: string
  }
  export interface LogoutAuth {
      type: AuthActionTypes.LOGOUT_AUTH
  }
  
  export type AuthAction =
    | LoginAuthAction
    | LoginAuthSuccessAction
    | LoginAuthErrorAction
    | LogoutAuth;
  
  export interface ILogin {
    email: string;
    password: string;
    invalid:string
  }
  
  export interface ILoginError {
    password: Array<string>;
    email: Array<string>;
    invalid: Array<string>;
  }
  
  export interface ILoginErrors {
    errors: ILoginError,
    status: number
  }

  export type customJwtPayload = JwtPayload & IUser;