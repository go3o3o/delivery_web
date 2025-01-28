import axiosInstance from "./axios";
import { LisShopCategoryRequest, ShopCategory } from "../types";
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

export { getShopCategories };
export type { ResponseListShopCategory };
