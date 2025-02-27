import axiosInstance from "./axios";
import { Shop, ShopCategory } from "../types";
import { ListResponse } from "@/types/common";

type ResponseListShopCategory = ListResponse<ShopCategory>;

const getShopCategories = async ({
  pageParam = 1,
}): Promise<ResponseListShopCategory> => {
  const { data } = await axiosInstance.get("/shop/category", {
    params: {
      page: pageParam,
    },
  });

  return data;
};

type ResponseListShop = ListResponse<Shop>;

const getSearchShops = async (
  pageParam = 1,
  keyword?: string,
  shopCategoryId?: number,
  lat?: number,
  lng?: number
): Promise<ResponseListShop> => {
  const params = {
    ...(keyword && { keyword }),
    ...(shopCategoryId && { shopCategoryId }),
    ...(lat && lng && { lat, lng }), // lat과 lng가 동시에 있을 때만 추가
    page: pageParam,
  };
  const { data } = await axiosInstance.get(`/shop/search`, { params });

  return data;
};

type ResponseShop = Shop;

const getShop = async (id: number): Promise<ResponseShop> => {
  const { data } = await axiosInstance.get(`/shop/${id}`);

  return data;
};

export { getShopCategories, getSearchShops, getShop };
export type { ResponseListShopCategory, ResponseListShop, ResponseShop };
