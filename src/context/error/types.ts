import ErrorModel from "models/ErrorModel";

export enum EErrorActions {
  SetError,
  ClearError,
}

export interface IErrorAction {
  type: EErrorActions;
  payload?: any;
}

export interface SetErrorAction extends IErrorAction {
  type: typeof EErrorActions.SetError;
  payload: ErrorModel;
}
export interface ClearErrorAction extends IErrorAction {
  type: typeof EErrorActions.ClearError;
}
