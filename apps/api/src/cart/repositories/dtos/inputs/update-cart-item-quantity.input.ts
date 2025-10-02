export interface UpdateCartItemQuantityInput {
  action: 'increment' | 'decrement';
  cartItemId: string;
}
