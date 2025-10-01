import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ProductsRepository } from './interfaces';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaProductsRepository } from './repositories';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: ProductsRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaProductsRepository(prisma);
      },
      inject: [PrismaService],
    },
  ],
})
export class ProductModule {}
