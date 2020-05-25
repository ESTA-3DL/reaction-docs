export default interface UserModel {
  id: number;
  email: string;
  username: string;
  blocked?: boolean;
  confirmed?: boolean;
  provider?: string;
  role: any;
  token?: string;
  created_at?: Date;
  updated_at?: Date;
}
