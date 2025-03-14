import { useQuery } from "@tanstack/react-query";
import { getShop, ResponseShop } from "@/api/shop";
import { queryKeys } from "@/constants";
import { UseQueryCustomOptions } from "@/types/common";

function useGetShop(
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseShop>
) {
  return useQuery({
    queryFn: () => getShop(id),
    queryKey: [queryKeys.SHOP, queryKeys.GET_SHOP, id],
    enabled: Boolean(id),
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetShop;
