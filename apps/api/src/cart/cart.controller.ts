import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CartDto, ManageCartRequest } from './dtos';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiResponse({
    status: 201,
    description: 'Product added to cart',
    type: CartDto,
  })
  async addProduct(@Body() body: ManageCartRequest) {
    return this.cartService.addProduct(body.sessionId, body.productId);
  }

  @Post('remove')
  @ApiOperation({ summary: 'Remove product from cart' })
  @ApiResponse({
    status: 200,
    description: 'Product removed from cart',
  })
  async removeProduct(@Body() body: ManageCartRequest): Promise<void> {
    await this.cartService.removeProduct(body.sessionId, body.productId);
    return;
  }

  @Get()
  @ApiOperation({ summary: 'Get cart by session ID' })
  @ApiResponse({ status: 200, description: 'Cart found', type: CartDto })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async getCart(
    @Query('sessionId') sessionId: string,
  ): Promise<CartDto | null> {
    return this.cartService.getCart(sessionId);
  }
}
