import { Textarea } from '@/components/ui/textarea';

interface DeliveryRequestInfoProps {
  value: string;
  onChange: (value: string) => void;
}

export const DelieryRequestInfo = ({ value, onChange }: DeliveryRequestInfoProps) => {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">요청 사항(선택)</h3>
      <div className="space-y-4">
        <div>
          <Textarea
            className="w-full rounded-md border p-2"
            rows={3}
            placeholder="요청 사항을 입력해주세요."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
