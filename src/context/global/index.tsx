import React from "react";
import ErrorContextProvider from "context/error";
import AuthContextProvider from "context/auth/";
import StoreContextProvider from "context/store/";
import { Props } from "includes/types";

const GlobalContextProvider: React.FC<Props> = (args: Props) => {
  return (
    <ErrorContextProvider>
      <AuthContextProvider>
        <StoreContextProvider>{args.children}</StoreContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  );
};

export default GlobalContextProvider;
