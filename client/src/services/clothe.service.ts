import { ClotheDataInterface, ClotheInterface } from '../interfaces/ClothesInterfaces';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import ApiService from './api.service';
import AuthService from './auth.service';

export default class ClotheService {
  static async getClothes(): Promise<ClotheDataInterface> {
    const response = await ApiService.makeRequest('/clothes');
    return response;
  }

  static async postClothe(clothe: FormData): Promise<ClotheInterface> {
    try {
      const response = await ApiService.makeRequest('/clothe', 'POST', clothe);
      return response;
    } catch (error) {
      const apiError = error as ErrorInterface;
      if (apiError.code === 401 || apiError.code === 403 || apiError.code === 422) {
        console.log('Refreshing access token...');
        try {
          await AuthService.refreshAccessToken();
          const response = await ApiService.makeRequest('/clothe', 'POST', clothe);
          return response;
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          throw refreshError ;
        }
      }
      throw error;
    }
  }
}