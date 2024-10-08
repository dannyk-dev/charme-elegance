import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      brand: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

async function getBrands() {
  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return brands;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  // noStore();
  const data = await getData(params.id);
  const brands = await getBrands();

  console.log(data);
  return <EditForm data={data} brands={brands} />;
}
