'use server';

import { apiClient } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

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

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface CartWithProducts {
  id: string;
  sessionId: string;
  items: CartItemWithProduct[];
}
/**
 * Normaliza os dados do carrinho vindos da API
 * Converte strings numéricas para números
 */
function normalizeCartData(cart: CartWithProducts): CartWithProducts {
  return {
    ...cart,
    items: cart.items.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
      product: item.product
        ? {
            ...item.product,
            price: Number(item.product.price),
            stock: Number(item.product.stock),
          }
        : undefined,
    })) as CartItemWithProduct[],
  };
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

  await apiClient.post('/cart/remove', {
    sessionId,
    productId,
  });

  revalidatePath('/', 'layout');
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

    if (!cart || !cart.items) {
      return null;
    }

    return cart;
  } catch (error) {
    console.error('Error getting cart:', error);
    return null;
  }
}

/**
 * Obtém o carrinho atual com dados completos dos produtos
 * O backend já retorna os produtos junto com os itens do carrinho
 */
export async function getCartWithProducts(): Promise<CartWithProducts | null> {
  const sessionId = await getOrCreateSessionId();

  try {
    const cart = await apiClient.get<CartWithProducts>('/cart', {
      params: { sessionId },
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      return null;
    }

    return normalizeCartData(cart);
  } catch (error) {
    console.error('Error getting cart with products:', error);
    return null;
  }
}
