/**
 * Cart Service - Camada de serviço para operações de carrinho
 * Separa a lógica de negócio da camada de transporte (HTTP)
 */

import { apiClient, ApiError } from '@/lib/api-client';
import { getOrCreateSessionId } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
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
 * Service para gerenciar carrinho de compras
 */
export class CartService {
  private readonly endpoint = 'cart';

  /**
   * Normaliza os dados do carrinho vindos da API
   * Converte strings numéricas para números
   */
  private normalizeCartData(cart: CartWithProducts): CartWithProducts {
    return {
      ...cart,
      items: cart.items.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        product: item.product
          ? {
              ...item.product,
              price: Number(item.product.price),
              promotionalPrice: item.product.promotionalPrice
                ? Number(item.product.promotionalPrice)
                : undefined,
              stock: Number(item.product.stock),
            }
          : undefined,
      })) as CartItemWithProduct[],
    };
  }

  /**
   * Adiciona um produto ao carrinho
   * @param productId - ID do produto a ser adicionado
   * @throws Error quando a requisição falha
   */
  async addToCart(productId: string): Promise<Cart> {
    const sessionId = await getOrCreateSessionId();

    try {
      const cart = await apiClient.post<Cart>(`${this.endpoint}/add`, {
        sessionId,
        productId,
      });

      revalidatePath('/', 'layout');

      return cart;
    } catch (error) {
      console.error('Error adding to cart:', error);

      if (error instanceof ApiError && error.status === 400) {
        throw new Error('Produto esgotado ou não disponível');
      }

      throw new Error('Erro ao adicionar produto ao carrinho');
    }
  }

  /**
   * Remove um produto do carrinho
   * @param productId - ID do produto a ser removido
   */
  async removeFromCart(productId: string): Promise<void> {
    const sessionId = await getOrCreateSessionId();

    await apiClient.post(`${this.endpoint}/remove`, {
      sessionId,
      productId,
    });

    revalidatePath('/', 'layout');
  }

  /**
   * Obtém o carrinho atual
   * @returns Cart ou null se não encontrado
   */
  async getCart(): Promise<Cart | null> {
    const sessionId = await getOrCreateSessionId();

    try {
      const cart = await apiClient.get<Cart>(this.endpoint, {
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
   * @returns CartWithProducts ou null se não encontrado
   */
  async getCartWithProducts(): Promise<CartWithProducts | null> {
    const sessionId = await getOrCreateSessionId();

    try {
      const cart = await apiClient.get<CartWithProducts>(this.endpoint, {
        params: { sessionId },
      });

      if (!cart || !cart.items || cart.items.length === 0) {
        return null;
      }

      return this.normalizeCartData(cart);
    } catch (error) {
      console.error('Error getting cart with products:', error);
      return null;
    }
  }
}

/**
 * Instância singleton do CartService
 */
export const cartService = new CartService();
