// This type is used to define the shape of our data.

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

// You can use a Zod schema here if you want.
export type QuickBundle = {
  id: string;
  channel: string;
  createdAt: string;
  number: string;
};

export const columns: ColumnDef<QuickBundle>[] = [
  {
    accessorKey: 'id',
    header: '주문ID',
  },
  {
    accessorKey: 'channel',
    header: '접수 채널',
  },
  {
    accessorKey: 'number',
    header: '주문번호',
  },
  {
    accessorKey: 'createdAt',
    header: '주문일시',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `주문 id: ${row.original.id} 주문번호: ${row.original.number} 주문일시: ${row.original.createdAt} 채널: ${row.original.channel}`
                );
              }}
            >
              주문 정보 복사
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log('TODO: 영수증 출력 API 호출');
              }}
            >
              영수증 출력
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-bold text-red-500"
              onClick={() => {
                console.log('TODO: 주문 취소 API 호출 ');
              }}
            >
              {' '}
              주문 취소
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
