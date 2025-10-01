import { PrismaService } from 'src/database/prisma.service';
import { Product } from '../entities';
import { ProductsRepository } from '../interfaces';

export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const records = await this.prisma.product.findMany();

    return records.map(
      (record) =>
        new Product({
          id: record.id,
          name: record.name,
          description: record.description,
          image: record.image,
          stock: record.stock,
          price: record.price.toNumber(),
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        }),
    );
  }

  async findById(id: string): Promise<Product | null> {
    const record = await this.prisma.product.findUnique({ where: { id } });

    if (!record) {
      return null;
    }

    return new Product({
      id: record.id,
      name: record.name,
      description: record.description,
      image: record.image,
      stock: record.stock,
      price: record.price.toNumber(),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
