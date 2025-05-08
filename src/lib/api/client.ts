const baseURL = 'http://localhost:3000';

export const apiClient = {
  async request(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${baseURL}${url}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request(url, { ...options, method: 'GET' });
  },

  async post<T, S>(url: string, data: T, options: RequestInit = {}): Promise<S> {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async put<T, S>(url: string, data: T, options: RequestInit = {}): Promise<S> {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(url: string, options: RequestInit = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  },
};
