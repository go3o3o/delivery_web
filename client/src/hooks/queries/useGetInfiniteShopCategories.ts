import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { getShopCategories, ResponseListShopCategory } from "@/api/shop";
import { ResponseError } from "@/types/common";
import { queryKeys } from "@/constants";

const useGetInfiniteShopCategories = (
  queryOptions?: UseInfiniteQueryOptions<
    ResponseListShopCategory,
    ResponseError,
    InfiniteData<ResponseListShopCategory, number>,
    ResponseListShopCategory,
    QueryKey,
    number
  >
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.SHOP_CATEGORY, queryKeys.GET_SHOP_CATEGORIES],
    queryFn: getShopCategories,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNext) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    ...queryOptions,
  });
};

export default useGetInfiniteShopCategories;
