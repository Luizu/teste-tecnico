'use server';

import { apiClient } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  sessionId: string;
  items: CartItem[];
}

/**
 * Adiciona um produto ao carrinho
 */
export async function addToCart(productId: string): Promise<Cart> {
  const sessionId = await getOrCreateSessionId();

  try {
    const cart = await apiClient.post<Cart>('/cart/add', {
      sessionId,
      productId,
    });

    revalidatePath('/', 'layout');

    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Erro ao adicionar produto ao carrinho');
  }
}

/**
 * Remove um produto do carrinho
 */
export async function removeFromCart(productId: string): Promise<void> {
  const sessionId = await getOrCreateSessionId();

  try {
    await apiClient.post('/cart/remove', {
      sessionId,
      productId,
    });

    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw new Error('Erro ao remover produto do carrinho');
  }
}

/**
 * Obtém o carrinho atual
 */
export async function getCart(): Promise<Cart | null> {
  const sessionId = await getOrCreateSessionId();

  try {
    const cart = await apiClient.get<Cart>('/cart', {
      params: { sessionId },
    });

    return cart;
  } catch (error) {
    console.error('Error getting cart:', error);
    return null;
  }
}
