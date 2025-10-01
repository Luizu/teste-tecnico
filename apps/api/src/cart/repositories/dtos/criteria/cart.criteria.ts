import { Prisma } from '@prisma/client';
import { BaseCriteria } from 'src/common/dto';

export interface CartCriteriaConditions {
  where?: Prisma.CartWhereInput;
  page?: number;
  perPage?: number;
  relations?: Prisma.CartInclude;
}

export class CartCriteria extends BaseCriteria {
  public readonly where: Prisma.CartWhereInput = {};
  public readonly relations?: Prisma.CartInclude;

  constructor(params: CartCriteriaConditions) {
    super(params.page, params.perPage);
    this.where = params.where;
    this.relations = params.relations;
  }
}
