import { getMenuGroups, ResponseListMenus } from "@/api/menu";
import { ResponseError } from "@/types/common";
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

function useGetInfiniteMenuGroups(
  shopId?: number,
  queryOptions?: UseInfiniteQueryOptions<
    ResponseListMenus,
    ResponseError,
    InfiniteData<ResponseListMenus, number>,
    ResponseListMenus,
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryKey: ["menus", shopId],
    queryFn: ({ pageParam }) => getMenuGroups(pageParam, shopId),
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

export default useGetInfiniteMenuGroups;
