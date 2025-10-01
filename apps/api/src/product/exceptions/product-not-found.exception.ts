import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super(id ? `Product with ID ${id} not found` : 'Product not found');
  }
}
