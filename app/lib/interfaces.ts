import { Brand } from "@prisma/client";

export type Cart = {
  userId: string;
  items: Array<CartItem>;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageString: string;
  brand: Brand;
  size: string | null;
  hasWishlist: boolean;
};
