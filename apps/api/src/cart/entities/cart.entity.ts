export type CartProps = {
  id: string;
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Cart {
  readonly #id: string;
  readonly #sessionId: string;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;

  constructor(props: CartProps) {
    this.#id = props.id;
    this.#sessionId = props.sessionId;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  get id(): string {
    return this.#id;
  }

  get sessionId(): string {
    return this.#sessionId;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
