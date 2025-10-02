import { PrismaService } from 'src/database/prisma.service';
import { Cart } from '../entities';
import { CartsRepository } from '../interfaces/carts.repository';
import { CartCriteria, CreateCartInput } from './dtos';

export class PrismaCartsRepository implements CartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateCartInput): Promise<Cart> {
    const record = await this.prisma.cart.create({
      data: {
        sessionId: input.sessionId,
        items: {
          create: {
            productId: input.productId,
            quantity: 1,
          },
        },
      },
      include: {
        items: true,
      },
    });

    return new Cart({
      id: record.id,
      sessionId: record.sessionId,
      items: record.items,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  async findBy(criteria: CartCriteria): Promise<Cart | null> {
    const record = await this.prisma.cart.findFirst({
      where: criteria.where,
      include: criteria.relations,
      skip: criteria.skip,
      take: criteria.take,
    });

    if (!record) {
      return null;
    }

    return new Cart({
      id: record.id,
      sessionId: record.sessionId,
      items: record?.items ?? [],
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  async delete(cartId: string): Promise<void> {
    await this.prisma.cart.delete({
      where: { id: cartId },
    });
  }
}
