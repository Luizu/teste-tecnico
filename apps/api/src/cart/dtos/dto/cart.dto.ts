import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/cart/entities';
import { CartItemDto, cartItemToDto } from './cart-item.dto';

export class CartDto {
  @ApiProperty({
    description: 'The ID of the cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  readonly id: string;

  @ApiProperty({
    description: 'The session ID of the cart',
    example: 'session_123456',
  })
  readonly sessionId: string;

  @ApiProperty({
    description: 'The items in the cart',
    type: [CartItemDto],
  })
  readonly items: CartItemDto[];

  @ApiProperty({
    description: 'The total number of items in the cart',
    example: 5,
  })
  readonly totalItems: number;

  @ApiProperty({
    description: 'The total price of all items in the cart',
    example: 299.99,
  })
  readonly totalPrice: number;

  @ApiProperty({
    description: 'The created at date of the cart',
    example: '2025-10-02',
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'The updated at date of the cart',
    example: '2025-10-02',
  })
  readonly updatedAt: Date;
}

export const cartToDto = (cart: Cart): CartDto => {
  const items = cart.items?.map(cartItemToDto) ?? [];

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = item.product?.price ?? 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  return {
    id: cart.id,
    sessionId: cart.sessionId,
    items,
    totalItems,
    totalPrice,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
};
