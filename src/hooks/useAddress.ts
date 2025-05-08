import { useState } from 'react';

export interface AddressInfo {
  name: string;
  phoneNumber: string;
  address: string;
  detailAddress: string;
}

const initialAddressInfo: AddressInfo = {
  name: '',
  phoneNumber: '',
  address: '',
  detailAddress: '',
};

export function useAddress() {
  const [departure, setDeparture] = useState<AddressInfo>(initialAddressInfo);
  const [arrival, setArrival] = useState<AddressInfo>(initialAddressInfo);

  const handleAddressChange = (
    setAddress: React.Dispatch<React.SetStateAction<AddressInfo>>,
    field: string,
    value: string
  ) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  return {
    departure,
    arrival,
    handleAddressChange,
    setDeparture,
    setArrival,
  };
}
