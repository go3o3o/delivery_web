import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getSearchShops, ResponseListShop } from "@/api/shop";
import { queryKeys } from "@/constants";
import { ResponseError } from "@/types/common";

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
    queryKey: [
      queryKeys.SHOP,
      queryKeys.GET_SEARCH_SHOPS,
      keyword,
      shopCategoryId,
      lat,
      lng,
    ],
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
