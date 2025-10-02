import { NotFoundException } from '@nestjs/common';

export class ProductNotInCartException extends NotFoundException {
  constructor(productId?: string) {
    super(
      productId
        ? `Product with ID ${productId} not found in cart`
        : 'Product not found in cart',
    );
  }
}
