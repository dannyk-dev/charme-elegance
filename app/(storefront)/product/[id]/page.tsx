import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";

import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

import AddToCart from "@/app/components/storefront/AddToCart";
import BreadCrumbs from "@/app/components/shared/BreadCrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cart, CartItem } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
      category: true,
      brand: true,
      sku: true,
      size: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const productInCart = await checkProductInCart(user?.id ?? null, params.id);

  return (
    <>
      <BreadCrumbs productName={data.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6 mt-4">
        <ImageSlider images={data.images} />
        <div>
          <Button
            asChild
            variant="link"
            size="sm"
            className="p-0 text-sm text-gray-500 font-medium tracking-tight mb-2"
          >
            <Link href={`/products/b/${data.brand.id}`}>{data.brand.name}</Link>
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-sm text-gray-500 ">sku: {data.sku}</p>
          <p className="text-lg text-gray-700 my-6">{data.description}</p>
          <p className="text-2xl mt-2 text-gray-900">${data.price}</p>
          {data?.size && (
            <p className="text-sm mt-2 text-gray-600">Size: {data?.size}</p>
          )}

          <AddToCart
            productId={data.id}
            noUser={!Boolean(user)}
            cartItem={productInCart}
            isSingleItem={false}
            noUserDisable={false}
          />
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
