import { Injectable } from '@nestjs/common';
import { Product } from './entities';
import { ProductNotFoundException } from './exceptions';
import { ProductsRepository } from './interfaces';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    return product;
  }
}
