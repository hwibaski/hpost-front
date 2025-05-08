import Footer from '@/components/Footer';
import HomeMain from '@/components/HomeMain';
import { NavigationBar } from '@/components/NavigationBar';

const HomePage = () => {
  return (
    <>
      <NavigationBar />
      <main className="mx-auto min-h-[700px] w-full">
        <HomeMain />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
