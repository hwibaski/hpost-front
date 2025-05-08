import type { AddressInfo } from '@/hooks/useAddress';
import { useState } from 'react';

const BASE_PRICE = 5000;

export function usePayment() {
  const [additionalPrice, setAdditionalPrice] = useState(0);

  const handlePayment = (departure: AddressInfo, arrival: AddressInfo, request: string) => {
    console.log('결제 처리', {
      departure,
      arrival,
      request,
      totalPrice: BASE_PRICE + additionalPrice,
    });
  };

  return {
    basePrice: BASE_PRICE,
    additionalPrice,
    setAdditionalPrice,
    handlePayment,
  };
}
