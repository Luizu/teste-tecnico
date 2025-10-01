export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export class BaseCriteria {
  public readonly skip: number;
  public readonly take: number;

  constructor(page: number = DEFAULT_PAGE, perPage: number = DEFAULT_PAGE_SIZE) {
    this.skip = (page - 1) * perPage;
    this.take = perPage;
  }
}
