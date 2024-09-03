import { UserResponseInterface } from '../interfaces/UserInterface';
import ApiService from './api.service';


class AuthService {
  
  static async refreshAccessToken(): Promise<UserResponseInterface> {
      const response = await ApiService.makeRequest('/auth/refresh', 'POST', undefined, { credentials: 'include' });
      return response;
  }
}

export default AuthService;