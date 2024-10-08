export interface UserRegisterInterface {
  username: string
  email: string
  password: string
}

export interface UserLoginInterface {
  username: string
  password: string
}

export interface UserDataInterface {
  username: string
  email: string
  id: number
  id_role: number
}

type data = {
  user: UserDataInterface;
  access_token: string;
}

export interface UserResponseInterface {
  data: data;
  code: number;
  message: string;
}