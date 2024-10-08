import BrandsTable from "@/app/components/dashboard/products/BrandsTable";
import { RecentSales } from "@/app/components/dashboard/RecentSales";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const ProductsTable = dynamic(
  () => import("@/app/components/dashboard/products/ProductsTable")
);

interface ProductTab {
  title: string;
  // tabValue: string;
  PanelComponent: React.ComponentType;
}

// type ProductTabLicst =
const tabs: ProductTab[] = [
  {
    title: "Stock Catalog",
    PanelComponent: ProductsTable,
  },
  {
    title: "Archived Products",
    PanelComponent: RecentSales,
  },
  {
    title: "Brands",
    PanelComponent: BrandsTable,
  },
];

export default async function ProductsPage() {
  // const tabsList =
  const titles = tabs.flatMap((item) => item.title);

  return (
    <Tabs defaultValue={titles[0].toLowerCase()}>
      <TabsList className="flex items-center justify-center py-2">
        {titles.map((item) => (
          <TabsTrigger value={item.toLowerCase()} key={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ title, PanelComponent }) => (
        <TabsContent value={title.toLowerCase()} key={title.toUpperCase()}>
          <Suspense fallback={"loading..."}>
            <PanelComponent />
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  );
}
