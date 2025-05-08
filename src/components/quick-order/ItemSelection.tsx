import { ItemTypeSelection } from '@/components/quick-order/ItemTypeSelection';
import { VehicleSelection } from '@/components/quick-order/VehicleSelection';
import { WeightSelection } from '@/components/quick-order/WeightSelection';
import { useState } from 'react';

interface ItemSelectionProps {
  value: {
    document: number;
    smallBox: number;
    mediumBox: number;
    bigBox: number;
    etc: string;
    weight: number;
    vehicle: string;
  };
  onChange: (value: {
    document: number;
    smallBox: number;
    mediumBox: number;
    bigBox: number;
    etc: string;
    weight: number;
    vehicle: string;
  }) => void;
}

export function ItemSelection({ value, onChange }: ItemSelectionProps) {
  const [selectedItem, setSelectedItem] = useState('document');

  const handleItemSelect = (itemType: string) => {
    setSelectedItem(itemType);
    const newValue = {
      ...value,
      document: itemType === 'document' ? 1 : 0,
      smallBox: itemType === 'smallBox' ? 1 : 0,
      mediumBox: itemType === 'mediumBox' ? 1 : 0,
      bigBox: itemType === 'bigBox' ? 1 : 0,
    };
    onChange(newValue);
  };

  const handleEtcChange = (etcValue: string) => {
    onChange({ ...value, etc: etcValue });
  };

  const handleWeightChange = (weight: number) => {
    onChange({ ...value, weight });
  };

  const handleVehicleSelect = (vehicle: string) => {
    onChange({ ...value, vehicle });
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">물품 정보</h3>
      <ItemTypeSelection
        selectedItem={selectedItem}
        onItemSelect={handleItemSelect}
        etcValue={value.etc}
        onEtcChange={handleEtcChange}
      />
      <WeightSelection weight={value.weight} onWeightChange={handleWeightChange} />
      <VehicleSelection selectedVehicle={value.vehicle} onVehicleSelect={handleVehicleSelect} />
    </div>
  );
}
