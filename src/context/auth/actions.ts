import UserModel from "models/UserModel";
import { EUserActions, SetUserAction, ClearUserAction } from "./types";

export const setUserAction = (
  user: UserModel,
  dispatch: (action: SetUserAction) => void
): void => {
  dispatch({
    type: EUserActions.SetUser,
    payload: user,
  });
};
export const clearUserAction = (
  dispatch: (action: ClearUserAction) => void
): void => {
  dispatch({
    type: EUserActions.ClearUser,
  });
};
