class ApiService {
  static baseURL = 'http://localhost:5000/api';

  static async get(endpoint: string, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      credentials: 'include', // Permite enviar cookies con la solicitud
      ...options,
    });
  }
  
  static async post<T>(endpoint: string, body: T, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Permite enviar cookies con la solicitud
      body: JSON.stringify(body),
      ...options,
    });
  }

  static async request(endpoint: string, options: RequestInit) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export default ApiService;