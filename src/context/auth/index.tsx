import React, { createContext, useContext, useReducer } from "react";
import UserModel from "models/UserModel";
import { initialUserState, userReducer } from "./reducer";
import { clearUserAction, setUserAction } from "./actions";
import { useAuthHttp } from "hooks/useAuthHttp";
import { Props } from "includes/types";

interface UserContext {
  user: UserModel;
  login: (indentifier: string, password: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const Context = createContext<UserContext>({} as UserContext);

// Alias to use this hook without importing IUserContext and UserContext
export const useUserContext = (): UserContext => useContext(Context);

// Actual component to wrap the application into
const ContextProvider: React.FC = (props: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const { loginUser } = useAuthHttp();

  const login = async (identifier: string, password: string): Promise<void> => {
    const user = await loginUser({ identifier, password });
    if (user) {
      setUserAction(user, dispatch);
    }
  };
  const logout = (): void => {
    clearUserAction(dispatch);
  };

  const isAuthenticated = (): boolean => {
    return !!state.id;
  };

  return (
    <Context.Provider
      value={{ user: state, login, logout, isAuthenticated } as UserContext}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
