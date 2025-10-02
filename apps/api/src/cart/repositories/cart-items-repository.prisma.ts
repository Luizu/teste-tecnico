import { PrismaService } from 'src/database/prisma.service';
import { CartItem } from '../entities';
import { CartItemsRepository } from '../interfaces/cart-items.repository';
import {
  CartItemCriteria,
  CreateCartItemInput,
  UpdateCartItemQuantityInput,
} from './dtos';

export class PrismaCartItemsRepository implements CartItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateCartItemInput): Promise<CartItem> {
    const record = await this.prisma.cartItem.create({
      data: {
        cartId: input.cartId,
        productId: input.productId,
        quantity: 1,
      },
    });

    return new CartItem({
      id: record.id,
      cartId: record.cartId,
      productId: record.productId,
      quantity: record.quantity,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  async findBy(criteria: CartItemCriteria): Promise<CartItem | null> {
    const record = await this.prisma.cartItem.findFirst({
      where: criteria.where,
      include: criteria.relations,
    });

    if (!record) {
      return null;
    }

    return new CartItem({
      id: record.id,
      cartId: record.cartId,
      productId: record.productId,
      quantity: record.quantity,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  async updateQuantity(input: UpdateCartItemQuantityInput): Promise<CartItem> {
    const record = await this.prisma.cartItem.update({
      where: { id: input.cartItemId },
      data: {
        quantity:
          input.action === 'increment' ? { increment: 1 } : { decrement: 1 },
      },
    });

    return new CartItem({
      id: record.id,
      cartId: record.cartId,
      productId: record.productId,
      quantity: record.quantity,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  async remove(cartItemId: string): Promise<void> {
    await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
