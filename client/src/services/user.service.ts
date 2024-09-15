import { ErrorInterface } from '../interfaces/ErrorInterface';
import { UserLoginInterface, UserRegisterInterface, UserResponseInterface } from '../interfaces/UserInterface';
import ApiService from './api.service';
import AuthService from './auth.service';

class UserService {
  static async register(userData: UserRegisterInterface): Promise<UserResponseInterface> {
    const response = await ApiService.makeRequest('/users/register', 'POST', userData);
    return response;
  }

  static async login(userData: UserLoginInterface): Promise<UserResponseInterface> {
    const response = await ApiService.makeRequest('/users/login', 'POST', userData);
    return response;
  }
  
  static async me(): Promise<UserResponseInterface> {
    try {
      const response: UserResponseInterface = await ApiService.makeRequest('/users/me', 'GET');
      return response;
    } catch (error) {
      const apiError = error as ErrorInterface;
      if (apiError.code === 401) {
        console.log('Refreshing access token...');
        try {
          const refreshedResponse = await AuthService.refreshAccessToken();
          return refreshedResponse;
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          throw refreshError ;
        }
      }
      throw error;
    }
  }
}

export default UserService;