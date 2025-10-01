/**
 * Product Service - Camada de serviço para operações de produtos
 * Separa a lógica de negócio da camada de transporte (HTTP)
 */

import { apiClient, ApiError } from '@/lib/api-client';
import { Product } from '@/types/product';

/**
 * Opções para cache do Next.js
 */
interface CacheOptions {
  revalidate?: number | false;
  tags?: string[];
}

/**
 * Service para gerenciar produtos
 */
export class ProductService {
  private readonly endpoint = '/product';

  /**
   * Busca todos os produtos
   * @param cacheOptions - Opções de cache/revalidation do Next.js
   * @throws ApiError quando a requisição falha
   */
  async findAll(cacheOptions?: CacheOptions): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>(this.endpoint, {
        next: {
          revalidate: cacheOptions?.revalidate ?? 60,
          tags: cacheOptions?.tags ?? ['products'],
        },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Failed to fetch products:', error.status, error.data);
        throw error;
      }
      throw new Error('Erro ao buscar produtos');
    }
  }

  /**
   * Busca um produto por ID
   * @param id - ID do produto
   * @param cacheOptions - Opções de cache/revalidation do Next.js
   * @returns Product ou null se não encontrado (404)
   * @throws ApiError para outros erros
   */
  async findOne(
    id: string,
    cacheOptions?: CacheOptions,
  ): Promise<Product | null> {
    try {
      return await apiClient.get<Product>(`${this.endpoint}/${id}`, {
        next: {
          revalidate: cacheOptions?.revalidate ?? 60,
          tags: cacheOptions?.tags ?? ['products', `product-${id}`],
        },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        // 404 é esperado, retorna null
        if (error.status === 404) {
          return null;
        }
        // Outros erros de API são re-thrown
        console.error('Failed to fetch product:', error.status, error.data);
        throw error;
      }
      // Erro desconhecido
      throw new Error('Erro ao buscar produto');
    }
  }

  /**
   * Busca produtos com filtros/search
   * Exemplo para futuras implementações
   */
  async search(query: string, cacheOptions?: CacheOptions): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>(this.endpoint, {
        params: { q: query },
        next: {
          revalidate: cacheOptions?.revalidate ?? 30,
          tags: cacheOptions?.tags ?? ['products', 'search'],
        },
      });
    } catch (error) {
      console.error('Failed to search products:', error);
      return [];
    }
  }
}

/**
 * Instância singleton do ProductService
 */
export const productService = new ProductService();
