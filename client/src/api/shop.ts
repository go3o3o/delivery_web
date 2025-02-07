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
  query?: string,
  shopCategoryId?: number
): Promise<ResponseListShop> => {
  let params = {};
  if (query.length) params = { ...params, query };
  if (shopCategoryId) params = { ...params, shopCategoryId };
  const { data } = await axiosInstance.get(`/shop/search`, {
    params: {
      ...params,
      page: pageParam,
    },
  });

  return data;
};

export { getShopCategories, getSearchShops };
export type { ResponseListShopCategory, ResponseListShop };
