'use client';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
  type Table as TypeTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  totalPages: number;
  page: number;
  limitSize: number;
  onPageChange: (page: number) => void;
}

function NoResultTable<TData, TValue>({ columns }: { columns: ColumnDef<TData, TValue>[] }) {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        조회된 주문이 없습니다.
      </TableCell>
    </TableRow>
  );
}

function ResultTable<TData>({ table }: { table: TypeTable<TData> }) {
  return table.getRowModel().rows.map((row: Row<TData>) => (
    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));
}

function PaginationButton<TData>({
  table,
  totalPages,
}: {
  table: TypeTable<TData>;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          table.setPagination({ page: table.getState().pagination.page - 1, pageSize: 10 })
        }
        disabled={table.getState().pagination.page === 1}
      >
        {'<'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          table.setPagination({ page: table.getState().pagination.page + 1, pageSize: 10 })
        }
        disabled={table.getState().pagination.page === totalPages}
      >
        {'>'}
      </Button>
    </div>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalCount,
  totalPages,
  page,
  limitSize,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: limitSize,
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        page: page,
        pageSize: limitSize,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(table.getState().pagination) : updater;

      onPageChange(newPagination.page);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <ResultTable table={table} />
          ) : (
            <NoResultTable columns={columns} />
          )}
        </TableBody>
      </Table>
      <div className="flex w-full items-center justify-between py-4">
        <div className="text-sm text-gray-600">
          {totalCount}개 중 {(page - 1) * limitSize + 1}-{page * limitSize}개 표시
        </div>
        <PaginationButton table={table} totalPages={totalPages} />
      </div>
    </div>
  );
}
