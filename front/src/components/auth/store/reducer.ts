import {AuthActionTypes, AuthState} from "./types";

const initialState: AuthState = {
   isAuth: false
//    isAuth: true,
//    user: {
//     email: "novakvova@gmail.com",
//     image: "https://pbs.twimg.com/profile_images/222817095/me_400x400.GIF",
//     roles: "admin"
//    }
}

export const authReducer = (state= initialState, action : any) : AuthState =>{
    switch(action.type)
    {
        case AuthActionTypes.LOGIN_AUTH:
            return{
                ...state,
                isAuth: true,
                user: {...action.payload}
            } 
    }
    return state;
}