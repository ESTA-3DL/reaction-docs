import ProductModel from "models/ProductModel";

export interface ShoppingCartItem extends ProductModel {
  quantity: number;
}

export default interface StoreModel {
  products: ProductModel[];
  shoppingCart: ShoppingCartItem[];
}
