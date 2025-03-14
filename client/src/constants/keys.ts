const queryKeys = {
  SHOP: "shop",
  SHOP_CATEGORY: "shopCategory",
  MENU: "menu",
  ADDRESS: "address",
  COORDINATE: "coordinate",

  GET_SHOP: "getShop",
  GET_SHOPS: "getShops",
  GET_SHOP_CATEGORIES: "getShopCategories",
  GET_MENUS: "getMenus",
  GET_COORDINATE: "getCoordinate",

  GET_SEARCH_ADDRESSES: "getSearchAddresses",
  GET_SEARCH_SHOPS: "getSearchShops",
} as const;

const storageKeys = {
  REFRESH_TOKEN: "refreshToken",
} as const;

export { queryKeys, storageKeys };
