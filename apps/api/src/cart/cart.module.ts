import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ProductsRepository } from '../product/interfaces';
import { PrismaProductsRepository } from '../product/repositories';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartItemsRepository, CartsRepository } from './interfaces';
import {
  PrismaCartItemsRepository,
  PrismaCartsRepository,
} from './repositories';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: CartsRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaCartsRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: CartItemsRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaCartItemsRepository(prisma);
      },
      inject: [PrismaService],
    },
    {
      provide: ProductsRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaProductsRepository(prisma);
      },
      inject: [PrismaService],
    },
  ],
})
export class CartModule {}
