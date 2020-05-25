import UserModel from "models/UserModel";
import { EUserActions, SetUserAction, ClearUserAction } from "./types";

interface IUserReducer {
  (state: UserModel, action: SetUserAction | ClearUserAction): UserModel;
}

export const initialUserState: UserModel = {
  id: 0,
  email: "",
  username: "Guest",
  role: {
    id: 0,
    name: "Public",
    type: "public",
  },
};

export const userReducer: IUserReducer = (
  state: UserModel = initialUserState,
  action: SetUserAction | ClearUserAction
): UserModel => {
  switch (action.type) {
    case EUserActions.SetUser:
      return {
        ...state,
        ...action.payload,
      };
    case EUserActions.ClearUser:
      return initialUserState;
    default:
      return state;
  }
};
