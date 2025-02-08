import { http } from "msw";
import * as service from "./service";

export const shopHandlers = [
  http.get("/shop/category", service.getShopCategories),
  http.get("/shop/search", service.getSearchShops),
];
