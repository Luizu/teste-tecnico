import { Injectable } from '@nestjs/common';
import { CartDto, cartToDto } from './dtos';
import { CartNotFoundException, ProductNotInCartException } from './exceptions';
import { CartItemsRepository, CartsRepository } from './interfaces';
import { CartCriteria, CartItemCriteria } from './repositories';

@Injectable()
export class CartService {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly cartItemsRepository: CartItemsRepository,
  ) {}

  async addProduct(sessionId: string, productId: string): Promise<CartDto> {
    const existingCart = await this.cartsRepository.findBy(
      new CartCriteria({
        where: { sessionId },
        relations: { items: { include: { product: true } } },
      }),
    );

    const cartDoesNotExist = !existingCart;
    if (cartDoesNotExist) {
      const cart = await this.cartsRepository.create({ sessionId, productId });

      return cartToDto(cart);
    }

    const existingItem = await this.cartItemsRepository.findBy(
      new CartItemCriteria({
        where: {
          cartId: existingCart.id,
          productId,
        },
      }),
    );

    const productAlreadyInCart = !!existingItem;
    if (productAlreadyInCart) {
      await this.cartItemsRepository.updateQuantity({
        cartItemId: existingItem.id,
        action: 'increment',
      });

      const updatedCart = await this.cartsRepository.findBy(
        new CartCriteria({
          where: { id: existingCart.id },
          relations: { items: { include: { product: true } } },
        }),
      );

      return cartToDto(updatedCart);
    }

    await this.cartItemsRepository.create({
      cartId: existingCart.id,
      productId,
    });

    const createdCart = await this.cartsRepository.findBy(
      new CartCriteria({
        where: { id: existingCart.id },
        relations: { items: { include: { product: true } } },
      }),
    );

    return cartToDto(createdCart);
  }

  async removeProduct(
    sessionId: string,
    productId: string,
  ): Promise<CartDto | null> {
    const cart = await this.cartsRepository.findBy(
      new CartCriteria({
        where: { sessionId },
        relations: { items: true },
      }),
    );

    if (!cart) {
      throw new CartNotFoundException(sessionId);
    }

    const cartItem = await this.cartItemsRepository.findBy(
      new CartItemCriteria({
        where: {
          cartId: cart.id,
          productId,
        },
      }),
    );

    if (!cartItem) {
      throw new ProductNotInCartException(productId);
    }

    const hasMoreThanOneUnit = cartItem.quantity > 1;

    if (hasMoreThanOneUnit) {
      await this.cartItemsRepository.updateQuantity({
        cartItemId: cartItem.id,
        action: 'decrement',
      });

      const updatedCart = await this.cartsRepository.findBy(
        new CartCriteria({
          where: { id: cart.id },
          relations: { items: { include: { product: true } } },
        }),
      );

      return cartToDto(updatedCart);
    }

    await this.cartItemsRepository.remove(cartItem.id);

    const isLastItemInCart = cart.items.length === 1;

    if (isLastItemInCart) {
      await this.cartsRepository.delete(cart.id);
    }

    const updatedCart = await this.cartsRepository.findBy(
      new CartCriteria({
        where: { id: cart.id },
        relations: { items: { include: { product: true } } },
      }),
    );

    //Se o carrinho foi removido, retorna null
    if (!updatedCart) {
      return null;
    }

    return cartToDto(updatedCart);
  }

  async getCart(sessionId: string): Promise<CartDto | null> {
    const cart = await this.cartsRepository.findBy(
      new CartCriteria({
        where: { sessionId },
        relations: {
          items: {
            include: {
              product: true,
            },
          },
        },
      }),
    );

    if (!cart) {
      return null;
    }

    return cartToDto(cart);
  }
}
