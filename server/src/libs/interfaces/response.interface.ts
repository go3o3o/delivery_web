export interface IPagination {
  totalRow: number;
  pageRow: number;
  hasNext: boolean;
  totalPage: number;
  page: number;
  size: number;
}

export interface IListResponse<T> {
  list: T[];
  pagination?: IPagination;
}
