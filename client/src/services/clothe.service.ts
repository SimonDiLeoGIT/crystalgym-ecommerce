import { ClotheDataInterface, ClotheInterface } from '../interfaces/ClothesInterfaces';
import ApiService from './api.service';

export default class ClotheService {
  static async getClothes(): Promise<ClotheDataInterface> {
    const response = await ApiService.makeRequest('/clothes');
    return response;
  }

  static async postClothe(clothe: FormData): Promise<ClotheInterface> {
    for (const [key, value] of clothe.entries()) {
      console.log(`${key}:`, value);
    }
    const response = await ApiService.makeRequest('/clothe', 'POST', clothe);
    return response;
  }
}