import { CategoryInterface, PaginatedCategoriesInterface } from '../interfaces/CategoryInterfaces';
import ApiService from './api.service';

export default class CategoryService {
  static async getCategories(): Promise<CategoryInterface> {
    const response = await ApiService.makeRequest('/categories');
    return response;
  }


  static async getPaginatedCategories(page: number, perPage: number = 10): Promise<PaginatedCategoriesInterface> {
    const response = await ApiService.makeRequest(`/categories/admin/${page}/${perPage}`);
    return response;
  }
}