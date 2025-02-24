import { ListResponse } from "@/types/common";
import axiosInstance from "./axios";
import { Address, Coordinate } from "@/types/address";

type ResponseListAddress = ListResponse<Address>;

const getSearchAddresses = async (pageParam = 1, keyword: string) => {
  const { data } = await axiosInstance.get(`/address/search`, {
    params: { keyword, page: pageParam },
  });
  return data;
};

export { getSearchAddresses };
export type { ResponseListAddress };
