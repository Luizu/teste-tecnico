import { CartItem } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CartItemsRepository } from '../interfaces/cart-items.repository';
import { CartItemCriteria, UpdateCartItemQuantityInput } from './dtos';

export class PrismaCartItemsRepository implements CartItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(criteria: CartItemCriteria): Promise<CartItem | null> {
    return this.prisma.cartItem.findFirst({
      where: criteria.where,
      include: criteria.relations,
      skip: criteria.skip,
      take: criteria.take,
    });
  }

  async updateQuantity(input: UpdateCartItemQuantityInput): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id: input.cartItemId },
      data: {
        quantity:
          input.action === 'increment' ? { increment: 1 } : { decrement: 1 },
      },
    });
  }

  async remove(cartItemId: string): Promise<void> {
    await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
