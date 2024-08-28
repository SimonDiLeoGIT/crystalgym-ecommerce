import { ErrorInterface } from '../interfaces/ErrorInterface';
import { UserLoginInterface, UserRegisterInterface, UserResponseData } from '../interfaces/UserInterface';
import { isUserResponseData } from '../utils/ResponseType';
import ApiService from './api.service';
import AuthService from './auth.service';

class UserService {
  static async register(userData: UserRegisterInterface): Promise<UserResponseData | ErrorInterface> {
    const response: UserResponseData | ErrorInterface = await ApiService.post('/users/register', userData);
    
    if (isUserResponseData(response)) {
      this.storeAccessToken(response.data.access_token);
    }
    
    return response;
  }

  static storeAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
  }

  static async login(credentials: UserLoginInterface): Promise<UserResponseData | ErrorInterface> {
    const response: UserResponseData | ErrorInterface = await ApiService.post('/users/login', credentials);
    if (isUserResponseData(response)) {
      this.storeAccessToken(response.data.access_token);
    }
    
    return response;
  }
  
  static async me(): Promise<UserResponseData | null> {
    try {
      const token = localStorage.getItem('access_token');
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response: UserResponseData = await ApiService.get('/users/me', headers);
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