import ProductModel from "models/ProductModel";

export enum EStoreActions {
  // Products:
  AddProduct,
  ClearProducts,
  SetProducts,
  // ShoppingCart:
  AddToCart,
  ClearCart,
  RemoveFromCart,
}

// Product Catalog Actions:

export interface AddProductAction {
  type: typeof EStoreActions.AddProduct;
  payload: ProductModel;
}

export interface ClearProductsAction {
  type: typeof EStoreActions.ClearProducts;
}

export interface SetProductsAction {
  type: typeof EStoreActions.SetProducts;
  data: ProductModel[];
}

// ShoppingCart Actions:

export interface AddToCartAction {
  type: typeof EStoreActions.AddToCart;
  data: ProductModel;
}
export interface ClearCartAction {
  type: typeof EStoreActions.ClearCart;
}

export interface RemoveFromCartAction {
  type: typeof EStoreActions.RemoveFromCart;
  payload: number;
}
