'use client';

import { CartWithProducts } from '@/services/cart.service';
import {
  CartDrawerContent,
  CartDrawerHeader,
  CartSummary,
} from '@/ui/components/cart';
import { useEffect, useRef } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartWithProducts | null;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
}: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal =
    cart?.items.reduce((acc, item) => {
      const price = item.product.promotionalPrice || item.product.price;
      return acc + price * item.quantity;
    }, 0) || 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200" />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out flex flex-col"
      >
        <CartDrawerHeader
          itemCount={cart?.items.length || 0}
          onClose={onClose}
        />

        <div className="flex-1 overflow-y-auto">
          <CartDrawerContent cart={cart} onUpdateQuantity={onUpdateQuantity} />
        </div>

        {cart && cart.items.length > 0 && <CartSummary subtotal={subtotal} />}
      </div>
    </>
  );
}
