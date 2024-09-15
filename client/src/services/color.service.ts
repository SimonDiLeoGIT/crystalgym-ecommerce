import { ColorInterface } from '../interfaces/ColorInterfaces';
import ApiService from './api.service';

export default class ColorService {
  
  static async getColors(): Promise<ColorInterface> {
    const response = await ApiService.makeRequest('/colors');
    return response;
  }
}