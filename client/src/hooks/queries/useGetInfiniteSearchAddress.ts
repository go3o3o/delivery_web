import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { ResponseError } from "@/types/common";
import { getSearchAddresses, ResponseListAddress } from "@/api/address";

function useGetInfiniteSearchAddresses(
  keyword?: string,
  enabled?: boolean,
  queryOptions?: UseInfiniteQueryOptions<
    ResponseListAddress,
    ResponseError,
    InfiniteData<ResponseListAddress, number>,
    ResponseListAddress,
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryKey: ["addresses", keyword],
    queryFn: ({ pageParam }) => getSearchAddresses(pageParam, keyword),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.hasNext) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled,
    ...queryOptions,
  });
}

export default useGetInfiniteSearchAddresses;
