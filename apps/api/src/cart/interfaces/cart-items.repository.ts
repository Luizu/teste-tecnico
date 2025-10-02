import { CartItem } from '../entities';
import {
  CartItemCriteria,
  CreateCartItemInput,
  UpdateCartItemQuantityInput,
} from '../repositories';

export abstract class CartItemsRepository {
  abstract create(input: CreateCartItemInput): Promise<CartItem>;
  abstract findBy(criteria: CartItemCriteria): Promise<CartItem | null>;
  abstract updateQuantity(
    input: UpdateCartItemQuantityInput,
  ): Promise<CartItem>;
  abstract remove(cartItemId: string): Promise<void>;
}
