'use client';

import { useCart } from '@/contexts/cart-context';
import { getCart, getCartWithProducts } from '@/services/cart.service';
import { useEffect } from 'react';

export function useCartData() {
  const { cart, itemCount, setCart } = useCart();

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const cartData = await getCart();
        if (cartData && cartData.items.length > 0) {
          const fullCart = await getCartWithProducts();
          setCart(fullCart);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartCount();
  }, [setCart]);

  return { cart, itemCount };
}
