import ErrorModel from "models/ErrorModel";
import { IErrorAction, EErrorActions } from "./types";

interface ErrorReducer {
  (state: ErrorModel, action: IErrorAction): ErrorModel;
}

function parseErrorMessage(state: ErrorModel, response: any): ErrorModel {
  switch (typeof response.message) {
    case "string":
      return { ...state, ...response } as ErrorModel;
    case "object":
      const err = response.message[0].messages[0];
      return { ...state, error: err.id, message: err.message } as ErrorModel;
    default:
      return state;
  }
}

export const initialErrorState: ErrorModel = {
  statusCode: 0,
  error: "",
  message: "",
} as ErrorModel;

export const errorReducer: ErrorReducer = (
  state: ErrorModel = initialErrorState,
  action: IErrorAction
): ErrorModel => {
  switch (action.type) {
    case EErrorActions.SetError:
      return parseErrorMessage(state, action.payload);
    case EErrorActions.ClearError:
      return initialErrorState;
    default:
      return state;
  }
};
