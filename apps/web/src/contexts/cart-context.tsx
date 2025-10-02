'use client';

import { CartWithProducts } from '@/services/cart.service';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface CartContextType {
  cart: CartWithProducts | null;
  itemCount: number;
  setCart: (cart: CartWithProducts | null) => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCartState] = useState<CartWithProducts | null>(null);

  const itemCount =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const setCart = useCallback((newCart: CartWithProducts | null) => {
    setCartState(newCart);
  }, []);

  const refreshCart = useCallback(() => {
    setCartState((prev) => (prev ? { ...prev } : null));
  }, []);

  return (
    <CartContext.Provider value={{ cart, itemCount, setCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
