import { AxiosError } from "axios";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

interface PaginationResponse {
  hasNext?: boolean;
  page?: number;
  pageRow?: number;
  size?: number;
  offset?: number;
  totalPage?: number;
  totalRow?: number;
}

interface ListResponse<T> {
  list: T[];
  pagination?: PaginationResponse;
}

interface PaginationQuery {
  size?: number;
  page?: number;
  sortBy?: string;
}

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  "queryKey"
>;

export type { ResponseError, UseQueryCustomOptions };
export { PaginationQuery, ListResponse, PaginationResponse };
