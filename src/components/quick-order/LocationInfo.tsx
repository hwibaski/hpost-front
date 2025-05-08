import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LocationInfoProps {
  value: {
    name: string;
    phoneNumber: string;
    address: string;
    detailAddress: string;
  };
  isDeparture: boolean;
  onChange: (field: keyof LocationInfoProps['value'], value: string) => void;
}

export const LocationInfo = ({ value, onChange, isDeparture }: LocationInfoProps) => {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">{isDeparture ? '출발지' : '도착지'}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">이름</Label>
          <Input
            type="text"
            className="w-full rounded-md border p-2"
            value={value.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">연락처</Label>
          <Input
            type="tel"
            className="w-full rounded-md border p-2"
            value={value.phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <Label className="mb-1 block text-sm font-medium text-gray-700">주소</Label>
          <div className="mb-2 flex gap-2">
            <Input
              type="text"
              className="flex-1 rounded-md border p-2"
              placeholder="기본주소"
              value={value.address}
              onChange={(e) => onChange('address', e.target.value)}
            />
            <Button>주소검색</Button>
          </div>
          <Input
            type="text"
            className="w-full rounded-md border p-2"
            placeholder="상세주소"
            value={value.detailAddress}
            onChange={(e) => onChange('detailAddress', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
