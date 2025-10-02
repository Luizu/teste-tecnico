import { BaseCriteria } from 'src/common/dto';
import { Prisma } from '@prisma/client';

export interface CartItemCriteriaConditions {
  where?: Prisma.CartItemWhereInput;
  page?: number;
  perPage?: number;
  relations?: Prisma.CartItemInclude;
}

export class CartItemCriteria extends BaseCriteria {
  public readonly where: Prisma.CartItemWhereInput = {};
  public readonly relations?: Prisma.CartItemInclude;

  constructor(params: CartItemCriteriaConditions) {
    super(params.page, params.perPage);
    this.where = params.where;
    this.relations = params.relations;
  }
}
