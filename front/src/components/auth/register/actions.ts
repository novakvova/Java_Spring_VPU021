import { Dispatch } from "react";
import { IRequest, RegisterAction, RegisterActionTypes, RegisterErrors } from "./types";
import http from "../../../http_common";
import axios, { AxiosError } from "axios";
import { setAuthUserByToken } from "../login/actions";

export const RegisterUser = (data: IRequest) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
      try {

        console.log("register>> ", data)
        const response = await http.post("api/account/register", data);
        const token = await response.data.token;
        dispatch({
          type: RegisterActionTypes.REGISTER_SUCCESS,
          payload: token,
        });
        setAuthUserByToken(token, dispatch);
        return Promise.resolve(token);
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<RegisterErrors>;
          if (serverError && serverError.response) {
            const { errors } = serverError.response.data;
            return Promise.reject(errors);
          }
        }
      }
    };
  };