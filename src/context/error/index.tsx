import React, { createContext, useReducer, useContext } from "react";

import ErrorModel from "models/ErrorModel";
import { errorReducer, initialErrorState } from "./reducer";
import { clearErrorAction, setErrorAction } from "./actions";

import * as Types from "includes/types";

export interface IErrorContext {
  state: ErrorModel;
  setError: (error: ErrorModel) => void;
  clearError: () => void;
}

const ErrorContext = createContext<IErrorContext>({} as IErrorContext);

// Alias to comsume this context without importing IErrorContext and ErrorContext
export const useErrorContext = (): IErrorContext => useContext(ErrorContext);

const ErrorContextProvider: React.FC = (props: Types.Props) => {
  const [state, dispatch] = useReducer(errorReducer, initialErrorState);

  const setError = (error: ErrorModel): void => {
    setErrorAction(error, dispatch);
  };

  const clearError = (): void => {
    clearErrorAction(dispatch);
  };

  return (
    <ErrorContext.Provider
      value={{ state, setError, clearError } as IErrorContext}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
