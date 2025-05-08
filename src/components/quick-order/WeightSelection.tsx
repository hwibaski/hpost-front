import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const WEIGHT_OPTIONS = [
  { id: 'under3', label: '3kg 이하' },
  { id: 'under5', label: '5kg 이하' },
  { id: 'under10', label: '10kg 이하' },
  { id: 'under20', label: '20kg 이하' },
  { id: 'over20', label: '20kg 초과' },
] as const;

interface WeightSelectionProps {
  weight: number;
  onWeightChange: (weight: number) => void;
}

export function WeightSelection({ weight, onWeightChange }: WeightSelectionProps) {
  const [selectedWeightId, setSelectedWeightId] = useState<string>(() => {
    if (weight > 20) return 'over20';
    if (weight > 10) return 'under20';
    if (weight > 5) return 'under10';
    if (weight > 3) return 'under5';
    return 'under3';
  });
  const [isOver20kg, setIsOver20kg] = useState(weight > 20);

  const handleWeightSelect = (weightId: string) => {
    const weightMap: Record<string, number> = {
      under3: 3,
      under5: 5,
      under10: 10,
      under20: 20,
      over20: 20.1,
    };

    setSelectedWeightId(weightId);
    const newWeight = weightMap[weightId];
    setIsOver20kg(weightId === 'over20');
    onWeightChange(newWeight);
  };

  const handleCustomWeightChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 20) {
      onWeightChange(numValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {WEIGHT_OPTIONS.map((option) => (
          <Button
            key={option.id}
            variant={selectedWeightId === option.id ? 'default' : 'outline'}
            onClick={() => handleWeightSelect(option.id)}
            className="w-full"
          >
            {option.label}
          </Button>
        ))}
      </div>
      {isOver20kg && (
        <Input
          type="number"
          min="20.1"
          step="0.1"
          placeholder="20.1kg 이상의 무게를 입력하세요"
          value={weight > 20 ? weight : ''}
          onChange={(e) => handleCustomWeightChange(e.target.value)}
        />
      )}
    </div>
  );
}
