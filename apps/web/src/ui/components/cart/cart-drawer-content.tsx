import { CartWithProducts } from '@/services/cart.service';
import { CartEmptyState } from './cart-empty-state';
import { CartItemsList } from './cart-items-list';

interface CartDrawerContentProps {
  cart: CartWithProducts | null;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export function CartDrawerContent({
  cart,
  onUpdateQuantity,
}: CartDrawerContentProps) {
  if (!cart || cart.items.length === 0) {
    return <CartEmptyState />;
  }

  return <CartItemsList cart={cart} onUpdateQuantity={onUpdateQuantity} />;
}
