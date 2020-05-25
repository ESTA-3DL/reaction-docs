import axios, { AxiosResponse, AxiosError } from "axios";
import { useErrorContext } from "context/error";

interface UseHttp {
  get: <T>(url: string) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, payload: any) => Promise<AxiosResponse<T>>;
}

export const useHttp = () => {
  const { clearError, setError } = useErrorContext();
  axios.interceptors.request.use(req => {
    clearError();
    return req;
  });
  axios.interceptors.response.use(
    res => {
      return res;
    },
    (error: AxiosError) => {
      if (!error.response) {
        return false;
      }
      setError(error.response.data);
    }
  );
  const formatUrl = (partialUrl: string): string => {
    return `${process.env.REACT_APP_API_URL}/${partialUrl}`;
  };
  const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
    const endpointURL = formatUrl(url);
    console.log("GET:", endpointURL);
    return axios.get(formatUrl(url));
  };
  const post = <T>(url: string, payload: any): Promise<AxiosResponse<T>> => {
    const endpointURL = formatUrl(url);
    console.log("POST:", endpointURL);
    return axios.post(endpointURL, payload);
  };
  return { get, post };
};

export default useHttp;
