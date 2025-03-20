export interface User {
  email: string;
  name: string;
  _id: string;
}
export interface authResponse {
  message?: string;
  token?: string;
  user?: User;
  error?: string;
}
