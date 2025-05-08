import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ITEM_OPTIONS = [
  { id: 'document', label: '서류' },
  { id: 'smallBox', label: '소형박스' },
  { id: 'mediumBox', label: '중형박스' },
  { id: 'bigBox', label: '대형박스' },
  { id: 'etc', label: '기타' },
] as const;

interface ItemTypeSelectionProps {
  selectedItem: string;
  onItemSelect: (itemType: string) => void;
  etcValue: string;
  onEtcChange: (value: string) => void;
}

export function ItemTypeSelection({
  selectedItem,
  onItemSelect,
  etcValue,
  onEtcChange,
}: ItemTypeSelectionProps) {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {ITEM_OPTIONS.map((item) => (
          <Button
            key={item.id}
            variant={selectedItem === item.id ? 'default' : 'outline'}
            onClick={() => onItemSelect(item.id)}
            className="w-full"
          >
            {item.label}
          </Button>
        ))}
      </div>
      {selectedItem === 'etc' && (
        <Input
          placeholder="기타 물품 정보를 입력하세요"
          value={etcValue}
          onChange={(e) => onEtcChange(e.target.value)}
        />
      )}
    </div>
  );
}
