import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Brand, Product } from "@prisma/client";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      images: true,
      price: true,
      brand: true,
      gender: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });

  return data;
}

export function FeaturedProducts() {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight mt-24 mb-4">
        Featured Items
      </h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedproducts />
      </Suspense>
    </>
  );
}

async function LoadFeaturedproducts() {
  // noStore();
  const data = await getData();

  return (
    <Carousel
      opts={{
        align: "start",
        // direction: ''
        containScroll: "keepSnaps",
        // dragFree: true,
        active: data.length > 4,
      }}
    >
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem
            key={item.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 "
          >
            <ProductCard
              // promoMessage="testing"
              item={item as Product & { brand: Brand }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16 z-20" />
      <CarouselNext className="mr-16 z-20" />
    </Carousel>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
