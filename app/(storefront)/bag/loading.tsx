import { LoadingProductCard } from "@/app/components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function LoadingBag({}: Props) {
  return (
    <div className="w-full h-full">
      {/* <Skeleton className="h-10 w-56 my-5" /> */}
      <div className="grid grid-cols-2  w-full justify-between h-full">
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}

// export default LoadingBag;
