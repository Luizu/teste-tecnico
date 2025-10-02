import { BadRequestException } from '@nestjs/common';

export class ProductOutOfStockException extends BadRequestException {
  constructor(productId: string) {
    super(`Product with ID ${productId} is out of stock`);
  }
}
