import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CartsRepository, CartItemsRepository } from './interfaces';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import {
  PrismaCartsRepository,
  PrismaCartItemsRepository,
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
  ],
})
export class CartModule {}
