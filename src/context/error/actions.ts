import ErrorModel from "models/ErrorModel";
import { EErrorActions, ClearErrorAction, SetErrorAction } from "./types";

export const setErrorAction = (
  error: ErrorModel,
  dispatch: (action: SetErrorAction) => void
): void => {
  dispatch({
    type: EErrorActions.SetError,
    payload: error,
  });
};
export const clearErrorAction = (
  dispatch: (action: ClearErrorAction) => void
): void => {
  dispatch({
    type: EErrorActions.ClearError,
  });
};
