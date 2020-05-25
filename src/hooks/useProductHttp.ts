import { useHttp } from "hooks/useHttp";
import ApiEndPoints from "includes/endpoints";
import ProductModel from "models/ProductModel";

type HttpResult = Promise<ProductModel[] | null>;

interface UseProductHttp {
  getProducts: () => HttpResult;
}

export const useProductHttp = (): UseProductHttp => {
  const { get } = useHttp();
  const getProducts = async (): HttpResult => {
    const response = await get<ProductModel[]>(ApiEndPoints.Products);
    if (response) {
      return response.data as ProductModel[];
    } else {
      return null;
    }
  };

  return { getProducts } as UseProductHttp;
};
