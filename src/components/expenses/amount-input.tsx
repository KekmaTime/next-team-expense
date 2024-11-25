"use client";

import { Input } from "@/components/ui/input";
import { useCurrencyInput } from "@/hooks/useCurrencyInput";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface RecentExpense {
  amount: number;
  date: Date;
}

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  onStatusChange?: (status: 'approved' | 'rejected') => void;
  recentExpenses?: RecentExpense[];
}

function MiniChart({ expenses }: { expenses?: RecentExpense[] }) {
  if (!expenses?.length) return null;

  const data = expenses
    .slice()
    .reverse()
    .map((expense, index) => ({
      name: `Expense ${expenses.length - index}`,
      amount: expense.amount,
      formattedAmount: formatCurrency(expense.amount)
    }));

  return (
    <div className="w-[300px] h-[200px] p-4">
      <div className="text-xs text-muted-foreground mb-2">
        Last {expenses.length} expenses
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data}>
          <XAxis 
            dataKey="name" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            fontSize={12}
            tickFormatter={(value) => formatCurrency(value)}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{ 
              background: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <CartesianGrid 
            strokeDasharray="3 3"
            vertical={false} 
            stroke="hsl(var(--border))"
            opacity={0.4}
          />
          <Bar 
            dataKey="amount" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            animationDuration={200}
            activeBar={{ fill: "hsl(var(--primary)/.8)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AmountInput({ value, onChange, onStatusChange, recentExpenses }: AmountInputProps) {
  const { displayValue, handleChange } = useCurrencyInput(value);
  const [status, setStatus] = useState<'approved' | 'rejected' | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusTimer, setFocusTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 'a' && onStatusChange) {
          e.preventDefault();
          setStatus('approved');
          onStatusChange('approved');
        } else if (e.key === 'r' && onStatusChange) {
          e.preventDefault();
          setStatus('rejected');
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

  const handleFocus = () => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    setFocusTimer(timer);
  };

  const handleBlur = () => {
    if (focusTimer) {
      clearTimeout(focusTimer);
      setFocusTimer(null);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div>
            <Input
              type="text"
              value={displayValue}
              onChange={(e) => {
                handleChange(e.target.value);
                onChange(e.target.value.replace(/[^\d.]/g, ''));
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="$0.00"
              className={`font-mono ${
                status === 'approved' 
                  ? 'border-green-500 focus:ring-green-500' 
                  : status === 'rejected'
                  ? 'border-red-500 focus:ring-red-500'
                  : ''
              }`}
            />
            {status && (
              <Badge
                variant={status === 'approved' ? 'secondary' : 'destructive'}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-none bg-transparent" align="start" sideOffset={5}>
          <div className="bg-popover border rounded-lg shadow-lg">
            <MiniChart expenses={recentExpenses} />
          </div>
        </PopoverContent>
      </Popover>
      <div className="text-xs text-muted-foreground mt-1">
        Alt + A to approve, Alt + R to reject
      </div>
    </div>
  );
}