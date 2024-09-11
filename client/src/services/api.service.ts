import { ErrorInterface } from "../interfaces/ErrorInterface";


class ApiService {
  static baseURL = 'http://localhost:5000/api';

  static async makeRequest<T>(endpoint: string, method = 'GET', body?: T,  options: RequestInit = {}) {
    const accessToken = localStorage.getItem('access_token');
    const config: RequestInit = {
      method,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      ...options,
    };
    if (body instanceof FormData) {
      config.body = body;
    } else if (body) {
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
        if (response.status === 401) {
          const errorData: ErrorInterface = {
            error: 'Unauthorized',
            message: 'Access token expired',
            code: 401,};
            throw errorData;
        }
        const errorData: ErrorInterface = await responseData;
        throw errorData;
      }
      responseData.data.access_token && localStorage.setItem('access_token', responseData.data.access_token);
      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export default ApiService;