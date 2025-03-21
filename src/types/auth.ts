export interface User {
  email: string;
  name: string;
  image: string;
  _id: string;
  created_at: string;
  updated_at: string;
  admin: boolean;
}
export interface authResponse {
  message?: string;
  token?: string;
  user?: User;
  error?: string;
}
