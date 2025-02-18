import axiosInstance from "./axios";
import { MenuGroup } from "../types";
import { ListResponse } from "@/types/common";

type ResponseListMenus = ListResponse<MenuGroup>;

const getMenuGroups = async (pageParam = 1, shopId?: number) => {
  const { data } = await axiosInstance.get(`/menu/group`, {
    params: {
      page: pageParam,
      shopId,
    },
  });

  return data;
};

const getSearchMenus = () => {};

export { getMenuGroups, getSearchMenus };
export type { ResponseListMenus };
