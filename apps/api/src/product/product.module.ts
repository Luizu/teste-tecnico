import { Module } from '@nestjs/common';
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
      useClass: PrismaProductsRepository,
    },
  ],
})
export class ProductModule {}
