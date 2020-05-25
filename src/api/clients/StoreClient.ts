import Axios, { AxiosInstance, AxiosError } from "axios";
import ProductModel from "models/ProductModel";

export const storeClient: AxiosInstance = Axios.create({
  baseURL: "http://localhost:1337",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  try {
    const response = await storeClient.get<ProductModel[]>("/products");
    const products: ProductModel[] = response.data;
    console.table(products);
    return products;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<any>;
      console.error(axiosError.message);
      return [];
    }
    throw err;
  }
};
