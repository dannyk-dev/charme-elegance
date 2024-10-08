import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import BreadCrumbs from "@/app/components/shared/BreadCrumbs";
import { Brand, Product } from "@prisma/client";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
          category: true,
          brand: true,
          size: true,
        },
        where: {
          status: "published",
        },
      });

      return {
        title: "All Products",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "men",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
          category: true,
        },
      });

      return {
        title: "Products for Men",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "women",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
          category: true,
          brand: true,
        },
      });

      return {
        title: "Products to Women",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  // noStore();
  const { data, title } = await getData(params.name);

  return (
    <section className="mt-12">
      <BreadCrumbs categoryName={params.name} />

      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        {data.map((item) => (
          <ProductCard
            item={item as Product & { brand: Brand }}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
}
