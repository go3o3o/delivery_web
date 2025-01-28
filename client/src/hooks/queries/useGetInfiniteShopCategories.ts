import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { getShopCategories, ResponseListShopCategory } from "@/api/shop";
import { ResponseError } from "@/types/common";

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
    queryKey: ["shopCategories"],
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
