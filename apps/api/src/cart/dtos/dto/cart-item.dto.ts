import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from 'src/cart/entities';
import { ProductDto } from 'src/product/dto';

export class CartItemDto {
  @ApiProperty({
    description: 'The ID of the cart item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly id: string;

  @ApiProperty({
    description: 'The ID of the cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly cartId: string;

  @ApiProperty({
    description: 'The ID of the product',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly productId: string;

  @ApiProperty({
    description: 'The quantity of the product in the cart',
    example: 2,
  })
  readonly quantity: number;

  @ApiProperty({
    description: 'The product details',
    type: ProductDto,
  })
  readonly product?: ProductDto;

  @ApiProperty({
    description: 'The created at date of the cart item',
    example: '2025-10-02',
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'The updated at date of the cart item',
    example: '2025-10-02',
  })
  readonly updatedAt: Date;
}

export const cartItemToDto = (cartItem: CartItem): CartItemDto => {
  return {
    id: cartItem.id,
    cartId: cartItem.cartId,
    productId: cartItem.productId,
    quantity: cartItem.quantity,
    product: cartItem.product
      ? {
          id: cartItem.product.id,
          name: cartItem.product.name,
          description: cartItem.product.description,
          image: cartItem.product.image,
          stock: cartItem.product.stock,
          price: cartItem.product.price,
          createdAt: cartItem.product.createdAt,
          updatedAt: cartItem.product.updatedAt,
        }
      : undefined,
    createdAt: cartItem.createdAt,
    updatedAt: cartItem.updatedAt,
  };
};
