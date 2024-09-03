import { ErrorInterface } from "../interfaces/ErrorInterface";


class ApiService {
  static baseURL = 'http://localhost:5000/api';

  static async makeRequest<T>(endpoint: string, method = 'GET', body?: T, options: RequestInit = {}) {
    const config: RequestInit = {
      method,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      ...options,
    };
    if (body) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      };
      config.body = JSON.stringify(body);
    }
    return this.request(endpoint, config);
  }

  static async request(endpoint: string, options: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      if (!response.ok) {
        const errorData: ErrorInterface = await responseData;
        throw errorData;
      }
      localStorage.setItem('access_token', responseData.data.access_token);
      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export default ApiService;