import { Button } from '@/components/ui/button';

interface PaymentInfoProps {
  basePrice: number;
  additionalPrice: number;
  onPayment: () => void;
  isLoading?: boolean;
}

export const PaymentInfo = ({
  basePrice,
  additionalPrice,
  onPayment,
  isLoading = false,
}: PaymentInfoProps) => {
  const totalPrice = basePrice + additionalPrice;

  return (
    <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">결제 정보</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">기본 운임</span>
          <span className="font-medium">{basePrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">추가 운임</span>
          <span className="font-medium">{additionalPrice.toLocaleString()}원</span>
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>총 결제금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
        <Button className="w-full" onClick={onPayment} disabled={isLoading}>
          {isLoading ? '처리 중...' : '결제하기'}
        </Button>
      </div>
    </div>
  );
};
