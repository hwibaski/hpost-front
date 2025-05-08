import { Button } from '@/components/ui/button';

const VEHICLE_OPTIONS = [
  { id: 'BIKE', label: '오토바이' },
  { id: 'CAR', label: '승용차' },
] as const;

interface VehicleSelectionProps {
  selectedVehicle: string;
  onVehicleSelect: (vehicle: string) => void;
}

export function VehicleSelection({ selectedVehicle, onVehicleSelect }: VehicleSelectionProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {VEHICLE_OPTIONS.map((vehicle) => (
        <Button
          key={vehicle.id}
          variant={selectedVehicle === vehicle.id ? 'default' : 'outline'}
          onClick={() => onVehicleSelect(vehicle.id)}
          className="min-w-[100px]"
        >
          {vehicle.label}
        </Button>
      ))}
    </div>
  );
}
