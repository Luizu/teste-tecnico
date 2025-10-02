import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities';

export const productToDto: (product: Product) => ProductDto = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image,
    stock: product.stock,
    price: product.price,
    promotionalPrice: product.promotionalPrice,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export class ProductDto {
  @ApiProperty({
    description: 'The ID of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly id: string;
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product Name',
  })
  readonly name: string;
  @ApiProperty({
    description: 'The description of the product',
    example: 'Product Description',
  })
  readonly description: string;
  @ApiProperty({
    description: 'The image of the product',
    example: 'https://example.com/image.jpg',
  })
  readonly image: string;
  @ApiProperty({
    description: 'The stock of the product',
    example: 10,
  })
  readonly stock: number;
  @ApiProperty({
    description: 'The price of the product',
    example: 100.0,
  })
  readonly price: number;
  @ApiProperty({
    description: 'The promotional price of the product (optional)',
    example: 80.0,
    required: false,
  })
  readonly promotionalPrice?: number;
  @ApiProperty({
    description: 'The created at date of the product',
    example: '2025-10-01',
  })
  readonly createdAt: Date;
  @ApiProperty({
    description: 'The updated at date of the product',
    example: '2025-10-01',
  })
  readonly updatedAt: Date;
}
