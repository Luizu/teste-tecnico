/**
 * Cart Actions - Server Actions para operações de carrinho
 * Usado em Client Components que precisam interagir com o servidor
 */

'use server';

import { cartService, Cart, CartWithProducts } from '@/services/cart.service';

/**
 * Adiciona um produto ao carrinho
 * @param productId - ID do produto a ser adicionado
 * @throws Error quando a requisição falha
 */
export async function addToCart(productId: string): Promise<Cart> {
  return cartService.addToCart(productId);
}

/**
 * Remove um produto do carrinho
 * @param productId - ID do produto a ser removido
 */
export async function removeFromCart(productId: string): Promise<void> {
  return cartService.removeFromCart(productId);
}

/**
 * Obtém o carrinho atual
 * @returns Cart ou null se não encontrado
 */
export async function getCart(): Promise<Cart | null> {
  return cartService.getCart();
}

/**
 * Obtém o carrinho atual com dados completos dos produtos
 * O backend já retorna os produtos junto com os itens do carrinho
 * @returns CartWithProducts ou null se não encontrado
 */
export async function getCartWithProducts(): Promise<CartWithProducts | null> {
  return cartService.getCartWithProducts();
}
