interface Menu {
  id: number;
  menuGroupId: number;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  isRecommend: boolean;
}

interface MenuGroup {
  id: number;
  shopId: number;
  name: string;
  description?: string;
  menus: Menu[];
}

export type { Menu, MenuGroup };
