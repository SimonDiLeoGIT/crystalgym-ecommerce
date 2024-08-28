import { ErrorInterface } from "../interfaces/ErrorInterface";

class ApiService {
  static baseURL = 'http://localhost:5000/api';

  static async get(endpoint: string, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    });
  }
  
  static async post<T>(endpoint: string, body: T, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...options,
    });
  }

  static async request(endpoint: string, options: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData: ErrorInterface = await response.json();
        return errorData;
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export default ApiService;