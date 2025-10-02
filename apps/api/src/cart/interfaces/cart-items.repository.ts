import { CartItem } from '@prisma/client';
import { CartItemCriteria, UpdateCartItemQuantityInput } from '../repositories';

export abstract class CartItemsRepository {
  abstract findBy(criteria: CartItemCriteria): Promise<CartItem | null>;
  abstract updateQuantity(
    input: UpdateCartItemQuantityInput,
  ): Promise<CartItem>;
  abstract remove(cartItemId: string): Promise<void>;
}
