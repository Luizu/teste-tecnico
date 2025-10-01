import { Product } from '../entities';

export abstract class ProductsRepository {
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
}
