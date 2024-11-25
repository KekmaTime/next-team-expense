import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ExpenseSplit } from "@/types/expense";
import { formatCurrency } from "@/lib/utils";

interface ExpenseSplitProps {
  totalAmount: number;
  onChange: (splits: ExpenseSplit[]) => void;
  value?: ExpenseSplit[];
}

export function ExpenseSplit({ totalAmount, onChange, value = [] }: ExpenseSplitProps) {
  const [splits, setSplits] = useState<ExpenseSplit[]>(value);

  useEffect(() => {
    if (splits.length === 0) {
      // Initialize with first split
      setSplits([{
        userId: 'user-1',
        amount: totalAmount,
        percentage: 100
      }]);
    }
  }, [splits.length, totalAmount]);

  const handleSplitChange = (index: number, type: 'amount' | 'percentage', value: number) => {
    const newSplits = [...splits];
    const split = newSplits[index];

    if (type === 'amount') {
      split.amount = value;
      split.percentage = (value / totalAmount) * 100;
    } else {
      split.percentage = value;
      split.amount = (totalAmount * value) / 100;
    }

    setSplits(newSplits);
    onChange(newSplits);
  };

  return (
    <div className="space-y-4">
      {splits.map((split, index) => (
        <div key={index} className="flex gap-4 items-center">
          <Input
            type="number"
            value={split.amount}
            onChange={(e) => handleSplitChange(index, 'amount', parseFloat(e.target.value))}
            className="w-32"
          />
          <Input
            type="number"
            value={split.percentage}
            onChange={(e) => handleSplitChange(index, 'percentage', parseFloat(e.target.value))}
            className="w-24"
            min="0"
            max="100"
          />
          <span className="text-sm text-gray-500">
            {formatCurrency(split.amount)}
          </span>
        </div>
      ))}
      
      {splits.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const remainingPercentage = 100 - splits.reduce((acc, s) => acc + s.percentage, 0);
            const newSplit = {
              userId: `user-${splits.length + 1}`,
              amount: (totalAmount * remainingPercentage) / 100,
              percentage: remainingPercentage
            };
            setSplits([...splits, newSplit]);
          }}
        >
          Add Split
        </Button>
      )}
    </div>
  );
}