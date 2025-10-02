/**
 * Product Actions - Server Actions para operações de produtos
 * Usado em Client Components que precisam interagir com o servidor
 */

'use server';

import { productService } from '@/services/product.service';
import { Product } from '@/types/product';

/**
 * Busca todos os produtos
 * @throws Error quando a requisição falha
 */
export async function getAllProducts(): Promise<Product[]> {
  return productService.findAll();
}

/**
 * Busca um produto por ID
 * @param id - ID do produto
 * @returns Product ou null se não encontrado
 */
export async function getProductById(id: string): Promise<Product | null> {
  return productService.findOne(id);
}

/**
 * Busca produtos com query de pesquisa
 * @param query - Texto para buscar nos produtos
 * @returns Array de produtos encontrados
 */
export async function searchProducts(query: string): Promise<Product[]> {
  return productService.search(query);
}
