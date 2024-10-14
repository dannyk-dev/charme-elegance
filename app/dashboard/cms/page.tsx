import { RecentSales } from "@/app/components/dashboard/RecentSales";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";

interface CmsTab {
  title: string;
  PanelComponent: React.ComponentType;
}

// type ProductTabLicst =
const tabs: CmsTab[] = [
  {
    title: "About Us Section",
    PanelComponent: RecentSales,
  },
  {
    title: "Contact Information",
    PanelComponent: RecentSales,
  },
  {
    title: "Store Locations",
    PanelComponent: RecentSales,
  },
];

export default async function SiteContentPage() {
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

/*

Site Settings (Tabs)

- Sobre-nos section
- Contact Info
- Policies
- FAQ

*/
