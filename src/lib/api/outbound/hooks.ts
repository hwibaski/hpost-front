import { useMutation, useQuery } from '@tanstack/react-query';
import { outboundService } from './outbound.service';

export const useCreateQuickOrder = () => {
  return useMutation({
    mutationFn: outboundService.createQuickOrder,
  });
};

export const useQuickOrderList = (limit: number = 10, offset: number = 0) => {
  return useQuery({
    queryKey: ['quickOrderList', limit, offset],
    queryFn: () => outboundService.getQuickOrderList(limit, offset),
    refetchInterval: false,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    gcTime: 1000 * 60 * 3,
  });
};
