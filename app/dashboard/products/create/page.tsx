import ProductCreateForm from "@/app/components/dashboard/products/CreateProductForm";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getBrands() {
  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return brands;
}

export default async function ProductCreateRoute() {
  // noStore();
  const brands = await getBrands();

  return <ProductCreateForm brands={brands} />;
}
