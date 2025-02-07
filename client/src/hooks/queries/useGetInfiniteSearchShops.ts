import { getSearchShops, ResponseListShop } from "@/api/shop";
import { ResponseError } from "@/types/common";
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

function useGetInfiniteSearchShops(
  query?: string,
  shopCategoryId?: number,
  queryOptions?: UseInfiniteQueryOptions<
    ResponseListShop,
    ResponseError,
    InfiniteData<ResponseListShop, number>,
    ResponseListShop,
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryKey: ["shops", query, shopCategoryId],
    queryFn: ({ pageParam }) =>
      getSearchShops(pageParam, query, shopCategoryId),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.hasNext) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    ...queryOptions,
  });
}

export default useGetInfiniteSearchShops;
