import {
  AuthActionTypes,
  AuthState,
  AuthActionType,
} from "../types/authTypes";
import { Action } from "redux";

const initialState: AuthState = {
  email: "",
  isAuth: false,
  accessToken: "",
};

const auth = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AuthActionType.UPDATE_AUTH:
      return {
        ...state,
        email: action.email,
        isAuth: action.isAuth,
      };
    case AuthActionType.CLEAR_AUTH:
      return { ...initialState };
    default:
      return state;
  }
};

export default auth;