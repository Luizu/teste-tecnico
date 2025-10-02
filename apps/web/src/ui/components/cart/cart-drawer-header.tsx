'use client';

import { Button } from '@/ui/components/button';
import { X } from 'lucide-react';

interface CartDrawerHeaderProps {
  itemCount: number;
  onClose: () => void;
}

export function CartDrawerHeader({
  itemCount,
  onClose,
}: CartDrawerHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">
        Carrinho de Compras ({itemCount})
      </h2>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="hover:bg-gray-100 h-8 w-8"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
