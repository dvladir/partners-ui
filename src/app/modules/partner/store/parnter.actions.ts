export class SearchPartners {
  static readonly type = '[Partners] search';
  constructor(
    public pageNum: number = 0,
    public pageSize: number = 10,
    public query: string = '',
) {
  }
}

export class InitialLoadPartners {
  static readonly type = '[Partners] initial load';
}
