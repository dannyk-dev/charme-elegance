import prisma from "@/app/lib/db";
import React, { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { Skeleton } from "@/components/ui/skeleton";
import { Brand } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

async function getData() {
  const data = await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
    },
    take: 3,
    orderBy: {
      // name: "asc",
      createdAt: "desc",
    },
  });

  return data;
}

async function Brands() {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight mt-24 mb-5">
        Featured Brands
      </h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadBrands />
      </Suspense>
    </>
  );
}

async function LoadBrands() {
  // noStore();
  const data = await getData();

  return (
    <>
      <div className=" hidden md:grid md:grid-cols-2 lg:grid-cols-4 justify-center px-10">
        <div className="flex flex-col items-center">
          <div className="w-[200px] h-[200px] rounded-full relative flex items-center justify-center bg-amber-100">
            <p>Shop All</p>
          </div>
          <Button
            asChild
            variant="link"
            className="text-lg font-medium z-10 mt-2 "
          >
            <Link href={`/products/brands`}>All Brands</Link>
          </Button>
        </div>
        {data.map((item) => (
          <BrandCard item={item} key={item.id} />
        ))}
      </div>
      <Carousel className="md:hidden">
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id}>
              <BrandCard item={item} />
            </CarouselItem>
          ))}
          <CarouselItem>
            <div className="flex flex-col items-center">
              <div className="w-[200px] h-[200px] rounded-full relative flex items-center justify-center bg-amber-100">
                <p>Shop All</p>
              </div>
              <Button
                asChild
                variant="link"
                className="text-lg font-medium z-10 mt-2 "
              >
                <Link href={`/products/brands`}>All Brands</Link>
              </Button>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
    </>
  );
}

function BrandCard({ item }: { item: Omit<Brand, "createdAt"> }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-[200px] h-[200px] rounded-full relative flex items-center justify-center "
        style={{
          backgroundImage: `url('${item.logo}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <Button asChild variant="link" className="text-lg font-medium z-10 mt-2 ">
        <Link href={`/products/brands/${item.name}?id=${item.id}`}>
          {item.name}
        </Link>
      </Button>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <LoadingBrandCard />
      <LoadingBrandCard />
      <LoadingBrandCard />
      <LoadingBrandCard />
    </div>
  );
}

function LoadingBrandCard() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="w-[200px] h-[200px] rounded-full" />

      <Skeleton className="w-1/3 h-8 mt-5" />
    </div>
  );
}

export default Brands;
