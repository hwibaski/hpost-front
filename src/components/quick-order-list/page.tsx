import { MainContainer } from '@/components/ui/MainContainer';
import { outboundService } from '@/lib/api/outbound.service';
import { formatDate, shortenString } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { type QuickBundle, columns } from './columns';
import { DataTable } from './data-table';

export default function QuickOrderListTable() {
  const [data, setData] = useState<QuickBundle[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    totalCount: 0,
    page: 0,
    totalPages: 0,
    limitSize: 10,
    offsetSize: 0,
  });

  useEffect(() => {
    outboundService
      .getQuickOrderList(paginationInfo.limitSize, paginationInfo.offsetSize)
      .then((data) => {
        setData(data.result);
        setPaginationInfo({
          totalCount: data.totalCount,
          page: data.page,
          totalPages: data.totalPages,
          limitSize: paginationInfo.limitSize,
          offsetSize: paginationInfo.offsetSize,
        });
      });
  }, []);

  const handlePageChange = (newPage: number) => {
    setPaginationInfo((prev) => ({
      ...prev,
      page: newPage,
      offsetSize: newPage * prev.limitSize,
    }));
  };

  const LIMIT_STRING_LENGTH = 10;

  return (
    <MainContainer>
      <h1 className="mb-8 text-3xl">배송조회</h1>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <DataTable
          columns={columns}
          data={data.map((item) => ({
            ...item,
            createdAt: formatDate(item.createdAt),
            id: shortenString(item.id, LIMIT_STRING_LENGTH),
            number: shortenString(item.number, LIMIT_STRING_LENGTH),
          }))}
          totalCount={paginationInfo.totalCount}
          totalPages={paginationInfo.totalPages}
          page={paginationInfo.page}
          onPageChange={handlePageChange}
        />
      </div>
    </MainContainer>
  );
}
