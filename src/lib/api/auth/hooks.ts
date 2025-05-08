import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from './auth.service';

// Auth Hooks
export const useSignup = () => {
  return useMutation({
    mutationFn: authService.signup,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => authService.me(),
    refetchInterval: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    gcTime: 1000 * 60 * 20,
  });
};
