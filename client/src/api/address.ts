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

type ResponseCoordinate = Coordinate;

const getCoordinate = async (keyword: string) => {
  const { data } = await axiosInstance.get(`address/coordinate`, {
    params: { keyword },
  });
  return data;
};

export { getSearchAddresses, getCoordinate };
export type { ResponseListAddress, ResponseCoordinate };
