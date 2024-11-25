import { useState, useEffect } from 'react';

export function useCurrencyInput(initialValue: string = '') {
  const [displayValue, setDisplayValue] = useState('');
  const [rawValue, setRawValue] = useState(initialValue);

  useEffect(() => {
    if (initialValue) {
      setDisplayValue(initialValue);
      setRawValue(initialValue);
    }
  }, [initialValue]);

  const formatAsCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const handleChange = (value: string, shouldFormat: boolean = false) => {
    // Remove all non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');
    
    // Handle multiple decimal points
    const parts = cleanValue.split('.');
    const formattedValue = parts[0] + (parts.length > 1 ? '.' + parts[1].slice(0, 2) : '');
    
    setDisplayValue(cleanValue);
    setRawValue(formattedValue);

    if (shouldFormat && cleanValue !== '') {
      const number = parseFloat(formattedValue);
      if (!isNaN(number)) {
        setDisplayValue(formatAsCurrency(number));
      }
    }
  };

  return {
    displayValue,
    rawValue,
    handleChange,
  };
}