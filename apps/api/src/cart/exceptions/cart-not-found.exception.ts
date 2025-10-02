import { NotFoundException } from '@nestjs/common';

export class CartNotFoundException extends NotFoundException {
  constructor(sessionId?: string) {
    super(
      sessionId
        ? `Cart with session ID ${sessionId} not found`
        : 'Cart not found',
    );
  }
}
