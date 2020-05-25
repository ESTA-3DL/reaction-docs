import React, { useContext } from "react";
import ProductModel from "models/ProductModel";
import StoreModel from "models/StoreModel";
import { storeReducer, initialStoreState } from "./reducer";
import { useProductHttp } from "hooks/useProductHttp";
import { Props } from "includes/types";
import * as Action from "./actions";

export interface IShoppingCartItem extends ProductModel {
  quantity: number;
}

export interface IStoreContext {
  store: StoreModel;
  addToCart: (product: ProductModel) => void;
  removeFromCart: (productId: number) => void;
  updateProducts: () => void;
}

const StoreContext = React.createContext<IStoreContext>({} as IStoreContext);

// Alias to use this hook without importing IStoreContext and StoreContext
export const useStoreContext = (): IStoreContext => useContext(StoreContext);

// Actual component to wrap the application into
const StoreContextProvider: React.FC = (props: Props) => {
  const [state, dispatch] = React.useReducer(storeReducer, initialStoreState);

  const { getProducts } = useProductHttp(); // custom hook

  const addToCart = () => {};

  const removeFromCart = () => {};

  const updateProducts = async (): Promise<void> => {
    const products = await getProducts();
    if (products) {
      Action.setProductsAction(products, dispatch);
    }
  };

  return (
    <StoreContext.Provider
      value={
        {
          store: state,
          addToCart,
          removeFromCart,
          updateProducts,
        } as IStoreContext
      }>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
