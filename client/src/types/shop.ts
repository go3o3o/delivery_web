import { PaginationQuery } from "./common";

interface ShopCategory {
  id: number;
  name: string;
  imageUrl?: string;
}

interface Shop {
  id: number;
  shopCategoryId: number;
  name: string;
  businessName: string;
  phone?: string;
  address?: string;
  imageUrl?: string;
  description?: string;
  minOrderPrice?: number;
  deliveryTip?: number;
  deliveryTime?: number;
  rating?: number;
  orderCount?: number;
  dibsCount?: number;
  reviewCount?: number;
}

interface LisShopCategoryRequest extends PaginationQuery {
  name?: string;
}

export type { ShopCategory, Shop, LisShopCategoryRequest };
