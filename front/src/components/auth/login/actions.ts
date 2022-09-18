import { Dispatch } from "react";
import http from "../../../http_common";
import { AuthAction, AuthActionTypes, ILoginErrors, IUser } from "./types";
import jwt_decode from "jwt-decode";
import axios, { AxiosError } from "axios";
import setAuthToken from "../../../helpers/setAuthToken";
import { ILogin } from "./types";

export interface ILoginResponse {
   id: number,
   username: string,
   fullName: string,
   token: string;
}

export const LoginUser =
  (data: ILogin) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      const req = { username: data.email, password: data.password };

      const response = await http.post<ILoginResponse>("api/account/login", req);
      const { token } = await response.data;
      setAuthUserByToken(token, dispatch);
      return Promise.resolve();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ILoginErrors>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
      return Promise.reject();
    }
  };

  //

export const setAuthUserByToken = (token: string, dispatch: Dispatch<any>) => {
  setAuthToken(token);
  localStorage.token = token;

  const dataUser = jwt_decode<IUser>(token);
  console.log("dataUser>>", dataUser);
  const user: IUser = {
    email: dataUser.email,
    image: dataUser.image,
    fullName: dataUser.fullName,
  };
  dispatch({
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: user,
  });
};

export const LogoutUser = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    setAuthToken("");
    dispatch({ type: AuthActionTypes.LOGOUT_AUTH });
    localStorage.removeItem("token");
  };
};