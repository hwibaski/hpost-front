import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/api/auth.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignupFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

const initialFormData: SignupFormData = {
  email: '',
  password: '',
  name: '',
  phoneNumber: '',
};

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange =
    (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setError('');
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.signup(formData);
      if (response?.success) {
        navigate('/login');
      } else {
        throw new Error(response?.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    }
  };

  return (
    <main className="mx-auto flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-8">
      <form
        className="mx-auto w-100 space-y-6 rounded-lg bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            이메일과 비밀번호 및 기본정보를 입력하세요
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={formData.email}
              onChange={handleChange('email')}
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-2">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange('password')}
            />
          </div>

          <div>
            <Label htmlFor="name" className="mb-2">
              이름
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="이름"
              required
              value={formData.name}
              onChange={handleChange('name')}
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="mb-2">
              전화번호
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              pattern="[0-9]{10,11}"
              placeholder="01012345678"
              required
              value={formData.phoneNumber}
              onChange={handleChange('phoneNumber')}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </div>
      </form>
    </main>
  );
}
