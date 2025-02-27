import { getSearchShops, ResponseListShop } from "@/api/shop";
import { ResponseError } from "@/types/common";
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

function useGetInfiniteSearchShops(
  keyword?: string,
  shopCategoryId?: number,
  lat?: number,
  lng?: number,
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
    queryKey: ["shops", keyword, shopCategoryId, lat, lng],
    queryFn: ({ pageParam }) =>
      getSearchShops(pageParam, keyword, shopCategoryId, lat, lng),
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
