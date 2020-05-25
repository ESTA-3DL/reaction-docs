import UserModel from "models/UserModel";

export enum EUserActions {
  SetUser,
  ClearUser,
}

export interface SetUserAction {
  type: typeof EUserActions.SetUser;
  payload: UserModel;
}

export interface ClearUserAction {
  type: typeof EUserActions.ClearUser;
}
