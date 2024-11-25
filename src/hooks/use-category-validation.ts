import { useEffect, useState } from 'react';
import { mockCategories } from '@/lib/mock-data';
import { ExpenseCategory } from '@/types/expense';

export function useCategoryValidation(
  categoryPath: string[],
  amount: string,
  userId: string = 'user-1'
): 'pending' | 'approved' | 'rejected' {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('approved');

  useEffect(() => {
    if (!categoryPath.length) {
      setStatus('approved');
      return;
    }

    let currentCategory: ExpenseCategory | undefined = mockCategories.find(
      c => c.name === categoryPath[0]
    );

    for (let i = 1; i < categoryPath.length && currentCategory; i++) {
      currentCategory = currentCategory.subcategories?.find(
        c => c.name === categoryPath[i]
      );
    }

    if (currentCategory?.rules) {
      const numAmount = parseFloat(amount);
      const { maxAmount, requiresApproval, allowedUsers } = currentCategory.rules;

      let newStatus: 'pending' | 'approved' | 'rejected' = 'approved';

      if (maxAmount && numAmount > maxAmount) {
        newStatus = 'rejected';
      }

      if (allowedUsers && !allowedUsers.includes(userId)) {
        newStatus = 'rejected';
      }

      if (requiresApproval) {
        newStatus = 'pending';
      }

      setStatus(newStatus);
    } else {
      setStatus('approved');
    }
  }, [categoryPath, amount, userId]);

  return status;
}