import { CartItem, CartItemProps } from './cart-item.entity';

export type CartProps = {
  id: string;
  sessionId: string;
  items?: CartItemProps[];
  createdAt: Date;
  updatedAt: Date;
};

export class Cart {
  readonly #id: string;
  readonly #sessionId: string;
  readonly #items: CartItem[];
  readonly #createdAt: Date;
  readonly #updatedAt: Date;

  constructor(props: CartProps) {
    this.#id = props.id;
    this.#sessionId = props.sessionId;
    this.#items = props.items
      ? props.items.map((item) => new CartItem(item))
      : [];
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  get sessionId(): string {
    return this.#sessionId;
  }

  get items(): CartItem[] {
    return this.#items;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
