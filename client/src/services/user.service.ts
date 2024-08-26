import { UserInterface, UserLoginInterface } from '../interfaces/UserInterface';
import ApiService from './api.service';

type data = {
  user: UserInterface;
  access_token: string;
  refresh_token: string;
}

interface UserLoginResponse {
  data: data;
}

class UserService {
  static async register(userData: UserInterface) {
    return ApiService.post('/users/register', userData);
  }

  static async login(credentials: UserLoginInterface) {
    const response: UserLoginResponse = await ApiService.post('/users/login', credentials);
    if (response)
      localStorage.setItem('access_token', response.data.access_token);
    return response;
  }
  
  static async me() {
    const token = localStorage.getItem('access_token');
    const headers = { headers: {Authorization: `Bearer ${token}` }};
    const response: UserLoginResponse = await ApiService.get('/users/me', headers);
    if (response)
      localStorage.setItem('access_token', response.data.access_token);
    return response;
  }
}

export default UserService;