import ProductModel from "models/ProductModel";
import StoreModel from "models/StoreModel";
//import { EStoreActions, SetProductsAction, ClearProductsAction } from "./types";
import * as T from "./types";

interface IStoreReducer {
  (
    state: StoreModel,
    action:
      | T.AddProductAction
      | T.ClearProductsAction
      | T.SetProductsAction
      | T.AddToCartAction
      | T.ClearCartAction
      | T.RemoveFromCartAction
  ): StoreModel;
}

function addShoppingCartItem(
  state: StoreModel,
  product: ProductModel
): StoreModel {
  const cart = [...state.shoppingCart];
  const cartItemIndex = cart.findIndex(item => item.id === product.id);

  if (cartItemIndex < 0) {
    cart.push({ ...product, quantity: 1 });
  } else {
    // const cartItem = { ...cart[cartItemIndex] };
    // cartItem.quantity++;
    // cart[cartItemIndex] = cartItem;
    cart[cartItemIndex].quantity++;
  }
  return { ...state, shoppingCart: cart };
}

function removeShoppingCartItem(state: StoreModel, pid: number): StoreModel {
  const cart = [...state.shoppingCart];
  const cartItemIndex = cart.findIndex(item => item.id === pid);
  // const cartItem = { ...cart[cartItemIndex] };
  // cartItem.quantity--;
  // if (cartItem.quantity <= 0) {
  //   cart.splice(cartItemIndex, 1);
  // } else {
  //   cart[cartItemIndex] = cartItem;
  // }
  const cartItem = cart[cartItemIndex];
  cartItem.quantity--;
  if (cartItem.quantity <= 0) {
    cart.splice(cartItemIndex, 1);
  }
  return { ...state, shoppingCart: cart };
}

export const initialStoreState: StoreModel = {
  products: [],
  shoppingCart: [],
};

export const storeReducer: IStoreReducer = (
  state: StoreModel = initialStoreState,
  action:
    | T.AddProductAction
    | T.ClearProductsAction
    | T.SetProductsAction
    | T.AddToCartAction
    | T.ClearCartAction
    | T.RemoveFromCartAction
): StoreModel => {
  switch (action.type) {
    case T.EStoreActions.SetProducts:
      return { ...state, products: action.data };
    case T.EStoreActions.ClearProducts:
      return initialStoreState;

    case T.EStoreActions.AddToCart:
      return addShoppingCartItem(state, action.data);

    case T.EStoreActions.RemoveFromCart:
      return removeShoppingCartItem(state, action.payload);

    default:
      return state;
  }
};
