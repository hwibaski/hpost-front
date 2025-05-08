import { authService } from '@/lib/api/auth.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

export function useAuth() {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const login = async (formData: LoginFormData) => {
    try {
      const response = await authService.login(formData);
      if (response?.success) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/');
        return true;
      }
      throw new Error(response?.message || '로그인에 실패했습니다.');
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그인에 실패했습니다.');
      return false;
    }
  };

  return {
    error,
    login,
  };
}
