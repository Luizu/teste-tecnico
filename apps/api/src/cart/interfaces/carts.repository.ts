import { Cart } from '../entities';
import { CartCriteria, CreateCartInput } from '../repositories';

export abstract class CartsRepository {
  abstract create(input: CreateCartInput): Promise<Cart>;
  abstract findBy(criteria: CartCriteria): Promise<Cart | null>;
  abstract delete(cartId: string): Promise<void>;
}
