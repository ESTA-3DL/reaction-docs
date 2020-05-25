import { useHttp } from "hooks/useHttp";
import ApiEndPoints from "includes/endpoints";
import UserModel from "models/UserModel";

type IAuthResult = Promise<UserModel | null>;

interface IAuthResponse {
  jwt: string;
  user: UserModel;
}
interface IAuthArgs {
  identifier: string;
  password: string;
}
interface UseAuthHttp {
  loginUser: (credentials: IAuthArgs) => IAuthResult;
}

export const useAuthHttp = (): UseAuthHttp => {
  const { post } = useHttp();
  const loginUser = async (args: IAuthArgs): IAuthResult => {
    const response = await post<IAuthResponse>(ApiEndPoints.Login, args);
    if (response) {
      return { ...response.data.user, token: response.data.jwt } as UserModel;
    } else {
      return null;
    }
  };

  return { loginUser };
};
