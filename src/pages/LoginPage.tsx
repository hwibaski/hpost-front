import Footer from '@/components/Footer';
import { LoginForm } from '@/components/LoginForm';
import { NavigationBar } from '@/components/NavigationBar';

const LoginPage = () => {
  return (
    <>
      <NavigationBar />
      <main className="mx-auto flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-8">
        <LoginForm className="mx-auto w-100" />
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
