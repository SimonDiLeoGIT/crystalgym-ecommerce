export interface UserInterface {
  username: string
  email: string
  password: string
  access_token: string
}

export interface UserLoginInterface {
  username: string
  password: string
}

type data = {
  user: UserInterface;
  access_token: string;
}

export interface UserResponseData {
  data: data;
  code: number;
  message: string;
}