import { Product, ProductProps } from 'src/product/entities';

export type CartItemProps = {
  id: string;
  cartId: string;
  productId: string;
  product?: ProductProps;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export class CartItem {
  readonly #id: string;
  readonly #cartId: string;
  readonly #productId: string;
  readonly #product?: Product;
  readonly #quantity: number;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;

  constructor(props: CartItemProps) {
    this.#id = props.id;
    this.#cartId = props.cartId;
    this.#productId = props.productId;
    this.#product = props.product ? new Product(props.product) : undefined;
    this.#quantity = props.quantity;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  get cartId(): string {
    return this.#cartId;
  }

  get productId(): string {
    return this.#productId;
  }

  get product(): Product | undefined {
    return this.#product;
  }

  get quantity(): number {
    return this.#quantity;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
