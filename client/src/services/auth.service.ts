import { UserResponseInterface } from '../interfaces/UserInterface';
import ApiService from './api.service';


class AuthService {
  
  static async refreshAccessToken() {
    try {
      const response: UserResponseInterface = await ApiService.post('/auth/refresh', {}, { credentials: 'include' });
      if (response) {
        localStorage.setItem('access_token', response.data.access_token);
        return response;
      }
      return null;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  }
}

export default AuthService;