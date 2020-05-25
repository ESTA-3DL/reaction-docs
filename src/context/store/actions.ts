import ProductModel from "models/ProductModel";
import * as T from "./types";

export const setProductsAction = (
  products: ProductModel[],
  dispatch: (action: T.SetProductsAction) => void
): void => {
  dispatch({
    type: T.EStoreActions.SetProducts,
    data: products,
  });
};

export const clearProductsAction = (
  dispatch: (action: T.ClearProductsAction) => void
): void => {
  dispatch({
    type: T.EStoreActions.ClearProducts,
  });
};
