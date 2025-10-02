'use client';

import { useCart } from '@/contexts/cart-context';
import {
  addToCart,
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
    if (!cart) return;

    const currentItem = cart.items.find((item) => item.productId === productId);
    if (!currentItem) return;

    const currentQuantity = currentItem.quantity;

    // Optimistic update - se a quantidade for 0, remove o item do array
    let updatedItems;
    if (newQuantity <= 0) {
      updatedItems = cart.items.filter((item) => item.productId !== productId);
    } else {
      updatedItems = cart.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item,
      );
    }
    setCart({ ...cart, items: updatedItems } as CartWithProducts);

    try {
      if (newQuantity > currentQuantity) {
        await addToCart(productId);
      } else if (newQuantity < currentQuantity) {
        await removeFromCart(productId);
      }

      // Busca carrinho atualizado - pode retornar null se estiver vazio
      const updatedCart = await getCartWithProducts();
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);

      if (error instanceof Error && error.message.includes('remover produto')) {
        try {
          const updatedCart = await getCartWithProducts();
          setCart(updatedCart);
        } catch {
          setCart(null);
        }
      } else {
        toast.error('Erro ao atualizar quantidade');
        try {
          const revertedCart = await getCartWithProducts();
          setCart(revertedCart);
        } catch {
          setCart(null);
        }
      }
    }
  };

  return {
    cart,
    isOpen,
    openCart,
    closeCart,
    updateQuantity,
  };
}
