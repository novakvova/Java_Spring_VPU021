import { AuthState,  AuthAction, AuthActionTypes } from './types';

const initialState: AuthState = {
        user: undefined,
      isAuth: false,
};

export const authReducer = (state=initialState, action: AuthAction) : AuthState => {
    switch (action.type) {

      case AuthActionTypes.LOGIN_AUTH_SUCCESS:
        return {
          ...state,
          isAuth: true,
          user: { ...action.payload },
        };

      case AuthActionTypes.LOGOUT_AUTH:
        return {isAuth: false, user: undefined };

      default:
        return state;
    }
}