'use client';

import { useCart } from '@/contexts/cart-context';
import {
  CartWithProducts,
  getCartWithProducts,
  removeFromCart,
} from '@/services/cart.service';
import { useState } from 'react';
import { toast } from 'sonner';

export function useCartActions() {
  const { cart, setCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const openCart = async () => {
    try {
      const cartData = await getCartWithProducts();
      setCart(cartData);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    if (cart) {
      const updatedItems = cart.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item,
      );
      setCart({ ...cart, items: updatedItems } as CartWithProducts);
    }

    try {
      // TODO: Implementar API de update quantity
      await new Promise((resolve) => setTimeout(resolve, 300));
      const updatedCart = await getCartWithProducts();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Erro ao atualizar quantidade');
      const revertedCart = await getCartWithProducts();
      setCart(revertedCart);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await removeFromCart(productId);
      toast.success('Produto removido do carrinho');
      const updatedCart = await getCartWithProducts();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Erro ao remover produto');
    }
  };

  return {
    cart,
    isOpen,
    openCart,
    closeCart,
    updateQuantity,
    removeItem,
  };
}
