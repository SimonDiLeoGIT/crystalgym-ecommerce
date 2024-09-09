import { GenderInterface } from '../interfaces/GenderInterfaces';
import ApiService from './api.service';

export default class GenderService {
  
  static async getGenders(): Promise<GenderInterface> {
    const response = await ApiService.makeRequest('/genders');
    return response;
  }
}