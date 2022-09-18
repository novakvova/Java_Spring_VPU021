import { authReducer } from './../components/auth/login/reducer';
import { parentReducer } from '../components/kids/parent/store/reducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    auth: authReducer,
    parent: parentReducer
});

export type RootState = ReturnType<typeof rootReducer>;