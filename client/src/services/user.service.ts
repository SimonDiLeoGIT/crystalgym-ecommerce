import { UserInterface } from '../interfaces/UserInterface';
import ApiService from './api.service';

class UserService {
  static async register(userData: UserInterface) {
    return ApiService.post('/users/register', userData);
  }

  static async login(credentials: UserInterface) {
    return ApiService.post('/users/login', credentials);
  }
}

export default UserService;