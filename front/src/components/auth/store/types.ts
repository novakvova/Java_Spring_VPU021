export enum AuthActionTypes {
    LOGIN_AUTH = "LOGIN_AUTH"
}

export interface IUser {
    email: string,
    image: string,
    roles: string
}
export interface AuthState {
    user?: IUser,
    isAuth: boolean
}