import Footer from '@/components/Footer';
import { NavigationBar } from '@/components/NavigationBar';
import QuickOrderListTable from '@/components/quick-order-list/page';

const QuickOrderListPage = () => {
  return (
    <>
      <NavigationBar />
      <QuickOrderListTable />
      <Footer />
    </>
  );
};

export default QuickOrderListPage;
