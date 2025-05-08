import Footer from '@/components/Footer';
import { NavigationBar } from '@/components/NavigationBar';
import { ItemSelection } from '@/components/quick-order/ItemSelection';
import { LocationInfo } from '@/components/quick-order/LocationInfo';
import { PaymentInfo } from '@/components/quick-order/PaymentInfo';
import { DelieryRequestInfo } from '@/components/quick-order/RequestInfo';
import { MainContainer } from '@/components/ui/MainContainer';
import { useAddress } from '@/hooks/useAddress';
import { usePayment } from '@/hooks/usePayment';
import { useCreateQuickOrder } from '@/lib/api/outbound/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuickOrderPage = () => {
  const [request, setRequest] = useState('');
  const [itemInfo, setItemInfo] = useState({
    document: 1,
    smallBox: 0,
    mediumBox: 0,
    bigBox: 0,
    etc: '',
    weight: 3,
    vehicle: 'BIKE',
  });
  const navigate = useNavigate();
  const { departure, arrival, handleAddressChange, setDeparture, setArrival } = useAddress();
  const { basePrice, additionalPrice } = usePayment();
  const createQuickOrder = useCreateQuickOrder();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleItemChange = (value: {
    document: number;
    smallBox: number;
    mediumBox: number;
    bigBox: number;
    etc: string;
    weight: number;
    vehicle: string;
  }) => {
    setItemInfo(value);
  };

  const handleSubmit = async () => {
    try {
      await createQuickOrder.mutateAsync({
        packagesToOrder: [
          {
            origin: {
              name: departure.name,
              detailAddress: departure.detailAddress,
              phoneNumber: departure.phoneNumber,
              roadAddress: departure.address,
              jibunAddress: departure.address,
              postalCode: 'abc',
              latitude: 0,
              longitude: 0,
            },
            destination: {
              name: arrival.name,
              detailAddress: arrival.detailAddress,
              phoneNumber: arrival.phoneNumber,
              roadAddress: arrival.address,
              jibunAddress: arrival.address,
              postalCode: 'abc',
              latitude: 0,
              longitude: 0,
            },
            item: {
              document: itemInfo.document,
              smallBox: itemInfo.smallBox,
              bigBox: itemInfo.bigBox,
              price: basePrice + additionalPrice,
              weight: itemInfo.weight,
              etc: itemInfo.etc,
            },
            vehicleOption: itemInfo.vehicle,
            clientRequestComment: request,
          },
        ],
      });

      alert('퀵 주문이 접수되었습니다.');
      navigate('/quick-order-list');
    } catch (error) {
      alert(`퀵 주문 접수에 실패했습니다. ${error}`);
    }
  };

  return (
    <>
      <NavigationBar />
      <MainContainer>
        <h1 className="mb-8 text-3xl">퀵 접수</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <LocationInfo
              value={departure}
              onChange={(field, value) => handleAddressChange(setDeparture, field, value)}
              isDeparture={true}
            />
            <LocationInfo
              value={arrival}
              onChange={(field, value) => handleAddressChange(setArrival, field, value)}
              isDeparture={false}
            />
            <ItemSelection value={itemInfo} onChange={handleItemChange} />
            <DelieryRequestInfo value={request} onChange={setRequest} />
          </div>
          <div className="lg:col-span-1">
            <PaymentInfo
              basePrice={basePrice}
              additionalPrice={additionalPrice}
              onPayment={handleSubmit}
              isLoading={createQuickOrder.isPending}
            />
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  );
};

export default QuickOrderPage;
