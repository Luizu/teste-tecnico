export type ProductProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export class Product {
  readonly #id: string;
  readonly #name: string;
  readonly #description: string;
  readonly #image: string;
  readonly #stock: number;
  readonly #price: number;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;

  constructor(props: ProductProps) {
    this.#id = props.id;
    this.#name = props.name;
    this.#description = props.description;
    this.#image = props.image;
    this.#stock = props.stock;
    this.#price = props.price;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get image(): string {
    return this.#image;
  }

  get stock(): number {
    return this.#stock;
  }

  get price(): number {
    return this.#price;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
