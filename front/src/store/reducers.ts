import { authReducer } from './../components/auth/store/reducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    auth : authReducer
});

export type RootState = ReturnType<typeof rootReducer>;