import { useQuery } from "@tanstack/react-query";
import { getCoordinate, ResponseCoordinate } from "@/api/address";
import { queryKeys } from "@/constants";
import { UseQueryCustomOptions } from "@/types/common";

function useGetCoordinate(
  keyword: string,
  queryOptions?: UseQueryCustomOptions<ResponseCoordinate>
) {
  return useQuery({
    queryFn: () => getCoordinate(keyword),
    queryKey: [queryKeys.COORDINATE, queryKeys.GET_COORDINATE, keyword],
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetCoordinate;
