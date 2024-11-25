"use client";

import { Input } from "@/components/ui/input";
import { useCurrencyInput } from "@/hooks/useCurrencyInput";
import { useEffect } from "react";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  onStatusChange?: (status: 'approved' | 'rejected') => void;
}

export function AmountInput({ value, onChange, onStatusChange }: AmountInputProps) {
  const { displayValue, handleChange } = useCurrencyInput(value);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 'a' && onStatusChange) {
          e.preventDefault();
          onStatusChange('approved');
        } else if (e.key === 'r' && onStatusChange) {
          e.preventDefault();
          onStatusChange('rejected');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStatusChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleChange(displayValue, true);
    }
  };

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={(e) => {
        handleChange(e.target.value);
        onChange(e.target.value.replace(/[^\d.]/g, ''));
      }}
      onKeyDown={handleKeyDown}
      placeholder="$0.00"
      className="font-mono"
    />
  );
}