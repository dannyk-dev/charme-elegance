import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { Brand, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";
import { Cart, CartItem } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Badge } from "@/components/ui/badge";
import ProductImageCarousel from "./ProductImageCarousel";

interface iAppProps {
  item: Product & { brand: Brand };
  promoMessage?: string;
}

async function checkProductInCart(
  userId: string | null,
  productId: string
): Promise<CartItem | null> {
  if (!userId) return null;
  const cart: Cart | null = await redis.get(`cart-${userId}`);

  if (!cart) return null;

  const item = cart.items.find((item) => {
    return item.id === productId;
  });

  return item || null;
}

export async function ProductCard({ item, promoMessage }: iAppProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const productInCart = await checkProductInCart(user?.id ?? null, item.id);

  return (
    <div className="rounded-lg">
      <ProductImageCarousel images={(item && item.images) || []} />

      <div className="flex flex-col justify-between mt-2">
        {promoMessage && (
          <div className="flex">
            <Badge
              variant="secondary"
              className=" bg-amber-100 font-medium hover:bg-amber-200"
            >
              {promoMessage}
            </Badge>
          </div>
        )}

        <Button
          variant="link"
          size="sm"
          className="font-semibold text-sm text-gray-500 max-w-20 px-0 text-left justify-start"
          asChild
        >
          <Link href={`/products/brand/`}>{item?.brand?.name || ""}</Link>
        </Button>
        <h1 className="font-semibold text-lg">{item.name}</h1>
        <h3 className="text-base">Size: {item.size}</h3>
        <h3 className="text-base mb-4">${item.price}</h3>
      </div>
      {/* <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p> */}

      <div className="flex w-full items-center gap-x-2">
        <div className="w-2/3">
          <AddToCart
            productId={item.id}
            cartItem={productInCart}
            noUser={!Boolean(user)}
            noUserDisable={false}
          />
        </div>
        <Button asChild className="w-1/3 " variant="secondary">
          <Link href={`/product/${item.id}?category=${item.category}`}>
            Details
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
