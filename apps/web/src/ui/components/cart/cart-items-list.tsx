'use client';

import { CartWithProducts } from '@/services/cart.service';
import { CartItem } from './cart-item';

interface CartItemsListProps {
  cart: CartWithProducts;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function CartItemsList({
  cart,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemsListProps) {
  return (
    <div className="p-4 space-y-3">
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          productId={item.productId}
          name={item.product.name}
          image={item.product.image}
          price={item.product.price}
          quantity={item.quantity}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemoveItem}
        />
      ))}
    </div>
  );
}
