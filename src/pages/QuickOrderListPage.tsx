import Footer from '@/components/Footer';
import { NavigationBar } from '@/components/NavigationBar';
import { columns } from '@/components/quick-order-list/columns';
import { DataTable } from '@/components/quick-order-list/data-table';
import { MainContainer } from '@/components/ui/MainContainer';
import { useQuickOrderList } from '@/lib/api/outbound/hooks';
import { formatDate, shortenString } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuickOrderListPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const LIMIT_SIZE = 20;
  const { data, isLoading } = useQuickOrderList(LIMIT_SIZE, (page - 1) * LIMIT_SIZE);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <NavigationBar />
      <MainContainer>
        <h1 className="mb-8 text-3xl">퀵 주문 목록</h1>
        <DataTable
          columns={columns}
          data={
            data?.data?.result.map((item) => ({
              ...item,
              id: shortenString(item.id, 10),
              number: shortenString(item.number, 10),
              createdAt: formatDate(item.createdAt),
            })) || []
          }
          totalCount={data?.data?.totalCount || 0}
          totalPages={data?.data?.totalPages || 0}
          page={page}
          limitSize={LIMIT_SIZE}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      </MainContainer>
      <Footer />
    </>
  );
};

export default QuickOrderListPage;
