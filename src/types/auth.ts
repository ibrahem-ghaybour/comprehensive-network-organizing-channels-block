export interface User {
  email: string;
  name: string;
  _id: string;
}
export interface authResponse {
  data: {
    massage: string;
    token: string;
    user: User;
  };
  error: string;
}
