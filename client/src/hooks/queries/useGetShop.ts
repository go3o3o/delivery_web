import { getShop, ResponseShop } from "@/api/shop";
import { UseQueryCustomOptions } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

function useGetShop(
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseShop>
) {
  return useQuery({
    queryFn: () => getShop(id),
    queryKey: ["shop", id],
    enabled: Boolean(id),
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetShop;
