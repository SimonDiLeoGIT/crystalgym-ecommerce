import { ClotheDataInterface, ClotheInterface } from '../interfaces/ClothesInterfaces';
import ApiService from './api.service';
import AuthService from './auth.service';

export default class ClotheService {
  static async getClothes(): Promise<ClotheDataInterface> {
    const response = await ApiService.makeRequest('/clothes');
    return response;
  }

  static async postClothe(clothe: FormData): Promise<ClotheInterface> {
    for (const [key, value] of clothe.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await ApiService.makeRequest('/clothe', 'POST', clothe);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error && (error.message.includes('401') || error.message.includes('403') || error.message.includes('422'))) {
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