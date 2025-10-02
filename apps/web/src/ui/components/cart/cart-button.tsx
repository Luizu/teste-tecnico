'use client';

import { useCartActions } from '@/hooks/use-cart-actions';
import { useCartData } from '@/hooks/use-cart-data';
import { Button } from '@/ui/components/button';
import { ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';

export function CartButton() {
  const { itemCount } = useCartData();
  const { cart, isOpen, openCart, closeCart, updateQuantity } =
    useCartActions();

  return (
    <>
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="relative h-11 w-11 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          onClick={openCart}
        >
          <ShoppingCart className="h-5 w-5 text-gray-600" />
        </Button>

        {itemCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center min-w-fit">
            {itemCount > 99 ? '99+' : itemCount}
          </div>
        )}
      </div>

      <CartDrawer
        isOpen={isOpen}
        onClose={closeCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
}
