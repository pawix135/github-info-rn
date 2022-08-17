import { createContext } from "react";
import { IUserContext, UserAction } from "../types/UserContext";

export const initialUserState: IUserContext = {
  profile: null,
  token: null,
  repos: null,
};

export const UserContext = createContext<IUserContext>(initialUserState);

export const userReducer = (
  state: IUserContext,
  action: UserAction
): IUserContext => {
  let { type, payload } = action;
  switch (type) {
    case "USER/SIGN_IN": {
      return {
        ...state,
        profile: payload.profile,
        token: payload.token,
      };
    }
    case "USER/SIGN_OUT":
      return initialUserState;
    case "REPOS/SET":
      return {
        ...state,
        repos: payload,
      };
    default: {
      return state;
    }
  }
};
