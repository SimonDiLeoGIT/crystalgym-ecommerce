import { ErrorInterface } from '../interfaces/ErrorInterface';
import { UserLoginInterface, UserRegisterInterface, UserResponseInterface } from '../interfaces/UserInterface';
import { isUserResponseInterface } from '../utils/ResponseType';
import ApiService from './api.service';
import AuthService from './auth.service';

class UserService {
  static async register(userData: UserRegisterInterface): Promise<UserResponseInterface | ErrorInterface> {
    const response: UserResponseInterface | ErrorInterface = await ApiService.post('/users/register', userData);
    
    if (isUserResponseInterface(response)) {
      this.storeAccessToken(response.data.access_token);
    }
    
    return response;
  }

  static storeAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
  }

  static async login(credentials: UserLoginInterface): Promise<UserResponseInterface | ErrorInterface> {
    const response: UserResponseInterface | ErrorInterface = await ApiService.post('/users/login', credentials);
    if (isUserResponseInterface(response)) {
      this.storeAccessToken(response.data.access_token);
    }
    
    return response;
  }
  
  static async me(): Promise<UserResponseInterface | null> {
    try {
      const token = localStorage.getItem('access_token');
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response: UserResponseInterface = await ApiService.get('/users/me', headers);
      if (response) {
        localStorage.setItem('access_token', response.data.access_token);
        return response;
      }
      return null
    } catch (error:unknown) {
      if (error instanceof Error && (error.message.includes('401') || error.message.includes('UNAUTHORIZED'))) {
        console.log('Refreshing access token...');
        try {
          const refreshedResponse = await AuthService.refreshAccessToken();
          if (refreshedResponse) {
            const newAccessToken = refreshedResponse.data.access_token;
            localStorage.setItem('access_token', newAccessToken);
            return refreshedResponse;
          }
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          return null;
        }
      }
      return null;
    }
  }
}

export default UserService;