import { apiClient } from '@/lib/api/fetchClient';
import type { ApiResponse } from '@/lib/api/types';

interface SignupRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface SignupResponse {
  id: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export interface MeResponse {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
}

export const authService = {
  async signup(data: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    const response = await apiClient.post<SignupRequest, ApiResponse<SignupResponse>>(
      '/auth/signup',
      data
    );

    return response;
  },

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginRequest, ApiResponse<LoginResponse>>(
      '/auth/login',
      data
    );

    return response;
  },

  async me(): Promise<ApiResponse<MeResponse>> {
    const response = await apiClient.get<ApiResponse<MeResponse>>('/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response;
  },
};
