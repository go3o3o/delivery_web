import { getCoordinate, ResponseCoordinate } from "@/api/address";
import { UseQueryCustomOptions } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

function useGetCoordinate(
  keyword: string,
  queryOptions?: UseQueryCustomOptions<ResponseCoordinate>
) {
  return useQuery({
    queryFn: () => getCoordinate(keyword),
    queryKey: ["coordinate", keyword],
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetCoordinate;
