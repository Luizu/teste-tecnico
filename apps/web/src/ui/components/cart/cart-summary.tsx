'use client';

import { Button } from '@/ui/components/button';

interface CartSummaryProps {
  subtotal: number;
  onCheckout?: () => void;
}

export function CartSummary({ subtotal, onCheckout }: CartSummaryProps) {
  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-base font-medium text-gray-700">Subtotal</span>
        <span className="text-xl font-bold text-gray-900">
          R$ {subtotal.toFixed(2).replace('.', ',')}
        </span>
      </div>
      <Button
        className="w-full h-10 text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white"
        onClick={onCheckout}
      >
        Finalizar Compra
      </Button>
    </div>
  );
}
