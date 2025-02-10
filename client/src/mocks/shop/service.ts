import { HttpResponse, HttpResponseResolver, delay } from "msw";
import shopCategories from "../data/shop-category-list-sample";
import shops from "../data/shop-list-sample";

export const getShopCategories: HttpResponseResolver = async () => {
  return HttpResponse.json(shopCategories, { status: 200 });
};

export const getSearchShops: HttpResponseResolver = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const shopCategoryId = url.searchParams.get("shopCategoryId");
    const query = url.searchParams.get("query");

    const shopData = shops.list.filter((shop) => {
      if (shopCategoryId) {
        return shop.shopCategoryId == Number(shopCategoryId);
      }
      if (query) {
        return shop.name.includes(query);
      }
      return shop;
    });
    return HttpResponse.json(
      { list: shopData, pagination: shops.pagination },
      { status: 200 }
    );
  } catch (e) {
    let message = "Unknown Error";
    if (e instanceof Error) message = e.message;
    return HttpResponse.json({ message }, { status: 400 });
  }
};
