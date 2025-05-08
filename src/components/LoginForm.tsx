import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useLoginForm } from '@/hooks/useLoginForm';
import { Link } from 'react-router-dom';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { formData, handleChange } = useLoginForm();
  const { error, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto w-100 space-y-6 rounded-lg bg-white p-8 shadow-sm ${className || ''}`}
      {...props}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">로그인</h1>
        <p className="text-muted-foreground mt-2 text-sm">이메일과 비밀번호를 입력하세요</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="mb-2">
            이메일
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="hpost@example.com"
            required
            value={formData.email}
            onChange={handleChange('email')}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="password">비밀번호</Label>
            <Link to="/forgot-password" className="text-primary text-sm hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
            value={formData.password}
            onChange={handleChange('password')}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          로그인
        </Button>

        <p className="text-center text-sm">
          계정이 없으신가요?{' '}
          <Link to="/signup" className="text-primary hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
}
