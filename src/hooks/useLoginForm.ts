import { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);

  const handleChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return {
    formData,
    handleChange,
  };
}
